import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { siteAudio } from '../../lib/audio/siteAudio';
import { createCreatures, advanceCreatures } from '../../lib/creatures/steering';
import { paintHabitats } from '../../lib/creatures/paint';

// ponytail: site-wide component scanning gives Pip & Spool full freedom across all pages
export default function WorkshopCreatures() {
  const root = useRef(null), { pathname } = useLocation();

  useEffect(() => {
    const canvas = root.current, ctx = canvas.getContext('2d');
    if (!ctx) return;
    const motion = matchMedia('(prefers-reduced-motion:reduce)');
    let width = innerWidth, height = 0, agents = [], flowers = [], pointer = null, touchUntil = 0, raf = 0, last = 0, time = 0, painted = 0, disposed = false, enabled = true;

    try { enabled = localStorage.getItem('portfolio_creatures') !== 'false'; } catch { /* storage unavailable */ }

    function measure() {
      width = innerWidth;
      height = Math.max(document.documentElement.scrollHeight, innerHeight);

      // Query real visible UI components across the current page (buttons, text headings, cards, links)
      const selector = 'button:not([aria-hidden="true"]), a.button, a.button-secondary, a.text-link, a.contact-email, .button-row a, h1, h2, h3, .project-card, article, .capability-list a, .toolkit-chip, .badge, [data-web-anchor]';
      const nodes = [...document.querySelectorAll(selector)];
      const visibleNodes = nodes.filter(n => {
        const r = n.getBoundingClientRect();
        return r.width > 8 && r.height > 6 && r.top + scrollY > 0;
      });

      const webs = [];
      const perches = [];

      visibleNodes.forEach(node => {
        const r = node.getBoundingClientRect();
        const top = r.top + scrollY;
        const left = r.left;
        const right = r.right;
        const w = r.width;

        // Pip anchor candidates at top corners and edges of components
        webs.push({ x: Math.round(left + Math.min(20, w * 0.2)), y: Math.round(top) });
        if (w > 80) {
          webs.push({ x: Math.round(right - Math.min(20, w * 0.2)), y: Math.round(top) });
        }

        // Spool perches atop buttons, headings, badges, and cards
        perches.push({
          x: Math.round(left + w * 0.5),
          y: Math.round(top - 2),
          isFlower: false
        });
      });

      // Graceful fallback anchors if a page has minimal markup
      if (webs.length < 2) {
        webs.push(
          { x: Math.round(width - 45), y: 150 },
          { x: 45, y: Math.round(Math.max(300, height * 0.4)) },
          { x: Math.round(width - 55), y: Math.round(Math.max(500, height * 0.75)) }
        );
      }
      if (perches.length < 2) {
        perches.push(
          { x: 50, y: Math.round(Math.max(220, height * 0.35)), isFlower: true },
          { x: Math.round(width - 60), y: Math.round(Math.max(450, height * 0.7)), isFlower: true }
        );
      }

      flowers = perches;

      if (!agents.length) {
        // Initialize Pip and Spool with candidate webs and perches across the site
        agents = createCreatures(width, height, { web: webs[0], webs, flowers });
        time = 0;
        return;
      }

      const [spider, butterfly] = agents;
      spider.webs = webs;
      if (spider.anchor >= webs.length) spider.anchor = 0;
      if (!spider.home || Math.hypot(spider.home.x - spider.x, spider.home.y - spider.y) > 800) {
        spider.home = webs[spider.anchor] || webs[0];
      }

      butterfly.flowers = flowers;
      if (butterfly.target >= flowers.length) butterfly.target = 0;
    }

    function size() {
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      measure();
      resume();
    }

    const visible = () =>
      agents.some(a => Math.abs(a.y - scrollY - innerHeight / 2) < innerHeight + 350) ||
      flowers.some(f => Math.abs(f.y - scrollY - innerHeight / 2) < innerHeight / 2 + 100);

    const active = () => !disposed && enabled && agents.length && !motion.matches && !document.hidden && visible();

    function draw() {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      const s = getComputedStyle(canvas);
      ctx.save();
      ctx.translate(0, -scrollY);
      paintHabitats(
        ctx,
        agents,
        flowers,
        time,
        scrollY,
        s.getPropertyValue('--color-fg').trim(),
        s.getPropertyValue('--color-accent').trim(),
        s.getPropertyValue('--color-canvas').trim()
      );
      ctx.restore();
      canvas.dataset.creatures = JSON.stringify(
        agents.map(({ name, kind, x, y, state }) => ({ name, kind, x: Math.round(x), y: Math.round(y), state }))
      );
      canvas.dataset.renders = String(Number(canvas.dataset.renders || 0) + 1);
    }

    function stop() {
      cancelAnimationFrame(raf);
      raf = 0;
      last = 0;
      canvas.dataset.playing = 'false';
      ctx.clearRect(0, 0, innerWidth, innerHeight);
    }

    function loop(t) {
      raf = 0;
      if (!active()) {
        stop();
        return;
      }
      const dt = last ? Math.min(0.2, (t - last) / 1000) : 0;
      last = t;
      time += dt;
      const before = agents.map(a => a.state);
      advanceCreatures(agents, dt, time, t < touchUntil || !touchUntil ? pointer : null, width, height);

      agents.forEach((a, i) => {
        if (['fleeing', 'retreating', 'swinging'].includes(a.state) && before[i] !== a.state) {
          siteAudio.cue('creature', { gain: 0.18, rate: a.kind === 'spider' ? 0.85 : 1.2, throttle: 0.85 });
        }
      });

      if (t - painted > 32) {
        draw();
        painted = t;
      }
      canvas.dataset.playing = 'true';
      raf = requestAnimationFrame(loop);
    }

    function resume() {
      if (!active()) {
        stop();
        if (motion.matches && !disposed && enabled && !document.hidden && visible() && agents.length) draw();
        return;
      }
      if (!raf) raf = requestAnimationFrame(loop);
    }

    const move = e => {
      if (e.pointerType === 'mouse' || e.type === 'pointerdown') {
        pointer = { x: e.clientX, y: e.clientY + scrollY };
        touchUntil = e.pointerType === 'mouse' ? 0 : performance.now() + 750;
      }
    };
    const leave = e => {
      if (e.pointerType === 'mouse' && !e.relatedTarget) pointer = null;
    };
    const scroll = () => {
      pointer = null;
      measure();
      resume();
      if (active()) draw();
    };
    const settings = e => {
      enabled = e.detail.enabled;
      resume();
    };

    const routeContent = document.getElementById('route-content');
    const resize = new ResizeObserver(() => {
      measure();
      resume();
    });
    if (routeContent) resize.observe(routeContent);

    size();
    document.fonts.ready.then(() => {
      measure();
      resume();
    });

    window.addEventListener('resize', size);
    window.addEventListener('scroll', scroll, { passive: true });
    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerdown', move, { passive: true });
    document.addEventListener('pointerout', leave);
    document.addEventListener('visibilitychange', resume);
    window.addEventListener('portfolio:creatures', settings);
    motion.addEventListener('change', resume);

    return () => {
      disposed = true;
      stop();
      resize.disconnect();
      window.removeEventListener('resize', size);
      window.removeEventListener('scroll', scroll);
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerdown', move);
      document.removeEventListener('pointerout', leave);
      document.removeEventListener('visibilitychange', resume);
      window.removeEventListener('portfolio:creatures', settings);
      motion.removeEventListener('change', resume);
    };
  }, [pathname]);

  return <canvas ref={root} className="workshop-creatures" aria-hidden="true" data-playing="false" />;
}

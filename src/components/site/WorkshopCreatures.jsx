import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { siteAudio } from '../../lib/audio/siteAudio';
import { createCreatures, advanceCreatures } from '../../lib/creatures/steering';
import { paintHabitats } from '../../lib/creatures/paint';

// ponytail: atmospheric workshop inhabitants - page-aware margins & idle-triggered choreography
export default function WorkshopCreatures() {
  const root = useRef(null), { pathname } = useLocation();

  useEffect(() => {
    const canvas = root.current, ctx = canvas.getContext('2d');
    if (!ctx) return;
    const motion = matchMedia('(prefers-reduced-motion:reduce)');
    let width = innerWidth, height = 0, agents = [], flowers = [], pointer = null, touchUntil = 0, raf = 0, last = 0, time = 0, painted = 0, disposed = false, enabled = true;
    let lastActivity = performance.now();

    try { enabled = localStorage.getItem('portfolio_creatures') !== 'false'; } catch { /* storage unavailable */ }

    // Page territory: active in workshop margins on Home & Work; dormant/margin-parked on text-heavy reading pages
    const isWorkshopPage = pathname === '/' || pathname.startsWith('/work');

    function measure() {
      width = innerWidth;
      height = Math.max(document.documentElement.scrollHeight, innerHeight);

      const webs = [];
      const perches = [];

      if (isWorkshopPage) {
        // Query section containers to anchor strictly in architectural margins and structural rafter corners
        const containers = [...document.querySelectorAll('.room-container, .builder-top, .inspection-section, .contribution-chapter, .contact-layout')];
        const visibleContainers = containers.filter(c => {
          const r = c.getBoundingClientRect();
          return r.width > 20 && r.height > 20;
        });

        visibleContainers.forEach(container => {
          const r = container.getBoundingClientRect();
          const top = r.top + scrollY;
          const left = r.left;
          const right = r.right;
          const h = r.height;

          // Pip rafter corners (strictly outside content column in the gutters or beam tops)
          webs.push({ x: Math.max(28, Math.round(left - 24)), y: Math.round(top + 16) });
          if (right + 24 < width) {
            webs.push({ x: Math.min(width - 28, Math.round(right + 24)), y: Math.round(top + 16) });
          } else {
            webs.push({ x: Math.round(right - 20), y: Math.round(top) });
          }

          // Spool margin botanicals (quiet resting spots along outer gutters)
          perches.push({
            x: Math.max(32, Math.round(left - 20)),
            y: Math.round(top + h * 0.42),
            isFlower: true
          });
          perches.push({
            x: Math.min(width - 32, Math.round(right + 20)),
            y: Math.round(top + h * 0.78),
            isFlower: true
          });
        });
      }

      // Graceful margin fallbacks (e.g. on reading pages or minimal layout)
      if (webs.length < 2) {
        webs.push(
          { x: Math.round(width - 42), y: 130 },
          { x: 38, y: Math.round(Math.max(280, height * 0.45)) },
          { x: Math.round(width - 48), y: Math.round(Math.max(480, height * 0.8)) }
        );
      }
      if (perches.length < 2) {
        perches.push(
          { x: 44, y: Math.round(Math.max(220, height * 0.35)), isFlower: true },
          { x: Math.round(width - 50), y: Math.round(Math.max(440, height * 0.72)), isFlower: true }
        );
      }

      flowers = perches;

      if (!agents.length) {
        agents = createCreatures(width, height, { web: webs[0], webs, flowers });
        time = 0;
        return;
      }

      const [spider, butterfly] = agents;
      spider.webs = webs;
      if (spider.anchor >= webs.length) spider.anchor = 0;
      if (!spider.home || Math.hypot(spider.home.x - spider.x, spider.home.y - spider.y) > 900) {
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

      // Idle detection: 3+ seconds of quiet triggers mature ambient motion
      const isIdle = isWorkshopPage && (t - lastActivity) > 3000;

      const before = agents.map(a => a.state);
      advanceCreatures(agents, dt, time, t < touchUntil || !touchUntil ? pointer : null, width, height, isIdle);

      agents.forEach((a, i) => {
        if (['fleeing', 'retreating', 'plumb_line'].includes(a.state) && before[i] !== a.state) {
          siteAudio.cue('creature', { gain: 0.15, rate: a.kind === 'spider' ? 0.8 : 1.2, throttle: 0.9 });
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

    const onUserActivity = () => {
      lastActivity = performance.now();
    };

    const move = e => {
      onUserActivity();
      if (e.pointerType === 'mouse' || e.type === 'pointerdown') {
        pointer = { x: e.clientX, y: e.clientY + scrollY };
        touchUntil = e.pointerType === 'mouse' ? 0 : performance.now() + 750;
      }
    };
    const leave = e => {
      if (e.pointerType === 'mouse' && !e.relatedTarget) pointer = null;
    };
    const scroll = () => {
      onUserActivity();
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
    document.addEventListener('keydown', onUserActivity, { passive: true });
    document.addEventListener('touchstart', onUserActivity, { passive: true });
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
      document.removeEventListener('keydown', onUserActivity);
      document.removeEventListener('touchstart', onUserActivity);
      document.removeEventListener('pointerout', leave);
      document.removeEventListener('visibilitychange', resume);
      window.removeEventListener('portfolio:creatures', settings);
      motion.removeEventListener('change', resume);
    };
  }, [pathname]);

  return <canvas ref={root} className="workshop-creatures" aria-hidden="true" data-playing="false" />;
}

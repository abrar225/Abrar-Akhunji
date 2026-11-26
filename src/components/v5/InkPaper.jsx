import { useEffect, useRef } from 'react';

const inkMotion = '(min-width: 881px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

const pools = [
  { x: .28, y: .38, radius: .68, color: '86, 238, 255', phase: 0 },
  { x: .73, y: .67, radius: .65, color: '151, 119, 255', phase: 2.2 },
  { x: .74, y: .23, radius: .49, color: '83, 166, 255', phase: 3.9 },
];

export default function InkPaper() {
  const canvas = useRef(null);
  const cursor = useRef(null);

  useEffect(() => {
    const paper = canvas.current;
    const section = paper.parentElement;
    const marker = cursor.current;
    const halftone = section.querySelector('.signal-hero-halftone');
    const media = window.matchMedia(inkMotion);
    let stop = () => {};

    function sync() {
      stop();
      if (!media.matches) return;
      const brush = paper.getContext('2d');
      if (!brush) return;

      const aim = { x: .54, y: .5 };
      const ink = { x: .54, y: .5, vx: 0, vy: 0 };
      const point = { x: 0, y: 0 };
      let bounds;
      let visible = false;
      let active = false;
      let frame = 0;
      let time = 0;
      let previous;

      function schedule() {
        if (visible && !document.hidden && !frame) frame = requestAnimationFrame(paint);
      }

      function measure() {
        bounds = section.getBoundingClientRect();
        // The ink is deliberately soft. A low-resolution canvas keeps the cost bounded.
        paper.width = Math.max(1, Math.round(bounds.width * .42));
        paper.height = Math.max(1, Math.round(bounds.height * .42));
        schedule();
      }

      function paint(stamp) {
        frame = 0;
        if (!visible || document.hidden) return;
        const delta = previous ? Math.min(2, (stamp - previous) / 16.67) : 1;
        previous = stamp;
        time += delta * .014;
        ink.vx = (ink.vx + (aim.x - ink.x) * .073 * delta) * .79 ** delta;
        ink.vy = (ink.vy + (aim.y - ink.y) * .073 * delta) * .79 ** delta;
        ink.x += ink.vx * delta;
        ink.y += ink.vy * delta;

        const { width, height } = paper;
        brush.clearRect(0, 0, width, height);
        brush.globalCompositeOperation = 'screen';
        const size = Math.min(width, height);

        for (const pool of pools) {
          const x = (pool.x + Math.sin(time * .57 + pool.phase) * .08 + (ink.x - .5) * .32) * width;
          const y = (pool.y + Math.cos(time * .74 + pool.phase) * .15 + (ink.y - .5) * .32) * height;
          const radius = pool.radius * size;
          const wash = brush.createRadialGradient(x, y, radius * .13, x, y, radius);
          wash.addColorStop(0, `rgba(${pool.color}, .78)`);
          wash.addColorStop(.58, `rgba(${pool.color}, .27)`);
          wash.addColorStop(1, `rgba(${pool.color}, 0)`);
          brush.fillStyle = wash;
          brush.fillRect(x - radius, y - radius, radius * 2, radius * 2);
        }

        if (halftone) {
          halftone.style.setProperty('--ink-x', `${ink.x * 100}%`);
          halftone.style.setProperty('--ink-y', `${ink.y * 100}%`);
        }
        if (active) {
          point.x += (aim.x - point.x) * .31 * delta;
          point.y += (aim.y - point.y) * .31 * delta;
          marker.style.transform = `translate3d(${point.x * bounds.width}px, ${point.y * bounds.height}px, 0)`;
        }
        schedule();
      }

      function move(event) {
        if (event.pointerType !== 'mouse') return;
        bounds = section.getBoundingClientRect();
        aim.x = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
        aim.y = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height));
        if (!active) {
          point.x = aim.x;
          point.y = aim.y;
        }
        active = true;
        marker.dataset.active = 'true';
        marker.dataset.overLink = String(Boolean(event.target.closest('a,button')));
        schedule();
      }

      function leave() {
        active = false;
        marker.dataset.active = 'false';
        aim.x = .54;
        aim.y = .5;
      }

      function pause() {
        cancelAnimationFrame(frame);
        frame = 0;
        previous = undefined;
      }

      const sizeObserver = new ResizeObserver(measure);
      const visibility = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) schedule();
        else { pause(); leave(); }
      });
      const onVisibility = () => document.hidden ? pause() : schedule();

      measure();
      sizeObserver.observe(section);
      visibility.observe(section);
      section.addEventListener('pointermove', move, { passive: true });
      section.addEventListener('pointerleave', leave);
      document.addEventListener('visibilitychange', onVisibility);
      paper.dataset.active = 'true';

      stop = () => {
        pause();
        leave();
        delete paper.dataset.active;
        halftone?.style.removeProperty('--ink-x');
        halftone?.style.removeProperty('--ink-y');
        sizeObserver.disconnect();
        visibility.disconnect();
        section.removeEventListener('pointermove', move);
        section.removeEventListener('pointerleave', leave);
        document.removeEventListener('visibilitychange', onVisibility);
      };
    }

    sync();
    media.addEventListener('change', sync);
    return () => { stop(); media.removeEventListener('change', sync); };
  }, []);

  return (
    <>
      <canvas className="signal-ink-canvas" ref={canvas} aria-hidden="true" />
      <span className="signal-ink-cursor" ref={cursor} aria-hidden="true"><i /></span>
    </>
  );
}

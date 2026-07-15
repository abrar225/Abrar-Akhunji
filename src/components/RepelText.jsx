import React, { useRef, useEffect } from 'react';

/**
 * RepelText — interactive spring headline (pretext "interruptible spring" DNA,
 * made robust). Every letter is an inline-block span. As the pointer (mouse OR
 * touch) moves across the text, nearby letters are pushed away from it — with a
 * little rotation and scale — then ease back home when the pointer leaves.
 *
 * Works on every device: mouse, trackpad, touch. Per-letter transforms are
 * written imperatively in one rAF loop (never React state); base positions come
 * from offsetLeft/Top (layout, unaffected by transforms) and are re-measured on
 * resize + after fonts load. Pauses when scrolled off-screen. Reduced-motion:
 * fully static.
 */

const RADIUS = 130;   // px influence around the pointer
const MAX_PUSH = 30;  // px max displacement
const MAX_ROT = 16;   // deg max rotation
const LERP = 0.16;    // easing toward target (stable, springy)

export default function RepelText({ text = '', className = '', as: Tag = 'div' }) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const letters = [...root.querySelectorAll('.rl')];
    const st = letters.map((el) => ({ el, x: 0, y: 0, r: 0, s: 1, bx: 0, by: 0 }));

    // Base positions are the letters' centres relative to the root. Measure with
    // rects (robust to the nested word spans + wrapping); zero the transform
    // first so a mid-flight transform never contaminates the base reading.
    const measure = () => {
      const rootRect = root.getBoundingClientRect();
      st.forEach((o) => {
        const prev = o.el.style.transform;
        o.el.style.transform = 'none';
        const r = o.el.getBoundingClientRect();
        o.el.style.transform = prev;
        o.bx = r.left - rootRect.left + r.width / 2;
        o.by = r.top - rootRect.top + r.height / 2;
      });
    };
    measure();
    if (document.fonts?.ready) document.fonts.ready.then(measure).catch(() => {});
    const ro = new ResizeObserver(measure);
    ro.observe(root);

    if (reduce) {
      return () => ro.disconnect();
    }

    const pointer = { x: 0, y: 0, active: false };
    const move = (cx, cy) => {
      const rect = root.getBoundingClientRect();
      pointer.x = cx - rect.left;
      pointer.y = cy - rect.top;
      pointer.active = true;
    };
    const onMouse = (e) => move(e.clientX, e.clientY);
    const onTouch = (e) => { if (e.touches[0]) move(e.touches[0].clientX, e.touches[0].clientY); };
    const leave = () => { pointer.active = false; };

    root.addEventListener('mousemove', onMouse);
    root.addEventListener('mouseleave', leave);
    root.addEventListener('touchmove', onTouch, { passive: true });
    root.addEventListener('touchend', leave);
    root.addEventListener('touchcancel', leave);

    // pause rAF when off-screen
    let onScreen = true;
    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; }, { threshold: 0 });
    io.observe(root);

    let raf;
    const tick = () => {
      if (onScreen) {
        for (const o of st) {
          let tx = 0, ty = 0, tr = 0, ts = 1;
          if (pointer.active) {
            const dx = o.bx - pointer.x;
            const dy = o.by - pointer.y;
            const d = Math.hypot(dx, dy) || 0.001;
            if (d < RADIUS) {
              const f = 1 - d / RADIUS;      // 1 at pointer → 0 at edge
              const nx = dx / d, ny = dy / d;
              tx = nx * f * MAX_PUSH;
              ty = ny * f * MAX_PUSH;
              tr = nx * f * MAX_ROT;
              ts = 1 + f * 0.18;
            }
          }
          o.x += (tx - o.x) * LERP;
          o.y += (ty - o.y) * LERP;
          o.r += (tr - o.r) * LERP;
          o.s += (ts - o.s) * LERP;
          o.el.style.transform =
            `translate(${o.x.toFixed(2)}px,${o.y.toFixed(2)}px) rotate(${o.r.toFixed(2)}deg) scale(${o.s.toFixed(3)})`;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      root.removeEventListener('mousemove', onMouse);
      root.removeEventListener('mouseleave', leave);
      root.removeEventListener('touchmove', onTouch);
      root.removeEventListener('touchend', leave);
      root.removeEventListener('touchcancel', leave);
    };
  }, [text]);

  const words = text.split(' ');
  return (
    <Tag ref={ref} className={`select-none ${className}`} aria-label={text}>
      {words.map((w, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap" aria-hidden="true">
          {w.split('').map((ch, ci) => (
            <span key={ci} className="rl inline-block will-change-transform">{ch}</span>
          ))}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
}

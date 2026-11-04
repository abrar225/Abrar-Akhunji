import { useEffect, useRef } from 'react';
import { createCreatures, advanceCreatures } from '../../lib/creatures/steering';
import { paintHabitats } from '../../lib/creatures/paint';

/** Pip and Spool introduce the same inhabitants found further into the workshop. */
export default function IntroCreatures() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current, ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frame = 0, last = 0, time = 0, pointer = null, touchUntil = 0;
    let agents, flowers, habitatKey;
    try { if (localStorage.getItem('portfolio_creatures') === 'false') return; } catch { /* Storage can be unavailable. */ }
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const draw = timestamp => {
      const dt = last ? Math.min(.05, (timestamp - last) / 1000) : 0;
      last = timestamp;
      if (!reduced.matches) time += dt;
      const w = innerWidth, h = innerHeight, compact = w < 768;
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) { canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr); }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
      const key = `${w}:${h}`;
      if (habitatKey !== key) {
        habitatKey = key;
        const web = { x: w - (compact ? 32 : 85), y: Math.min(152, h * .19) };
        flowers = [
          { x: w - (compact ? 53 : 120), y: h * .73 },
          { x: w - (compact ? 104 : 255), y: h * .81 },
        ];
        agents = createCreatures(w, h, { web, flowers });
        agents[0].until = time + .1;
        agents[1].until = time + .25;
      }
      if (!reduced.matches) advanceCreatures(agents, dt, time, touchUntil && timestamp > touchUntil ? null : pointer, w, h);
      const style = getComputedStyle(canvas);
      paintHabitats(ctx, agents, flowers, time, 0, style.getPropertyValue('--color-fg').trim(), style.getPropertyValue('--color-accent').trim(), style.getPropertyValue('--color-canvas').trim());
      canvas.dataset.creatures = JSON.stringify(agents.map(({ name, x, y, state }) => ({ name, x, y, state })));
      if (!reduced.matches) frame = requestAnimationFrame(draw);
    };
    const move = event => {
      if (event.pointerType !== 'mouse' && event.type !== 'pointerdown') return;
      pointer = { x: event.clientX, y: event.clientY };
      touchUntil = event.pointerType === 'mouse' ? 0 : performance.now() + 750;
    };
    const clear = () => { pointer = null; };
    frame = requestAnimationFrame(draw);
    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerdown', move, { passive: true });
    window.addEventListener('blur', clear);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerdown', move);
      window.removeEventListener('blur', clear);
    };
  }, []);
  return <canvas ref={ref} className="intro-creatures" aria-hidden="true"/>;
}

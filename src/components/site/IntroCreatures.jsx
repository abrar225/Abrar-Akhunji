import { useEffect, useRef } from 'react';
import { createCreatures } from '../../lib/creatures/steering';
import { paintHabitats } from '../../lib/creatures/paint';

/** Pip and Spool introduce the same inhabitants found further into the workshop. */
export default function IntroCreatures() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current, ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frame = 0, start = 0, pointer = null;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const draw = timestamp => {
      if (!start) start = timestamp;
      const t = reduced.matches ? 0 : (timestamp - start) / 1000;
      const w = innerWidth, h = innerHeight, compact = w < 768;
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) { canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr); }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
      const web = { x: w - (compact ? 38 : 85), y: compact ? 168 : 120 };
      const flower = { x: w * (compact ? .82 : .82), y: h * (compact ? .77 : .72) };
      const agents = createCreatures(w, h, { web, flowers: [flower] });
      agents[0].y = web.y + 40 + Math.sin(t * 1.4) * 18; agents[0].phase = t * 2;
      const butterfly = agents[1]; butterfly.state = 'flying';
      butterfly.x = flower.x + Math.sin(t * 1.2) * (compact ? 20 : 65);
      butterfly.y = flower.y - 44 + Math.cos(t * 1.7) * 24;
      if (pointer && Math.hypot(pointer.x - butterfly.x, pointer.y - butterfly.y) < 95) { butterfly.x += (butterfly.x - pointer.x) * .3; butterfly.y -= 20; }
      const style = getComputedStyle(canvas);
      paintHabitats(ctx, agents, [flower], t, 0, style.getPropertyValue('--color-fg').trim(), style.getPropertyValue('--color-muted').trim(), style.getPropertyValue('--color-canvas').trim());
      canvas.dataset.creatures = 'Pip the spider, Spool the butterfly';
      if (!reduced.matches) frame = requestAnimationFrame(draw);
    };
    const move = event => { pointer = { x: event.clientX, y: event.clientY }; };
    frame = requestAnimationFrame(draw);
    document.addEventListener('pointermove', move, { passive: true });
    return () => { cancelAnimationFrame(frame); document.removeEventListener('pointermove', move); };
  }, []);
  return <canvas ref={ref} className="intro-creatures" aria-hidden="true"/>;
}

import { useEffect, useRef, useState } from 'react';
import { Pause, Play, Shuffle, RotateCcw } from 'lucide-react';
import { siteAudio } from '../../lib/audio/siteAudio';
import { advanceGlyphs, scatterGlyphs } from '../../lib/river/glyphs';

/** Original character fields, painted only while visible. No external assets or WebGL. */
export default function AsciiSignal({ variant = 'ambient' }) {
  const canvasRef = useRef(null), runtime = useRef(null), sensitivityRef=useRef(.85);
  const [sensitivity,setSensitivity]=useState(85);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  const labels = { ambient: 'Signals from the workshop', name: 'Abrar Akhunji, rendered in ASCII' };
  useEffect(() => {
    const canvas = canvasRef.current, context = canvas.getContext('2d');
    if (!context) return;
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0, height = 0, frame = 0, visible = false, disposed = false, stopped = false;
    let elapsed = 0, last = 0, paintedAt = 0, renders = 0, pointer = null, pointerDown = null, lastPhysics = 0, revealInk = false;
    let mask = null;
    function createName() {
      const cell = width < 600 ? 4.7 : 6;
      const columns = Math.floor(width / cell), rows = width < 600 ? 46 : 36;
      if (columns < 1 || height < 1) { mask = null; return; }
      const surface = document.createElement('canvas'); surface.width = columns; surface.height = rows;
      const ink = surface.getContext('2d');
      const lines = width < 600 ? ['ABRAR', 'AKHUNJI'] : ['ABRAR AKHUNJI'];
      const lineHeight = rows / lines.length;
      for (const [i, line] of lines.entries()) {
        let size = lineHeight * .9;
        ink.font = `800 ${size}px Bricolage, sans-serif`;
        size *= Math.min(1, (columns - 2) / ink.measureText(line).width);
        ink.font = `800 ${size}px Bricolage, sans-serif`; ink.fillStyle = '#fff'; ink.textAlign = 'center';
        ink.fillText(line, columns / 2, i * lineHeight + lineHeight * .81);
      }
      const pixels = ink.getImageData(0, 0, columns, rows).data, points = [];
      for(let y=0;y<rows;y++)for(let x=0;x<columns;x++){if(pixels[(y*columns+x)*4+3]<70)continue;const homeX=(x+.5)*cell,homeY=(y+.5)*height/rows;points.push({homeX,homeY,x:homeX,y:homeY,vx:0,vy:0,glyph:'@#0'[(x*7+y*3)%3]});}
      mask = { points, columns, rows, cell };
    }
    function draw() {
      if (!visible || document.hidden || !width || disposed) return;
      const styles = getComputedStyle(canvas), ink = styles.getPropertyValue('--color-fg').trim(), blue = styles.getPropertyValue('--color-accent').trim();
      context.clearRect(0, 0, width, height);
      context.textAlign = 'center'; context.textBaseline = 'middle';
      const t = elapsed / 1000;
      if (variant === 'name' && mask) {
        const { points, columns, cell } = mask;
        const dt = (elapsed-lastPhysics)/1000; lastPhysics=elapsed;
        if (!stopped && !media.matches) advanceGlyphs(points,dt,pointer,width,height,sensitivityRef.current);
        const scan = ((t * .13) % 1.5) * columns * cell;
        context.font = `600 ${cell * 1.6}px "DM Mono", monospace`;
        let displaced=0;
        for (const p of points) {
          const distance=Math.hypot(p.x-p.homeX,p.y-p.homeY);
          if(distance>1.5)displaced++;
          const lit=revealInk||distance>2||Math.abs(p.x-scan)<40;
          context.globalAlpha=lit?1:.92;context.fillStyle=lit?blue:ink;
          context.fillText(p.glyph,p.x,p.y);
        }
        canvas.dataset.displaced=String(displaced);
      } else if (variant === 'ambient') {
        context.font = '10px "DM Mono", monospace';
        for (let x = 10; x < width; x += 13) for (let y = 8; y < height; y += 13) {
          const wave = height * .5 + Math.sin(x / 100 + t * .45) * height * .18 + Math.cos(x / 55 - t * .3) * 16;
          const distance = Math.abs(y - wave);
          if (distance > 48) continue;
          context.globalAlpha = (1 - distance / 48) * .26;
          context.fillStyle = distance < 10 ? blue : ink;
          context.fillText(distance < 12 ? '+' : '.', x, y);
        }
      }
      context.globalAlpha = 1;
      canvas.dataset.ready = 'true'; canvas.dataset.renders = String(++renders);
    }
    function stop() { cancelAnimationFrame(frame); frame = 0; last = 0; canvas.dataset.playing = 'false'; }
    function tick(time) {
      frame = 0;
      if (disposed || !visible || document.hidden || stopped || media.matches) { stop(); return; }
      if (last) elapsed += Math.min(80, time - last); last = time;
      if (time - paintedAt > 48) { paintedAt = time; draw(); }
      canvas.dataset.playing = 'true'; frame = requestAnimationFrame(tick);
    }
    function resume() { stop(); draw(); if (visible && !document.hidden && !stopped && !media.matches) frame = requestAnimationFrame(tick); }
    function resize() {
      width = canvas.clientWidth; height = canvas.clientHeight;
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr); context.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (variant === 'name') createName(); draw();
    }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; resume(); }, { threshold: .05 });
    const sizes = new ResizeObserver(resize), theme = new MutationObserver(draw);
    sizes.observe(canvas); observer.observe(canvas); theme.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    const move = event => { if(event.pointerType!=='mouse'||variant!=='name')return;const rect=canvas.getBoundingClientRect();const x=event.clientX-rect.left,y=event.clientY-rect.top,now=performance.now();const speed=pointer?Math.min(1,Math.hypot(x-pointer.x,y-pointer.y)/Math.max(1,now-pointer.time)):0;pointer={x,y,time:now,speed};if(speed>.4&&!media.matches&&!stopped)siteAudio.cue('scatter',{gain:.12,rate:1.2,throttle:.35});if(stopped||media.matches)draw(); };
    const reset = () => { pointer=null; if(stopped||media.matches)draw(); };
    const down = event => { pointerDown={x:event.clientX,y:event.clientY}; };
    function scatter(center=null) { siteAudio.cue('scatter',{gain:.75,throttle:.1});if(media.matches)revealInk=true;else if(mask){scatterGlyphs(mask.points,width,height,center,sensitivityRef.current);if(stopped)advanceGlyphs(mask.points,.08,null,width,height);}draw(); }
    const up = event => { const start=pointerDown;pointerDown=null;if(variant!=='name'||!start||Math.hypot(event.clientX-start.x,event.clientY-start.y)>8)return;const rect=canvas.getBoundingClientRect();scatter({x:event.clientX-rect.left,y:event.clientY-rect.top}); };
    canvas.addEventListener('pointermove', move); canvas.addEventListener('pointerleave', reset); canvas.addEventListener('pointerdown',down);canvas.addEventListener('pointerup',up);
    document.addEventListener('visibilitychange', resume); const motionChange=()=>{setReduced(media.matches);if(media.matches&&mask)mask.points.forEach(p=>{p.x=p.homeX;p.y=p.homeY;p.vx=p.vy=0;});resume();};media.addEventListener('change', motionChange);
    runtime.current = { pause(value) { stopped = value; resume(); }, scatter, rebuild() { siteAudio.cue('reform',{gain:.75,throttle:.1});pointer=null;revealInk=false;if(mask)mask.points.forEach(p=>{p.vx=p.vy=0;if(media.matches||stopped){p.x=p.homeX;p.y=p.homeY;}});draw(); } };
    resize(); document.fonts.ready.then(() => { if (!disposed) { if (variant === 'name') createName(); draw(); } });
    return () => { disposed = true; stop(); observer.disconnect(); sizes.disconnect(); theme.disconnect(); canvas.removeEventListener('pointermove', move); canvas.removeEventListener('pointerleave', reset); document.removeEventListener('visibilitychange', resume); media.removeEventListener('change', motionChange);canvas.removeEventListener('pointerdown',down);canvas.removeEventListener('pointerup',up); runtime.current = null; };
  }, [variant]);
  return <figure className={`ascii-scene ascii-${variant}`}>
    <canvas ref={canvasRef} data-cursor={variant === 'name' ? 'Scatter' : undefined} data-cursor-mode={variant === 'name' ? 'pixel' : undefined} aria-hidden="true" data-ready="false" data-playing="false" />
    <span className="ascii-fallback" aria-hidden="true">{variant === 'name' ? 'ABRAR AKHUNJI' : '. . + . . + . .'}</span>
    <figcaption><span>{labels[variant]}</span><span className="ascii-controls">{variant === 'name' && <>{!reduced&&<label className="name-sensitivity">Feel<input aria-label="Name sensitivity" type="range" min="25" max="120" value={sensitivity} onChange={e=>{const value=Number(e.target.value);setSensitivity(value);sensitivityRef.current=value/100;}}/></label>}<button type="button" onClick={() => runtime.current?.scatter()}><Shuffle size={13}/>{reduced?'Trace the name':'Scatter letters'}</button><button type="button" onClick={() => runtime.current?.rebuild()}><RotateCcw size={13}/>Reform name</button></>}<button type="button" aria-label={`${paused ? 'Play' : 'Pause'} ${variant} ASCII animation`} aria-pressed={paused} onClick={() => { const next = !paused; setPaused(next); runtime.current?.pause(next); }}>{paused ? <Play size={13}/> : <Pause size={13}/>}<span>{paused ? 'Play' : 'Pause'}</span></button></span></figcaption>
  </figure>;
}

import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

export default function Sculpture() {
  const stage = useRef(null);
  const scene = useRef(null);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    let disposed = false;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const load = async () => {
      if (scene.current || motion.matches || navigator.connection?.saveData) return;
      try {
        const { mountSignal } = await import('./renderSignal');
        if (disposed || motion.matches || scene.current) return;
        scene.current = mountSignal(stage.current);
        setReady(Boolean(scene.current));
      } catch {
        // The static render remains visible on devices without WebGL.
      }
    };
    const idle = window.setTimeout(load, 100);
    motion.addEventListener('change', load);
    return () => {
      disposed = true;
      window.clearTimeout(idle);
      motion.removeEventListener('change', load);
      scene.current?.dispose();
      scene.current = null;
    };
  }, []);

  useEffect(() => { scene.current?.update(!paused); }, [paused, ready]);

  return (
    <figure className="signal-sculpture">
      <div className="signal-scope">
        <div className="signal-scope-grid" aria-hidden="true" />
        <span className="signal-scope-cross" aria-hidden="true">+</span>
        <span className="signal-scope-cross signal-scope-cross-end" aria-hidden="true">+</span>
        <span className="signal-scope-orbit" aria-hidden="true" />
        <div className="signal-scope-image" ref={stage} aria-hidden="true">
          <img src="/assets/v5/signal-field.webp" alt="" width="750" height="750" fetchPriority="high" />
        </div>
      </div>
      <figcaption>
        <span><i /> Signal field</span>
        {ready && <button type="button" aria-label={paused ? 'Play signal motion' : 'Pause signal motion'} onClick={() => setPaused(!paused)}>{paused ? <Play size={14} /> : <Pause size={14} />}</button>}
      </figcaption>
    </figure>
  );
}

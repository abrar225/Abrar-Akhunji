import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

/**
 * Opening sequence — a halide dot matrix fills with the percent counter,
 * then the overlay wipes away. Reduced motion completes immediately.
 */
const COLS = 12;
const ROWS = 6;
const CELLS = COLS * ROWS;

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const lit = Math.round((progress / 100) * CELLS);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let cancelled = false;

    if (reduce) {
      const p = setTimeout(() => { if (!cancelled) setProgress(100); }, 0);
      const t = setTimeout(() => { if (!cancelled) onComplete(); }, 280);
      return () => { cancelled = true; clearTimeout(p); clearTimeout(t); };
    }

    const counter = { v: 0 };
    const tween = gsap.to(counter, {
      v: 100,
      duration: 1.45,
      ease: 'power2.inOut',
      onUpdate: () => { if (!cancelled) setProgress(Math.round(counter.v)); },
      onComplete: () => { if (!cancelled) setTimeout(onComplete, 380); },
    });

    return () => { cancelled = true; tween.kill(); };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[999] bg-canvas overflow-hidden flex items-center justify-center"
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="flex flex-col items-center gap-8">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-semibold tracking-[-0.045em] text-fg text-5xl md:text-7xl"
        >
          ABRAR.
        </motion.span>
        <div
          className="grid gap-[7px]"
          style={{ gridTemplateColumns: `repeat(${COLS}, 11px)` }}
          aria-hidden="true"
        >
          {Array.from({ length: CELLS }, (_, i) => (
            <span
              key={i}
              className={`block w-[11px] h-[11px] rounded-[2px] ${i < lit ? 'bg-accent' : 'bg-line'}`}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-6 md:left-12 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted">
        Full-Stack &amp; AI/ML Engineer
      </div>
      <div className="absolute bottom-8 right-6 md:right-12 font-display font-medium tabular-nums text-fg text-2xl md:text-3xl">
        {String(progress).padStart(3, '0')}
      </div>
    </motion.div>
  );
};

export default LoadingScreen;

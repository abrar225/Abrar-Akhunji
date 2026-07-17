import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

/**
 * LoadingScreen — truus-clone-style scribble intro.
 * An ember scribble draws itself across the canvas (strokeDashoffset), the
 * "ABRAR." wordmark fades in mid-draw, a small counter ticks 000→100, then the
 * whole overlay wipes up to reveal the site. Reduced-motion: instant.
 */
const SCRIBBLE =
  'M8 170 C 130 30, 210 320, 330 165 C 430 40, 520 40, 620 205 C 705 330, 830 30, 905 165 C 955 235, 980 110, 1112 150';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const pathRef = useRef(null);
  const markRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const path = pathRef.current;
    if (!path) { onComplete(); return; }

    if (reduce) {
      // Defer setState out of the synchronous effect body (avoids cascading render)
      const p = setTimeout(() => setProgress(100), 0);
      const t = setTimeout(onComplete, 250);
      return () => { clearTimeout(p); clearTimeout(t); };
    }

    const len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 });
    gsap.set(markRef.current, { opacity: 0, y: 12 });

    const counter = { v: 0 };
    const tl = gsap.timeline({ onComplete: () => setTimeout(onComplete, 500) });

    tl.to(path, { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut' }, 0)
      .to(counter, {
        v: 100, duration: 1.5, ease: 'power2.inOut',
        onUpdate: () => setProgress(Math.round(counter.v)),
      }, 0)
      .to(markRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.55);

    return () => tl.kill();
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[999] bg-canvas overflow-hidden flex items-center justify-center"
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.9, ease: [0.86, 0, 0.07, 1] }}
    >
      <svg
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[130vw] md:w-[80vw] h-auto"
        viewBox="0 0 1120 340" fill="none" preserveAspectRatio="xMidYMid meet" aria-hidden="true"
      >
        <path ref={pathRef} d={SCRIBBLE} stroke="var(--color-accent)" strokeWidth="7"
          strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <div ref={markRef} className="relative z-10 text-center">
        <span className="font-display font-bold tracking-tight text-fg text-5xl md:text-7xl">
          ABRAR<span className="text-accent">.</span>
        </span>
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

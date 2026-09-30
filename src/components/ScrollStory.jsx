import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const THREAD = 'M10 0 C 18 90, 5 170, 12 260 C 20 350, 5 440, 14 530 C 20 630, 5 720, 13 810 C 18 900, 7 960, 11 1000';

export function ScrollThread() {
  const pathRef = useRef(null);
  const beadRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    const bead = beadRef.current;
    if (!path) return undefined;

    const length = path.getTotalLength();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      path.style.strokeDasharray = 'none';
      path.style.strokeDashoffset = '0';
      if (bead) bead.setAttribute('opacity', '0');
      return undefined;
    }

    path.style.strokeDasharray = `${length}`;
    let raf = 0;
    const tick = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const y = window.__lenis?.scroll ?? window.scrollY;
      const progress = Math.min(1, Math.max(0, y / max));
      path.style.strokeDashoffset = String(length * (1 - progress));
      if (bead) {
        const point = path.getPointAtLength(length * progress);
        bead.setAttribute('cx', String(point.x));
        bead.setAttribute('cy', String(point.y));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <svg className="scroll-thread" viewBox="0 0 64 1000" preserveAspectRatio="none" aria-hidden="true">
      <path
        ref={pathRef}
        d={THREAD}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
      />
      <circle ref={beadRef} r="2.4" fill="currentColor" />
    </svg>
  );
}

export function ProgressiveBlur() {
  return (
    <>
      <div className="edge-blur edge-blur-top" aria-hidden="true" />
      <div className="edge-blur edge-blur-bottom" aria-hidden="true" />
    </>
  );
}

export function StoryMotion() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;

    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-chapter]').forEach((el) => {
        gsap.fromTo(el,
          { y: 32, rotateX: 14, filter: 'blur(8px)', opacity: 0 },
          {
            y: 0,
            rotateX: 0,
            filter: 'blur(0px)',
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          });
      });
    });

    const refresh = setTimeout(() => ScrollTrigger.refresh(), 700);
    return () => {
      clearTimeout(refresh);
      ctx.revert();
    };
  }, []);

  return null;
}

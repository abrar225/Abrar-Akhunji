import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * A single-viewport philosophy rule.
 * A short scroll-linked drift — never a pinned multi-screen void.
 */
export default function HorizontalWords({ words = [], className = '' }) {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const tween = gsap.fromTo(track, { x: 18 }, {
      x: -36,
      ease: 'none',
      scrollTrigger: {
        trigger: track.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.45,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  if (!words.length) return null;

  return (
    <section className={`border-y border-line bg-surface/40 ${className}`} aria-label="Practice in one line">
      <div ref={trackRef} className="max-w-[1400px] mx-auto px-6 md:px-12 py-8 md:py-10 flex flex-wrap items-baseline gap-x-4 gap-y-2">
        {words.map((word, i) => {
          const label = typeof word === 'string' ? word : word.text;
          return (
            <span key={label} className="inline-flex items-baseline gap-4">
              <span className="font-display text-[clamp(1.6rem,3vw,2.6rem)] font-medium tracking-[-0.04em] text-fg">
                {label}
              </span>
              {i < words.length - 1 && (
                <span className="font-serif italic text-accent text-2xl md:text-3xl" aria-hidden="true">/</span>
              )}
            </span>
          );
        })}
      </div>
    </section>
  );
}

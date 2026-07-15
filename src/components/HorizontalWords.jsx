import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * HorizontalWords — accurate truus-clone port.
 *
 * Desktop: the section pins and the giant phrase scrubs sideways 1:1 with
 * scroll; every letter bounces into place with `elastic.out(1.2, 1)` driven off
 * the horizontal tween via `containerAnimation` (the signature truus move).
 *
 * The old cut-off bug is fixed at the root:
 *  - travel distance is computed in functions with invalidateOnRefresh, and
 *  - ScrollTrigger.refresh() re-runs after `document.fonts.ready`, so the track
 *    is measured with the real serif font, never the fallback.
 *  - scroll distance === horizontal travel (1:1), so the phrase always finishes
 *    exactly when the pin releases.
 *
 * Mobile: no pin — a seamless infinite drift loop instead.
 * Reduced motion: static wrapped text.
 */
export default function HorizontalWords({ words = [], className = '' }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const mm = gsap.matchMedia();

    // ---- desktop: pinned scrub + elastic letter bounce (truus) ----
    mm.add('(min-width: 768px)', () => {
      const ctx = gsap.context(() => {
        const letters = track.querySelectorAll('.hword-letter');
        const stickers = track.querySelectorAll('.hword-sticker');

        // slide in from the right, exit fully to the left — measured live
        const fromX = () => window.innerWidth * 0.5;
        const toX = () => -(track.scrollWidth - window.innerWidth * 0.5);
        const travel = () => fromX() - toX();

        const scrollTween = gsap.fromTo(
          track,
          { x: fromX },
          {
            x: toX,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: () => `+=${travel()}`, // 1:1 → always completes before unpin
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          }
        );

        // truus: each letter bounces in, driven off the horizontal tween
        letters.forEach((letter) => {
          gsap.from(letter, {
            yPercent: (Math.random() - 0.5) * 500,
            rotation: (Math.random() - 0.5) * 60,
            ease: 'elastic.out(1.2, 1)',
            scrollTrigger: {
              trigger: letter,
              containerAnimation: scrollTween,
              start: 'left 90%',
              end: 'left 10%',
              scrub: 0.5,
            },
          });
        });

        stickers.forEach((sticker) => {
          gsap.from(sticker, {
            scale: 0,
            yPercent: (Math.random() - 0.5) * 400,
            rotation: (Math.random() - 0.5) * 60,
            ease: 'elastic.out(1.2, 1)',
            scrollTrigger: {
              trigger: sticker,
              containerAnimation: scrollTween,
              start: 'left 90%',
              end: 'left 10%',
              scrub: 0.5,
            },
          });
        });
      }, section);
      return () => ctx.revert();
    });

    // ---- mobile: seamless infinite drift, no pin ----
    mm.add('(max-width: 767px)', () => {
      const half = track.scrollWidth / 2;
      if (!half) return;
      const wrap = gsap.utils.wrap(-half, 0);
      let x = 0;
      const setX = gsap.quickSetter(track, 'x', 'px');
      const tick = (t, deltaMs) => {
        x = wrap(x - 45 * Math.min(deltaMs / 1000, 0.05));
        setX(x);
      };
      gsap.ticker.add(tick);
      return () => gsap.ticker.remove(tick);
    });

    // re-measure once the display serif actually loads (root fix for cut-off)
    let cancelled = false;
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => { if (!cancelled) ScrollTrigger.refresh(); }).catch(() => {});
    }

    return () => {
      cancelled = true;
      mm.revert();
    };
  }, [words]);

  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;
  // mobile marquee needs a duplicated sequence to wrap seamlessly
  const sequence = isMobile ? [...words, ...words] : words;

  return (
    <section
      ref={sectionRef}
      className={`hwords-section relative flex items-center overflow-hidden min-h-[46vh] md:h-screen bg-canvas ${className}`}
    >
      <div ref={trackRef} className="flex items-center w-max will-change-transform gap-[5vw] px-[4vw]">
        {sequence.map((w, wi) => {
          const Sticker = w.sticker;
          return (
            <span key={wi} className="inline-flex items-center shrink-0">
              <span className="font-serif text-fg leading-[0.9] tracking-tight text-[16vw] md:text-[12vw] whitespace-nowrap">
                {w.text.split('').map((ch, ci) => (
                  <span key={ci} className="hword-letter inline-block will-change-transform">{ch}</span>
                ))}
              </span>
              {Sticker && (
                <span className="hword-sticker inline-flex items-center justify-center ml-[4vw] text-accent will-change-transform">
                  {typeof Sticker === 'string' ? (
                    <span className="text-[8vw] md:text-[5vw]">{Sticker}</span>
                  ) : (
                    <Sticker
                      className="w-[7vw] h-[7vw] md:w-[4.5vw] md:h-[4.5vw]"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  )}
                </span>
              )}
            </span>
          );
        })}
      </div>
    </section>
  );
}

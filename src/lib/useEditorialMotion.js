import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll gives physical objects a place to settle. Reading copy stays still.
 * No content is hidden by this enhancement, including before JS loads.
 * @param {import('react').RefObject<HTMLElement>} scopeRef Page-local root.
 * @param {string} [routeKey] Recreate scoped triggers when route content changes.
 */
export default function useEditorialMotion(scopeRef, routeKey = '') {
  useEffect(() => {
    const root = scopeRef.current;
    if (!root) return;
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const compact = window.matchMedia('(max-width: 767px)').matches;
        const distance = compact ? 22 : 58;
        const settle = (element, from, to, trigger = element) => gsap.fromTo(element,
          from, {
            ...to, ease: 'none',
            scrollTrigger: {
              trigger, start: 'top 95%', end: 'top 30%',
              scrub: .65, invalidateOnRefresh: true,
            },
          });

        // A portrait is placed on the desk, then comes square with the reader.
        root.querySelectorAll('.portrait').forEach(element => {
          settle(element, { y: distance, rotate: 5 }, { y: 0, rotate: 0 });
        });

        // Project artefacts settle onto their shelf; text and links never fade.
        root.querySelectorAll('.shelf-project').forEach((element, index) => {
          settle(element, { y: distance + index * 12, rotate: index % 2 ? 2 : -2 },
            { y: 0, rotate: 0 }, element.parentElement);
        });
        root.querySelectorAll('.work-card-image').forEach((element, index) => {
          settle(element, { y: compact ? 18 : 42, rotate: index % 2 ? 1.5 : -1.5 },
            { y: 0, rotate: 0 });
        });

        // The case-study demonstration opens the frame as the reader arrives.
        root.querySelectorAll('.case-preview img').forEach(element => {
          settle(element, { scale: .96, y: 20 }, { scale: 1, y: 0 }, element.parentElement);
        });

        // This is the concluding physical callback to the homepage build line.
        root.querySelectorAll('.contact-art').forEach(element => {
          settle(element, { x: compact ? 18 : 70, rotate: -3 }, { x: 0, rotate: 0 });
        });

        // Keep the technical reading sections still. Only opening titles move.
        root.querySelectorAll('.builder-top h2, .archive-section h2, .writing-section h2, .contact-section h2, .page-intro h1, .case-header h1').forEach(element => {
          settle(element, { y: compact ? 12 : 24 }, { y: 0 });
        });
      });
    }, root);
    // Recalculate when local images finish; lazy images can change section size.
    const refresh = () => ScrollTrigger.refresh();
    const pendingImages = [...root.querySelectorAll('img')].filter(image => !image.complete);
    pendingImages.forEach(image => image.addEventListener('load', refresh, { once: true }));
    const frame = requestAnimationFrame(refresh);
    return () => {
      cancelAnimationFrame(frame);
      pendingImages.forEach(image => image.removeEventListener('load', refresh));
      media.revert();
      context.revert();
    };
  }, [scopeRef, routeKey]);
}

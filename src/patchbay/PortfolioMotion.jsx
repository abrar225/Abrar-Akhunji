import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './scroll';

export default function PortfolioMotion() {
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(min-width: 751px) and (pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)', () => {
      const pointer = document.createElement('span');
      pointer.className = 'patch-global-cursor';
      pointer.setAttribute('aria-hidden', 'true');
      pointer.append(document.createElement('i'));
      document.body.append(pointer);
      const lenis = new Lenis({
        autoRaf: false,
        lerp: .16,
        prevent: node => Boolean(node.closest('dialog, [data-detail="true"]')),
      });
      const unsubscribe = lenis.on('scroll', ScrollTrigger.update);
      const tick = time => lenis.raf(time * 1000);
      gsap.ticker.add(tick);

      const x = gsap.quickTo(pointer, 'x', { duration: .24, ease: 'power3.out' });
      const y = gsap.quickTo(pointer, 'y', { duration: .24, ease: 'power3.out' });
      function hide() { pointer.dataset.visible = 'false'; }
      function move(event) {
        if (event.pointerType !== 'mouse' || !event.target.closest('.patch-shell') ||
          event.target.closest('dialog, canvas, .patch-hero, .patch-loading, .reader-content')) {
          hide();
          return;
        }
        if (pointer.dataset.visible !== 'true') {
          x(event.clientX, event.clientX);
          y(event.clientY, event.clientY);
        } else {
          x(event.clientX);
          y(event.clientY);
        }
        pointer.dataset.visible = 'true';
        pointer.dataset.action = Boolean(event.target.closest('a, button, summary, input, textarea, select'));
      }
      document.addEventListener('pointermove', move, { passive: true });
      document.addEventListener('pointerleave', hide);
      document.addEventListener('pointerdown', hide);
      document.addEventListener('focusin', hide);
      window.addEventListener('blur', hide);
      return () => {
        unsubscribe();
        gsap.ticker.remove(tick);
        lenis.destroy();
        x.tween.kill();
        y.tween.kill();
        pointer.remove();
        document.removeEventListener('pointermove', move);
        document.removeEventListener('pointerleave', hide);
        document.removeEventListener('pointerdown', hide);
        document.removeEventListener('focusin', hide);
        window.removeEventListener('blur', hide);
      };
    });
    return () => media.revert();
  }, []);

  return null;
}

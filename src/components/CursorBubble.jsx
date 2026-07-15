import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * CursorBubble — truus-clone-style cursor.
 * A small ember dot follows the cursor (quickTo, power3). When hovering any
 * interactive element (or one carrying `data-cursor="Label"`), an ember speech
 * bubble pops in with an elastic overshoot and a slight rotation settle, showing
 * the label. Ported timings: quickTo 0.5/power3, pop `elastic.out(1,0.4)` 1.7s,
 * exit scale-0 rotation -30 0.3s sine.inOut.
 */
export default function CursorBubble() {
  const bubbleRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!fine.matches) return;

    const bubble = bubbleRef.current;
    const dot = dotRef.current;
    if (!bubble || !dot) return;

    document.body.classList.add('cursor-none');

    const bx = gsap.quickTo(bubble, 'x', { duration: 0.5, ease: 'power3' });
    const by = gsap.quickTo(bubble, 'y', { duration: 0.5, ease: 'power3' });
    const dx = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power2' });
    const dy = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power2' });

    gsap.set(bubble, { rotation: -30, scale: 0, opacity: 0 });
    let active = false;

    const onMove = (e) => {
      bx(e.clientX + 14);
      by(e.clientY - 42);
      dx(e.clientX);
      dy(e.clientY);
    };

    const labelFor = (el) => {
      const tagged = el.closest?.('[data-cursor]');
      if (tagged) return tagged.getAttribute('data-cursor') || 'view';
      if (el.closest?.('a, button, input, textarea, [role="button"]')) return 'click';
      return null;
    };

    const onOver = (e) => {
      const label = labelFor(e.target);
      if (label && !active) {
        active = true;
        bubble.textContent = label;
        gsap.killTweensOf(bubble);
        gsap.to(bubble, { opacity: 1, scale: 1, rotation: 0, duration: 1.7, delay: 0.05, ease: 'elastic.out(1, 0.4)' });
        gsap.to(dot, { scale: 0, duration: 0.3, ease: 'power2' });
      } else if (label && active) {
        bubble.textContent = label; // update label while staying active
      } else if (!label && active) {
        active = false;
        gsap.killTweensOf(bubble);
        gsap.to(bubble, { scale: 0, rotation: -30, duration: 0.3, ease: 'sine.inOut' });
        gsap.to(dot, { scale: 1, duration: 0.3, ease: 'power2' });
      }
    };

    const onLeaveWindow = () => {
      active = false;
      gsap.to(bubble, { scale: 0, opacity: 0, duration: 0.2 });
      gsap.to(dot, { scale: 0, duration: 0.2 });
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseleave', onLeaveWindow);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeaveWindow);
      document.body.classList.remove('cursor-none');
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" aria-hidden="true" />
      <div ref={bubbleRef} className="cursor-bubble hidden md:block" aria-hidden="true">click</div>
    </>
  );
}

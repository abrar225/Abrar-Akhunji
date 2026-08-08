import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';

/**
 * CursorBubble — Premium dual-element custom cursor.
 *
 * Three layers that follow the pointer with staggered lag:
 *   1. Inner dot   (8px solid accent)  — near-instant tracking
 *   2. Outer ring  (40px hollow ring)  — smooth trailing, mix-blend-difference
 *   3. Label text  (inside the ring)   — fades in on data-cursor elements
 *
 * Hover states:
 *   - Interactive elements (a, button, …) → ring expands to 60px
 *   - data-cursor="Label" elements       → ring expands to 80px + label shown
 *   - Mousedown                          → squeeze (scale 0.8), spring back
 *   - Mouse leaves window               → both fade out
 *
 * Only active on desktop (hover: hover, pointer: fine). Hidden on mobile/touch.
 */
export default function CursorBubble() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  // Refs for GSAP quickTo functions — created once, reused every frame
  const quickRefs = useRef({
    dotX: null, dotY: null,
    ringX: null, ringY: null,
  });

  // Track current hover state to avoid redundant GSAP calls
  const stateRef = useRef('default'); // 'default' | 'hover' | 'label'

  /**
   * Resolve the cursor label for any hovered element.
   * Returns { mode, label } or null if the element is not interactive.
   */
  const resolve = useCallback((el) => {
    if (!el?.closest) return null;

    // Explicit data-cursor label (highest priority)
    const tagged = el.closest('[data-cursor]');
    if (tagged) {
      const label = tagged.getAttribute('data-cursor') || 'view';
      return { mode: 'label', label };
    }

    // Generic interactive element
    if (el.closest('a, button, input, textarea, select, [role="button"], [tabindex]')) {
      return { mode: 'hover', label: '' };
    }

    return null;
  }, []);

  useEffect(() => {
    // Gate: only fine-pointer desktop devices
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!fine.matches) return;

    // Respect reduced-motion: skip custom cursor entirely
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReduced.matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    // Hide the native cursor globally
    document.body.classList.add('cursor-none');

    // ── GSAP quickTo for butter-smooth tracking ──
    const q = quickRefs.current;
    q.dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2.out' });
    q.dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2.out' });
    q.ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power2.out' });
    q.ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power2.out' });

    // Initial state
    gsap.set([dot, ring], { opacity: 0 });
    gsap.set(label, { opacity: 0, scale: 0.6 });
    let visible = false;

    // ── Handlers ──

    const onMove = (e) => {
      const cx = e.clientX;
      const cy = e.clientY;

      q.dotX(cx);
      q.dotY(cy);
      q.ringX(cx);
      q.ringY(cy);

      // Fade in on first move
      if (!visible) {
        visible = true;
        gsap.to(dot, { opacity: 1, duration: 0.3 });
        gsap.to(ring, { opacity: 1, duration: 0.4 });
      }
    };

    const enterState = (mode, text) => {
      if (stateRef.current === mode && label.textContent === text) return;
      stateRef.current = mode;

      gsap.killTweensOf(ring, 'width,height,margin,borderWidth');
      gsap.killTweensOf(label);

      if (mode === 'label') {
        label.textContent = text;
        gsap.to(ring, {
          width: 64, height: 64, margin: -32,
          borderWidth: 1.5,
          duration: 0.4, ease: 'back.out(1.2)',
        });
        gsap.to(label, {
          opacity: 1, scale: 1,
          duration: 0.4, delay: 0.05, ease: 'back.out(1.2)',
        });
        gsap.to(dot, { scale: 0.5, opacity: 0.4, duration: 0.3, ease: 'power2.out' });
      } else if (mode === 'hover') {
        gsap.to(ring, {
          width: 48, height: 48, margin: -24,
          borderWidth: 1.5,
          duration: 0.4, ease: 'back.out(1.2)',
        });
        gsap.to(label, { opacity: 0, scale: 0.6, duration: 0.15 });
        gsap.to(dot, { scale: 0.6, opacity: 0.5, duration: 0.3, ease: 'power2.out' });
      }
    };

    const exitState = () => {
      if (stateRef.current === 'default') return;
      stateRef.current = 'default';

      gsap.killTweensOf(ring, 'width,height,margin,borderWidth');
      gsap.killTweensOf(label);
      gsap.killTweensOf(dot, 'scale,opacity');

      gsap.to(ring, {
        width: 24, height: 24, margin: -12,
        borderWidth: 1.5,
        duration: 0.4, ease: 'back.out(1.2)',
      });
      gsap.to(label, { opacity: 0, scale: 0.6, duration: 0.15 });
      gsap.to(dot, { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' });
    };

    const onOver = (e) => {
      const result = resolve(e.target);
      if (result) {
        enterState(result.mode, result.label);
      } else if (stateRef.current !== 'default') {
        exitState();
      }
    };

    // Click feedback: squeeze → spring back
    const onDown = () => {
      gsap.to(dot, { scale: 0.6, duration: 0.1, ease: 'power2.in' });
      gsap.to(ring, { scale: 0.85, duration: 0.12, ease: 'power2.in' });
    };
    const onUp = () => {
      gsap.to(dot, {
        scale: stateRef.current === 'default' ? 1 : 0.5,
        duration: 0.4, ease: 'back.out(1.2)',
      });
      gsap.to(ring, { scale: 1, duration: 0.4, ease: 'back.out(1.2)' });
    };

    // Window leave: fade out both
    const onLeave = () => {
      visible = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.25 });
      gsap.to(label, { opacity: 0, duration: 0.15 });
    };
    const onEnter = () => {
      visible = true;
      gsap.to(dot, { opacity: 1, duration: 0.3 });
      gsap.to(ring, { opacity: 1, duration: 0.4 });
    };

    // ── Bind events ──
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.body.classList.remove('cursor-none');
    };
  }, [resolve]);

  return (
    <>
      {/* Inner dot — fast, precise */}
      <div
        ref={dotRef}
        className="cursor-dot hidden md:block"
        aria-hidden="true"
      />
      {/* Outer ring — trailing, breathable */}
      <div
        ref={ringRef}
        className="cursor-ring hidden md:block"
        aria-hidden="true"
      >
        {/* Label — centered inside ring on data-cursor hover */}
        <span ref={labelRef} className="cursor-label" />
      </div>
    </>
  );
}

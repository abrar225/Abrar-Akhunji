import { useEffect, useRef } from 'react';

/**
 * Studio cursor.
 * The root tracks the pointer 1:1 (a transform written on every move).
 * Only the glyph crossfade and the press scale are eased.
 * Arrow at rest, hand on controls, a solid pill when [data-cursor] is set.
 * No glow. Native cursor stays on touch and reduced-motion.
 */
export default function CursorBubble() {
  const rootRef = useRef(null);
  const pillRef = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fine.matches || reduced.matches) return undefined;

    const root = rootRef.current;
    const pill = pillRef.current;
    if (!root || !pill) return undefined;

    document.body.classList.add('cursor-none');

    const modeRef = { current: 'arrow' };
    const labelRef = { current: '' };
    const downRef = { current: false };
    let visible = false;

    const paint = (x, y) => {
      root.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      root.dataset.mode = modeRef.current;
      root.dataset.down = downRef.current ? '1' : '0';
      if (modeRef.current === 'pill') pill.dataset.label = labelRef.current;
    };

    const resolve = (el) => {
      if (!el?.closest) return null;
      const tagged = el.closest('[data-cursor]');
      if (tagged) {
        return { mode: 'pill', label: tagged.getAttribute('data-cursor') || 'View' };
      }
      if (el.closest('a, button, input, textarea, select, summary, label, [role="button"]')) {
        return { mode: 'hand', label: '' };
      }
      return null;
    };

    const apply = (next) => {
      const mode = next?.mode || 'arrow';
      const label = next?.label || '';
      if (mode === modeRef.current && label === labelRef.current) return;
      modeRef.current = mode;
      labelRef.current = label;
      root.dataset.mode = mode;
      root.dataset.down = downRef.current ? '1' : '0';
      if (mode === 'pill') pill.dataset.label = label;
    };

    const onMove = (event) => {
      paint(event.clientX, event.clientY);
      if (!visible) {
        visible = true;
        root.classList.add('is-on');
      }
    };

    const onOver = (event) => {
      apply(resolve(event.target));
    };

    const onDown = () => {
      downRef.current = true;
      root.dataset.down = '1';
    };
    const onUp = () => {
      downRef.current = false;
      root.dataset.down = '0';
    };

    const onLeave = () => {
      visible = false;
      root.classList.remove('is-on');
    };
    const onEnter = (event) => {
      visible = true;
      root.classList.add('is-on');
      paint(event.clientX, event.clientY);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      document.body.classList.remove('cursor-none');
    };
  }, []);

  return (
    <div ref={rootRef} className="cursor-root" aria-hidden="true">
      <div className="cursor-press">
        <svg className="cursor-glyph glyph-arrow" viewBox="0 0 24 24" width="20" height="20">
          <path
            fill="currentColor"
            stroke="var(--color-canvas)"
            strokeWidth="1.25"
            strokeLinejoin="round"
            d="M2.2 1.4 L2.2 16.6 L6.7 12.5 L10.2 20.1 L12.9 18.9 L9.3 11.2 L15.2 11 Z"
          />
        </svg>
        <svg className="cursor-glyph glyph-hand" viewBox="0 0 32 32" width="28" height="28">
          <path
            className="hand-finger"
            fill="currentColor"
            stroke="var(--color-canvas)"
            strokeWidth="1.25"
            strokeLinejoin="round"
            d="M13.1 12.4 V3.6 a1.7 1.7 0 0 1 3.4 0 v9.6 h-3.4 z"
          />
          <path
            fill="currentColor"
            stroke="var(--color-canvas)"
            strokeWidth="1.25"
            strokeLinejoin="round"
            d="M16.5 13.1 V8.1 a1.55 1.55 0 0 1 3.1 0 v6.4 M19.6 14.4 v-4.1 a1.55 1.55 0 0 1 3.1 0 V16.2 M11.2 12.6 V9.8 a1.55 1.55 0 0 0-3.1 0 v6.7 c0 4.6 2.5 8.1 7.2 8.1 h2.6 c3.8 0 6.4-2.4 6.4-6 V16.2 a1.55 1.55 0 0 0-3.1 0"
          />
        </svg>
        <div ref={pillRef} className="cursor-pill" data-label="" />
      </div>
    </div>
  );
}

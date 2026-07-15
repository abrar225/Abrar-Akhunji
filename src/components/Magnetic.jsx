import React, { useRef, useCallback } from 'react';
import gsap from 'gsap';

/**
 * Magnetic — spring-pulled element (chenglou/pretext DNA: fluid, interruptible).
 * The child drifts toward the cursor while hovered and springs back on leave,
 * using gsap.quickTo for smooth interruptible motion.
 */
export default function Magnetic({
  children,
  strength = 0.35,
  className = '',
  as: Tag = 'div',
  ...rest
}) {
  const ref = useRef(null);
  const xTo = useRef(null);
  const yTo = useRef(null);

  const ensure = useCallback(() => {
    if (!xTo.current && ref.current) {
      xTo.current = gsap.quickTo(ref.current, 'x', { duration: 0.9, ease: 'elastic.out(1, 0.3)' });
      yTo.current = gsap.quickTo(ref.current, 'y', { duration: 0.9, ease: 'elastic.out(1, 0.3)' });
    }
  }, []);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    ensure();
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    xTo.current(relX * strength);
    yTo.current(relY * strength);
  };

  const onLeave = () => {
    ensure();
    xTo.current?.(0);
    yTo.current?.(0);
  };

  return (
    <Tag
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...rest}
    >
      {children}
    </Tag>
  );
}

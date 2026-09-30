import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const SPRING = { type: 'spring', bounce: 0, duration: 0.4 };

export function MotionGlyph({ icon: Icon, active = false, size = 17 }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className="relative z-[1] inline-flex"
      variants={{
        rest: { y: 0, rotate: 0 },
        hover: reduce ? { y: 0, rotate: 0 } : { y: -3, rotate: -8 },
      }}
      transition={SPRING}
    >
      <Icon size={size} strokeWidth={active ? 2.25 : 1.75} />
    </motion.span>
  );
}

export function ArrowNudge({ size = 16, className = '' }) {
  const reduce = useReducedMotion();
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <motion.path
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        variants={{
          rest: { d: 'M5 12h14' },
          hover: reduce ? { d: 'M5 12h14' } : { d: 'M5 12h9' },
        }}
        transition={{ duration: 0.35 }}
      />
      <motion.path
        d="M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{
          rest: { x: 0 },
          hover: reduce ? { x: 0 } : { x: 3 },
        }}
        transition={{ duration: 0.35 }}
      />
    </motion.svg>
  );
}

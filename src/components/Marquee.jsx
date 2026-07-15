import React from 'react';

/**
 * Marquee — infinite horizontal scroll strip (truus / agency DNA).
 * Content is duplicated so the CSS keyframe (translateX -50%) loops seamlessly.
 * Pauses on hover.
 */
export default function Marquee({
  children,
  duration = 40,
  reverse = false,
  className = '',
}) {
  return (
    <div className={`marquee-wrap overflow-hidden ${className}`}>
      <div
        className={`marquee ${reverse ? 'reverse' : ''}`}
        style={{ '--marquee-duration': `${duration}s` }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}

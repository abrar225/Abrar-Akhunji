import React from 'react';

/**
 * Editorial section opener.
 * Perspective lives on the outer shell so the chapter reveal can tilt in.
 */
const SectionHeader = ({ title, kicker, index, className = 'mb-10 md:mb-14' }) => (
  <div className={`[perspective:1000px] ${className}`}>
    <div data-chapter className="chapter-reveal flex items-end justify-between gap-6">
      <div className="max-w-3xl">
        {kicker && (
          <p className="font-serif italic text-accent text-xl md:text-2xl mb-3">{kicker}</p>
        )}
        <h2 className="font-display text-[clamp(2.1rem,4vw,3.6rem)] font-medium tracking-[-0.04em] leading-[1.05] text-fg">
          {title}
        </h2>
      </div>
      {index && (
        <span className="hidden md:block font-mono text-[11px] tracking-[0.22em] text-faint pb-2">
          {index}
        </span>
      )}
    </div>
  </div>
);

export default SectionHeader;

import React from 'react';
import ScrambleText from './ScrambleText';

const SectionHeader = ({ title, number, kicker }) => (
  <div className="flex items-baseline gap-4 md:gap-6 mb-10 border-b border-line pb-5">
    <span className="font-mono text-xs text-accent shrink-0">({number})</span>
    <h2 className="font-display text-2xl md:text-4xl font-medium tracking-tight text-fg">
      <ScrambleText text={title} trigger="view" />
    </h2>
    {kicker && (
      <span className="ml-auto hidden md:block font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
        {kicker}
      </span>
    )}
  </div>
);

export default SectionHeader;

import React from 'react';

const SectionHeader = ({ title, number, theme }) => (
  <div className={`flex items-baseline gap-4 mb-8 border-b ${theme === 'dark' ? 'border-white/10' : 'border-black/10'} pb-4`}>
    <span className="font-mono text-xs text-purple-400">0{number}</span>
    <h2 className={`text-2xl md:text-3xl font-light tracking-tight ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{title}</h2>
  </div>
);

export default SectionHeader;

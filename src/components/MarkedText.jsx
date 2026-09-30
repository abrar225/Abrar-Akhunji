import React from 'react';
import { STUDY_PHRASES } from '../lib/highlightPhrases';

function markLine(text, phrases) {
  if (!text || !phrases?.length) return text;
  const list = [...phrases].sort((a, b) => b.length - a.length);
  const out = [];
  let i = 0;
  while (i < text.length) {
    const hit = list.find((phrase) => text.startsWith(phrase, i));
    if (hit) {
      out.push(<span className="hl-mark" key={`${i}-${hit}`}>{hit}</span>);
      i += hit.length;
    } else {
      let j = i + 1;
      while (j < text.length && !list.some((phrase) => text.startsWith(phrase, j))) j += 1;
      out.push(text.slice(i, j));
      i = j;
    }
  }
  return out;
}

export default function MarkedText({ text, phrases = STUDY_PHRASES }) {
  return markLine(text, phrases);
}

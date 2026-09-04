import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Globe2, BookOpenText, ChevronDown } from 'lucide-react';

/**
 * Extracts domain name from a URL safely.
 */
export function extractDomain(url) {
  try {
    const parsed = new URL(url);
    return parsed.hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

/**
 * Parses sources from markdown text (e.g. from '### Sources' section or general links).
 */
export function extractSourcesFromMarkdown(markdown) {
  if (!markdown) return [];
  const sources = [];
  const seenUrls = new Set();

  // Look for ### Sources section first
  const sourcesMatch = markdown.match(/###\s+Sources([\s\S]*?)(?:\n---|\n###|$)/i);
  const textToScan = sourcesMatch ? sourcesMatch[1] : markdown;

  // Regex for markdown links: [Title](url)
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s\)]+)\)/g;
  let match;

  while ((match = linkRegex.exec(textToScan)) !== null) {
    const rawTitle = match[1].replace(/[*_`]/g, '').trim();
    const url = match[2].trim();

    if (!seenUrls.has(url)) {
      seenUrls.add(url);
      const domain = extractDomain(url);
      sources.push({
        id: `source-${sources.length + 1}-${domain.replace(/[^a-zA-Z0-9]/g, '')}`,
        title: rawTitle,
        domain,
        url,
      });
    }
  }

  return sources;
}

/**
 * Favicon renderer with Google's favicon service fallback to Lucide Globe2.
 */
export function CitationFavicon({ url, className = '' }) {
  const [hasError, setHasError] = useState(false);
  const domain = extractDomain(url);

  if (!domain || hasError) {
    return (
      <span className={`grid place-items-center text-muted shrink-0 ${className}`}>
        <Globe2 size={12} />
      </span>
    );
  }

  return (
    <span className={`grid place-items-center shrink-0 overflow-hidden ${className}`}>
      <img
        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`}
        alt=""
        width={14}
        height={14}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className="w-3.5 h-3.5 rounded-sm object-contain"
      />
    </span>
  );
}

/**
 * Overlapping avatar-style stack of citation favicons.
 */
export function CitationStack({ citations = [], limit = 3, className = '' }) {
  const items = citations.slice(0, limit);

  return (
    <span className={`inline-flex items-center -space-x-1.5 ${className}`} aria-hidden="true">
      {items.map((citation) => (
        <span
          key={citation.id}
          className="w-5 h-5 rounded-full bg-surface border border-line flex items-center justify-center shadow-xs"
        >
          <CitationFavicon url={citation.url} className="w-3.5 h-3.5" />
        </span>
      ))}
    </span>
  );
}

/**
 * Individual Citation Row in the disclosure list.
 */
export function CitationRow({ citation, index, idPrefix }) {
  const targetId = `${idPrefix}-${citation.id}`;

  return (
    <a
      id={targetId}
      href={citation.url}
      target="_blank"
      rel="noreferrer noopener"
      className="group flex items-center justify-between gap-3 p-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] hover:border-accent/30 transition-all text-left outline-hidden"
    >
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        <div className="w-6 h-6 rounded-lg bg-surface border border-line flex items-center justify-center shrink-0">
          <CitationFavicon url={citation.url} className="w-3.5 h-3.5" />
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-xs font-display font-medium text-fg group-hover:text-accent transition-colors truncate">
            {citation.title}
          </span>
          {citation.domain && (
            <span className="text-[10px] font-mono text-muted truncate">
              {citation.domain}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <span className="px-1.5 py-0.5 rounded-md bg-elevated border border-line text-[10px] font-mono text-faint">
          {index}
        </span>
        <ExternalLink size={12} className="text-muted group-hover:text-accent transition-colors" />
      </div>
    </a>
  );
}

/**
 * Collapsible disclosure container with spring height animation.
 */
export function AgentDisclosure({ id, open, children, className = '' }) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          id={id}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className={`overflow-hidden ${className}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Animated list of citations.
 */
export function CitationList({ citations = [], idPrefix, className = '' }) {
  const baseId = useId();
  const resolvedPrefix = idPrefix || `citations-${baseId.replace(/:/g, '')}`;

  return (
    <div className={`grid gap-1.5 ${className}`}>
      {citations.map((citation, idx) => (
        <CitationRow
          key={citation.id}
          citation={citation}
          index={idx + 1}
          idPrefix={resolvedPrefix}
        />
      ))}
    </div>
  );
}

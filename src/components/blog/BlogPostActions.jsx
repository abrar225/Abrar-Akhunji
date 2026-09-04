import React, { useState, useEffect, useRef, useCallback, useId } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Check, Copy, ThumbsUp, ThumbsDown, ChevronDown } from 'lucide-react';
import { CitationStack, CitationList, AgentDisclosure } from '../agents/Citations';

/**
 * Individual action button for Copy and Feedback
 */
function ActionButton({
  label,
  active = false,
  onClick,
  children,
  className = '',
}) {
  const reduce = useReducedMotion() ?? false;

  return (
    <motion.button
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={label === 'Helpful' || label === 'Not helpful' ? active : undefined}
      onClick={onClick}
      whileTap={reduce ? undefined : { scale: 0.92 }}
      className={`relative grid size-8 place-items-center rounded-lg border transition-all cursor-pointer ${
        active
          ? 'bg-accent/20 border-accent text-accent shadow-[0_0_12px_rgba(255,90,31,0.3)]'
          : 'bg-surface/80 border-line text-muted hover:text-fg hover:border-accent/40 hover:bg-elevated'
      } ${className}`}
    >
      {children}
    </motion.button>
  );
}

/**
 * BlogPostActions: Luxury completion toolbar featuring:
 * - Copy raw post markdown
 * - Thumbs Up / Down feedback with localStorage persistence
 * - Expandable CitationStack / Sources Drawer with verified references
 */
export function BlogPostActions({
  copyText,
  sources = [],
  slug,
  className = '',
}) {
  const reduce = useReducedMotion() ?? false;
  const baseId = useId();
  const [copied, setCopied] = useState(false);
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const copyTimer = useRef(null);

  // Feedback state stored in localStorage
  const [feedback, setFeedback] = useState(() => {
    try {
      const feedbackMap = JSON.parse(localStorage.getItem('blogPostFeedback') || '{}');
      return feedbackMap[slug] || null;
    } catch {
      return null;
    }
  });

  const toggleFeedback = (next) => {
    const value = feedback === next ? null : next;
    setFeedback(value);
    try {
      const feedbackMap = JSON.parse(localStorage.getItem('blogPostFeedback') || '{}');
      feedbackMap[slug] = value;
      localStorage.setItem('blogPostFeedback', JSON.stringify(feedbackMap));
    } catch { /* ignore */ }
  };

  useEffect(() => {
    return () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);

  const handleCopy = useCallback(async () => {
    if (!copyText) return;
    try {
      await navigator.clipboard.writeText(copyText);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = copyText;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }

    setCopied(true);
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), 2000);
  }, [copyText]);

  const hasSources = sources && sources.length > 0;
  const sourcesContentId = `${baseId}-sources`;
  const resolvedSourcePrefix = `post-sources-${baseId.replace(/:/g, '')}`;

  return (
    <div className={`mt-10 pt-6 border-t border-line/60 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left: Copy & Feedback */}
        <div className="flex items-center gap-1.5">
          <ActionButton
            label={copied ? 'Copied markdown to clipboard' : 'Copy markdown'}
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="size-4 text-emerald-400" />
            ) : (
              <Copy className="size-4" />
            )}
          </ActionButton>

          <div className="w-[1px] h-5 bg-line mx-1" />

          <ActionButton
            label="Helpful"
            active={feedback === 'up'}
            onClick={() => toggleFeedback('up')}
          >
            <ThumbsUp className="size-4" />
          </ActionButton>

          <ActionButton
            label="Not helpful"
            active={feedback === 'down'}
            onClick={() => toggleFeedback('down')}
          >
            <ThumbsDown className="size-4" />
          </ActionButton>
        </div>

        {/* Right: Expandable Sources Badge */}
        {hasSources && (
          <button
            type="button"
            aria-expanded={sourcesOpen}
            aria-controls={sourcesContentId}
            onClick={() => setSourcesOpen(!sourcesOpen)}
            className="group inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-surface border border-line hover:border-accent/40 text-xs text-muted hover:text-fg transition-all cursor-pointer shadow-xs"
          >
            <CitationStack citations={sources} limit={3} />
            <span className="font-mono text-[11px] tabular-nums font-medium">
              {sources.length} {sources.length === 1 ? 'source' : 'sources'}
            </span>
            <motion.span
              aria-hidden="true"
              animate={{ rotate: sourcesOpen ? 180 : 0 }}
              transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 350, damping: 25 }}
              className="text-muted group-hover:text-accent transition-colors"
            >
              <ChevronDown size={14} />
            </motion.span>
          </button>
        )}
      </div>

      {/* Expandable Citations Disclosure */}
      {hasSources && (
        <AgentDisclosure id={sourcesContentId} open={sourcesOpen} className="mt-3">
          <div className="p-3.5 rounded-2xl bg-surface/80 backdrop-blur-xl border border-line">
            <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-line">
              <span className="text-xs font-mono text-accent uppercase tracking-wider font-semibold">
                Verified Technical References
              </span>
              <span className="text-[10px] font-mono text-muted">
                {sources.length} citations
              </span>
            </div>
            <CitationList citations={sources} idPrefix={resolvedSourcePrefix} />
          </div>
        </AgentDisclosure>
      )}
    </div>
  );
}

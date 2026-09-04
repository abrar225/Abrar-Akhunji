import React, { useState, useEffect, useRef, useCallback, useId } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Check,
  Copy,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
  Sparkles,
  FastForward,
  BookOpen,
} from 'lucide-react';
import { CitationStack, CitationList, AgentDisclosure } from './Citations';

/**
 * Individual icon button for response actions (Copy, Retry, Feedback)
 */
function ResponseActionButton({
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
 * BeUI StreamingResponse: A stable response surface with active streaming telemetry,
 * completion actions, rendered content, and an expandable source summary.
 */
export function StreamingResponse({
  children,
  status = 'streaming',
  progress = 100,
  copyText,
  onCopy,
  onRetry,
  onSkip,
  sources = [],
  sourcesOpen,
  defaultSourcesOpen = false,
  onSourcesOpenChange,
  sourceIdPrefix,
  feedback,
  defaultFeedback = null,
  onFeedbackChange,
  announce = true,
  showActions = true,
  className = '',
  contentClassName = '',
  actionsClassName = '',
}) {
  const reduce = useReducedMotion() ?? false;
  const baseId = useId();
  const [copied, setCopied] = useState(false);
  const [internalFeedback, setInternalFeedback] = useState(defaultFeedback);
  const [internalSourcesOpen, setInternalSourcesOpen] = useState(defaultSourcesOpen);
  const copyTimer = useRef(null);

  const currentFeedback = feedback !== undefined ? feedback : internalFeedback;
  const currentSourcesOpen = sourcesOpen !== undefined ? sourcesOpen : internalSourcesOpen;

  const streaming = status === 'streaming';
  const complete = status === 'complete';
  const canCopy = Boolean(copyText || onCopy);
  const hasSources = sources && sources.length > 0;
  const shouldShowActions = showActions && !streaming && (canCopy || onRetry || complete || hasSources);

  const sourcesContentId = `${baseId}-sources`;
  const resolvedSourcePrefix = sourceIdPrefix || `response-source-${baseId.replace(/:/g, '')}`;

  useEffect(() => {
    return () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);

  const handleCopy = useCallback(async () => {
    if (onCopy) {
      await onCopy();
    } else if (copyText) {
      try {
        await navigator.clipboard.writeText(copyText);
      } catch {
        // Fallback for browsers with restricted clipboard permissions
        const textarea = document.createElement('textarea');
        textarea.value = copyText;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
    }

    setCopied(true);
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), 2000);
  }, [copyText, onCopy]);

  const toggleFeedback = (next) => {
    const value = currentFeedback === next ? null : next;
    if (feedback === undefined) setInternalFeedback(value);
    onFeedbackChange?.(value);
  };

  const setSourcesOpen = useCallback(
    (next) => {
      if (sourcesOpen === undefined) setInternalSourcesOpen(next);
      onSourcesOpenChange?.(next);
    },
    [onSourcesOpenChange, sourcesOpen]
  );

  return (
    <div
      data-state={status}
      aria-busy={streaming}
      className={`relative w-full transition-all ${className}`}
    >
      {/* ── Active Streaming Telemetry Header Bar ── */}
      <AnimatePresence>
        {streaming && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mb-6 p-3.5 rounded-2xl bg-surface/90 backdrop-blur-xl border border-accent/25 shadow-[0_10px_30px_-10px_rgba(255,90,31,0.2)] flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-medium text-fg">
                  Streaming Response
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-accent/15 border border-accent/30 text-accent font-semibold">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>

            {onSkip && (
              <button
                type="button"
                onClick={onSkip}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/[0.05] hover:bg-accent/20 border border-white/[0.08] hover:border-accent/40 text-[11px] font-mono text-accent transition-all cursor-pointer active:scale-95"
              >
                <FastForward size={12} />
                <span>Skip to complete</span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Rendered Response Surface Content ── */}
      <div
        aria-live={announce ? 'polite' : 'off'}
        className={`relative ${contentClassName}`}
      >
        {children}

        {/* Pulsating stream cursor indicator while streaming */}
        {streaming && (
          <motion.span
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ repeat: Infinity, duration: 0.75, ease: 'easeInOut' }}
            className="inline-block w-2 h-4 ml-1 -mb-0.5 bg-accent rounded-xs shadow-[0_0_8px_rgba(255,90,31,0.8)]"
            aria-hidden="true"
          />
        )}
      </div>

      {/* ── Completion Actions Toolbar & Sources Drawer ── */}
      <AnimatePresence initial={false}>
        {shouldShowActions && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.12 : 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 pt-6 border-t border-line/60"
          >
            <div className={`flex flex-wrap items-center justify-between gap-3 ${actionsClassName}`}>
              {/* Left Action Buttons */}
              <div className="flex items-center gap-1.5">
                {canCopy && (
                  <ResponseActionButton
                    label={copied ? 'Copied to clipboard' : 'Copy markdown'}
                    onClick={handleCopy}
                  >
                    {copied ? (
                      <Check className="size-4 text-emerald-400" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                  </ResponseActionButton>
                )}

                {onRetry && (
                  <ResponseActionButton label="Replay stream" onClick={onRetry}>
                    <RotateCcw className="size-4" />
                  </ResponseActionButton>
                )}

                {complete && (
                  <>
                    <div className="w-[1px] h-5 bg-line mx-1" />
                    <ResponseActionButton
                      label="Helpful"
                      active={currentFeedback === 'up'}
                      onClick={() => toggleFeedback('up')}
                    >
                      <ThumbsUp className="size-4" />
                    </ResponseActionButton>
                    <ResponseActionButton
                      label="Not helpful"
                      active={currentFeedback === 'down'}
                      onClick={() => toggleFeedback('down')}
                    >
                      <ThumbsDown className="size-4" />
                    </ResponseActionButton>
                  </>
                )}
              </div>

              {/* Right: Expandable Sources Badge */}
              {hasSources && (
                <button
                  type="button"
                  aria-expanded={currentSourcesOpen}
                  aria-controls={sourcesContentId}
                  onClick={() => setSourcesOpen(!currentSourcesOpen)}
                  className="group inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-surface border border-line hover:border-accent/40 text-xs text-muted hover:text-fg transition-all cursor-pointer shadow-xs"
                >
                  <CitationStack citations={sources} limit={3} />
                  <span className="font-mono text-[11px] tabular-nums font-medium">
                    {sources.length} {sources.length === 1 ? 'source' : 'sources'}
                  </span>
                  <motion.span
                    aria-hidden="true"
                    animate={{ rotate: currentSourcesOpen ? 180 : 0 }}
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
              <AgentDisclosure id={sourcesContentId} open={currentSourcesOpen} className="mt-3">
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

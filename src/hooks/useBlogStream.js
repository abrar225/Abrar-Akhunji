import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';
import { markdownToHtml } from '../lib/blogUtils';

/**
 * Splits HTML string into discrete, self-contained top-level DOM block elements.
 * Each block represents a single paragraph, heading, code block, list, blockquote, or table.
 */
function parseHtmlBlocks(htmlString, prefix = 'block') {
  if (typeof document === 'undefined') {
    return [{ id: `${prefix}-0`, type: 'html', html: htmlString }];
  }

  const container = document.createElement('div');
  container.innerHTML = htmlString;

  const blocks = [];
  const children = Array.from(container.children);

  if (children.length === 0 && htmlString.trim()) {
    // If no child tags found, treat text as a paragraph
    return [{ id: `${prefix}-0`, type: 'html', html: `<p>${htmlString}</p>` }];
  }

  children.forEach((child, idx) => {
    const tagName = child.tagName.toLowerCase();
    const headingId = child.id || (tagName.startsWith('h') ? child.getAttribute('data-id') : null);

    blocks.push({
      id: `${prefix}-${idx}`,
      type: 'html',
      tagName,
      headingId: headingId || null,
      html: child.outerHTML,
    });
  });

  return blocks;
}

/**
 * useBlogStream: High-performance, paragraph-by-paragraph streaming controller.
 *
 * Eliminates character slicing DOM churn in favor of discrete semantic block cascading.
 * Blocks render with GPU-accelerated motion, smooth blur-to-sharp animation, and scroll-ahead anticipation.
 */
export function useBlogStream({ blog, mode, lenisRef }) {
  const reduceMotion = useReducedMotion() ?? false;

  // 1. Build all blocks for the active mode
  const allBlocks = useMemo(() => {
    if (!blog || !blog.sections) return [];

    const blocks = [];

    blog.sections.forEach((section, secIdx) => {
      if (section.type === 'neutral') {
        const html = markdownToHtml(section.content);
        const parsed = parseHtmlBlocks(html, `sec-neutral-${secIdx}`);
        blocks.push(...parsed);
      } else if (section.type === 'eli5' && mode === 'eli5') {
        const html = markdownToHtml(section.content);
        const parsed = parseHtmlBlocks(html, `sec-eli5-${secIdx}`);
        blocks.push(...parsed);
      } else if (section.type === 'dev' && mode === 'dev') {
        const html = markdownToHtml(section.content);
        const parsed = parseHtmlBlocks(html, `sec-dev-${secIdx}`);
        blocks.push(...parsed);
      } else if (section.type === 'interactive') {
        blocks.push({
          id: `sec-interactive-${secIdx}`,
          type: 'interactive',
          widgetType: section.widgetType,
          config: section.config,
        });
      }
    });

    return blocks;
  }, [blog, mode]);

  const totalBlocks = allBlocks.length;

  const [revealedCount, setRevealedCount] = useState(reduceMotion ? totalBlocks : 1);
  const [status, setStatus] = useState(reduceMotion ? 'complete' : 'streaming');
  const [runKey, setRunKey] = useState(0);

  const revealedCountRef = useRef(reduceMotion ? totalBlocks : 1);
  const isCompleteRef = useRef(reduceMotion);
  const timerRef = useRef(null);

  // Cadence: ~190ms per block for an engaging, ultra-smooth cadence
  const BLOCK_INTERVAL_MS = 190;

  // Skip to complete immediately
  const skipToEnd = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    revealedCountRef.current = totalBlocks;
    setRevealedCount(totalBlocks);
    setStatus('complete');
    isCompleteRef.current = true;

    if (lenisRef?.current) {
      setTimeout(() => lenisRef.current?.resize(), 60);
    }
  }, [totalBlocks, lenisRef]);

  // Replay stream from first block
  const replay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    revealedCountRef.current = 1;
    setRevealedCount(1);
    setStatus('streaming');
    isCompleteRef.current = false;
    setRunKey((k) => k + 1);

    const lenis = lenisRef?.current || window.__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 0.8 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [lenisRef]);

  // Sequential block streaming timer
  useEffect(() => {
    if (reduceMotion || totalBlocks === 0) {
      skipToEnd();
      return;
    }

    isCompleteRef.current = false;
    revealedCountRef.current = 1;
    setRevealedCount(1);
    setStatus('streaming');

    timerRef.current = setInterval(() => {
      if (isCompleteRef.current) {
        clearInterval(timerRef.current);
        return;
      }

      const next = revealedCountRef.current + 1;
      if (next >= totalBlocks) {
        revealedCountRef.current = totalBlocks;
        setRevealedCount(totalBlocks);
        setStatus('complete');
        isCompleteRef.current = true;
        clearInterval(timerRef.current);

        if (lenisRef?.current) {
          setTimeout(() => lenisRef.current?.resize(), 60);
        }
      } else {
        revealedCountRef.current = next;
        setRevealedCount(next);

        // Periodically notify Lenis of content growth
        if (next % 4 === 0 && lenisRef?.current) {
          lenisRef.current.resize();
        }
      }
    }, BLOCK_INTERVAL_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [mode, runKey, totalBlocks, reduceMotion, skipToEnd, lenisRef]);

  // Scroll-Ahead Anticipation:
  // As reader scrolls down, automatically reveal any blocks approaching the viewport
  useEffect(() => {
    if (status === 'complete' || isCompleteRef.current || totalBlocks === 0) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      const visibleBottom = scrollY + viewportHeight * 1.25;
      const scrollRatio = docHeight > 0 ? visibleBottom / docHeight : 0;

      const targetCount = Math.min(
        totalBlocks,
        Math.max(revealedCountRef.current, Math.ceil(totalBlocks * scrollRatio))
      );

      if (targetCount > revealedCountRef.current) {
        revealedCountRef.current = targetCount;
        setRevealedCount(targetCount);

        if (targetCount >= totalBlocks) {
          setStatus('complete');
          isCompleteRef.current = true;
          if (timerRef.current) clearInterval(timerRef.current);
        }

        if (lenisRef?.current) {
          lenisRef.current.resize();
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [status, totalBlocks, lenisRef]);

  // Current visible slice of blocks
  const renderedBlocks = useMemo(() => {
    return allBlocks.slice(0, revealedCount);
  }, [allBlocks, revealedCount]);

  const progress = totalBlocks > 0 ? (revealedCount / totalBlocks) * 100 : 100;

  return {
    status,
    progress,
    renderedBlocks,
    totalBlocks,
    revealedCount,
    skipToEnd,
    replay,
  };
}

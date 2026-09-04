import { useState, useEffect, useRef, useCallback } from 'react';
import { useReducedMotion } from 'framer-motion';
import { markdownToHtml } from '../lib/blogUtils';

/**
 * useBlogStream: High-performance streaming controller for rich blog posts.
 *
 * Provides:
 * 1. Frame-synced character & block streaming via requestAnimationFrame.
 * 2. Scroll-aware progressive acceleration: as the reader scrolls down,
 *    upcoming content streams in ahead of the viewport so reading is never stalled.
 * 3. Support for interleaved markdown sections and interactive widgets.
 * 4. Instant 'Skip to Complete' and 'Replay' controls.
 * 5. Reduced-motion accessibility bypass.
 */
export function useBlogStream({ blog, mode, lenisRef }) {
  const reduceMotion = useReducedMotion() ?? false;

  // Build the array of active sections for the current mode
  const activeSections = useRef([]);
  activeSections.current = blog
    ? blog.sections
        .map((section, i) => {
          if (section.type === 'neutral') {
            return {
              id: `neutral-${i}`,
              type: 'markdown',
              raw: section.content,
              length: section.content.length,
            };
          }
          if (section.type === 'eli5' && mode === 'eli5') {
            return {
              id: `eli5-${i}`,
              type: 'markdown',
              raw: section.content,
              length: section.content.length,
            };
          }
          if (section.type === 'dev' && mode === 'dev') {
            return {
              id: `dev-${i}`,
              type: 'markdown',
              raw: section.content,
              length: section.content.length,
            };
          }
          if (section.type === 'interactive') {
            // Interactive blocks have an estimated virtual length to pace the stream
            return {
              id: `interactive-${i}`,
              type: 'interactive',
              widgetType: section.widgetType,
              config: section.config,
              length: 250,
            };
          }
          return null;
        })
        .filter(Boolean)
    : [];

  // Compute total character budget and cumulative starting offsets
  const totalLength = activeSections.current.reduce((acc, s) => acc + s.length, 0);

  const [cursor, setCursor] = useState(reduceMotion ? totalLength : 0);
  const [status, setStatus] = useState(reduceMotion ? 'complete' : 'streaming');
  const [progress, setProgress] = useState(reduceMotion ? 100 : 0);
  const [runKey, setRunKey] = useState(0);

  const cursorRef = useRef(reduceMotion ? totalLength : 0);
  const animFrameRef = useRef(null);
  const startTimeRef = useRef(null);
  const isCompleteRef = useRef(reduceMotion);

  // Streaming speed (characters per second)
  // Tuned for engaging velocity: ~150 chars/sec base, auto-accelerated on scroll
  const BASE_SPEED = 150;

  // Skip to complete immediately
  const skipToEnd = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    cursorRef.current = totalLength;
    setCursor(totalLength);
    setProgress(100);
    setStatus('complete');
    isCompleteRef.current = true;

    if (lenisRef?.current) {
      setTimeout(() => lenisRef.current?.resize(), 50);
    }
  }, [totalLength, lenisRef]);

  // Replay stream from beginning
  const replay = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    cursorRef.current = 0;
    setCursor(0);
    setProgress(0);
    setStatus('streaming');
    isCompleteRef.current = false;
    startTimeRef.current = null;
    setRunKey((k) => k + 1);

    // Scroll to top of content
    const lenis = lenisRef?.current || window.__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 0.8 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [lenisRef]);

  // Main streaming loop
  useEffect(() => {
    if (reduceMotion) {
      skipToEnd();
      return;
    }

    isCompleteRef.current = false;
    cursorRef.current = 0;
    setCursor(0);
    setProgress(0);
    setStatus('streaming');
    startTimeRef.current = performance.now();

    const tick = (now) => {
      if (isCompleteRef.current) return;

      if (!startTimeRef.current) startTimeRef.current = now;
      const elapsedSec = (now - startTimeRef.current) / 1000;

      // Base target cursor from elapsed time
      const timeTarget = Math.floor(elapsedSec * BASE_SPEED);

      // Use max between time-based progress and scroll-accelerated progress
      const nextCursor = Math.min(totalLength, Math.max(cursorRef.current, timeTarget));
      cursorRef.current = nextCursor;
      setCursor(nextCursor);

      const currentProgress = totalLength > 0 ? (nextCursor / totalLength) * 100 : 100;
      setProgress(currentProgress);

      if (nextCursor >= totalLength) {
        setStatus('complete');
        isCompleteRef.current = true;
        if (lenisRef?.current) {
          setTimeout(() => lenisRef.current?.resize(), 80);
        }
      } else {
        animFrameRef.current = requestAnimationFrame(tick);
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [mode, runKey, reduceMotion, totalLength, skipToEnd, lenisRef]);

  // Scroll-Aware Progressive Acceleration:
  // As the user scrolls down towards currently unrevealed content, advance stream
  useEffect(() => {
    if (status === 'complete' || isCompleteRef.current) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Calculate how far down the document the user has scrolled
      const scrollBottom = scrollY + viewportHeight;
      const scrollRatio = docHeight > 0 ? scrollBottom / docHeight : 0;

      // If user is scrolling down, pull more content into the stream
      if (scrollRatio > 0.25) {
        const scrollTargetCursor = Math.min(
          totalLength,
          Math.floor(totalLength * (scrollRatio * 1.2))
        );

        if (scrollTargetCursor > cursorRef.current) {
          cursorRef.current = scrollTargetCursor;
          setCursor(scrollTargetCursor);
          setProgress((scrollTargetCursor / totalLength) * 100);

          if (scrollTargetCursor >= totalLength) {
            setStatus('complete');
            isCompleteRef.current = true;
          }

          if (lenisRef?.current) {
            lenisRef.current.resize();
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [status, totalLength, lenisRef]);

  // Derive rendered sections based on current cursor
  const renderedSections = [];
  let accumulated = 0;

  for (let i = 0; i < activeSections.current.length; i++) {
    const sec = activeSections.current[i];
    const secStart = accumulated;
    const secEnd = accumulated + sec.length;
    accumulated = secEnd;

    if (cursor < secStart) {
      // Not yet reached by stream
      continue;
    }

    if (sec.type === 'interactive') {
      // Interactive block is shown as soon as cursor reaches it
      renderedSections.push({
        id: sec.id,
        type: 'interactive',
        widgetType: sec.widgetType,
        config: sec.config,
        isPartial: false,
      });
    } else if (sec.type === 'markdown') {
      const isCompleteSection = cursor >= secEnd;
      const visibleLength = isCompleteSection ? sec.raw.length : Math.max(0, cursor - secStart);
      const partialText = sec.raw.slice(0, visibleLength);

      renderedSections.push({
        id: sec.id,
        type: 'html',
        html: markdownToHtml(partialText),
        isPartial: !isCompleteSection,
      });
    }
  }

  return {
    status,
    progress,
    renderedSections,
    skipToEnd,
    replay,
  };
}

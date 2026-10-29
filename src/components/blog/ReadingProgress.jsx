import { useState, useEffect, useRef, useCallback } from 'react';

/** Progress through the article, excluding related notes and the global footer. */
export default function ReadingProgress({ contentRef, refreshKey }) {
  const [progress, setProgress] = useState(0), rafRef = useRef(0);
  const update = useCallback(() => {
    rafRef.current = 0;
    const root = contentRef.current;
    if (!root) { setProgress(0); return; }
    const rect = root.getBoundingClientRect(), start = rect.top + scrollY - 130, end = rect.bottom + scrollY - innerHeight + 100;
    const fraction = end > start ? (scrollY - start) / (end - start) : rect.bottom <= innerHeight && rect.top < innerHeight ? 1 : 0;
    setProgress(Math.round(Math.min(1, Math.max(0, fraction)) * 100));
  }, [contentRef]);
  const schedule = useCallback(() => { if (!rafRef.current) rafRef.current = requestAnimationFrame(update); }, [update]);
  useEffect(() => {
    const observer = new ResizeObserver(schedule);
    if (contentRef.current) observer.observe(contentRef.current);
    window.addEventListener('scroll', schedule, { passive: true }); window.addEventListener('resize', schedule); schedule();
    return () => { observer.disconnect(); cancelAnimationFrame(rafRef.current); rafRef.current = 0; window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, [contentRef, refreshKey, schedule]);
  return <div className="article-progress" role="progressbar" aria-label="Reading progress" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} style={{ opacity: progress > 0 ? 1 : 0 }}><span style={{ transform: `scaleX(${progress / 100})` }}/></div>;
}

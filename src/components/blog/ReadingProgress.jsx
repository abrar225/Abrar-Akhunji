import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Thin fixed scroll progress bar pinned to the top of the viewport.
 * Uses requestAnimationFrame for butter-smooth updates.
 */
export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);
  const ticking = useRef(false);

  const updateProgress = useCallback(() => {
    const docHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    const scrollable = docHeight - viewportHeight;

    if (scrollable <= 0) {
      setProgress(0);
    } else {
      const pct = (window.scrollY / scrollable) * 100;
      setProgress(Math.min(100, Math.max(0, pct)));
    }

    ticking.current = false;
  }, []);

  const onScroll = useCallback(() => {
    if (!ticking.current) {
      ticking.current = true;
      rafRef.current = requestAnimationFrame(updateProgress);
    }
  }, [updateProgress]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    // Initial calculation
    updateProgress();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onScroll, updateProgress]);

  return (
    <div
      className="fixed top-0 left-0 w-full z-[100] h-[3px] pointer-events-none"
      style={{ opacity: progress > 0 ? 1 : 0, transition: "opacity 0.3s ease" }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div
        className="h-full bg-accent origin-left"
        style={{
          transform: `scaleX(${progress / 100})`,
          boxShadow: "0 0 10px rgba(255, 90, 31, 0.5)",
          transition: "transform 0.1s linear",
        }}
      />
    </div>
  );
}

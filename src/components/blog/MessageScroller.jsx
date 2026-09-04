import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, ChevronRight, ChevronLeft, ArrowUp, X, BookOpen } from 'lucide-react';

/**
 * MessageScroller: Ultra-clean Anthropic-style section navigation rail.
 *
 * Direct implementation of Anthropic's editorial navigation:
 * 1. Left-margin vertical spine with subtle horizontal tick marks.
 * 2. Active section connects directly to a sleek dark capsule pill that glides with spring physics.
 * 3. Minimalist aesthetic: zero visual clutter, distraction-free reading.
 * 4. Butter-smooth Lenis inertial scrolling when clicking any chapter.
 * 5. Clean mobile floating island for responsive devices.
 */
export default function MessageScroller({ contentRef, mode, lenisRef, status }) {
  const [sections, setSections] = useState([]);
  const [activeId, setActiveId] = useState('');
  const [hoveredId, setHoveredId] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);
  const boundsRef = useRef([]);

  // Scan content DOM for heading elements and interactive blocks
  const scanSections = useCallback(() => {
    if (!contentRef?.current) return;
    const root = contentRef.current;

    const headingElements = Array.from(root.querySelectorAll('h2, h3, [data-slot="blog-heading"]'))
      .filter((el) => el.textContent && el.textContent.trim().length > 0);

    const items = headingElements.map((el, idx) => {
      let id = el.id;
      if (!id) {
        const clean = (el.textContent || `section-${idx + 1}`)
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .trim()
          .replace(/\s+/g, '-');
        id = clean || `section-node-${idx + 1}`;
        el.id = id;
      }

      const text = el.textContent.trim();

      // Clean short label (strip numbers like "1. ", "### ", etc.)
      const shortLabel = text.replace(/^[0-9]+[.\)]\s*/, '').trim();

      // Infer tag badge
      let tag = 'Analysis';
      const lower = text.toLowerCase();
      if (lower.includes('benchmark') || lower.includes('table') || lower.includes('eval')) {
        tag = 'Benchmark';
      } else if (lower.includes('math') || lower.includes('economics') || lower.includes('price')) {
        tag = 'Economics';
      } else if (lower.includes('code') || lower.includes('architecture') || lower.includes('pipeline')) {
        tag = 'Architecture';
      } else if (lower.includes('safety') || lower.includes('refusal') || lower.includes('gating')) {
        tag = 'Safety';
      } else if (lower.includes('takeaway') || lower.includes('router') || lower.includes('decision')) {
        tag = 'Strategy';
      } else if (lower.includes('source') || lower.includes('reference')) {
        tag = 'Sources';
      }

      return {
        id,
        label: shortLabel,
        fullTitle: text,
        tag,
        index: idx + 1,
        element: el,
      };
    });

    setSections(items);
    if (items.length > 0 && !activeId) {
      setActiveId(items[0].id);
    }
  }, [contentRef, activeId]);

  // Compute section bounding ranges accurately
  const updateBounds = useCallback(() => {
    if (sections.length === 0) return;
    const docHeight = document.documentElement.scrollHeight;

    boundsRef.current = sections.map((sec, i) => {
      const el = document.getElementById(sec.id);
      if (!el) return { id: sec.id, top: 0, bottom: 0 };
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const nextSec = sections[i + 1];
      let bottom = docHeight;
      if (nextSec) {
        const nextEl = document.getElementById(nextSec.id);
        if (nextEl) {
          bottom = nextEl.getBoundingClientRect().top + window.scrollY;
        }
      }
      return { id: sec.id, top, bottom };
    });
  }, [sections]);

  // Re-scan when mode changes, status changes, or layout shifts
  useEffect(() => {
    const timer = setTimeout(() => {
      scanSections();
      updateBounds();
    }, 120);
    return () => clearTimeout(timer);
  }, [scanSections, updateBounds, mode, status]);

  // Update bounds on window resize
  useEffect(() => {
    const handleResize = () => updateBounds();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateBounds]);

  // Precision Scroll Tracking
  useEffect(() => {
    const handleScrollUpdate = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      setScrollProgress(progress);

      if (boundsRef.current.length === 0) {
        updateBounds();
      }

      const bounds = boundsRef.current;
      if (bounds.length === 0) return;

      // End of document snaps to final section
      if (scrollY + window.innerHeight >= document.documentElement.scrollHeight - 90) {
        setActiveId(bounds[bounds.length - 1].id);
        return;
      }

      const readingLine = scrollY + 160;

      for (let i = 0; i < bounds.length; i++) {
        const b = bounds[i];
        if (readingLine >= b.top - 30 && readingLine < b.bottom - 30) {
          setActiveId(b.id);
          return;
        }
      }

      if (readingLine < bounds[0].top) {
        setActiveId(bounds[0].id);
      }
    };

    const lenis = lenisRef?.current || window.__lenis;
    if (lenis) {
      lenis.on('scroll', handleScrollUpdate);
    }
    window.addEventListener('scroll', handleScrollUpdate, { passive: true });
    handleScrollUpdate();

    return () => {
      if (lenis) {
        lenis.off('scroll', handleScrollUpdate);
      }
      window.removeEventListener('scroll', handleScrollUpdate);
    };
  }, [lenisRef, updateBounds]);

  // Teleport to target section via Lenis
  const scrollToSection = useCallback((id) => {
    const target = document.getElementById(id);
    if (!target) return;

    setActiveId(id);
    setHoveredId(null);
    setIsMobileSheetOpen(false);

    const lenis = lenisRef?.current || window.__lenis;
    if (lenis) {
      lenis.scrollTo(target, {
        offset: -96,
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const topBarHeight = 96;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - topBarHeight;
      window.scrollTo({
        top: targetTop,
        behavior: 'smooth',
      });
    }
  }, [lenisRef]);

  if (sections.length < 2) return null;

  const activeIndex = sections.findIndex((s) => s.id === activeId);
  const activeSection = sections[activeIndex] || sections[0];

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          ANTHROPIC-STYLE LEFT NAVIGATION RAIL (Desktop >= lg)
          As seen in the official Anthropic announcement design:
          Left-edge vertical track + horizontal tick marks + active capsule pill
          ───────────────────────────────────────────────────────────── */}
      <nav
        aria-label="Table of contents"
        className="fixed left-3 sm:left-6 xl:left-8 2xl:left-14 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-start select-none pointer-events-none"
      >
        <div className="relative flex flex-col items-start py-3 pointer-events-auto">
          {/* Continuous Vertical Spine */}
          <div className="absolute left-0 top-0 bottom-0 w-[1.5px] bg-white/[0.12] rounded-full" />

          {/* Section Notches */}
          <div className="flex flex-col items-start gap-3.5 my-1">
            {sections.map((sec, idx) => {
              const isActive = sec.id === activeId;
              const isHovered = hoveredId === sec.id;

              return (
                <div
                  key={sec.id}
                  className="relative flex items-center h-6"
                  onMouseEnter={() => setHoveredId(sec.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Clickable Tick Mark extending horizontally to the right */}
                  <button
                    onClick={() => scrollToSection(sec.id)}
                    aria-label={`Go to section: ${sec.label}`}
                    aria-current={isActive ? 'true' : undefined}
                    className="relative flex items-center h-full pl-0 pr-2 group cursor-pointer focus:outline-none"
                  >
                    {/* Horizontal Notch */}
                    <motion.div
                      animate={{
                        width: isActive ? 22 : isHovered ? 16 : 10,
                        backgroundColor: isActive
                          ? 'var(--color-accent, #FF5A1F)'
                          : isHovered
                          ? 'rgba(255, 255, 255, 0.85)'
                          : 'rgba(255, 255, 255, 0.28)',
                        height: isActive ? 2 : 1.5,
                      }}
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                      className="rounded-full shadow-xs"
                      style={{
                        boxShadow: isActive ? '0 0 10px rgba(255, 90, 31, 0.6)' : 'none',
                      }}
                    />
                  </button>

                  {/* ── Active Chapter Pill (Attached directly to active tick) ── */}
                  {isActive && (
                    <motion.div
                      layoutId="anthropic-active-chapter-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute left-6 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181714]/95 backdrop-blur-xl border border-white/[0.12] text-xs font-sans font-medium text-fg shadow-[0_10px_25px_-5px_rgba(0,0,0,0.8)] whitespace-nowrap cursor-pointer pointer-events-auto"
                      onClick={() => scrollToSection(sec.id)}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shrink-0" />
                      <span className="truncate max-w-[200px]">{sec.label}</span>
                    </motion.div>
                  )}

                  {/* ── Hover Tooltip Pill (When hovering inactive tick) ── */}
                  <AnimatePresence>
                    {isHovered && !isActive && (
                      <motion.div
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -4 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-6 px-2.5 py-0.5 rounded-lg bg-[#181714]/90 backdrop-blur-md border border-white/[0.08] text-[11px] font-mono text-muted hover:text-fg whitespace-nowrap shadow-md cursor-pointer pointer-events-auto"
                        onClick={() => scrollToSection(sec.id)}
                      >
                        {sec.label}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ─────────────────────────────────────────────────────────────
          MOBILE COMPACT FLOATING ISLAND (< lg)
          ───────────────────────────────────────────────────────────── */}
      <div className="lg:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[92vw] max-w-sm">
        <motion.div
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="flex items-center justify-between px-3 py-2 rounded-2xl bg-[#141310]/95 backdrop-blur-2xl border border-white/[0.12] shadow-[0_15px_35px_rgba(0,0,0,0.7)]"
        >
          {/* Chapter Tap Target */}
          <button
            onClick={() => setIsMobileSheetOpen(true)}
            className="flex items-center gap-2.5 flex-1 min-w-0 text-left cursor-pointer mr-2"
          >
            <div className="w-6 h-6 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shrink-0">
              <Compass size={13} />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 text-[10px] font-mono">
                <span className="text-accent font-semibold">
                  {activeIndex >= 0 ? `0${activeIndex + 1}` : '01'}
                </span>
                <span className="text-white/20">/</span>
                <span className="text-muted">0{sections.length}</span>
                <span className="text-white/20">•</span>
                <span className="text-[9px] text-faint uppercase">{activeSection?.tag}</span>
              </div>
              <span className="text-xs font-sans font-medium text-fg truncate">
                {activeSection?.label || 'Overview'}
              </span>
            </div>
          </button>

          {/* Stepper Controls */}
          <div className="flex items-center gap-1 border-l border-white/[0.08] pl-2">
            <button
              onClick={() => {
                const prev = Math.max(0, activeIndex - 1);
                scrollToSection(sections[prev]?.id);
              }}
              disabled={activeIndex <= 0}
              aria-label="Previous chapter"
              className="w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:text-fg disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => {
                const next = Math.min(sections.length - 1, activeIndex + 1);
                scrollToSection(sections[next]?.id);
              }}
              disabled={activeIndex >= sections.length - 1}
              aria-label="Next chapter"
              className="w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:text-fg disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>

        {/* ── Mobile Slide-Up Chapter Sheet ── */}
        <AnimatePresence>
          {isMobileSheetOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex flex-col justify-end p-4"
              onClick={() => setIsMobileSheetOpen(false)}
            >
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                className="w-full max-h-[80vh] bg-[#141310] border border-white/[0.12] rounded-3xl p-5 flex flex-col shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <BookOpen size={16} className="text-accent" />
                    <span className="text-sm font-mono font-semibold uppercase tracking-wider text-fg">
                      Table of Contents
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileSheetOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center text-muted hover:text-fg"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                  {sections.map((sec, idx) => {
                    const isCurrent = sec.id === activeId;
                    return (
                      <button
                        key={sec.id}
                        onClick={() => scrollToSection(sec.id)}
                        className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                          isCurrent
                            ? 'bg-accent/15 border-accent/40 text-fg'
                            : 'bg-white/[0.03] border-white/[0.06] text-muted hover:text-fg'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className={`text-xs font-mono font-semibold ${isCurrent ? 'text-accent' : 'text-faint'}`}>
                            0{idx + 1}
                          </span>
                          <span className="text-xs font-sans font-medium text-fg truncate">
                            {sec.label}
                          </span>
                        </div>
                        <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-full border border-white/10 text-muted">
                          {sec.tag}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

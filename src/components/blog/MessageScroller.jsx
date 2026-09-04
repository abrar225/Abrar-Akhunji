import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, ChevronRight, ChevronLeft, Sparkles, ArrowUp, X, BookOpen, Layers } from 'lucide-react';

/**
 * MessageScroller: Section-aware blog navigation rail and reading viewport.
 *
 * Implements the BeUI message-scroller & preview-rail interaction architecture:
 * 1. Precision Section Tracking: Computes exact document boundary ranges for each section.
 * 2. Lenis Integration: Smooth inertial scrolling via lenis.scrollTo with custom physics easing.
 * 3. Framer Motion Animations: Gliding active layout indicators, scale falloff magnification, spring-physics preview cards.
 * 4. Dual Viewport Support: Desktop luxury floating dock + Mobile bottom navigation island with chapter sheet.
 * 5. Reading Intelligence: Dynamic category classification, section reading times, and live percentage ring.
 */
export default function MessageScroller({ contentRef, mode, lenisRef, status }) {
  const [sections, setSections] = useState([]);
  const [activeId, setActiveId] = useState('');
  const [hoveredId, setHoveredId] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isTopHovered, setIsTopHovered] = useState(false);
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);
  const boundsRef = useRef([]);

  // Scan content DOM for heading elements and interactive blocks
  const scanSections = useCallback(() => {
    if (!contentRef?.current) return;
    const root = contentRef.current;

    // Collect headings (h2, h3) and interactive blocks with valid text
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

      // Determine description or use case from succeeding elements
      let description = '';
      let nextEl = el.nextElementSibling;
      let wordCount = 0;

      while (nextEl && nextEl.tagName !== 'H2' && nextEl.tagName !== 'H3') {
        if (!description && nextEl.tagName.toLowerCase() === 'p' && nextEl.textContent.trim()) {
          const rawP = nextEl.textContent.trim();
          description = rawP.length > 140 ? `${rawP.slice(0, 140)}...` : rawP;
        } else if (!description && nextEl.classList?.contains('table-wrap')) {
          description = 'Interactive benchmark matrix and structural comparison table.';
        }
        wordCount += (nextEl.textContent || '').split(/\s+/).length;
        nextEl = nextEl.nextElementSibling;
      }

      if (!description) {
        description = 'Architectural breakdown, key trade-offs, and technical insights.';
      }

      // Infer section badge and color
      let tag = 'Analysis';
      let tagColor = 'text-amber-400 border-amber-500/20 bg-amber-500/10';
      const lower = text.toLowerCase();

      if (lower.includes('benchmark') || lower.includes('table') || lower.includes('exploitbench') || lower.includes('swe') || lower.includes('eval')) {
        tag = 'Benchmark';
        tagColor = 'text-amber-400 border-amber-500/20 bg-amber-500/10';
      } else if (lower.includes('math') || lower.includes('equation') || lower.includes('economics') || lower.includes('formula') || lower.includes('loss')) {
        tag = 'Formulation';
        tagColor = 'text-purple-400 border-purple-500/20 bg-purple-500/10';
      } else if (lower.includes('code') || lower.includes('architecture') || lower.includes('pipeline') || lower.includes('kernel') || lower.includes('engine') || lower.includes('scheduler')) {
        tag = 'Architecture';
        tagColor = 'text-cyan-400 border-cyan-500/20 bg-cyan-500/10';
      } else if (lower.includes('takeaway') || lower.includes('decision') || lower.includes('router') || lower.includes('rule') || lower.includes('strategy')) {
        tag = 'Strategy';
        tagColor = 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10';
      } else if (lower.includes('source') || lower.includes('reading') || lower.includes('reference')) {
        tag = 'References';
        tagColor = 'text-blue-400 border-blue-500/20 bg-blue-500/10';
      }

      const estMinutes = Math.max(1, Math.round(wordCount / 180));

      return {
        id,
        label: text,
        description,
        tag,
        tagColor,
        index: idx + 1,
        element: el,
        readTime: `${estMinutes} min read`,
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
    }, 150);
    return () => clearTimeout(timer);
  }, [scanSections, updateBounds, mode, status]);

  // Update bounds on window resize
  useEffect(() => {
    const handleResize = () => updateBounds();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateBounds]);

  // Precision Scroll Tracking with Lenis support
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

      // When reader is near bottom of the page, activate the final section
      if (scrollY + window.innerHeight >= document.documentElement.scrollHeight - 90) {
        setActiveId(bounds[bounds.length - 1].id);
        return;
      }

      // Target reading line (header clearance + optical focus zone)
      const readingLine = scrollY + 140;

      for (let i = 0; i < bounds.length; i++) {
        const b = bounds[i];
        if (readingLine >= b.top - 20 && readingLine < b.bottom - 20) {
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

  // Butter-smooth teleport to target section via Lenis
  const scrollToSection = useCallback((id) => {
    const target = document.getElementById(id);
    if (!target) return;

    setActiveId(id);
    setHoveredId(null);
    setIsDrawerOpen(false);
    setIsMobileSheetOpen(false);

    const lenis = lenisRef?.current || window.__lenis;
    if (lenis) {
      lenis.scrollTo(target, {
        offset: -96,
        duration: 1.15,
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

  // Scroll to very top
  const scrollToTop = useCallback(() => {
    const lenis = lenisRef?.current || window.__lenis;
    if (lenis) {
      lenis.scrollTo(0, {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [lenisRef]);

  // Keyboard navigation shortcuts (j / k or [ / ])
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Avoid triggering when user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      if (sections.length === 0) return;

      const currentIdx = sections.findIndex((s) => s.id === activeId);
      if (e.key === 'j' || (e.key === 'ArrowDown' && e.altKey)) {
        if (currentIdx < sections.length - 1) {
          e.preventDefault();
          scrollToSection(sections[currentIdx + 1].id);
        }
      } else if (e.key === 'k' || (e.key === 'ArrowUp' && e.altKey)) {
        if (currentIdx > 0) {
          e.preventDefault();
          scrollToSection(sections[currentIdx - 1].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sections, activeId, scrollToSection]);

  if (sections.length < 2) return null;

  const activeIndex = sections.findIndex((s) => s.id === activeId);
  const activeSection = sections[activeIndex] || sections[0];
  const hoveredSection = sections.find((s) => s.id === hoveredId);
  const previewItem = hoveredSection;

  // SVG circular progress parameters
  const ringRadius = 12;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const strokeDashoffset = ringCircumference - (scrollProgress / 100) * ringCircumference;

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          DESKTOP LUXURY FLOATING RAIL & PREVIEW ENGINE (>= lg)
          ───────────────────────────────────────────────────────────── */}
      <aside
        className="fixed right-4 xl:right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end select-none"
        aria-label="Article chapters navigation"
      >
        <div className="relative flex items-center">
          {/* ── Active Chapter Pill (Ambient Chip Next to Rail) ── */}
          <AnimatePresence>
            {!hoveredId && !isDrawerOpen && activeSection && (
              <motion.div
                initial={{ opacity: 0, x: 8, filter: 'blur(4px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: 8, filter: 'blur(4px)' }}
                transition={{ duration: 0.25 }}
                className="absolute right-14 max-w-[240px] pointer-events-none hidden xl:block"
                style={{
                  top: `calc(${activeIndex * 28 + 48}px)`,
                }}
              >
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#141310]/90 backdrop-blur-xl border border-white/[0.08] shadow-2xl">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse flex-shrink-0" />
                  <span className="text-[11px] font-sans font-medium text-fg/90 truncate leading-snug">
                    {activeSection.label}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Rich Inspector Card (BeUI Floating Preview) ── */}
          <AnimatePresence>
            {previewItem && (
              <motion.div
                initial={{ opacity: 0, x: 16, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                className="absolute right-16 w-88 p-4 rounded-2xl bg-[#141310]/95 backdrop-blur-2xl border border-white/[0.12] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] pointer-events-auto"
                style={{
                  top: `calc(${sections.findIndex((s) => s.id === previewItem.id) * 28 + 40}px - 40px)`,
                }}
                onMouseEnter={() => setHoveredId(previewItem.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Header Badge & Chapter Index */}
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${previewItem.tagColor}`}>
                      {previewItem.tag}
                    </span>
                    <span className="text-[10px] font-mono text-muted">
                      {previewItem.readTime}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-semibold text-faint">
                    0{previewItem.index} / 0{sections.length}
                  </span>
                </div>

                {/* Section Title */}
                <h4 className="text-sm font-display font-semibold text-fg mb-1.5 leading-snug">
                  {previewItem.label}
                </h4>

                {/* Section Excerpt */}
                <p className="text-xs font-body text-muted leading-relaxed line-clamp-3 mb-3">
                  {previewItem.description}
                </p>

                {/* Action CTA */}
                <button
                  onClick={() => scrollToSection(previewItem.id)}
                  className="w-full py-1.5 px-3 rounded-lg bg-white/[0.05] hover:bg-accent/15 border border-white/[0.08] hover:border-accent/40 flex items-center justify-between text-[11px] font-mono text-accent transition-all cursor-pointer group"
                >
                  <span className="flex items-center gap-1.5">
                    <Sparkles size={11} className="group-hover:rotate-12 transition-transform" />
                    Teleport to chapter
                  </span>
                  <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Main Navigation Dock Capsule ── */}
          <motion.div
            layout
            className="flex flex-col items-center py-3 px-2 rounded-2xl bg-[#12110F]/90 backdrop-blur-2xl border border-white/[0.09] shadow-[0_20px_50px_rgba(0,0,0,0.65),0_1px_1px_rgba(255,255,255,0.06)]"
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Top Status & Chapter Radar Toggle */}
            <div className="flex flex-col items-center gap-1 mb-2.5 pb-2 border-b border-white/[0.08] w-full">
              <button
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                title={isDrawerOpen ? 'Close chapter radar' : 'View all chapters'}
                className="w-7 h-7 rounded-xl flex items-center justify-center text-muted hover:text-accent hover:bg-white/[0.05] transition-colors cursor-pointer"
              >
                {isDrawerOpen ? <X size={14} /> : <Layers size={14} />}
              </button>
              <span className="text-[9px] font-mono text-faint tracking-tight font-semibold">
                {activeIndex >= 0 ? `0${activeIndex + 1}` : '01'}
              </span>
            </div>

            {/* Vertical Spine and Section Nodes */}
            <div className="relative flex flex-col items-center gap-1 py-1">
              {/* Subtle Vertical Spine Line */}
              <div className="absolute top-2 bottom-2 w-[1.5px] bg-white/[0.07] rounded-full pointer-events-none" />

              {sections.map((item, idx) => {
                const isActive = item.id === activeId;
                const isHovered = hoveredId === item.id;
                const distance = activeIndex >= 0 ? Math.abs(idx - activeIndex) : Infinity;

                // Scale falloff calculation (smooth magnetic curve)
                let tickWidth = 12;
                let opacity = 0.35;
                if (isActive) {
                  tickWidth = 26;
                  opacity = 1;
                } else if (isHovered) {
                  tickWidth = 22;
                  opacity = 0.9;
                } else if (distance === 1) {
                  tickWidth = 16;
                  opacity = 0.6;
                } else if (distance === 2) {
                  tickWidth = 14;
                  opacity = 0.45;
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    onMouseEnter={() => setHoveredId(item.id)}
                    aria-label={`Jump to chapter: ${item.label}`}
                    className="group relative flex items-center justify-center h-6 w-9 cursor-pointer focus:outline-none"
                  >
                    {/* Active Gliding Pill with Framer Motion layoutId */}
                    {isActive && (
                      <motion.div
                        layoutId="active-rail-pill"
                        className="absolute inset-0 rounded-lg bg-accent/15 border border-accent/40 shadow-[0_0_14px_rgba(255,90,31,0.35)]"
                        transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                      />
                    )}

                    {/* Tactile Tick Bar */}
                    <motion.span
                      animate={{
                        width: tickWidth,
                        backgroundColor: isActive
                          ? 'var(--color-accent)'
                          : isHovered
                          ? 'rgba(255, 255, 255, 0.9)'
                          : 'rgba(255, 255, 255, 0.4)',
                        opacity: opacity,
                      }}
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      className="h-[2.5px] rounded-full block z-10"
                      style={{
                        boxShadow: isActive ? '0 0 10px rgba(255, 90, 31, 0.8)' : 'none',
                      }}
                    />
                  </button>
                );
              })}
            </div>

            {/* Bottom Progress Ring & Scroll-to-Top Fast-Travel */}
            <div className="mt-2.5 pt-2 border-t border-white/[0.08] w-full flex flex-col items-center">
              <button
                onClick={scrollToTop}
                onMouseEnter={() => setIsTopHovered(true)}
                onMouseLeave={() => setIsTopHovered(false)}
                title="Scroll to top"
                className="relative w-8 h-8 rounded-full flex items-center justify-center cursor-pointer group focus:outline-none transition-transform active:scale-95"
              >
                {/* Background Ring */}
                <svg className="w-8 h-8 -rotate-90" viewBox="0 0 32 32">
                  <circle
                    cx="16"
                    cy="16"
                    r={ringRadius}
                    className="stroke-white/[0.08]"
                    strokeWidth="2"
                    fill="transparent"
                  />
                  <circle
                    cx="16"
                    cy="16"
                    r={ringRadius}
                    className="stroke-accent"
                    strokeWidth="2"
                    fill="transparent"
                    strokeDasharray={ringCircumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 0.15s linear' }}
                  />
                </svg>

                {/* Center Content: Percentage or Top Arrow */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {isTopHovered ? (
                    <ArrowUp size={12} className="text-accent group-hover:-translate-y-0.5 transition-transform" />
                  ) : (
                    <span className="text-[9px] font-mono font-semibold text-fg/80">
                      {Math.round(scrollProgress)}
                    </span>
                  )}
                </div>
              </button>
            </div>
          </motion.div>
        </div>

        {/* ── Slide-Out Chapter Radar Drawer (Expanded TOC) ── */}
        <AnimatePresence>
          {isDrawerOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              className="absolute right-16 top-0 w-80 max-h-[75vh] flex flex-col p-4 rounded-2xl bg-[#141310]/95 backdrop-blur-2xl border border-white/[0.12] shadow-2xl z-50 overflow-hidden"
            >
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <BookOpen size={14} className="text-accent" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-fg">
                    Chapter Radar
                  </span>
                </div>
                <span className="text-[10px] font-mono text-muted">
                  {sections.length} sections
                </span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 py-1 custom-scrollbar">
                {sections.map((sec, idx) => {
                  const isCurrent = sec.id === activeId;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => scrollToSection(sec.id)}
                      className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                        isCurrent
                          ? 'bg-accent/15 border-accent/40 text-fg'
                          : 'bg-white/[0.02] hover:bg-white/[0.06] border-white/[0.05] text-muted hover:text-fg'
                      }`}
                    >
                      <span className={`text-[10px] font-mono font-semibold mt-0.5 ${isCurrent ? 'text-accent' : 'text-faint'}`}>
                        0{idx + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span className={`text-[9px] font-mono uppercase px-1.5 py-0.2 rounded border ${sec.tagColor}`}>
                            {sec.tag}
                          </span>
                          <span className="text-[9px] font-mono text-faint">
                            {sec.readTime}
                          </span>
                        </div>
                        <p className="text-xs font-display font-medium text-fg truncate">
                          {sec.label}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </aside>

      {/* ─────────────────────────────────────────────────────────────
          MOBILE COMPACT NAVIGATION ISLAND (< lg)
          ───────────────────────────────────────────────────────────── */}
      <div className="lg:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[92vw] max-w-sm">
        <motion.div
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="flex items-center justify-between px-3 py-2 rounded-2xl bg-[#141310]/95 backdrop-blur-2xl border border-white/[0.12] shadow-[0_15px_35px_rgba(0,0,0,0.7)]"
        >
          {/* Chapter Info Tap Target */}
          <button
            onClick={() => setIsMobileSheetOpen(true)}
            className="flex items-center gap-2.5 flex-1 min-w-0 text-left cursor-pointer mr-2"
          >
            <div className="w-6 h-6 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center text-accent flex-shrink-0">
              <Compass size={13} />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 text-[10px] font-mono">
                <span className="text-accent font-semibold">
                  {activeIndex >= 0 ? `0${activeIndex + 1}` : '01'}
                </span>
                <span className="text-white/20">/</span>
                <span className="text-muted">
                  0{sections.length}
                </span>
                <span className="text-white/20">•</span>
                <span className="text-[9px] text-faint uppercase">
                  {activeSection?.tag}
                </span>
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
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex flex-col justify-end p-4"
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
                        className={`w-full text-left p-3 rounded-2xl border transition-all flex items-start gap-3 ${
                          isCurrent
                            ? 'bg-accent/15 border-accent/40 text-fg'
                            : 'bg-white/[0.03] border-white/[0.06] text-muted'
                        }`}
                      >
                        <span className={`text-xs font-mono font-semibold mt-0.5 ${isCurrent ? 'text-accent' : 'text-faint'}`}>
                          0{idx + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-full border ${sec.tagColor}`}>
                              {sec.tag}
                            </span>
                            <span className="text-[10px] font-mono text-faint">
                              {sec.readTime}
                            </span>
                          </div>
                          <h4 className="text-xs font-display font-medium text-fg mb-1">
                            {sec.label}
                          </h4>
                          <p className="text-[11px] font-body text-muted line-clamp-2">
                            {sec.description}
                          </p>
                        </div>
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

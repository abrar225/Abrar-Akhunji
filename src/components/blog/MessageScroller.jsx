import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, ChevronRight, Hash, Sparkles } from 'lucide-react';

/**
 * MessageScroller: Section-aware blog navigation rail and reading viewport.
 *
 * Implements the `@beui/message-scroller` interaction architecture:
 * 1. Automatically parses the rendered blog DOM for sections (headings h2, h3, and interactive widgets).
 * 2. Renders an elegant, non-intrusive interactive Rail with tactile indicator ticks on the side.
 * 3. Highlights the active section based on current scroll position.
 * 4. Displays a reader-aware floating preview card showing:
 *    - The section title
 *    - Section context / description / use case
 *    - Section index & badge
 * 5. Smoothly scrolls to target sections upon clicking or tapping a rail node.
 */
export default function MessageScroller({ contentRef, mode }) {
  const [sections, setSections] = useState([]);
  const [activeId, setActiveId] = useState('');
  const [hoveredItem, setHoveredItem] = useState(null);
  const [pinnedItem, setPinnedItem] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isFollowing, setIsFollowing] = useState(true);

  // Scan content DOM for heading elements and interactive blocks
  const scanSections = useCallback(() => {
    if (!contentRef.current) return;
    const root = contentRef.current;

    // Collect headings (h2, h3) and interactive blocks
    const headingElements = Array.from(root.querySelectorAll('h2, h3, [data-slot="blog-heading"]'));
    
    const items = headingElements.map((el, idx) => {
      let id = el.id;
      if (!id) {
        id = `section-node-${idx}`;
        el.id = id;
      }

      const text = el.textContent || `Section ${idx + 1}`;
      
      // Determine description or use case from the following paragraph
      let description = '';
      let nextEl = el.nextElementSibling;
      while (nextEl && !description) {
        if (nextEl.tagName.toLowerCase() === 'p' && nextEl.textContent.trim()) {
          const rawP = nextEl.textContent.trim();
          description = rawP.length > 130 ? `${rawP.slice(0, 130)}…` : rawP;
        } else if (nextEl.classList?.contains('table-wrap')) {
          description = 'Interactive comparison & benchmark data table.';
        }
        nextEl = nextEl.nextElementSibling;
      }

      if (!description) {
        description = 'Key architectural insight & technical breakdown.';
      }

      // Infer section badge / use case
      let tag = 'Analysis';
      const lower = text.toLowerCase();
      if (lower.includes('benchmark') || lower.includes('table') || lower.includes('exploitbench') || lower.includes('swe')) {
        tag = 'Benchmark';
      } else if (lower.includes('math') || lower.includes('equation') || lower.includes('economics') || lower.includes('formula')) {
        tag = 'Formulation';
      } else if (lower.includes('code') || lower.includes('implementation') || lower.includes('pipeline') || lower.includes('kernel') || lower.includes('scheduler')) {
        tag = 'Architecture';
      } else if (lower.includes('takeaway') || lower.includes('decision') || lower.includes('router') || lower.includes('rule')) {
        tag = 'Strategy';
      } else if (lower.includes('source') || lower.includes('reading')) {
        tag = 'References';
      }

      return {
        id,
        label: text,
        description,
        tag,
        index: idx + 1,
        element: el
      };
    });

    setSections(items);
    if (items.length > 0 && !activeId) {
      setActiveId(items[0].id);
    }
  }, [contentRef, activeId]);

  // Re-scan when mode changes or content updates
  useEffect(() => {
    // Give DOM time to update after mode switch
    const timer = setTimeout(scanSections, 180);
    return () => clearTimeout(timer);
  }, [scanSections, mode]);

  // Track active section and scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      setScrollProgress(progress);

      // Check if user is near bottom (live edge following)
      setIsFollowing(docHeight - scrollY < 120);

      // Determine active section
      if (sections.length === 0) return;

      const viewportCenter = window.innerHeight * 0.35;
      let currentActiveId = sections[0].id;
      let minDistance = Infinity;

      sections.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const distance = Math.abs(rect.top - viewportCenter);
          if (rect.top <= viewportCenter + 150 && distance < minDistance) {
            minDistance = distance;
            currentActiveId = sec.id;
          }
        }
      });

      setActiveId(currentActiveId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  // Smoothly scroll to target section
  const scrollToSection = (id) => {
    const target = document.getElementById(id);
    if (!target) return;

    setActiveId(id);
    setPinnedItem(null);

    const topBarHeight = 90;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - topBarHeight;

    window.scrollTo({
      top: targetTop,
      behavior: 'smooth',
    });
  };

  if (sections.length < 2) return null;

  const displayedItem = hoveredItem || pinnedItem;
  const activeIndex = sections.findIndex((s) => s.id === activeId);

  return (
    <>
      {/* ── Desktop & Tablet Side Navigation Rail (BeUI Message Scroller style) ── */}
      <aside
        className="fixed right-3 md:right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end select-none"
        aria-label="Blog sections navigation"
      >
        <div className="relative flex items-center">
          {/* Floating Section Preview Card (Before / Left of Rail) */}
          <AnimatePresence>
            {displayedItem && (
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.95 }}
                transition={{ duration: 0.18, ease: [0.19, 1, 0.22, 1] }}
                className="absolute right-12 w-80 p-4 rounded-2xl bg-surface/95 backdrop-blur-xl border border-line shadow-2xl pointer-events-none"
                style={{
                  top: `calc(${sections.findIndex((s) => s.id === displayedItem.id) * 26}px - 20px)`,
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-accent px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20">
                    {displayedItem.tag}
                  </span>
                  <span className="text-[10px] font-mono text-faint">
                    0{displayedItem.index} / 0{sections.length}
                  </span>
                </div>
                <h4 className="text-sm font-display font-medium text-fg mb-1.5 leading-snug line-clamp-2">
                  {displayedItem.label}
                </h4>
                <p className="text-xs font-body text-muted leading-relaxed line-clamp-3">
                  {displayedItem.description}
                </p>
                <div className="mt-3 pt-2 border-t border-line/40 flex items-center justify-between text-[10px] font-mono text-accent">
                  <span>Click to jump</span>
                  <ChevronRight size={12} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Interactive Rail Track */}
          <div
            className="flex flex-col items-end gap-1.5 py-3 px-2 rounded-full bg-surface/70 backdrop-blur-md border border-line/60 shadow-lg"
            onMouseLeave={() => setHoveredItem(null)}
          >
            {sections.map((item, idx) => {
              const isActive = item.id === activeId;
              const isHovered = hoveredItem?.id === item.id;
              const distance = activeIndex >= 0 ? Math.abs(idx - activeIndex) : Infinity;

              // Smooth scale falloff inspired by BeUI MessageScroller ticks
              let tickWidth = 14;
              let opacity = 0.4;
              if (isActive) {
                tickWidth = 28;
                opacity = 1;
              } else if (isHovered) {
                tickWidth = 24;
                opacity = 0.9;
              } else if (distance === 1) {
                tickWidth = 18;
                opacity = 0.65;
              } else if (distance === 2) {
                tickWidth = 15;
                opacity = 0.5;
              }

              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  onMouseEnter={() => setHoveredItem(item)}
                  aria-label={`Jump to ${item.label}`}
                  className="group relative flex items-center justify-end h-5 w-8 cursor-pointer focus:outline-none"
                >
                  {/* Subtle Tick Line */}
                  <motion.span
                    animate={{
                      width: tickWidth,
                      backgroundColor: isActive ? 'var(--color-accent)' : isHovered ? 'var(--color-fg)' : 'var(--color-muted)',
                      opacity: opacity,
                    }}
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    className="h-[2.5px] rounded-full origin-right block shadow-sm"
                  />

                  {/* Active Indicator Pulse */}
                  {isActive && (
                    <span
                      className="absolute right-0 w-2 h-2 rounded-full bg-accent animate-ping opacity-75 pointer-events-none"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      {/* ── Mobile Compact Section Navigator (Fixed Bottom Sheet Floating Bar) ── */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[92vw] w-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-surface/90 backdrop-blur-xl border border-line shadow-2xl text-xs font-mono"
        >
          <Compass size={14} className="text-accent flex-shrink-0" />
          <div className="flex items-center gap-1.5 overflow-hidden whitespace-nowrap max-w-[200px] sm:max-w-[280px]">
            <span className="text-accent font-semibold flex-shrink-0">
              {activeIndex >= 0 ? `0${activeIndex + 1}` : '01'}
            </span>
            <span className="text-line">/</span>
            <span className="text-fg truncate font-sans">
              {sections[activeIndex]?.label || 'Overview'}
            </span>
          </div>
          <div className="flex items-center gap-1 ml-1 border-l border-line/60 pl-2">
            <button
              onClick={() => {
                const prevIdx = Math.max(0, activeIndex - 1);
                scrollToSection(sections[prevIdx]?.id);
              }}
              disabled={activeIndex <= 0}
              aria-label="Previous section"
              className="p-1 rounded-full text-muted hover:text-fg disabled:opacity-30 disabled:pointer-events-none"
            >
              ▲
            </button>
            <button
              onClick={() => {
                const nextIdx = Math.min(sections.length - 1, activeIndex + 1);
                scrollToSection(sections[nextIdx]?.id);
              }}
              disabled={activeIndex >= sections.length - 1}
              aria-label="Next section"
              className="p-1 rounded-full text-muted hover:text-fg disabled:opacity-30 disabled:pointer-events-none"
            >
              ▼
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
}

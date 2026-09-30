import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, ExternalLink, Github, Code2, CheckCircle2, Layers } from 'lucide-react';

/**
 * ProjectModal — Interactive glassmorphic modal for deep-diving into
 * project architecture, metrics, code highlights, and media previews.
 */
export default function ProjectModal({ project, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  const modal = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-canvas/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.94, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.94, y: shouldReduceMotion ? 0 : 15 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            style={{ backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)' }}
            className="relative w-full max-w-4xl bg-surface/80 border border-line rounded-2xl shadow-2xl overflow-hidden z-10 my-auto flex flex-col max-h-[90vh]"
          >
            {/* Header Bar */}
            <div className="p-6 border-b border-line flex items-center justify-between bg-elevated/50 shrink-0">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent font-mono text-[10px] uppercase tracking-widest">
                  {project.category}
                </span>
                <span className="text-xs font-mono text-muted">{project.year}</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="p-2 rounded-full text-muted hover:text-fg hover:bg-surface border border-line transition-colors press-effect"
              >
                <X size={18} />
              </button>
            </div>

            {/* Title & Navigation Tabs */}
            <div className="p-6 pb-4 border-b border-line shrink-0">
              <h2 className="text-2xl md:text-3xl font-display font-semibold text-fg tracking-tight mb-4">
                {project.title}
              </h2>
              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                {[
                  { id: 'overview', label: 'Overview', icon: Layers },
                  { id: 'features', label: 'Capabilities', icon: CheckCircle2 },
                  { id: 'tech', label: 'Stack', icon: Code2 },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all shrink-0 press-effect ${
                        active
                          ? 'bg-accent text-on-accent font-semibold shadow-md'
                          : 'bg-elevated/60 text-muted hover:text-fg hover:bg-elevated border border-line'
                      }`}
                    >
                      <Icon size={14} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Scrollable Content Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 font-body">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Hero Image / Screenshot */}
                  <div className="relative rounded-xl overflow-hidden border border-line aspect-video max-h-[320px] bg-canvas">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-canvas/80 via-transparent to-transparent" />
                  </div>

                  <div>
                    <h3 className="font-serif italic text-xl text-fg mb-2">The brief</h3>
                    <p className="text-muted text-sm md:text-base leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {project.architecture && (
                    <div>
                      <h3 className="font-serif italic text-xl text-fg mb-3">How it is built</h3>
                      <ol className="border-t border-line">
                        {project.architecture.split('->').map((step) => step.trim()).filter(Boolean).map((step, i) => (
                          <li key={step} className="grid grid-cols-[2.5rem_1fr] gap-3 py-3 border-b border-line">
                            <span className="font-mono text-[11px] text-accent pt-0.5">{String(i + 1).padStart(2, '0')}</span>
                            <span className="text-sm text-fg leading-snug">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'features' && (
                <div className="space-y-4">
                  <h3 className="font-serif italic text-xl text-fg mb-3">
                    What it does
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {project.features?.map((feat, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-elevated/40 border border-line flex items-start gap-3"
                      >
                        <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                        <span className="text-sm text-fg leading-relaxed">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'tech' && (
                <div className="space-y-4">
                  <h3 className="font-serif italic text-xl text-fg mb-3">
                    Materials
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {project.tech?.map((t) => (
                      <span
                        key={t}
                        className="px-4 py-2 rounded-xl bg-elevated border border-line font-mono text-xs text-fg flex items-center gap-2"
                      >
                        <Code2 size={14} className="text-accent" />
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="p-6 border-t border-line bg-elevated/50 flex flex-wrap items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-on-accent text-xs font-mono font-semibold hover:bg-accent-soft transition-colors press-effect"
                  >
                    Launch Live Demo <ExternalLink size={14} />
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-line bg-surface text-fg text-xs font-mono hover:bg-elevated transition-colors press-effect"
                  >
                    View Source <Github size={14} />
                  </a>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-xs font-mono text-muted hover:text-fg transition-colors press-effect"
              >
                Close Preview
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  if (typeof document === 'undefined') return modal;
  return createPortal(modal, document.body);
}

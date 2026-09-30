import React, { useRef, useState, useMemo } from 'react';
import { ArrowUpRight, Github, Play, RotateCw, Lock, Loader2, Layers } from 'lucide-react';
import MarkedText from './MarkedText';
import { STUDY_PHRASES } from '../lib/highlightPhrases';
import ProjectModal from './ProjectModal';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';

/**
 * Selected work in two registers:
 *   - Flagship studies (the first two): a large live frame beside an
 *     architectural breakdown.
 *   - Archive: a hairline bento of the remaining studies. Every project
 *     still opens the same case-study modal.
 */

function toEmbedUrl(project) {
  if (project.embed) return project.embed;
  const demo = project.demo;
  if (!demo) return null;
  const hf = demo.match(/huggingface\.co\/spaces\/([^/]+)\/([^/?#]+)/i);
  if (hf) return `https://${hf[1]}-${hf[2]}.hf.space`.toLowerCase();
  return demo;
}

function prettyHost(url) {
  if (!url) return 'localhost:3000';
  try {
    return new URL(url).host;
  } catch {
    return url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  }
}

function BrowserFrame({ project, reduced }) {
  const wrapRef = useRef(null);
  const [live, setLive] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  const embedUrl = useMemo(() => toEmbedUrl(project), [project]);
  const host = useMemo(() => prettyHost(project.demo), [project.demo]);
  const hasDemo = Boolean(project.demo);
  const canEmbed = hasDemo && project.embeddable === true && Boolean(embedUrl) && !failed;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 22, mass: 0.35 });
  const sy = useSpring(my, { stiffness: 180, damping: 22, mass: 0.35 });
  const rotateY = useTransform(sx, [-0.5, 0.5], reduced ? [0, 0] : [-5, 5]);
  const rotateX = useTransform(sy, [-0.5, 0.5], reduced ? [0, 0] : [4, -4]);

  const onMove = (e) => {
    if (reduced) return;
    const r = wrapRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div style={{ perspective: 1400 }} className="w-full">
      <motion.div
        ref={wrapRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group/browser relative overflow-hidden border border-line bg-elevated"
      >
        <div className="flex items-center gap-3 px-4 h-11 border-b border-line bg-surface/80 backdrop-blur">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 flex items-center gap-2 h-6 px-3 bg-canvas/70 border border-line min-w-0">
            {hasDemo ? (
              <span className="w-1.5 h-1.5 rounded-full bg-[#28c840] flex-shrink-0" />
            ) : (
              <Lock size={11} className="text-faint flex-shrink-0" />
            )}
            <span className="font-mono text-[11px] text-muted truncate">{host}</span>
          </div>
          {hasDemo && (
            <div className="flex items-center gap-1.5">
              {canEmbed && (
                <button
                  type="button"
                  aria-label="Reload preview"
                  onClick={() => {
                    setLoaded(false);
                    setLive(false);
                    requestAnimationFrame(() => setLive(true));
                  }}
                  className="p-1 text-faint hover:text-accent transition-colors"
                >
                  <RotateCw size={13} />
                </button>
              )}
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open live site in a new tab"
                data-cursor="Open"
                className="p-1 text-faint hover:text-accent transition-colors"
              >
                <ArrowUpRight size={15} />
              </a>
            </div>
          )}
        </div>

        <div className="relative aspect-[16/10] overflow-hidden bg-canvas">
          {!live && (
            <img
              src={project.image}
              alt={`${project.title} preview`}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/browser:scale-[1.03]"
            />
          )}

          {canEmbed && live && (
            <>
              {!loaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-surface">
                  <Loader2 size={22} className="text-accent animate-spin" />
                  <span className="font-mono text-[11px] text-muted tracking-wide">
                    Opening the live build
                  </span>
                </div>
              )}
              <iframe
                src={embedUrl}
                title={`${project.title} live demo`}
                loading="lazy"
                onLoad={() => setLoaded(true)}
                onError={() => setFailed(true)}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                className="absolute inset-0 w-full h-full border-0 bg-white"
              />
            </>
          )}

          {hasDemo && !(canEmbed && live) && (
            canEmbed ? (
              <button
                type="button"
                onClick={() => setLive(true)}
                data-cursor="Run"
                className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 pl-2.5 pr-3.5 py-2 rounded-full bg-accent text-on-accent shadow-lg"
              >
                <Play size={14} className="ml-0.5" fill="currentColor" />
                <span className="font-mono text-[10px] uppercase tracking-[0.16em]">Preview</span>
              </button>
            ) : (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Open"
                className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 pl-2.5 pr-3.5 py-2 rounded-full bg-accent text-on-accent shadow-lg"
              >
                <ArrowUpRight size={14} />
                <span className="font-mono text-[10px] uppercase tracking-[0.16em]">Open</span>
              </a>
            )
          )}
        </div>
      </motion.div>
    </div>
  );
}

function pipeline(project) {
  return (project.architecture || '')
    .split('->')
    .map((step) => step.trim())
    .filter(Boolean);
}

function FlagshipStudy({ project, index, reversed, reduced, onOpenModal }) {
  const num = String(index + 1).padStart(2, '0');
  const steps = pipeline(project).slice(0, 4);

  const copy = (
    <div className="flex flex-col justify-center lg:py-4">
      <div className="flex items-center gap-4 mb-6 font-mono text-[11px] tracking-[0.18em] uppercase text-faint">
        <span className="text-accent">{num}</span>
        <span>{project.category}</span>
        <span className="ml-auto">{project.year}</span>
      </div>
      <h3 className="font-display text-[clamp(2rem,3.4vw,3.4rem)] font-medium tracking-[-0.04em] leading-[1.02] text-fg mb-5">
        {project.title}
      </h3>
      <p className="text-muted text-sm md:text-base leading-relaxed max-w-xl">
        <MarkedText text={project.description} phrases={STUDY_PHRASES} />
      </p>
      {steps.length > 0 && (
        <ol className="mt-7 border-t border-line">
          {steps.map((step, i) => (
            <li key={step} className="grid grid-cols-[2.5rem_1fr] gap-3 py-3 border-b border-line text-sm">
              <span className="font-mono text-[11px] text-accent pt-0.5">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-fg/90 leading-snug"><MarkedText text={step} phrases={STUDY_PHRASES} /></span>
            </li>
          ))}
        </ol>
      )}
      <div className="flex flex-wrap gap-2 mt-6">
        {project.tech.map((t) => (
          <span key={t} className="px-2.5 py-1 text-[10px] font-mono border border-line text-muted">
            {t}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-7">
        <button
          type="button"
          onClick={() => onOpenModal?.(project)}
          data-cursor="Study"
          className="inline-flex items-center gap-2 text-sm font-medium text-fg link-underline press-effect"
        >
          <Layers size={14} className="text-accent" /> Open the study
        </button>
        {project.demo ? (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Open"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-fg link-underline"
          >
            Live <ArrowUpRight size={14} className="text-accent" />
          </a>
        ) : null}
        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Code"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg transition-colors"
          >
            <Github size={14} /> Source
          </a>
        ) : null}
      </div>
    </div>
  );

  const frame = <BrowserFrame project={project} reduced={reduced} />;

  return (
    <article className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center py-12 md:py-16 border-t border-line">
      <div className={`lg:col-span-7 ${reversed ? 'lg:order-2' : ''}`}>{frame}</div>
      <div className={`lg:col-span-5 ${reversed ? 'lg:order-1' : ''}`}>{copy}</div>
    </article>
  );
}

function ArchiveCard({ project, index, onOpenModal, span, reduced }) {
  const num = String(index + 1).padStart(2, '0');
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 240, damping: 26, mass: 0.35 });
  const sy = useSpring(my, { stiffness: 240, damping: 26, mass: 0.35 });
  const rotateY = useTransform(sx, [-0.5, 0.5], reduced ? [0, 0] : [6.5, -6.5]);
  const rotateX = useTransform(sy, [-0.5, 0.5], reduced ? [0, 0] : [-5, 5]);

  const onMove = (event) => {
    if (reduced) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((event.clientX - rect.left) / rect.width - 0.5);
    my.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <div className={span} style={{ perspective: 1000 }}>
      <motion.button
        ref={ref}
        type="button"
        onClick={() => onOpenModal?.(project)}
        onMouseMove={onMove}
        onMouseLeave={() => { mx.set(0); my.set(0); }}
        data-cursor="View"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group text-left bg-canvas flex flex-col min-h-full w-full border border-line"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-elevated">
          <img
            src={project.image}
            alt={`${project.title} preview`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
        </div>
        <div className="p-5 md:p-6 flex flex-col gap-3 flex-1 border-t border-line">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
            <span>{num}</span>
            <span>{project.year}</span>
          </div>
          <h3 className="font-display text-xl md:text-[1.65rem] tracking-[-0.03em] leading-tight text-fg">
            {project.title}
          </h3>
          <p className="text-sm text-muted leading-relaxed line-clamp-3"><MarkedText text={project.description} phrases={STUDY_PHRASES} /></p>
          <span className="mt-auto pt-2 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
            {project.category}
            <ArrowUpRight size={12} />
          </span>
        </div>
      </motion.button>
    </div>
  );
}

const ARCHIVE_SPANS = ['md:col-span-3', 'md:col-span-3', 'md:col-span-2', 'md:col-span-2', 'md:col-span-2'];

export default function ProjectShowcase({ projects = [] }) {
  const reduced = useReducedMotion();
  const [selectedProject, setSelectedProject] = useState(null);
  const flagship = projects.slice(0, 2);
  const archive = projects.slice(2);

  return (
    <div>
      {flagship.map((project, idx) => (
        <FlagshipStudy
          key={project.title}
          project={project}
          index={idx}
          reversed={idx === 1}
          reduced={reduced}
          onOpenModal={setSelectedProject}
        />
      ))}

      {archive.length > 0 && (
        <div className="pt-6 md:pt-10">
          <div className="flex items-baseline justify-between gap-6 mb-6">
            <h3 className="font-serif italic text-2xl md:text-3xl text-fg">Further studies</h3>
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-faint">
              {String(archive.length).padStart(2, '0')} in the archive
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-5">
            {archive.map((project, idx) => (
              <ArchiveCard
                key={project.title}
                project={project}
                index={idx + flagship.length}
                span={ARCHIVE_SPANS[idx] || 'md:col-span-2'}
                reduced={reduced}
                onOpenModal={setSelectedProject}
              />
            ))}
          </div>
        </div>
      )}

      <ProjectModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

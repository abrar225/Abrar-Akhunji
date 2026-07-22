import React, { useRef, useState, useMemo } from 'react';
import { ArrowUpRight, Github, Play, RotateCw, Lock, Loader2, Layers } from 'lucide-react';
import ProjectModal from './ProjectModal';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useMotionTemplate,
  useReducedMotion,
} from 'framer-motion';

/**
 * ProjectShowcase — "Live Browser Split" + Cinematic Depth Dolly.
 *
 * Each project is a two-column row: editorial details on one side, a mini
 * browser chrome on the other that can boot the *actual* live demo in an
 * on-demand iframe. Rows alternate sides for rhythm and stack on mobile.
 *
 * Motion: every row is scroll-linked (useScroll), so it flies *in* from deep
 * space as it enters the viewport (blurred, small, low) and recedes *out* as it
 * leaves the top — fully reversible on scroll-up. Camera focus-pull feel.
 *
 * Design goals:
 *  - No GSAP pinning (the codebase avoids pin-spacers). Desktop uses a plain
 *    `md:sticky` so the browser lingers while the details are read.
 *  - Iframes load only on click → no 6-iframe performance tax, and sites that
 *    block framing degrade gracefully (the "Open ↗" button always works).
 *  - Fully reduced-motion aware (all transforms collapse to static content).
 */

/** Turn a HuggingFace Spaces page URL into its embeddable *.hf.space host. */
function toEmbedUrl(project) {
  if (project.embed) return project.embed;
  const demo = project.demo;
  if (!demo) return null;
  const hf = demo.match(/huggingface\.co\/spaces\/([^/]+)\/([^/?#]+)/i);
  if (hf) return `https://${hf[1]}-${hf[2]}.hf.space`.toLowerCase();
  return demo;
}

/** Pretty domain for the fake URL bar. */
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
  // Only sites that permit framing (no X-Frame-Options / CSP block) can boot
  // truly live. Others (e.g. Vercel apps that refuse embedding) fall back to a
  // pixel-perfect screenshot + a prominent "open in new tab" action.
  const canEmbed = hasDemo && project.embeddable === true && Boolean(embedUrl) && !failed;

  // 3D tilt — cursor-follow springs
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 150, damping: 18, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 150, damping: 18, mass: 0.4 });
  const rotateY = useTransform(sx, [-0.5, 0.5], reduced ? [0, 0] : [-7, 7]);
  const rotateX = useTransform(sy, [-0.5, 0.5], reduced ? [0, 0] : [6, -6]);

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
    <div style={{ perspective: 1200 }} className="w-full">
      <motion.div
        ref={wrapRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group/browser relative rounded-xl overflow-hidden border border-line bg-elevated shadow-2xl"
      >
        {/* ── chrome bar ── */}
        <div className="flex items-center gap-3 px-4 h-11 border-b border-line bg-surface/80 backdrop-blur">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 flex items-center gap-2 h-6 px-3 rounded-md bg-canvas/70 border border-line min-w-0">
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
                  className="p-1 rounded text-faint hover:text-accent transition-colors"
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
                className="p-1 rounded text-faint hover:text-accent transition-colors"
              >
                <ArrowUpRight size={15} />
              </a>
            </div>
          )}
        </div>

        {/* ── viewport ── */}
        <div className="relative aspect-[16/10] overflow-hidden bg-canvas">
          {/* screenshot poster (idle-panning) */}
          {!live && (
            <img
              src={project.image}
              alt={`${project.title} preview`}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-top will-change-transform transition-transform duration-[3500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/browser:-translate-y-[8%] group-hover/browser:scale-[1.04]"
            />
          )}

          {/* live iframe (loads on demand — embeddable sites only) */}
          {canEmbed && live && (
            <>
              {!loaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-surface">
                  <Loader2 size={22} className="text-accent animate-spin" />
                  <span className="font-mono text-[11px] text-muted tracking-wide">
                    Booting live demo…
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

          {/* CTA overlay — before boot. Embeddable → boot iframe. Otherwise →
              open the real site in a new tab (some hosts refuse embedding). */}
          {hasDemo && !(canEmbed && live) && (
            canEmbed ? (
              <button
                type="button"
                onClick={() => setLive(true)}
                data-cursor="Run"
                className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-canvas/45 opacity-0 group-hover/browser:opacity-100 transition-opacity duration-300 backdrop-blur-[1px]"
              >
                <span className="flex items-center justify-center w-16 h-16 rounded-full bg-accent text-[#0F0E0C] shadow-xl transition-transform duration-300 group-hover/browser:scale-110">
                  <Play size={26} className="ml-1" fill="currentColor" />
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-fg">
                  Load live preview
                </span>
              </button>
            ) : (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Open"
                className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-canvas/45 opacity-0 group-hover/browser:opacity-100 transition-opacity duration-300 backdrop-blur-[1px]"
              >
                <span className="flex items-center justify-center w-16 h-16 rounded-full bg-accent text-[#0F0E0C] shadow-xl transition-transform duration-300 group-hover/browser:scale-110">
                  <ArrowUpRight size={28} />
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-fg">
                  Open live site
                </span>
              </a>
            )
          )}

          {/* status pill */}
          <span className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-canvas/70 backdrop-blur border border-line font-mono text-[9px] uppercase tracking-widest text-muted pointer-events-none">
            {hasDemo ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-[#28c840] animate-pulse" /> Live
              </>
            ) : (
              <>
                <Lock size={9} /> Preview only
              </>
            )}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

function ProjectRow({ project, index, reduced, onOpenModal }) {
  const num = String(index + 1).padStart(2, '0');
  const flip = index % 2 === 1; // alternate sides on desktop

  // ── Cinematic depth dolly ──────────────────────────────────────────────
  // Drive the whole row from its own scroll position. progress: 0 = row's top
  // touches the viewport bottom (about to enter), 1 = row's bottom leaves the
  // top. We fly it in from below (blurred / small / low) and let it recede out.
  const rowRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ['start end', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.24, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.24, 0.8, 1], [0.86, 1, 1, 0.92]);
  const y = useTransform(scrollYProgress, [0, 0.24, 0.8, 1], [96, 0, 0, -72]);
  const blur = useTransform(scrollYProgress, [0, 0.24, 0.8, 1], [10, 0, 0, 8]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  const dollyStyle = reduced
    ? undefined
    : { opacity, scale, y, filter, willChange: 'transform, opacity, filter' };

  const details = (
    <div className="flex flex-col justify-center">
      <div className="flex items-center justify-between mb-6">
        <span className="tag px-3 py-1 text-[10px] font-mono uppercase tracking-wider">
          {project.category}
        </span>
        <span className="font-mono text-xs text-muted">{project.year}</span>
      </div>

      <div className="flex items-start gap-3 mb-5">
        <span className="font-mono text-sm text-accent mt-2">{num}</span>
        <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium text-fg tracking-tight leading-[0.95]">
          {project.title}
        </h3>
      </div>

      <p className="text-muted text-sm md:text-base leading-relaxed mb-6 max-w-md">
        {project.description}
      </p>

      <ul className="space-y-2.5 mb-7">
        {project.features.slice(0, 4).map((f, i) => (
          <li key={i} className="flex items-start gap-3 text-xs md:text-sm text-fg/80">
            <span className="mt-1.5 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2 mb-7">
        {project.tech.map((t) => (
          <span
            key={t}
            className="px-2.5 py-1 text-[10px] font-mono border border-line rounded text-muted"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <button
          type="button"
          onClick={() => onOpenModal?.(project)}
          data-cursor="Inspect"
          className="flex items-center gap-1.5 text-sm font-mono font-semibold text-accent hover:text-accent-soft transition-colors cursor-pointer"
        >
          <Layers size={14} /> Specs &amp; Architecture ↗
        </button>
        {project.demo ? (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Open"
            className="flex items-center gap-1.5 text-sm font-semibold text-fg link-underline"
          >
            Live Demo <ArrowUpRight size={14} className="text-accent" />
          </a>
        ) : (
          <span className="flex items-center gap-1.5 text-sm font-semibold text-faint">
            Live Demo (soon)
          </span>
        )}
        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Code"
            className="flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-accent transition-colors"
          >
            <Github size={14} /> Source
          </a>
        ) : (
          <span className="flex items-center gap-1.5 text-sm font-semibold text-faint">
            <Github size={14} /> Private
          </span>
        )}
      </div>
    </div>
  );

  const browser = (
    <div>
      <BrowserFrame project={project} reduced={reduced} />
    </div>
  );

  return (
    <motion.div
      ref={rowRef}
      style={dollyStyle}
      className="grid md:grid-cols-2 gap-10 md:gap-16 items-center"
    >
      {/* On mobile: details first, then browser. On desktop: alternate. */}
      <div className={flip ? 'md:order-2' : ''}>{details}</div>
      <div className={flip ? 'md:order-1' : ''}>{browser}</div>
    </motion.div>
  );
}

export default function ProjectShowcase({ projects = [] }) {
  const reduced = useReducedMotion();
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="flex flex-col gap-24 md:gap-40">
      {projects.map((project, idx) => (
        <ProjectRow
          key={idx}
          project={project}
          index={idx}
          reduced={reduced}
          onOpenModal={(p) => setSelectedProject(p)}
        />
      ))}

      <ProjectModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

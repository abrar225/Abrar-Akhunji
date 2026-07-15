import React, { useMemo, useState } from 'react';

/**
 * VerticalMarquee — truus-style double-column marquee of TECHNOLOGY LOGOS.
 * Two columns scroll in opposite directions (CSS keyframes), duplicated for a
 * seamless loop and paused on hover. Each tile shows the real brand logo
 * (Simple Icons CDN) with the name beneath — muted/desaturated at rest, full
 * colour + lift on hover. If a logo fails to load, the tile falls back to a
 * clean monogram so nothing ever looks broken.
 */

// name → Simple Icons slug (only real, stable slugs from Abrar's stack)
const STACK = [
  { name: 'Python', slug: 'python' },
  { name: 'PyTorch', slug: 'pytorch' },
  { name: 'TensorFlow', slug: 'tensorflow' },
  { name: 'OpenCV', slug: 'opencv' },
  { name: 'NumPy', slug: 'numpy' },
  { name: 'Pandas', slug: 'pandas' },
  { name: 'scikit-learn', slug: 'scikitlearn' },
  { name: 'React', slug: 'react' },
  { name: 'Next.js', slug: 'nextdotjs' },
  { name: 'Django', slug: 'django' },
  { name: 'Flask', slug: 'flask' },
  { name: 'Node.js', slug: 'nodedotjs' },
  { name: 'JavaScript', slug: 'javascript' },
  { name: 'Tailwind', slug: 'tailwindcss' },
  { name: 'GSAP', slug: 'greensock' },
  { name: 'Three.js', slug: 'threedotjs' },
  { name: 'MySQL', slug: 'mysql' },
  { name: 'SQLite', slug: 'sqlite' },
  { name: 'Redis', slug: 'redis' },
  { name: 'Firebase', slug: 'firebase' },
  { name: 'Git', slug: 'git' },
  { name: 'Linux', slug: 'linux' },
  { name: 'Vite', slug: 'vite' },
  { name: 'Docker', slug: 'docker' },
];

function LogoTile({ tech }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="group/tile shrink-0 rounded-2xl bg-surface border border-line px-4 py-6 flex flex-col items-center justify-center gap-3 transition-colors duration-300 hover:border-accent/50">
      <div className="h-9 md:h-10 flex items-center justify-center">
        {failed ? (
          <span className="w-9 h-9 rounded-lg bg-elevated text-accent flex items-center justify-center font-display font-bold text-sm">
            {tech.name.slice(0, 2)}
          </span>
        ) : (
          <img
            src={`https://cdn.simpleicons.org/${tech.slug}`}
            alt={`${tech.name} logo`}
            width={40}
            height={40}
            loading="lazy"
            onError={() => setFailed(true)}
            className="w-9 h-9 md:w-10 md:h-10 object-contain grayscale opacity-60 group-hover/tile:grayscale-0 group-hover/tile:opacity-100 transition-all duration-500"
          />
        )}
      </div>
      <span className="font-mono text-[11px] md:text-xs text-muted group-hover/tile:text-fg transition-colors text-center whitespace-nowrap">
        {tech.name}
      </span>
    </div>
  );
}

function Column({ list, dir, dur }) {
  return (
    <div className="vmarquee-col h-full">
      <div className={`vmarquee-track ${dir}`} style={{ '--v-dur': `${dur}s` }}>
        {[...list, ...list].map((tech, i) => (
          <LogoTile key={i} tech={tech} />
        ))}
      </div>
    </div>
  );
}

export default function VerticalMarquee({ className = '' }) {
  const [colA, colB] = useMemo(() => {
    const half = Math.ceil(STACK.length / 2);
    return [STACK.slice(0, half), STACK.slice(half)];
  }, []);

  return (
    <div className={`flex gap-3 md:gap-4 h-[460px] sm:h-[560px] md:h-[680px] ${className}`}>
      <Column list={colA} dir="up" dur={30} />
      <Column list={colB} dir="down" dur={26} />
    </div>
  );
}

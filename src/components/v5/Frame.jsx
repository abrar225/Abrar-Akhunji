import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const focalPoints = {
  'fixo-flow': '52% 50%',
  packetlark: '58% 49%',
  'framecast-studio': '63% 50%',
};

export function ProjectFrame({ project, inspecting = false, priority, projection = false }) {
  const reduced = useReducedMotion();

  return (
    <div
      className="v5-frame"
      data-project={project.slug}
      data-inspecting={inspecting}
      style={{ '--frame-focus': focalPoints[project.slug] }}
    >
      <AnimatePresence initial={false}>
        <motion.img
          key={project.slug}
          src={project.image}
          alt={project.imageAlt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : .22, ease: [.2, .65, .3, 1] }}
        />
      </AnimatePresence>
      {projection && <span key={project.slug} className="v5-frame-scan" aria-hidden="true" />}
    </div>
  );
}

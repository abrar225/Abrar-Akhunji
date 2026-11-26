import { useRef } from 'react';
import { Maximize, X } from 'lucide-react';

export default function ProjectZoom({ project }) {
  const dialog = useRef(null);

  return (
    <figure className="signal-case-visual">
      <div>
        <button className="signal-zoom-trigger" type="button" onClick={() => dialog.current.showModal()} aria-label="Expand project image" aria-haspopup="dialog">
          <img src={project.image} alt={project.imageAlt} width="1200" height="750" fetchPriority="high" />
          <span><Maximize size={16} aria-hidden="true" /> Expand image</span>
        </button>
      </div>
      <figcaption className="signal-label">Project preview / {project.status}{project.slug === 'packetlark' ? ' · The Node workbench runs locally' : ''}</figcaption>
      <dialog className="signal-image-dialog" ref={dialog} aria-label={`${project.title} preview`}
        onClick={(event) => { if (event.target === dialog.current) dialog.current.close(); }}>
        <form method="dialog"><button type="submit" aria-label="Close image"><X size={24} /></button></form>
        <img src={project.image} alt={project.imageAlt} width="1200" height="750" loading="lazy" />
      </dialog>
    </figure>
  );
}

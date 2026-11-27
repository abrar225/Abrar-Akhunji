import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Maximize, X } from 'lucide-react';

export function PageLead({ label, title, description, children, aside }) {
  return <header className="patch-page-lead">
    <div className="patch-wide patch-page-lead-inner">
      <div>
        {label && <p className="patch-label">{label}</p>}
        <h1>{title}</h1>
        {description && <p className="patch-page-deck">{description}</p>}
        {children && <div className="patch-actions">{children}</div>}
      </div>
      {aside}
    </div>
  </header>;
}

export function Action({ children, to, href }) {
  const contents = <>{children} <ArrowUpRight size={16} aria-hidden="true" /></>;
  return to ? <Link className="patch-action" to={to}>{contents}</Link> : <a className="patch-action" href={href}>{contents}</a>;
}

export function MediaProof({ project }) {
  const dialog = useRef(null);
  const viewport = useRef(null);
  const [detail, setDetail] = useState(false);
  const switchView = () => {
    setDetail(!detail);
    viewport.current.scrollTo(0,0);
  };
  return <figure className="patch-case-visual">
    <img src={project.image} alt={project.imageAlt} width="1200" height="833" />
    <figcaption>
      <span className="patch-label">{project.title} · Product interface</span>
      <button type="button" onClick={() => dialog.current.showModal()} aria-haspopup="dialog"><Maximize size={15} aria-hidden="true" /> Inspect interface</button>
    </figcaption>
    <dialog className="patch-media-dialog" ref={dialog} aria-label={`${project.title} interface`} onClose={() => setDetail(false)}>
      <header><button onClick={switchView} aria-pressed={detail}>Detail view</button><form method="dialog"><button aria-label="Close image" autoFocus><X aria-hidden="true" /></button></form></header>
      {detail && <p>Swipe or use arrow keys to pan.</p>}
      <div tabIndex={0} role="region" aria-label="Product interface image" ref={viewport} data-detail={detail}>
        <img src={project.image} alt={project.imageAlt} width="1200" height="833" loading="lazy" />
      </div>
    </dialog>
  </figure>;
}

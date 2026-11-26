import { Link } from 'react-router-dom';
import { ArrowDownRight, ArrowUpRight, CircuitBoard, GitBranch, Mail } from 'lucide-react';
import { PaperEdge } from './PaperEdge';
import { SignalLink } from './Primitives';
import portfolio from '../../data/portfolio.json';
import { projectPath } from '../../lib/projects';
import { postPath } from '../../lib/content/urls';

function CircuitTrace() {
  return (
    <svg className="signal-bento-trace" viewBox="0 0 252 128" aria-hidden="true">
      <path data-circuit-path="" pathLength="100" d="M8 64H55L79 39H128L154 13H243M55 64L79 89H130L154 115H243M79 39L103 64H243" fill="none" />
      <g>
        <circle cx="8" cy="64" r="5" /><circle cx="79" cy="39" r="5" />
        <circle cx="243" cy="13" r="5" /><circle cx="243" cy="64" r="5" /><circle cx="243" cy="115" r="5" />
      </g>
    </svg>
  );
}

export function EngineeringBento({ project }) {
  return (
    <section id="engineering" className="signal-engineering-sheet">
      <PaperEdge kind="wave" />
      <div className="signal-wrap">
        <div className="signal-bento-heading" data-print-reveal="">
          <div><p className="signal-label">Inside {project.title}</p><h2>How it works<span>.</span></h2></div>
          <CircuitBoard size={62} strokeWidth={1.25} aria-hidden="true" />
        </div>
        <ol className="signal-bento" aria-label={`How ${project.title} works`}>
          {project.layers.slice(0, 3).map((layer, index) => (
            <li key={index} className={`signal-bento-layer signal-bento-layer-${index + 1}`} data-print-reveal="">
              <span className="signal-label signal-bento-step">Step {index + 1}</span>
              {index === 0 && <CircuitTrace />}
              <div><h3>{layer.title}</h3><p>{layer.detail}</p></div>
            </li>
          ))}
          <li className="signal-bento-source" data-print-reveal="">
            <GitBranch size={26} aria-hidden="true" />
            <Link to={projectPath(project.slug)}>Architecture &amp; evidence <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </li>
        </ol>
      </div>
    </section>
  );
}

export function ProfileSheet() {
  const { role, date } = portfolio.experience[0];
  return (
    <section id="about-me" className="signal-home-profile">
      <div className="signal-wrap signal-profile-grid">
        <div className="signal-profile-copy" data-print-reveal="">
          <p className="signal-label">About me</p>
          <h2>From model<br />to interface<span>.</span></h2>
          <p>I’m drawn to the work between a model that runs and a product someone can use. That means making choices about latency, recovery paths, packaging, and the interface people actually touch.</p>
          <SignalLink to="/about/">Background &amp; experience</SignalLink>
        </div>
        <div className="signal-profile-inset" data-print-reveal="">
          <p className="signal-handwriting">I care about how it feels to use. <ArrowDownRight size={24} aria-hidden="true" /></p>
          <dl className="signal-profile-role" id="experience">
            <dt className="signal-label">Recent experience</dt>
            <dd><strong>{role}</strong><span>{date}</span></dd>
          </dl>
        </div>
      </div>
    </section>
  );
}

export function WritingShelf({ notes }) {
  return (
    <section id="writing" className="signal-home-writing">
      <PaperEdge />
      <div className="signal-wrap">
        <div className="signal-section-top" data-print-reveal="">
          <div><p className="signal-label">Engineering notes</p><h2>The Neural Log<span>.</span></h2></div>
          <Link className="signal-inline" to="/blog/">All articles <ArrowUpRight size={18} /></Link>
        </div>
        <div className="signal-notes">
          {notes.map((post, index) => (
            <Link to={postPath(post.slug)} key={post.slug} data-print-reveal="">
              {index === 0 && post.heroImage && <figure><img src={post.heroImage} alt="" loading="lazy" width="720" height="400" /></figure>}
              <span className="signal-label">{post.date} / {post.readingTime} min</span>
              <h3>{post.title}</h3>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactStrip() {
  return (
    <section id="contact" className="signal-home-contact">
      <PaperEdge kind="wave" />
      <div className="signal-wrap" id="services" data-print-reveal="">
        <Mail size={42} strokeWidth={1.3} aria-hidden="true" />
        <div><p className="signal-label">Available for new opportunities</p><h2>Have a role in mind?</h2></div>
        <SignalLink to="/hire/">Work with me</SignalLink>
      </div>
    </section>
  );
}

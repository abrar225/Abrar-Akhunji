import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Focus, Minus } from 'lucide-react';
import { featuredProjects, projectPath, RESUME } from '../../lib/projects';
import { ProjectFrame } from './Frame';

const frameNumber = index => String(index + 1).padStart(2, '0');
const writingStyles = {
  title: 'Writing styles',
  detail: 'Choose how your transcript is edited, from verbatim speech to concise or polished prose.',
};

export default function Hero({ project, onSelect }) {
  const [inspection, setInspection] = useState(null);
  const inspectButton = useRef(null);
  const index = featuredProjects.indexOf(project);
  const inspecting = inspection === project.slug;
  const detail = project.slug === 'fixo-flow' ? writingStyles : project.layers[0];
  const pick = next => {
    setInspection(null);
    onSelect(featuredProjects[next].slug);
  };

  const handleKeys = event => {
    if (event.key === 'Escape' && inspecting) {
      setInspection(null);
      inspectButton.current?.focus();
    }
    if (!event.target.matches('[data-frame-choice]')) return;
    const last = featuredProjects.length - 1;
    const choices = { ArrowLeft: index === 0 ? last : index - 1, ArrowRight: index === last ? 0 : index + 1, Home: 0, End: last };
    if (!Object.hasOwn(choices, event.key)) return;
    event.preventDefault();
    pick(choices[event.key]);
    event.currentTarget.querySelectorAll('[data-frame-choice]')[choices[event.key]].focus({ preventScroll: true });
  };

  return (
    <section id="home" aria-labelledby="v5-name" className="v5-hero">
      <div className="v5-wrap v5-hero-grid">
        <div className="v5-hero-copy">
          <p className="v5-meta v5-hero-role"><span className="v5-status-light" /> AI &amp; Full-Stack Engineer</p>
          <h1 id="v5-name">Abrar <span>Akhunji<span className="v5-name-period">.</span></span></h1>
          <p className="v5-hero-intro">I build AI tools and software for the little things that slow people down.</p>
          <div className="v5-actions">
            <a className="v5-button v5-button-accent" href="#work">Explore my work <ArrowDown size={18} /></a>
            <a className="v5-button v5-button-outline" href={RESUME} target="_blank" rel="noreferrer">Résumé <ArrowUpRight size={17} /></a>
          </div>
        </div>
        <div className="v5-projection" onKeyDown={handleKeys}>
          <div className="v5-aperture" aria-hidden="true"><i /><i /><i /><i /><i /></div>
          <div className="v5-film-edges" aria-hidden="true">
            {featuredProjects.filter(item => item !== project).map((item, position) => (
              <div key={item.slug} className={`v5-film-edge edge-${position}`}>
                <img src={item.image} alt="" width="360" height="240" loading="lazy" />
                <span>{item.title}</span>
              </div>
            ))}
          </div>
          <div className="v5-contact-sheet">
            <div className="v5-sheet-head v5-meta">
              <span><i aria-hidden="true" /> On my screen</span>
              <span>{frameNumber(index)} / {String(featuredProjects.length).padStart(2, '0')}</span>
            </div>
            <div className="v5-screen">
              <ProjectFrame project={project} inspecting={inspecting} priority={index === 0} projection />
              <button
                className="v5-inspect"
                type="button"
                ref={inspectButton}
                aria-expanded={inspecting}
                aria-controls="v5-projection-detail"
                onClick={() => setInspection(inspecting ? null : project.slug)}
              >
                {inspecting ? <Minus size={16} /> : <Focus size={16} />}
                {inspecting ? 'Close detail' : 'Inspect'}
              </button>
            </div>
            <div className="v5-sheet-caption" id="v5-projection-detail" aria-live="polite">
              <div>
                <p className="v5-meta">{inspecting ? 'Engineering detail' : project.category}</p>
                <p className="v5-sheet-name">{inspecting ? detail.title : project.title}</p>
                {inspecting && <p className="v5-sheet-detail">{detail.detail}</p>}
              </div>
              <Link className="v5-projection-link" to={projectPath(project.slug)} aria-label={`Read the ${project.title} case study`}><ArrowUpRight size={22} /></Link>
            </div>
            <div className="v5-sheet-index" role="group" aria-label="Project contact sheet">
              {featuredProjects.map((item, position) => (
                <button type="button" data-frame-choice key={item.slug} aria-pressed={position === index} onClick={() => pick(position)}>
                  <span aria-hidden="true">{frameNumber(position)}</span>{item.title}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="v5-hero-rail v5-meta">
          <span>Ahmedabad, India</span>
          <a className="v5-scroll-cue" href="#work">Scroll to explore <ArrowDown size={14} /></a>
          <a href="#contact"><span className="v5-status-light" /> Open to engineering roles <ArrowUpRight size={14} /></a>
        </div>
      </div>
    </section>
  );
}

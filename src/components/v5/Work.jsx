import { useEffect, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Plus } from 'lucide-react';
import { archiveProjects, featuredProjects, projectPath } from '../../lib/projects';
import { ProjectFrame } from './Frame';

const frameNumber = index => String(index + 1).padStart(2, '0');
const projectColors = ['#c6c2e9', '#b9c8e5', '#cecfc9'];

export function Work({ project, onSelect }) {
  const scroller = useRef(null);
  const scrollTimer = useRef(null);
  const lastPosition = useRef(null);
  const requestedPosition = useRef(null);
  const wheelLock = useRef(0);
  const index = featuredProjects.indexOf(project);

  useEffect(() => {
    const rail = scroller.current;
    const browse = event => {
      if (Math.abs(event.deltaX) >= Math.abs(event.deltaY)) {
        requestedPosition.current = null;
        return;
      }
      if (event.ctrlKey
        || !window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return;
      const now = performance.now();
      if (now < wheelLock.current) {
        event.preventDefault();
        return;
      }
      const direction = Math.sign(event.deltaY);
      const next = index + direction;
      if (next < 0 || next >= featuredProjects.length) return;
      event.preventDefault();
      wheelLock.current = now + 450;
      onSelect(featuredProjects[next].slug);
    };
    rail.addEventListener('wheel', browse, { passive: false });
    return () => rail.removeEventListener('wheel', browse);
  }, [index, onSelect]);

  useLayoutEffect(() => {
    const rail = scroller.current;
    const slides = [...rail.children];
    let frame = 0;
    const update = () => {
      frame = 0;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      slides.forEach(slide => {
        const offset = (slide.offsetLeft - rail.scrollLeft) / rail.clientWidth;
        slide.style.setProperty('--shelf-turn', reduce ? '0deg' : `${Math.max(-1, Math.min(1, offset)) * -13}deg`);
        slide.style.setProperty('--shelf-shift', reduce ? '0px' : `${Math.min(1, Math.abs(offset)) * 24}px`);
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const resize = new ResizeObserver(() => {
      const active = rail.querySelector('.v5-slide:not([inert])');
      requestedPosition.current = null;
      if (active) rail.scrollLeft = active.offsetLeft;
      schedule();
    });
    rail.addEventListener('scroll', schedule, { passive: true });
    resize.observe(rail);
    update();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      rail.removeEventListener('scroll', schedule);
    };
  }, []);

  useLayoutEffect(() => {
    const rail = scroller.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const left = rail.children[index].offsetLeft;
    if (Math.abs(rail.scrollLeft - left) > 1) {
      requestedPosition.current = index;
      rail.scrollTo({ left, behavior: reduce || lastPosition.current === null ? 'instant' : 'smooth' });
    } else {
      requestedPosition.current = null;
    }
    lastPosition.current = index;
    return () => clearTimeout(scrollTimer.current);
  }, [index]);

  const go = position => onSelect(featuredProjects[position].slug);

  const step = direction => go((index + direction + featuredProjects.length) % featuredProjects.length);
  const syncFromScroll = () => {
    clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => {
      const rail = scroller.current;
      const slides = [...rail.children];
      // A button-driven transition owns selection until it reaches its target.
      // Intermediate scroll frames must not select a project it passes over.
      if (requestedPosition.current !== null) {
        const target = slides[requestedPosition.current];
        if (Math.abs(target.offsetLeft - rail.scrollLeft) < 2) requestedPosition.current = null;
        return;
      }
      const position = slides.reduce((nearest, slide, current) =>
        Math.abs(slide.offsetLeft - rail.scrollLeft) < Math.abs(slides[nearest].offsetLeft - rail.scrollLeft) ? current : nearest, 0);
      if (position !== index) onSelect(featuredProjects[position].slug);
    }, 130);
  };

  const handleKeys = event => {
    if (!event.target.matches('[data-work-choice], .v5-work-rail')) return;
    const last = featuredProjects.length - 1;
    const choices = { ArrowLeft: index === 0 ? last : index - 1, ArrowRight: index === last ? 0 : index + 1, Home: 0, End: last };
    if (!Object.hasOwn(choices, event.key)) return;
    event.preventDefault();
    const next = choices[event.key];
    go(next);
    if (event.target.matches('[data-work-choice]')) {
      event.currentTarget.querySelectorAll('[data-work-choice]')[next].focus({ preventScroll: true });
    }
  };

  return (
    <section id="work" aria-labelledby="v5-work-title" className="v5-work">
      <div className="v5-wrap">
        <div className="v5-section-heading">
          <div>
            <p className="v5-meta">A few things I’ve made</p>
            <h2 id="v5-work-title">Selected work.</h2>
          </div>
          <Link className="v5-text-link" to="/work/">All projects <ArrowUpRight size={21} /></Link>
        </div>
        <div className="v5-gallery" onKeyDown={handleKeys}>
          <div className="v5-gallery-controls">
            <div className="v5-gallery-index" role="group" aria-label="Jump to a featured project">
              {featuredProjects.map((item, position) => (
                <button key={item.slug} type="button" data-work-choice aria-pressed={position === index} onClick={() => go(position)}>
                  <small>{frameNumber(position)}</small><span>{item.title}</span>
                </button>
              ))}
            </div>
            <div className="v5-gallery-arrows">
              <button type="button" aria-label="Previous project" onClick={() => step(-1)}><ArrowLeft size={21} /></button>
              <button type="button" aria-label="Next project" onClick={() => step(1)}><ArrowRight size={21} /></button>
            </div>
          </div>
          <div className="v5-work-rail" ref={scroller} onScroll={syncFromScroll} onPointerDown={() => { requestedPosition.current = null; }} tabIndex={0} role="region" aria-label="Featured projects">
            {featuredProjects.map((item, position) => (
              <article key={item.slug} className="v5-slide" inert={position !== index} style={{ '--project-tint': projectColors[position] }}>
                <div className="v5-slide-visual">
                  <div className="v5-slide-artifact">
                    <div className="v5-artifact-top v5-meta"><span>{item.title}</span><span>{frameNumber(position)} / 03</span></div>
                    <Link className="v5-slide-image" to={projectPath(item.slug)} aria-label={`Open ${item.title} case study`}><ProjectFrame project={item} /></Link>
                    <div className="v5-artifact-foot"><span>{item.category}</span><ArrowUpRight size={24} /></div>
                  </div>
                </div>
                <div className="v5-slide-copy">
                  <p className="v5-meta">{item.category} / {item.status}</p>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  <Link className="v5-text-link" to={projectPath(item.slug)}>Read case study <ArrowUpRight size={20} /></Link>
                </div>
              </article>
            ))}
          </div>
          <p className="sr-only" role="status">{project.title}, project {index + 1} of {featuredProjects.length}</p>
          <div className="v5-gallery-foot"><span><span className="v5-wheel-hint">Scroll over the artwork, or use the arrows</span><span className="v5-touch-hint">Swipe, or use the arrow controls</span></span><span className="v5-meta">{frameNumber(index)} / {String(featuredProjects.length).padStart(2, '0')}</span></div>
        </div>
        <details className="v5-archive" id="archive">
          <summary><span>Project archive <small>{archiveProjects.length} builds</small></span><Plus size={22} /></summary>
          <ul>{archiveProjects.map(item => (
            <li key={item.slug}><Link to={projectPath(item.slug)}><span>{item.title}</span><small>{item.category}</small><ArrowUpRight size={18} /></Link></li>
          ))}</ul>
        </details>
      </div>
    </section>
  );
}

export function Engineering({ project }) {
  return (
    <section id="engineering" className="v5-engineering" aria-labelledby="v5-engineering-title">
      <div className="v5-wrap v5-engineering-grid">
        <div>
          <p className="v5-meta">How the pieces connect</p>
          <h2 id="v5-engineering-title">Under the surface.</h2>
          <p className="v5-section-lead">A closer look at the decisions behind {project.title}.</p>
          <Link className="v5-text-link" to={projectPath(project.slug)}>Read the build <ArrowUpRight size={20} /></Link>
        </div>
        <div className="v5-engineering-record" key={project.slug}>
          <div className="v5-engineering-record-head v5-meta"><span>{project.title}</span><span>{project.status}</span></div>
          {project.layers.map(({ title, detail }, position) => (
            <details key={title} name="engineering-layer" open={position === 0}>
              <summary><small>{frameNumber(position)}</small><span>{title}</span><Plus size={19} /></summary>
              <p>{detail}</p>
            </details>
          ))}
          <ul aria-label="Project evidence">
            {project.evidence.map(({ label, url }) => <li key={label}>
              {url ? <a href={url} target="_blank" rel="noreferrer">{label} <ArrowUpRight size={14} /></a> : label}
            </li>)}
          </ul>
          <Link className="v5-source-note" to={projectPath(project.slug)}>Architecture, decisions, and source <ArrowUpRight size={16} /></Link>
        </div>
      </div>
    </section>
  );
}

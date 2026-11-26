import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectPath } from '../../lib/projects';

gsap.registerPlugin(ScrollTrigger);

const desktopStrip = '(min-width: 1050px) and (min-height: 720px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

export function ProjectFrame({ project, gallery = false }) {
  return (
    <article className={`signal-work-card ${gallery ? 'signal-gallery-card' : 'signal-index-row'}`}>
      <Link to={projectPath(project.slug)}>
        <div className="signal-work-image"><img src={project.image} alt={project.imageAlt} width="900" height="600" loading={gallery ? 'eager' : 'lazy'} /></div>
        <div className="signal-work-card-body">
          <p className="signal-label">{project.category} / {project.status}</p>
          <h2>{project.title} <ArrowUpRight aria-hidden="true" /></h2>
          <p>{project.summary}</p>
        </div>
      </Link>
    </article>
  );
}

export function WorkGallery({ items }) {
  const stage = useRef(null);
  const windowRef = useRef(null);
  const driver = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = windowRef.current;
    const media = gsap.matchMedia();
    media.add(desktopStrip, () => {
      const distance = () => track.scrollWidth - track.clientWidth;
      const tween = gsap.fromTo(track, { scrollLeft: 0 }, {
        scrollLeft: distance,
        ease: 'none',
        scrollTrigger: {
          trigger: stage.current,
          start: 'top 90px',
          end: () => `+=${Math.max(track.clientWidth * .9, distance())}`,
          pin: true,
          scrub: .38,
          invalidateOnRefresh: true,
        },
      });
      driver.current = tween.scrollTrigger;
      stage.current.dataset.scrub = 'true';
      return () => {
        driver.current = null;
        delete stage.current?.dataset.scrub;
      };
    });
    return () => media.revert();
  }, []);

  function distance() {
    const track = windowRef.current;
    return track.scrollWidth - track.clientWidth;
  }

  function syncIndex() {
    const span = distance();
    if (span > 0) setActive(Math.round(windowRef.current.scrollLeft / span * (items.length - 1)));
  }

  function goTo(index, immediate = false) {
    const target = Math.min(items.length - 1, Math.max(0, index));
    const position = target / (items.length - 1);
    const trigger = driver.current;
    if (trigger) {
      trigger.scroll(trigger.start + (trigger.end - trigger.start) * position);
      return;
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    windowRef.current.scrollTo({ left: distance() * position, behavior: reduce || immediate ? 'instant' : 'smooth' });
  }

  return (
    <section ref={stage} className="signal-gallery" aria-label="Featured project gallery">
      <div className="signal-gallery-header">
        <p className="signal-label">Featured builds</p>
        <div className="signal-gallery-controls">
          <span className="signal-label">{active + 1} / {items.length}</span>
          <button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Previous project"><ArrowLeft size={18} /></button>
          <button type="button" onClick={() => goTo(active + 1)} disabled={active === items.length - 1} aria-label="Next project"><ArrowRight size={18} /></button>
        </div>
      </div>
      <div className="signal-gallery-window" ref={windowRef} onScroll={syncIndex}
        onFocus={(event) => {
          if (!driver.current || event.target === event.currentTarget) return;
          const card = event.target.closest('.signal-gallery-card');
          const cards = [...event.currentTarget.querySelectorAll('.signal-gallery-card')];
          const index = cards.indexOf(card);
          if (index >= 0 && index !== active) goTo(index, true);
        }}>
        {items.map((project) => <ProjectFrame key={project.slug} project={project} gallery />)}
      </div>
      <div className="signal-gallery-progress" aria-hidden="true"><span style={{ transform: `scaleX(${(active + 1) / items.length})` }} /></div>
    </section>
  );
}

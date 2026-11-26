import { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate } from 'animejs';
import SEO from '../components/SEO';
import Poster from '../components/v5/Poster';
import { SignalLink } from '../components/v5/Primitives';
import { featuredProjects, selectedProject, projectPath } from '../lib/projects';
import { getAllBlogs } from '../lib/blogUtils';
import { ContactStrip, EngineeringBento, ProfileSheet, WritingShelf } from '../components/v5/HomeFeatures';

gsap.registerPlugin(ScrollTrigger);

const number = (index) => String(index + 1).padStart(2, '0');
const latestNotes = getAllBlogs().slice(0, 3);

function FeaturedWork({ project, onSelect }) {
  const preview = useRef(null);
  const previousProject = useRef(project.slug);

  useEffect(() => {
    const changed = previousProject.current !== project.slug;
    previousProject.current = project.slug;
    if (!changed || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ticket = preview.current.querySelector('.signal-feature-copy');
    const image = preview.current.querySelector('img');
    const details = animate(ticket, { y: [10, 0], opacity: [.58, 1], duration: 320, ease: 'outQuad' });
    const print = animate(image, { x: [18, 0], opacity: [.55, 1], duration: 410, ease: 'outCubic' });
    return () => { details.revert(); print.revert(); };
  }, [project.slug]);

  return (
    <section id="work" className="signal-home-work">
      <div className="signal-wrap">
        <div className="signal-section-top" data-print-reveal="">
          <div><p className="signal-label">Software in practice</p><h2>Selected work<span>.</span></h2></div>
          <Link className="signal-inline" to="/work/">All projects <ArrowUpRight size={18} /></Link>
        </div>
        <div className="signal-project-picker" role="group" aria-label="Featured projects">
          {featuredProjects.map((item, position) => (
            <button key={item.slug} type="button" aria-pressed={item === project} onClick={() => onSelect(item.slug)}>
              <span className="signal-label">{number(position)}</span>{item.title}<ArrowUpRight size={17} aria-hidden="true" />
            </button>
          ))}
        </div>
        <article className="signal-feature" ref={preview} data-project={project.slug} data-print-reveal="">
          <Link className="signal-feature-visual" to={projectPath(project.slug)} aria-label={`View ${project.title} case study`}>
            <img src={project.image} alt={project.imageAlt} width="900" height="600" loading="lazy" />
          </Link>
          <div className="signal-feature-copy">
            <p className="signal-label signal-sticker">{project.category} / {project.status}</p>
            <h3 aria-live="polite">{project.title}</h3>
            <p>{project.description}</p>
            <ul className="signal-tags" aria-label="Technologies">{project.tech.slice(0, 4).map((tech) => <li key={tech}>{tech}</li>)}</ul>
            <SignalLink to={projectPath(project.slug)}>Read the case study</SignalLink>
          </div>
        </article>
      </div>
    </section>
  );
}

export default function Home() {
  const root = useRef(null);
  const { search, hash } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const project = selectedProject(params.get('project'));

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const intro = gsap.timeline({ defaults: { ease: 'power3.out', clearProps: 'transform,opacity' } });
      intro.from('[data-name-line]', { yPercent: 105, duration: .66, stagger: .09 }, 0)
        .from('[data-poster-photo]', { y: 26, opacity: .15, duration: .72 }, .1)
        .from('.signal-hero-reveal', { y: 10, opacity: .3, duration: .38, stagger: .09 }, .28);

      for (const panel of root.current.querySelectorAll('[data-print-reveal]')) {
        gsap.from(panel, {
          y: 24, opacity: .58, duration: .64, ease: 'power3.out', clearProps: 'transform,opacity',
          scrollTrigger: { trigger: panel, start: 'top 92%', once: true },
        });
      }

      const trace = root.current.querySelector('[data-circuit-path]');
      gsap.fromTo(trace, { strokeDashoffset: 100 }, {
        strokeDashoffset: 0, ease: 'none',
        scrollTrigger: { trigger: '#engineering', start: 'top 85%', end: 'top 18%', scrub: true },
      });

      for (const edge of root.current.querySelectorAll('.signal-perforation')) {
        gsap.fromTo(edge, { strokeDashoffset: 100 }, {
          strokeDashoffset: 0, ease: 'none',
          scrollTrigger: { trigger: edge.ownerSVGElement, start: 'top bottom', end: 'top 68%', scrub: true },
        });
      }
    }, root);
    media.add('(min-width: 881px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.to('.signal-hero-halftone', {
        yPercent: -9, xPercent: 3, ease: 'none',
        scrollTrigger: { trigger: '.signal-hero', start: 'top 72px', end: 'bottom 72px', scrub: .5 },
      });
    }, root);
    return () => media.revert();
  }, []);

  const selectProject = (slug) => {
    if (slug === project.slug) return;
    const next = new URLSearchParams(params);
    next.set('project', slug);
    navigate({ search: next.toString(), hash }, { replace: true, preventScrollReset: true });
  };

  return (
    <main ref={root} id="main-content">
      <SEO title="Abrar Akhunji — AI & Full-Stack Engineer in Ahmedabad" description="AI and full-stack engineer in Ahmedabad. Explore local AI tools, developer software, and native products by Abrar Akhunji." path="/" image="/assets/v5/og-home.jpg" />
      <Poster />
      <FeaturedWork project={project} onSelect={selectProject} />
      <EngineeringBento project={project} />
      <ProfileSheet />
      <WritingShelf notes={latestNotes} />
      <ContactStrip />
    </main>
  );
}

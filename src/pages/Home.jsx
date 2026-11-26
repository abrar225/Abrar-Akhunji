import { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import SEO from '../components/SEO';
import Sculpture from '../components/v5/Sculpture';
import { SignalLink } from '../components/v5/Primitives';
import { featuredProjects, selectedProject, projectPath, RESUME } from '../lib/projects';
import { getAllBlogs } from '../lib/blogUtils';
import portfolio from '../data/portfolio.json';
import { postPath } from '../lib/content/urls';

const number = (index) => String(index + 1).padStart(2, '0');
const latestNotes = getAllBlogs().slice(0, 3);

function FeaturedWork({ project, onSelect }) {
  return (
    <section id="work" className="signal-home-work">
      <div className="signal-wrap">
        <div className="signal-section-top">
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
        <article className="signal-feature" key={project.slug}>
          <Link className="signal-feature-visual" to={projectPath(project.slug)} aria-label={`View ${project.title} case study`}>
            <img src={project.image} alt={project.imageAlt} width="900" height="600" loading="lazy" />
          </Link>
          <div className="signal-feature-copy">
            <p className="signal-label">{project.category} / {project.status}</p>
            <h3 aria-live="polite">{project.title}</h3>
            <p>{project.description}</p>
            <ul className="signal-tags" aria-label="Technologies">{project.tech.slice(0, 4).map((tech) => <li key={tech}>{tech}</li>)}</ul>
            <SignalLink to={projectPath(project.slug)}>Read the case study</SignalLink>
          </div>
        </article>
        <div className="signal-process" id="engineering">
          <div><p className="signal-label">Inside {project.title}</p><h3>How it works</h3></div>
          <ol>{project.layers.slice(0, 3).map((layer, i) => <li key={layer.title}><span className="signal-label">{number(i)}</span><div><h4>{layer.title}</h4><p>{layer.detail}</p></div></li>)}</ol>
        </div>
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
      gsap.from('.signal-hero-title > span', { yPercent: 42, opacity: 0, duration: .78, stagger: .1, ease: 'power4.out', clearProps: 'all' });
      gsap.from('.signal-hero-reveal', { y: 14, opacity: 0, duration: .62, delay: .22, stagger: .07, ease: 'power2.out', clearProps: 'all' });
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
      <section id="home" className="signal-hero">
        <div className="signal-wrap">
          <div className="signal-hero-top signal-label"><span>Engineering portfolio</span><span>Ahmedabad, India</span></div>
          <div className="signal-hero-grid">
            <div className="signal-hero-copy">
              <h1 className="signal-hero-title"><span>Abrar</span>{' '}<span>Akhunji<span className="signal-period">.</span></span></h1>
              <p className="signal-hero-role signal-hero-reveal">AI &amp; full-stack engineer</p>
              <p className="signal-hero-description signal-hero-reveal">I build local AI tools, developer software, and native apps. Explore the products and the engineering behind them.</p>
              <div className="signal-actions signal-hero-reveal">
                <Link className="signal-button" to="/#work">Explore my work <ArrowDown size={18} /></Link>
                <SignalLink href={RESUME} outline>Résumé</SignalLink>
              </div>
            </div>
            <Sculpture />
          </div>
          <div className="signal-hero-bottom">
            <p className="signal-label"><span className="signal-status" /> Open to engineering roles &amp; collaborations</p>
            <Link to="/#work" aria-label="Scroll to selected work"><ArrowDown size={20} /></Link>
          </div>
        </div>
      </section>
      <FeaturedWork project={project} onSelect={selectProject} />
      <section id="about-me" className="signal-home-profile">
        <div className="signal-wrap signal-profile-grid">
          <figure><img src="/assets/build-room/portrait.webp" alt="Abrar Akhunji" width="480" height="540" loading="lazy" /></figure>
          <div><p className="signal-label">About me</p><h2>From model to interface<span>.</span></h2><p>I’m drawn to the work between a model that runs and a product someone can use. That means making choices about latency, recovery paths, packaging, and the interface people actually touch.</p>
            <dl className="signal-profile-role" id="experience"><dt className="signal-label">Recent experience</dt><dd><strong>{portfolio.experience[0].role}</strong><span>{portfolio.experience[0].date}</span></dd></dl>
            <SignalLink to="/about/">Background &amp; experience</SignalLink></div>
        </div>
      </section>
      <section id="writing" className="signal-home-writing">
        <div className="signal-wrap">
          <div className="signal-section-top">
            <div><p className="signal-label">Engineering notes</p><h2>The Neural Log<span>.</span></h2></div>
            <Link className="signal-inline" to="/blog/">All articles <ArrowUpRight size={18} /></Link>
          </div>
          <div className="signal-notes">
            {latestNotes.map((post) => <Link to={postPath(post.slug)} key={post.slug}><span className="signal-label">{post.date} / {post.readingTime} min</span><h3>{post.title}</h3><ArrowUpRight aria-hidden="true" /></Link>)}
          </div>
        </div>
      </section>
      <section id="contact" className="signal-home-contact">
        <div className="signal-wrap" id="services"><div><p className="signal-label">Available for new opportunities</p><h2>Have a role in mind?</h2></div><SignalLink to="/hire/">Work with me</SignalLink></div>
      </section>
    </main>
  );
}

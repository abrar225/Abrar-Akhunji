import { useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import SEO from '../components/SEO';
import { featuredProjects, projectPath } from '../lib/projects';
import Ribbon from '../patchbay/Ribbon';
import { useInitialProof } from '../patchbay/useInitialProof';

const inputs = [
  { label: 'Request', name: 'PacketLark', slug: 'packetlark', shape: 0 },
  { label: 'Voice', name: 'Fixo Flow', slug: 'fixo-flow', shape: .8 },
  { label: 'Screen', name: 'Framecast', slug: 'framecast-studio', shape: -.7 },
];

export default function Home() {
  const [params, setParams] = useSearchParams();
  const selected = inputs.find(input => input.slug === params.get('project')) || inputs[0];
  const project = featuredProjects.find(entry => entry.slug === selected.slug);
  const story = useRef(null);
  const hero = useRef(null);
  const work = useRef(null);
  const proof = useRef(null);
  const [pending, skip] = useInitialProof(project.image);

  function change(input) {
    const next = new URLSearchParams(params);
    next.set('project', input.slug);
    setParams(next, { replace: true, preventScrollReset: true });
  }

  return <main id="main-content" className="patch-home">
    <SEO title="Abrar Akhunji — AI & Full-Stack Engineer in Ahmedabad" description="AI and full-stack engineer in Ahmedabad. Explore local AI tools, developer software, and native products by Abrar Akhunji." path="/" image="/assets/v5/og-home.jpg" />
    {pending && <div className="patch-loading" aria-label="Preparing project evidence">
      <svg viewBox="0 0 120 48" aria-hidden="true"><path d="M4 43C49 43 36 5 60 5s12 38 56 38" /></svg>
      <span role="status">Opening Patchbay</span><button onClick={skip}>Skip intro</button>
    </div>}
    <div className="patch-story" ref={story} data-input={selected.slug}>
      <div className="patch-projection"><Ribbon story={story} hero={hero} work={work} proof={proof} route={selected.shape} image={project.image} /></div>
      <section id="home" className="patch-hero" ref={hero} aria-labelledby="patch-name">
        <div className="patch-wide patch-hero-grid">
          <div className="patch-identity">
            <p className="patch-label">AI &amp; full-stack engineer <span>Ahmedabad, India</span></p>
            <h1 id="patch-name">Abrar<br />Akhunji<span>.</span></h1>
            <p className="patch-bio">I build local AI tools, developer software, and native apps.</p>
            <p className="patch-availability">Open to engineering roles &amp; collaborations</p>
            <div className="patch-selectors" role="group" aria-label="Choose which project to follow">
              {inputs.map(input => <button type="button" key={input.slug} aria-pressed={input === selected} onClick={() => change(input)}><span>{input.label}</span><small>{input.name}</small></button>)}
            </div>
            <a href="#work" className="patch-follow"><span>Follow the signal to {project.title}</span><ArrowDown size={18} aria-hidden="true" /></a>
          </div>
          <figure className="patch-author">
            <img src="/assets/build-room/portrait.webp" alt="Abrar Akhunji" width="720" height="960" />
            <figcaption>Independent engineering<br />from model to interface</figcaption>
          </figure>
        </div>
        <svg viewBox="0 0 350 230" className="patch-still" aria-hidden="true"><path d="M10 187C72 242 110 179 143 90S269 10 285 105 172 166 208 108 284 85 334 69" /></svg>
      </section>
      <div className="patch-paper">
        <div className="patch-sheet patch-back-sheet" aria-hidden="true" />
        <div className="patch-sheet patch-mid-sheet" aria-hidden="true" />
        <div className="patch-sheet patch-front-sheet" aria-hidden="true" />
        <p className="patch-wide patch-paper-note"><span>{selected.label}</span> <span aria-hidden="true">→</span> {project.title}</p>
      </div>
      <section id="work" className="patch-proof" ref={work} tabIndex={-1} aria-labelledby="patch-project">
        <div className="patch-wide patch-proof-grid">
          <figure>
            <img ref={proof} className="patch-proof-image" src={project.image} alt={project.imageAlt} width="1200" height="833" />
            <figcaption className="patch-label">{project.title} · Product interface</figcaption>
          </figure>
          <div className="patch-proof-copy">
            <p className="patch-label">{project.category} / {project.status}</p>
            <h2 id="patch-project">{project.title}</h2>
            <p>{project.description}</p>
            <aside><strong>{project.decisions[0].title}</strong><p>{project.decisions[0].detail}</p></aside>
            <ul className="patch-proof-stack" aria-label="Technologies">{project.tech.map(item => <li key={item}>{item}</li>)}</ul>
            <div className="patch-actions"><Link to={projectPath(project.slug)}>Read the case study <ArrowUpRight size={16} aria-hidden="true" /></Link><Link to="/work/">All work</Link></div>
          </div>
        </div>
      </section>
    </div>
  </main>;
}

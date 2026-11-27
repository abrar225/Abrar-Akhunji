import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Pause, Play } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import SEO from '../components/SEO';
import { featuredProjects, projectPath } from '../lib/projects';
import HomeSections from '../patchbay/HomeSections';
import { useInitialProof } from '../patchbay/useInitialProof';

const Ribbon = lazy(() => import('../patchbay/Ribbon'));

const inputs = [
  { label: 'Request', name: 'PacketLark', slug: 'packetlark', shape: 0 },
  { label: 'Voice', name: 'Fixo Flow', slug: 'fixo-flow', shape: .8 },
  { label: 'Screen', name: 'Framecast', slug: 'framecast-studio', shape: -.7 },
];

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const linked = inputs.find(input => input.slug === params.get('project'));
  const [cycle, setCycle] = useState(0);
  const [playing, setPlaying] = useState(() => !linked && !location.hash);
  const [heroVisible, setHeroVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(() => !document.hidden);
  const reduce = useReducedMotion();
  const selected = playing && !reduce ? inputs[cycle] : linked || inputs[cycle];
  const project = featuredProjects.find(entry => entry.slug === selected.slug);
  const story = useRef(null);
  const hero = useRef(null);
  const work = useRef(null);
  const proof = useRef(null);
  const dialog = useRef(null);
  const [pending, skip] = useInitialProof(project.image);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setHeroVisible(entry.intersectionRatio >= .35), { threshold: .35 });
    observer.observe(hero.current);
    const visibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);

  useEffect(() => {
    if (reduce || !playing || !heroVisible || !pageVisible || pending) return;
    const timer = setTimeout(() => setCycle(current => (current + 1) % inputs.length), 6500);
    return () => clearTimeout(timer);
  }, [cycle, heroVisible, pageVisible, pending, playing, reduce]);

  function change(input) {
    setPlaying(false);
    setCycle(inputs.indexOf(input));
    const next = new URLSearchParams(params);
    next.set('project', input.slug);
    navigate({ search: next.toString(), hash: location.hash }, { replace: true, preventScrollReset: true });
  }

  return <main id="main-content" className="patch-home">
    <SEO title="Abrar Akhunji — AI & Full-Stack Engineer in Ahmedabad" description="AI and full-stack engineer in Ahmedabad. Explore local AI tools, developer software, and native products by Abrar Akhunji." path="/" image="/assets/v5/og-home.jpg" />
    {createPortal(<AnimatePresence>
      {pending && !reduce && <motion.div className="patch-loading" aria-label="Preparing project evidence"
        exit={{ opacity: 0, y: '4%' }} transition={{ duration: .3, ease: [.2,.75,.25,1] }}>
        <div className="patch-loading-card">
          <svg viewBox="0 0 120 48" aria-hidden="true"><path d="M4 41C41 41 34 7 60 7S79 41 116 41" /></svg>
          <span role="status">Opening Patchbay</span><button type="button" onClick={() => {
            skip();
            hero.current.querySelector('h1').focus({ preventScroll: true });
          }}>Skip intro</button>
        </div>
      </motion.div>}
    </AnimatePresence>, document.body)}
    <div className="patch-story" ref={story} data-input={selected.slug}>
      <div className="patch-projection"><Suspense fallback={null}><Ribbon story={story} hero={hero} work={work} proof={proof} route={selected.shape} image={project.image} /></Suspense></div>
      <section id="home" className="patch-hero" ref={hero} aria-labelledby="patch-name">
        <div className="patch-fluid" aria-hidden="true"><i/><i/></div>
        <div className="patch-wide patch-hero-grid">
          <div className="patch-identity">
            <p className="patch-label">AI &amp; full-stack engineer <span>Ahmedabad, India</span></p>
            <h1 id="patch-name" tabIndex={-1}>Abrar<br />Akhunji<span>.</span></h1>
            <p className="patch-bio">I build local AI tools, developer software, and native apps.</p>
            <p className="patch-availability">Open to engineering roles &amp; collaborations</p>
            <div className="patch-selectors" role="group" aria-label="Choose which project to follow">
              {inputs.map(input => <button type="button" key={input.slug} aria-pressed={input === selected} onClick={() => change(input)}><span>{input.label}</span><small>{input.name}</small></button>)}
            </div>
            {!reduce && <button className="patch-autoplay" type="button"
              onClick={() => {
                if (playing) change(selected);
                else { setCycle(inputs.indexOf(selected)); setPlaying(true); }
              }}>
              {playing ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}
              {playing ? 'Pause autoplay' : 'Play project rotation'}
            </button>}
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
            <img ref={proof} className="patch-proof-image" src={project.image} alt={project.imageAlt} width="1200" height="833" fetchPriority="high" />
            <figcaption className="patch-label">{project.title} · Product interface <button type="button" onClick={()=>dialog.current.showModal()}>Inspect interface</button></figcaption>
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
    <dialog className="patch-media-dialog patch-home-inspector" ref={dialog} aria-label={`${project.title} interface`}>
      <form method="dialog"><button autoFocus>Close</button></form>
      <div tabIndex={0} data-detail="true" role="region" aria-label="Product screenshot, swipe or use arrow keys to pan"><img src={project.image} alt={project.imageAlt} loading="lazy" /></div>
    </dialog>
    <HomeSections project={project} />
  </main>;
}

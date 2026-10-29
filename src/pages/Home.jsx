import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowUpRight, ArrowDown, ArrowLeft, ArrowRight, Mic, Braces, Clapperboard, RotateCcw, Move3D, X, ChevronRight, Download, Box, Check, Github, Linkedin } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import SEO from '../components/SEO';
import GitHubCity from '../components/github/GitHubCity';
import AsciiSignal from '../components/site/AsciiSignal';
import FooterRiver from '../components/site/FooterRiver';
import ArchiveWorkbench from '../components/site/ArchiveWorkbench';
import ChapterNavigation from '../components/site/ChapterNavigation';
import ExperienceRecord from '../components/site/ExperienceRecord';
import useEditorialMotion from '../lib/useEditorialMotion';
import useBuildStory from '../lib/build-room/useBuildStory';
import { useTheme } from '../lib/useTheme';
import { featuredProjects, selectedProject, projectPath, RESUME, EMAIL } from '../lib/projects';
import data from '../data/portfolio.json';
import services from '../data/services.json';
import { getLatestBlogs } from '../lib/blogUtils';
import { postPath } from '../lib/content/urls';

const BuildRoomCanvas = lazy(() => import('../components/build-room/BuildRoomCanvas'));
const ICONS = [Mic, Braces, Clapperboard];
const A = '/assets/build-room/';
const PROBLEMS = [
  ['Less typing.', 'Speak into the apps you already use.', 'Voice → words'],
  ['Less repetition.', 'Keep API work in one local workbench.', 'Request → response'],
  ['Less rework.', 'Compose a scene. Record in two formats.', 'Scene → recording'],
];

function ScenePoster({ theme, className = '', contact = false, variant = 'room', projectSlug = 'fixo-flow' }) {
  return <picture className={className}><source media={variant === 'hero' ? '(max-width:1023px)' : '(max-width:767px)'} srcSet={`${A}posters/${contact ? 'contact' : variant === 'room' && projectSlug !== 'fixo-flow' ? `room-${projectSlug}` : variant}-${theme}-mobile.webp`}/><img src={`${A}posters/${contact ? 'contact' : variant}-${theme}-desktop.webp`} alt={contact ? 'An empty tray and a fresh brief on the Build Line' : 'A miniature workbench for software projects'} width="1600" height="1000" fetchPriority={contact ? 'auto' : 'high'} loading={contact ? 'lazy' : 'eager'}/></picture>;
}
export default function Home() {
  const pageRef = useRef(null); useEditorialMotion(pageRef); useBuildStory(pageRef);
  const [params] = useSearchParams(); const navigate = useNavigate(); const project = selectedProject(params.get('project'));
  const { theme } = useTheme(); const reduced = useReducedMotion();
  const [phase, setPhase] = useState('hero'), [inspection, setInspection] = useState(false), [explore, setExplore] = useState(false), [resetKey, setResetKey] = useState(0);
  const [viewport, setViewport] = useState(() => window.matchMedia('(min-width:1024px)').matches ? 'desktop' : window.matchMedia('(max-width:767px)').matches ? 'phone' : 'tablet');
  const desktop = viewport === 'desktop';
  useEffect(() => {
    const wide = window.matchMedia('(min-width:1024px)'), compact = window.matchMedia('(max-width:767px)');
    const change = () => setViewport(wide.matches ? 'desktop' : compact.matches ? 'phone' : 'tablet');
    wide.addEventListener('change', change); compact.addEventListener('change', change);
    return () => { wide.removeEventListener('change', change); compact.removeEventListener('change', change); };
  }, []);
  const [mobileSceneReady, setMobileSceneReady] = useState(false);
  useEffect(() => {
    const work = sections.current.work; if (!work) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setMobileSceneReady(true); observer.disconnect(); } }, {rootMargin:'350px'});
    observer.observe(work); return () => observer.disconnect();
  }, []);
  const [failed, setFailed] = useState(false); const [load3D, setLoad3D] = useState(() => !navigator.connection?.saveData); const sections = useRef({});
  const select = useCallback(slug => { navigate({ pathname: '/', search: `?project=${encodeURIComponent(slug)}`, hash: window.location.hash }, { replace: true, preventScrollReset: true }); setExplore(false); }, [navigate]);
  const failure = useCallback(() => { setFailed(true); setExplore(false); }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) { setPhase(entry.target.dataset.scene); if (entry.target.dataset.scene !== 'work') setExplore(false); }
    }, { rootMargin: '-25% 0px -45% 0px', threshold: 0 });
    Object.values(sections.current).forEach(el => { if (el) observer.observe(el); }); return () => observer.disconnect();
  }, []);
  useEffect(() => { const escape = e => { if (e.key === 'Escape') { setExplore(false); setResetKey(n => n + 1); } }; window.addEventListener('keydown', escape); return () => window.removeEventListener('keydown', escape); }, []);
  const register = key => el => { sections.current[key] = el; };
  const handleKeys = e => {
    const i = featuredProjects.findIndex(p => p.slug === project.slug); let n;
    if (e.key === 'ArrowRight') n = (i + 1) % featuredProjects.length; if (e.key === 'ArrowLeft') n = (i + featuredProjects.length - 1) % featuredProjects.length; if (e.key === 'Home') n = 0; if (e.key === 'End') n = featuredProjects.length - 1;
    if (n !== undefined) { e.preventDefault(); select(featuredProjects[n].slug); e.currentTarget.querySelectorAll('button')[n].focus(); }
  };
  const latest = getLatestBlogs(3);
  const projectIndex = featuredProjects.findIndex(p => p.id === project.id);
  const stepProject = direction => select(featuredProjects[(projectIndex + direction + featuredProjects.length) % featuredProjects.length].slug);
  return <main ref={pageRef} className="build-home" id="main-content">
    <SEO title="Abrar Akhunji — AI & Full-Stack Engineer in Ahmedabad" description="AI engineer, AI/ML engineer and full-stack engineer in Ahmedabad. Explore local AI tools, developer software, native products and the engineering behind each build." path="/" image={`${A}og-home.jpg`} />
    <ChapterNavigation/>
    <div className="story-stage">
      {desktop && <div className={`scene-sticky ${phase === 'work' ? 'is-work' : ''} ${phase === 'inspect' ? 'is-inspect' : ''}`}>
        <ScenePoster theme={theme} variant={phase === 'hero' || phase === 'brief' ? 'hero' : 'room'} className="scene-fallback" />
        {load3D && !failed && <Suspense fallback={null}><BuildRoomCanvas key={viewport} theme={theme} project={project.slug} phase={phase} inspection={inspection && phase === 'inspect'} explore={explore} resetKey={resetKey} reduced={Boolean(reduced)} onSelect={select} onFailure={failure}/></Suspense>}
      </div>}
      <section id="home" data-scene="hero" ref={register('hero')} className="room-section hero-section">
        <AsciiSignal variant="ambient"/>
        <div className="room-container hero-copy">
          <div className="hero-topline"><p className="availability"><span/> Open to engineering roles</p><span>Ahmedabad, India</span></div>
          <div className="hero-byline"><span className="hero-wave" aria-hidden="true">✳</span><p>Hey, I’m Abrar Akhunji.<br/><span>AI &amp; Full-Stack Engineer</span></p></div>
          <h1><span className="hero-title-first">Zero to</span><span className="hero-title-built">built<span className="period">.</span></span></h1>
          <div className="hero-identity"><p className="hero-description">I turn small, everyday frictions<br/>into software you can use.</p><div className="button-row"><a className="button-primary" href="#work">Explore my work <ArrowDown size={17}/></a><a className="text-link" href={RESUME} target="_blank" rel="noreferrer">Resume <ArrowUpRight size={15}/></a></div></div>
          <div className="bench-stamp" aria-hidden="true"><svg viewBox="0 0 120 65"><path d="M8 10 C72 -3 100 7 94 45 M82 35 L94 48 L106 34"/></svg><span>A little workshop<br/>for useful software.</span></div>
          <div className="hero-object-key" aria-hidden="true"><span>Voice</span><i/><span>Connections</span><i/><span>Capture</span></div>
        </div>
        {!desktop && <ScenePoster theme={theme} variant="hero" className="mobile-hero-art"/>}
        <div className="hero-footnote"><span>Ideas in. Useful things out.</span><a href="#brief">Pull up a chair <ArrowDown size={14}/></a></div>
      </section>
      <section id="brief" data-scene="brief" ref={register('brief')} className="room-section brief-section"><div className="room-container"><div className="brief-title" aria-hidden="true"><span>WHAT IF</span><span>IT WAS</span><span>EASIER?</span></div><div className="problem-sheet"><div className="paper-clip" aria-hidden="true"/><p className="hand-note">Start with the friction.</p><h2>Three problems.<br/>A place to start.</h2><p className="section-intro">The tools on this bench each began with something that could work better.</p>{featuredProjects.map((p,i) => { const Icon=ICONS[i]; return <a key={p.id} href="#work" className="problem-row" onClick={() => select(p.slug)}><span className={`project-mark mark-${i}`}><Icon size={22}/></span><span><strong>{PROBLEMS[i][0]}</strong><small>{PROBLEMS[i][1]}</small><em>{p.title}</em></span><ChevronRight size={18}/></a>; })}<p className="brief-postscript">A model is a start.<br/>The useful part is what you build around it.</p><svg className="brief-line" viewBox="0 0 400 40" aria-hidden="true"><path d="M5 28 Q90 -5 160 23 T320 17 L385 17 m-10 -8 10 8 -10 8"/></svg></div></div></section>
      <section id="work" data-scene="work" ref={register('work')} className="room-section work-section"><div className="work-backdrop" aria-hidden="true">Made useful.</div><div className="room-container work-content"><div className="section-heading work-heading"><div><p className="section-kicker">The workbench</p><h2>Meet the builds.</h2></div><Link className="text-link" to="/work/">Every project <ArrowUpRight size={16}/></Link></div>
        <div className="project-selector" role="group" aria-label="Select a featured project" onKeyDown={handleKeys}>{featuredProjects.map((p,i)=>{const Icon=ICONS[i];return <button key={p.id} aria-pressed={project.id===p.id} aria-controls="selected-product" onClick={()=>select(p.slug)}><span className="station-number">0{i+1}</span><Icon size={17}/>{p.title}<span className="selector-light"/></button>;})}</div>
        {!desktop && <div className="mobile-scene"><ScenePoster theme={theme} projectSlug={project.slug} className="scene-fallback"/>{load3D&&mobileSceneReady&&!failed&&<Suspense fallback={null}><BuildRoomCanvas key={viewport} theme={theme} project={project.slug} phase="work" inspection={false} explore={explore} resetKey={resetKey} reduced={Boolean(reduced)} onSelect={select} onFailure={failure}/></Suspense>}</div>}<div className="mobile-live-space" aria-hidden="true"/>
        <div className="scene-controls">{load3D && !failed ? <><button onClick={()=>setExplore(!explore)} aria-pressed={explore}><Move3D size={16}/>{explore?'Exit Explore':'Explore in 3D'}</button>{explore&&<><button onClick={()=>{setExplore(false);setResetKey(n=>n+1);}}><RotateCcw size={15}/>Reset view</button><button aria-label="Exit Explore" onClick={()=>setExplore(false)}><X size={16}/></button></>}</> : <><span>{failed?'A still view of the workbench.':'A lighter view of the workbench.'}</span>{!failed&&<button onClick={()=>setLoad3D(true)}>Load interactive 3D</button>}</>}{explore&&<small>Drag to look around. Escape to return.</small>}</div>
        <div className="project-traverse"><button aria-label="Previous project" onClick={() => stepProject(-1)}><ArrowLeft size={18}/></button><p><strong>{PROBLEMS[projectIndex][2]}</strong><span>{projectIndex+1} of {featuredProjects.length}</span></p><button aria-label="Next project" onClick={() => stepProject(1)}><ArrowRight size={18}/></button></div><div id="selected-product" className="product-summary" aria-label={`${project.title} overview`} aria-live="polite"><Link className="selected-preview" data-cursor="Open" to={projectPath(project.slug)} aria-label={`See ${project.title} in detail`}><img src={project.image} alt={project.imageAlt} loading="lazy" width="300" height="190"/></Link><div className="product-copy"><p className="project-category">{project.category} <span className="status-label">{project.status}</span></p><h3>{project.title}</h3><p>{project.summary}</p></div><div className="button-row"><Link className="button-primary" to={projectPath(project.slug)}>Read the build <ArrowUpRight size={16}/></Link>{project.demo&&<a className="button-secondary" href={project.demo} target="_blank" rel="noreferrer">View project <ArrowUpRight size={16}/></a>}</div></div>
        <div className="workflow-strip" aria-label="Engineering process"><span>Find the friction</span><ChevronRight/><span>Make it work</span><ChevronRight/><span>Make it usable</span></div><Link to="/work/cattle-breed/" className="vision-shortcut">Also on the bench: applied computer vision <ArrowUpRight size={14}/></Link>
      </div></section>
      <section id="engineering" data-scene="inspect" ref={register('inspect')} className="room-section inspection-section"><div className="room-container"><div className="inspection-copy"><p className="section-kicker">Inside {project.title}</p><h2>The screen is<br/>only the start.</h2><p className="section-intro">Open the build to follow the pieces behind {project.title}.</p><button className="button-secondary" aria-expanded={inspection} aria-controls="engineering-layers" onClick={()=>setInspection(!inspection)}><Box size={16}/>{inspection?'Close the cutaway':'Inside the build'}</button><div id="engineering-layers" className={`engineering-layers ${inspection?'is-open':''}`} hidden={!inspection}>{project.layers.map((layer,i)=><div key={layer.title}><span>{String(i+1).padStart(2,'0')}</span><div><h3>{layer.title}</h3><p>{layer.detail}</p></div></div>)}</div><Link className="text-link" to={projectPath(project.slug)}>Decisions, tradeoffs &amp; source <ArrowUpRight size={16}/></Link></div><aside className="build-receipt"><p className="receipt-title">Build &amp; ship</p>{project.evidence.map(item=><div key={item.label}><Check size={15}/><div>{item.url?<a href={item.url} target="_blank" rel="noreferrer">{item.label} <ArrowUpRight size={12}/></a>:<strong>{item.label}</strong>}<p>{item.detail}</p></div></div>)}<span className="receipt-end">Current status: {project.status}</span></aside></div></section>
    </div>
    <section id="about-me" className="builder-section room-container"><div className="builder-top"><div><p className="section-kicker">Away from the interface</p><h2>Engineer.<br/>Builder.<br/>Still curious.</h2><p className="builder-intro">I’m Abrar Akhunji, an engineer in Ahmedabad. I build across models, interfaces and the systems that connect them.</p><p className="muted">I like turning a technical idea into something someone can actually use. Off the bench: writing rap, cooking with friends, and finding the next problem worth solving.</p><div id="practice" className="capability-list">{[['AI/ML Engineer','Local inference, computer vision and model-powered applications.','/work/cattle-breed/'],['Full-Stack Engineer','Interfaces, APIs and the systems that connect them.','/work/packetlark/'],['Delivery','Tests, packaging and deployment are part of the build.','/work/fixo-flow/']].map(([title,text,url])=><Link key={title} to={url}><h3>{title}<ArrowUpRight size={17}/></h3><p>{text}</p></Link>)}</div></div><figure className="portrait"><span className="portrait-note hand-note">The human in the loop.</span><img src={`${A}portrait.webp`} alt="Abrar Akhunji" width="720" height="900" loading="lazy"/><figcaption><span>Abrar Akhunji</span><span>Ahmedabad, India</span></figcaption></figure></div>
      <div className="workshop-toolkit"><p>Tools I reach for</p><div>{["Python", "Django", "React", "OpenCV", "Redis", "Docker", "Git"].map(tool=><span key={tool}>{tool}</span>)}</div></div><div id="experience" className="record-grid"><ExperienceRecord jobs={data.experience}/><div><p className="section-kicker">Education &amp; recognition</p>{data.education.map(edu=><article key={edu.degree}><span>{edu.date}</span><h3>{edu.degree}</h3><p>{edu.school}</p></article>)}<details className="certifications"><summary>Certificates &amp; recognition</summary>{data.certifications.map(c=><p key={c.title}>{c.driveLink?<a href={c.driveLink} target="_blank" rel="noreferrer">{c.title} <ArrowUpRight size={12}/></a>:c.title}<small>{c.desc}</small></p>)}</details></div></div>
    </section>
    <ArchiveWorkbench/>
    <section id="writing" className="writing-section room-container"><div className="section-heading"><div><p className="section-kicker">The Neural Log</p><h2>Thinking out loud.</h2></div><Link className="text-link" to="/blog/">All field notes <ArrowUpRight size={16}/></Link></div><div className="field-notes">{latest.map(post=><Link key={post.slug} data-cursor="Read" to={postPath(post.slug)}><span>{post.date}</span><h3>{post.title}<ArrowUpRight size={18}/></h3><p>{post.description}</p></Link>)}</div></section>
    <section id="services" className="services-band room-container"><div><p className="section-kicker">A place on your team</p><h2>AI, product, and the parts between.</h2><p>{services.availability}</p></div><Link className="button-secondary" to="/hire/">Work with me <ArrowUpRight size={16}/></Link></section>
    <section id="activity" className="contribution-chapter room-container"><div className="contribution-intro"><div><p className="section-kicker">The days behind the builds</p><h2>Small steps.<br/><span className="ink-highlight" data-highlight>A city of work.</span></h2></div><p>One building for every day on GitHub. An honest record of making, learning, and coming back to it.</p></div><GitHubCity/></section><section id="contact" className="contact-section"><div className="room-container contact-layout"><div className="contact-copy"><p className="hand-note">There’s room for one more idea.</p><h2>Got a good<br/>“what if”?</h2><p>A role on your team. A tool worth making.<br/>A problem you keep coming back to.<br/>Let’s start there.</p><a className="contact-email" href={`mailto:${EMAIL}`}>{EMAIL}<ArrowUpRight size={23}/></a><div className="button-row"><a className="text-link" href={RESUME} target="_blank" rel="noreferrer"><Download size={15}/>View resume</a><a className="icon-link" aria-label="GitHub" href="https://github.com/abrar225" target="_blank" rel="noreferrer"><Github size={19}/></a><a className="icon-link" aria-label="LinkedIn" href="https://www.linkedin.com/in/abrar-akhunji/" target="_blank" rel="noreferrer"><Linkedin size={19}/></a></div></div><FooterRiver/></div></section>
  </main>;
}

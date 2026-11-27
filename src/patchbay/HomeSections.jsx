import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { featuredProjects, projectPath } from '../lib/projects';
import { getAllBlogs } from '../lib/blogUtils';
import { postPath } from '../lib/content/urls';
import portfolio from '../data/portfolio.json';
import activity from '../data/github-contributions.json';

const Assembly = lazy(() => import('./Assembly'));
const notes = getAllBlogs().slice(0,3);

function Engineering({ project }) {
  const room = useRef(null);
  const [active,setActive] = useState(0);
  const [near,setNear]=useState(false);
  const reduced=useReducedMotion();

  useEffect(()=>{
    const desktop = matchMedia('(min-width: 751px) and (pointer: fine) and (hover: hover)');
    const watch = new IntersectionObserver(([entry]) => {
      setNear(entry.isIntersecting && desktop.matches);
    }, { rootMargin: '250px' });
    function update() {
      watch.disconnect();
      if (desktop.matches) watch.observe(room.current);
      else setNear(false);
    }
    desktop.addEventListener('change', update);
    update();
    return () => {
      watch.disconnect();
      desktop.removeEventListener('change', update);
    };
  },[]);

  return <section id="engineering" className="patch-engineering" ref={room} aria-labelledby="engineering-title">
    <div className="patch-liquid-edge" aria-hidden="true"><span/><span/><span/></div>
    <div className="patch-wide">
      <header className="patch-engineering-head"><div><p className="patch-label">{project.title}</p><h2 id="engineering-title">Under the interface.</h2></div><p>Follow one part of the system at a time.</p></header>
      <div className="patch-bento">
        {project.layers.slice(0,3).map((layer,index)=><motion.article key={layer.title} layout={!reduced} transition={{layout:{type:'spring',stiffness:230,damping:27}}}
          data-chosen={index===active} className="patch-layer">
          <button aria-expanded={index===active} onClick={()=>setActive(index)}><span>{layer.title}</span><span aria-hidden="true">{index===active?'−':'+'}</span></button>
          {index===active && <p>{layer.detail}</p>}
        </motion.article>)}
        <figure className="patch-assembly-plate">
          <div className="patch-assembly-fallback" aria-hidden="true"><i/><i/><i/></div>
          {near && !reduced && <Suspense fallback={null}><Assembly active={active} /></Suspense>}
          <figcaption className="patch-label">{project.layers[active].title} / Architecture layer</figcaption>
        </figure>
      </div>
      <div className="patch-actions"><Link to={projectPath(project.slug)+'#architecture'}>See the complete architecture <ArrowUpRight size={16} aria-hidden="true"/></Link></div>
    </div>
  </section>;
}

export default function HomeSections({ project }) {
  const { role, date }=portfolio.experience[0];
  return <>
    <section className="patch-home-collection patch-wide" aria-labelledby="collection-title">
      <header><h2 id="collection-title">Other builds.</h2><Link to="/work/">Browse all projects <ArrowUpRight size={17} aria-hidden="true"/></Link></header>
      <ul>{featuredProjects.filter(entry=>entry.slug!==project.slug).map(entry=><li key={entry.slug}><Link to={projectPath(entry.slug)}><strong>{entry.title}</strong><span>{entry.summary}</span><ArrowUpRight size={18} aria-hidden="true"/></Link></li>)}</ul>
    </section>
    <Engineering key={project.slug} project={project} />
    <section id="writing" className="patch-home-writing">
      <div className="patch-wide"><header><h2>The Neural Log.</h2><Link to="/blog/">All writing <ArrowUpRight size={16} aria-hidden="true"/></Link></header>
        <ol>{notes.map(note=><li key={note.slug}><Link to={postPath(note.slug)}><time dateTime={note.date}>{note.date}</time><h3>{note.title}</h3><span>{note.readingTime} min</span></Link></li>)}</ol>
      </div>
    </section>
    <section id="about-me" className="patch-home-background">
      <div className="patch-wide">
        <header><h2>From model<br/>to interface.</h2><p>I’m drawn to the work between a model that runs and a product someone can use. That means making choices about latency, recovery paths, packaging, and the interface people actually touch.</p><Link to="/about/">Background &amp; experience <ArrowUpRight size={16} aria-hidden="true"/></Link></header>
        <div id="experience" className="patch-pink-note"><blockquote>I care about how it feels to use.</blockquote><div><span className="patch-label">Recent experience</span><p>{role}</p><p>{date}</p></div></div>
        <p id="activity" className="patch-activity"><a href={activity.profileUrl}>GitHub activity</a> · {activity.totalContributions.toLocaleString('en')} contributions, {activity.days[0].date} to {activity.days.at(-1).date}</p>
      </div>
    </section>
  </>;
}

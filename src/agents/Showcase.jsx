import { useEffect, useState } from 'react';
import data from '../data/portfolio.json';
import { RESUME } from '../lib/projects';
import { useTheme } from '../lib/useTheme';
import styles from './showcase.module.css';

const projects = data.projects.filter(project=>project.featured);

export default function Showcase() {
  const { toggleTheme } = useTheme();
  const [index,setIndex] = useState(projects.length);
  const [playing,setPlaying] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(location.search).has('play') && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      requestAnimationFrame(() => { setIndex(0); setPlaying(true); });
    }
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => {
      const next = Math.min(projects.length,index+1);
      setIndex(next);
      if (next===projects.length) setPlaying(false);
    },850);
    return () => clearTimeout(timer);
  }, [playing,index]);

  function rebuild() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setIndex(projects.length); return; }
    setIndex(0);
    setPlaying(true);
  }

  return <div className={`patch-shell ${styles.page}`} data-portfolio-version="v5">
    <header className={styles.header}><div className="patch-wide">
      <a href="/">Abrar Akhunji</a><nav aria-label="Portfolio"><a href="/work/">Work</a><a href="/blog/">Writing</a><a href={RESUME}>Résumé</a><a href="/contact/">Contact</a></nav>
      <button onClick={toggleTheme}>Change theme</button>
    </div></header>
    <main>
      <section className={styles.lead}><div className="patch-wide">
        <p className="patch-label">Abrar Akhunji / AI &amp; full-stack engineer</p>
        <h1>Agents at Work.</h1>
        <p>I turn models, interfaces and systems into useful software. Here’s a little of that work, assembled in front of you.</p>
        <a href="#projects">Meet the builds ↓</a>
      </div></section>
      <section id="projects" className={`patch-wide ${styles.projects}`}>
        <header><h2>From friction to something useful.</h2><div className={styles.controls}>
          <button type="button" onClick={rebuild}>Rebuild</button>
          {index<projects.length && <button type="button" onClick={()=>setPlaying(!playing)}>{playing?'Pause':'Resume'}</button>}
          <button type="button" onClick={()=>{setPlaying(false);setIndex(projects.length);}}>Skip</button>
          <span role="status">{index===projects.length?'Projects ready':`${index} of ${projects.length} projects ready`}</span>
        </div></header>
        <ol>
          {projects.map((project,i)=><li key={project.slug} data-ready={i<index}>
            <img src={project.image} alt={project.imageAlt} width="800" height="525" />
            <div><p className="patch-label">{project.category} · {project.status}</p><h3>{project.title}</h3><p>{project.summary}</p><a href={`/work/${project.slug}/`}>Read the build ↗</a></div>
          </li>)}
        </ol>
      </section>
      <section className={styles.practice}><div className="patch-wide"><h2>The screen is only the start.</h2><dl>
        <div><dt>Models that belong in products</dt><dd>Local inference, computer vision and the application around the model.</dd></div>
        <div><dt>Interfaces with a purpose</dt><dd>Native tools, API workflows and software that makes the next step clear.</dd></div>
        <div><dt>The work of shipping</dt><dd>Tests, packaging, resource lifetimes and honest limits are part of the build.</dd></div>
      </dl></div></section>
    </main>
    <footer className={styles.footer}><div className="patch-wide"><h2>What should we build next?</h2><a href="mailto:abrar@abrarakhunji.com">abrar@abrarakhunji.com</a><p>Made by Abrar. Inspired by <a href="https://www.avivashishta.com/blog/agents-at-work-a-page-that-builds-itself">Agents at Work</a>.</p></div></footer>
  </div>;
}

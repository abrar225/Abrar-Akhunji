import { useEffect, useRef } from 'react';
import data from '../data/portfolio.json';
import { useTheme } from '../lib/useTheme';
import { startShowcase } from './controller';
import styles from './showcase.module.css';

function Block({ children, code, agent, type = false, heading: Heading = 'h2', className = '' }) {
  return <div data-block="" data-code={code} data-agent={agent} className={`${styles.block} ${className}`}><div className={styles.fill}>{type ? <Heading data-type="">{children}</Heading> : children}</div></div>;
}
export default function Showcase() {
  const root = useRef(null);
  const { toggleTheme } = useTheme();
  useEffect(() => startShowcase(root.current), []);
  return <div ref={root} className={styles.page}>
    <header className={styles.nav}><a href="/">ABRAR.</a><span>A small experiment in building.</span><button onClick={toggleTheme}>Change theme</button></header>
    <main>
      <section data-section="" className={styles.hero}>
        <Block code={'<Introduction name="Abrar" />'}><p className={styles.eyebrow}>Abrar Akhunji · AI & Full-Stack Engineer</p></Block>
        <Block code={'<Headline />'} agent="Copy" type heading="h1">Good ideas deserve to be built.</Block>
        <Block code={'<Introduction />'}><p className={styles.lead}>I turn models, interfaces and systems into useful software. Here’s a little of that work, assembled in front of you.</p><p className={styles.note}>A choreographed cursor experiment. Real projects, human decisions.</p></Block>
        <Block code={'<ProjectIndex />'}><a href="#projects">Meet the builds ↓</a><span className={styles.divider}> / </span><a href="/">Explore my full portfolio ↗</a></Block>
      </section>
      <section data-section="" id="projects">
        <Block code={'<SectionHeading />'} agent="Type" type>From friction to something useful.</Block>
        <div className={styles.projects}>{data.projects.filter(p => p.featured).map(p => <Block key={p.slug} code={`<Project slug="${p.slug}" />`} agent="Builder"><article className={styles.card}><img src={p.image} alt={p.imageAlt} width="800" height="500"/><div><p className={styles.eyebrow}>{p.category} · {p.status}</p><h3>{p.title}</h3><p>{p.summary}</p><a href={`/work/${p.slug}/`}>Read the build ↗</a></div></article></Block>)}</div>
      </section>
      <section data-section="" className={styles.engineering}>
        <Block code={'<EngineeringHeading />'} type>The screen is only the start.</Block>
        <div className={styles.columns}>{[['Models that belong in products','Local inference, computer vision and the application around the model.','AI'],['Interfaces with a purpose','Native tools, API workflows and software that makes the next step clear.','Layout'],['The work of shipping','Tests, packaging, resource lifetimes and honest limits are part of the build.','Ship']].map(([title,copy,agent]) => <Block key={agent} agent={agent} code={`<Practice name="${agent}" />`}><h3>{title}</h3><p>{copy}</p></Block>)}</div>
      </section>
      <section data-section="" className={styles.contact}>
        <Block code={'<ContactHeading />'} agent="Copy" type>What should we build next?</Block>
        <Block code={'<Contact />'}><p>A role on your team. A useful tool. A problem worth solving.</p><a className={styles.email} href="mailto:abrar@abrarakhunji.com">abrar@abrarakhunji.com ↗</a><p><a href="/">Back to the portfolio</a> · <a href="https://github.com/abrar225">GitHub</a></p></Block>
      </section>
    </main>
    <aside className={styles.console} aria-label="Build controls"><div><strong data-progress="">Ready to build</strong><button data-skip="">Skip</button><button data-rebuild="">Rebuild</button></div><div data-log="" className={styles.log} aria-hidden="true"/><span className={styles.sr} role="status" data-status=""/></aside>
    <div data-cursors="" className={styles.cursors} aria-hidden="true"/>
    <footer>Made by Abrar. Inspired by <a href="https://www.avivashishta.com/blog/agents-at-work-a-page-that-builds-itself">Agents at Work</a>.</footer>
  </div>;
}

import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import SEO from '../components/SEO';
import { Masthead, SignalLink } from '../components/v5/Primitives';
import NotFound from './NotFound';
import { findProject, projects, projectPath } from '../lib/projects';

const topics = [
  ['problem', 'Problem'],
  ['contribution', 'My contribution'],
  ['architecture', 'Architecture'],
  ['decisions', 'Decisions'],
  ['delivery', 'Evidence'],
  ['limitations', 'Limitations'],
];

export default function CaseStudy() {
  const { slug } = useParams();
  const project = findProject(slug);
  if (!project) return <NotFound />;

  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const url = `https://abrarakhunji.com${projectPath(slug)}`;
  const schema = [{
    '@context': 'https://schema.org', '@type': 'CreativeWork', name: project.title,
    description: project.summary, url, creator: { '@id': 'https://abrarakhunji.com/#person' },
  }, {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://abrarakhunji.com/' },
      { '@type': 'ListItem', position: 2, name: 'Work', item: 'https://abrarakhunji.com/work/' },
      { '@type': 'ListItem', position: 3, name: project.title, item: url },
    ],
  }];

  return (
    <main className="signal-case">
      <SEO title={`${project.title} — The build | Abrar Akhunji`} description={project.summary} path={projectPath(slug)} image={`/assets/build-room/og-${slug}.jpg`} schema={schema} />
      <Masthead label={`${project.category} / ${project.status}`} title={<>{project.title}<span>.</span></>} description={project.summary}>
        {project.demo && <SignalLink href={project.demo}>{slug === 'packetlark' ? 'Product website' : 'View project'}</SignalLink>}
        {project.github && <SignalLink href={project.github} outline>Source on GitHub</SignalLink>}
        {project.release && <SignalLink href={project.release} outline>Release packages</SignalLink>}
      </Masthead>
      <div className="signal-wrap">
        <Link className="signal-inline signal-case-back" to="/work/"><ArrowLeft size={16} /> Project index</Link>
        <figure className="signal-case-visual">
          <div><img src={project.image} alt={project.imageAlt} width="1200" height="750" fetchPriority="high" /></div>
          <figcaption className="signal-label">Project preview / {project.status}{slug === 'packetlark' ? ' · The Node workbench runs locally' : ''}</figcaption>
        </figure>
        <div className="signal-case-layout">
          <aside className="signal-case-index">
            <p className="signal-label">Inside this build</p>
            <nav aria-label="Case study contents">{topics.map(([id, name]) => <a href={`#${id}`} key={id}>{name}</a>)}</nav>
            <ul className="signal-tags" aria-label="Technologies">{project.tech.map((tech) => <li key={tech}>{tech}</li>)}</ul>
          </aside>
          <div className="signal-case-body">
            <section id="problem"><h2>The problem</h2><p>{project.problem}</p></section>
            <section id="contribution"><h2>My contribution</h2><p>{project.contribution}</p></section>
            {project.media && <section>
              <h2>See the workflow</h2>
              <video controls preload="none" poster={project.image} aria-label={`${project.title} interface tour`}>
                <source src={project.media.webm} type="video/webm" /><source src={project.media.mp4} type="video/mp4" />
                <track kind="captions" src={project.media.captions} srcLang="en" label="English" default />
              </video>
              <p>Interface tour assembled from actual screenshots.</p>
            </section>}
            <section id="architecture">
              <h2>How the parts connect</h2>
              <ol className="signal-case-layers">{project.layers.map((layer, index) =>
                <li key={layer.title}><span className="signal-label">{String(index + 1).padStart(2, '0')}</span><div><h3>{layer.title}</h3><p>{layer.detail}</p></div></li>
              )}</ol>
            </section>
            <section id="decisions"><h2>The decisions</h2>{project.decisions.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.detail}</p></article>)}</section>
            <section id="delivery">
              <h2>Build evidence</h2>
              {project.evidence.map((item) => <article key={item.label}>
                <h3>{item.url ? <a href={item.url} target="_blank" rel="noreferrer">{item.label} <ArrowUpRight size={17} /></a> : item.label}</h3><p>{item.detail}</p>
              </article>)}
            </section>
            <section id="limitations"><h2>Current limitations</h2><ul>{project.limitations.map((item) => <li key={item}>{item}</li>)}</ul></section>
            <Link className="signal-next-case" to={projectPath(next.slug)}><span className="signal-label">Next project</span><strong>{next.title}</strong><ArrowUpRight aria-hidden="true" /></Link>
          </div>
        </div>
      </div>
    </main>
  );
}

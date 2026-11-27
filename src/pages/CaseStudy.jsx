import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import SEO from '../components/SEO';
import { PageLead, Action } from '../patchbay/Interior';
import NotFound from './NotFound';
import { MediaProof } from '../patchbay/Interior';
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
    <main className="patch-case">
      <SEO title={`${project.title} — The build | Abrar Akhunji`} description={project.summary} path={projectPath(slug)} image={`/assets/build-room/og-${slug}.jpg`} schema={schema} />
      <PageLead label={`${project.category} / ${project.status}`} title={<>{project.title}<span>.</span></>} description={project.summary}>
        {project.demo && <Action href={project.demo}>{slug === 'packetlark' ? 'Product website' : 'View project'}</Action>}
        {project.github && <Action href={project.github}>Source on GitHub</Action>}
        {project.release && <Action href={project.release}>Release packages</Action>}
      </PageLead>
      <div className="patch-wide">
        <Link className="patch-inline patch-case-back" to="/work/"><ArrowLeft size={16} /> Project index</Link>
        <MediaProof project={project} />
        <div className="patch-case-layout">
          <aside className="patch-case-index">
            <p className="patch-label">Inside this build</p>
            <nav aria-label="Case study contents">{topics.map(([id, name]) => <a href={`#${id}`} key={id}>{name}</a>)}</nav>
            <ul className="patch-tags" aria-label="Technologies">{project.tech.map((tech) => <li key={tech}>{tech}</li>)}</ul>
          </aside>
          <div className="patch-case-body">
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
              <ol className="patch-case-layers">{project.layers.map((layer, index) =>
                <li key={layer.title}><span className="patch-label">{String(index + 1).padStart(2, '0')}</span><div><h3>{layer.title}</h3><p>{layer.detail}</p></div></li>
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
            <Link className="patch-next-case" to={projectPath(next.slug)}><span className="patch-label">Next project</span><strong>{next.title}</strong><ArrowUpRight aria-hidden="true" /></Link>
          </div>
        </div>
      </div>
    </main>
  );
}

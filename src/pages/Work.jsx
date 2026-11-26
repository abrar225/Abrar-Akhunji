import { useSearchParams, Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SEO from '../components/SEO';
import { Masthead } from '../components/v5/Primitives';
import { projects, projectPath } from '../lib/projects';

const categories = ['All', 'Featured', ...new Set(projects.map((project) => project.category))];

export default function Work() {
  const [params, setParams] = useSearchParams();
  const filter = categories.find((category) => category === params.get('category')) || 'All';
  const visible = projects.filter((project) => filter === 'All' || (filter === 'Featured' ? project.featured : project.category === filter));

  return (
    <main className="signal-work-page">
      <SEO title="Selected work — Abrar Akhunji" description="Explore local AI projects, developer tools, native apps, and web systems by Abrar Akhunji." path="/work/" />
      <Masthead label="Project index" title={<>A body of work<span>.</span></>} description="Local AI, developer tools, native software, and the web. Explore the projects, then get into the decisions behind each build." />
      <section className="signal-wrap signal-work-index" aria-label="Projects">
        <div className="signal-filters" role="group" aria-label="Filter projects">
          {categories.map((category) => (
            <button key={category} aria-pressed={filter === category} type="button" onClick={() => {
              const next = new URLSearchParams(params);
              if (category === 'All') next.delete('category');
              else next.set('category', category);
              setParams(next, { replace: true, preventScrollReset: true });
            }}>{category}</button>
          ))}
        </div>
        <p className="signal-label signal-results" role="status">{visible.length} {visible.length === 1 ? 'project' : 'projects'}</p>
        <div className="signal-work-grid">
          {visible.map((project, index) => (
            <article className="signal-work-card" key={project.slug}>
              <Link to={projectPath(project.slug)}>
                <div className="signal-work-image"><img src={project.image} alt={project.imageAlt} width="900" height="600" loading={index < 2 ? 'eager' : 'lazy'} /></div>
                <div className="signal-work-card-body"><p className="signal-label">{project.category} / {project.status}</p><h2>{project.title} <ArrowUpRight aria-hidden="true" /></h2><p>{project.summary}</p></div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

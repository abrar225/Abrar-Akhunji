import { useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO';
import { Masthead } from '../components/v5/Primitives';
import { projects } from '../lib/projects';
import { ProjectFrame, WorkGallery } from '../components/v5/WorkGallery';

const categories = ['All', 'Featured', ...new Set(projects.map((project) => project.category))];

export default function Work() {
  const [params, setParams] = useSearchParams();
  const filter = categories.find((category) => category === params.get('category')) || 'All';
  const visible = projects.filter((project) => filter === 'All' || (filter === 'Featured' ? project.featured : project.category === filter));

  const featured = visible.filter(project => project.featured);
  const gallery = featured.length > 1 ? featured : [];
  const list = gallery.length ? visible.filter(project => !project.featured) : visible;

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
        {gallery.length > 0 && <WorkGallery key={filter} items={gallery} />}
        {list.length > 0 && <div className="signal-work-grid">
          {gallery.length > 0 && <p className="signal-label">Project archive</p>}
          {list.map((project) => <ProjectFrame key={project.slug} project={project} />)}
        </div>}
      </section>
    </main>
  );
}

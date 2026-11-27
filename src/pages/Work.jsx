import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SEO from '../components/SEO';
import { projects, projectPath } from '../lib/projects';

const categories = ['All', 'Featured', ...new Set(projects.map(project => project.category))];

export default function Work() {
  const [params, setParams] = useSearchParams();
  const [preview, setPreview] = useState(null);
  const filter = categories.find(category => category === params.get('category')) || 'All';
  const visible = projects.filter(project => filter === 'All' || (filter === 'Featured' ? project.featured : project.category === filter));
  const featured = visible.find(project => project.slug === preview) || visible[0];

  function change(category) {
    const next = new URLSearchParams(params);
    if (category === 'All') next.delete('category');
    else next.set('category',category);
    setParams(next,{replace:true,preventScrollReset:true});
  }

  return <main className="patch-work-page">
    <SEO title="Selected work — Abrar Akhunji" description="Explore local AI projects, developer tools, native apps, and web systems by Abrar Akhunji." path="/work/" />
    <header className="patch-wide patch-work-lead"><h1>Work.</h1><p>Local AI, developer tools, native software, and the web.</p></header>
    <div className="patch-wide patch-work-index">
      <div className="patch-filters" aria-label="Filter projects" role="group">
        {categories.map(category=><button key={category} type="button" aria-pressed={filter===category} onClick={()=>change(category)}>{category}</button>)}
      </div>
      <p className="patch-label" role="status">{visible.length} {visible.length===1?'project':'projects'}</p>
      <div className="patch-work-desk">
        <ul className="patch-work-list">
          {visible.map(project=><li key={project.slug}>
            <Link to={projectPath(project.slug)} onFocus={()=>setPreview(project.slug)} onPointerEnter={event=>{if(event.pointerType==='mouse')setPreview(project.slug);}}>
              <small>{project.category} / {project.status}</small><strong>{project.title}</strong><p>{project.summary}</p><ArrowUpRight size={19} aria-hidden="true" />
            </Link>
          </li>)}
        </ul>
        <figure className="patch-work-preview" key={featured.slug}><img src={featured.image} alt={featured.imageAlt} width="900" height="600" /><figcaption className="patch-label">{featured.title}</figcaption></figure>
      </div>
    </div>
  </main>;
}

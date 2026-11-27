import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import SEO from '../components/SEO';
import { projects, projectPath } from '../lib/projects';

const categories = ['All', 'Featured', ...new Set(projects.map(project => project.category))];

export default function Work() {
  const [params, setParams] = useSearchParams();
  const [scrollPreview, setScrollPreview] = useState(null);
  const [hoverPreview, setHoverPreview] = useState(null);
  const [focusPreview, setFocusPreview] = useState(null);
  const list = useRef(null);
  const reduce = useReducedMotion();
  const filter = categories.find(category => category === params.get('category')) || 'All';
  const visible = projects.filter(project => filter === 'All' || (filter === 'Featured' ? project.featured : project.category === filter));
  const featured = visible.find(project => project.slug === (focusPreview || hoverPreview || scrollPreview)) || visible[0];

  useEffect(() => {
    const rows = [...list.current.children];
    let frame = 0;
    function update() {
      frame = 0;
      const line = window.innerHeight * .48;
      let active = rows[0];
      for (const row of rows) {
        if (row.getBoundingClientRect().top > line) break;
        active = row;
      }
      setScrollPreview(active?.dataset.project || null);
    }
    function schedule(event) {
      if (event.type === 'scroll') setHoverPreview(null);
      if (!frame) frame = requestAnimationFrame(update);
    }
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [filter]);

  function change(category) {
    setHoverPreview(null);
    setFocusPreview(null);
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
        <ul className="patch-work-list" ref={list}>
          {visible.map(project=><li key={project.slug} data-project={project.slug} data-preview={featured.slug === project.slug}>
            <Link to={projectPath(project.slug)}
              onFocus={event=>{if(event.currentTarget.matches(':focus-visible'))setFocusPreview(project.slug);}}
              onBlur={()=>setFocusPreview(null)}
              onPointerMove={event=>{if(event.pointerType==='mouse')setHoverPreview(project.slug);}}
              onPointerLeave={()=>setHoverPreview(null)}>
              <small>{project.category} / {project.status}</small><strong>{project.title}</strong><p>{project.summary}</p><ArrowUpRight size={19} aria-hidden="true" />
              <img className="patch-work-inline" src={project.image} alt={project.imageAlt} width="900" height="600" loading="lazy" />
            </Link>
          </li>)}
        </ul>
        <figure className="patch-work-preview">
          <div className="patch-preview-frame">
            <AnimatePresence initial={false}>
              <motion.img key={featured.slug} src={featured.image} alt={featured.imageAlt} width="900" height="600"
                initial={reduce ? false : { opacity: 0, y: 18, scale: 1.04 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : .28, ease: [.2,.75,.25,1] }} />
            </AnimatePresence>
          </div>
          <figcaption className="patch-label"><span>{featured.title}</span><span>{String(visible.indexOf(featured) + 1).padStart(2, '0')} / {String(visible.length).padStart(2, '0')}</span></figcaption>
        </figure>
      </div>
    </div>
  </main>;
}

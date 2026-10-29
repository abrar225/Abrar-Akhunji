import { useRef } from 'react';
import useEditorialMotion from '../lib/useEditorialMotion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SEO from '../components/SEO';
import { projects, projectPath } from '../lib/projects';

export default function Work() {
  const page = useRef(null);
  useEditorialMotion(page);
  return <main ref={page} id="main-content" className="work-archive page-container"><SEO title="Engineering projects | Abrar Akhunji" description="Local AI, full-stack applications, developer tools and native software by Abrar Akhunji. Explore the problems, decisions and evidence behind ten builds." path="/work/" image="/assets/build-room/og-home.jpg"/><div className="page-intro"><p className="section-kicker">The project shelf</p><h1>Useful things.<br/>Different kinds of hard.</h1><p>AI, developer tools, native software, and the web.<br/>A closer look at the problems and the builds.</p></div><div className="work-grid">{projects.map((p,i)=><Link className="work-card" key={p.id} to={projectPath(p.slug)}><div className="work-card-image"><img src={p.image} alt={p.imageAlt} width="900" height="600" loading={i<2?'eager':'lazy'}/><span className="status-label">{p.status}</span></div><p className="project-category">{p.category}</p><h2>{p.title}<ArrowUpRight size={23}/></h2><p>{p.summary}</p><small>{p.tech.slice(0,4).join(' / ')}</small></Link>)}</div></main>;
}

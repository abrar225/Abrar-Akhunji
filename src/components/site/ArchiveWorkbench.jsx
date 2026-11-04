import { useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { archiveProjects, projectPath } from '../../lib/projects';
const groups=[['all','All experiments'],['software','Tools & apps'],['vision','Vision & ML']];
const isVision=project=>/vision|AI\/ML|healthcare AI/i.test(project.category);
const inGroup=(project,group)=>group==='all'||(group==='vision'?isVision(project):!isVision(project));

export default function ArchiveWorkbench(){
 const [group,setGroup]=useState('all'),[slug,setSlug]=useState(archiveProjects[0].slug),id=useId();
 const visible=archiveProjects.filter(p=>inGroup(p,group)),project=visible.find(p=>p.slug===slug)||visible[0],index=visible.indexOf(project);
 const swipe = useRef(null), suppressClick = useRef(false);
 function chooseGroup(key){setGroup(key);setSlug(archiveProjects.find(p=>inGroup(p,key)).slug);}
 function step(direction){setSlug(visible[(index+direction+visible.length)%visible.length].slug);}
 return <section id="experiments" className="archive-section archive-room"><div className="room-container"><header className="archive-heading"><div><p className="section-kicker">Earlier experiments</p><h2>Before the workbench.</h2><p>A few of the builds that taught me how to build.</p></div><Link className="text-link" to="/work/">All ten projects<ArrowUpRight size={16}/></Link></header><div className="archive-filters" role="group" aria-label="Filter earlier projects">{groups.map(([key,label])=><button type="button" key={key} aria-pressed={group===key} onClick={()=>chooseGroup(key)}>{label}<span>{archiveProjects.filter(p=>inGroup(p,key)).length}</span></button>)}</div><div className="archive-browser"><div className="archive-index archive-ring" role="tablist" onPointerDown={e=>{if(!e.isPrimary||e.button!==0)return;swipe.current={x:e.clientX,y:e.clientY};suppressClick.current=false;}} onPointerCancel={()=>{swipe.current=null;}} onPointerUp={e=>{if(swipe.current===null)return;const delta=e.clientX-swipe.current.x, vertical=e.clientY-swipe.current.y;swipe.current=null;if(Math.abs(delta)>40&&Math.abs(delta)>Math.abs(vertical)){suppressClick.current=true;step(delta<0?1:-1);}}} aria-label="Earlier projects" aria-orientation="horizontal" onKeyDown={e=>{const next=e.key==='ArrowRight'||e.key==='ArrowDown'?(index+1)%visible.length:e.key==='ArrowLeft'||e.key==='ArrowUp'?(index+visible.length-1)%visible.length:e.key==='Home'?0:e.key==='End'?visible.length-1:-1;if(next>=0){e.preventDefault();setSlug(visible[next].slug);e.currentTarget.querySelectorAll('[role=tab]')[next].focus();}}}>{visible.map((p, position) => {
   let distance = position - index;
   if (distance > visible.length / 2) distance -= visible.length;
   if (distance < -visible.length / 2) distance += visible.length;
   const angle = distance * (2 * Math.PI / Math.max(visible.length, 7));
   return <button type="button" role="tab" id={`${id}-${p.slug}`} aria-controls={`${id}-artifact`} aria-selected={project.slug===p.slug} tabIndex={project.slug===p.slug?0:-1} key={p.slug} onClick={e=>{if(!suppressClick.current||e.detail===0)setSlug(p.slug);}} data-cursor="Preview"
    style={{ '--ring-x': Math.sin(angle), '--ring-depth': Math.cos(angle)-1, '--ring-angle': `${Math.max(-1.15, Math.min(1.15, -angle))}rad`, zIndex: visible.length-Math.abs(distance) }}>
     <img src={p.image} alt="" width="1200" height="800" loading="lazy" draggable="false"/>
     <span><strong>{p.title}</strong><small>{p.category}</small></span>
   </button>;
 })}</div><div className="archive-artifact" id={`${id}-artifact`} role="tabpanel" aria-labelledby={`${id}-${project.slug}`}><div className="archive-artifact-copy"><div><p className="project-category">{project.category}<span className="status-label">{project.status}</span></p><h3>{project.title}</h3><p>{project.summary}</p></div><Link className="button-primary" to={projectPath(project.slug)}>Inside the project<ArrowUpRight size={15}/></Link></div><div className="archive-browser-foot"><span>{String(index+1).padStart(2,'0')} / {String(visible.length).padStart(2,'0')} <span>in this collection</span></span><div><button type="button" aria-label="Previous earlier project" onClick={()=>step(-1)}><ArrowLeft size={17}/></button><button type="button" aria-label="Next earlier project" onClick={()=>step(1)}><ArrowRight size={17}/></button></div></div></div></div></div></section>;
}

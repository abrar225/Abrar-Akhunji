import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { siteAudio } from '../../lib/audio/siteAudio';
export default function Soundscape(){
 const {pathname}=useLocation();
 useEffect(()=>{const visibility=()=>siteAudio.active(!document.hidden);visibility();document.addEventListener('visibilitychange',visibility);return()=>document.removeEventListener('visibilitychange',visibility);},[]);
 useEffect(()=>{
  let lastHover=null,currentSection=null;
  const own=e=>e.closest('[data-no-sound],.footer-river,.ascii-name,.github-city');
  const over=e=>{const target=e.target instanceof Element?e.target.closest('a,button,summary,[role=tab]'):null;if(!target||target===lastHover||own(target)||target.matches(':disabled'))return;lastHover=target;siteAudio.cue('hover',{gain:.32,throttle:.14});};
  const click=e=>{const target=e.target instanceof Element?e.target.closest('a,button,summary,[role=tab]'):null;if(!target||own(target)||target.matches(':disabled')||target.closest('.story-dock'))return;siteAudio.cue(target.closest('.project-selector,.archive-index')||/theme/i.test(target.getAttribute('aria-label')||'')?'select':'click');};
  document.addEventListener('pointerover',over,{passive:true});document.addEventListener('click',click);
  const observer=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top);const next=visible[0]?.target.id;if(!next||next===currentSection)return;if(currentSection)siteAudio.cue('section',{gain:.45,throttle:.7});currentSection=next;},{rootMargin:'-30% 0px -35% 0px',threshold:0});
  const seen=new WeakSet();let frame=0;const collect=()=>{frame=0;document.querySelectorAll('main>section[id],.story-stage>section[id],.markdown-body h2[id]').forEach(e=>{if(!seen.has(e)){seen.add(e);observer.observe(e);}});};collect();
  const changes=new MutationObserver(()=>{if(!frame)frame=requestAnimationFrame(collect);});const route=document.getElementById('route-content');if(route)changes.observe(route,{childList:true,subtree:true});
  return()=>{changes.disconnect();cancelAnimationFrame(frame);observer.disconnect();document.removeEventListener('pointerover',over);document.removeEventListener('click',click);};
 },[pathname]);
 return null;
}

import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { siteAudio } from '../../lib/audio/siteAudio';
import { createCreatures, advanceCreatures } from '../../lib/creatures/steering';
import { paintHabitats } from '../../lib/creatures/paint';
export default function WorkshopCreatures(){
 const root=useRef(null),{pathname}=useLocation();
 useEffect(()=>{
  const canvas=root.current,ctx=canvas.getContext('2d');if(!ctx)return;
  const fine=matchMedia('(hover:hover) and (pointer:fine)'),motion=matchMedia('(prefers-reduced-motion:reduce)');
  let width=innerWidth,height=0,agents=[],flowers=[],pointer=null,raf=0,last=0,time=0,painted=0,disposed=false,enabled=true;
  try{enabled=localStorage.getItem('portfolio_creatures')!=='false';}catch{/* storage unavailable */}
  function measure(){const builder=document.getElementById('about-me');if(!builder){agents=[];flowers=[];return;}width=innerWidth;height=document.documentElement.scrollHeight;const top=builder.getBoundingClientRect().top+scrollY,contact=document.getElementById('contact');const portrait=builder.querySelector('.portrait').getBoundingClientRect(),base=portrait.bottom+scrollY;flowers=[{x:portrait.left+25,y:base+35},{x:portrait.right-25,y:base+100}];if(contact)flowers.push({x:width-28,y:contact.getBoundingClientRect().top+scrollY+130});const web={x:width-22,y:top+125};if(!agents.length)agents=createCreatures(width,height,{web,flowers});else{agents[0].x+=web.x-agents[0].home.x;agents[0].y+=web.y-agents[0].home.y;agents[0].home=web;agents[1].flowers=flowers;}}
  function size(){const dpr=Math.min(devicePixelRatio||1,1.5);canvas.width=innerWidth*dpr;canvas.height=innerHeight*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);measure();resume();}
  const visible=()=>agents.some(a=>Math.abs(a.y-scrollY-innerHeight/2)<innerHeight/2+160)||flowers.some(f=>f.y>scrollY-60&&f.y<scrollY+innerHeight+60);
  const active=()=>!disposed&&enabled&&agents.length&&fine.matches&&!motion.matches&&!document.hidden&&visible();
  function draw(){ctx.clearRect(0,0,innerWidth,innerHeight);const s=getComputedStyle(canvas);ctx.save();ctx.translate(0,-scrollY);paintHabitats(ctx,agents,flowers,time,scrollY,s.getPropertyValue('--color-fg').trim(),s.getPropertyValue('--color-accent').trim(),s.getPropertyValue('--color-canvas').trim());ctx.restore();canvas.dataset.creatures=JSON.stringify(agents.map(({name,kind,x,y,state})=>({name,kind,x:Math.round(x),y:Math.round(y),state})));canvas.dataset.renders=String(Number(canvas.dataset.renders||0)+1);}
  function stop(){cancelAnimationFrame(raf);raf=0;last=0;canvas.dataset.playing='false';ctx.clearRect(0,0,innerWidth,innerHeight);}
  function loop(t){raf=0;if(!active()){stop();return;}const dt=last?Math.min(.06,(t-last)/1000):0;last=t;time+=dt;const before=agents.map(a=>a.state);advanceCreatures(agents,dt,time,pointer,width,height);agents.forEach((a,i)=>{if(['fleeing','retreating'].includes(a.state)&&before[i]!==a.state)siteAudio.cue('creature',{gain:.2,rate:a.kind==='spider'?.8:1.2,throttle:.9});});if(t-painted>32){draw();painted=t;}canvas.dataset.playing='true';raf=requestAnimationFrame(loop);}
  function resume(){if(!active()){stop();return;}if(!raf)raf=requestAnimationFrame(loop);}
  const move=e=>{if(e.pointerType==='mouse')pointer={x:e.clientX,y:e.clientY+scrollY};},leave=e=>{if(!e.relatedTarget)pointer=null;},scroll=()=>{pointer=null;resume();if(active())draw();},settings=e=>{enabled=e.detail.enabled;resume();};
  const resize=new ResizeObserver(()=>{measure();resume();});resize.observe(document.getElementById('route-content'));size();document.fonts.ready.then(()=>{measure();resume();});
  window.addEventListener('resize',size);window.addEventListener('scroll',scroll,{passive:true});document.addEventListener('pointermove',move,{passive:true});document.addEventListener('pointerout',leave);document.addEventListener('visibilitychange',resume);window.addEventListener('portfolio:creatures',settings);fine.addEventListener('change',resume);motion.addEventListener('change',resume);
  return()=>{disposed=true;stop();resize.disconnect();window.removeEventListener('resize',size);window.removeEventListener('scroll',scroll);document.removeEventListener('pointermove',move);document.removeEventListener('pointerout',leave);document.removeEventListener('visibilitychange',resume);window.removeEventListener('portfolio:creatures',settings);fine.removeEventListener('change',resume);motion.removeEventListener('change',resume);};
 },[pathname]);
 return <canvas ref={root} className="workshop-creatures" aria-hidden="true" data-playing="false"/>;
}

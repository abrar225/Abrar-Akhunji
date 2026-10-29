import { useEffect, useRef } from 'react';
import { siteAudio } from '../../lib/audio/siteAudio';
import { createCreatures, advanceCreatures } from '../../lib/creatures/steering';

export default function WorkshopCreatures(){
 const root=useRef(null);
 useEffect(()=>{
  const canvas=root.current,ctx=canvas.getContext('2d');if(!ctx)return;
  const fine=matchMedia('(hover:hover) and (pointer:fine)'),motion=matchMedia('(prefers-reduced-motion:reduce)');
  let width=innerWidth,height=innerHeight,agents=createCreatures(width,height),pointer=null,raf=0,last=0,time=0,painted=0,obstacles=[],enabled=true;try{enabled=localStorage.getItem('portfolio_creatures')!=='false';}catch{/* storage unavailable */}
  const active=()=>enabled&&fine.matches&&!motion.matches&&!document.hidden;
  function measure(){obstacles=[...document.querySelectorAll('.site-header,.story-dock,[role=dialog],.sound-panel')].map(e=>e.getBoundingClientRect()).filter(r=>r.width&&r.height);}
  function resize(){width=innerWidth;height=innerHeight;const dpr=Math.min(devicePixelRatio||1,1.5);canvas.width=width*dpr;canvas.height=height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);measure();}
  function draw(){ctx.clearRect(0,0,width,height);const style=getComputedStyle(canvas),ink=style.getPropertyValue('--color-fg').trim(),blue=style.getPropertyValue('--color-accent').trim(),paper=style.getPropertyValue('--color-canvas').trim();
   for(const a of agents){ctx.save();ctx.translate(a.x,a.y);const pulse=Math.sin(time*4+a.phase);ctx.lineWidth=1.15;ctx.strokeStyle=ink;ctx.fillStyle=paper;
    if(a.kind==='seed'){ctx.rotate(a.angle*.12);ctx.beginPath();ctx.ellipse(0,0,6,8,0,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.strokeStyle=blue;for(let i=0;i<3;i++){const side=i-1;ctx.beginPath();ctx.moveTo(side*3,-5);ctx.quadraticCurveTo(side*11, -14-pulse*2,side*12,-17);ctx.stroke();}ctx.fillStyle=ink;ctx.beginPath();ctx.arc(-2,-1,1,0,Math.PI*2);ctx.arc(2,-1,1,0,Math.PI*2);ctx.fill();ctx.strokeStyle=ink;for(const s of [-1,1]){ctx.beginPath();ctx.moveTo(s*3,6);ctx.lineTo(s*(7+pulse),10);ctx.stroke();}}
    else{ctx.rotate(a.angle*.18);ctx.fillStyle=paper;for(const s of [-1,1]){ctx.beginPath();ctx.ellipse(s*7,-1,7,4+Math.abs(pulse)*3,s*.45,0,Math.PI*2);ctx.fill();ctx.stroke();}ctx.fillStyle=blue;ctx.beginPath();ctx.ellipse(0,0,2.3,7,0,0,Math.PI*2);ctx.fill();ctx.strokeStyle=ink;for(const s of [-1,1]){ctx.beginPath();ctx.moveTo(s,-6);ctx.quadraticCurveTo(s*4,-14,s*7,-12);ctx.stroke();}ctx.fillStyle=ink;ctx.beginPath();ctx.arc(-1.5,-4,1,0,Math.PI*2);ctx.arc(1.5,-4,1,0,Math.PI*2);ctx.fill();}
    ctx.restore();
   }
   canvas.dataset.creatures=JSON.stringify(agents.map(({name,x,y,state})=>({name,x:Math.round(x),y:Math.round(y),state})));canvas.dataset.renders=String(Number(canvas.dataset.renders||0)+1);
  }
  function stop(){cancelAnimationFrame(raf);raf=0;last=0;canvas.dataset.playing='false';ctx.clearRect(0,0,width,height);}
  function loop(t){raf=0;if(!active()){stop();return;}const dt=last?Math.min(.06,(t-last)/1000):0;last=t;time+=dt;const before=agents.map(a=>a.state);advanceCreatures(agents,dt,time,pointer,width,height,obstacles);agents.forEach((a,i)=>{if(a.state==='fleeing'&&before[i]!=='fleeing')siteAudio.cue('creature',{rate:a.kind==='seed'?1.2:.85,gain:.2,throttle:.9});});if(t-painted>32){draw();painted=t;}canvas.dataset.playing='true';raf=requestAnimationFrame(loop);}
  function resume(){stop();if(active())raf=requestAnimationFrame(loop);}
  const move=e=>{if(e.pointerType==='mouse')pointer={x:e.clientX,y:e.clientY};},leave=e=>{if(!e.relatedTarget)pointer=null;},settings=e=>{enabled=e.detail.enabled;resume();};
  resize();resume();window.addEventListener('resize',resize);window.addEventListener('scroll',measure,{passive:true});document.addEventListener('pointermove',move,{passive:true});document.addEventListener('pointerout',leave);document.addEventListener('visibilitychange',resume);window.addEventListener('portfolio:creatures',settings);fine.addEventListener('change',resume);motion.addEventListener('change',resume);
  return()=>{stop();window.removeEventListener('resize',resize);window.removeEventListener('scroll',measure);document.removeEventListener('pointermove',move);document.removeEventListener('pointerout',leave);document.removeEventListener('visibilitychange',resume);window.removeEventListener('portfolio:creatures',settings);fine.removeEventListener('change',resume);motion.removeEventListener('change',resume);};
 },[]);
 return <canvas ref={root} className="workshop-creatures" aria-hidden="true" data-playing="false"/>;
}

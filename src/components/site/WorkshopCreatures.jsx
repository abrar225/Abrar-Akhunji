import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { siteAudio } from '../../lib/audio/siteAudio';
import { createCreatures, advanceCreatures } from '../../lib/creatures/steering';
import { paintHabitats } from '../../lib/creatures/paint';
export default function WorkshopCreatures(){
 const root=useRef(null),{pathname}=useLocation();
 useEffect(()=>{
  const canvas=root.current,ctx=canvas.getContext('2d');if(!ctx)return;
  const motion=matchMedia('(prefers-reduced-motion:reduce)');
  let width=innerWidth,height=0,agents=[],flowers=[],pointer=null,touchUntil=0,raf=0,last=0,time=0,painted=0,disposed=false,enabled=true;
  try{enabled=localStorage.getItem('portfolio_creatures')!=='false';}catch{/* storage unavailable */}
  function measure() {
    const builder = document.getElementById('about-me');
    const portrait = builder?.querySelector('.portrait')?.getBoundingClientRect();
    if (!portrait) { agents = []; flowers = []; return; }
    const layoutChanged = (width < 768) !== (innerWidth < 768);
    width = innerWidth;
    height = document.documentElement.scrollHeight;
    const top = builder.getBoundingClientRect().top + scrollY;
    const web = { x: width - 30, y: top + 125 };
    const base = portrait.bottom + scrollY;
    const contact = document.getElementById('contact');
    flowers = width < 768
      ? [{ x: width - 36, y: top + 237 }, { x: width - 76, y: top + 310 }]
      : [{ x: portrait.left + 25, y: base + 35 }, { x: portrait.right - 25, y: base + 100 }];
    if (contact && width >= 768) flowers.push({ x: width - 28, y: contact.getBoundingClientRect().top + scrollY + 130 });
    if (!agents.length || layoutChanged) {
      agents = createCreatures(width, height, { web, flowers });
      time = 0;
      return;
    }
    const [spider, butterfly] = agents;
    spider.x += web.x - spider.home.x;
    spider.y += web.y - spider.home.y;
    spider.home = web;
    const previous = butterfly.flowers[butterfly.target];
    butterfly.target %= flowers.length;
    const target = flowers[butterfly.target];
    butterfly.x += target.x - previous.x;
    butterfly.y += target.y - previous.y;
    butterfly.flowers = flowers;
  }
  function size(){const dpr=Math.min(devicePixelRatio||1,1.5);canvas.width=innerWidth*dpr;canvas.height=innerHeight*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);measure();resume();}
  const visible=()=>agents.some(a=>Math.abs(a.y-scrollY-innerHeight/2)<innerHeight/2+160)||flowers.some(f=>f.y>scrollY-60&&f.y<scrollY+innerHeight+60);
  const active=()=>!disposed&&enabled&&agents.length&&!motion.matches&&!document.hidden&&visible();
  function draw(){ctx.clearRect(0,0,innerWidth,innerHeight);const s=getComputedStyle(canvas);ctx.save();ctx.translate(0,-scrollY);paintHabitats(ctx,agents,flowers,time,scrollY,s.getPropertyValue('--color-fg').trim(),s.getPropertyValue('--color-accent').trim(),s.getPropertyValue('--color-canvas').trim());ctx.restore();canvas.dataset.creatures=JSON.stringify(agents.map(({name,kind,x,y,state})=>({name,kind,x:Math.round(x),y:Math.round(y),state})));canvas.dataset.renders=String(Number(canvas.dataset.renders||0)+1);}
  function stop(){cancelAnimationFrame(raf);raf=0;last=0;canvas.dataset.playing='false';ctx.clearRect(0,0,innerWidth,innerHeight);}
  function loop(t){raf=0;if(!active()){stop();return;}const dt=last?Math.min(.06,(t-last)/1000):0;last=t;time+=dt;const before=agents.map(a=>a.state);advanceCreatures(agents,dt,time,t<touchUntil||!touchUntil?pointer:null,width,height);agents.forEach((a,i)=>{if(['fleeing','retreating'].includes(a.state)&&before[i]!==a.state)siteAudio.cue('creature',{gain:.2,rate:a.kind==='spider'?.8:1.2,throttle:.9});});if(t-painted>32){draw();painted=t;}canvas.dataset.playing='true';raf=requestAnimationFrame(loop);}
  function resume(){if(!active()){stop();if(motion.matches&&!disposed&&enabled&&!document.hidden&&visible()&&agents.length)draw();return;}if(!raf)raf=requestAnimationFrame(loop);}
  const move=e=>{if(e.pointerType==='mouse'||e.type==='pointerdown'){pointer={x:e.clientX,y:e.clientY+scrollY};touchUntil=e.pointerType==='mouse'?0:performance.now()+750;}},leave=e=>{if(e.pointerType==='mouse'&&!e.relatedTarget)pointer=null;},scroll=()=>{pointer=null;measure();resume();if(active())draw();},settings=e=>{enabled=e.detail.enabled;resume();};
  const resize=new ResizeObserver(()=>{measure();resume();});resize.observe(document.getElementById('route-content'));size();document.fonts.ready.then(()=>{measure();resume();});
  window.addEventListener('resize',size);window.addEventListener('scroll',scroll,{passive:true});document.addEventListener('pointermove',move,{passive:true});document.addEventListener('pointerdown',move,{passive:true});document.addEventListener('pointerout',leave);document.addEventListener('visibilitychange',resume);window.addEventListener('portfolio:creatures',settings);motion.addEventListener('change',resume);
  return()=>{disposed=true;stop();resize.disconnect();window.removeEventListener('resize',size);window.removeEventListener('scroll',scroll);document.removeEventListener('pointermove',move);document.removeEventListener('pointerdown',move);document.removeEventListener('pointerout',leave);document.removeEventListener('visibilitychange',resume);window.removeEventListener('portfolio:creatures',settings);motion.removeEventListener('change',resume);};
 },[pathname]);
 return <canvas ref={root} className="workshop-creatures" aria-hidden="true" data-playing="false"/>;
}

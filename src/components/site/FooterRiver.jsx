import { useEffect, useRef, useState } from 'react';
import { Pause, Play, Volume2, VolumeX, Waves, ArrowUpRight } from 'lucide-react';
import { createRiver, advanceRiver, stirRiver, requestBreach, SURFACE } from '../../lib/river/physics';
import { createRiverRenderer } from '../../lib/river/renderer';
import { useSound } from '../../lib/audio/useSound';
import { createRiverAudio } from '../../lib/river/audio';

export default function FooterRiver() {
 const canvasRef=useRef(null),runtime=useRef(null),audio=useRef(null);
 const [paused,setPaused]=useState(false),[audioError,setAudioError]=useState(''),settings=useSound();
 const sound=settings.enabled&&settings.effects&&settings.river;
 useEffect(()=>{
  const canvas=canvasRef.current,paint=createRiverRenderer(canvas);if(!paint)return;
  const media=matchMedia('(prefers-reduced-motion: reduce)'),world=createRiver(canvas.clientWidth<600),soundscape=createRiverAudio();audio.current=soundscape;
  let frame=0,visible=false,disposed=false,stopped=false,last=0,painted=0,renders=0,pointer=null;
  const isActive=()=>visible&&!document.hidden&&!stopped&&!media.matches;
  function draw(){if(disposed||!visible||document.hidden)return;paint(world);canvas.dataset.ready='true';canvas.dataset.renders=String(++renders);canvas.dataset.breaches=String(world.breaches);canvas.dataset.splashes=String(world.splashes);canvas.dataset.interactions=String(world.interactions);}
  function stop(){cancelAnimationFrame(frame);frame=0;last=0;canvas.dataset.playing='false';}
  function loop(time){frame=0;if(!isActive()){stop();return;}if(last)advanceRiver(world,(time-last)/1000,pointer);last=time;for(const cue of world.events.splice(0))soundscape.cue(cue.type,cue.x,cue.intensity);if(time-painted>40){painted=time;draw();}canvas.dataset.playing='true';frame=requestAnimationFrame(loop);}
  function resume(){stop();soundscape.active(visible&&!document.hidden&&!stopped);draw();if(isActive())frame=requestAnimationFrame(loop);}
  function staticPose(){const d=world.dolphins[0];d.mode='air';d.x=-.15;d.y=SURFACE+.24;d.vx=.95;d.vy=0;d.bend=.65;}
  if(media.matches)staticPose();
  function interact(kind,x=0,y=-.35){if(kind==='jump'){requestBreach(world,x);if(media.matches||stopped)staticPose();}else stirRiver(world,x,y);for(const cue of world.events.splice(0))soundscape.cue(cue.type,cue.x,cue.intensity);draw();}
  const point=e=>{const r=canvas.getBoundingClientRect();return {x:((e.clientX-r.left)/r.width-.5)/.42,y:(.5-(e.clientY-r.top)/r.height)/.4};};
  const move=e=>{if(e.pointerType!=='mouse')return;const p=point(e);pointer={x:Math.max(-1,Math.min(1,p.x)),y:Math.max(-.9,Math.min(.1,p.y))};};
  const leave=()=>{pointer=null;};
  const press=e=>{const p=point(e);interact(p.y>SURFACE?'jump':'ripple',p.x,p.y);};
  const sizes=new ResizeObserver(draw),theme=new MutationObserver(draw),io=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;resume();},{threshold:.05});
  sizes.observe(canvas);theme.observe(document.documentElement,{attributes:true,attributeFilter:['class']});io.observe(canvas);
  const change=()=>{if(media.matches)staticPose();resume();};media.addEventListener('change',change);document.addEventListener('visibilitychange',resume);canvas.addEventListener('pointermove',move);canvas.addEventListener('pointerleave',leave);canvas.addEventListener('pointerdown',press);
  runtime.current={pause(value){stopped=value;resume();},interact};
  document.fonts.ready.then(()=>{if(!disposed)draw();});
  return()=>{disposed=true;stop();sizes.disconnect();theme.disconnect();io.disconnect();media.removeEventListener('change',change);document.removeEventListener('visibilitychange',resume);canvas.removeEventListener('pointermove',move);canvas.removeEventListener('pointerleave',leave);canvas.removeEventListener('pointerdown',press);soundscape.dispose();audio.current=null;runtime.current=null;};
 },[]);
 async function toggleSound(){if(sound){audio.current?.mute();return;}const controller=audio.current;const enabled=await controller?.enable();if(controller!==audio.current)return;setAudioError(enabled?'':'Sound is unavailable in this browser. You can still play with the river.');}
 return <figure className="footer-river"><div className="river-title"><span>A little room to play.</span><span>Move slowly. Leave a wake.</span></div><canvas ref={canvasRef} role="img" aria-label="ASCII river with a school of fish and a breaching dolphin" data-cursor="Make a ripple" data-ready="false" data-playing="false" style={{touchAction:'pan-y'}}/><figcaption><p>Fish follow the current. A touch changes it.</p><div className="river-controls"><button type="button" onClick={()=>runtime.current?.interact('ripple')}><Waves size={14}/>Stir the water</button><button type="button" onClick={()=>runtime.current?.interact('jump')}><ArrowUpRight size={14}/>Invite a jump</button><button type="button" aria-label={paused?'Play river animation':'Pause river animation'} aria-pressed={paused} onClick={()=>{const next=!paused;setPaused(next);runtime.current?.pause(next);}}>{paused?<Play size={14}/>:<Pause size={14}/>}</button><button type="button" onClick={toggleSound} aria-pressed={sound} aria-label={sound?'Mute river sound':'Enable river sound'}>{sound?<Volume2 size={14}/>:<VolumeX size={14}/>}Sound {sound?'on':'off'}</button></div>{sound&&<label className="river-volume">Volume<input aria-label="River volume" type="range" min="0" max="50" value={Math.round(settings.riverVolume*100)} onChange={e=>audio.current?.volume(Number(e.target.value)/100)}/></label>}{audioError&&<p role="status">{audioError}</p>}</figcaption></figure>;
}

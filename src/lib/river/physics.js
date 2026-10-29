export const SURFACE=.35, GRAVITY=2.15, STEP=1/120;
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const hash=i=>{const n=Math.sin(i*91.7+19.2)*17381.13;return n-Math.floor(n);};
function limit(v,max){const length=Math.hypot(...v);return length>max?v.map(n=>n*max/length):v;}
export function createRiver(narrow=false) {
 const count=narrow?4:7;
 return {time:0,accumulator:0,fish:Array.from({length:count},(_,i)=>({kind:'fish',x:(i/(count-1)-.5)*1.6,y:-.22-hash(i+5)*.58,z:(hash(i+9)-.5)*.7,vx:i%2?-.3:.3,vy:0,vz:.04,faceX:i%2?-.3:.3,faceY:0,faceZ:.04,heading:i%2?Math.PI:0,bank:0,seed:hash(i+2)})),dolphins:[{kind:'dolphin',x:-.5,y:-.35,z:0,vx:.28,vy:0,vz:0,mode:'glide',cooldown:2,seed:.3,bank:0,bend:.2,fin:.4}],bubbles:Array.from({length:narrow?8:14},(_,i)=>({x:(hash(i+40)-.5)*1.8,y:-.1-hash(i+41)*.9,z:0,v:.08+hash(i+43)*.1})),ripples:[],motes:[],trails:[],events:[],interactions:0,breaches:0,splashes:0};
}
function event(world,type,x,intensity){world.events.push({type,x,intensity});if(world.events.length>8)world.events.shift();}
export function stirRiver(world,x=0,y=-.35) {
 x=clamp(x,-1,1);y=clamp(y,-.9,SURFACE);
 world.ripples.push({x,born:world.time,life:2,speed:.78,amp:1.8});if(world.ripples.length>10)world.ripples.shift();
 for(const f of world.fish){const dx=f.x-x,dy=f.y-y,d=Math.max(.04,Math.hypot(dx,dy));if(d<.65){f.vx+=dx/d*.3;f.vy+=dy/d*.25;}}
 world.interactions++;event(world,'ripple',x,.5);
}
export function requestBreach(world,x=0) {const d=world.dolphins[0];if(d.mode==='air')return false;d.aimX=clamp(x-.45,-.9,.08);d.mode='rise';world.interactions++;return true;}
function school(world,dt,pointer) {
 const forces=world.fish.map(f=>{
  let ax=0,ay=0,az=0,cx=0,cy=0,cz=0,vx=0,vy=0,vz=0,n=0;
  for(const o of world.fish){if(o===f)continue;const dx=f.x-o.x,dy=f.y-o.y,dz=f.z-o.z,d=Math.hypot(dx,dy,dz);if(d<.75){cx+=o.x;cy+=o.y;cz+=o.z;vx+=o.vx;vy+=o.vy;vz+=o.vz;n++;}if(d<.25&&d>.0001){const push=(1-d/.25)*2.8;ax+=dx/d*push;ay+=dy/d*push;az+=dz/d*push;}}
  if(n){ax+=(cx/n-f.x)*.35+(vx/n-f.vx)*.5;ay+=(cy/n-f.y)*.35+(vy/n-f.vy)*.5;az+=(cz/n-f.z)*.35+(vz/n-f.vz)*.5;}
  const t=world.time,phase=f.seed*19;
  ax+=Math.sin(t*.7+phase)*.23;ay+=Math.cos(t*.9+phase)*.15;az+=Math.sin(t*.6+phase)*.14-f.z*.3;
  if(f.x> .85)ax-=(f.x-.85)*4;if(f.x<-.85)ax+=(-.85-f.x)*4;
  if(f.y>-.16)ay-=(f.y+.16)*4;if(f.y<-.88)ay+=(-.88-f.y)*4;
  if(f.z>.38)az-=(f.z-.38)*4;if(f.z<-.38)az+=(-.38-f.z)*4;
  if(pointer){const dx=pointer.x-f.x,dy=pointer.y-f.y,d=Math.max(.08,Math.hypot(dx,dy));const sign=d<.2?-1:1;ax+=sign*dx/d*.35;ay+=sign*dy/d*.35;}
  for(const d of world.dolphins){const dx=f.x-d.x,dy=f.y-d.y,dist=Math.max(.05,Math.hypot(dx,dy));if(dist<.48){ax+=dx/dist*(.48-dist)*3;ay+=dy/dist*(.48-dist)*3;}}
  return limit([ax,ay,az],2.5);
 });
 world.fish.forEach((f,i)=>{const a=forces[i];[f.vx,f.vy,f.vz]=limit([f.vx+a[0]*dt,f.vy+a[1]*dt,f.vz+a[2]*dt],.72);f.x+=f.vx*dt;f.y+=f.vy*dt;f.z+=f.vz*dt;
  for(const [key,vel,min,max] of [['x','vx',-1.05,1.05],['y','vy',-1.02,-.06],['z','vz',-.5,.5]]){if(f[key]<min||f[key]>max){f[key]=clamp(f[key],min,max);f[vel]*=-.7;}}
  const blend=1-Math.exp(-7*dt);f.faceX+=(f.vx-f.faceX)*blend;f.faceY+=(f.vy-f.faceY)*blend;f.faceZ+=(f.vz-f.faceZ)*blend;
  const heading=Math.atan2(f.vz,f.vx),delta=Math.atan2(Math.sin(heading-f.heading),Math.cos(heading-f.heading));f.bank+=(clamp(delta/dt*.08,-.55,.55)-f.bank)*(1-Math.exp(-5*dt));f.heading=heading;
 });
}
function dolphin(world,d,dt) {
 if(d.mode==='air'){
  d.x+=d.vx*dt;d.y+=d.vy*dt-.5*GRAVITY*dt*dt;d.vy-=GRAVITY*dt;d.bend=.65;
  if(d.y<=SURFACE&&d.vy<0){d.y=SURFACE;d.mode='plunge';world.splashes++;world.ripples.push({x:d.x,born:world.time,life:2,speed:.9,amp:2});event(world,'splash',d.x,clamp(Math.abs(d.vy),.3,1));
   for(let i=0;i<16;i++){const angle=Math.PI*.5+(hash(i+world.splashes)-.5)*2.2,speed=.3+hash(i+9)*.65;world.motes.push({x:d.x,y:SURFACE,z:0,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,life:.7,age:0,lum:.8});}
  }
 }else if(d.mode==='rise'){
  const dx=(d.aimX??-.5)-d.x;d.vx=clamp(dx*2,-.5,.5);d.vy=.52;d.x+=d.vx*dt;d.y+=d.vy*dt;d.bend=.45;
  if(d.y>=SURFACE){d.y=SURFACE;d.mode='air';d.vx=.95;d.vy=1.03;world.breaches++;event(world,'breach',d.x,.65);}
 }else if(d.mode==='plunge'){
  d.vy=(-.4-d.y)*2.8;d.vx=.12;d.y+=d.vy*dt;d.x+=d.vx*dt;d.bend=.35;
  if(d.y<-.35){d.mode='glide';d.cooldown=7;d.aimX=null;}
 }else{
  d.cooldown-=dt;const target=d.x>.4?-.3:d.x<-.7?.3:d.vx;d.vx+=(target-d.vx)*(1-Math.exp(-dt*2));d.vy=(-.4+Math.sin(world.time*1.8)*.025-d.y)*2;d.x+=d.vx*dt;d.y+=d.vy*dt;d.bend=.16;
  if(d.cooldown<=0){d.mode='rise';d.aimX=-.55;}
 }
 d.bank=Math.sin(world.time+d.seed)*.05;
}
function step(world,dt,pointer) {
 world.time+=dt;school(world,dt,pointer);for(const d of world.dolphins)dolphin(world,d,dt);
 for(const b of world.bubbles){b.y+=b.v*dt;if(b.y>SURFACE-.05)b.y=-1;}
 for(const m of world.motes){m.age+=dt;m.x+=m.vx*dt;m.y+=m.vy*dt-.5*GRAVITY*dt*dt;m.vy-=GRAVITY*dt;}
 world.motes=world.motes.filter(m=>m.age<m.life);world.ripples=world.ripples.filter(r=>world.time-r.born<r.life).slice(-10);
}
export function advanceRiver(world,seconds,pointer=null) {
 world.accumulator+=clamp(Number.isFinite(seconds)?seconds:0,0,.1);
 while(world.accumulator+1e-12>=STEP){step(world,STEP,pointer);world.accumulator-=STEP;}
 return world;
}

import test from 'node:test';
import assert from 'node:assert/strict';
import { createRiver, advanceRiver, requestBreach, stirRiver, SURFACE, STEP, GRAVITY } from '../../src/lib/river/physics.js';
import { advanceGlyphs, scatterGlyphs } from '../../src/lib/river/glyphs.js';
import { riverEnvelope } from '../../src/lib/river/audio.js';

test('the river stays finite and bounded under prolonged pointer and ripple input',()=>{
 const w=createRiver();
 for(let i=0;i<180*60;i++){
  if(i%7===0)stirRiver(w,Math.sin(i),Math.cos(i));
  if(i%301===0)requestBreach(w,Math.sin(i));
  advanceRiver(w,1/60,{x:Math.sin(i/60),y:-.5});
  for(const f of w.fish){for(const k of ['x','y','z','vx','vy','vz','bank'])assert.ok(Number.isFinite(f[k]));assert.ok(Math.abs(f.x)<=1.05&&f.y>=-1.02&&f.y<=-.06&&Math.abs(f.z)<=.5);assert.ok(Math.hypot(f.vx,f.vy,f.vz)<=.7200001);}
  assert.ok(w.ripples.length<=10&&w.events.length<=8&&w.motes.length<=16);
 }
 assert.ok(w.breaches>5&&w.splashes>5);
});
test('fixed steps give identical schooling across display frame rates and ignore invalid deltas',()=>{
 const a=createRiver(),b=createRiver();for(let i=0;i<600;i++)advanceRiver(a,1/60);for(let i=0;i<300;i++)advanceRiver(b,1/30);assert.deepEqual(a.fish,b.fish);assert.deepEqual(a.dolphins,b.dolphins);
 const snapshot=structuredClone(a);advanceRiver(a,NaN);advanceRiver(a,-1);assert.deepEqual(a,snapshot);
 const c=createRiver();advanceRiver(c,100);assert.ok(c.time<=.100001);
});
test('the dolphin rises, follows a ballistic arc, and creates a splash at reentry',()=>{
 const w=createRiver();assert.equal(requestBreach(w),true);let guard=0;while(w.dolphins[0].mode!=='air'&&guard++<1000)advanceRiver(w,STEP);
 const d=w.dolphins[0];assert.equal(w.breaches,1);assert.equal(d.y,SURFACE);assert.equal(requestBreach(w),false);
 const y=d.y,vy=d.vy;advanceRiver(w,STEP);assert.ok(Math.abs(d.y-(y+vy*STEP-.5*GRAVITY*STEP*STEP))<1e-10);assert.ok(Math.abs(d.vy-(vy-GRAVITY*STEP))<1e-10);
 let peak=d.y;while(d.mode==='air'&&guard++<2000){advanceRiver(w,STEP);peak=Math.max(peak,d.y);}assert.ok(Math.abs(peak-(SURFACE+1.03**2/(2*GRAVITY)))<.001);assert.equal(w.splashes,1);assert.ok(w.events.some(e=>e.type==='splash'));assert.equal(w.motes.length,16);
});
test('nearby fish separate rather than collapse into the same point',()=>{
 const w=createRiver();w.dolphins=[];w.fish=w.fish.slice(0,2);for(const [i,f] of w.fish.entries()){f.x=i*.03;f.y=-.5;f.z=0;f.vx=f.vy=f.vz=0;}
 for(let i=0;i<30;i++)advanceRiver(w,1/60);assert.ok(Math.hypot(w.fish[0].x-w.fish[1].x,w.fish[0].y-w.fish[1].y)>.15);
});
test('glyph impulses and pointer forces remain bounded and springs restore the signature',()=>{
 const points=Array.from({length:20},(_,i)=>({x:40+i*20,y:80,homeX:40+i*20,homeY:80,vx:0,vy:0}));scatterGlyphs(points,500,200);
 for(let i=0;i<30;i++)advanceGlyphs(points,1/60,{x:200,y:80},500,200);assert.ok(points.some(p=>Math.abs(p.x-p.homeX)>3));
 for(let i=0;i<360;i++)advanceGlyphs(points,1/60,null,500,200);
 for(const p of points){assert.ok(Number.isFinite(p.x+p.y+p.vx+p.vy));assert.ok(Math.hypot(p.x-p.homeX,p.y-p.homeY)<.01);assert.ok(p.x>=2&&p.x<=498&&p.y>=2&&p.y<=198);}
});
test('sound envelopes cap impact and duration even for invalid inputs',()=>{
 for(const kind of ['ripple','breach','splash'])for(const input of [-100,0,.5,100,NaN]){const e=riverEnvelope(kind,input);assert.ok(e.peak>0&&e.peak<=.08);assert.ok(e.duration>0&&e.duration<=.62);assert.ok(Number.isFinite(e.start+e.end));}
});

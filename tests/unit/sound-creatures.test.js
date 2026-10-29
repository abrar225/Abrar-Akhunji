import test from 'node:test';
import assert from 'node:assert/strict';
import { createCreatures,advanceCreatures } from '../../src/lib/creatures/steering.js';
import { cityBirthTime,cityCrossings } from '../../src/lib/audio/siteAudio.js';
import { advanceGlyphs } from '../../src/lib/river/glyphs.js';

test('all available occupied buildings sound once at the same growth threshold, independent of frame rate',()=>{
 const days=Array.from({length:371},(_,i)=>({week:Math.floor(i/7),weekday:i%7,count:i%4?5:0,available:i<366}));
 const expected=days.filter(d=>d.available&&d.count>0).length;
 for(const fps of [15,30,60,144]){let total=0,prior=0;for(let time=1000/fps;prior<3450;time+=1000/fps){const end=Math.min(3450,time);total+=cityCrossings(days,prior,end).length;prior=end;}assert.equal(total,expected);}
 assert.equal(cityBirthTime({week:0,weekday:0}),200);assert.equal(cityCrossings(days,0,199).length,0);assert.equal(cityCrossings(days,3450,3450).length,0);
});
test('spider remains tethered to its section and butterfly rests then visits a real perch',()=>{
 const a=createCreatures(1440,4000,{web:{x:1400,y:1400},flowers:[{x:30,y:1700},{x:1380,y:1900}]});
 for(let i=0;i<12000;i++){const t=i/60;advanceCreatures(a,1/60,t,null,1440,4000);assert.ok(Math.hypot(a[0].x-1400,a[0].y-1400)<130);for(const c of a){assert.ok(Number.isFinite(c.x+c.y+c.vx+c.vy));assert.ok(Math.hypot(c.vx,c.vy)<=c.speed+.001);}}
 assert.ok(a[1].visits>=2);assert.deepEqual(a.map(x=>x.name),['Pip','Spool']);
});
test('butterfly rests exactly on the flower and leaves when approached',()=>{
 const a=createCreatures(1440,4000,{web:{x:1400,y:1400},flowers:[{x:30,y:1700},{x:300,y:1900}]});advanceCreatures(a,1/60,1,null,1440,4000);assert.equal(a[1].state,'perched');assert.equal(a[1].y,1693);advanceCreatures(a,1/60,2,{x:30,y:1693},1440,4000);assert.equal(a[1].state,'fleeing');assert.ok(a[1].vy<0);
});
test('higher signature sensitivity produces a stronger but bounded response and still restores home',()=>{
 const points=()=>[{x:230,y:100,homeX:230,homeY:100,vx:0,vy:0}];const calm=points(),strong=points();for(let i=0;i<60;i++){advanceGlyphs(calm,1/60,{x:200,y:100,speed:1},500,250,.25);advanceGlyphs(strong,1/60,{x:200,y:100,speed:1},500,250,1.2);}assert.ok(strong[0].x-calm[0].x>15);
 for(let i=0;i<360;i++)advanceGlyphs(strong,1/60,null,500,250,1.2);assert.ok(Math.abs(strong[0].x-230)<.01);
});

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
test('creatures flee the pointer and preserve their own personality',()=>{
 const a=createCreatures(1400,900);a[0].x=200;a[0].y=500;const pointer={x:230,y:500},distance=Math.hypot(a[0].x-pointer.x,a[0].y-pointer.y);
 for(let i=0;i<45;i++)advanceCreatures(a,1/60,i/60,pointer,1400,900);
 assert.ok(Math.hypot(a[0].x-pointer.x,a[0].y-pointer.y)>distance+45);assert.notEqual(a[0].fear,a[1].fear);assert.deepEqual(a.map(x=>x.name),['Pip','Spool']);
});
test('creature steering stays bounded and finite over three minutes, obstacles and viewport changes',()=>{
 const agents=createCreatures(1440,900);
 for(let i=0;i<10800;i++){const width=i<5400?1440:390,height=900;advanceCreatures(agents,1/60,i/60,{x:100+Math.sin(i*.02)*90,y:500},width,height,[{left:0,right:width,top:0,bottom:82},{left:50,right:width-50,top:800,bottom:850}]);for(const a of agents){assert.ok(Number.isFinite(a.x+a.y+a.vx+a.vy));assert.ok(a.x>=16&&a.x<=width-16&&a.y>=100&&a.y<=height-85);assert.ok(Math.hypot(a.vx,a.vy)<=a.speed+.001);}}
});
test('higher signature sensitivity produces a stronger but bounded response and still restores home',()=>{
 const points=()=>[{x:230,y:100,homeX:230,homeY:100,vx:0,vy:0}];const calm=points(),strong=points();for(let i=0;i<60;i++){advanceGlyphs(calm,1/60,{x:200,y:100,speed:1},500,250,.25);advanceGlyphs(strong,1/60,{x:200,y:100,speed:1},500,250,1.2);}assert.ok(strong[0].x-calm[0].x>15);
 for(let i=0;i<360;i++)advanceGlyphs(strong,1/60,null,500,250,1.2);assert.ok(Math.abs(strong[0].x-230)<.01);
});

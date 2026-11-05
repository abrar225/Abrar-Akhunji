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

test('Pip transfers between web stations and Spool escapes without input', () => {
 const webs = [{x:80,y:300},{x:360,y:300},{x:80,y:1000},{x:360,y:1000}];
 const agents = createCreatures(390,2200,{web:webs[0],webs,flowers:[{x:110,y:390},{x:270,y:400}]});
 const [pip, spool] = agents;
 pip.patrol = [0,1];
 let crossed = false, caught = false, escaped = false;
 for (let frame = 1; frame <= 1800; frame++) {
  advanceCreatures(agents,1/60,frame/60,null,390,2200);
  crossed ||= pip.x > 250;
  if (spool.state === 'snared') caught = true;
  else if (caught) escaped = true;
 }
 assert.ok(crossed && caught && escaped);
 pip.patrol = [2,3];
 pip.patrolAt = 30;
 for (let frame = 1801; frame <= 2010; frame++) advanceCreatures(agents,1/60,frame/60,null,390,2200);
 assert.ok(pip.y > 850);
});

test('Pip swings between components with pendulum physics and creates dynamic webs', () => {
 const buttonAnchor = { x: 120, y: 400 };
 const textAnchor = { x: 500, y: 700 };
 const agents = createCreatures(1000, 3000, {
  web: buttonAnchor,
  webs: [buttonAnchor, textAnchor],
  flowers: [{ x: 150, y: 420 }, { x: 520, y: 720 }]
 });
 const pip = agents[0];
 pip.patrolAt = 1.0;
 let sawSwinging = false;
 let apexSag = 0;

 for (let f = 1; f <= 300; f++) {
  const t = f / 60;
  advanceCreatures(agents, 1/60, t, null, 1000, 3000);
  if (pip.state === 'swinging') {
   sawSwinging = true;
   assert.ok(pip.pivot !== null);
   assert.ok(pip.pivot.y < Math.min(buttonAnchor.y, textAnchor.y));
   apexSag = Math.max(apexSag, pip.y);
  }
 }

 assert.ok(sawSwinging, 'Pip entered swinging state');
 assert.ok(pip.activeWebs.length >= 1, 'Pip registered active web');
 assert.ok(apexSag > buttonAnchor.y, 'Swinging path formed a descending pendulum sag');
});

test('Spool flies freely and perches on component perches across the page', () => {
 const perches = [
  { x: 100, y: 300, isFlower: false },
  { x: 700, y: 1500, isFlower: false },
  { x: 300, y: 2800, isFlower: false }
 ];
 const agents = createCreatures(1200, 4000, {
  web: { x: 500, y: 200 },
  webs: [{ x: 500, y: 200 }],
  flowers: perches
 });
 const spool = agents[1];
 assert.equal(spool.state, 'perched');
 assert.equal(spool.flowers.length, 3);

 // Advance to trigger flight
 let visitedDifferentHeights = false;
 for (let f = 1; f <= 900; f++) {
  advanceCreatures(agents, 1/60, f / 60, null, 1200, 4000);
  if (spool.y > 600) visitedDifferentHeights = true;
 }
 assert.ok(visitedDifferentHeights, 'Spool flew down to visit lower component perches');
});

test('creatures remain calm during active interaction and initiate mature actions when idle', () => {
 const anchor = { x: 300, y: 500 };
 const agents = createCreatures(1200, 3000, {
  web: anchor,
  webs: [anchor, { x: 800, y: 500 }],
  flowers: [{ x: 350, y: 600 }, { x: 750, y: 600 }]
 });
 const [pip, spool] = agents;

 // Simulate 120 frames with isIdle = false (user active)
 for (let f = 1; f <= 120; f++) {
  advanceCreatures(agents, 1/60, f / 60, null, 1200, 3000, false);
  assert.equal(pip.state, 'resting');
  assert.equal(spool.state, 'perched');
  assert.ok(Math.hypot(pip.x - (anchor.x - 24), pip.y - (anchor.y + 27)) < 5);
 }

 // Trigger idle mode
 pip.patrolAt = 2.0;
 pip.actionCount = 1; // next action will be plumb_line (actionCount % 2 === 0)
 let sawPlumbLine = false;
 let maxPlumbY = 0;

 for (let f = 121; f <= 300; f++) {
  const t = f / 60;
  advanceCreatures(agents, 1/60, t, null, 1200, 3000, true);
  if (pip.state === 'plumb_line') {
   sawPlumbLine = true;
   maxPlumbY = Math.max(maxPlumbY, pip.y);
  }
 }

 assert.ok(sawPlumbLine, 'Pip executed craftsman plumb-line descent during idle');
 assert.ok(maxPlumbY > anchor.y + 50, 'Pip descended deeply along the plumb line');
});

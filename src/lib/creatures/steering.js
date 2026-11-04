const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
export function createCreatures(width,height,habitat=null){
 const homes=habitat||{web:{x:width-32,y:150},flowers:[{x:32,y:height*.7},{x:width-38,y:height*.8}]};
 return [{name:'Pip',kind:'spider',x:homes.web.x-24,y:homes.web.y+27,vx:0,vy:0,state:'resting',until:.6,phase:0,speed:110,home:{...homes.web},webs:homes.webs,anchor:0,patrolAt:3.5,thread:36},{name:'Spool',kind:'butterfly',x:homes.flowers[0].x,y:homes.flowers[0].y-7,vx:0,vy:0,state:'perched',until:1.4,phase:0,speed:170,target:0,visits:0,flowers:homes.flowers.map(p=>({...p}))}];
}
export function advanceCreatures(agents,seconds,time,pointer,width,height){
 let left=clamp(Number.isFinite(seconds)?seconds:0,0,.2);
 while(left>0){const dt=Math.min(left,1/120);left-=dt;
  for(const a of agents){
   const distance=pointer?Math.hypot(a.x-pointer.x,a.y-pointer.y):Infinity;
   if(a.kind==='spider'){
    if (a.webs?.length > 1 && time >= a.patrolAt && a.state !== 'retreating') {
      const patrol = a.patrol || a.webs.map((_, i) => i);
      a.previousAnchor = a.anchor;
      a.anchor = patrol[(patrol.indexOf(a.anchor) + 1) % patrol.length];
      a.home = a.webs[a.anchor];
      a.speed = Math.min(680, Math.max(110, Math.hypot(a.home.x - a.x, a.home.y - a.y) / 1.8));
      a.state = 'traversing';
      a.until = time + 3.2;
      a.patrolAt = time + 6;
    }
    if(distance<64&&a.state!=='retreating'){a.state='retreating';a.until=time+1.5;}
    if(time>=a.until){a.state=a.state==='resting'?'descending':a.state==='descending'?'returning':'resting';a.until=time+(a.state==='resting'?2:2.4);}
    if (a.state !== 'traversing') a.speed = 110;
    const hanging=a.state==='descending'||a.state==='traversing';a.thread=hanging?100:36;
    const retreating=a.state==='retreating';
    const targetX=a.home.x-(retreating?10:24)+(hanging?Math.sin(time*3)*10:0);
    const targetY=a.home.y+(retreating?10:hanging?70:27);
    // Gravity loads the silk; spring tension supports it at the chosen length.
    const ax=(targetX-a.x)*18,ay=(targetY-20-a.y)*18+360;
    a.vx=(a.vx+ax*dt)*Math.exp(-7*dt);a.vy=(a.vy+ay*dt)*Math.exp(-7*dt);
   }else{
    const spider = agents[0];
    const silk = spider.webs?.length > 1 ? { x: spider.home.x - 32, y: spider.home.y + 47 } : null;
    if (a.state === 'snared') {
      if (time < a.until) continue;
      a.state = 'fleeing';
      a.until = time + 1.2;
      a.escape = { x: a.x + (a.x < width / 2 ? 55 : -55), y: a.y + 45 };
    }
    if(a.state==='perched'){
     const flower=a.flowers[a.target];a.x=flower.x;a.y=flower.y-7;a.vx=a.vy=0;
     if(distance<55){a.state='fleeing';a.until=time+1.2;a.escape={x:a.x+(pointer.x>a.x?-58:58),y:a.y-65};a.target=(a.target+1)%a.flowers.length;}
     else if(time>=a.until){a.visits++;a.target=(a.target+1)%a.flowers.length;a.state='flying';a.until=time+18;}
     else continue;
    }
    if(distance<45&&a.state!=='fleeing'){a.state='fleeing';a.until=time+1.2;a.escape={x:a.x+(pointer.x>a.x?-58:58),y:a.y-65};}
    else if(a.state==='fleeing'&&time>a.until){a.state='flying';a.until=time+18;}
    else if(pointer&&distance>64&&distance<150&&a.state==='flying'){a.state='curious';a.until=time+1.2;}
    else if(a.state==='curious'&&time>a.until){a.state='returning';a.until=time+18;}
    const flower=a.flowers[a.target];let tx=flower.x,ty=flower.y-7;
    if(a.state==='curious'&&pointer){tx=pointer.x-75;ty=pointer.y-50;}
    if(a.state==='fleeing'){tx=a.escape.x;ty=a.escape.y;}
    if(a.state==='flying'){ty-=Math.min(38,Math.abs(tx-a.x)*.45)*(.7+.3*Math.sin(time*7));}
    if (silk && a.state === 'flying' && a.visits % 3 === 1) {
      a.snare ||= silk;
      tx = a.snare.x;
      ty = a.snare.y;
      if (Math.hypot(tx - a.x, ty - a.y) < 14) {
        a.snare = null;
        a.state = 'snared';
        a.until = time + .95;
        a.vx = a.vy = 0;
        a.visits++;
        continue;
      }
    }
    const dx=tx-a.x,dy=ty-a.y,dist=Math.max(1,Math.hypot(dx,dy)),desired=Math.min(a.speed,dist*2);
    const flap=Math.sin(time*27);const lift=340+flap*35;
    a.vx+=(dx/dist*desired-a.vx)*3*dt;a.vy+=((dy/dist*desired-a.vy)*3+340-lift)*dt;
    if(!['curious','fleeing'].includes(a.state)&&Math.hypot(flower.x-a.x,flower.y-7-a.y)<7&&Math.hypot(a.vx,a.vy)<30){a.state='perched';a.speed=170;a.until=time+1.2+(a.visits%3)*.4;a.x=flower.x;a.y=flower.y-7;a.vx=a.vy=0;}
   }
   const speed=Math.hypot(a.vx,a.vy);if(speed>a.speed){a.vx*=a.speed/speed;a.vy*=a.speed/speed;}
   a.x=clamp(a.x+a.vx*dt,16,Math.max(16,width-16));a.y=clamp(a.y+a.vy*dt,100,Math.max(100,height-40));a.phase+=Math.hypot(a.vx,a.vy)*dt*.09;
  }
 }
 return agents;
}

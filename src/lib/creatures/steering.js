const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
export function createCreatures(width,height,habitat=null){
 const homes=habitat||{web:{x:width-32,y:150},flowers:[{x:32,y:height*.7},{x:width-38,y:height*.8}]};
 return [{name:'Pip',kind:'spider',x:homes.web.x-24,y:homes.web.y+27,vx:0,vy:0,state:'resting',until:10,phase:0,speed:85,home:{...homes.web},thread:36},{name:'Spool',kind:'butterfly',x:homes.flowers[0].x,y:homes.flowers[0].y-7,vx:0,vy:0,state:'perched',until:12,phase:0,speed:150,target:0,visits:0,flowers:homes.flowers.map(p=>({...p}))}];
}
export function advanceCreatures(agents,seconds,time,pointer,width,height){
 let left=clamp(Number.isFinite(seconds)?seconds:0,0,.06);
 while(left>0){const dt=Math.min(left,1/120);left-=dt;
  for(const a of agents){
   const distance=pointer?Math.hypot(a.x-pointer.x,a.y-pointer.y):Infinity;
   if(a.kind==='spider'){
    if(distance<100&&a.state!=='retreating'){a.state='retreating';a.until=time+6;}
    if(time>=a.until){a.state=a.state==='resting'?'descending':a.state==='descending'?'returning':'resting';a.until=time+(a.state==='resting'?12:7);}
    const hanging=a.state==='descending';a.thread=hanging?100:36;
    const targetX=a.home.x-24+(hanging?Math.sin(time*.8)*9:0),targetY=a.home.y+(hanging?95:27);
    // Gravity loads the silk; spring tension supports it at the chosen length.
    const ax=(targetX-a.x)*18,ay=(targetY-20-a.y)*18+360;
    a.vx=(a.vx+ax*dt)*Math.exp(-7*dt);a.vy=(a.vy+ay*dt)*Math.exp(-7*dt);
    if(a.state==='retreating'){a.vx+=(a.home.x-8-a.x)*10*dt;a.vy+=(a.home.y+10-a.y)*10*dt;}
   }else{
    if(a.state==='perched'){
     const flower=a.flowers[a.target];a.x=flower.x;a.y=flower.y-7;a.vx=a.vy=0;
     if(distance<55){a.state='fleeing';a.until=time+2.5;a.target=(a.target+1)%a.flowers.length;}
     else if(time>=a.until){a.visits++;a.target=(a.target+1)%a.flowers.length;a.state='flying';a.until=time+18;}
     else continue;
    }
    if(distance<45&&a.state!=='fleeing'){a.state='fleeing';a.until=time+2.5;}
    else if(a.state==='fleeing'&&time>a.until){a.state='flying';a.until=time+18;}
    else if(pointer&&distance>90&&distance<210&&a.state==='flying'&&a.visits%3===1){a.state='curious';a.until=time+2.5;}
    else if(a.state==='curious'&&time>a.until){a.state='returning';a.until=time+18;}
    const flower=a.flowers[a.target];let tx=flower.x,ty=flower.y-7;
    if(a.state==='curious'&&pointer){tx=pointer.x-75;ty=pointer.y-50;}
    if(a.state==='fleeing'&&pointer){const d=Math.max(1,distance);tx=a.x+(a.x-pointer.x)/d*140;ty=a.y-100;}
    const dx=tx-a.x,dy=ty-a.y,dist=Math.max(1,Math.hypot(dx,dy)),desired=Math.min(a.speed,dist*2);
    const flap=Math.sin(time*27);const lift=340+flap*35;
    a.vx+=(dx/dist*desired-a.vx)*3*dt;a.vy+=((dy/dist*desired-a.vy)*3+340-lift)*dt;
    if(!['curious','fleeing'].includes(a.state)&&dist<7&&Math.hypot(a.vx,a.vy)<30){a.state='perched';a.until=time+10+(a.visits%3)*4;a.x=flower.x;a.y=flower.y-7;a.vx=a.vy=0;}
   }
   const speed=Math.hypot(a.vx,a.vy);if(speed>a.speed){a.vx*=a.speed/speed;a.vy*=a.speed/speed;}
   a.x=clamp(a.x+a.vx*dt,16,Math.max(16,width-16));a.y=clamp(a.y+a.vy*dt,100,Math.max(100,height-40));a.phase+=Math.hypot(a.vx,a.vy)*dt*.09;
  }
 }
 return agents;
}

const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const personalities=[{name:'Pip',kind:'seed',fear:150,speed:150,curiosity:.12,side:0,phase:.3},{name:'Spool',kind:'moth',fear:110,speed:110,curiosity:.5,side:1,phase:2.2}];
export function createCreatures(width,height){return personalities.map((p,i)=>({...p,x:i?width-26:26,y:height*(i?.38:.69),vx:0,vy:0,angle:0,state:'wandering',energy:0}));}
export function advanceCreatures(agents,seconds,time,pointer,width,height,obstacles=[]){
 let left=clamp(Number.isFinite(seconds)?seconds:0,0,.06);
 const minX=16,maxX=Math.max(16,width-16),minY=100,maxY=Math.max(100,height-85);
 while(left>0){const dt=Math.min(left,1/120);left-=dt;
  const forces=agents.map(a=>{
   const margin=width<1024?16:26,homeX=a.side?width-margin:margin,homeY=height*(.5+.27*Math.sin(time*.12+a.phase));
   let ax=(homeX-a.x)*1.7+Math.sin(time*.8+a.phase)*21,ay=(homeY-a.y)*.6+Math.cos(time*.6+a.phase)*16;
   a.state='wandering';a.energy=0;
   if(pointer){let dx=a.x-pointer.x,dy=a.y-pointer.y,d=Math.hypot(dx,dy);if(d<1){dx=a.side?-1:1;dy=Math.sin(a.phase);d=Math.hypot(dx,dy);}if(d<a.fear){const push=(1-d/a.fear)*780;ax+=dx/d*push;ay+=dy/d*push;if((a.x<minX+35&&dx<0)||(a.x>maxX-35&&dx>0))ay+=(dy<0?-1:dy>0?1:a.side?-1:1)*push*.8;if((a.y<minY+30&&dy<0)||(a.y>maxY-30&&dy>0))ax+=(dx<0?-1:1)*push*.8;a.state='fleeing';a.energy=1-d/a.fear;}else if(d<a.fear*1.8){ax-=(dx/d)*a.curiosity*16;ay-=(dy/d)*a.curiosity*16;a.state='watching';}}
   for(const o of agents){if(o===a)continue;const dx=a.x-o.x,dy=a.y-o.y,d=Math.max(1,Math.hypot(dx,dy));if(d<65){ax+=dx/d*(65-d)*4;ay+=dy/d*(65-d)*4;}}
   for(const r of obstacles){const x=clamp(a.x,r.left-22,r.right+22),y=clamp(a.y,r.top-22,r.bottom+22),dx=a.x-x,dy=a.y-y,d=Math.hypot(dx,dy);if(d<42){if(d<1){const distances=[{d:Math.abs(a.x-r.left),x:-1,y:0},{d:Math.abs(a.x-r.right),x:1,y:0},{d:Math.abs(a.y-r.top),x:0,y:-1},{d:Math.abs(a.y-r.bottom),x:0,y:1}].sort((x,y)=>x.d-y.d);ax+=distances[0].x*600;ay+=distances[0].y*600;}else{ax+=dx/d*(42-d)*12;ay+=dy/d*(42-d)*12;}}}
   if(a.x<minX+8)ax+=200;if(a.x>maxX-8)ax-=200;if(a.y<minY+15)ay+=220;if(a.y>maxY-15)ay-=220;
   return {ax,ay};
  });
  agents.forEach((a,i)=>{a.vx=(a.vx+forces[i].ax*dt)*Math.exp(-2.6*dt);a.vy=(a.vy+forces[i].ay*dt)*Math.exp(-2.6*dt);const speed=Math.hypot(a.vx,a.vy),max=a.speed;if(speed>max){a.vx*=max/speed;a.vy*=max/speed;}a.x=clamp(a.x+a.vx*dt,minX,maxX);a.y=clamp(a.y+a.vy*dt,minY,maxY);if(speed>2)a.angle=Math.atan2(a.vy,a.vx);});
 }
 return agents;
}

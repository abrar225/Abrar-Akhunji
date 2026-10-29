const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
export function scatterGlyphs(points,width,height,center=null,intensity=.75) {
 const cx=center?.x??width/2,cy=center?.y??height/2,feel=clamp(intensity,.25,1.2);
 points.forEach((p,i)=>{let dx=p.homeX-cx,dy=p.homeY-cy,d=Math.hypot(dx,dy);if(d<1){dx=Math.cos(i*2.4);dy=Math.sin(i*2.4);d=1;}const power=(center?Math.max(0,1-d/210)*700:320+(i%17)*17)*feel;p.vx+=dx/d*power;p.vy+=dy/d*power;});
}
export function advanceGlyphs(points,seconds,pointer,width,height,intensity=.75) {
 let remaining=clamp(Number.isFinite(seconds)?seconds:0,0,.08);const feel=clamp(intensity,.25,1.2),radius=Math.min(170,Math.max(100,width*.2))*(.7+feel*.5);
 while(remaining>0){const dt=Math.min(1/120,remaining);remaining-=dt;
  points.forEach((p,i)=>{let ax=(p.homeX-p.x)*85,ay=(p.homeY-p.y)*85;
   if(pointer){let dx=p.x-pointer.x,dy=p.y-pointer.y,d=Math.hypot(dx,dy);if(d<.1){dx=Math.cos(i);dy=Math.sin(i);d=1;}if(d<radius){const strength=(1-d/radius)*6500*feel*(1+Math.min(1,pointer.speed||0)*.35);ax+=dx/d*strength;ay+=dy/d*strength;}}
   const damp=Math.exp(-17*dt);p.vx=clamp((p.vx+ax*dt)*damp,-900,900);p.vy=clamp((p.vy+ay*dt)*damp,-900,900);const x=p.x+p.vx*dt,y=p.y+p.vy*dt;p.x=clamp(x,2,width-2);p.y=clamp(y,2,height-2);if(x!==p.x)p.vx*=.3;if(y!==p.y)p.vy*=.3;
  });
 }
}

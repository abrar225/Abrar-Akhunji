export function paintHabitats(ctx,agents,flowers,time,scroll,ink,blue,paper){
 ctx.lineWidth=.8;
 const spider=agents[0];if(spider){const h=spider.home;ctx.strokeStyle=ink;ctx.globalAlpha=.2;
  for(let i=0;i<6;i++){const angle=Math.PI/2+i*Math.PI/10;ctx.beginPath();ctx.moveTo(h.x,h.y);ctx.lineTo(h.x+Math.cos(angle)*68,h.y+Math.sin(angle)*68);ctx.stroke();}
  for(const radius of [18,34,50,66]){ctx.beginPath();ctx.arc(h.x,h.y,radius,Math.PI/2,Math.PI);ctx.stroke();}ctx.globalAlpha=.65;ctx.beginPath();ctx.moveTo(h.x-24,h.y+18);ctx.lineTo(spider.x,spider.y-9);ctx.stroke();ctx.globalAlpha=1;
 }
 for(const f of flowers){ctx.save();ctx.translate(f.x,f.y);ctx.strokeStyle=ink;ctx.globalAlpha=.65;ctx.beginPath();ctx.moveTo(0,42);ctx.quadraticCurveTo(-6,20,0,0);ctx.stroke();ctx.beginPath();ctx.ellipse(-7,28,8,3,-.5,0,Math.PI*2);ctx.stroke();ctx.globalAlpha=1;for(let i=0;i<6;i++){const a=i*Math.PI/3;ctx.fillStyle=paper;ctx.strokeStyle=blue;ctx.beginPath();ctx.ellipse(Math.cos(a)*6,Math.sin(a)*6,5,3,a,0,Math.PI*2);ctx.fill();ctx.stroke();}ctx.fillStyle=ink;ctx.beginPath();ctx.arc(0,0,2,0,Math.PI*2);ctx.fill();ctx.restore();}
 for(const a of agents){if(a.y-scroll < -120||a.y-scroll>innerHeight+120)continue;ctx.save();ctx.translate(a.x,a.y);ctx.strokeStyle=ink;ctx.fillStyle=ink;ctx.lineWidth=1.4;
  if(a.kind==='spider'){
   for(const side of [-1,1])for(let i=0;i<4;i++){const gait=Math.sin(a.phase+(i%2)*Math.PI)*Math.min(3,Math.hypot(a.vx,a.vy)*.1),rootY=-4+i*3;ctx.beginPath();ctx.moveTo(side*3,rootY);ctx.lineTo(side*(11+i%2*3),rootY-9+i*4+gait);ctx.lineTo(side*(18-i%2*2),rootY-14+i*7-gait);ctx.stroke();}
   ctx.beginPath();ctx.ellipse(0,4,5,8,0,0,Math.PI*2);ctx.ellipse(0,-5,4,4.5,0,0,Math.PI*2);ctx.fill();ctx.fillStyle=blue;ctx.beginPath();ctx.ellipse(0,4,1.4,4,0,0,Math.PI*2);ctx.fill();ctx.fillStyle=paper;for(const x of [-1.5,1.5]){ctx.beginPath();ctx.arc(x,-6,.8,0,Math.PI*2);ctx.fill();}
  }else{
   ctx.rotate(a.state==='perched'?-.15:Math.max(-.35,Math.min(.35,a.vx*.003)));const opening=a.state==='perched'?.35+.13*Math.sin(time*1.5):.22+.78*Math.abs(Math.sin(time*13));
   for(const side of [-1,1]){ctx.save();ctx.scale(side*opening,1);ctx.fillStyle=blue;ctx.strokeStyle=ink;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(0,-4);ctx.bezierCurveTo(20,-30,30,-17,23,-5);ctx.bezierCurveTo(19,1,12,2,2,2);ctx.bezierCurveTo(25,0,24,22,13,17);ctx.bezierCurveTo(6,15,3,6,0,3);ctx.closePath();ctx.fill();ctx.stroke();ctx.strokeStyle=paper;ctx.globalAlpha=.65;for(let i=0;i<3;i++){ctx.beginPath();ctx.moveTo(2,0);ctx.lineTo(18+i*2,-8-i*5);ctx.stroke();}ctx.globalAlpha=1;for(const [x,y]of [[21,-12],[15,12],[19,-4]]){ctx.fillStyle=paper;ctx.beginPath();ctx.arc(x,y,1.4,0,Math.PI*2);ctx.fill();}ctx.restore();}
   ctx.fillStyle=ink;ctx.beginPath();ctx.ellipse(0,1,2,9,0,0,Math.PI*2);ctx.fill();for(const s of [-1,1]){ctx.beginPath();ctx.moveTo(s,-6);ctx.quadraticCurveTo(s*4,-16,s*7,-14);ctx.stroke();if(a.state==='perched'){ctx.beginPath();ctx.moveTo(s,5);ctx.lineTo(s*4,8);ctx.stroke();}}
  }ctx.restore();
 }
}

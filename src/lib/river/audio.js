import { siteAudio } from '../audio/siteAudio.js';
const clamp=(x,a,b)=>Math.max(a,Math.min(b,Number.isFinite(x)?x:a));
export function riverEnvelope(kind,intensity=.6) {return {duration:kind==='splash'?.62:kind==='breach'?.36:.3,peak:(kind==='splash'?.08:.055)*clamp(intensity,.1,1),start:kind==='splash'?720:kind==='breach'?260:490,end:kind==='splash'?120:kind==='breach'?660:135};}
export function createRiverAudio() {
 return {
  async enable(){siteAudio.set('river',true);siteAudio.set('effects',true);if(siteAudio.getSnapshot().enabled)return true;return siteAudio.enable({music:false});},
  mute(){siteAudio.set('river',false);},
  volume(value){siteAudio.set('riverVolume',value);},
  active(value){siteAudio.riverActive(value);},
  cue(kind,x,intensity){return siteAudio.cue(kind,{pan:x,gain:intensity,group:'river',throttle:.24});},
  dispose(){siteAudio.riverActive(false);siteAudio.cancel('river');},
 };
}

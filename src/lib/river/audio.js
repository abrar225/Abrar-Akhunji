import { siteAudio } from '../audio/siteAudio.js';
const clamp=(x,a,b)=>Math.max(a,Math.min(b,Number.isFinite(x)?x:a));
export function riverEnvelope(kind,intensity=.6) {return {duration:kind==='splash'?.62:kind==='breach'?.36:.3,peak:(kind==='splash'?.08:.055)*clamp(intensity,.1,1),start:kind==='splash'?720:kind==='breach'?260:490,end:kind==='splash'?120:kind==='breach'?660:135};}
/** Bounded procedural water cues; stereo position and impact follow the simulation. */
export function synthesizeRiverCue(ctx,destination,kind,x=0,intensity=.6) {
 const shape=riverEnvelope(kind,intensity),t=ctx.currentTime;
 const pan=ctx.createStereoPanner?.()||ctx.createGain();if(pan.pan)pan.pan.value=clamp(x,-1,1);pan.connect(destination);
 const gain=ctx.createGain();gain.gain.setValueAtTime(.0001,t);gain.gain.exponentialRampToValueAtTime(shape.peak,t+.012);gain.gain.exponentialRampToValueAtTime(.0001,t+shape.duration);gain.connect(pan);
 const osc=ctx.createOscillator();osc.type='sine';osc.frequency.setValueAtTime(shape.start,t);osc.frequency.exponentialRampToValueAtTime(shape.end,t+shape.duration*.8);osc.connect(gain);osc.start(t);osc.stop(t+shape.duration);
 const noise=ctx.createBuffer(1,Math.ceil(ctx.sampleRate*shape.duration),ctx.sampleRate),data=noise.getChannelData(0);let seed=9127;
 for(let i=0;i<data.length;i++){seed=(seed*1664525+1013904223)>>>0;data[i]=(seed/4294967296*2-1)*.5;}
 const source=ctx.createBufferSource();source.buffer=noise;const filter=ctx.createBiquadFilter();filter.type='bandpass';filter.Q.value=.65;filter.frequency.setValueAtTime(kind==='splash'?1500:400,t);filter.frequency.exponentialRampToValueAtTime(180,t+shape.duration);source.connect(filter);filter.connect(gain);source.start(t);source.stop(t+shape.duration);
 source.onended=()=>{source.disconnect();filter.disconnect();osc.disconnect();gain.disconnect();pan.disconnect();};
 return shape;
}
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

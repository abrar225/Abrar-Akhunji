const clamp=(n,a,b)=>Math.max(a,Math.min(b,Number.isFinite(n)?n:a));
const listeners=new Set(),buffers=new Map(),pending=new Map(),voices=new Set(),throttles=new Map();
function pref(key,fallback){try{const value=localStorage.getItem('portfolio_'+key);return value===null?fallback:JSON.parse(value);}catch{return fallback;}}
let state=Object.freeze({enabled:false,loading:false,music:pref('music',true),effects:pref('effects',true),musicVolume:clamp(pref('musicVolume',.18),0,.5),effectsVolume:clamp(pref('effectsVolume',.35),0,.7),river:true,riverVolume:.25,error:'',narrating:false,cityPlaying:false});
let ctx=null,master=null,musicBus=null,fxBus=null,track=null,manifest=null,loading=null,token=0,active=true,riverActive=false,pops=0;
const publish=change=>{state=Object.freeze({...state,...change});listeners.forEach(fn=>fn());};
const save=(key,value)=>{try{localStorage.setItem('portfolio_'+key,JSON.stringify(value));}catch{/* private storage */}};
const available=()=>state.enabled&&active&&!state.narrating&&ctx?.state==='running';
function levels(){if(!ctx)return;musicBus.gain.setTargetAtTime(state.enabled&&state.music?state.musicVolume*(state.narrating ? .12 : state.cityPlaying ? .6 : 1):0,ctx.currentTime,.12);fxBus.gain.setTargetAtTime(state.enabled&&state.effects?state.effectsVolume*(state.narrating ? .08 : 1):0,ctx.currentTime,.035);}
function stopVoice(voice){try{voice.source.stop();}catch{/* ended */}voice.source.disconnect();voice.gain.disconnect();voice.pan.disconnect();voices.delete(voice);}
function stopGroup(group){for(const v of [...voices])if(!group||v.group===group)stopVoice(v);}
async function loadAsset(key){
 if(buffers.has(key))return buffers.get(key);if(pending.has(key))return pending.get(key);
 const asset=manifest?.assets[key];if(!asset)throw new Error('The sound collection is unavailable.');
 const promise=(async()=>{const response=await fetch(asset.url);if(!response.ok)throw new Error('The sound collection could not load.');const buffer=await ctx.decodeAudioData(await response.arrayBuffer());buffers.set(key,buffer);return buffer;})();pending.set(key,promise);try{return await promise;}finally{pending.delete(key);}
}
async function prepare(){
 if(loading)return loading;
 loading=(async()=>{const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)throw new Error('This browser does not support sound playback.');if(!ctx){ctx=new Audio();master=ctx.createGain();master.gain.value=.65;const limiter=ctx.createDynamicsCompressor();limiter.threshold.value=-12;limiter.knee.value=12;limiter.ratio.value=12;master.connect(limiter);limiter.connect(ctx.destination);musicBus=ctx.createGain();fxBus=ctx.createGain();musicBus.gain.value=fxBus.gain.value=0;musicBus.connect(master);fxBus.connect(master);}await ctx.resume();if(!manifest){const response=await fetch('/assets/audio/flow-manifest.json');if(!response.ok)throw new Error('The sound collection could not load.');manifest=await response.json();}await Promise.all(Object.keys(manifest.assets).filter(key=>key!=='music').map(loadAsset));if(state.music)await loadAsset('music');})();
 try{await loading;}finally{loading=null;}
}
function startMusic(){if(!ctx||!state.enabled||!state.music||!buffers.has('music')||track)return;const source=ctx.createBufferSource();source.buffer=buffers.get('music');source.loop=true;source.connect(musicBus);source.start();track=source;}
function stopMusic(){if(track){try{track.stop();}catch{/* ended */}track.disconnect();track=null;}}
export function cityBirthTime(day){return 200+day.week*30+day.weekday*55;}
export function cityCrossings(days,from,to){return days.filter(day=>day.available&&day.count>0&&cityBirthTime(day)>from&&cityBirthTime(day)<=to);}
export const siteAudio={
 subscribe(fn){listeners.add(fn);return()=>listeners.delete(fn);},getSnapshot(){return state;},
 async enable(options={}){const current=++token;if(options.music!==undefined)publish({music:options.music});publish({loading:true,error:''});try{await prepare();if(current!==token)return false;publish({enabled:true,loading:false});levels();startMusic();if(!active)await ctx.suspend();return true;}catch(e){if(current===token){publish({enabled:false,loading:false,error:e.message||'Sound is unavailable. Try again.'});levels();if(ctx)ctx.suspend().catch(()=>{});}return false;}},
 disable(){token++;publish({enabled:false,loading:false});levels();stopMusic();stopGroup();if(ctx)ctx.suspend().catch(()=>{});},
 async set(key,value){if(!['music','effects','musicVolume','effectsVolume','river','riverVolume'].includes(key))return;if(key.endsWith('Volume'))value=clamp(Number(value),0,key==='musicVolume' ? .5 : .7);publish({[key]:value});if(key!=='river')save(key,value);levels();if(key==='music'){if(value&&state.enabled){try{await loadAsset('music');if(state.music&&state.enabled)startMusic();}catch{publish({error:'Music could not load. Effects are still available.'});}}else stopMusic();}if(key==='effects'&&!value)stopGroup();},
 active(value){active=value;if(!ctx)return;if(!value){stopGroup();ctx.suspend().catch(()=>{});}else if(state.enabled)ctx.resume().catch(()=>{});},
 narration(value){publish({narrating:value});levels();if(value)stopGroup();},
 riverActive(value){riverActive=value;},
 cityActive(value){if(state.cityPlaying!==value){publish({cityPlaying:value});levels();}},
 cancel(group){stopGroup(group);},
 cue(key,{pan=0,rate=1,gain=1,group='interface',throttle=.09,offset=0}={}){
  if(!available()||!state.effects||!buffers.has(key))return false;if(group==='river'&&(!state.river||!riverActive))return false;
  const now=ctx.currentTime,prior=throttles.get(key)??-100;if(throttle&&now-prior<throttle)return false;throttles.set(key,now);
  if(voices.size>=48)stopVoice(voices.values().next().value);
  const source=ctx.createBufferSource(),level=ctx.createGain(),stereo=ctx.createStereoPanner?.()||ctx.createGain();source.buffer=buffers.get(key);source.playbackRate.value=clamp(rate,.65,1.8);level.gain.value=clamp(gain*(group==='river'?state.riverVolume/.35:1),0,1);if(stereo.pan)stereo.pan.value=clamp(pan,-.85,.85);source.connect(level);level.connect(stereo);stereo.connect(fxBus);const voice={source,gain:level,pan:stereo,group};voices.add(voice);source.onended=()=>{source.disconnect();level.disconnect();stereo.disconnect();voices.delete(voice);};source.start(now+clamp(offset,0,.05));if(key==='building')pops++;return true;
 },
 city(days,weeks){if(!days.length)return;const notes=[1,1.12246,1.25992,1.49831,1.68179];days.forEach((day,i)=>this.cue('building',{rate:notes[(day.weekday+day.week)%notes.length],pan:day.week/Math.max(1,weeks-1)*1.6-.8,gain:.45/Math.sqrt(Math.max(1,days.length/2)),group:'city',throttle:0,offset:Math.min(.025,i*.002)}));},
 metrics(){return {context:ctx?.state||'none',voices:voices.size,music:Boolean(track),pops,loaded:buffers.size};},
};

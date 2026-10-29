import { siteAudio } from './audio/siteAudio';
/** Existing controls share the same opt-in Flow Music sound collection. */
export const soundFX={
 isMuted:()=>!siteAudio.getSnapshot().enabled,
 toggleMute(){if(siteAudio.getSnapshot().enabled){siteAudio.disable();return true;}siteAudio.enable({music:false});return false;},
 playHover:()=>siteAudio.cue('hover',{gain:.3,throttle:.14}),
 playClick:()=>siteAudio.cue('click'),
 playSciFi:()=>siteAudio.cue('chapter'),
 playToggle:()=>siteAudio.cue('select'),
 playStageMorph:()=>siteAudio.cue('section'),
 playDolphinBreach:intensity=>siteAudio.cue('breach',{gain:intensity,group:'river'}),
 playDolphinSplash:intensity=>siteAudio.cue('splash',{gain:intensity,group:'river'}),
 playFishSchool:intensity=>siteAudio.cue('ripple',{gain:intensity,group:'river'}),
};

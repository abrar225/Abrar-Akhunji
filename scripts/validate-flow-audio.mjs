import fs from 'node:fs';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
const manifest=JSON.parse(fs.readFileSync('public/assets/audio/flow-manifest.json','utf8')),report={assets:[],source:manifest.source};
for(const [name,asset] of Object.entries(manifest.assets)){
 const file='public'+asset.url,hash=crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');if(hash!==asset.sha256)throw new Error(name+' hash mismatch');
 const raw=execFileSync('ffmpeg',['-v','error','-i',file,'-map','0:a:0','-ar','48000','-ac','2','-f','f32le','-'],{maxBuffer:50*1024*1024}),samples=new Float32Array(raw.buffer,raw.byteOffset,raw.byteLength/4);
 let peak=0,sum=0,finite=true;for(const sample of samples){finite&&=Number.isFinite(sample);peak=Math.max(peak,Math.abs(sample));sum+=sample*sample;}
 const duration=samples.length/2/48000,rms=Math.sqrt(sum/samples.length),tailPeak=Math.max(...samples.slice(-10).map(Math.abs)),boundary=Math.max(Math.abs(samples[0]-samples.at(-2)),Math.abs(samples[1]-samples.at(-1)));
 if(!finite||peak>1||rms<.00001)throw new Error(name+' is silent, clipped or non-finite');if(name==='music'&&Math.abs(duration-60)>.002)throw new Error('Music loop must be 60 seconds');if(name==='music'&&boundary>.004)throw new Error('Music loop boundary is too abrupt');if(name!=='music'&&(peak>.35||tailPeak>.0001))throw new Error(name+' exceeds the effect headroom or tail limit');if(name==='building'&&duration>.09)throw new Error('Building cue is too long for the city polyphony');
 report.assets.push({name,duration,peak,rms,tailPeak,boundary,bytes:asset.bytes});
}
report.verdict='PASS';fs.mkdirSync('docs/sound-and-creatures/verification',{recursive:true});fs.writeFileSync('docs/sound-and-creatures/verification/assets.json',JSON.stringify(report,null,2));console.log(`VERDICT: PASS — ${report.assets.length} decoded, finite, non-silent audio files with matching hashes.`);

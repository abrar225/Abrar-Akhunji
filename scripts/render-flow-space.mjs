import fs from 'node:fs';
import path from 'node:path';
import { stripTypeScriptTypes } from 'node:module';
import { chromium } from 'playwright';
// These are the unmodified files exported from the user's generated Flow Space.
const directory='docs/sound-and-creatures/flow-space-source';
const files=['soundDefs.ts','soundSynth.ts','wavEncoder.ts','zipWriter.ts'];
const code=files.map(file=>stripTypeScriptTypes(fs.readFileSync(path.join(directory,file),'utf8')).replace(/^export\s+/gm,'')).join('\n');
const browser=await chromium.launch();
try{
 const page=await browser.newPage();await page.goto('about:blank');await page.addScriptTag({content:`(()=>{${code};window.FlowKit={SOUND_ITEMS,renderSoundBuffer,encodeAudioBufferToWav,createZipArchive};})();`});
 const result=await page.evaluate(async()=>{const {SOUND_ITEMS,renderSoundBuffer,encodeAudioBufferToWav,createZipArchive}=window.FlowKit,entries=[];for(const sound of SOUND_ITEMS){const buffer=await renderSoundBuffer(sound.id,sound.duration);entries.push({filename:sound.filename,data:encodeAudioBufferToWav(buffer)});}return {zip:Array.from(createZipArchive(entries)),files:entries.map(e=>({name:e.filename,bytes:e.data.length}))};});
 const output=process.argv[2]||'/tmp/portfolio-flow/portfolio-sound-kit.zip';fs.mkdirSync(path.dirname(output),{recursive:true});fs.writeFileSync(output,Buffer.from(result.zip));console.log(JSON.stringify({output,files:result.files},null,2));
}finally{await browser.close();}

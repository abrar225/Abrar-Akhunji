import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const base = process.env.PATCHBAY_ORIGIN || 'http://127.0.0.1:5183';
const directory = 'docs/v5/evidence/silhouettes';
const scenes = {
  arrival:'#home', crossing:'.patch-paper', project:'#work', index:'.patch-home-collection',
  engineering:'#engineering', writing:'#writing', profile:'#about-me', contact:'#playground',
};
await mkdir(directory,{recursive:true});
const browser=await chromium.launch({channel:'chrome'});
try {
  for(const [width,height] of [[1440,900],[390,844]]){
    const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce',isMobile:width<500,hasTouch:width<500});
    await page.goto(base,{waitUntil:'domcontentloaded'});
    await page.locator('#patch-name').waitFor();
    await page.evaluate(()=>document.fonts.ready);
    for(const [name,selector] of Object.entries(scenes)){
      const section=page.locator(selector);
      await section.scrollIntoViewIfNeeded();
      const top=await section.evaluate(el=>el.getBoundingClientRect().top+scrollY);
      await page.evaluate(y=>scrollTo(0,Math.max(0,y-58)),top);
      await page.waitForTimeout(150);
      await page.screenshot({path:join(directory,`${width}-${name}.jpg`),quality:76});
    }
    await page.close();
  }
} finally { await browser.close(); }

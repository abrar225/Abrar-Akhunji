import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { chromium, firefox, webkit } from 'playwright';

const origin = process.env.PATCHBAY_ORIGIN || 'http://127.0.0.1:5183';
const engine = process.env.PATCHBAY_BROWSER || 'chromium';
const permalink = path => new URL(path, origin).href;
const sitemap = await readFile('dist/sitemap.xml','utf8');
const canonical = [...sitemap.matchAll(/<loc>https:\/\/abrarakhunji\.com([^<]+)<\/loc>/g)].map(match=>match[1]);
const recovery = ['/v5-no-page/','/work/v5-no-project/','/blog/v5-no-note/','/404.html'];
const states = ['/?project=framecast-studio','/work/?category=COMPUTER%20VISION','/blog/?q=v5-no-matching-article','/blog/?tag=AI'];
const screenshots = new Map(Object.entries({
  '/':'home','/work/':'work','/about/':'about','/contact/':'contact','/hire/':'hire','/blog/':'writing',
  '/privacy/':'privacy','/terms/':'terms','/work/packetlark/':'case',
  [canonical.find(path=>path.includes('/blog/') && path!=='/blog/') || '/blog/']:'article',
  '/v5-no-page/':'client-404','/404.html':'static-404',
  '/blog/?q=v5-no-matching-article':'search-empty','/work/?category=COMPUTER%20VISION':'work-filter',
}));
const directory = process.env.PATCHBAY_CAPTURE_DIR || `docs/v5/evidence/routes-${engine}`;
await mkdir(directory,{recursive:true});
const browserType = {chromium,firefox,webkit}[engine];
if (!browserType) throw new Error(`Unknown engine: ${engine}`);
const browser = await browserType.launch(engine==='chromium'?{channel:'chrome'}:{});
const results=[];
const captures=process.argv.includes('--capture');
const all=process.argv.includes('--all');
try {
  for (const [width,height] of [[1440,900],[390,844]]) {
    const touch = width<500;
    const context=await browser.newContext({ viewport:{width,height},hasTouch:touch,isMobile:touch&&engine!=='firefox' });
    await context.route('**/*',route=>new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
    const page=await context.newPage();
    for (const path of new Set(all ? [...canonical,...states,...recovery] : screenshots.keys())) {
      const errors=[];
      const addError = error => errors.push(error.message);
      const logIssue = message => { if(message.type()==='error' && !message.text().startsWith('Failed to load resource')) errors.push(message.text()); };
      const resources=[];
      const failedResource = response => {
        if (response.status()>=400 && response.request().resourceType()!== 'document' && response.url().startsWith(origin))
          resources.push(`${response.status()} ${response.url()}`);
      };
      page.on('pageerror',addError);
      page.on('console',logIssue);
      page.on('response',failedResource);
      try {
        const response=await page.goto(permalink(path),{waitUntil:'domcontentloaded',timeout:9000});
        if(path!=='/404.html') await page.locator('[data-portfolio-version="v5"] h1').first().waitFor({timeout:4500});
        const state=await page.evaluate(async()=>{
          await document.fonts.ready;
          const root=document.querySelector('[data-portfolio-version="v5"]');
          const local=new Set();
          for(const a of document.querySelectorAll('a[href]')) {
            const url=new URL(a.href);
            if(url.origin===location.origin && !url.pathname.startsWith('/versions/')) local.add(url.pathname);
          }
          return { version:root?.dataset.portfolioVersion ?? null, title:document.title,
            heading:root?.querySelector('h1')?.textContent?.trim(), overflow:document.documentElement.scrollWidth-innerWidth,
            localLinks:[...local],legacy:[...document.querySelectorAll('.signal-shell,.site-header,.site-footer')].map(x=>x.className) };
        });
        if(captures && screenshots.has(path)){
          const label=screenshots.get(path);
          for (const percent of [0,50,100]){
            await page.evaluate(n=>window.scrollTo(0,(document.documentElement.scrollHeight-innerHeight)*n/100),percent);
            await page.waitForTimeout(180);
            await page.screenshot({path:join(directory,`${width}-${label}-${percent}.jpg`),quality:78});
          }
        }
        results.push({path,width,status:response?.status(),...state,errors,resources});
      } catch(error) {
        results.push({path,width,testError:error.message,errors,resources});
      } finally {
        page.off('pageerror',addError); page.off('console',logIssue); page.off('response',failedResource);
      }
    }
    await context.close();
  }
} finally {
  await browser.close();
}
const paths = new Set([...canonical,...recovery,...states]);
const links = new Set(results.flatMap(result=>result.localLinks ?? []).map(link => paths.has(link) ? '' : link).filter(Boolean));
const linkChecks = await Promise.all([...links].map(async path => {
  try { return {path,status:(await fetch(permalink(path),{method:'HEAD'})).status}; }
  catch(error) { return {path,error:error.message}; }
}));
const failure = result => result.testError || result.version!=='v5' || !result.heading || result.overflow ||
  result.legacy?.length || result.errors.length || result.resources.length;
const failed = results.filter(failure);
const brokenLinks=linkChecks.filter(link=>link.error || link.status>=400);
await writeFile(join(directory,'report.json'),JSON.stringify({engine,origin,canonicalCount:canonical.length,results,brokenLinks},null,2)+'\n');
console.log(`${engine} ${results.length} loads, ${failed.length} page findings, ${brokenLinks.length} additional local link failures`);
if(failed.length || brokenLinks.length) process.exitCode=1;

import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { chromium } from 'playwright';

const directory = 'docs/v5/evidence/build-slice';
const origin = process.env.PATCHBAY_ORIGIN || 'http://127.0.0.1:5181';
const browser = await chromium.launch({ channel: 'chrome' });
const reports = [];
await mkdir(directory, { recursive: true });

async function recording(page, context, prefix, mobile, destination) {
  const cdp = await context.newCDPSession(page);
  const frames = [];
  cdp.on('Page.screencastFrame', ({ data, metadata, sessionId }) => {
    frames.push({ data, time: metadata.timestamp });
    void cdp.send('Page.screencastFrameAck', { sessionId }).catch(() => {});
  });
  await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 76, maxWidth: 1120, maxHeight: 844 });
  const { width, height } = page.viewportSize();
  const go = (delta) => cdp.send('Input.synthesizeScrollGesture', {
    x: Math.round(width * .54), y: Math.round(height * .68),
    yDistance: Math.round(-delta), speed: 610, gestureSourceType: mobile ? 'touch' : 'mouse', preventFling: true,
  });
  await page.waitForTimeout(350);
  await go(destination);
  await page.waitForTimeout(550);
  const landing = await page.evaluate(() => scrollY);
  await go(-landing);
  await page.waitForTimeout(500);
  await cdp.send('Page.stopScreencast');
  await cdp.detach();
  assert.ok(frames.length > 30);
  const scratch = await mkdtemp(join(tmpdir(), 'patchbay-slice-'));
  try {
    const paths = [];
    for (const [index, frame] of frames.entries()) {
      const name = `${index}.jpg`;
      await writeFile(join(scratch, name), Buffer.from(frame.data, 'base64'));
      paths.push(`file ${name}`, `duration ${Math.max(.008, (frames[index + 1]?.time ?? frame.time + .3) - frame.time)}`);
      if (index === frames.length - 1) paths.push(`file ${name}`);
    }
    const video = join(process.cwd(),directory,`${prefix}-scroll.mp4`);
    await writeFile(join(scratch,'frames.txt'),paths.join('\n'));
    const encode = spawnSync('ffmpeg',['-hide_banner','-loglevel','error','-y','-f','concat','-safe','1','-i','frames.txt','-vf','fps=30,pad=ceil(iw/2)*2:ceil(ih/2)*2','-pix_fmt','yuv420p',video],{cwd:scratch,encoding:'utf8'});
    assert.equal(encode.status,0,encode.stderr);
    const contactSheet = spawnSync('ffmpeg',['-hide_banner','-loglevel','error','-y','-i',video,'-vf',`fps=8,scale=${mobile ? 118 : 230}:-1,tile=6x4:padding=3`,'-q:v','4','-fps_mode','passthrough',join(directory,`${prefix}-frames-%02d.jpg`)],{encoding:'utf8'});
    assert.equal(contactSheet.status,0,contactSheet.stderr);
  } finally {
    await rm(scratch,{recursive:true,force:true});
  }
  return { frames: frames.length, destination, landing, returnY: await page.evaluate(() => scrollY) };
}

try {
  for (const [width,height] of [[1440,900],[390,844]]) {
    const mobile = width < 500;
    const context = await browser.newContext({ viewport: {width,height}, hasTouch:mobile, isMobile:mobile });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(origin);
    await page.locator('#patch-name').waitFor();
    await page.evaluate(async () => { await document.fonts.ready; });
    const destination = await page.locator('#work').evaluate(el => scrollY + el.getBoundingClientRect().top - 70);
    const stillPositions=[];
    for (const stage of [0,25,50,75,100]) {
      const wanted=destination * stage / 100;
      await page.evaluate(y => scrollTo({top:y,behavior:'instant'}),wanted);
      await page.waitForFunction(y=>Math.abs(scrollY-y)<3,wanted,{timeout:2000});
      await page.waitForTimeout(440);
      const actual=await page.evaluate(()=>scrollY);
      assert.ok(Math.abs(wanted-actual)<3,`Stage ${stage}: expected ${wanted}, recorded ${actual}`);
      stillPositions.push({stage,wanted,actual});
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth),0);
      await page.screenshot({path:join(directory,`${width}-${stage}.jpg`),quality:85});
    }
    await page.evaluate(()=>scrollTo(0,0));
    await page.waitForTimeout(350);
    const movie = await recording(page,context,width,mobile,destination);
    assert.ok(Math.abs(movie.destination-movie.landing)<25 && movie.returnY<20);
    const voice = page.getByRole('button',{name:'Voice Fixo Flow',exact:true});
    if (mobile) await voice.tap(); else { await voice.focus(); await page.keyboard.press('Enter'); }
    await page.locator('#patch-project').filter({hasText:'Fixo Flow'}).waitFor({state:'attached',timeout:3000});
    assert.equal(new URL(page.url()).searchParams.get('project'),'fixo-flow');
    assert.deepEqual(errors,[]);
    reports.push({width,height,movie,stillPositions,alternate:'Fixo Flow',errors});
    const cold = await context.newPage();
    await cold.addInitScript(() => sessionStorage.removeItem('patchbay-arrived'));
    let release;
    const hold = new Promise(resolve => { release = resolve; });
    await cold.route('**/products/packetlark.webp', async request => {
      await hold;
      await request.continue().catch(() => {});
    });
    await cold.goto(origin, {waitUntil:'domcontentloaded'});
    try {
      await cold.getByRole('button',{name:'Skip intro'}).waitFor({timeout:1500});
      await cold.screenshot({path:join(directory,`${width}-preloader.jpg`),quality:85});
      await cold.getByRole('button',{name:'Skip intro'}).click();
      await cold.getByRole('button',{name:'Skip intro'}).waitFor({state:'detached'});
    } finally { release(); }
    await context.close();
  }
} finally {
  await browser.close();
  await writeFile(join(directory,'browser.json'),JSON.stringify(reports,null,2)+'\n');
}

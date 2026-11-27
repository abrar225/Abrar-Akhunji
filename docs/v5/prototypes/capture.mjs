import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const base = process.env.V5_PREVIEW_URL || 'http://127.0.0.1:5181/docs/v5/prototypes/';
const evidence = fileURLToPath(new URL('../evidence/directions/', import.meta.url));
const quick = process.argv.includes('--quick');
const directions = [
  { id: 'a-ascent', page: 'ascent.html', anchor: 'capture' },
  { id: 'a-reverse', page: 'ascent.html?scroll=reverse', anchor: 'capture' },
  { id: 'b-folio', page: 'folio.html', anchor: 'spread' },
  { id: 'c-patchbay', page: 'patchbay.html', anchor: 'output' },
];
const sizes = {
  desktop: { width: 1440, height: 900, isMobile: false, hasTouch: false },
  mobile: { width: 390, height: 844, isMobile: true, hasTouch: true },
};

const browser = await chromium.launch({ channel: 'chrome' });
const reports = [];

async function settle(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map((image) => image.decode()));
  });
}

async function current(page) {
  return page.evaluate(() => {
    const hero = document.querySelector('[data-arrival]');
    const scene = document.querySelector('[data-next]');
    const name = document.querySelector('h1');
    const nav = [...hero.querySelectorAll('nav a')];
    const withinViewport = (el) => {
      const rect = el.getBoundingClientRect();
      return rect.top >= -2 && rect.bottom <= innerHeight + 2 && rect.width > 0;
    };
    return {
      y: scrollY, hero: hero.offsetTop, scene: scene.offsetTop, height: innerHeight,
      heroName: name.innerText.trim().replace(/\s+/g, ' '),
      identityAndActionsVisible: [name, ...nav].every(withinViewport),
      reverse: 'reverse' in document.documentElement.dataset,
      progress: Number(getComputedStyle(scene).getPropertyValue('--p')),
      overflow: document.documentElement.scrollWidth - innerWidth,
    };
  });
}

async function positions(page, direction, device, initial) {
  const folder = join(evidence, direction.id);
  for (const stop of (quick ? [0, 100] : [0, 25, 50, 75, 100])) {
    const top = initial.hero + (initial.scene - initial.hero) * stop / 100;
    await page.evaluate((position) => window.scrollTo(0, position), top);
    await page.waitForTimeout(quick ? 420 : 600);
    const state = await current(page);
    assert.equal(state.overflow, 0, `${direction.id}/${device} at ${stop}% has horizontal overflow`);
    await page.screenshot({ path: join(folder, `${device}-${String(stop).padStart(3, '0')}.jpg`), quality: 88 });
  }
}

async function recording(page, context, direction, device, initial) {
  await page.evaluate((position) => window.scrollTo(0, position), initial.hero);
  await page.waitForTimeout(420);
  const cdp = await context.newCDPSession(page);
  const frames = [];
  cdp.on('Page.screencastFrame', (event) => {
    frames.push({ data: event.data, time: event.metadata.timestamp });
    void cdp.send('Page.screencastFrameAck', { sessionId: event.sessionId }).catch(() => {});
  });
  await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 80, maxWidth: 1120, maxHeight: 820, everyNthFrame: 1 });
  await page.waitForTimeout(250);
  if (direction.id === 'c-patchbay') {
    const button = page.getByRole('button', { name: 'Request PacketLark' });
    if (device === 'mobile') await button.tap();
    else { await button.focus(); await page.keyboard.press('Enter'); }
    assert.equal(await button.getAttribute('aria-pressed'), 'true');
    assert.equal(await page.locator('[data-c-name]').textContent(), 'PacketLark');
    assert.equal(await page.locator('[data-c-decision]').textContent(), 'A local workspace');
    await page.waitForTimeout(670);
  }
  if (device === 'desktop') {
    await page.mouse.move(1000, 265);
    await page.waitForTimeout(300);
    for (let step = 0; step < 25; step += 1) {
      await page.mouse.wheel(0, initial.reverse ? -44 : 44);
      await page.waitForTimeout(26);
    }
  } else {
    for (let swipe = 0; swipe < 2; swipe += 1) {
      const x = 245;
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y: 675 }] });
      for (let step = 1; step <= 22; step += 1) {
        await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y: 675 - 22 * step }] });
        await page.waitForTimeout(14);
      }
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
      await page.waitForTimeout(130);
    }
  }
  await page.waitForTimeout(520);
  const final = await current(page);
  assert.ok(final.progress >= 0.64, `${direction.id}/${device} native input only reached ${final.progress}`);
  await cdp.send('Page.stopScreencast');
  await cdp.detach();
  assert.ok(frames.length > 15, `Only ${frames.length} frames recorded`);
  const temp = await mkdtemp(join(tmpdir(), 'portfolio-v5-recording-'));
  try {
    const fileList = [];
    for (let index = 0; index < frames.length; index += 1) {
      const name = `${String(index).padStart(4, '0')}.jpg`;
      await writeFile(join(temp, name), Buffer.from(frames[index].data, 'base64'));
      fileList.push(`file ${name}`);
      const nextTime = frames[index + 1]?.time ?? (frames[index].time + 0.6);
      fileList.push(`duration ${Math.max(0.016, nextTime - frames[index].time)}`);
      if (index === frames.length - 1) fileList.push(`file ${name}`);
    }
    await writeFile(join(temp, 'frames.txt'), fileList.join('\n'));
    const mp4 = join(evidence, direction.id, `${device}-motion.mp4`);
    const result = spawnSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-f', 'concat', '-safe', '1', '-i', 'frames.txt', '-vf', 'fps=30,pad=ceil(iw/2)*2:ceil(ih/2)*2', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', mp4], { cwd: temp, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr || result.error?.message);
  } finally {
    await rm(temp, { recursive: true, force: true });
  }
  return { final, frameCount: frames.length };
}

try {
  for (const [device, details] of Object.entries(sizes)) {
    for (const direction of directions) {
      await mkdir(join(evidence, direction.id), { recursive: true });
      const { width, height, ...deviceFlags } = details;
      const context = await browser.newContext({ viewport: { width, height }, ...deviceFlags });
      const page = await context.newPage();
      const browserMessages = [];
      page.on('pageerror', (error) => browserMessages.push(error.message));
      page.on('console', (message) => { if (['warning', 'error'].includes(message.type())) browserMessages.push(message.text()); });
      page.on('response', (response) => { if (response.status() >= 400) browserMessages.push(`${response.status()} ${response.url()}`); });
      await page.goto(`${base}${direction.page}`);
      await settle(page);
      const initial = await current(page);
      assert.equal(initial.y, initial.hero, `${direction.id}/${device} initial view is not the hero`);
      assert.equal(initial.heroName, 'Abrar Akhunji');
      assert.ok(initial.identityAndActionsVisible);
      assert.equal(initial.reverse, device === 'desktop' && direction.id === 'a-reverse');
      await positions(page, direction, device, initial);
      const motion = quick ? null : await recording(page, context, direction, device, initial);
      const report = { direction: direction.id, device, initial, motion, browserMessages };
      reports.push(report);
      console.log(JSON.stringify(report));
      await context.close();
    }
  }
} finally {
  await browser.close();
  if (!quick) await writeFile(join(evidence, 'browser-audit.json'), `${JSON.stringify(reports, null, 2)}\n`);
}

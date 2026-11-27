import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { randomInt } from 'node:crypto';
import { copyFile, mkdir, mkdtemp, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { extname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const evidence = fileURLToPath(new URL('../evidence/patchbay/', import.meta.url));
const archive = resolve('dist');
const baselinePath = '/versions/zero-to-built/';
const preview = process.env.PATCHBAY_URL || 'http://127.0.0.1:5181/docs/v5/prototypes/patchbay.html';
const [mode = 'prototype', checkpoint = 'round-1'] = process.argv.slice(2);
const viewports = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  mobile: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, hasTouch: true, isMobile: true },
};
const play = { slow: 2700, fast: 800 };
const stages = [0, 25, 50, 75, 100];
const config = { jpegQuality: 82, fps: 30, leadInMs: 400, atProjectMs: 700, settleMs: 700 };

await mkdir(evidence, { recursive: true });
if (mode === 'blind') {
  const destination = await mkdtemp(join(tmpdir(), 'portfolio-blind-'));
  const treatments = randomInt(2) === 0 ? ['v4', checkpoint] : [checkpoint, 'v4'];
  for (const [index, label] of ['X', 'Y'].entries()) {
    const folder = join(destination, label);
    await mkdir(folder);
    const source = join(evidence, treatments[index]);
    for (const file of await readdir(source)) {
      if (/^(desktop|mobile)-(?:[0-9]{3}\.jpg|(?:slow|fast)(?:-frames-\d+\.jpg|\.mp4))$/.test(file)) {
        await copyFile(join(source, file), join(folder, file));
      }
    }
    assert.ok((await readdir(folder)).length >= 14, 'Missing comparison assets');
  }
  console.log(JSON.stringify({ destination, mapping: { X: treatments[0], Y: treatments[1] } }));
  process.exit(0);
}
assert.ok(['baseline', 'prototype'].includes(mode), 'Choose baseline, prototype, or blind');
assert.match(checkpoint, /^[a-zA-Z0-9-]+$/);
const isBaseline = mode === 'baseline';
const folder = join(evidence, isBaseline ? 'v4' : checkpoint);
await mkdir(folder, { recursive: true });

const mime = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png',
  '.webm': 'video/webm', '.mp4': 'video/mp4', '.pdf': 'application/pdf', '.json': 'application/json',
  '.ico': 'image/x-icon', '.wav': 'audio/wav', '.glb': 'model/gltf-binary',
};
const server = createServer(async (request, response) => {
  try {
    const { pathname } = new URL(request.url, 'http://localhost');
    let file = resolve(archive, '.' + decodeURIComponent(pathname));
    if (!file.startsWith(archive + sep)) {
      response.writeHead(404).end();
      return;
    }
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    const data = await readFile(file);
    response.writeHead(200, { 'Content-Type': mime[extname(file)] || 'application/octet-stream' }).end(data);
  } catch {
    response.writeHead(404).end();
  }
});
if (isBaseline) await new Promise((done) => server.listen(0, '127.0.0.1', done));
const url = isBaseline ? `http://127.0.0.1:${server.address().port}${baselinePath}?project=packetlark` : preview;
const browser = await chromium.launch({ channel: 'chrome', args: ['--ignore-gpu-blocklist'] });

async function launchContext(options, reducedMotion = 'no-preference') {
  const context = await browser.newContext({ ...options, colorScheme: 'light', reducedMotion });
  await context.route(/https?:\/\/(?!127\.0\.0\.1:|localhost:)/, (route) => route.abort());
  return context;
}

async function openPage(context) {
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('response', (response) => {
    if (response.status() >= 400 && response.url().startsWith(new URL(url).origin)) {
      errors.push(`${response.status()} ${response.url()}`);
    }
  });
  await page.addInitScript(() => {
    window.captureInput = Object.create(null);
    for (const type of ['touchmove', 'wheel']) {
      window.addEventListener(type, (event) => {
        if (event.isTrusted) window.captureInput[type] = (window.captureInput[type] || 0) + 1;
      }, { capture: true, passive: false });
    }
  });
  await page.goto(url, { waitUntil: 'load' });
  await page.locator('#work').waitFor({ state: 'attached' });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].filter((image) => image.loading !== 'lazy').map((image) => image.decode().catch(() => {})));
  });
  await page.waitForTimeout(900);
  return { page, errors };
}

const state = (page) => page.evaluate(() => {
  const work = document.querySelector('#work');
  const title = document.querySelector('[data-project-title], #patch-project, #selected-product h3');
  return {
    y: scrollY,
    workY: Math.round(scrollY + work.getBoundingClientRect().top),
    width: innerWidth,
    height: innerHeight,
    overflow: document.documentElement.scrollWidth - innerWidth,
    title: title?.textContent.trim(),
    input: window.captureInput,
  };
});

function runFfmpeg(args, cwd) {
  const command = spawnSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args], { cwd, encoding: 'utf8' });
  assert.equal(command.status, 0, command.stderr || command.error?.message);
}

async function exportFrames(frames, device, speed) {
  const scratch = await mkdtemp(join(tmpdir(), 'portfolio-capture-'));
  try {
    const manifest = [];
    for (let index = 0; index < frames.length; index += 1) {
      const name = `${String(index).padStart(4, '0')}.jpg`;
      const frame = frames[index];
      await writeFile(join(scratch, name), Buffer.from(frame.data, 'base64'));
      const until = frames[index + 1]?.time ?? (frame.time + 0.25);
      manifest.push(`file ${name}`, `duration ${Math.max(.008, until - frame.time)}`);
      if (index === frames.length - 1) manifest.push(`file ${name}`);
    }
    await writeFile(join(scratch, 'frames.txt'), manifest.join('\n'));
    const stem = join(folder, `${device}-${speed}`);
    runFfmpeg(['-f', 'concat', '-i', 'frames.txt', '-vf', `fps=${config.fps},pad=ceil(iw/2)*2:ceil(ih/2)*2`, '-c:v', 'libx264', '-crf', '21', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', `${stem}.mp4`], scratch);
    const width = device === 'desktop' ? 320 : 156;
    runFfmpeg(['-i', `${stem}.mp4`, '-vf', `fps=8,scale=${width}:-1,tile=6x4:padding=4:margin=4`, '-fps_mode', 'passthrough', '-q:v', '3', `${stem}-frames-%02d.jpg`], scratch);
  } finally {
    await rm(scratch, { recursive: true, force: true });
  }
}

async function nativeTravel(page, cdp, device, distance, milliseconds) {
  const { width, height } = await state(page);
  const position = { x: Math.round(width * .63), y: Math.round(height * .72) };
  // Native gesture positions are the same within each viewport pair. Speed is normalized by the scene distance.
  const delta = Math.round(distance);
  await cdp.send('Input.synthesizeScrollGesture', {
    ...position, yDistance: -delta, speed: Math.round(Math.abs(delta) / (milliseconds / 1000)),
    gestureSourceType: device === 'mobile' ? 'touch' : 'mouse', preventFling: true,
  });
}

async function captureFrames(page, context, action) {
  const cdp = await context.newCDPSession(page);
  const frames = [];
  cdp.on('Page.screencastFrame', (event) => {
    frames.push({ data: event.data, time: event.metadata.timestamp });
    void cdp.send('Page.screencastFrameAck', { sessionId: event.sessionId }).catch(() => {});
  });
  const { width, height } = await state(page);
  await cdp.send('Page.startScreencast', {
    format: 'jpeg', quality: config.jpegQuality, maxWidth: width, maxHeight: height, everyNthFrame: 1,
  });
  try {
    return { result: await action(cdp), frames };
  } finally {
    await cdp.send('Page.stopScreencast');
    await cdp.detach();
  }
}

async function record(page, context, device, speed, workY) {
  const { result, frames } = await captureFrames(page, context, async (cdp) => {
    const start = await state(page);
    await page.waitForTimeout(config.leadInMs);
    const downStart = performance.now();
    await nativeTravel(page, cdp, device, workY, play[speed]);
    const downMs = Math.round(performance.now() - downStart);
    await page.waitForTimeout(config.atProjectMs);
    const landing = await state(page);
    const upStart = performance.now();
    await nativeTravel(page, cdp, device, -landing.y, play[speed]);
    const upMs = Math.round(performance.now() - upStart);
    await page.waitForTimeout(config.settleMs);
    return { start, landing, end: await state(page), downMs, upMs };
  });
  const { landing, end } = result;
  assert.ok(frames.length > 15, `${device}/${speed}: only ${frames.length} frames`);
  assert.ok(Math.abs(landing.y - workY) <= 42, `${device}/${speed}: landed at ${landing.y}, expected ${workY}`);
  assert.ok(end.y < 42, `${device}/${speed}: returned only to ${end.y}`);
  assert.ok(end.input[device === 'desktop' ? 'wheel' : 'touchmove'] > 0, 'No trusted native input observed');
  assert.equal(landing.title, 'PacketLark', `${device}/${speed}: scroll did not reach the default project`);
  await exportFrames(frames, device, speed);
  return { ...result, frames: frames.length };
}

async function stills(page, device, workY) {
  const outcomes = [];
  for (const percent of stages) {
    const target = Math.round(workY * percent / 100);
    await page.evaluate((position) => window.scrollTo({ top: position, behavior: 'instant' }), target);
    await page.waitForTimeout(850);
    await page.screenshot({ path: join(folder, `${device}-${String(percent).padStart(3, '0')}.jpg`), quality: config.jpegQuality });
    const geometry = await state(page);
    assert.equal(geometry.overflow, 0, `Horizontal overflow at ${device}/${percent}`);
    outcomes.push({ percent, target, ...geometry });
  }
  return outcomes;
}

async function optionalPatch(options, device, reducedMotion) {
  const context = await launchContext(options, reducedMotion);
  try {
    const { page, errors } = await openPage(context);
    const first = await state(page);
    assert.equal(first.title, 'PacketLark');
    const buttons = page.locator('button[data-route]');
    assert.ok(await buttons.count() > 1, 'Missing optional patch actions');
    const choice = await page.locator('button[data-route]:not([aria-pressed="true"])').first().getAttribute('data-route');
    const picked = page.locator(`button[data-route="${choice}"]`);
    async function activate(key, input) {
      const button = page.locator(`button[data-route="${key}"]`);
      if (input === 'touch') await button.tap();
      else if (input === 'keyboard') {
        await button.focus();
        await page.keyboard.press('Enter');
      } else await button.click();
      assert.equal(await button.getAttribute('aria-pressed'), 'true');
    }
    const input = device === 'mobile' ? 'touch' : 'pointer';
    const motion = reducedMotion !== 'reduce';
    const selectAndInspect = async (cdp) => {
      await page.waitForTimeout(300);
      await activate(choice, input);
      const selected = await state(page);
      assert.notEqual(selected.title, first.title);
      await page.waitForTimeout(650);
      if (cdp) {
        await nativeTravel(page, cdp, device, selected.workY, 1550);
      } else await page.evaluate((target) => window.scrollTo(0, target), selected.workY);
      await page.waitForTimeout(580);
      assert.equal((await state(page)).title, selected.title);
      return selected;
    };
    let selected;
    if (motion) {
      const { result, frames } = await captureFrames(page, context, selectAndInspect);
      selected = result;
      await exportFrames(frames, device, 'patch');
    } else selected = await selectAndInspect();
    await page.screenshot({ path: join(folder, `${device}-${motion ? 'alternative' : 'reduced-motion'}.jpg`), quality: config.jpegQuality });
    const proof = page.getByRole('button', { name: 'Inspect interface' });
    if (device === 'mobile') await proof.tap();
    else {
      await proof.focus();
      await page.keyboard.press('Enter');
    }
    const modal = page.getByRole('dialog', { name: `${selected.title} interface` });
    assert.ok(await modal.isVisible());
    await modal.getByRole('img').evaluate((image) => image.decode());
    if (motion) await page.screenshot({ path: join(folder, `${device}-inspect.jpg`), quality: config.jpegQuality });
    const zoom = modal.getByRole('button', { name: 'Detail view' });
    if (device === 'mobile') await zoom.tap();
    else {
      await zoom.focus();
      await page.keyboard.press('Enter');
    }
    assert.equal(await zoom.getAttribute('aria-pressed'), 'true');
    const viewport = modal.getByRole('region', { name: 'Product screenshot' });
    const panRoom = await viewport.evaluate((element) => element.scrollWidth - element.clientWidth);
    assert.ok(panRoom > 0);
    if (device === 'desktop') {
      await viewport.focus();
      await page.keyboard.press('ArrowRight');
    } else {
      const area = await viewport.boundingBox();
      const cdp = await context.newCDPSession(page);
      await cdp.send('Input.synthesizeScrollGesture', {
        x: Math.round(area.x + area.width * .66), y: Math.round(area.y + area.height * .34),
        xDistance: -190, speed: 480, gestureSourceType: 'touch', preventFling: true,
      });
      await cdp.detach();
    }
    await page.waitForFunction(() => document.querySelector('.interface-viewport').scrollLeft > 0);
    if (motion) await page.screenshot({ path: join(folder, `${device}-inspect-zoom.jpg`), quality: config.jpegQuality });
    if (device === 'desktop') await page.keyboard.press('Escape');
    else await modal.getByRole('button', { name: 'Close' }).tap();
    assert.equal(await modal.isVisible(), false);
    assert.equal(await proof.evaluate((button) => button === document.activeElement), true);
    let keyboard;
    if (device === 'desktop') {
      await page.evaluate(() => window.scrollTo(0, 0));
      await activate('screen', 'keyboard');
      keyboard = (await state(page)).title;
      assert.equal(keyboard, 'Framecast Studio');
    }
    return { first, choice, input, selected, keyboard, interfaceDialog: 'opened, image decoded, enlarged, panned with native input, closed, focus restored', errors };
  } finally {
    await context.close();
  }
}

const report = { url: isBaseline ? `${baselinePath}?project=packetlark` : url, browser: browser.version(), viewports, play, config, samples: {} };
try {
  for (const [device, options] of Object.entries(viewports)) {
    const context = await launchContext(options);
    try {
      const { page, errors } = await openPage(context);
      const initial = await state(page);
      assert.ok(initial.workY > 200, `Invalid transition distance: ${initial.workY}`);
      assert.equal(initial.y, 0);
      const take = { errors, initial, recordings: {} };
      report.samples[device] = take;
      for (const speed of Object.keys(play)) {
        take.recordings[speed] = await record(page, context, device, speed, initial.workY);
        console.log(`${device} ${speed}: ${take.recordings[speed].frames} frames, ${take.recordings[speed].landing.y}px down and back to ${take.recordings[speed].end.y}px`);
      }
      take.positions = await stills(page, device, initial.workY);
    } finally {
      await context.close();
    }
    if (!isBaseline && !process.env.PATCHBAY_SCROLL_ONLY) {
      report.samples[device].alternative = await optionalPatch(options, device, 'no-preference');
      report.samples[device].reduced = await optionalPatch(options, device, 'reduce');
    }
  }
} finally {
  await writeFile(join(folder, 'browser-audit.json'), `${JSON.stringify(report, null, 2)}\n`);
  await browser.close();
  if (isBaseline) await new Promise((done) => server.close(done));
}

import { createServer } from 'node:http';
import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { extname, join, resolve, sep } from 'node:path';
import { chromium } from 'playwright';
import versions from '../../../../versions/manifest.json' with { type: 'json' };

const mode = process.argv[2] ?? 'initial';
const root = resolve('dist');
const output = resolve('docs/v5/evidence/baseline');
const viewports = {
  desktop: { viewport: { width: 1440, height: 900 } },
  mobile: { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true },
};
const mime = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.avif': 'image/avif', '.woff': 'font/woff',
  '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.json': 'application/json',
  '.pdf': 'application/pdf', '.mp4': 'video/mp4', '.webm': 'video/webm',
  '.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.glb': 'model/gltf-binary',
};
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const legacy = /^\/blog\/\d{4}-\d{2}-\d{2}-(.+?)\/?$/.exec(pathname);
    if (legacy) {
      response.writeHead(301, { Location: '/blog/' + legacy[1] + '/' }).end();
      return;
    }
    let target = resolve(root, '.' + pathname);
    let status = 200;
    if (target !== root && !target.startsWith(root + sep)) {
      response.writeHead(400).end();
      return;
    }
    try {
      if ((await stat(target)).isDirectory()) target = join(target, 'index.html');
      await stat(target);
    } catch {
      const archive = /^\/versions\/(serif|cyberterminal|halide|zero-to-built)\//.exec(pathname);
      target = archive ? join(root, 'versions', archive[1], '404.html') : join(root, '404.html');
      status = 404;
    }
    response.writeHead(status, { 'Content-Type': mime[extname(target)] ?? 'application/octet-stream' });
    response.end(await readFile(target));
  } catch {
    response.destroy();
  }
});
await new Promise((done) => server.listen(mode === 'initial' ? 5182 : 0, '127.0.0.1', done));
const origin = 'http://127.0.0.1:' + server.address().port;
const browser = await chromium.launch({ channel: 'chrome', args: ['--ignore-gpu-blocklist'] });

const routeKey = (route) => route === '/' ? 'home' : route.replace(/^\/|\/$/g, '').replaceAll('/', '--');
const initials = { 2: '2026-07-20-ponytail', 3: 'ponytail', 4: 'ponytail', 5: 'kv4-hopper' };
const nameFor = (number) => 'v' + number;
const homeScenes = {
  4: ['work', 'engineering', 'contact'],
  5: ['work', 'engineering', 'about-me', 'writing', 'contact'],
};

async function routesFor(version) {
  const prefix = version.current ? '' : '/versions/' + version.slug;
  const directory = join(root, prefix);
  const isDirectory = (entry) => entry.isDirectory();
  const direct = async (path) => {
    const files = await readdir(join(directory, path), { withFileTypes: true }).catch(() => []);
    return files.filter(isDirectory).map((entry) => '/' + path + '/' + entry.name + '/');
  };
  const articles = await direct('blog');
  const cases = await direct('work');
  let routes = ['/'];
  if (version.version >= 2) routes.push('/blog/');
  if (version.version >= 3) routes.push('/hire/');
  if (version.version >= 4) routes.push('/work/', '/about/', '/contact/', '/privacy/', '/terms/', ...cases);
  if (version.version >= 4) routes.push('/agents-at-work/');
  if (version.current) routes.push('/blog/?q=browser-baseline-no-results');
  routes.push('/missing-route-audit/');
  const sample = articles.find((path) => path.includes(initials[version.version])) ?? articles[0];
  if (mode === 'initial') {
    routes = routes.filter((route) => !route.startsWith('/work/') || route === '/work/' || route === '/work/packetlark/');
    if (sample) routes.push(sample);
  } else if (mode === 'bulk') {
    routes = [...cases.filter((route) => route !== '/work/packetlark/'), ...articles.filter((route) => route !== sample)];
  }
  return routes.map((route) => ({ route, path: prefix + route }));
}

async function watch(context) {
  await context.addInitScript(() => {
    window.baselineVitals = { lcpMs: 0, cls: 0, longTaskBlockingMs: 0 };
    const observe = (type, update) => {
      try {
        new PerformanceObserver((list) => list.getEntries().forEach(update)).observe({ type, buffered: true });
      } catch {}
    };
    observe('largest-contentful-paint', (entry) => { window.baselineVitals.lcpMs = Math.round(entry.startTime); });
    observe('layout-shift', (entry) => {
      if (!entry.hadRecentInput) window.baselineVitals.cls += entry.value;
    });
    observe('longtask', (entry) => { window.baselineVitals.longTaskBlockingMs += Math.max(0, entry.duration - 50); });
  });
  await context.route(/https?:\/\/(?:[^/]+\.)?(?:google-analytics\.com|googletagmanager\.com|plausible\.io)(?:\/|$)/, (route) =>
    route.abort('blockedbyclient'));
}

async function visit(page, path) {
  const response = await page.goto(origin + path, { waitUntil: 'domcontentloaded', timeout: 12000 });
  await page.locator('h1').filter({ visible: true }).first().waitFor({ timeout: 4500 }).catch(() => {});
  await page.evaluate(() => Promise.race([document.fonts.ready, new Promise((done) => setTimeout(done, 1200))])).catch(() => {});
  return response?.status() ?? null;
}

async function metadata(page) {
  return page.evaluate(() => {
    const entry = performance.getEntriesByType('navigation')[0];
    const bytesByType = {};
    for (const resource of performance.getEntriesByType('resource')) {
      const url = new URL(resource.name);
      if (url.origin !== location.origin) continue;
      const extension = url.pathname.split('.').pop();
      bytesByType[extension] = (bytesByType[extension] ?? 0) + resource.encodedBodySize;
    }
    const all = (selector) => [...document.querySelectorAll(selector)];
    const text = (node) => (node.innerText ?? node.textContent).replace(/\s+/g, ' ').trim();
    return {
      title: document.title,
      h1: all('h1').map(text),
      headings: all('h2').slice(0, 18).map(text),
      width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
      height: innerHeight, scrollHeight: document.documentElement.scrollHeight,
      canvases: all('canvas').map((canvas) => canvas.className),
      markers: all('[class*="signal-shell"],[class*="workshop"],[class*="reader-post"],#portfolio-archive')
        .map((node) => node.id || node.className).slice(0, 12),
      aboveFold: all('h1, [role="heading"][aria-level="1"], a, button').filter((node) => {
        const bounds = node.getBoundingClientRect();
        return bounds.height > 0 && bounds.width > 0 && bounds.bottom > 0 && bounds.top < innerHeight
          && getComputedStyle(node).visibility === 'visible';
      }).map(text).filter(Boolean).slice(0, 35),
      vitals: window.baselineVitals,
      domContentLoadedMs: Math.round(entry?.domContentLoadedEventEnd || 0),
      bytesByType,
    };
  });
}

async function capture(page, destination) {
  await page.screenshot({ path: destination + '.jpg', type: 'jpeg', quality: 70, timeout: 9000 });
}

async function seek(page, position) {
  await page.evaluate((fraction) => window.scrollTo({ top: (document.documentElement.scrollHeight - innerHeight) * fraction, behavior: 'instant' }), position);
  await page.waitForTimeout(mode === 'initial' ? 350 : 85);
}

async function capturePage(context, viewport, version, target) {
  const page = await context.newPage();
  const notes = [];
  const route = routeKey(target.route).replace(/[?=&]/g, '-');
  const directory = join(output, nameFor(version.version), viewport, route);
  await mkdir(directory, { recursive: true });
  page.on('pageerror', (error) => notes.push({ kind: 'pageerror', text: error.message }));
  page.on('console', (message) => {
    if (['warning', 'error'].includes(message.type())) notes.push({ kind: message.type(), text: message.text() });
  });
  page.on('response', (response) => {
    if (response.status() >= 400 && response.url().startsWith(origin) && response.request().resourceType() !== 'document') {
      notes.push({ kind: 'response', url: response.url().slice(origin.length), status: response.status(), resource: response.request().resourceType() });
    }
  });
  try {
    const status = await visit(page, target.path);
    await page.waitForTimeout(mode === 'initial' ? 850 : 90);
    const first = await metadata(page);
    await capture(page, join(directory, '00'));
    for (const fraction of [.5, 1]) {
      await seek(page, fraction);
      await capture(page, join(directory, String(fraction * 100)));
    }
    if (target.route === '/') {
      for (const id of homeScenes[version.version] ?? []) {
        const target = page.locator('#' + id).first();
        if (await target.count()) {
          await target.evaluate((node) => window.scrollTo({ top: node.getBoundingClientRect().top + scrollY - 95, behavior: 'instant' }));
          await page.waitForTimeout(740);
          await capture(page, join(directory, id));
        }
      }
    }
    const result = { path: target.path, status, ...first, notes };
    await writeFile(join(directory, 'observed.json'), JSON.stringify(result, null, 2) + '\n');
    return result;
  } catch (error) {
    const result = { path: target.path, problem: error.message, notes };
    await writeFile(join(directory, 'observed.json'), JSON.stringify(result, null, 2) + '\n');
    return result;
  } finally {
    await page.close();
  }
}

async function collect() {
  const results = {};
  const order = [4, 5, 1, 2, 3];
  for (const number of order) {
    const version = versions.find((entry) => entry.version === number);
    const targets = await routesFor(version);
    results[nameFor(number)] = {};
    for (const [viewport, options] of Object.entries(viewports)) {
      const context = await browser.newContext(options);
      await watch(context);
      const rows = [];
      const batch = mode === 'initial' ? 2 : 3;
      for (let index = 0; index < targets.length; index += batch) {
        rows.push(...await Promise.all(targets.slice(index, index + batch).map((target) => capturePage(context, viewport, version, target))));
      }
      results[nameFor(number)][viewport] = rows;
      await context.close();
      console.log(nameFor(number), viewport, rows.length, 'routes', rows.filter((row) => row.problem).length, 'capture errors');
    }
  }
  await writeFile(join(output, mode + '-report.json'), JSON.stringify({
    browser: browser.version(), viewports, mode, results,
  }, null, 2) + '\n');
}

async function motion() {
  const clips = join(output, 'recordings');
  await mkdir(clips, { recursive: true });
  const destinations = [4, 5, 1, 2, 3].map((version) => versions.find((entry) => entry.version === version));
  const outcomes = [];
  for (const version of destinations) {
    const pathname = version.current ? '/' : '/versions/' + version.slug + '/';
    for (const [device, options] of Object.entries(viewports)) {
      const path = join(clips, nameFor(version.version) + '-' + device + '.webm');
      const context = await browser.newContext({
        ...options, recordVideo: {
          dir: clips,
          size: device === 'desktop' ? { width: 960, height: 600 } : { width: 390, height: 844 },
        },
      });
      await watch(context);
      const page = await context.newPage();
      const session = await context.newCDPSession(page);
      const offsets = [];
      try {
        await visit(page, pathname);
        await page.waitForTimeout(900);
        for (let i = 0; i < 6; i += 1) {
          if (device === 'desktop') {
            await page.mouse.move(910 - i * 82, 500);
            await page.mouse.wheel(0, 650);
          } else {
            await session.send('Input.synthesizeScrollGesture', {
              x: 180, y: 650, yDistance: -575, speed: 1250, gestureSourceType: 'touch',
            });
          }
          await page.waitForTimeout(390);
          offsets.push(await page.evaluate(() => scrollY));
        }
        outcomes.push({ path: pathname, device, offsets });
      } catch (error) {
        outcomes.push({ path: pathname, device, offsets, error: error.message });
      } finally {
        const video = page.video();
        await context.close();
        if (video) {
          await video.saveAs(path);
          await video.delete();
        }
        console.log(pathname, device, offsets.join(','));
      }
    }
  }
  await writeFile(join(clips, 'observed.json'), JSON.stringify(outcomes, null, 2) + '\n');
}

async function detail() {
  const folder = join(output, 'checks');
  await mkdir(folder, { recursive: true });
  const geometry = [];
  const conditions = [
    { width: 360, height: 800, mobile: true }, { width: 390, height: 844, mobile: true },
    { width: 768, height: 900, mobile: true }, { width: 1024, height: 768 },
    { width: 1440, height: 900 }, { width: 1920, height: 1000 },
    { width: 844, height: 390, mobile: true }, { width: 390, height: 844, mobile: true, dark: true },
    { width: 1440, height: 900, dark: true },
  ];
  for (const { width, height, mobile, dark } of conditions) {
    const context = await browser.newContext({
      viewport: { width, height }, hasTouch: mobile, isMobile: mobile, colorScheme: dark ? 'dark' : 'light',
    });
    await watch(context);
    const page = await context.newPage();
    await visit(page, '/');
    if (dark) await page.getByRole('button', { name: 'Switch to dark theme' }).click();
    await page.waitForTimeout(850);
    const rows = await page.evaluate(async () => {
      const samples = [];
      const targets = {
        writing: ['.signal-notes h3', '.signal-notes a > svg', '.signal-notes .signal-label'],
        engineering: ['.signal-bento-source a', '.signal-bento-source a svg'],
        'about-me': ['.signal-profile-inset .signal-handwriting'],
        contact: ['.signal-home-contact a.signal-button'],
      };
      const rect = (box) => [box.x, box.y, box.width, box.height].map((n) => Math.round(n * 10) / 10);
      const bound = (selector) => [...document.querySelectorAll(selector)].map((node) => {
        const walk = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
        const lineBoxes = [];
        let child;
        while ((child = walk.nextNode())) {
          if (!child.textContent.trim()) continue;
          const range = document.createRange();
          range.selectNodeContents(child);
          lineBoxes.push(...[...range.getClientRects()].map(rect));
        }
        const css = getComputedStyle(node);
        const clips = [];
        for (let parent = node.parentElement; parent; parent = parent.parentElement) {
          const style = getComputedStyle(parent);
          if (['clip', 'hidden'].includes(style.overflowX) || ['clip', 'hidden'].includes(style.overflowY)) {
            clips.push({ className: parent.className, overflow: style.overflow, rect: rect(parent.getBoundingClientRect()) });
          }
        }
        return {
          text: node.textContent.trim(), rect: rect(node.getBoundingClientRect()), lineBoxes,
          color: css.color, font: css.fontFamily, background: css.backgroundColor, opacity: css.opacity,
          face: getComputedStyle(node.closest('a,li,.signal-profile-inset') ?? node).backgroundColor,
          clips,
        };
      });
      for (const [id, selectors] of Object.entries(targets)) {
        const target = document.querySelector('#' + id);
        const position = target.getBoundingClientRect().top + scrollY;
        scrollTo({ top: position + 40, behavior: 'instant' });
        await new Promise((done) => setTimeout(done, 710));
        samples.push({ id, selectors: Object.fromEntries(selectors.map((selector) => [selector, bound(selector)])) });
      }
      return { viewport: [innerWidth, innerHeight], scrollWidth: document.documentElement.scrollWidth, dark: document.documentElement.classList.contains('dark'), samples };
    });
    geometry.push({ width, height, dark: Boolean(dark), ...rows });
    if ([390, 1440].includes(width)) {
      for (const id of ['writing', 'engineering', 'about-me', 'contact']) {
        const section = page.locator('#' + id).first();
        await section.evaluate((node) => window.scrollTo({ top: node.getBoundingClientRect().top + scrollY - 100, behavior: 'instant' }));
        await page.waitForTimeout(500);
        await capture(page, join(folder, 'v5-' + width + (dark ? '-dark' : '') + '-' + id));
      }
    }
    await context.close();
  }
  await writeFile(join(folder, 'v5-geometry.json'), JSON.stringify(geometry, null, 2) + '\n');
  await checkInteractions();
}

async function checkInteractions() {
  const folder = join(output, 'checks');
  await mkdir(folder, { recursive: true });
  const context = await browser.newContext(viewports.desktop);
  await watch(context);
  const v4 = versions.find((entry) => entry.version === 4);
  await capturePage(context, 'desktop', v4, { route: '/agents-at-work/', path: '/versions/zero-to-built/agents-at-work/' });
  const page = await context.newPage();
  page.setDefaultTimeout(5000);
  const interactions = [];
  try {
    await visit(page, '/versions/zero-to-built/');
    const enter = page.getByRole('button', { name: 'Explore in 3D', exact: true });
    await page.locator('#work').evaluate((node) => node.scrollIntoView({ behavior: 'instant' }));
    await enter.waitFor({ timeout: 9000 });
    const canvas = page.locator('.scene-sticky canvas').first();
    await canvas.waitFor({ state: 'attached', timeout: 12000 });
    const before = await canvas.count();
    await enter.click();
    const active = await page.getByRole('button', { name: 'Exit Explore', exact: true }).first().isVisible();
    const host = page.locator('.scene-sticky [data-camera]');
    await host.waitFor({ state: 'attached' });
    const poseBefore = await host.getAttribute('data-camera');
    const point = await canvas.evaluate((node) => {
      for (let y = 340; y < 760; y += 40) {
        for (let x = 900; x < innerWidth - 130; x += 50) {
          if (document.elementFromPoint(x, y) === node) return { x, y };
        }
      }
      return null;
    });
    if (point) {
      const { x, y } = point;
      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.mouse.move(x + 110, y + 45, { steps: 16 });
      await page.mouse.up();
      await page.waitForTimeout(550);
    }
    const poseAfter = await host.getAttribute('data-camera');
    await capture(page, join(folder, 'v4-explore'));
    await page.keyboard.press('Escape');
    await enter.waitFor();
    interactions.push({ case: 'v4 3D inspect and Escape', before, after: await canvas.count(),
      active, point, poseBefore, poseAfter, restored: await enter.isVisible() });
  } catch (error) {
    interactions.push({ case: 'v4 3D inspect and Escape', error: error.message });
  }
  try {
    await visit(page, '/');
    const setup = await page.locator('#work').evaluate((node) => {
      node.scrollIntoView({ behavior: 'instant' });
      return scrollY;
    });
    const selected = page.getByRole('button', { name: /PacketLark/ }).first();
    await selected.click();
    await page.locator('.signal-feature[data-project="packetlark"]').waitFor();
    const picked = await page.locator('.signal-feature').getAttribute('data-project');
    const offsetBeforeNavigation = await page.evaluate(() => scrollY);
    const beforePath = page.url().slice(origin.length);
    await page.locator('.signal-nav a[href="/work/"]').click();
    await page.waitForURL('**/work/');
    await page.locator('.signal-work-page').waitFor();
    await page.waitForTimeout(380);
    const focus = await page.evaluate(() => document.activeElement.id);
    await page.goBack();
    await page.locator('.signal-hero').waitFor();
    await page.waitForTimeout(500);
    const back = await page.evaluate(() => ({ y: scrollY, pathname: location.pathname, search: location.search, native: Boolean(document.querySelector('.signal-shell')) }));
    interactions.push({ case: 'v5 project picker, navigation and historical restoration', setup, picked, offsetBeforeNavigation, beforePath, focus, back });
  } catch (error) {
    interactions.push({ case: 'v5 project picker, navigation and historical restoration', error: error.message });
  }
  try {
    await visit(page, '/work/');
    const track = page.locator('.signal-gallery-window');
    const button = page.getByRole('button', { name: 'Next project' });
    const start = await track.evaluate((node) => node.scrollLeft);
    await button.click();
    await page.waitForTimeout(780);
    const end = await track.evaluate((node) => node.scrollLeft);
    await capture(page, join(folder, 'v5-work-gallery'));
    interactions.push({ case: 'v5 desktop featured gallery movement', track: [start, end] });
  } catch (error) {
    interactions.push({ case: 'v5 desktop featured gallery movement', error: error.message });
  }
  try {
    await visit(page, '/work/packetlark/');
    const close = page.getByRole('button', { name: /Close/i });
    const screenshot = page.getByRole('button', { name: 'Expand project image' }).first();
    await screenshot.click({ timeout: 1800 });
    const open = await page.getByRole('dialog').isVisible();
    await capture(page, join(folder, 'v5-case-dialog'));
    await close.press('Escape');
    interactions.push({ case: 'v5 case-study screenshot dialog', open, closed: !await page.getByRole('dialog').isVisible() });
  } catch (error) {
    interactions.push({ case: 'v5 case-study screenshot dialog', error: error.message });
  }
  await context.close();
  const phone = await browser.newContext(viewports.mobile);
  await watch(phone);
  await capturePage(phone, 'mobile', v4, { route: '/agents-at-work/', path: '/versions/zero-to-built/agents-at-work/' });
  const mobile = await phone.newPage();
  try {
    await visit(mobile, '/');
    const open = mobile.getByRole('button', { name: 'Open menu' });
    await open.press('Enter');
    const navigation = mobile.getByRole('navigation', { name: 'Mobile navigation' });
    const visible = await navigation.isVisible();
    await capture(mobile, join(folder, 'v5-mobile-menu'));
    await navigation.getByRole('link', { name: 'Work', exact: true }).focus();
    await mobile.keyboard.press('Escape');
    interactions.push({ case: 'v5 mobile menu keyboard disclosure', visible, closed: !await navigation.isVisible(),
      focus: await mobile.evaluate(() => document.activeElement.getAttribute('aria-label')) });
  } catch (error) {
    interactions.push({ case: 'v5 mobile menu keyboard disclosure', error: error.message });
  } finally {
    await phone.close();
  }
  await writeFile(join(folder, 'interactions.json'), JSON.stringify(interactions, null, 2) + '\n');
}

async function checkWorkFilter() {
  const folder = join(output, 'checks');
  const results = [];
  const variants = [
    { title: 'desktop-direct', direct: true },
    { title: 'desktop-filter-first' },
    { title: 'desktop-after-gallery', advance: true },
    { title: 'desktop-reduced-motion', reducedMotion: true },
    { title: 'mobile-filter-first', mobile: true },
  ];
  for (const { title, direct, advance, mobile, reducedMotion } of variants) {
    const context = await browser.newContext({
      ...(mobile ? viewports.mobile : viewports.desktop),
      reducedMotion: reducedMotion ? 'reduce' : 'no-preference',
    });
    await watch(context);
    const page = await context.newPage();
    page.setDefaultTimeout(4200);
    const messages = [];
    page.on('pageerror', (error) => messages.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') messages.push(message.text().slice(0, 300));
    });
    const query = '/work/?category=COMPUTER+VISION';
    try {
      await visit(page, direct ? query : '/work/');
      if (!direct) {
        if (advance) {
          await page.getByRole('button', { name: 'Next project' }).click();
          await page.waitForTimeout(580);
        }
        await page.getByRole('button', { name: 'COMPUTER VISION', exact: true }).click();
        await page.waitForURL('**' + query);
      }
      await page.waitForTimeout(950);
      await capture(page, join(folder, 'v5-work-filter-' + title));
      const result = await page.evaluate(() => ({
        path: location.pathname + location.search,
        pressed: document.querySelector('.signal-filters [aria-pressed=true]')?.textContent ?? null,
        count: document.querySelector('.signal-results')?.textContent ?? null,
        heading: document.querySelector('h1')?.textContent ?? null,
        alert: document.querySelector('[role=alert]')?.textContent?.trim() ?? null,
        pageText: document.querySelector('#root')?.innerText?.slice(0, 650),
      }));
      results.push({ title, ...result, messages });
    } catch (error) {
      results.push({ title, error: error.message, messages });
    } finally {
      await context.close();
    }
  }
  await writeFile(join(folder, 'work-filter.json'), JSON.stringify(results, null, 2) + '\n');
}

try {
  if (mode === 'motion') await motion();
  else if (mode === 'detail') await detail();
  else if (mode === 'interactions') await checkInteractions();
  else if (mode === 'filter') await checkWorkFilter();
  else await collect();
} finally {
  await browser.close();
  server.close();
}

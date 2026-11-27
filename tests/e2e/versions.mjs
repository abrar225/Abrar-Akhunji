import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, readdir, stat } from 'node:fs/promises';
import { extname, join, resolve, sep } from 'node:path';
import { chromium } from 'playwright';
import versions from '../../versions/manifest.json' with { type: 'json' };

const dist = resolve('dist');
const archives = versions.filter(entry => !entry.current);
const types = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp',
  '.jpg': 'image/jpeg', '.woff2': 'font/woff2',
};

const server = createServer(async (request, response) => {
  const pathname = new URL(request.url, 'http://localhost').pathname;
  const file = resolve(dist, '.' + decodeURIComponent(pathname));
  if (!file.startsWith(dist + sep) && file !== dist) {
    response.writeHead(400).end();
    return;
  }
  let target = file;
  let code = 200;
  try {
    if ((await stat(file)).isDirectory()) target = join(file, 'index.html');
    await stat(target);
  } catch {
    const archive = archives.find(({ slug }) => pathname.startsWith(`/versions/${slug}/`));
    target = archive ? join(dist, 'versions', archive.slug, '404.html') : join(dist, '404.html');
    code = 404;
  }
  try {
    response.writeHead(code, { 'Content-Type': types[extname(target)] || 'application/octet-stream' });
    response.end(await readFile(target));
  } catch {
    response.destroy();
  }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
let browser;

async function checkDisclosure(control, expectedVersion) {
  const summary = control.locator('summary');
  await summary.focus();
  await summary.press('Enter');
  await control.getByRole('link', { name: new RegExp(`v${expectedVersion} ·`) }).focus();
  assert.equal(await control.locator('a[aria-current]').count(), 1);
  await control.locator('a[aria-current]').press('Escape');
  assert.equal(await control.getAttribute('open'), null);
  assert.equal(await summary.evaluate(element => element === document.activeElement), true);
}

try {
  browser = await chromium.launch({ channel: process.env.PORTFOLIO_BROWSER_CHANNEL || undefined });
  for (const width of [320, 390, 768, 1440]) {
    const page = await browser.newPage({
      viewport: { width, height: 900 }, reducedMotion: 'reduce', hasTouch: width < 768,
    });
    page.setDefaultTimeout(10000);
    const errors = [];
    const serviceCalls = [];
    const missingAssets = [];
    page.on('response', response => {
      if (response.url().startsWith(origin + '/versions/') && response.status() >= 400
          && ['image', 'script', 'stylesheet', 'font'].includes(response.request().resourceType())) {
        missingAssets.push(response.url());
      }
    });
    page.on('pageerror', error => errors.push(error.message));
    page.on('request', request => {
      if (new URL(request.frame().url() || origin).pathname.startsWith('/versions/')
          && ['fetch', 'xhr', 'ping'].includes(request.resourceType())) serviceCalls.push(request.url());
    });
    await page.goto(origin);
    await page.getByRole('button', { name: 'Open menu' }).waitFor();
    const current = page.locator('.version-switcher');
    const headerFits = await page.locator('.patch-header-actions').evaluate(element =>
      element.getBoundingClientRect().right <= innerWidth);
    assert.ok(headerFits, `Header controls overflow at ${width}px`);
    await checkDisclosure(current, versions.at(-1).version);
    if (width < 768) {
      assert.equal(await page.getByRole('navigation', { name: 'Primary' }).isVisible(), false);
      await page.getByRole('button', { name: 'Open menu' }).tap();
      const menu = page.getByRole('dialog', { name: 'Portfolio menu' });
      for (const name of ['Work', 'Résumé', 'Contact']) {
        assert.ok(await menu.getByRole('link', { name, exact: true }).isVisible(), name);
      }
      await page.getByRole('button', { name: 'Close menu' }).tap();
    }
    assert.equal(await current.locator('li').count(), versions.length);
    await current.locator('summary').click();
    await current.getByRole('link', { name: /v1 ·/ }).click();
    await page.waitForURL(`**/versions/${archives[0].slug}/`);

    for (const { slug, version } of archives) {
      console.log(`Checking ${slug} at ${width}px`);
      const base = `${origin}/versions/${slug}/`;
      const result = await page.goto(base, { waitUntil: 'domcontentloaded' });
      assert.equal(result.status(), 200);
      await page.locator('#root h1').first().waitFor({ state: 'attached' }).catch(error => {
        throw new Error(`Historical page did not render at ${page.url()}: ${errors.join(', ')}`, { cause: error });
      });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true,
        `Horizontal overflow in ${slug} at ${width}px`);
      const marker = page.locator('#portfolio-archive details');
      await checkDisclosure(marker, version);
      if (width < 768) await marker.locator('summary').tap();
      else await marker.locator('summary').click();
      const bounds = await marker.locator('ul').boundingBox();
      assert.ok(bounds && bounds.x >= 0 && bounds.x + bounds.width <= width + 1);
      assert.equal(await marker.getByRole('link').count(), versions.length);
      assert.equal(await page.locator('meta[name="robots"][content^="noindex"]').count() >= 1, true);
      if (['cyberterminal', 'halide', 'zero-to-built'].includes(slug)) {
        const posts = (await readdir(join(dist, 'versions', slug, 'blog'), { withFileTypes: true }))
          .filter(entry => entry.isDirectory());
        assert.ok(posts.length > 0);
        const routes = ['blog/', `blog/${posts[0].name}/`];
        if (slug === 'halide' || slug === 'zero-to-built') routes.push('hire/');
        if (slug === 'zero-to-built') routes.push('about/', 'work/', 'work/packetlark/');
        for (const path of routes) {
          assert.equal((await page.goto(base + path)).status(), 200, `Direct archive route: ${slug}/${path}`);
          await page.locator('#root h1').first().waitFor({ state: 'attached' });
          assert.equal((await page.reload()).status(), 200, `Reloading archive route: ${page.url()}`);
        }
      }
      if (slug === 'zero-to-built') {
        await page.goto(base);
        const showcase = page.getByRole('link', { name: /Watch agents build a showcase/ });
        assert.equal(await showcase.getAttribute('href'), '/versions/zero-to-built/agents-at-work/');
        await showcase.click();
        await page.waitForURL(base + 'agents-at-work/');
        await page.getByRole('heading', { name: 'Good ideas deserve to be built.' }).waitFor();
        await checkDisclosure(marker, version);
      }
      assert.equal((await page.goto(base + 'missing-route/')).status(), 404);
      await marker.locator('summary').click();
      await marker.getByRole('link', { name: /Current/ }).click();
      await page.waitForURL(origin + '/');
    }
    for (const retired of ['original', 'motion']) {
      assert.equal((await page.goto(`${origin}/versions/${retired}/`)).status(), 404);
    }
    assert.equal((await page.goto(`${origin}/agents-at-work/`)).status(), 404);
    assert.deepEqual(errors, []);
    assert.deepEqual(serviceCalls, []);
    assert.deepEqual(missingAssets, []);
    await page.close();
    console.log(`Archive routes and version switchers passed at ${width}px`);
  }
} finally {
  await browser?.close();
  server.close();
}

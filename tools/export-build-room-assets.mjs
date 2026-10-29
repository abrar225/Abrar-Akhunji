// Run via `ego-browser nodejs < tools/export-build-room-assets.mjs` with Vite on :5173.
const task = await taskSpace('Portfolio reference study 2026-10-28');
const page = await task.newPage();
await page.goto('http://127.0.0.1:5173/tools/build-room-assets.html');
await page.waitForFunction(() => window.assetReady);
const fs = await import('node:fs/promises');
const root = '/Users/abrarakhunji/Desktop/Abrar-Portfolio/abrar-portfolio-web/public/assets/build-room/';
const measurements = [];
for (const theme of ['light', 'dark']) for (const mobile of [false, true]) for (const kind of ['hero', 'room', 'contact']) {
  const out = await page.evaluate(async input => window.renderAsset(input.theme, input.mobile, input.kind), { theme, mobile, kind });
  await fs.writeFile(`${root}posters/${kind}-${theme}-${mobile ? 'mobile' : 'desktop'}.png`, Buffer.from(out.image, 'base64'));
  measurements.push({ theme, mobile, kind, triangles: out.triangles, drawCalls: out.drawCalls });
}
for (const theme of ['light', 'dark']) for (const [index, slug] of [[1, 'packetlark'], [2, 'framecast-studio']]) {
  const out = await page.evaluate(async input => window.renderAsset(input.theme, true, 'room', input.index), { theme, index });
  await fs.writeFile(`${root}posters/room-${slug}-${theme}-mobile.png`, Buffer.from(out.image, 'base64'));
  measurements.push({ theme, mobile: true, kind: slug, triangles: out.triangles, drawCalls: out.drawCalls });
}
const cut = await page.evaluate(() => window.renderAsset('light', false, 'cutaway'));
await fs.writeFile(root + 'posters/cutaway-light.png', Buffer.from(cut.image, 'base64'));
const model = await page.evaluate(() => window.exportModel());
await fs.writeFile(root + 'build-room.glb', Buffer.from(model, 'base64'));
await fs.writeFile(root + 'render-stats.json', JSON.stringify(measurements, null, 2));
console.log(measurements);

await page.close();

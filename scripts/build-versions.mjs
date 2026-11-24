import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { cp, mkdir, mkdtemp, readFile, readdir, rename, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const versions = JSON.parse(await readFile(join(root, 'versions/manifest.json'), 'utf8'));
const archives = versions.filter(version => !version.current);
const output = join(root, 'dist/versions');

if (versions.length < 2 || new Set(versions.map(entry => entry.slug)).size !== versions.length
  || versions.filter(entry => entry.current).length !== 1 || !versions.at(-1).current
  || versions.some(({ slug, name, date, commit, current, version }, index) =>
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !name || !/^\d{4}-\d{2}-\d{2}$/.test(date)
    || (!current && !/^[a-f0-9]{40}$/.test(commit)) || version !== index + 1)) {
  throw new Error('Invalid portfolio version manifest');
}

function run(command, args, cwd, env) {
  execFileSync(command, args, { cwd, env, stdio: 'inherit' });
}

async function checkout(commit, directory) {
  const archive = join(directory, '.snapshot.tar');
  try {
    run('git', ['archive', '--output', archive, commit], root, process.env);
    run('tar', ['-xf', archive, '-C', directory], directory, process.env);
  } finally {
    await rm(archive, { force: true });
  }
}

async function edit(directory, path, transform) {
  const file = join(directory, path);
  const source = await readFile(file, 'utf8');
  const changed = transform(source);
  if (source === changed) throw new Error(`Archive adaptation did not match ${path}`);
  await writeFile(file, changed);
}

async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const paths = await Promise.all(entries.map(entry => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? files(path) : [path];
  }));
  return paths.flat();
}

const disabled = `<p id="archive-live-notice" tabIndex={-1} data-archive-retired>Live assistant retired. <a href="/contact/">Contact Abrar</a></p>`;
const escape = value => value.replace(/[&<>"']/g, letter => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[letter]);

function archiveMarkup(entry) {
  const links = versions.toReversed().map(({ version, slug, name, date, current }) =>
    `<li><a href="${current ? '/' : `/versions/${slug}/`}"${slug === entry.slug ? ' aria-current="true"' : ''}>v${version} · ${escape(name)}<small>${date.slice(0, 4)} · ${current ? 'Current' : 'Archived'}</small></a></li>`
  ).join('');
  return `<nav id="portfolio-archive" aria-label="Portfolio versions"><details><summary>Versions · v${entry.version} archived</summary><ul>${links}</ul></details></nav>`;
}

async function writeTerminalBlogIndexes(directory, historicalLibrary) {
  const content = join(directory, 'src/content/blogs');
  const posts = Object.fromEntries(await Promise.all(
    (await readdir(content)).filter(name => name.endsWith('.md')).map(async name =>
      [name, { default: await readFile(join(content, name), 'utf8') }])
  ));
  const library = historicalLibrary;
  const generator = join(directory, 'src/lib/archive-blog-index.mjs');
  const source = library.replace(/^const blogFiles = import\.meta\.glob.*$/m,
    () => `const blogFiles = ${JSON.stringify(posts)};`);
  if (source === library) throw new Error('Unable to generate Terminal homepage index');
  await writeFile(generator, source);
  try {
    const { getAllBlogs } = await import(pathToFileURL(generator).href);
    const posts = getAllBlogs();
    await writeFile(join(directory, 'src/lib/archive-blog-latest.json'), JSON.stringify(
      posts.slice(0, 3).map(({ title, slug, date, heroImage, tags, description }) =>
        ({ title, slug, date, heroImage, tags, description }))
    ));
    await writeFile(join(directory, 'src/lib/archive-blog-index.json'), JSON.stringify(
      posts.map(({ title, slug, date, heroImage, tags, description, author, readingTime, techTree, sections }) =>
        ({ title, slug, date, heroImage, tags, description, author, readingTime, techTree,
          sections: sections.map(({ type }) => ({ type })) }))
    ));
  } finally {
    await rm(generator);
  }
}

async function buildVersion(entry, workspace, site) {
  const { commit, slug } = entry;
  const buildRoom = slug === 'zero-to-built';
  const directory = join(workspace, slug);
  const prefix = `/versions/${slug}/`;
  await mkdir(directory);
  await checkout(commit, directory);
  let terminalLibrary;
  const homePath = slug === 'serif' ? 'src/App.jsx' : 'src/pages/Home.jsx';
  // Archives open directly into the historical design without the timed splash.
  if (buildRoom) {
    await edit(directory, 'src/App.jsx', source => source.replace(
      /^  const \[intro, setIntro\] = useState\(.*$/m,
      '  const [intro, setIntro] = useState(false);'
    ));
  } else {
    await edit(directory, homePath, source => source.replace(
      /const \[isLoading, setIsLoading\] = useState\((?:true|\(\) => \{[\s\S]*?\n  \})\);/,
      'const [isLoading, setIsLoading] = useState(false);'
    ));
  }
  if (slug === 'serif') {
    await edit(directory, homePath, source => source
      .replace('useLayoutEffect, useRef', 'useLayoutEffect, useRef, lazy, Suspense')
      .replace(/^import ChatBot from .*\n/m, '')
      .replace(/^import ThreeBackground from .*$/m,
        "const ThreeBackground = lazy(() => import('./components/ThreeBackground'));")
      .replace('<ThreeBackground theme={theme} />',
        "{!matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)').matches && <Suspense fallback={null}><ThreeBackground theme={theme} /></Suspense>}")
      .replace(/<ChatBot\b[^>]*\/>/, disabled)
      .replace('if (heroElements) {', "if (heroElements && !matchMedia('(prefers-reduced-motion: reduce)').matches) {\n        const offset = matchMedia('(max-width: 479px)').matches ? 12 : 50;")
      .replaceAll('{ x: -50, opacity: 0 }', '{ x: -offset, opacity: 0 }')
      .replaceAll('{ x: 50, opacity: 0 }', '{ x: offset, opacity: 0 }')
      .replace('font-custom text-purple-500 text-6xl', 'font-custom text-purple-500 text-[clamp(2.25rem,14vw,3.75rem)]')
      .replace('<img src="images/myimg.jpg"', '<img loading="lazy" decoding="async" src="images/myimg.jpg"'));
    await edit(directory, 'src/index.css', source =>
      source.replace(/@font-face \{[^}]*MagnificChaos[^}]*\}\s*/, ''));
    await edit(directory, 'src/components/SectionWrapper.jsx', source => source
      .replace('if (!el) return;', "if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return;")
      .replace('filter: "blur(10px)"', "filter: matchMedia('(pointer: coarse)').matches ? 'none' : 'blur(10px)'"));
    await edit(directory, 'src/components/ProjectCard.jsx', source =>
      source.replace('<img src={project.image}', '<img loading="lazy" decoding="async" src={project.image}'));
    await edit(directory, 'src/components/ThreeBackground.jsx', source => source
      .replace('const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });',
        'let renderer; try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); } catch { return; }')
      .replace('const animate = () => {\n      requestAnimationFrame(animate);',
        'const mount = mountRef.current;\n    let frame;\n    const animate = () => {\n      frame = requestAnimationFrame(animate);')
      .replace("if (mountRef.current) mountRef.current.innerHTML = '';",
        'cancelAnimationFrame(frame);\n      mount?.replaceChildren();\n      geo.dispose(); mat.dispose(); particlesGeo.dispose(); particlesMat.dispose(); renderer.dispose();'));
  }
  if (slug === 'cyberterminal') {
    await edit(directory, homePath, source => source
      .replace(/^import CyberTerminal from .*\n/m, '')
      .replace(/^import \{ getAllBlogs \} from .*$/m, "import latestBlogs from '../lib/archive-blog-latest.json';")
      .replace(/^  const \[isTerminalOpen, setIsTerminalOpen\].*\n/m, '')
      .replace(/  useEffect\(\(\) => \{\n    const handleKeyDown = [\s\S]*?\n  \}, \[\]\);\n/, '')
      .replace('<FloatingDock onOpenTerminal={() => setIsTerminalOpen(true)} />',
        "<FloatingDock onOpenTerminal={() => document.getElementById('archive-live-notice')?.focus()} />")
      .replace('<ThreeBackground theme={theme} />',
        "{!matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)').matches && <ThreeBackground theme={theme} />}")
      .replace(/<CyberTerminal\b[\s\S]*?\/>/, disabled)
      .replace('const latestBlogs = getAllBlogs().slice(0, 3);', ''));
    terminalLibrary = await readFile(join(directory, 'src/lib/blogUtils.js'), 'utf8');
    await edit(directory, 'src/lib/blogUtils.js', source => source
      .replace("import { marked } from 'marked';", "import { marked } from 'marked';\nimport archiveIndex from './archive-blog-index.json';")
      .replace("query: '?raw', eager: true", "query: '?raw', import: 'default'")
      .replace(/export function getAllBlogs\(\) \{[\s\S]*?(?=\/\*\*\n \* Convert raw markdown)/,
        `export function getAllBlogs() { return archiveIndex; }

export async function getBlogBySlug(slug) {
  const post = archiveIndex.find(entry => entry.slug === slug);
  const load = blogFiles[\`../content/blogs/\${slug}.md\`];
  if (!post || !load) return null;
  const { data, content } = parseFrontmatter(await load());
  const sections = parseContentBlocks(content);
  const text = sections.filter(section => section.type !== 'interactive').map(section => section.content || '').join(' ');
  return { ...post, faq: data.faq || null, sections, readingTime: calculateReadingTime(text) };
}

`));
    await edit(directory, 'src/pages/BlogPost.jsx', source => source
      .replace('const blog = getBlogBySlug(slug);', `const [load, setLoad] = useState(null);
  useEffect(() => {
    let active = true;
    getBlogBySlug(slug).then(
      blog => { if (active) setLoad({ slug, blog }); },
      () => { if (active) setLoad({ slug, failed: true }); }
    );
    return () => { active = false; };
  }, [slug]);
  const blog = load?.slug === slug ? load.blog : null;`)
      .replace('  if (!blog) {', `  if (load?.slug !== slug) {
    return <p className="mx-auto max-w-3xl px-6 py-24" role="status">Loading article…</p>;
  }
  if (load.failed) {
    return <div className="mx-auto max-w-3xl px-6 py-24" role="alert">
      <p>Could not load this article.</p>
      <button type="button" onClick={() => window.location.reload()}>Try again</button>
      <Link to="/blog">Back to articles</Link>
    </div>;
  }
  if (!blog) {`));
    await edit(directory, 'src/components/FloatingDock.jsx', source => source
      .replace("label: 'CLI'", "label: 'CLI archive'")
      .replace('aria-label="FixO CLI Terminal"', 'aria-label="About the archived terminal"')
      .replace('CLI Mode (~ / Cmd+K)', 'About the archived terminal'));
    await edit(directory, 'src/components/ThreeBackground.jsx', source => source
      .replace("(prefers-reduced-motion: reduce)", "(prefers-reduced-motion: reduce), (pointer: coarse)")
      .replace('const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });',
        'let renderer; try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); } catch { return; }'));
  }

  if (slug !== 'serif' && !buildRoom) {
    // Let Rollup follow the route graph instead of pulling shared dependencies into a global chunk.
    await edit(directory, 'vite.config.js', source => source.replace(/  build: \{[\s\S]*?\n  \}\n/, ''));
  }

  // Scope legacy hardcoded public URLs. Vite handles imported assets and BASE_URL.
  const env = { PATH: process.env.PATH, HOME: workspace, CI: 'true', npm_config_cache: process.env.npm_config_cache || join(tmpdir(), 'portfolio-npm-cache') };
  if (slug === 'halide' || buildRoom) {
    run('node', ['scripts/build-blog-index.mjs'], directory, env);
    await edit(directory, 'src/components/SEO.jsx', source => source.replace('noindex = false,', 'noindex = true,'));
  }
  if (slug === 'halide') {
    await edit(directory, 'src/components/FloatingDock.jsx', source =>
      source.replace('href="/hire/"', 'href={import.meta.env.BASE_URL + "hire/"}'));
  }
  run('npm', ['ci', '--ignore-scripts', '--no-audit', '--no-fund', '--prefer-offline'], directory, env);
  if (slug === 'cyberterminal') await writeTerminalBlogIndexes(directory, terminalLibrary);
  const publicEntries = await readdir(join(directory, 'public'), { withFileTypes: true });
  const publicNames = publicEntries.filter(entry => !entry.name.startsWith('.')).map(entry =>
    entry.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + (entry.isDirectory() ? '/' : '(?=[?#"\x27`\\s)])')
  );
  const assetUrl = new RegExp(`(["'\`(])/(?:Abrar-Akhunji/)?(?=${publicNames.join('|')})`, 'g');
  const sources = [...await files(join(directory, 'src')), join(directory, 'index.html')];
  if (buildRoom) sources.push(join(directory, 'public/assets/audio/flow-manifest.json'));
  for (const file of sources) {
    if (!/\.(?:jsx?|tsx?|css|html|md|json)$/.test(file)) continue;
    const source = await readFile(file, 'utf8');
    const scoped = source.replace(assetUrl, `$1${prefix}`);
    if (source !== scoped) await writeFile(file, scoped);
  }


  run('npm', ['exec', '--', 'vite', 'build', '--base', prefix], directory, env);

  const built = join(directory, 'dist');
  for (const asset of await files(built)) {
    if (/(?:^|\/)(?:\.[^/]+|CNAME|robots\.txt|sitemap\.(?:xml|xsl)|llms[^/]*\.txt)$|\.(?:php\d*|phtml|cgi|pl|asp|aspx|sh|sql|env|zip|htaccess)$/i.test(asset)) {
      await rm(asset);
    }
  }
  const versionSite = join(site, slug);
  await cp(built, versionSite, { recursive: true });
  const [stylesheet, script] = await Promise.all(['css', 'js'].map(async extension => {
    const content = await readFile(join(root, 'versions', `archive.${extension}`));
    const revision = createHash('sha256').update(content).digest('hex').slice(0, 12);
    const name = `archive-${revision}.${extension}`;
    await writeFile(join(versionSite, name), content);
    return name;
  }));

  const connections = buildRoom ? "'self'" : "'none'";
  const policy = `connect-src ${connections}; form-action 'none'; object-src 'none'; base-uri 'none'; frame-src 'none'; script-src 'self'`;
  const head = `<meta name="robots" content="noindex, nofollow"><meta http-equiv="Content-Security-Policy" content="${policy}"><link rel="stylesheet" href="${prefix}${stylesheet}">`;
  const footer = `${archiveMarkup(entry)}<script defer src="${prefix}${script}"></script>`;
  let index = await readFile(join(versionSite, 'index.html'), 'utf8');
  if (buildRoom) index = index.replace(/<script>([\s\S]*?)<\/script>/gi, '');
  const page = index
    .replace(/<link\b[^>]*rel=["'](?:canonical|alternate)["'][^>]*>/gi, '')
    .replace(/<meta\b[^>]*name=["'](?:robots|googlebot|bingbot)["'][^>]*>/gi, '')
    .replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<head>/i, `<head>${head}`)
    .replace(/<\/body>/i, `${footer}</body>`);
  await writeFile(join(versionSite, 'index.html'), page);
  const routes = buildRoom ? ['about', 'blog', 'contact', 'hire', 'privacy', 'terms', 'work']
    : slug === 'halide' ? ['blog', 'hire'] : slug === 'cyberterminal' ? ['blog'] : [];
  if (buildRoom) {
    const portfolio = JSON.parse(await readFile(join(directory, 'src/data/portfolio.json'), 'utf8'));
    routes.push(...portfolio.projects.map(project => `work/${project.slug}`));
  }
  if (routes.length) {
    for (const path of await readdir(join(directory, 'src/content/blogs'))) {
      if (!/^[a-z0-9-]+\.md$/.test(path)) continue;
      const post = path.slice(0, -3);
      routes.push(`blog/${post}`);
      if (slug === 'halide' || buildRoom) routes.push(`blog/${post.replace(/^\d{4}-\d{2}-\d{2}-/, '')}`);
    }
  }
  for (const route of new Set(routes)) {
    const path = join(versionSite, route);
    await mkdir(path, { recursive: true });
    await writeFile(join(path, 'index.html'), page);
  }
  await writeFile(join(versionSite, '404.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">${head}<title>Page unavailable</title></head><body><main><h1>Page unavailable in this version</h1><p><a href="${prefix}">Back to ${escape(entry.name)}</a></p></main>${footer}</body></html>`);
  await writeFile(join(versionSite, '.htaccess'), `ErrorDocument 404 ${prefix}404.html\n<IfModule mod_headers.c>\n  Header always set X-Robots-Tag "noindex, nofollow"\n  Header always set Content-Security-Policy "${policy}"\n</IfModule>\n`);
}

await mkdir(join(root, 'dist'), { recursive: true });
const workspace = await mkdtemp(join(tmpdir(), 'portfolio-versions-'));
const stage = await mkdtemp(join(root, 'dist/.versions-'));
try {
  for (const entry of archives) await buildVersion(entry, workspace, stage);
  await rm(output, { recursive: true, force: true });
  await rename(stage, output);
} finally {
  await rm(workspace, { recursive: true, force: true });
  await rm(stage, { recursive: true, force: true });
}

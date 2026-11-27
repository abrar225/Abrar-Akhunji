const esc = (v = '') => String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const link = p => `/work/${p.slug}/`;
const shell = body => `<main class="patch-wide patch-static-project">${body}</main>`;
export function renderWork(projects) {
 return shell(`<div class="page-intro"><p class="section-kicker">The project shelf</p><h1>Useful things.<br>Different kinds of hard.</h1><p>AI, developer tools, native software and the web.</p></div><div class="work-grid">${projects.map(p=>`<article class="work-card"><a href="${link(p)}"><div class="work-card-image"><img src="${esc(p.image)}" alt="${esc(p.imageAlt)}" width="900" height="600" loading="lazy"></div><p class="project-category">${esc(p.category)} / ${esc(p.status)}</p><h2>${esc(p.title)}</h2></a><p>${esc(p.summary)}</p></article>`).join('')}</div>`);
}
export function renderProject(p) {
 return shell(`<a class="text-link" href="/work/">Back to all work</a><header class="case-header"><p class="project-category">${esc(p.category)} / ${esc(p.status)}</p><h1>${esc(p.title)}</h1><p class="case-lead">${esc(p.summary)}</p><div class="button-row">${p.demo?`<a class="button-primary" href="${esc(p.demo)}">View project</a>`:''}${p.github?`<a class="button-secondary" href="${esc(p.github)}">Source on GitHub</a>`:''}</div></header><figure class="case-preview"><img src="${esc(p.image)}" alt="${esc(p.imageAlt)}" width="1200" height="750"><figcaption>Actual project interface / ${esc(p.status)}</figcaption></figure><div class="case-body"><section><h2>The problem.</h2><p>${esc(p.problem)}</p></section><section><h2>My contribution.</h2><p>${esc(p.contribution)}</p></section><section><h2>How the parts connect.</h2><ol class="case-layers">${p.layers.map(l=>`<li><h3>${esc(l.title)}</h3><p>${esc(l.detail)}</p></li>`).join('')}</ol></section><section><h2>The decisions.</h2>${p.decisions.map(d=>`<article class="decision"><h3>${esc(d.title)}</h3><p>${esc(d.detail)}</p></article>`).join('')}</section><section><h2>Build, test, deliver.</h2>${p.evidence.map(e=>`<article class="decision">${e.url?`<a href="${esc(e.url)}">${esc(e.label)}</a>`:`<h3>${esc(e.label)}</h3>`}<p>${esc(e.detail)}</p></article>`).join('')}</section><section><h2>What to keep in mind.</h2>${p.limitations.map(l=>`<p>${esc(l)}</p>`).join('')}</section></div>`);
}
export function renderBuildHome(portfolio, posts, github) {
 const packet = portfolio.projects.find(project=>project.slug==='packetlark');
 return `<main>
  <section id="home" class="patch-static-hero"><div class="patch-wide"><p class="patch-label">AI &amp; full-stack engineer / Ahmedabad, India</p>
    <h1>Abrar Akhunji.</h1><p>I build local AI tools, developer software, and native apps.</p><p>Open to engineering roles &amp; collaborations</p><a href="#work">Follow the signal to PacketLark ↓</a></div></section>
  <div class="patch-wide patch-static-project">
    <section id="work"><h2>${esc(packet.title)}</h2><figure><img src="${esc(packet.image)}" alt="${esc(packet.imageAlt)}" width="1200" height="833"><figcaption>Product interface</figcaption></figure><p>${esc(packet.description)}</p><p>${esc(packet.decisions[0].detail)}</p><a href="${link(packet)}">Read the case study</a> · <a href="/work/">All work</a></section>
    <section id="engineering"><h2>How the parts connect</h2><ul>${packet.layers.map(layer=>`<li><strong>${esc(layer.title)}</strong> ${esc(layer.detail)}</li>`).join('')}</ul></section>
    <section id="about-me"><h2>About Abrar</h2><a href="/about/">Learn about my background</a><div id="experience">${portfolio.experience.map(j=>`<article><h3>${esc(j.role)}</h3><p>${esc(j.date)} / ${esc(j.desc)}</p></article>`).join('')}</div></section>
    <section id="writing"><h2>The Neural Log</h2>${posts.slice(0,3).map(p=>`<p><a href="/blog/${p.slug}/">${esc(p.title)}</a></p>`).join('')}</section>
    <section id="activity"><h2>GitHub activity</h2><p><strong>${esc(github.totalContributions.toLocaleString('en'))} GitHub contributions</strong> from ${esc(github.days[0].date)} through ${esc(github.days.at(-1).date)}. Calendar snapshot fetched ${esc(github.fetchedAt.slice(0,10))} (UTC).</p><a href="${esc(github.profileUrl)}">View @${esc(github.username)} on GitHub</a></section>
    <section id="services"><h2>A place on your team</h2><a href="/hire/">Engineering services and availability</a></section>
    <section id="contact"><h2>Contact</h2><a href="/contact/">Contact channels</a> · <a href="mailto:abrar@abrarakhunji.com">abrar@abrarakhunji.com</a></section>
  </div></main>`;
}

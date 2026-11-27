const resume = 'https://drive.google.com/file/d/1dV5ukxF-i-9JcWCaxsbQljNwL7Dni8Jc/view?usp=sharing';

export function staticRoot(content, kind = 'page') {
  return `<div id="root"><div class="patch-shell patch-static patch-static-${kind}" data-portfolio-version="v5">
    <header class="patch-header"><div class="patch-wide patch-header-inner"><a class="patch-brand" href="/" aria-label="Abrar Akhunji, home">∿ AA</a>
      <nav class="patch-main-links" aria-label="Primary"><a href="/work/">Work</a><a href="/blog/" class="patch-extra">Writing</a><a href="/about/" class="patch-extra">About</a><a href="${resume}">Résumé</a><a href="/contact/">Contact</a></nav></div></header>
    <div class="patch-static-body">${content}</div>
    <footer class="patch-footer" id="playground"><div class="patch-wide patch-footer-grid"><div><p>Let’s work together.</p><a href="mailto:abrar@abrarakhunji.com">abrar@abrarakhunji.com</a></div>
    <nav aria-label="Footer"><a href="/work/">Work</a><a href="/blog/">Writing</a><a href="/about/">About</a><a href="/hire/">Hire</a><a href="/agents-at-work/">Agents at Work</a></nav><nav aria-label="Policies"><a href="/privacy/">Privacy</a><a href="/terms/">Terms</a></nav></div></footer>
  </div></div>`;
}

const names = ['Copy','Type','Builder','AI','Layout','Ship','Codex','Scout','Pixel','Motion','Review','Systems'];
const colors = ['#2868d6','#a53e35','#397568'];
const ease = t => t * t * (3 - 2 * t);
export function startShowcase(root) {
  const blocks = [...root.querySelectorAll('[data-block]')];
  const sections = [...root.querySelectorAll('[data-section]')];
  const progress = root.querySelector('[data-progress]');
  const log = root.querySelector('[data-log]');
  const status = root.querySelector('[data-status]');
  const layer = root.querySelector('[data-cursors]');
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0, disposed = false, mode = 'auto', forced = new URLSearchParams(location.search).has('play');
  let jobs = [], done = new Set(), visible = new Set(), started = performance.now(), lastWheel = -Infinity, touchY = 0;
  let camera = null, reverse = null, cursorIndex = 0;
  const agents = names.map((name,i) => {
    const el = document.createElement('div');
    el.className = 'agent-pointer'; el.style.color = colors[i % 3];
    el.innerHTML = '<svg width="20" height="25" viewBox="0 0 20 25"><path d="M2 2 L17 15 L10 16 L7 23 Z" fill="currentColor" stroke="white" stroke-width="1.5"/></svg><span></span>';
    el.lastChild.textContent = name; layer.append(el);
    return { name, el, x: 30+i*22, y: 120+i*7, job: null };
  });
  function state(block, value) { block.dataset.state = value; block.firstElementChild.inert = value !== 'done'; }
  function clean(block) { block.querySelector('[data-typed-overlay]')?.remove(); block.querySelector('[data-type]')?.removeAttribute('data-typing'); }
  function update() {
    progress.textContent = `${done.size} / ${blocks.length} built`;
    root.dataset.mode = mode;
    if (done.size === blocks.length) { mode = 'done'; root.dataset.mode = mode; status.textContent = 'Showcase complete.'; progress.textContent += ` · ${((performance.now()-started)/1000).toFixed(1)}s`; }
  }
  function finish(block, agent) {
    clean(block); state(block,'done'); done.add(block);
    if (agent) {
      const line = document.createElement('p');
      line.textContent = `${((performance.now()-started)/1000).toFixed(1)}s  ${agent.name}  ${block.dataset.code}`;
      log.append(line); while(log.children.length > 4) log.firstChild.remove();
    }
    update();
  }
  function reveal() {
    jobs = []; camera = null; reverse = null; agents.forEach(a => { a.job = null; });
    blocks.forEach(b => finish(b)); root.removeAttribute('data-running'); layer.hidden = true;
  }
  function scrollToY(y, now) { camera = { from: scrollY, to: Math.max(0,Math.min(y,document.documentElement.scrollHeight-innerHeight)), at: now }; }
  function handover() {
    if (forced || mode !== 'auto') return;
    mode = 'visible'; camera = null;
    // Release unfinished offscreen work so a jump to the bottom never keeps the queue above.
    jobs = jobs.filter(j => { if (visible.has(j.section)) return true; clean(j.block); state(j.block,'empty'); j.agent.job=null; return false; });
    update(); status.textContent = 'You control the scroll.';
  }
  const wheel = e => { if (Math.abs(e.deltaY)<8) return; const now=performance.now(); if(now-lastWheel<500) handover(); lastWheel=now; };
  const touchstart = e => { touchY=e.touches[0].clientY; };
  const touchmove = e => { if(Math.abs(e.touches[0].clientY-touchY)>=60) handover(); };
  const key = e => { if(e.target.closest('input,textarea,select,[contenteditable],button')) return; if(['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(e.key)) handover(); };
  const click = e => { if(e.target.closest('a[href^="#"]')) { forced=false; handover(); } };
  const observer = new IntersectionObserver(entries => { entries.forEach(e => { if(e.isIntersecting) visible.add(e.target); else visible.delete(e.target); }); }, {threshold:0});
  sections.forEach(s=>observer.observe(s));
  function begin(now, replay=false) {
    reveal(); if(media.matches) return;
    done=new Set(); started=now; mode='auto'; forced=replay || new URLSearchParams(location.search).has('play'); log.replaceChildren();
    blocks.forEach(b=>state(b,'empty')); layer.hidden=false; root.dataset.running=''; update();
    scrollToY(0,now);
  }
  function rebuild() {
    cancelAnimationFrame(frame); frame=requestAnimationFrame(tick);
    if(media.matches) { reveal(); return; }
    jobs=[]; camera=null; agents.forEach(a=>{a.job=null;}); blocks.forEach(clean);
    root.dataset.running=''; layer.hidden=true; mode='reverse'; root.dataset.mode=mode; reverse={at:performance.now(),index:blocks.length-1,stage:0};
  }
  function schedule(now) {
    if (mode !== 'auto' && mode !== 'visible') return;
    const candidates = mode==='auto' ? [sections.find(s=>[...s.querySelectorAll('[data-block]')].some(b=>!done.has(b)))] : sections.filter(s=>visible.has(s));
    const cap=innerWidth<640?2:4;
    for(const section of candidates.filter(Boolean)) {
      for(const block of section.querySelectorAll('[data-block]')) {
        if(jobs.length>=cap) return;
        if(done.has(block)||jobs.some(j=>j.block===block)) continue;
        const requested=agents.find(a=>a.name===block.dataset.agent);
        if(requested?.job) continue;
        const agent=requested || agents.slice(cursorIndex).concat(agents.slice(0,cursorIndex)).find(a=>!a.job);
        if(!agent) return; cursorIndex=(agents.indexOf(agent)+1)%agents.length;
        const rect=block.getBoundingClientRect();
        const travel=Math.min(550,180+Math.hypot(rect.left-agent.x,rect.top+scrollY-agent.y)*.15);
        const job={block,agent,section,at:now,travel,fromX:agent.x,fromY:agent.y};
        agent.job=job; jobs.push(job); state(block,'mark');
      }
    }
    if(mode==='auto' && jobs.length && !camera) {
      const rects=jobs.map(j=>j.block.getBoundingClientRect());
      const top=Math.min(...rects.map(r=>r.top))+scrollY-95;
      const bottom=Math.max(...rects.map(r=>r.bottom))+scrollY+140;
      const target=Math.min(top,Math.max(scrollY,bottom-innerHeight));
      if(Math.abs(target-scrollY)>15) scrollToY(target,now);
    }
  }
  function tick(now) {
    if(disposed) return;
    try {
      if(camera) { const t=Math.min(1,(now-camera.at)/650); window.scrollTo({top:camera.from+(camera.to-camera.from)*ease(t),behavior:'instant'}); if(t===1) camera=null; }
      if(reverse && now-reverse.at>45) {
        const b=blocks[reverse.index]; state(b,reverse.stage?'empty':'rough'); reverse.at=now;
        if(reverse.stage) { reverse.index--; reverse.stage=0; } else reverse.stage=1;
        if(reverse.index<0) { reverse=null; begin(now,true); }
      }
      schedule(now);
      for(const job of [...jobs]) {
        const {block,agent,travel}=job, elapsed=now-job.at;
        const r=block.getBoundingClientRect(), x=r.left, y=r.top+scrollY;
        let tx=x,ty=y,t=Math.min(1,elapsed/travel);
        if(elapsed>=travel) {
          t=Math.min(1,(elapsed-travel)/440); tx=x+r.width*t; ty=y+r.height*t;
          block.style.setProperty('--mark-w',`${r.width*t}px`); block.style.setProperty('--mark-h',`${r.height*t}px`);
          block.dataset.dimensions=`${Math.round(r.width*t)} × ${Math.round(r.height*t)}`;
          if(t===1) state(block,'rough');
        }
        const e=ease(t), bow=Math.sin(Math.PI*e)*20;
        agent.x=elapsed<travel?job.fromX+(tx-job.fromX)*e+bow:tx;
        agent.y=elapsed<travel?job.fromY+(ty-job.fromY)*e:y+r.height*t;
        if(elapsed>travel+650) {
          const title=block.querySelector('[data-type]');
          if(title) {
            let overlay=title.querySelector('[data-typed-overlay]');
            if(!overlay) { overlay=document.createElement('span'); overlay.dataset.typedOverlay=''; overlay.setAttribute('aria-hidden','true'); title.dataset.typing=''; title.append(overlay); }
            const text=title.firstChild.textContent;
            const count=Math.min(text.length,Math.floor((elapsed-travel-650)/15)); overlay.textContent=text.slice(0,count); overlay.style.setProperty('--agent-color',agent.el.style.color);
            const range=document.createRange(); if(overlay.firstChild) { range.setStart(overlay.firstChild,count); range.collapse(true); const caret=range.getBoundingClientRect(); agent.x=caret.right; agent.y=caret.bottom+scrollY; }
          }
          if(elapsed>travel+650+(title?title.firstChild.textContent.length*15:120)) { finish(block,agent); agent.job=null; jobs=jobs.filter(j=>j!==job); }
        }
      }
      const active=jobs[0]?.section.getBoundingClientRect();
      agents.forEach((a,i)=>{
        if(!a.job && active) { a.x+=(Math.max(15,Math.min(innerWidth-100,innerWidth/2+Math.cos(now/1700+i)*innerWidth*.35))-a.x)*.025; a.y+=(active.top+scrollY+70+Math.sin(now/1300+i)*45-a.y)*.025; }
        a.el.style.transform=`translate3d(${a.x}px,${a.y}px,0)`;
      });
      if(mode==='done') { layer.hidden=true; root.removeAttribute('data-running'); }
    } catch { reveal(); }
    if(mode !== 'done') frame=requestAnimationFrame(tick);
  }
  const skip=root.querySelector('[data-skip]'), replay=root.querySelector('[data-rebuild]');
  skip.addEventListener('click',reveal); replay.addEventListener('click',rebuild);
  const changed=()=>{if(media.matches) reveal();}; media.addEventListener('change',changed);
  window.addEventListener('wheel',wheel,{passive:true}); window.addEventListener('touchstart',touchstart,{passive:true}); window.addEventListener('touchmove',touchmove,{passive:true}); window.addEventListener('keydown',key); root.addEventListener('click',click);
  root.dataset.enhanced=''; begin(performance.now()); frame=requestAnimationFrame(tick);
  return ()=>{ disposed=true; cancelAnimationFrame(frame); observer.disconnect(); reveal(); layer.replaceChildren(); skip.removeEventListener('click',reveal); replay.removeEventListener('click',rebuild); media.removeEventListener('change',changed); window.removeEventListener('wheel',wheel); window.removeEventListener('touchstart',touchstart); window.removeEventListener('touchmove',touchmove); window.removeEventListener('keydown',key); root.removeEventListener('click',click); };
}

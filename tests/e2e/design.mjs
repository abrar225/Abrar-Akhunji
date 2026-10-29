import { chromium, firefox, webkit } from 'playwright';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
const base='http://127.0.0.1:4175';const output=process.env.DESIGN_OUTPUT||'docs/implementation/verification';
await fs.mkdir(output,{recursive:true});
const server=spawn('node',['node_modules/vite/bin/vite.js','preview','--host','127.0.0.1','--port','4175','--strictPort'],{stdio:'ignore'});
const delay=ms=>new Promise(r=>setTimeout(r,ms));
for(let i=0;i<50;i++){try{if((await fetch(base)).ok)break;}catch{}await delay(200);}
const openedBrowsers=new Set();
const report={date:'2026-10-28',browsers:[],views:[],performance:[],limitations:['Physical phone testing is not available in this environment. WebKit is an automated engine check, not an actual Safari/iOS device test.']};
try{
 for(const [name,engine] of [['chromium',chromium],['firefox',firefox],['webkit',webkit]]){
  let browser; try { browser=await engine.launch({headless:true,timeout:20000}); } catch(error) { report.browsers.push({name,result:'environment-blocked',detail:error.message.slice(0,1200)}); console.log('BLOCKED engine launch',name); continue; }
  openedBrowsers.add(browser);const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'});
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/?project=packetlark#work');await page.locator('#selected-product h3').waitFor();
  assert.equal(await page.locator('#selected-product h3').innerText(),'PacketLark');
  await page.locator('.project-selector').getByRole('button',{name:'Fixo Flow'}).click();await page.waitForFunction(()=>document.querySelector('#selected-product h3')?.textContent==='Fixo Flow');assert.equal(await page.locator('#selected-product h3').innerText(),'Fixo Flow');
  await page.locator('.project-selector button').first().focus();await page.keyboard.press('End');await page.waitForFunction(()=>document.querySelector('#selected-product h3')?.textContent==='Framecast Studio');
  await page.getByRole('button',{name:'Next project',exact:true}).click();await page.waitForFunction(()=>document.querySelector('#selected-product h3')?.textContent==='Fixo Flow');
  await page.getByRole('button',{name:'Previous project',exact:true}).click();await page.waitForFunction(()=>document.querySelector('#selected-product h3')?.textContent==='Framecast Studio');
  assert.match(await page.locator('.selected-preview').getAttribute('href'),/framecast-studio/);
  await page.getByRole('button',{name:'Explore in 3D'}).click();await page.getByRole('button',{name:'Reset view'}).click();
  await page.goto(base+'/blog/');await page.getByRole('button',{name:'Tech Tree'}).click();await page.waitForFunction(()=>document.body.innerText.includes('Autonomous Agent Memory'));assert.match(await page.locator('body').innerText(),/Autonomous Agent Memory/);
  await page.goto(base+'/work/framecast-studio/');await page.locator('.case-body').waitFor();assert.match(await page.locator('.case-header').innerText(),/in development/i);
  assert.deepEqual(errors,[]);report.browsers.push({name,result:'pass'});console.log('PASS cross-browser',name);
  await browser.close();
 }
 const browser=await chromium.launch({headless:true});openedBrowsers.add(browser);
 for(const width of [390,768,1440,1920])for(const theme of ['light','dark']){
  const context=await browser.newContext({viewport:{width,height:960},reducedMotion:'reduce'});await context.addInitScript(t=>localStorage.setItem('theme',t),theme);
  const page=await context.newPage();await page.goto(base+'/');await page.locator('h1').waitFor();await page.evaluate(()=>document.fonts.ready);await delay(200);
  for(const [name,selector]of[['arrival','#home'],['brief','[data-scene="brief"]'],['work','#work'],['engineering','[data-scene="inspect"]'],['builder','#about-me'],['contact','#contact']]){
   await page.locator(selector).evaluate(el=>window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY-90,behavior:'instant'}));if(name==='engineering')await page.getByRole('button',{name:'Inside the build',exact:true}).click();
   await delay(180);await page.screenshot({path:`${output}/${width}-${theme}-${name}.png`});
   const dimensions=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));assert.ok(dimensions.scroll<=width+2,`${width} ${name} overflow: ${dimensions.scroll}`);report.views.push({width,theme,scene:name,result:'pass'});
  }
  await context.close();console.log('PASS six-scene capture',width,theme);
 }
 const fallbackContext=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
 await fallbackContext.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return /webgl/.test(type)?null:original.call(this,type,...args);};});
 const fallback=await fallbackContext.newPage();await fallback.goto(base+'/#work');await fallback.getByText('A still view of the workbench.',{exact:true}).waitFor();
 await fallback.getByRole('button',{name:'Next project',exact:true}).click();await fallback.waitForFunction(()=>document.querySelector('#selected-product h3')?.textContent==='PacketLark');
 await fallback.waitForFunction(()=>{const image=document.querySelector('.mobile-scene .scene-fallback img');return image?.currentSrc.includes('room-packetlark-light-mobile.webp')&&image.complete&&image.naturalWidth>0;});assert.ok(await fallback.locator('.selected-preview img').evaluate(e=>e.complete&&e.naturalWidth>0));
 await fallback.screenshot({path:output+'/mobile-webgl-fallback.png'});await fallbackContext.close();report.fallback='pass';
 const zoomContext=await browser.newContext({viewport:{width:720,height:450},reducedMotion:'reduce'});const zoom=await zoomContext.newPage();await zoom.goto(base+'/');await zoom.locator('h1').waitFor();await zoom.evaluate(()=>document.fonts.ready);assert.ok(await zoom.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2));await zoom.screenshot({path:output+'/200-percent-reflow.png'});await zoomContext.close();report.zoomReflow='pass: 720x450 CSS viewport represents 200% reflow of 1440x900; native browser zoom not measured';
 const context=await browser.newContext({viewport:{width:390,height:844}});const page=await context.newPage();
 await page.addInitScript(()=>{window.__lab={lcp:0,cls:0};new PerformanceObserver(list=>{window.__lab.lcp=list.getEntries().at(-1).startTime;}).observe({type:'largest-contentful-paint',buffered:true});new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.__lab.cls+=e.value;}).observe({type:'layout-shift',buffered:true});});
 const cdp=await context.newCDPSession(page);await cdp.send('Network.enable');await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:200000,uploadThroughput:93750});await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
 await page.goto(base+'/');await page.waitForTimeout(12000);
 const perf=await page.evaluate(()=>({...window.__lab,transfer:performance.getEntriesByType('resource').reduce((s,e)=>s+e.transferSize,0)}));report.performance.push({profile:'Chromium 390x844, 4x CPU, 1.6Mbps down / 150ms RTT, cold browser context',...perf});console.log('LAB',perf);
 await context.close();
 const idleContext=await browser.newContext({viewport:{width:1440,height:900}});const idle=await idleContext.newPage();await idle.goto(base+'/#work');await idle.waitForSelector('[data-ready=true]');await idle.waitForTimeout(1800);const before=await idle.locator('[data-testid=build-canvas]').getAttribute('data-renders');await idle.waitForTimeout(1200);const after=await idle.locator('[data-testid=build-canvas]').getAttribute('data-renders');assert.equal(after,before,'settled scene must stop rendering');
 report.idle={result:'pass',before,after};
 await idle.setViewportSize({width:360,height:800});assert.ok(await idle.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2));
 await idle.goto(base+'/blog/');await idle.reload();const resources=await idle.evaluate(()=>performance.getEntriesByType('resource').map(r=>r.name));assert.ok(!resources.some(r=>/vendor-three|BuildRoomCanvas|build-room\.glb/.test(r)),'article index should not download scene');report.sceneIsolation='pass';
 await browser.close();
}catch(error){report.error=String(error.stack||error);console.error(error);process.exitCode=1;}
finally{await Promise.all([...openedBrowsers].filter(b=>b.isConnected()).map(b=>b.close()));server.kill();await fs.writeFile(output+'/report.json',JSON.stringify(report,null,2));}

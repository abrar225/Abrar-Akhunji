import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base=process.env.PREVIEW_URL||'http://127.0.0.1:4180';
const output=process.env.DESIGN_OUTPUT||'docs/reference-study/verification';
await fs.mkdir(output,{recursive:true});
const browser=await chromium.launch({headless:true});const report={};
try {
 const compactContext=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true,reducedMotion:'reduce'});const compact=await compactContext.newPage();await compact.goto(base+'/#work');await compact.waitForSelector('.mobile-scene [data-ready=true]');
 await compact.getByRole('button',{name:'Explore in 3D'}).click();const surface=compact.locator('.mobile-scene canvas');await compact.waitForFunction(()=>document.querySelector('.mobile-scene canvas')?.style.touchAction==='none');const surfaceBox=await surface.boundingBox();const sx=surfaceBox.x+surfaceBox.width/2,sy=surfaceBox.y+surfaceBox.height/2;
 assert.ok(await compact.evaluate(({x,y})=>document.elementFromPoint(x,y)?.tagName==='CANVAS',{x:sx,y:sy}),'mobile canvas receives pointer input');
 const beforeDrag=await compact.locator('.mobile-scene .build-canvas').getAttribute('data-camera');await compact.mouse.move(sx,sy);await compact.mouse.down();await compact.mouse.move(sx+65,sy+12,{steps:12});await compact.mouse.up();await compact.waitForFunction(previous=>document.querySelector('.mobile-scene .build-canvas')?.dataset.camera!==previous,beforeDrag);assert.notEqual(await compact.locator('.mobile-scene .build-canvas').getAttribute('data-camera'),beforeDrag,'mobile Explore drag changes camera');
 const beforeTouch=await compact.locator('.mobile-scene .build-canvas').getAttribute('data-camera');const scrollBeforeTouch=await compact.evaluate(()=>scrollY);const touchSession=await compactContext.newCDPSession(compact);
 await touchSession.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:sx,y:sy}]});await touchSession.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:sx-55,y:sy+18}]});await touchSession.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 await compact.waitForFunction(previous=>document.querySelector('.mobile-scene .build-canvas')?.dataset.camera!==previous,beforeTouch);assert.equal(await compact.evaluate(()=>scrollY),scrollBeforeTouch,'Explore touch does not scroll the page');
 await compact.keyboard.press('Escape');await compact.waitForFunction(()=>document.querySelector('.mobile-scene canvas')?.style.touchAction==='pan-y');assert.equal(await surface.evaluate(e=>e.style.touchAction),'pan-y');
 await compact.setViewportSize({width:800,height:844});await compact.waitForFunction(()=>Number(document.querySelector('.mobile-scene .build-canvas')?.dataset.triangles)>20000);
 await compact.setViewportSize({width:390,height:844});await compact.waitForFunction(()=>Number(document.querySelector('.mobile-scene .build-canvas')?.dataset.triangles)<15000&&document.querySelector('.mobile-scene [data-ready=true]'));
 await compactContext.close();report.compactInteraction='pass: pointer hit testing, mouse and emulated touch Explore drag, scroll preservation, Escape, tablet/phone geometry rebuild';

 const offscreenContext=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'no-preference'});const offscreen=await offscreenContext.newPage();await offscreen.goto(base+'/#work');await offscreen.waitForSelector('.mobile-scene [data-ready=true]');await offscreen.getByRole('button',{name:'Explore in 3D'}).click();
 await offscreen.locator('#contact').evaluate(el=>window.scrollTo({top:el.getBoundingClientRect().top+scrollY,behavior:'instant'}));await offscreen.waitForTimeout(250);const offscreenBefore=await offscreen.locator('.mobile-scene .build-canvas').getAttribute('data-renders');await offscreen.waitForTimeout(500);assert.equal(await offscreen.locator('.mobile-scene .build-canvas').getAttribute('data-renders'),offscreenBefore,'offscreen scene stops rendering during an active animation window');await offscreenContext.close();report.offscreen='pass: render count stops while the scene is outside the viewport';
 const noJSContext=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const noJS=await noJSContext.newPage();await noJS.goto(base+'/');assert.match(await noJS.locator('h1').innerText(),/Zero to built/);await noJS.getByRole('link',{name:'PacketLark',exact:true}).click();assert.match(await noJS.locator('h1').innerText(),/PacketLark/);await noJSContext.close();report.noJavaScript='pass: readable homepage and direct case study';
 console.log(report);
} catch(error) { console.error(error);report.error=String(error);process.exitCode=1; }
finally {await browser.close();await fs.writeFile(output+'/interaction-report.json',JSON.stringify(report,null,2));}

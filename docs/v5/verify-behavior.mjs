import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { chromium } from 'playwright';

const base = process.env.PATCHBAY_ORIGIN || 'http://127.0.0.1:5183';
const target = process.env.PATCHBAY_CAPTURE_DIR || 'docs/v5/evidence/behavior';
const browser = await chromium.launch({ channel:'chrome', args:['--enable-unsafe-swiftshader'] });
const report = [];
await mkdir(target,{recursive:true});
const issue = [];

async function check(name,test) {
  try { const detail=await test(); report.push({ name, status:'PASS', detail }); }
  catch(error) { report.push({name,status:'FAIL',detail:error.message}); }
}
async function run(options,fn) {
  const context=await browser.newContext(options);
  await context.route('**/*',route=>new URL(route.request().url()).origin===base?route.continue():route.abort());
  try {
    const page=await context.newPage();
    page.on('pageerror',error=>issue.push({path:page.url(),message:error.message}));
    await fn(page,context);
  } finally { await context.close(); }
}
const desktop={viewport:{width:1440,height:900}};
const mobile={viewport:{width:390,height:844},hasTouch:true,isMobile:true};
const button=(page,name)=>page.getByRole('button',{name,exact:true});
const goto=(page,path)=>page.goto(base+path,{waitUntil:'domcontentloaded'});
const shot=(page,name)=>page.screenshot({path:join(target,name+'.jpg'),quality:85});

try {
  await check('Home project and scroll survive Back and Forward',()=>run(desktop,async page=>{
    await goto(page,'/?project=packetlark');
    await page.locator('.patch-story[data-ribbon=motion]').waitFor({state:'attached'});
    await page.evaluate(()=>scrollTo(0,660));
    await page.waitForFunction(()=>scrollY===660);
    await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
    await page.getByRole('navigation',{name:'Primary'}).getByRole('link',{name:'Work',exact:true}).click();
    await page.waitForURL('**/work/');
    await page.getByRole('heading',{name:'Work.',exact:true}).waitFor();
    await page.evaluate(()=>scrollTo(0,270));
    await page.waitForFunction(()=>scrollY===270);
    await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
    await page.goBack();
    await page.waitForFunction(()=>Math.abs(scrollY-660)<2);
    assert.equal(await page.locator('#patch-project').textContent(),'PacketLark');
    await page.goForward();
    await page.waitForFunction(()=>Math.abs(scrollY-270)<2);
  }));
  await check('Work filters before/after scroll, rapid change, direct load and reduced touch',async()=>{
    await run(desktop,async page=>{
      await goto(page,'/work/');
      await button(page,'COMPUTER VISION').click();
      await page.getByRole('status').filter({hasText:'1 project'}).waitFor();
      await button(page,'All').click();
      const hero=page.getByRole('heading',{name:'Work.',exact:true});
      await hero.waitFor();
      await page.evaluate(()=>scrollTo(0,400));
      await button(page,'COMPUTER VISION').click();
      await page.getByRole('status').filter({hasText:'1 project'}).waitFor();
      await button(page,'Featured').click();
      await button(page,'All').click();
      await page.getByRole('status').filter({hasText:'10 projects'}).waitFor();
      await page.setViewportSize({width:760,height:900});
      assert.equal(await page.locator('.pin-spacer').count(),0);
    });
    await run({...mobile,reducedMotion:'reduce'},async page=>{
      await goto(page,'/work/?category=COMPUTER%20VISION');
      await page.getByRole('status').filter({hasText:'1 project'}).waitFor();
      await button(page,'All').tap();
      await page.getByRole('status').filter({hasText:'10 projects'}).waitFor();
      await button(page,'COMPUTER VISION').focus();
      await page.keyboard.press('Enter');
      await page.getByRole('status').filter({hasText:'1 project'}).waitFor();
    });
  });
  await check('Printed quote passes contrast in both themes on desktop and touch',async()=>{
    const colors=[];
    for(const view of [desktop,mobile]) await run(view,async page=>{
      await goto(page,'/');
      const note=page.locator('.patch-pink-note blockquote');
      await note.scrollIntoViewIfNeeded();
      const ratio=()=>note.evaluate(element=>{
        const tone=color=>color.match(/\d+/g).map(Number).slice(0,3).map(v=>v/255).map(v=>v<.04045?v/12.92:((v+.055)/1.055)**2.4)
          .reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0);
        const a=tone(getComputedStyle(element).color);
        const b=tone(getComputedStyle(element.parentElement).backgroundColor);
        return (Math.max(a,b)+.05)/(Math.min(a,b)+.05);
      });
      colors.push(await ratio());
      await button(page,'Switch to dark theme').click();
      await page.waitForFunction(()=>document.documentElement.classList.contains('dark'));
      colors.push(await ratio());
      await shot(page,`dark-note-${view.viewport.width}`);
    });
    assert.ok(colors.every(value=>value>=4.5));
    return colors;
  });
  await check('Mouse-only cursor changes the field and ribbon',()=>run(desktop,async page=>{
    await goto(page,'/');
    await page.locator('.patch-story[data-ribbon=motion]').waitFor({state:'attached'});
    await page.mouse.move(1200,450);
    await page.locator('.patch-cursor-field').waitFor({state:'attached'});
    await page.waitForFunction(()=>Number(document.querySelector('.patch-hero').style.getPropertyValue('--field-current'))>.25);
    await shot(page,'pointer-field');
    await page.mouse.move(20,20);
    await page.locator('.patch-cursor-field').waitFor({state:'detached'});
  }));
  await check('Engineering assembly and bento at desktop and touch',async()=>{
    for(const view of [desktop,mobile]) await run(view,async page=>{
      await goto(page,'/#engineering');
      if(view.hasTouch) {
        await page.locator('.patch-assembly-fallback').waitFor();
        assert.equal(await page.locator('.patch-assembly canvas').count(),0);
      } else {
        await page.locator('.patch-assembly[data-ready=true]').waitFor({state:'attached',timeout:7000});
      }
      const layer=page.locator('.patch-layer button').nth(1);
      if(view.hasTouch) await layer.tap(); else {await layer.focus();await page.keyboard.press('Enter');}
      assert.equal(await layer.getAttribute('aria-expanded'),'true');
      assert.match(await page.locator('.patch-assembly-plate figcaption').textContent(),/HTTP engine/);
      if(view.hasTouch) assert.equal(await page.locator('.patch-cursor-field').count(),0);
      await page.waitForTimeout(450);
      await shot(page,`engineering-${view.viewport.width}`);
      if(!view.hasTouch) {
        const model=page.locator('.patch-assembly canvas');
        const bounds=await model.boundingBox();
        await page.mouse.move(bounds.x+bounds.width*.5,bounds.y+bounds.height*.45);
        await page.mouse.down();
        await page.mouse.move(bounds.x+bounds.width*.83,bounds.y+bounds.height*.63,{steps:10});
        await page.mouse.up();
        await page.waitForTimeout(420);
        await shot(page,'engineering-drag-1440');
      }
    });
  });
  await check('Reduced and denied WebGL keep static proof and usable keyboard anchors',async()=>{
    await run({...mobile,reducedMotion:'reduce'},async page=>{
      await goto(page,'/#work');
      await page.locator('#patch-project').waitFor();
      assert.equal(await page.locator('.patch-story[data-ribbon]').count(),0);
      assert.equal(await page.locator('.patch-proof-image').evaluate(image=>getComputedStyle(image).opacity),'1');
      await page.locator('#engineering').scrollIntoViewIfNeeded();
      assert.equal(await page.locator('.patch-assembly canvas').count(),0);
      await shot(page,'reduced-home');
    });
    await run(desktop,async page=>{
      await page.addInitScript(()=>{
        const get=HTMLCanvasElement.prototype.getContext;
        HTMLCanvasElement.prototype.getContext=function(type,...params){return type.startsWith('webgl')?null:get.call(this,type,...params);};
      });
      await goto(page,'/#engineering');
      await page.locator('.patch-assembly').waitFor({state:'attached'});
      await page.locator('.patch-assembly-fallback').waitFor();
      assert.equal(await page.locator('.patch-assembly[data-ready=true]').count(),0);
      await button(page,'HTTP engine').click();
      assert.match(await page.locator('.patch-assembly-plate figcaption').textContent(),/HTTP engine/);
    });
  });
  await check('All required responsive widths and dark page types',async()=>{
    const widths=[];
    for(const [width,height] of [[360,800],[390,844],[768,1024],[1024,768],[1440,900],[1920,1080],[844,390]]) {
      await run({viewport:{width,height}},async page=>{
        await goto(page,'/');
        await page.locator('#patch-name').waitFor();
        for(const id of ['#home','#work','#writing','#engineering','#experience','#contact','#writing','#home']){
          await page.locator(id).scrollIntoViewIfNeeded();
          await page.evaluate(()=>document.fonts.ready);
          assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth),0,`overflow at ${width} ${id}`);
        }
        await page.setViewportSize({width:width===360?768:360,height:800});
        assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth),0);
      });
      widths.push(`${width}x${height}`);
    }
    await run({...desktop,colorScheme:'dark'},async (page,context)=>{
      await context.addInitScript(()=>localStorage.setItem('theme','dark'));
      for(const [path,slug] of [['/work/','work'],['/about/','about'],['/blog/','writing'],['/hire/','hire'],['/contact/','contact'],['/work/packetlark/','case'],['/agents-at-work/','agents'],['/privacy/','privacy'],['/terms/','terms'],['/404.html','404']]){
        await goto(page,path);
        await page.locator('h1').first().waitFor();
        await page.evaluate(()=>document.fonts.ready);
        assert.equal(await page.evaluate(()=>document.documentElement.classList.contains('dark')),true);
        await shot(page,`dark-${slug}`);
      }
    });
    return widths;
  });
  await check('Menu, image viewer, search and article modes',()=>run(desktop,async page=>{
    await goto(page,'/work/packetlark/');
    await button(page,'Open menu').click();
    await page.getByRole('dialog',{name:'Portfolio menu'}).waitFor();
    await page.keyboard.press('Escape');
    assert.equal(await button(page,'Open menu').evaluate(el=>el===document.activeElement),true);
    await button(page,'Inspect interface').click();
    await button(page,'Detail view').click();
    const panner=page.getByRole('region',{name:'Product interface image'});
    await panner.focus();
    await page.keyboard.press('ArrowRight');
    await page.waitForFunction(()=>document.querySelector('.patch-media-dialog [data-detail=true]').scrollLeft>0);
    await shot(page,'case-inspect');
    await page.keyboard.press('Escape');
    await goto(page,'/blog/?q=does-not-match-v5-notes');
    await page.getByRole('heading',{name:'No notes found.'}).waitFor();
    await button(page,'Show all notes').click();
    await page.locator('.desk-feature-link').first().click();
    await page.locator('.reader-content').waitFor();
    await page.getByRole('radio',{name:/Developer/i}).first().click();
    await page.waitForFunction(()=>new URL(location.href).searchParams.get('mode')==='dev');
  }));
} finally {
  await browser.close();
  await writeFile(join(target,'report.json'),JSON.stringify({checks:report,issue},null,2)+'\n');
}
for(const entry of report)console.log(entry.status,entry.name,entry.detail??'');
if(report.some(item=>item.status==='FAIL')||issue.length)process.exitCode=1;

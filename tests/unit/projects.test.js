import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const data = JSON.parse(fs.readFileSync(new URL('../../src/data/portfolio.json', import.meta.url)));
const root = new URL('../../public/', import.meta.url);
test('ten projects expose unique stable case-study slugs and complete evidence', () => {
 assert.equal(data.projects.length,10); assert.equal(new Set(data.projects.map(p=>p.slug)).size,10);
 assert.deepEqual(data.projects.filter(p=>p.featured).map(p=>p.slug),['fixo-flow','packetlark','framecast-studio']);
 for (const p of data.projects) { assert.match(p.slug,/^[a-z0-9-]+$/); for (const key of ['summary','problem','contribution','status','imageAlt']) assert.ok(p[key],`${p.slug}: ${key}`); for(const key of ['layers','decisions','evidence','limitations']) assert.ok(p[key].length>0,`${p.slug}: ${key}`); assert.ok(fs.existsSync(new URL(p.image.slice(1),root)),p.image); for(const e of p.evidence) if(e.url) assert.match(e.url,/^https:\/\//); }
});
test('unpublished Framecast never advertises a public repository or download',()=>{
 const p=data.projects.find(p=>p.slug==='framecast-studio'); assert.equal(p.status,'in development'); assert.equal(p.github,null); assert.equal(p.demo,null);
});
test('tour resources exist and describe an interface tour rather than live inference',()=>{
 for(const p of data.projects)if(p.media){for(const path of Object.values(p.media))assert.ok(fs.existsSync(new URL(path.slice(1),root)));assert.match(fs.readFileSync(new URL(p.media.captions.slice(1),root),'utf8'),/not live recognition/);}
});

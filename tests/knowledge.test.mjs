import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import assert from 'node:assert/strict';
import {canonicalURL,parseSources} from '../scripts/import-sources.mjs';
const context=vm.createContext({});for(const f of ['data/references.js','data/knowledge.js','data/source-catalogue.js','knowledge-core.js'])vm.runInContext(readFileSync(f,'utf8'),context,{filename:f});
const get=expression=>JSON.parse(vm.runInContext('JSON.stringify('+expression+')',context));
const topics=get('KNOWLEDGE_TOPICS'),sources=get('SOURCE_CATALOGUE'),byId=Object.fromEntries(topics.map(t=>[t.id,t]));
test('subject graph is connected by valid technical references and has no cycles',()=>{
 assert.equal(new Set(topics.map(t=>t.id)).size,topics.length);assert.equal(get('KNOWLEDGE_DIRECTIONS.length'),15);
 assert.equal(get('KnowledgeCore.closure(KNOWLEDGE_TOPICS.map(t=>t.id)).length'),topics.length);
 const refs=new Set(get('KNOWLEDGE_REFERENCES').map(r=>r.id));
 for(const t of topics){for(const key of ['title','summary','practice','criterion','hint'])assert.ok(t[key]?.trim(),t.id+': '+key);for(const id of [...t.prerequisites,...t.recommended,...t.deepen])assert.ok(byId[id],t.id+' → '+id);for(const r of t.readings)assert.ok(refs.has(r.source),r.source);}
 assert.ok(topics.length>=180);assert.ok(!byId.pbrt,'a book is not a skill');
 for(const goal of get('KNOWLEDGE_GOALS'))for(const id of goal.targets)assert.ok(byId[id]);
 for(const m of get('RENDERER_MILESTONES'))for(const id of m.topics)assert.ok(byId[id]);
});
test('independent subjects have no accidental serial or API gates',()=>{
 const ancestors=id=>get(`KnowledgeCore.closure(['${id}'])`);
 assert.ok(!ancestors('texture-sampling').includes('skeletal'));
 assert.ok(!ancestors('lambert').includes('compute'));
 assert.ok(!ancestors('bvh-traversal').includes('sah'),'SAH is recommended, not required');
 assert.ok(ancestors('frustum-culling').includes('projection'));
 assert.ok(ancestors('cook-torrance').includes('radiance'));
 assert.ok(ancestors('render-graph').includes('barriers'));
 assert.ok(!get("KnowledgeCore.closure(KNOWLEDGE_GOALS.find(g=>g.id==='viewer').targets)").includes('dx12'));
 for(const id of ['bvh','octree','kd-tree','ggx','sah','taa','barriers'])assert.ok(byId[id]);
});
test('adaptive route preserves prerequisite order while skipping familiar knowledge',()=>{
 const result=get(`(()=>{const s=KnowledgeCore.clean({target:'bvh-traversal',topics:{vectors:{status:'familiar'},aabb:{status:'mastered'},bvh:{status:'familiar'}}});return {plan:KnowledgeCore.plan(s),next:KnowledgeCore.next(s),state:KnowledgeCore.effective('vectors',s)}})()`);
 assert.ok(!result.plan.includes('aabb'));assert.ok(!result.plan.includes('bvh'));assert.equal(result.state.verified,false);
 const complete=get(`(()=>{const s=KnowledgeCore.clean({target:'bvh',topics:Object.fromEntries(KnowledgeCore.closure(['bvh']).map(id=>[id,{status:'mastered'}]))});return {next:KnowledgeCore.next(s),plan:KnowledgeCore.plan(s)}})()`);
 assert.equal(complete.next,null);assert.deepEqual(complete.plan,[]);
 const knownTarget=get("KnowledgeCore.plan(KnowledgeCore.clean({target:'bvh',topics:{bvh:{status:'familiar'}}}))");assert.deepEqual(knownTarget,[],'knowing a target does not force repeating its unmarked ancestors');
 const review=get(`(()=>{const s=KnowledgeCore.clean({target:'vectors',topics:{vectors:{status:'review'}}});return KnowledgeCore.plan(s)})()`);assert.deepEqual(review,['vectors']);
});
test('specific legacy completion migrates without converting broad flags into new skills',()=>{
 const r=get(`(()=>{const s=KnowledgeCore.clean({});const old={lessons:{'pbr-03-understand':true,'pbr-03-build':true},notes:{'pbr-03':'CPU inverse-transpose test'}};return {normal:KnowledgeCore.effective('normal-matrix',s,old),ggx:KnowledgeCore.effective('ggx',s,old)}})()`);
 assert.equal(r.normal.status,'mastered');assert.equal(r.normal.verified,true);assert.match(r.normal.note,/inverse-transpose/);assert.equal(r.ggx.status,'unseen');
});
test('imports validate state and cannot silently erase unrelated topic and milestone notes',()=>{
 const merged=get(`KnowledgeCore.merge(KnowledgeCore.clean({topics:{bvh:{status:'learning',note:'keep me',evidence:'capture/test',verified:true}},milestones:{'vk-start':'commit abc'}}),{topics:{ggx:{status:'mastered',verified:true},fake:{status:'mastered'}},goals:['bad'],current:'bad'})`);
 assert.equal(merged.topics.bvh.note,'keep me');assert.equal(merged.topics.bvh.verified,true);assert.equal(merged.topics.ggx.verified,false);assert.equal(merged.topics.fake,undefined);assert.equal(merged.milestones['vk-start'],'commit abc');assert.equal(merged.current,null);assert.deepEqual(merged.goals,['viewer']);
 assert.equal(get("KnowledgeCore.clean({topics:{bvh:{status:'invalid'}}}).topics.bvh.status"),'unseen');
});
test('all input records have provenance; unknown and local materials survive',()=>{
 const parsed=parseSources(readFileSync('docs/likns.md','utf8'));
 assert.equal(parsed.inputCount,get('SOURCE_IMPORT_STATS.inputCount'));
 const importedLines=new Set(sources.flatMap(s=>s.provenance.filter(p=>p.file==='docs/likns.md').map(p=>p.line)));
 for(const s of parsed.records)for(const p of s.provenance)assert.ok(importedLines.has(p.line),s.title);
 assert.ok(sources.some(s=>s.kind==='local'));assert.ok(sources.some(s=>!s.url));assert.ok(sources.some(s=>s.scope==='service'));assert.ok(sources.some(s=>s.scope==='archive'));
 assert.equal(new Set(sources.map(s=>s.id)).size,sources.length);
 const urls=sources.filter(s=>s.url).map(s=>canonicalURL(s.url));assert.equal(new Set(urls).size,urls.length);
 for(const s of sources)for(const id of s.topics)assert.ok(byId[id],s.title);
 assert.equal(canonicalURL('https://www.example.com/a/?utm_source=test#section'),'https://example.com/a#section');
 assert.notEqual(canonicalURL('https://example.com/a#one'),canonicalURL('https://example.com/a#two'));
});

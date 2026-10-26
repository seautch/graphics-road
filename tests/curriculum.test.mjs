import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import test from 'node:test';
const context=vm.createContext({});
for(const file of ['data/legacy-curriculum.js','data/curriculum.js','data/roadmap.js','data/projects.js'])vm.runInContext(readFileSync(file,'utf8'),context,{filename:file});
const {modules,lessons,books,projects,tests,gates,extra}=JSON.parse(vm.runInContext('JSON.stringify({modules:LEARNING_DATA.modules,lessons:LESSON_DATA,books:LEARNING_DATA.books,projects:PORTFOLIO_PROJECTS,tests:PLACEMENT_TESTS,gates:READINESS_GATES,extra:EXTRA_SOURCES})',context));
const byId=Object.fromEntries(modules.map(m=>[m.id,m]));
test('IDs are unique and every reference resolves',()=>{
 for(const list of [modules,lessons,projects,extra])assert.equal(new Set(list.map(x=>x.id)).size,list.length);
 for(const m of modules){assert.ok(lessons.some(l=>l.module===m.id),m.id);for(const id of m.deps)assert.ok(byId[id],`${m.id} → ${id}`)}
 for(const l of lessons){assert.ok(byId[l.module],l.id);if(l.book)assert.ok(books[l.book],l.id);for(const field of ['title','why','build','prove','where'])assert.ok(l[field]?.trim(),`${l.id}: ${field}`)}
 for(const p of projects)for(const id of p.modules)assert.ok(byId[id],`${p.id} → ${id}`);
 for(const t of tests)assert.ok(byId[t.id]);
 for(const g of gates)for(const id of g.modules)assert.ok(byId[id]);
});
test('both API paths are acyclic and finish without optional modules',()=>{
 for(const track of ['d3d12','vulkan']){
  const selected=modules.filter(m=>m.track==='core'||m.track===track),done=new Set();
  while(done.size<selected.length){const ready=selected.filter(m=>!done.has(m.id)&&[...m.deps,...(m.apiGate?[track==='d3d12'?'dx12-core':'vk-core']:[])].every(id=>done.has(id)));assert.ok(ready.length,`${track}: blocked ${selected.filter(m=>!done.has(m.id)).map(m=>m.id)}`);ready.forEach(m=>done.add(m.id))}
  assert.ok(done.has('shipping'));assert.ok(done.has('interview-lab'));
  assert.ok(!done.has('audit'));assert.ok(!done.has('gameplay'));
 }
});
test('every specialization can be reached and sources are safe external URLs',()=>{
 const visiting=new Set(),visited=new Set();
 function visit(id){assert.ok(!visiting.has(id),`cycle at ${id}`);if(visited.has(id))return;visiting.add(id);byId[id].deps.forEach(visit);visiting.delete(id);visited.add(id)}
 modules.forEach(m=>visit(m.id));
 for(const b of Object.values(books))assert.match(b.url,/^https?:\/\//,b.id);
});
test('original v6 lesson IDs remain available and original progress is not reassigned',()=>{
 const legacy=vm.createContext({});vm.runInContext(readFileSync('data/legacy-curriculum.js','utf8'),legacy);
 const originals=JSON.parse(vm.runInContext('JSON.stringify(LESSON_DATA)',legacy));
 assert.equal(originals.length,116);
 for(const l of originals){const next=lessons.find(x=>x.id===l.id);assert.equal(next.title,l.title);assert.ok(next.module);assert.equal(next.prove,l.prove)}
});
console.log(`${modules.length} modules, ${lessons.length} lessons, ${projects.length} projects, ${tests.length} placement tests`);

test('recommended order satisfies every prerequisite on both API paths',()=>{
 for(const track of ['d3d12','vulkan']){
  const done=new Set();
  for(const m of modules.filter(m=>m.track==='core'||m.track===track)){
   for(const id of [...m.deps,...(m.apiGate?[track==='d3d12'?'dx12-core':'vk-core']:[])])assert.ok(done.has(id),`${m.id} is taught before ${id}`);
   done.add(m.id);
  }
 }
 assert.equal(modules[0].id,'cpp-start');
});

test('regrouping preserves every v7 lesson and all source records',()=>{
 const previous=vm.createContext({});
 for(const f of ['data/legacy-curriculum.js','data/curriculum.js'])vm.runInContext(readFileSync(f,'utf8'),previous);
 const old=JSON.parse(vm.runInContext('JSON.stringify({lessons:LESSON_DATA,books:LEARNING_DATA.books,extra:EXTRA_SOURCES})',previous));
 assert.equal(old.lessons.length,233);
 for(const l of old.lessons){const next=lessons.find(n=>n.id===l.id);assert.ok(next,l.id);assert.equal(next.book,l.book);assert.equal(next.where,l.where);assert.equal(next.url,l.url);}
 assert.deepEqual(books,old.books);assert.deepEqual(extra,old.extra);
});

test('lighting contains no foundational math, color setup or debugging lessons',()=>{
 assert.equal(lessons.find(l=>l.id==='pbr-03').module,'math-rotation');
 assert.equal(lessons.find(l=>l.id==='light-04').module,'color-output');
 assert.equal(lessons.find(l=>l.id==='light-03').module,'frame-debug');
 assert.equal(lessons.find(l=>l.id==='pbr-04').module,'surface-data');
 assert.deepEqual(modules.filter(m=>m.phase===7).map(m=>m.id),['light','pbr','shadow-lab','ibl-lab','clustered']);
 assert.ok(modules.filter(m=>m.phase===7).every(m=>m.track==='core'));
 for(const m of modules){const ls=lessons.filter(l=>l.module===m.id);assert.deepEqual(ls.map(l=>l.position),ls.map((_,i)=>i+1),m.id);}
});

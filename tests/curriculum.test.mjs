import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import test from 'node:test';
const context=vm.createContext({});
for(const file of ['data/legacy-curriculum.js','data/curriculum.js','data/projects.js'])vm.runInContext(readFileSync(file,'utf8'),context,{filename:file});
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
 for(const l of originals){const next=lessons.find(x=>x.id===l.id);assert.equal(next.title,l.title);assert.equal(next.module,l.module);assert.equal(next.prove,l.prove)}
});
console.log(`${modules.length} modules, ${lessons.length} lessons, ${projects.length} projects, ${tests.length} placement tests`);

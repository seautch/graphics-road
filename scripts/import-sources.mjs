import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
export function canonicalURL(value){
 try{const u=new URL(value);u.hostname=u.hostname.toLowerCase().replace(/^www\./,'');for(const k of [...u.searchParams.keys()])if(/^utm_|^fbclid$|^gclid$/i.test(k))u.searchParams.delete(k);return u.toString().replace(/\/(?=[?#]|$)/,'');}catch{return '';}
}
function classify(section,title,url){
 if(/cppbyexample\.com/.test(url))return 'support';
 if(/Изображения|Локальные адреса|служебные/i.test(section)||/^(https?:\/\/)?(localhost|127\.|192\.168\.)/i.test(url)||/images\.openai\.com|example\.com|schema\.org/.test(url))return 'service';
 if(/Аудио|DSP|Английский|Прочие|ИИ, агенты|Другие языки|Blender|искусство/i.test(section))return 'archive';
 if(/C\+\+|Системы|ОС,|Сборка|Архитектура программ|GUI,|Математика|физика/i.test(section)||/C\+\+ High Performance|Game Engine Architecture|Real-Time Collision Detection/i.test(title))return 'support';
 if(/Графика|Шейдеры|Vulkan|OpenGL|WebGPU|GPU|Статьи и текстовые серии/i.test(section))return 'graphics';
 if(/graphics|render|shader|vulkan|WebGPU|wgsl|quaternion|Scratchapixel|Kayvon|SimonDev|Pikuma|Cem Yuksel/i.test(title))return 'graphics';
 if(/C\+\+|CppCon|allocator|Data-Oriented|Memory|Computer|CS149|15-418|Concurrency|Unreal/i.test(title+' '+section))return 'support';
 return 'archive';
}
export function parseSources(markdown){
 const records=[],lines=markdown.split(/\r?\n/);let major='',section='',record=null;
 for(let i=0;i<lines.length;i++){
  const line=lines[i];if(/^## /.test(line)){major=line.slice(3);record=null;}if(/^### /.test(line)){section=line.slice(4);record=null;}
  const entry=line.match(/^- \*\*(.+?)\*\*(.*)$/);
  if(entry){const link=entry[1].match(/^\[(.*)\]\(<(.*)>\)$/);const title=link?link[1]:entry[1];const url=link?link[2]:'';
   record={id:'src-'+createHash('sha256').update(url?canonicalURL(url):title.toLowerCase()).digest('hex').slice(0,16),title,url,section,major,line:i+1,kind:major.includes('Книги')?'book':/Курсы/.test(major)?'course':'web',scope:classify(section,title,url),provenance:[{file:'docs/likns.md',line:i+1}],mentions:[],aliases:[],note:entry[2].replace(/^ — /,'').trim()};records.push(record);
  }else if(record){
   for(const match of line.matchAll(/\[\[([^\]]+)\]\]/g))record.mentions.push(match[1]);
   if(/Варианты/.test(line))for(const match of line.matchAll(/<(https?:\/\/[^>]+)>/g))record.aliases.push(match[1]);
  }else if(major==='Локальные учебные материалы'&&line.startsWith('- ')){
   records.push({id:'local-'+(i+1),title:line.slice(2),url:'',section:major,major,line:i+1,kind:'local',scope:/Training/.test(line)?'archive':'graphics',provenance:[{file:'docs/likns.md',line:i+1}],mentions:[],aliases:[],note:'Файл упомянут в экспорте заметок; в репозитории отсутствует.'});
  }
 }
 const unique=new Map();for(const r of records){const old=unique.get(r.id);if(old){old.provenance.push(...r.provenance);old.mentions=[...new Set([...old.mentions,...r.mentions])];old.aliases=[...new Set([...old.aliases,...r.aliases])];}else unique.set(r.id,r);}
 return {records:[...unique.values()],inputCount:records.length};
}
export function buildCatalogue(){
const parsed=parseSources(readFileSync('docs/likns.md','utf8'));
// Keep earlier library records as well. This catalogue is generated, never hand edited.
const context=vm.createContext({});for(const f of ['data/legacy-curriculum.js','data/curriculum.js','data/roadmap.js','data/references.js','data/knowledge.js'])vm.runInContext(readFileSync(f,'utf8'),context);
const old=JSON.parse(vm.runInContext('JSON.stringify([...Object.values(LEARNING_DATA.books),...KNOWLEDGE_REFERENCES])',context));
for(const r of old){
 const match=parsed.records.find(s=>r.url&&canonicalURL(s.url)===canonicalURL(r.url)||s.title.toLowerCase()===r.title.toLowerCase());
 if(match){match.legacyIds=[...new Set([...(match.legacyIds||[]),r.id])];if(!match.url)match.url=r.url;continue;}
 parsed.records.push({id:'legacy-'+r.id,title:r.title,url:r.url||'',section:'Прежняя библиотека',major:'Сохранённые материалы',kind:r.type||'book',scope:classify('',r.title,r.url),legacyIds:[r.id],provenance:[{file:'data/curriculum.js'}],mentions:[],aliases:[],note:r.role||r.where||''});
}
const references=JSON.parse(vm.runInContext('JSON.stringify(KNOWLEDGE_REFERENCES)',context));
const families={fcg:/^Fundamentals of Computer Graphics/i,rtr:/^Real-Time Rendering/i,pbrt:/^Physically Based Rendering/i,gea:/^Game Engine Architecture/i,csapp:/^Computer Systems: A Programmer/i,ostep:/^Operating Systems: Three Easy Pieces/i,pmpp:/^Programming Massively Parallel Processors/i,bos:/^The Book of Shaders$/i};
for(const s of parsed.records)if(!s.url&&s.kind==='book')for(const [id,re] of Object.entries(families))if(re.test(s.title)){const ref=references.find(r=>r.id===id);s.url=ref.url;s.legacyIds=[...new Set([...(s.legacyIds||[]),id])];}
const unique=new Map();for(const s of parsed.records){const key=s.url?canonicalURL(s.url):s.id,previous=unique.get(key);if(!previous){unique.set(key,s);continue;}previous.provenance.push(...s.provenance);for(const field of ['mentions','aliases','legacyIds'])previous[field]=[...new Set([...(previous[field]||[]),...(s[field]||[])])];previous.aliasTitles=[...new Set([...(previous.aliasTitles||[]),s.title])];if(s.note&&!previous.note.includes(s.note))previous.note+='; '+s.note;}
parsed.records=[...unique.values()];
const topics=JSON.parse(vm.runInContext('JSON.stringify(KNOWLEDGE_TOPICS)',context));
const normalize=v=>v.toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
const aliases={bvh:['bvh','bounding volume hierarch'],ggx:['ggx','trowbridge'],sah:['surface area heuristic'],aabb:['aabb','axis aligned bounding'],obb:['oriented bounding'],taa:['temporal anti alias','taa'],ssao:['ssao','ambient occlusion'],gtao:['gtao'],ssr:['screen space reflection'],ddgi:['ddgi','dynamic diffuse global'],restir:['restir','reservoir resampling'],barriers:['synchronization2','pipeline barrier'],fresnel:['fresnel'],clustered:['clustered shading','clustered deferred'],octree:['octree'],quadtree:['quadtree'],'kd-tree':['k d tree'],'shader-derivatives':['fwidth','derivatives'],'normal-mapping':['normal mapping'],'render-graph':['render graph','frame graph'],'gpu-driven':['gpu driven'],skinning:['skinning'],quaternions:['quaternion'],occupancy:['occupancy']};
for(const s of parsed.records){const text=normalize(s.title+' '+s.url);s.topics=topics.filter(t=>t.readings.some(r=>s.legacyIds?.includes(r.source))||s.scope!=='service'&&(aliases[t.id]||[t.id.replaceAll('-',' ')]).some(a=>a.length>=4&&text.includes(a))).map(t=>t.id);}
const stats={inputCount:parsed.inputCount,total:parsed.records.length,byScope:Object.fromEntries(['graphics','support','archive','service'].map(k=>[k,parsed.records.filter(r=>r.scope===k).length]))};
stats.linked=parsed.records.filter(s=>s.topics.length).length;
writeFileSync('data/source-catalogue.js',`/* Generated by npm run sources from docs/likns.md and earlier books. */\n'use strict';\nconst SOURCE_CATALOGUE=${JSON.stringify(parsed.records)};\nconst SOURCE_IMPORT_STATS=${JSON.stringify(stats)};\n`);
console.log(stats);
return stats;
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url))buildCatalogue();

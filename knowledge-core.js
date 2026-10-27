/* Pure graph/progress functions, shared by browser and node checks. */
'use strict';
const KnowledgeCore=(()=>{
 const states=['unseen','familiar','learning','mastered','review'];
 const isObject=v=>v&&typeof v==='object'&&!Array.isArray(v);
 function clean(raw){
  const v=isObject(raw)?raw:{},topics={};
  for(const [id,entry] of Object.entries(isObject(v.topics)?v.topics:{})){
   if(!Object.hasOwn(KNOWLEDGE_BY_ID,id)||!isObject(entry))continue;
   topics[id]={status:states.includes(entry.status)?entry.status:'unseen',note:typeof entry.note==='string'?entry.note.slice(0,50000):'',evidence:typeof entry.evidence==='string'?entry.evidence.slice(0,10000):'',verified:entry.verified===true&&typeof entry.evidence==='string'&&entry.evidence.trim().length>=8,steps:Object.fromEntries(['read','practice','check'].filter(k=>entry.steps?.[k]===true).map(k=>[k,true])),updated:typeof entry.updated==='string'?entry.updated.slice(0,40):''};
  }
  const goals=Array.isArray(v.goals)?[...new Set(v.goals.filter(id=>KNOWLEDGE_GOALS.some(g=>g.id===id)))]:['viewer'];
  return {version:9,current:Object.hasOwn(KNOWLEDGE_BY_ID,v.current)?v.current:null,topics,goals:goals.length?goals:['viewer'],target:Object.hasOwn(KNOWLEDGE_BY_ID,v.target)?v.target:null,milestones:Object.fromEntries(Object.entries(isObject(v.milestones)?v.milestones:{}).filter(([id,value])=>RENDERER_MILESTONES.some(m=>m.id===id)&&typeof value==='string').map(([id,value])=>[id,value.slice(0,10000)]))};
 }
 function effective(id,state,legacy={}){
  if(state.topics[id])return state.topics[id];
  const lessons=KNOWLEDGE_BY_ID[id].legacyLessons;
  const complete=lessons.length&&lessons.every(key=>legacy.lessons?.[key+'-understand']&&legacy.lessons?.[key+'-build']);
  return {status:complete?'mastered':'unseen',note:lessons.map(key=>legacy.notes?.[key]).filter(Boolean).join('\n'),evidence:complete?'Перенесено из конкретного проверенного урока: '+lessons.join(', '):'',verified:!!complete,migrated:!!complete};
 }
 const satisfied=(id,state,legacy)=>['familiar','mastered'].includes(effective(id,state,legacy).status);
 const ready=(id,state,legacy)=>KNOWLEDGE_BY_ID[id].prerequisites.every(dep=>satisfied(dep,state,legacy));
 function closure(ids){
  const result=[],done=new Set(),active=new Set();
  function visit(id){if(done.has(id))return;if(active.has(id))throw Error('Prerequisite cycle: '+id);if(!KNOWLEDGE_BY_ID[id])throw Error('Unknown topic: '+id);active.add(id);KNOWLEDGE_BY_ID[id].prerequisites.forEach(visit);active.delete(id);done.add(id);result.push(id);}
  ids.forEach(visit);return result;
 }
 function targets(state){return state.target?[state.target]:[...new Set(KNOWLEDGE_GOALS.filter(g=>state.goals.includes(g.id)).flatMap(g=>g.targets))];}
 function plan(state,legacy={}){
  const result=[],done=new Set(),active=new Set();
  function visit(id){if(done.has(id)||satisfied(id,state,legacy))return;if(active.has(id))throw Error('Prerequisite cycle: '+id);active.add(id);KNOWLEDGE_BY_ID[id].prerequisites.forEach(visit);active.delete(id);done.add(id);result.push(id);}
  targets(state).forEach(visit);return result;
 }
 function next(state,legacy={}){
  if(state.current&&!satisfied(state.current,state,legacy)&&ready(state.current,state,legacy))return state.current;
  const route=plan(state,legacy);return route.find(id=>effective(id,state,legacy).status==='learning'&&ready(id,state,legacy))||route.find(id=>ready(id,state,legacy))||null;
 }
 function merge(current,incoming){const next=clean(incoming);return clean({...current,...next,topics:{...current.topics,...next.topics},milestones:{...current.milestones,...next.milestones}});}
 function search(topic,query,sources=[]){
  const references=topic.readings.map(r=>KNOWLEDGE_REFERENCES.find(s=>s.id===r.source)?.title||'');
  const linked=sources.filter(s=>topic.readings.some(r=>s.legacyIds?.includes(r.source))).map(s=>s.title);
  return [topic.id,topic.title,topic.group,topic.summary,topic.practice,...references,...linked].join(' ').toLocaleLowerCase('ru').includes(query.toLocaleLowerCase('ru'));
 }
 return {states,clean,effective,satisfied,ready,closure,targets,plan,next,merge,search};
})();

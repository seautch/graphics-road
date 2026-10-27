'use strict';

const topicList=document.getElementById('topic-list');
for(const direction of KNOWLEDGE_DIRECTIONS){
 const section=document.createElement('section'),heading=document.createElement('h2');heading.textContent=direction.title;section.append(heading);
 for(const group of [...new Set(KNOWLEDGE_TOPICS.filter(t=>t.direction===direction.id).map(t=>t.group))]){
  const subheading=document.createElement('h3');subheading.textContent=group;section.append(subheading);
  const list=document.createElement('ul');
  for(const topic of KNOWLEDGE_TOPICS.filter(t=>t.direction===direction.id&&t.group===group)){
   const item=document.createElement('li'),a=document.createElement('a');a.href='index.html#topic='+encodeURIComponent(topic.id);a.textContent=topic.title;item.append(a);list.append(item);
  }section.append(list);
 }topicList.append(section);
}
document.getElementById('topic-count').textContent=KNOWLEDGE_TOPICS.length+' тем · '+KNOWLEDGE_DIRECTIONS.length+' направлений. Группировка не задаёт порядок прохождения.';

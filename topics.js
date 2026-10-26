'use strict';

const topicList=document.getElementById('topic-list');
let topicNumber=1;
for(const [phase,[title]] of ROADMAP_PHASES.entries()){
  const modules=LEARNING_DATA.modules.filter(m=>m.phase===phase);
  if(!modules.length)continue;
  const section=document.createElement('section');
  const heading=document.createElement('h2');
  heading.textContent=phase<11?`${phase+1}. ${title}`:title;
  section.append(heading);
  if(phase>=11){
    const note=document.createElement('p');
    note.className='section-note';
    note.textContent=phase===11?'Углубления после основного пути.':'Дополнительные занятия и прежние варианты упражнений.';
    section.append(note);
  }
  for(const module of modules){
    const subheading=document.createElement('h3');
    subheading.textContent=module.title;
    if(module.track==='d3d12'||module.track==='vulkan'){
      const label=document.createElement('span');
      label.className='api-note';
      label.textContent=' · один из двух API';
      subheading.append(label);
    }
    const list=document.createElement('ol');
    list.start=topicNumber;
    for(const lesson of LESSON_DATA.filter(l=>l.module===module.id)){
      const item=document.createElement('li');
      item.textContent=lesson.title;
      list.append(item);
      topicNumber++;
    }
    section.append(subheading,list);
  }
  topicList.append(section);
}
document.getElementById('topic-count').textContent=`Всего тем: ${topicNumber-1} · Блоков: ${LEARNING_DATA.modules.length}`;

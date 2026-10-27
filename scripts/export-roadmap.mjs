import {readFileSync,writeFileSync} from 'node:fs';
import vm from 'node:vm';
import './export-legacy-roadmap.mjs';
const context=vm.createContext({});
for(const f of ['data/references.js','data/knowledge.js','data/source-catalogue.js','knowledge-core.js'])vm.runInContext(readFileSync(f,'utf8'),context);
const {topics,directions,references,goals,milestones,stats}=JSON.parse(vm.runInContext('JSON.stringify({topics:KNOWLEDGE_TOPICS,directions:KNOWLEDGE_DIRECTIONS,references:KNOWLEDGE_REFERENCES,goals:KNOWLEDGE_GOALS,milestones:RENDERER_MILESTONES,stats:SOURCE_IMPORT_STATS})',context));
const byId=Object.fromEntries(topics.map(t=>[t.id,t])),refs=Object.fromEntries(references.map(r=>[r.id,r]));
const link=id=>`[${byId[id].title}](#${id})`;
const out=['# Graphics Programmer Roadmap v9 — карта знаний',`${topics.length} самостоятельных тем · ${directions.length} направлений · Vulkan / C++20.\n`,
 'Открой `index.html`. Главный экран — Дерево. «Мой путь» вычисляется из целей и обязательных prerequisites; «Сегодня» предлагает один конкретный шаг. Порядок направлений не является зависимостью.\n',
 'Статусы: не изучал, знаком / нужна практика, изучаю, освоил, повторить позже. Знакомые и освоенные темы снимаются с обязательного пути; практическое подтверждение хранится отдельно от самооценки. База доступна как справочник.\n',
 'Все прежние 245 уроков, ID, заметки, проекты и источники сохранены. Они доступны через «Ещё → Архив прежней программы», прежнюю полку и [архив Markdown](LEGACY-ROADMAP.md). Только точные соответствия конкретных уроков переносят completion в новую карту.\n',
 '## Цели и проекты\n',...goals.map(g=>`- **${g.title}:** ${g.targets.map(link).join(', ')}.`),
 '\n### Основной Vulkan Renderer / 3D Viewer\n',...milestones.map(m=>`- **${m.title}:** ${m.topics.map(link).join(', ')}. ${m.result}`),
 '\n## Источники\n',`${stats.inputCount} записей обработано из docs/likns.md. После объединения повторов и сохранения прежних книг: ${stats.total}. Графика: ${stats.byScope.graphics}; инженерная база: ${stats.byScope.support}; дополнительный архив: ${stats.byScope.archive}; служебные: ${stats.byScope.service}. ${stats.linked} источников имеют конкретные связи с темами; остальные сохраняются с пометкой об отсутствии точной привязки.\n`,
 'Проверены отдельные оглавления и entry points, а не весь каталог. Если номер главы не подтверждён, назначается поиск по теме с явной пометкой. Источники без URL и отсутствующие локальные материалы сохраняются. Автоматическое сопоставление по названию алгоритма нужно проверять при чтении.\n',
 '## Карта знаний\n'];
for(const d of directions){out.push(`## ${d.title}\n`,d.description+'\n');for(const group of [...new Set(topics.filter(t=>t.direction===d.id).map(t=>t.group))]){out.push(`### ${group}\n`);for(const t of topics.filter(t=>t.direction===d.id&&t.group===group)){
 out.push(`<a id="${t.id}"></a>\n\n#### ${t.title}\n`,`${t.level} · ${t.activity}\n`,t.summary,`\n**Применение:** ${t.application}.`,...(t.advantage?[`**Преимущества:** ${t.advantage}.`,`**Ограничения:** ${t.limitation}`]:[]),`**Обязательные предпосылки:** ${t.prerequisites.length?t.prerequisites.map(link).join(', '):'независимая точка входа'}.`,...(t.recommended.length?[`**Рекомендуется:** ${t.recommended.map(link).join(', ')}.`]:[]),...t.readings.map(r=>`- **${r.role}:** [${refs[r.source].title}](${refs[r.source].url}) — ${r.where}. ${r.verified?'Название раздела сверено.':'Точная привязка требует проверки.'}`),`\n**Практика:** ${t.practice}`,`**Завершение:** ${t.criterion}`,`**Самопроверка:** ${t.questions.join(' ')}`,`**Углубление:** ${t.stretch}`,`**Подсказка:** ${t.hint}\n`);
}}}
out.push('## Сохранения и воспроизводимость\n','Хранилище localStorage и старые keys сохранены. Экспорт v9 включает прежний прогресс и knowledge. Импорт v6–v9 объединяет данные; прежний JSON не стирает новые статусы, заметки и этапы renderer. Поле с практическим подтверждением требует описанного результата. Это самооценка, код автоматически не проверяется.\n','GitHub Pages: относительные пути поддерживают `/graphics-road/`. Приложение работает и через file://; сборка для запуска не нужна.\n','Генерация: `npm run sources`, затем `npm run docs`. Проверки: `npm test`, `npm run test:browser`.');
writeFileSync('ROADMAP.md',out.join('\n')+'\n','utf8');console.log(`ROADMAP.md: ${topics.length} topics, ${directions.length} directions`);

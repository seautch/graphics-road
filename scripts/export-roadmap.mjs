import {readFileSync,writeFileSync} from 'node:fs';
import vm from 'node:vm';
const context=vm.createContext({});
for(const file of ['data/legacy-curriculum.js','data/curriculum.js','data/projects.js'])vm.runInContext(readFileSync(file,'utf8'),context);
const {learning,lessons,phases,tests,projects,common,jobs,gates}=JSON.parse(vm.runInContext('JSON.stringify({learning:LEARNING_DATA,lessons:LESSON_DATA,phases:ROADMAP_PHASES,tests:PLACEMENT_TESTS,projects:PORTFOLIO_PROJECTS,common:PROJECT_COMMON,jobs:JOB_SOURCES,gates:READINESS_GATES})',context));
const byId=Object.fromEntries(learning.modules.map(m=>[m.id,m]));
const link=id=>`[${byId[id].title}](#${id})`;
const out=[
 '# Graphics Programmer Roadmap v7',
 `\n${learning.modules.length} блока · ${lessons.length} урока · ${tests.length} входных испытаний · ${projects.length} проектов.\n`,
 'Цель: подготовиться к самостоятельной работе с realtime renderer на C++ и к подходящим по опыту graphics / rendering вакансиям Saber Interactive и других студий. Маршрут не обещает оффер или senior-грейд.\n',
 '## Как идти\n',
 '1. Открой `index.html` → «Старт». Выбери один API: D3D12 + HLSL для Windows / PIX либо Vulkan + GLSL/HLSL. Второй backend не обязателен.',
 '2. Подтверди знакомую базу входными испытаниями. Подтверждение блока хранится отдельно от отметок отдельных уроков.',
 '3. Иди по ядру и предпосылкам. Большинство задач делай в одном C++ renderer. Прежние WebGPU и игровые задания доступны как дополнительные.',
 '4. Читай назначенный фрагмент, реализуй эксперимент, проверь edge cases и сохрани commit / capture / результат. Чтение не подтверждает практику.',
 '5. Заверши основной renderer и один проект в глубину. Специализации выбирай под интерес и вакансию; не нужно выполнять все проекты.',
 '6. Каждые 4–6 недель показывай законченную подсистему. Планируй 2–3 сессии кода в неделю, чтение под задачу и отдельную проверку. Оценки времени приблизительны.\n',
 '## Источники требований\n',
 ...jobs.map(s=>`- [${s.title}](${s.url}) — ${s.kind}. ${s.note}`),
 '\nСверено 25.10.2026. Saber — вторичный senior-ориентир, не подтверждение актуального junior найма. Console/shipped-game опыт не заменяется учебными проектами.\n',
 '## Входные испытания\n',
 'Работай на собственном коде без пошагового туториала. Нужны все условия и содержательное evidence: commit/путь, команда или шаги воспроизведения, результат. Приложение хранит самооценку и не проверяет код автоматически.\n'
];
for(const t of tests)out.push(`### ${t.title} · ${t.time}\n`,...t.tasks.map(x=>`- [ ] ${x}`),`\nПробелы → ${link(t.fail)}.\n`);
out.push('## Основной маршрут: D3D12 ИЛИ Vulkan\n');
for(const [i,[title,desc]] of phases.entries())out.push(`${i+1}. **${title}.** ${desc}\n\n   ${learning.modules.filter(m=>m.phase===i&&m.track!=='optional'&&m.track!=='specialization').map(m=>link(m.id)+(m.track==='core'?'':` (${m.track})`)).join(' → ')}\n`);
out.push('Блоки внутри этапа можно изучать параллельно после их предпосылок. Если нужна предпосылка backend, требуется D3D12 **или** Vulkan согласно выбранному пути.\n');
for(const [heading,filter] of [['Ядро и backend',m=>m.track!=='optional'&&m.track!=='specialization'],['Специализации — выбери одну',m=>m.track==='specialization'],['Дополнительные и прежние уроки',m=>m.track==='optional']]){
 out.push(`## ${heading}\n`);
 for(const m of learning.modules.filter(filter)){
  out.push(`<a id="${m.id}"></a>\n\n### ${String(m.num).padStart(2,'0')}. ${m.title}\n`,`**Ветка:** ${m.track} · **Этап:** ${m.phase+1} · **Объём:** ${m.hours}\n`,m.goal,`\n**Предпосылки:** ${m.deps.length?m.deps.map(link).join(', '):'можно начать сразу'}${m.apiGate?'; выбранный D3D12 / Vulkan backend':''}.\n`);
  for(const l of lessons.filter(l=>l.module===m.id)){
   const b=l.book?learning.books[l.book]:null;
   out.push(`#### ${l.position}. ${l.title} · ${l.hours}\n`,`- **Понять:** ${l.why}`,`- **Читать:** ${l.where}${b?` — [${b.title}](${l.url||b.url})`:l.url?` — [Источник](${l.url})`:''}.`,`- **Реализовать:** ${l.build}`,`- **Проверить:** ${l.prove}`,'- [ ] Могу объяснить без подсказки.','- [ ] Реализовал и проверил; evidence сохранено.\n');
  }
  out.push(`**Итог блока:** ${m.project}\n`);
 }
}
out.push('## Проекты для портфолио\n','Рекомендуемый набор: Rendering Lab + visibility, temporal, lighting, performance либо UE под соответствующую вакансию. Все восемь делать не требуется. Время проекта пересекается со временем уроков: не складывай часы механически.\n');
for(const p of projects)out.push(`### ${p.title}\n`,`${p.tag} · ${p.hours}\n`,p.pitch,`\n**Предпосылки:** ${p.modules.map(link).join(', ')}.\n`,'**Минимум:**\n',...p.minimum.map(x=>`- [ ] ${x}`),'\n**Сильная версия:**\n',...p.strong.map(x=>`- [ ] ${x}`),'\n**Общее качество — обязательно:**\n',...common.map(x=>`- [ ] ${x}`),'\n**Необязательное развитие:**\n',...p.stretch.map(x=>`- ${x}`),`\n**Чего недостаточно:** ${p.reject}`,`\n**Демонстрация:** ${p.demo}`,`\n**Источники:** ${p.sources.map(id=>`[${learning.books[id].title}](${learning.books[id].url})`).join(', ')}.\n`);
out.push('## Готовность к откликам\n');
for(const g of gates)out.push(`### ${g.title}\n`,g.note,`\nПодтвердить: ${g.modules.map(link).join(', ')}.\n`);
out.push('## Источники и чтение\n','Книги из прежней версии сохранены: FCG / 3D Math Primer — база; RTR — карта realtime rendering; Game Engine Architecture / CSAPP / Effective Modern C++ — инженерия; PBRT — теория и reference. Документацию выбранного API читай под задачу. Номера глав прежних уроков сверяй со своим изданием.\n','Видео: [Advances — доклады, слайды и записи](https://advances.realtimerendering.com/), [официальный канал](https://www.youtube.com/channel/UC9V4KS8ggGQe_Hfeg1OQrWw), [CMU 15-462/662](https://www.cs.cmu.edu/~15462/). Выпиши задачу, baseline, допущения и воспроизведи ограниченный эксперимент. Просмотр не подтверждает навык.\n','## Сохранение\n','Прогресс, notes, испытания, выбранный API и проекты сохраняются в localStorage. Экспорт v7 включает всё; импорт v6 сохраняет исходные lesson IDs. Перед обновлением экспортируй резервную копию. На другом URL или в другом браузере импортируй JSON.\n','---\n','Файл генерируется из `data/*.js`: `npm run docs`. Приложение работает без Node.js и без сборки.');
writeFileSync('ROADMAP.md',out.join('\n')+'\n','utf8');
console.log(`ROADMAP.md: ${learning.modules.length} modules, ${lessons.length} lessons, ${projects.length} projects`);

/* Subject-first curriculum. Lesson IDs and source records are migration keys. */
'use strict';
const addedModuleStart=V7_MODULES.length;
unit('cpp-start','Язык, сборка и отладчик',0,[],'tour3',[
 ['Программа от main до результата','A Tour of C++: The Basics, User-Defined Types','Как данные проходят через функции и типы?','Собери консольную программу: структуры Vec3, функции, циклы, чтение простого текстового файла.','Чистая сборка; неверный ввод и отсутствующий файл обработаны.'],
 ['Значения, ссылки и время жизни','A Tour of C++: Pointers, Arrays, References; Resource Management','Чем копия отличается от ссылки и кто владеет памятью?','Сравни передачу по значению и ссылке; найди dangling reference в маленьком примере.','Объясни stack/heap, const, scope; исправление проверено отладчиком.'],
 ['Алгоритмы и структуры данных','A Tour of C++: Containers, Algorithms','Как выбрать vector, map и алгоритм поиска под задачу?','Напиши индекс имён объектов и сортировку записей; замерь поиск для разных размеров.','Объясни сложность и инвалидирование; результаты одинаковы с эталоном.'],
 ['Отладка и воспроизводимая сборка','A Tour of C++: Error Handling; C++ Core Guidelines','Как другой человек повторит найденную ошибку?','CMake Debug/Release, breakpoint, call stack и минимальный тест ошибки границ массива.','Сборка по README; ошибка локализована и исправлена; тест предотвращает повторение.','isocpp']
 ],{goal:'Начни здесь. Научись писать и отлаживать небольшие C++ программы до знакомства с GPU.',project:'Небольшая C++ программа с CMake, обработкой ошибок и тестами.'});
unit('math-tools','Анализ, вероятность и численные методы',1,['math'],'pbrt',[
 ['Производная и интеграл','FCG: mathematical fundamentals; PBRT: radiometry','Как изменение функции и площадь под ней связаны с изображением?','На CPU сравни конечные разности и численное интегрирование sin(x) с аналитическим ответом.','График ошибки по размеру шага; объясни rounding и truncation.','fcg'],
 ['Вероятность, PDF и математическое ожидание','PBRT: Monte Carlo Integration, Probability','Почему плотность не равна вероятности одного значения?','Сгенерируй uniform и cosine-weighted направления, выведи гистограммы.','PDF нормирована; средние и дисперсия проверены на фиксированных seeds.'],
 ['Monte Carlo и importance sampling','PBRT: Monte Carlo Integration','Почему выбор PDF меняет дисперсию, но не целевой интеграл?','Оцени известный интеграл двумя распределениями при одинаковом числе samples.','Сравни bias и variance на серии запусков; обработай нулевую PDF.']
 ],{goal:'Заранее освоить математику выборок, фильтрации и интегрирования. Все эксперименты — небольшие CPU программы.',project:'Набор численных экспериментов с известным аналитическим ответом.'});
unit('pipeline-basics','Как треугольник становится пикселями',2,['math'],'fcg',[
 ['Путь вершины и пикселя','FCG: Graphics Pipeline, Rasterization','Какие данные входят и выходят из каждого этапа?','На бумаге и CPU проведи треугольник через transforms, clipping, rasterization и depth test.','Объясни vertex/fragment shader, framebuffer, clipping и culling без вызовов API.'],
 ['Программный растеризатор','FCG: Rasterization, Barycentric Coordinates','Как определить покрытие пикселя и интерполировать атрибуты?','На CPU сохрани PPM: два треугольника, barycentric цвета и depth buffer.','Перекрытие корректно при смене порядка рисования; нет дыр на общей границе.']
 ],{goal:'Понять конвейер в маленьком CPU растеризаторе. Собственный GPU backend здесь ещё не нужен.',project:'PPM-изображение из своего CPU растеризатора с корректным depth test.'});
unit('math-rotation','Ориентации и базисы',1,['math'],'mathprimer',[
 ['Базис, обратная матрица и нормаль','3D Math Primer: matrices, coordinate spaces','Почему normal matrix — inverse transpose?','На CPU преобразуй касательную и нормаль при non-uniform scale; проверь их dot.','Ортогональность сохраняется; singular transform обработан явно.'],
 ['Кватернионы и интерполяция','3D Math Primer: orientations, quaternions','Почему линейная интерполяция углов может выбрать неверный путь?','Quaternion composition, normalize и slerp; сравни результат с матрицами.','Тесты identity, q/-q, близких ориентаций и поворота на 180 градусов.']
 ],{goal:'Закончить преобразования и ориентации до сцены, анимации и освещения.',project:'CPU тесты базисов, нормалей и ориентаций.'});
LEARNING_DATA.modules.push(...V7_MODULES.slice(addedModuleStart));
LESSON_DATA.push({id:'light-sources',module:'light',position:7,title:'Point и spot lights: единицы и затухание',book:'rtr',where:'Light and Color; Direct Illumination: punctual lights',why:'Почему освещённость от точечного источника убывает с квадратом расстояния, а spotlight ограничивает угол?',build:'Реализуй point и spot lights: inverse-square falloff, безопасную обработку нулевого расстояния, inner/outer cone и визуализацию вклада каждого источника.',prove:'При удвоении расстояния освещённость тестовой поверхности падает в четыре раза при неизменном угле; края конуса непрерывны, NaN отсутствуют.',nodes:[],hours:'3–8 ч'});

function subjectModule(id,title,goal){
 const m={id,title,goal,project:goal,num:0,tier:'base',phase:0,deps:[],track:'core',checks:[],nodes:[],reading:[],topics:'',hours:'По урокам'};
 LEARNING_DATA.modules.push(m);return m;
}
subjectModule('color-output','Цвет, HDR и вывод на экран','Разобраться с sRGB, линейными данными, HDR, экспозицией и tone mapping в одном блоке. Для проверки используй тестовые цвета и HDR-изображение; модель освещения пока не нужна.');
subjectModule('surface-data','Данные поверхности и normal mapping','Подготовить material textures, tangent basis и normal maps до изучения BRDF. Математика базисов уже пройдена.');
subjectModule('compositing','Прозрачность, композиция и bloom','Собрать прозрачные поверхности и постобработку с корректным порядком проходов и смешивания.');
subjectModule('gpu-resources','Память и контракты CPU ↔ GPU','Разобрать packing, alignment и временную память после создания backend.');

const LESSON_MOVES={
 'cpp-runtime-03':'gpu-resources','cpp-runtime-04':'gpu-resources',
 'math-04':'scene','math-05':'raster-depth','math-07':'scene','raster-depth-05':'math',
 'shader-08':'gameplay','light-03':'frame-debug','light-04':'color-output',
 'sampling-04':'color-output','sampling-05':'compositing','shader-toolchain-03':'sampling',
 'pbr-03':'math-rotation','pbr-04':'surface-data','pbr-05':'surface-data','ibl-lab-04':'surface-data','ibl-lab-05':'color-output',
 'shipping-02':'animation','effects-lab-01':'compute','effects-lab-02':'compositing',
 'ibl-03':'compositing','ray-lab-01':'math-tools'
};
for(const l of LESSON_DATA){if(LESSON_MOVES[l.id])l.module=LESSON_MOVES[l.id];}
const lessonById=Object.fromEntries(LESSON_DATA.map(l=>[l.id,l]));
// The math exercise is runnable before a viewer exists; its progress ID is unchanged.
lessonById['pbr-03'].build='На CPU преобразуй нормаль inverse-transpose матрицей при non-uniform scale. Сравни dot с преобразованной касательной; визуализацию добавишь в сцене позже.';
lessonById['light-04'].build='Сравни сложение и умножение тестовых цветов в sRGB и linear-space, затем выполни output encoding. Вместо модели освещения используй заданные значения radiance; Lambert добавишь в блоке света.';

ROADMAP_PHASES.splice(0,ROADMAP_PHASES.length,
 ['Программирование на C++','Язык → сборка и отладка → владение и память. Результат: уверенная работа с небольшими CPU программами.'],
 ['Математика графики','Векторы и матрицы → геометрия и ориентации → анализ и вероятность. Результат: своя проверенная математическая база.'],
 ['Конвейер и первые шейдеры','CPU растеризатор → функции, маски и процедурные шейдеры в редакторе The Book of Shaders. Результат: понимаешь, откуда берётся пиксель.'],
 ['Графический API','Один backend → синхронизация → память → shader toolchain → диагностика. Результат: рабочая лаборатория для следующих тем.'],
 ['Геометрия и сцена','Растеризация и depth → камера, meshes и glTF → анимация. Результат: корректная движущаяся 3D-сцена.'],
 ['Текстуры, цвет и поверхность','Фильтрация → цветовой pipeline → данные материалов и normal mapping. Результат: поверхность готова к освещению.'],
 ['GPU и параллельные вычисления','Compute kernels → архитектура GPU и стоимость операций. Результат: проверенные параллельные алгоритмы и замеры.'],
 ['Освещение','Источники и радиометрия → BRDF/PBR → тени → IBL → tiled/clustered lighting. Результат: цельная система освещения.'],
 ['Обработка изображения','Прозрачность и bloom → motion vectors, TAA и история. Результат: стабильная картинка в движении.'],
 ['Инженерия рендерера','Visibility и LOD → CPU jobs и streaming → render graph. Результат: измеряемый и масштабируемый renderer.'],
 ['Законченный проект','Инструменты, тесты, выпуск и техническое объяснение. Результат: работа, которую другой разработчик может собрать и проверить.'],
 ['Углубления после основного пути','Ray tracing, screen-space, объёмный свет, GI или Unreal. Выбирай область после завершения основного проекта.'],
 ['Дополнительная практика','Прежние варианты упражнений, WebGPU и игровой проект. Все материалы сохранены; проходить их для основного пути не требуется.']
);
// Explicit teaching order, independent of the old order of declarations.
const SUBJECT_ORDER=[
 ['cpp-start','cpp-runtime'],['math','math-rotation','math-tools'],['pipeline-basics','shader'],
 ['dx12-core','vk-core','sync-lifetime','gpu-resources','shader-toolchain','frame-debug'],
 ['raster-depth','scene','animation'],['sampling','color-output','surface-data'],
 ['compute-lab','gpu-hardware'],['light','pbr','shadow-lab','ibl-lab','clustered'],
 ['compositing','temporal-lab'],['visibility','cpu-jobs','render-graph'],['shipping','interview-lab'],
 ['ray-lab','screen-space','effects-lab','gi-lab','ue-rendering']
];
const dependencies={
 'cpp-runtime':['cpp-start'],math:['cpp-runtime'],'math-rotation':['math'],'math-tools':['math-rotation'],
 'pipeline-basics':['math-tools'],shader:['pipeline-basics'],
 'dx12-core':['shader'],'vk-core':['shader'],'sync-lifetime':[],
 'gpu-resources':['sync-lifetime'],'shader-toolchain':['gpu-resources'],'frame-debug':['shader-toolchain'],
 'raster-depth':['frame-debug'],scene:['raster-depth'],animation:['scene'],
 sampling:['animation'],'color-output':['sampling'],'surface-data':['color-output'],
 'compute-lab':['surface-data','sync-lifetime'],'gpu-hardware':['compute-lab'],
 light:['gpu-hardware','surface-data'],pbr:['light'],'shadow-lab':['pbr'],'ibl-lab':['shadow-lab'],clustered:['ibl-lab','compute-lab'],
 compositing:['clustered'],'temporal-lab':['compositing'],visibility:['temporal-lab','compute-lab'],
 'cpu-jobs':['visibility'],'render-graph':['cpu-jobs','temporal-lab'],'shipping':['render-graph'],
 'interview-lab':['shipping'],'ray-lab':['shipping','math-tools'],'screen-space':['shipping'],'effects-lab':['shipping'],
 'gi-lab':['ray-lab','ibl-lab','temporal-lab'],'ue-rendering':['shipping']
};
for(const m of LEARNING_DATA.modules){
 const phase=SUBJECT_ORDER.findIndex(ids=>ids.includes(m.id));m.phase=phase<0?12:phase;
 m.track=phase<0?'optional':phase===11?'specialization':m.id==='dx12-core'?'d3d12':m.id==='vk-core'?'vulkan':'core';
 if(dependencies[m.id])m.deps=dependencies[m.id];
 m.apiGate=m.id==='sync-lifetime';m.tier=m.phase<3?'base':m.phase<9?'engineering':'advanced';
}
const moduleById=Object.fromEntries(LEARNING_DATA.modules.map(m=>[m.id,m]));
Object.assign(moduleById['cpp-runtime'],{title:'Владение, контейнеры и надёжный C++',goal:'Закрепить RAII, move semantics, контейнеры и обработку ошибок на CPU. GPU handles пока моделируй обычными объектами.',project:'Безопасное владение ресурсами и воспроизводимая C++ сборка.'});
Object.assign(moduleById.math,{title:'Векторы, матрицы и геометрия',goal:'Пройти всю базовую линейную алгебру и пересечения в CPU тестах. Схемы осей и frustum можно рисовать на бумаге или сохранять в SVG.',project:'Проверенные преобразования, проекция и геометрические тесты.'});
Object.assign(moduleById.shader,{title:'Основы шейдеров',goal:'Работай в интерактивном редакторе The Book of Shaders. Изучай функции и процедурные изображения, пользуясь уже знакомыми преобразованиями.',project:'Галерея из пяти небольших шейдеров, которые ты можешь объяснить и переписать.'});
moduleById.light.title='Источники света и радиометрия';
moduleById.light.goal='Изучить только освещение: единицы, directional/point lights, Lambert, Blinn–Phong и затухание. Матрицы, normal maps и вывод цвета уже разобраны.';
moduleById.pbr.title='BRDF и физически обоснованное отражение';
moduleById.pbr.project='GGX на подготовленных материалах: Fresnel, D/F/G и проверка энергии.';
moduleById.sampling.title='Текстуры и фильтрация';
moduleById.sampling.goal='Пройти texels, samplers, mipmaps, производные и aliasing в одном блоке. Цвет и композиция идут отдельно.';
moduleById.sampling.project='Тестовая сцена nearest/linear/mip/aniso с объяснением aliasing и LOD.';
moduleById['effects-lab'].title='Объёмный свет';
moduleById['effects-lab'].goal='Пройти Beer–Lambert, ray marching, froxel lighting и временную стабилизацию объёмного света.';
// Keep coherent local order after relocating lessons, without rewriting IDs.
const lessonOrder={
 'cpp-runtime':['cpp-runtime-01','cpp-runtime-02','cpp-runtime-05'],
 math:['math-01','math-02','math-03','math-06','raster-depth-05'],
 'math-rotation':['math-rotation-01','pbr-03','math-rotation-02'],
 'raster-depth':['math-05','raster-depth-02','raster-depth-01','raster-depth-03','raster-depth-04'],
 scene:['math-04','math-07','scene-01','scene-02','scene-03','scene-04','scene-05','scene-06'],
 'color-output':['sampling-04','light-04','ibl-lab-05'],
 'surface-data':['pbr-05','pbr-04','ibl-lab-04'],light:['light-06','light-01','light-sources','light-02','light-05'],
 compositing:['sampling-05','effects-lab-02','ibl-03']
};
LEARNING_DATA.modules.sort((a,b)=>a.phase-b.phase||(SUBJECT_ORDER[a.phase]?.indexOf(a.id)??0)-(SUBJECT_ORDER[b.phase]?.indexOf(b.id)??0));
LEARNING_DATA.modules.forEach((m,i)=>{
 m.num=i+1;const ls=LESSON_DATA.filter(l=>l.module===m.id);
 if(lessonOrder[m.id])ls.sort((a,b)=>lessonOrder[m.id].indexOf(a.id)-lessonOrder[m.id].indexOf(b.id));
 ls.forEach((l,j)=>l.position=j+1);m.topics=ls.map(l=>l.title).join(' · ');m.hours=`${ls.length*3}–${ls.length*8} ч`;
});
LESSON_DATA.sort((a,b)=>moduleById[a.module].num-moduleById[b.module].num||a.position-b.position);
// An old module-level placement result cannot certify a regrouped module.
const CURRICULUM_REVISION=8;
PLACEMENT_TESTS.find(t=>t.id==='cpp-runtime').tasks=['Move-only resource owner с тестами move/error/double-free.','Найти invalidated vector reference и stale handle; исправить с тестом.','Собрать CMake Debug/Release и локализовать CPU ошибку через sanitizer или отладчик.'];
PLACEMENT_TESTS.find(t=>t.id==='math').tasks=['Вывести view/projection и численно провести точку через пространства на CPU.','Показать разницу преобразования точки и направления; объяснить порядок матриц.','Ray/triangle: проверить parallel/edge/degenerate cases и численную устойчивость.'];
PLACEMENT_TESTS.find(t=>t.id==='sampling').tasks=['Сравнить nearest/linear/mip/aniso на наклонной текстуре в движении.','Объяснить texel footprint, implicit LOD и корректное применение derivatives.','Воспроизвести aliasing и показать изменение качества и стоимости при выборе фильтра.'];
PLACEMENT_TESTS.find(t=>t.id==='light').tasks=['Объяснить radiance, irradiance и единицы источников.','Directional, point и spot lights: Lambert, согласованные направления, inverse-square falloff и границы конуса.','Сравнить Lambert и Blinn–Phong; показать вклад каждого источника и отсутствие NaN.'];
PLACEMENT_TESTS.find(t=>t.id==='pbr').tasks=['Объяснить BRDF, Fresnel, D/F/G и roughness convention без копирования готовой функции.','Сравнить metal/dielectric и grazing angles на sphere grid с уже подготовленными normal maps.','Проверить распределение энергии, roughness→0 и NaN; сопоставить с reference.'];

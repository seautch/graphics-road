// v7 curriculum. Classic scripts deliberately support file:// and static hosting.
// Each row: title, focused reading, question, experiment, acceptance, source.
'use strict';
const EXTRA_SOURCES = [
  ['dxsamples','DirectX Graphics Samples / MiniEngine','https://github.com/microsoft/DirectX-Graphics-Samples','docs','D3D12 samples: HelloWorld, frame buffering, indirect execution; MiniEngine как пример архитектуры.'],
  ['dxbarriers','D3D12: resource barriers','https://learn.microsoft.com/en-us/windows/win32/direct3d12/using-resource-barriers-to-synchronize-resource-states-in-direct3d-12','docs','Transition, UAV и aliasing barriers.'],
  ['enhanced','D3D12 Enhanced Barriers specification','https://github.com/microsoft/DirectX-Specs/blob/master/d3d/D3D12EnhancedBarriers.md','docs','Sync, access, layout; отдельно от legacy resource states.'],
  ['vksync','Khronos: Synchronization Examples','https://docs.vulkan.org/guide/latest/synchronization_examples.html','docs','Примеры synchronization2 для конкретных producer/consumer.'],
  ['vksamples','Khronos Vulkan Samples','https://github.com/KhronosGroup/Vulkan-Samples','docs','Официальные базовые и performance samples; проверяй hardware requirements.'],
  ['dxc','DirectX Shader Compiler','https://github.com/microsoft/DirectXShaderCompiler','tool','HLSL, DXIL, SPIR-V, диагностика компиляции.'],
  ['pix','PIX on Windows','https://devblogs.microsoft.com/pix/documentation/','tool','GPU captures и timing captures для D3D12.'],
  ['nsight','NVIDIA Nsight Graphics','https://developer.nvidia.com/nsight-graphics','tool','Frame debugging и GPU Trace; поддержка зависит от GPU и API.'],
  ['rgp','Radeon GPU Profiler','https://gpuopen.com/rgp/','tool','Wavefronts, counters и timeline на поддерживаемых AMD GPU.'],
  ['occupancy','AMD: occupancy and resource usage','https://gpuopen.com/learn/optimizing-gpu-occupancy-resource-usage-large-thread-groups/','article','Эксперимент с размером thread group и ресурсами.'],
  ['rdg','Epic: Render Dependency Graph','https://dev.epicgames.com/documentation/en-us/unreal-engine/render-dependency-graph-in-unreal-engine','docs','RDG passes, shader parameters, lifetime, validation и RDG Insights.'],
  ['advances','Advances in Real-Time Rendering — доклады и видео','https://advances.realtimerendering.com/','video','Архив SIGGRAPH: выбери один доклад под текущую проблему, затем воспроизведи эксперимент.'],
  ['cmu','CMU 15-462/662: Computer Graphics','https://www.cs.cmu.edu/~15462/','course','Лекции и задания по геометрии, растеризации и rendering.'],
  ['hizpaper','GPU Driven Rendering in Trials Rising — GDC','https://media.gdcvault.com/gdc2019/presentations/Drazhevskyi_Oleksandr_GPU_Driven_Rendering.pdf','article','Доклад разработчика Ubisoft: GPU-driven pipeline и виртуальные текстуры.'],
  ['meshopt','meshoptimizer','https://github.com/zeux/meshoptimizer','docs','Измерение vertex cache, overdraw, fetch и LOD.'],
  ['ktx','Khronos KTX / KTX-Software','https://github.com/KhronosGroup/KTX-Software','docs','Текстурные контейнеры, mip chains и Basis Universal.'],
  ['tracy','Tracy Profiler','https://github.com/wolfpld/tracy','tool','CPU zones, allocation tracking и frame timeline.'],
  ['isocpp','C++ Core Guidelines','https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines','docs','Lifetime, ownership, error handling и concurrency.']
].map(([id,title,url,type,focus])=>({id,title,url,type,focus,level:'deep',lane:'vulkan',action:'Прочти назначенный в уроке фрагмент и проведи эксперимент.',access:'free',nodes:[]}));
const ROADMAP_SOURCES = EXTRA_SOURCES;
for(const r of EXTRA_SOURCES) LEARNING_DATA.books[r.id]={id:r.id,title:r.title,url:r.url,edition:'Веб-источник / '+(r.type==='video'?'доклады и записи':'документация'),role:r.focus,skip:'Остальные разделы — только под задачу. Не проходить весь архив.',verify:'Названия тем указаны вместо нестабильных номеров разделов'};

const V7_MODULES=[];
function unit(id,title,phase,deps,source,rows,options={}){
 const lessons=rows.map((r,i)=>({id:`${id}-${String(i+1).padStart(2,'0')}`,module:id,position:i+1,title:r[0],where:r[1],why:r[2],build:r[3],prove:r[4],book:r[5]||source,nodes:[],hours:options.lessonHours||'3–8 ч'}));
 LESSON_DATA.push(...lessons);
 const m={id,title,num:0,tier:phase<3?'base':phase<5?'engineering':'advanced',phase,deps,track:options.track||'core',goal:options.goal||title,topics:lessons.map(l=>l.title).join(' · '),project:options.project||lessons.at(-1).prove,checks:[],nodes:[],reading:[],hours:options.hours||`${rows.length*3}–${rows.length*8} ч`,...options};
 V7_MODULES.push(m);return m;
}

unit('cpp-runtime','C++ для renderer: lifetime и ресурсы',0,[],'isocpp',[
 ['RAII и move-only GPU handles','Guidelines: R.1, R.3, R.5; Effective Modern C++: move semantics','Кто владелец ресурса и когда его можно уничтожить?','Напиши move-only handle для mock GPU resource; проверь move, self-move, early return и ошибку создания.','Ровно одно освобождение; moved-from объект безопасен; утечки и double free отсутствуют.'],
 ['Контейнеры, инвалидирование и память','A Tour of C++: containers; CSAPP: memory hierarchy','Какая операция ломает pointer/span на данные?','Воспроизведи инвалидирование vector; замени долгоживущие указатели индексами с generation counter.','Тест stale handle после удаления и повторного использования слота; объясни reserve и capacity.','tour3'],
 ['Alignment и CPU ↔ shader layout','HLSL constant buffer packing / документация layout выбранного API','Почему sizeof CPU структуры не гарантирует совместимость с GPU?','Передай mat4, float3, scalar и массив структур; добавь static_assert и debug shader с выводом полей.','Сравни все поля с ожидаемыми значениями, включая массивы и padding; укажи правила своего backend.','dxc'],
 ['Frame arena и ограничение аллокаций','Game Engine Architecture: memory management','Какие временные данные живут один CPU frame, а какие — до GPU fence?','Добавь aligned linear allocator, счётчик allocations и reset только в безопасной точке.','Замерь allocations/frame до и после; переполнение обработано; GPU transient память не сбрасывается раньше fence.','gameengine'],
 ['Сборка, ошибки, sanitizers','Guidelines: E — error handling; CMake и compiler docs по месту','Можно ли собрать проект на чистой машине и локализовать UB?','CMake presets Debug/Release, warnings, AddressSanitizer где поддерживается; обработка asset/shader errors.','Чистая сборка по README; специально внесённая CPU ошибка поймана; Release не отключает обработку ошибок.']
],{goal:'Управлять памятью и владением в C++ без скрытого UB; написать основу собственного C++ renderer.'});

unit('raster-depth','Растеризация, глубина и численная устойчивость',1,['math'],'fcg',[
 ['Perspective-correct interpolation','FCG: rasterization и interpolation','Почему линейная интерполяция UV после perspective divide неверна?','Сравни affine UV и интерполяцию через 1/w на наклонном quad; выведи формулу.','Два треугольника дают непрерывную шахматную текстуру при движении камеры.'],
 ['Clipping и соглашения координат','FCG: viewing; docs clip space выбранного API','Чем clipping отличается от culling и где выполняется divide?','Проследи вершину через world/view/clip/NDC; пересечь near plane; отладить winding.','Нет взрывов геометрии у near plane; записаны handedness, диапазон z и ориентация экрана.'],
 ['Depth precision и reversed-Z','RTR: depth buffering; проекция в FGED Vol. 2','Почему изменение near plane влияет на precision сильнее far?','Построй график ошибок float depth для standard/reversed-Z; настрой clear и compare.','Пары близких поверхностей на разных расстояниях; объясни необходимость floating point и согласованность всех depth passes.','rtr'],
 ['Early-Z, discard и overdraw','RTR: GPU pipeline, depth/stencil','Когда depth prepass окупается, а когда дублирует работу?','Сравни opaque, alpha test и prepass на сцене с управляемым overdraw.','GPU timing по проходам; вывод для двух сцен, включая случай, где prepass замедляет.','rtr'],
 ['Численная устойчивость геометрии','RTCD: closest points и intersection tests','Почему универсальный epsilon не работает при любом масштабе?','Тесты ray/AABB/triangle для параллельных лучей, границ, нулевых размеров и разных масштабов.','Нет NaN; явно описаны допустимые диапазоны и политика граничных попаданий.','rtd']
],{});

unit('gpu-hardware','GPU: исполнение, память и стоимость кадра',1,['cpp-runtime'],'rtr',[
 ['SIMD/SIMT, wave и divergence','RTR: GPU architecture; PMPP: execution model','Почему разные ветки внутри wave могут стоить дороже?','Сравни uniform и divergent branch на одинаковом объёме вычислений; не оптимизируй по одному FPS.','Сохрани GPU timing и входные данные; объясни, где compiler мог убрать ветку.'],
 ['Bandwidth, cache и coalescing','PMPP: global memory access','Почему соседние threads должны читать соседние адреса?','Compute copy/transposition с последовательным и strided доступом, несколько размеров buffers.','Таблица GB/s и latency; объём данных превышает cache; readback исключён из GPU времени.','cuda'],
 ['Registers, occupancy и latency hiding','AMD: occupancy and resource usage','Почему максимальная occupancy не всегда даёт минимальное время?','Измени размер thread group и pressure временных переменных в одном kernel.','Не менее трёх вариантов; profiler при наличии поддержки, иначе честно ограничь вывод timing.','occupancy'],
 ['Текстурные блоки, ROP и форматы','RTR: GPU architecture и texture pipeline','Когда bottleneck — bandwidth, fill rate или ALU?','Меняй resolution, sample count, формат HDR и сложность shader по одному фактору.','Построй таблицу sensitivity; сформулируй и проверь две гипотезы.'],
 ['CPU submission и GPU queue','Game Engine Architecture: rendering architecture','Почему CPU frame time, GPU time и latency — разные величины?','Нарисуй timeline для 1/2/3 frames in flight и замерь CPU submit и GPU timestamps.','Нет сложения перекрывающихся CPU/GPU времён; указаны VSync и latency ограничения.','gameengine']
],{hours:'20–40 ч'});

unit('shader-toolchain','HLSL / GLSL: инструменты и контракты шейдеров',1,['cpp-runtime','math'],'dxc',[
 ['Компиляция и shader interface','DXC README: compilation, DXIL и SPIR-V','Что compiler проверяет до создания pipeline?','CLI-компиляция vertex/fragment/compute, сохранение diagnostics и debug symbols.','Сломанный include или тип даёт понятную ошибку и не разрушает последний рабочий pipeline.'],
 ['Packing и binding contract','DXC: shader resources; backend docs по binding','Как обнаружить несовпадение CPU binding и shader declaration?','Опиши binding schema, проверь отражённые bindings или явно валидируй интерфейс.','Неверный slot/type обнаруживается до draw; сравни matrix major convention.'],
 ['Derivatives и implicit LOD','RTR: texture filtering, derivatives','Почему ddx/ddy внутри divergent control flow требуют осторожности?','Визуализируй footprint, implicit LOD и explicit gradients на наклонной поверхности.','Сравни мерцание в движении; объясни quad execution и корректное место вычисления derivatives.','rtr'],
 ['Shader variants и hot reload','MiniEngine: shader/pipeline organization','Почему все комбинации defines быстро становятся проблемой?','Ключ variant из feature flags; cache по source+include+defines; безопасная замена pipeline.','Изменение include инвалидирует cache; compile error сохраняет рабочую версию.','dxsamples'],
 ['Числа, NaN и precision','Filament: precision; HLSL numeric types','Где допустимо уменьшить precision, а где возникает нестабильность?','Добавь NaN/Inf debug view; проверь roughness→0, normalization нулевого вектора и HDR диапазон.','Нет NaN на edge cases; ограничения half/min16float привязаны к hardware и compiler.','filament']
],{});

unit('dx12-core','D3D12: ресурсы, bindings и frame loop',2,['gpu-hardware','shader-toolchain','raster-depth'],'dxsamples',[
 ['Device, debug layer и swapchain','Samples: HelloWindow, HelloTriangle; debug layer','Что относится к device, а что пересоздаётся при resize?','Адаптер, device, queue, swapchain, RTV; debug layer и имена объектов. Треугольник только как smoke test.','Resize/minimize/restore не падают; debug layer чистый; выбранный adapter записан.'],
 ['Command allocators и frame contexts','Samples: HelloFrameBuffering','Почему allocator нельзя reset до завершения GPU работы?','Два или три frame contexts: command allocator, fence value, per-frame upload data.','Длительный GPU workload не повреждает данные; CPU не ждёт всю очередь каждый кадр.'],
 ['Heaps, upload и texture footprints','Samples: HelloTexture; D3D12 resource docs','Чем upload/default/readback heaps отличаются по назначению?','Загрузи indexed mesh и mip texture; учти row pitch, placement alignment и staging lifetime.','Текстура нестандартного размера отображается корректно; staging освобождается после fence.'],
 ['Root signature и descriptors','Samples: HelloTexture; MiniEngine descriptors','Чем CPU descriptor handle отличается от GPU handle?','CBV/SRV/UAV heap, sampler, descriptor table и root constants; несколько материалов.','Никаких stale descriptors при смене материала и нескольких frames in flight.'],
 ['PSO, depth и HDR target','Samples: HelloBundles / MiniEngine pipeline states','Какие состояния входят в PSO и как не создавать его на каждом draw?','Indexed scene, depth attachment и HDR offscreen target; PSO cache с явным ключом.','Два материала и прозрачный pass; отсутствует создание PSO в стабильном кадре.']
],{track:'d3d12',goal:'Самостоятельный D3D12 backend для будущих экспериментов. Один API достаточно для основного маршрута.'});

unit('vk-core','Vulkan: ресурсы, descriptors и frame loop',2,['gpu-hardware','shader-toolchain','raster-depth'],'vkguide',[
 ['Capabilities и корректный frame loop','vkguide: initialization, swapchain, drawing','Почему нельзя предполагать наличие feature или формата?','Instance, device, queues, swapchain; validation/debug labels; таблица требуемых features.','Resize/minimize/out-of-date обработаны; required features проверяются с понятной ошибкой.'],
 ['Command pools и frame contexts','vkguide: command buffers и synchronization','Почему frame index и swapchain image index — разные индексы?','Per-frame command pool, fence, acquire/present synchronization; переиспользование объектов только после завершения.','Стресс: resize и медленный GPU; жизненный цикл present semaphores обоснован.'],
 ['Memory и staging','Vulkan Guide: memory allocation; vkguide buffers','Что значит host coherent и когда нужен flush/invalidate?','Device-local mesh и texture upload; VMA допустим после объяснения memory type selection.','Данные совпадают с CPU; staging lifetime привязан к fence; учтён non-coherent atom size.'],
 ['Descriptor sets и pipeline layout','vkguide: descriptors, textures','Как lifetime descriptor pool связан с незавершёнными submissions?','Несколько материалов и per-frame uniforms; документируй layout, ranges и alignment.','Нет изменения descriptors, ещё читаемых GPU; validation не выдаёт предупреждений.'],
 ['Dynamic rendering и pipelines','Khronos Vulkan Samples: dynamic rendering','Что dynamic rendering упрощает, а что оставляет приложению?','Indexed scene, depth и HDR target; PSO cache; required features проверены.','Форматы attachments согласованы с pipeline; transitions и dependencies заданы явно.','vksamples']
],{track:'vulkan',goal:'Самостоятельный Vulkan backend; второй API можно отложить до готового портфолио.'});

unit('sync-lifetime','Синхронизация и lifetime без queue-idle',2,[],'vksync',[
 ['RAW, WAR и WAW','Khronos synchronization examples; D3D12 resource barriers','Чем execution dependency отличается от memory visibility?','Для upload→vertex, compute→indirect, depth→sample выпиши producer, consumer и hazard.','Таблица стадий/access/layout либо D3D12 states; объясни каждую dependency без ALL_COMMANDS везде.'],
 ['Barriers выбранного backend','Vulkan synchronization2 ИЛИ D3D12 transition/UAV barriers','Почему resource transition и ожидание CPU не взаимозаменяемы?','Реализуй compute write→graphics read и HDR render target→post sample; намеренно убери barrier.','Ошибка воспроизводится в контролируемом тесте, где возможно; валидный вариант проходит validation и стресс.'],
 ['Fences, semaphores и deferred destruction','Backend docs: queues и synchronization','Когда безопасно удалить ресурс после последнего CPU использования?','Retirement queue по fence/timeline; удаление mesh/texture во время рендеринга.','1000 циклов create/delete при нескольких frames in flight без use-after-free и роста памяти.'],
 ['Upload ring и backpressure','D3D12 HelloFrameBuffering / vkguide frame overlap','Как ring allocator отличает занятый диапазон от свободного?','Upload ring с alignment и fence retirement; стратегия при исчерпании.','Стресс маленького ring: нет overwrite; ждёшь нужный fence, а не idle всего device.'],
 ['Multi-queue как измеряемая опция','Khronos synchronization examples: queue transfers; D3D12 queues','Когда async compute не ускоряет frame?','Сначала один queue; затем отдельный compute/copy при поддержке, с явными waits и ownership.','Timeline до/после; negative result допустим; отсутствие второго queue не блокирует core.'],
 ['Диагностика device loss','PIX / Vulkan validation docs, DRED для D3D12','Какие данные собрать, если GPU перестал отвечать?','Debug names, breadcrumbs/markers; документированный путь сбора device-loss diagnostics.','Пример отчёта с adapter/driver, последними passes и воспроизведением; не провоцируй бесконтрольный TDR.','pix']
],{apiGate:true,hours:'24–48 ч'});

unit('frame-debug','Разбор кадра и поиск rendering bugs',3,['sync-lifetime','scene'],'nsight',[
 ['Захват и история одного pixel','RenderDoc либо PIX: frame capture; Nsight frame debugger','Как доказать, какой draw испортил pixel?','Захвати свой кадр; найди mesh, bindings, attachments, pipeline state и последний writer.','Отчёт с event IDs и скриншотами входа/выхода одного pass.'],
 ['Пять намеренно сломанных сцен','Свой renderer + API validation','Как отделить проблему geometry, state, material и presentation?','Сломай winding, matrix transpose, sRGB, depth compare и binding; затем локализуй.','Пять коротких bug reports: симптом → гипотеза → evidence → исправление.'],
 ['GPU timestamps и корректная статистика','PIX/Nsight: timing captures','Почему debug capture нельзя считать эталонным benchmark?','Метки по passes, warm-up, Release, фиксированный camera path и CSV.','Median и p95 из нескольких прогонов; указаны GPU, driver, resolution, VSync и settings.'],
 ['CPU bottleneck или GPU bottleneck','Tracy: zones; Nsight GPU Trace','Что изменится при уменьшении resolution и draw count?','Два контролируемых workload: submission-heavy и pixel-heavy; независимые perturbation tests.','Profiler подтверждает гипотезу; GPU timestamp не подменён CPU wall clock.','tracy'],
 ['Регрессии и reference frames','Свой image comparison harness','Как отличить ожидаемое изменение от сломанного рендера?','Фиксированный seed/camera, screenshot capture, difference image и допустимые tolerances.','Ловится внесённая ошибка; temporal/random cases имеют отдельную политику сравнения.']
],{});

unit('ibl-lab','Image-based lighting и проверка BRDF',3,['pbr'],'filament',[
 ['BRDF: энергия и граничные случаи','Filament: material system; RTR: physically based shading','Почему specular + diffuse могут вернуть больше падающей энергии?','White furnace test; roughness sweep; clamp только с объяснением, без маскировки NaN.','График/кадры для dielectric и metal; ограничения single scattering задокументированы.'],
 ['Diffuse irradiance','Filament: image based lighting','Чем radiance cubemap отличается от irradiance?','Интегрируй diffuse irradiance cubemap или SH; единая orientation конвенция.','Constant environment даёт ожидаемый ответ; нет швов и перевёрнутых граней.'],
 ['Specular prefilter и BRDF LUT','Filament: specular IBL','Какие приближения делает split-sum?','GGX prefiltered mips + 2D integration LUT; сохраняемый offline bake.','Sphere grid по roughness/metallic; compare с многосэмпловым reference при том же environment.'],
 ['Normal maps и material validation','Khronos glTF: materials; Filament normal mapping','Как tangent handedness и color space портят материалы?','TBN debug view, mirrored UV, non-uniform scale, normal map с известными направлениями.','Тестовая сцена отделяет tangents, normals и roughness; линейные data textures.','gltf'],
 ['HDR, exposure и tone mapping','Filament: imaging pipeline','Чем tone mapping отличается от sRGB encoding?','HDR pass → exposure → tone mapper → display encoding; сравнение двух операторов.','Нет двойной gamma; экспозиция меняется без изменения световых данных.']
],{});

unit('shadow-lab','Устойчивые тени и CSM',3,['pbr','frame-debug'],'rtr',[
 ['Shadow mapping и bias','RTR: shadows — shadow mapping, bias','Откуда acne и peter-panning и почему bias зависит от геометрии?','Depth map, slope/normal bias controls; debug light frustum.','Сцены с тонкой геометрией, наклонной плоскостью и разными масштабами.'],
 ['PCF и контактные артефакты','RTR: shadow filtering','Почему фильтровать depth и фильтровать comparison — разные операции?','Несколько PCF kernels и reference hard shadows; фиксированный seed.','Сравни качество и GPU cost, нет светлых полос за границей shadow map.'],
 ['Cascaded shadow maps','RTR: cascaded shadow mapping','Как выбрать splits и стабилизировать projection?','3–4 cascades, texel snapping, cascade blend и debug colors.','Camera pan/rotation video; измерены shimmering и стоимость по cascades.'],
 ['Shadow caster culling','RTR: acceleration и shadow rendering','Почему camera-visible set не равен shadow caster set?','Отдельные frusta/light volumes; тест offscreen caster.','Тень offscreen объекта не исчезает; draw counts и CPU/GPU timings до/после.'],
 ['Quality tiers и бюджет','Свой shadow benchmark','Как уменьшать стоимость без случайного изменения всей картинки?','Профили low/medium/high: resolution, cascades, kernel; сохраняемые settings.','Сравнение одного camera path и заявленный бюджет на собственной GPU.']
],{});

unit('compute-lab','Compute: данные, группы и параллельные алгоритмы',3,['sync-lifetime','gpu-hardware'],'cuda',[
 ['Dispatch и bounds checks','PMPP: data parallelism; shader docs','Что делать, если N не кратно размеру группы?','Map kernel CPU/GPU, dispatch ceil(N/groupSize), guard по global index.','N=0,1,groupSize±1 и большой N; readback совпадает с CPU.'],
 ['Shared memory и group barriers','PMPP: shared memory, synchronization','Почему barrier нельзя обходить частью одной группы?','Tiled blur или matrix transpose; uniform control flow вокруг barrier.','Сравни reference, несколько tile sizes; учтены halo и края.'],
 ['Reduction и atomics','PMPP: reduction, atomics','Почему atomic не обеспечивает произвольный порядок всей программы?','Сумма или histogram: naïve atomics, group reduction, двухпроходный вариант.','Размеры вне степени двойки; отдельно погрешность float и точность integer.'],
 ['Prefix sum и compaction','PMPP: parallel scan','Как превратить visibility flags в плотный массив?','Exclusive scan + stream compaction; CPU reference и overflow detection.','Пустой/полный/случайный набор; стабильный порядок, если он обещан.'],
 ['Indirect arguments и visibility barrier','Khronos synchronization examples / D3D12 ExecuteIndirect sample','Почему запись аргументов не означает готовность indirect draw?','Compute заполняет indirect buffer; graphics читает после dependency.','Count=0 и capacity overflow безопасны; GPU buffer dump объясняет draw count.','dxsamples']
],{hours:'20–45 ч'});

unit('clustered','Много источников света: tiled / clustered',4,['compute-lab','ibl-lab','frame-debug'],'cluster',[
 ['Forward и deferred baseline','RTR: rendering pipelines','Какие данные нужны lighting pass и сколько bandwidth они стоят?','Одна сцена, два набора lights; реализуй один baseline и оцени альтернативу.','Посчитай bytes/pixel G-buffer; назови ограничения transparency/MSAA.','rtr'],
 ['Tiled light lists','Clustered Deferred and Forward Shading: spatial subdivision','Как консервативно назначать lights экранным tiles?','Depth bounds, light-volume tests, lists и overflow flags.','Debug heatmap и compare с brute-force lighting; нет пропавших lights.'],
 ['Logarithmic Z clusters','Clustered paper: 3D subdivision','Почему экранный tile плох при большом depth discontinuity?','Добавь Z slices и debug cluster index; обработай near/far boundaries.','Interior/exterior сцены; распределение lights/cluster и совпадение с reference.'],
 ['Прозрачность и худший случай','Свой clustered renderer','Как transparent pixel получает lights, если его нет в opaque depth?','Conservative clusters для прозрачности; тысячи перекрывающихся lights.','Overflow не повреждает память; fallback указан; tail latency и memory usage измерены.'],
 ['Масштабирование и cost model','Свой benchmark','Когда построение списков дороже сэкономленного shading?','Sweep 16/128/1024 lights и разных resolutions; CPU/GPU breakdown.','Таблица с baseline, culling cost и shading cost; случай проигрыша тоже включён.']
],{hours:'25–50 ч'});

unit('temporal-lab','Temporal rendering: motion, TAA и история',4,['ibl-lab','frame-debug'],'taa',[
 ['Motion vectors','Обзор TAA: reprojection и motion','В каких единицах velocity и какой знак у previous→current?','Current/previous matrices для камеры и объекта; debug velocity view.','Статика, движение камеры и объекта проверены отдельно; resize сбрасывает history.'],
 ['Jitter и reprojection','Обзор TAA: sampling и accumulation','Как согласовать jitter, projection и history lookup?','Halton jitter, reprojection, history ping-pong и nearest baseline.','Static accumulation сходится; camera cut не оставляет старый кадр.'],
 ['Disocclusion и rejection','Обзор TAA: validation','Почему корректные motion vectors не гарантируют валидную history?','Depth/normal rejection и neighborhood clamp; debug rejected pixels.','Moving occluder, тонкая геометрия, резкий pan; видео ghosting до/после.'],
 ['HDR и прозрачность во времени','Обзор TAA: practical considerations','Как exposure и прозрачные объекты влияют на накопление?','Тест emissive, смены exposure и прозрачных частиц; зафиксируй выбранную политику.','Нет неконтролируемых HDR trails; ограничения прозрачности явно показаны.'],
 ['TAA quality/performance study','Один профильный доклад Advances + собственный baseline','Как сравнить temporal quality без удобного статичного скриншота?','Одинаковый camera path; no-AA/TAA/reference video; настройка history weight.','Стоимость, ghosting и stability оцениваются вместе; sharpening не скрывает defects.','advances']
],{});

unit('visibility','Visibility, LOD и GPU-driven rendering',4,['compute-lab','scene','frame-debug'],'hizpaper',[
 ['CPU frustum culling baseline','RTR: acceleration; RTCD: bounds','Как преобразовать bounds без ложного отбрасывания?','Planes, sphere/AABB tests; debug culled set; CPU baseline.','Compare с no-culling на границах frustum и non-uniform scales.','rtd'],
 ['LOD и geometric error','meshoptimizer: simplification и LOD','Почему расстояние само по себе не описывает экранную ошибку?','Screen-space error, hysteresis, несколько LODs; meshoptimizer разрешён как библиотека.','Нет постоянного переключения у границы; triangle counts и visual error записаны.','meshopt'],
 ['Hi-Z depth pyramid','GPU Driven Rendering: occlusion approach','Как меняется min/max reduction при reversed-Z?','Depth pyramid, conservative bounds и occlusion tests; debug mip selection.','No-cull reference не выявляет false occlusion на near-plane/edges; camera cut обработан.'],
 ['GPU culling и indirect draw','GPU Driven Rendering; backend indirect sample','Как убрать per-object CPU draw без readback count каждый кадр?','Visibility flags, compaction, indirect draws; capability fallback.','CPU submission time и GPU overhead измерены; нулевая видимость безопасна.'],
 ['Temporal visibility и latency','GPU Driven Rendering: dependencies','Почему прошлый depth ошибается при быстром движении камеры?','Conservative policy, first-frame fallback и camera cut reset.','Видео стресс-сцены; false negatives отсутствуют в заявленном наборе тестов.'],
 ['100k instances — измерение, а не обещание','Свой deterministic benchmark','Как масштабируются submission, memory и culling cost?','Sweep instance counts 1k/10k/100k либо до лимита своей GPU; фиксированная геометрия.','CPU/GPU graphs, visible count и VRAM; лимиты hardware честно указаны.']
],{hours:'30–60 ч'});

unit('render-graph','Render graph и lifetime проходов',4,['sync-lifetime','shadow-lab','temporal-lab'],'rdg',[
 ['Pass declarations и dependency DAG','Epic RDG: concepts и shader parameters','Какие reads/writes нужны для построения порядка проходов?','Свой небольшой graph: shadow→opaque→TAA→tone map; logical resources.','Topological order; ошибки cycle, read-before-write и missing producer обнаруживаются.'],
 ['Автоматические barriers','Epic RDG: resource dependencies; backend specification','Как resource usage превращается в transitions?','Сначала single queue, whole-resource tracker; ручной режим как reference.','Одинаковый кадр; validation чистая; лог generated barriers объяснён.'],
 ['Transient lifetime и aliasing','Epic RDG: transient resources','Когда два render targets могут разделять память?','Вычисли first/last use, memory timeline; aliasing опционален после корректного graph.','Оценка peak bytes; при aliasing добавлены нужные barriers; нет overlap живых ресурсов.'],
 ['Pass culling и импорт history','Epic RDG: culling и external resources','Почему unused pass иногда имеет side effect?','Пометь persistent/history/readback outputs; убери недостижимые pure passes.','History не теряется между кадрами; debug output включает нужный producer.'],
 ['Graph debugger и компромиссы','RDG Insights — как пример интерфейса','Как расследовать ошибку, скрытую автоматизацией?','Экспорт graph в DOT/JSON: order, resource lifetimes, barriers и pass timings.','По одному screenshot/graph можно объяснить путь кадра; ограничения tracker документированы.']
],{hours:'25–55 ч'});

unit('cpu-jobs','CPU performance, job system и streaming',4,['cpp-runtime','frame-debug'],'csapp',[
 ['Data layout и cache locality','CSAPP: memory hierarchy; Data-Oriented Design','Почему SoA быстрее лишь для определённых access patterns?','Обработка transforms/bounds в AoS и SoA; одинаковая работа и Release build.','Несколько размеров datasets, checksum от dead-code elimination и CPU timings.'],
 ['Job dependencies и races','OSTEP: threads, locks, condition variables','Как отличается data race от логической зависимости задач?','Parallel transform/culling jobs с dependency counter; serial reference.','Deterministic results; ThreadSanitizer на поддерживаемой платформе либо stress+review с указанными ограничениями.','ostep'],
 ['Parallel command recording','Backend samples: multithreaded command recording','Что из command state нельзя одновременно писать из двух потоков?','Per-worker pools/allocators; coarse batches; submit в контролируемом порядке.','CPU recording time до/после; GPU output совпадает; overhead на малой сцене учтён.','vksamples'],
 ['Async asset loading','Game Engine Architecture: resource management','Где IO/parse/upload/activation пересекают потоки?','Background load/decode, очередь upload и atomically published handles; cancellation.','Не рендерится half-loaded asset; missing file/cancel безопасны; frame spikes измерены.','gameengine'],
 ['Memory budget и residency','Backend memory budget docs; собственный resource manager','Что происходит при превышении выбранного VRAM budget?','Учёт bytes по категориям; eviction policy для неиспользуемых assets и fallback texture.','Стресс маленького budget: нет бесконечного роста; peak memory и stutter report.','gameengine']
],{hours:'25–50 ч'});

unit('shipping','Качество, инструменты художника и релиз',5,['render-graph','cpu-jobs'],'gameengine',[
 ['Asset contract и texture pipeline','glTF tutorial; KTX tools documentation','Что runtime поддерживает, что конвертирует offline, а что отвергает?','Список поддерживаемых glTF features; textures с mips и compression; material diagnostics.','Некорректный asset даёт actionable error; licenses и attribution сохранены.','ktx'],
 ['Animation и skinning','glTF tutorial: skins и animations','Как inverse bind matrices связаны с текущей позой?','Skeletal animation одного asset; CPU reference и GPU skinning при необходимости.','Bind pose, hierarchy и animated bounds корректны; поясни где применяется mesh transform.','gltf'],
 ['Инструменты для художника','Game Engine Architecture: tools pipeline','Может ли другой человек настроить эффект без изменения C++?','Material/lighting controls, debug views, presets и безопасные диапазоны параметров.','Человек воспроизводит визуальную задачу по инструкции; invalid input не создаёт NaN.'],
 ['Regression suite и clean release','Свои scene/image tests, CI docs по месту','Что доказывает, что репозиторий можно проверить без автора?','CI build + CPU tests; deterministic render smoke по доступности GPU; versioned settings.','Чистая машина/директория, Release binary, короткая инструкция, известные ограничения.'],
 ['Technical breakdown','Один законченный доклад Advances как образец объяснения','Какие компромиссы ты можешь защитить на code review?','Опиши архитектуру, 3 решения, 2 rejected alternatives и performance investigation.','Другой разработчик воспроизводит benchmark; результаты связаны с commits и scenes.','advances']
],{hours:'25–60 ч'});

unit('ue-rendering','Unreal Engine: rendering feature в большой кодовой базе',5,['frame-debug','compute-lab'],'rdg',[
 ['Путь кадра в UE','Epic RDG: overview; исходники Renderer модуля установленной версии','Как связаны game thread, render thread, RHI и GPU?','Найди места формирования view, opaque pass и post; сохрани frame capture.','Схема с конкретными файлами/функциями своей версии; условия лицензии исходников соблюдены.'],
 ['Global shader и RDG pass','Epic RDG: shader parameter structs и compute pass','Как передать ресурсы без скрытых lifetime assumptions?','Plugin с global compute shader и RDG input/output textures; editor controls.','Validation проходит; корректны viewport bounds, resize и разные resolutions.'],
 ['Новая feature с baseline','Epic RDG + выбранный первоисточник алгоритма','Чем самостоятельная feature отличается от изменения настройки?','Простой bilateral filter, outline либо другой bounded effect; quality toggle и debug views.','A/B capture, GPU markers, reference и известные artifacts.'],
 ['Профиль и integration review','Unreal Insights / GPU profiling документация своей версии','Как доказать, что feature укладывается в проектный бюджет?','CPU/GPU comparison, render scale sweep, отключение прохода; packaging plugin.','Standalone/packaged test; patch/инструкция без публикации закрытого engine source.'],
 ['Rendering bug report в чужом коде','Исходники установленной версии и capture','Как сократить неизвестную систему до минимального reproduction?','Воспроизведи одну rendering проблему, найди responsible pass, предложи fix или workaround.','Отчёт с steps, version, hardware, evidence и limitations; отправка наружу не требуется.']
],{track:'specialization',goal:'Рекомендуемая ветка для вакансий, где прямо указан UE. Сначала основа API и диагностики.',hours:'35–70 ч'});

unit('ray-lab','Ray tracing: CPU reference и hybrid GPU',5,['ibl-lab','compute-lab'],'pbrt',[
 ['Probability и Monte Carlo','PBRT 4e: Monte Carlo Integration','Почему оценка integral зависит от pdf и measure?','Численно оцени простой integral uniform и importance sampling с фиксированными seeds.','Mean/variance на серии запусков; ошибки pdf видны на известном analytic integral.'],
 ['BVH и traversal','PBRT: Bounding Volume Hierarchies','Как балансируют build time, traversal и memory?','CPU BVH для triangle scene; compare с brute force.','Ray misses, degenerate bounds и randomized rays совпадают; build/traversal timings отдельно.'],
 ['Path tracer, NEE и MIS','PBRT: Light Transport, Monte Carlo Integration','Почему нельзя просто сложить light sampling и BSDF sampling?','Reference tracer: diffuse/GGX, emissive lights, next-event estimation и MIS.','Image convergence, разные sample counts и energy tests; нет double counting.'],
 ['GPU acceleration structures','DXR samples либо Khronos ray tracing samples','Чем BLAS/TLAS build отличается от update и barrier?','Optional hardware path: один ray-query shadow/reflection; CPU/compute fallback при отсутствии RT.','Capabilities проверены; transforms/lifetime корректны; build cost измерен.','dxsamples'],
 ['Hybrid denoising experiment','Один доклад Advances по denoising','Какие spatial/temporal assumptions ломаются на motion?','Noisy signal + simple edge-aware spatial/temporal filter; reference frames.','Cost, bias, ghosting и disocclusion показаны в video; ограничения честно указаны.','advances']
],{track:'specialization',hours:'45–100 ч'});

unit('effects-lab','Объёмный свет, частицы и прозрачность',5,['compute-lab','temporal-lab','clustered'],'rtr',[
 ['GPU particle lifecycle','PMPP: compaction; свой compute-lab','Как spawn/update/kill работают без полного CPU readback?','Alive/dead lists, bounded spawn, indirect draw; deterministic seed.','Capacity overflow и dt spike безопасны; CPU submit почти не зависит от particle count.','cuda'],
 ['Прозрачность и порядок','RTR: transparency','Какие ограничения у sorting и weighted blended OIT?','Sorted alpha baseline и weighted blended вариант; плотные пересечения.','Показаны counterexamples, memory и GPU cost; приближение не выдано за точное решение.'],
 ['Beer–Lambert и ray marching','PBRT: Volume Scattering — transmittance','Почему opacity одного шага зависит от его длины?','Homogeneous fog, analytic transmittance reference и jittered ray march.','Изменение числа шагов не меняет среднюю плотность; указан error/cost.','pbrt'],
 ['Froxel lighting','Один профильный Advances доклад о volumetrics','Как ограничить resolution и стоимость scattering?','3D froxel grid, light injection и integration; debug slices.','Сравнение с ray-march baseline; memory budget и leakage cases.','advances'],
 ['Temporal volumetrics','Advances: temporal accumulation в выбранном докладе','Как быстро движущийся источник света ломает history?','Reprojection, rejection и camera cut reset для fog.','Видео moving light, occluder и camera cut; ghosting и timings указаны.','advances']
],{track:'specialization',hours:'35–80 ч'});

unit('screen-space','Screen-space эффекты: AO, SSR и ограничения',5,['ibl-lab','temporal-lab','frame-debug'],'rtr',[
 ['Depth reconstruction','RTR: image-space effects; собственная projection matrix','Как восстановить view-space position и не перепутать depth convention?','Reconstruct из depth с inverse projection; compare с geometry position debug view.','Ошибки измерены у near/far и при jitter; фон и reversed-Z обработаны.'],
 ['Ambient occlusion baseline','RTR: ambient occlusion','Почему AO не является полноценным непрямым освещением?','SSAO с hemisphere samples и radius в scene units; neutral material scene.','Сравнение с ray-traced AO либо CPU reference на малой сцене; нет лишнего затемнения direct light.'],
 ['Bilateral filtering и half resolution','RTR: bilateral filtering','Почему обычный blur переносит occlusion через границы объектов?','Depth/normal-aware blur, half-res AO и bilateral upsample.','Тонкие объекты и края; difference image и GPU timings для full/half resolution.'],
 ['Screen-space reflection tracing','RTR: screen-space reflections','Что невозможно восстановить из текущего depth buffer?','View-space ray march, thickness policy и confidence; IBL fallback для miss.','Offscreen, backfaces и near-edge failures показаны явно; нет NaN и бесконечного trace.'],
 ['Temporal stabilization и regression','Обзор TAA: history validation','Почему temporal фильтр может спрятать шум, но оставить неверный reflection?','History rejection для AO/SSR, debug confidence; несколько camera paths.','Видео ghosting/leaks; cost по pass; fallback работает при camera cut.','taa']
],{track:'specialization',hours:'30–65 ч'});

unit('gi-lab','Непрямое освещение: probes и GI experiment',5,['ray-lab','ibl-lab','temporal-lab'],'pbrt',[
 ['Rendering equation и decomposition','PBRT: Light Transport; RTR: global illumination','Как отделить direct, indirect diffuse и specular без двойного учёта?','Reference scene с цветным bounce; отдельные debug contributions и light toggles.','Объяснение integral, units и путей света; direct-only и reference сравнимы.'],
 ['Probe representation','RTR: spherical harmonics и light probes','Какие направления теряет низкочастотное представление?','Diffuse irradiance SH probes; constant и directional environment tests.','Сравни reconstructed irradiance и brute-force integration; записан normalization convention.','rtr'],
 ['Interpolation и light leaking','RTR: probe lighting','Почему простая trilinear interpolation светит через стены?','Регулярная probe grid, relocation/visibility heuristic; комната с тонкой стеной.','Debug probe influence; leaks и границы не скрыты tone mapping.','rtr'],
 ['Update budget и history','Один доклад Advances по dynamic diffuse GI','Как ограничить стоимость updates при движении света?','Обновляй часть probes в кадре; temporal accumulation и invalidation.','Cost/update latency sweep; moving light и camera cut не дают бесконечной history.','advances'],
 ['Paper reproduction и ablation','Выбранный первоисточник с Advances и собственный baseline','Какая часть алгоритма приносит пользу и при каких допущениях?','Один ограниченный GI метод; сравни без visibility/без history/полный вариант.','Reference images, timings, memory, limitations и повторяемый experiment; не заявляй production GI.','advances']
],{track:'specialization',hours:'45–100 ч'});

unit('interview-lab','Подготовка к собеседованиям и самостоятельной работе',5,['frame-debug','ibl-lab','sync-lifetime'],'isocpp',[
 ['C++ live debugging','Guidelines: lifetime, containers, concurrency','Как объяснить причину ошибки, а не угадать исправление?','Пять задач: dangling view, invalid iterator, move-only owner, data race и alignment.','Без подсказки: минимальный reproduction, fix и regression check на каждую.'],
 ['Математика на доске','3D Math Primer: transforms, quaternions, intersections','Можешь ли вывести нужную формулу из геометрии?','Выведи view/projection, reflection, inverse-transpose и ray/plane; поясни соглашения.','Численные примеры и граничные случаи; 20–30 минут устного объяснения.','mathprimer'],
 ['Rendering design interview','RTR: rendering pipeline и acceleration','Как спроектировать feature под ограничение времени и памяти?','Письменно спроектируй 1000 lights, stable shadows или streaming; бюджет и fallback.','Названы baseline, dependencies, риски, измерения и критерии отказа.','rtr'],
 ['Разбор незнакомого capture','Свой либо разрешённый публичный capture','Как действовать, когда ответ заранее неизвестен?','За 60–90 минут найди bottleneck или артефакт, проверь одну гипотезу.','Короткий report с evidence; границы вывода отделены от предположений.','nsight'],
 ['Portfolio review и английский','Технические README своих проектов','Может ли reviewer понять твой личный вклад за 5 минут?','README/видео на английском, 10-минутный рассказ, mock code review и CV.','Два проекта с кодом и evidence; явно отделены libraries/tutorials и собственные решения.']
],{hours:'20–45 ч'});

const OLD_CONFIG={
 audit:[0,'optional',[]],shader:[1,'optional',[]],math:[0,'core',[]],scene:[2,'core',['raster-depth','cpp-runtime']],
 sampling:[2,'core',['scene']],light:[3,'core',['sampling','shader-toolchain']],pbr:[3,'core',['light']],
 cpu:[1,'optional',['cpp-runtime']],shadow:[3,'optional',['light']],ibl:[3,'optional',['pbr']],
 scale:[4,'optional',['scene','gpu-hardware']],vulkan:[2,'optional',['shader-toolchain','raster-depth']],
 compute:[3,'optional',['sync-lifetime','gpu-hardware']],animation:[4,'optional',['scene']],
 manylights:[4,'optional',['compute','pbr']],temporal:[4,'optional',['ibl']],transport:[5,'optional',['pbr','math']],
 architecture:[4,'optional',['shadow','ibl','cpu']],craft:[5,'optional',['scale','architecture']],
 gameplay:[3,'optional',['shader','math']],release:[5,'optional',['gameplay']]
};
for(const m of LEARNING_DATA.modules){
 const cfg=OLD_CONFIG[m.id]||[5,'optional',[]];
 m.phase=cfg[0];m.track=cfg[1];m.deps=cfg[2];m.hours='По урокам; обычно 15–40 ч';
 if(m.id==='math')m.goal='База преобразований и геометрии. Если уже владеешь — пройди входное испытание с доказательством и переходи дальше.';
 if(m.id==='scene'){m.goal='Реализуй сцену и glTF в своём C++ renderer. Существующий WebGPU viewer можно использовать как reference.';m.apiGate=true;}
 if(m.id==='audit')m.title='Архив: базовая ревизия проекта';
}
LEARNING_DATA.modules.push(...V7_MODULES);
LEARNING_DATA.modules.sort((a,b)=>a.phase-b.phase||(a.track==='optional')-(b.track==='optional'));
LEARNING_DATA.modules.forEach((m,i)=>m.num=i+1);
for(const l of LESSON_DATA)if(!l.hours)l.hours='2–6 ч';

const ROADMAP_PHASES=[
 ['Основа без повторения','C++, математика и входные испытания.'],
 ['Модель GPU','Растеризация, shader toolchain, архитектура.'],
 ['Свой backend','Выбери D3D12 или Vulkan; сцена и синхронизация.'],
 ['Корректная картинка','Диагностика, PBR, IBL, тени и compute.'],
 ['Масштаб и стабильность','Temporal, visibility, clustered, graph и CPU.'],
 ['Работа и глубина','Релиз, специализация, проекты и интервью.']
];
const PLACEMENT_TESTS=[
 {id:'cpp-runtime',title:'C++: владение и память',time:'2–4 часа',tasks:['Move-only resource handle с тестами move/error/double-free; объяснить deferred destruction.','Найти invalidated vector reference и stale handle; исправить с тестом.','Передать CPU структуру в shader без layout mismatch; чистая CMake Release сборка.'],fail:'cpp-runtime'},
 {id:'math',title:'Математика: камера и геометрия',time:'2–3 часа',tasks:['Вывести view/projection и численно провести точку через все пространства.','Normal matrix при non-uniform scale; тест mirrored transform.','Ray/triangle + parallel/edge cases; экранный picking на своей сцене.'],fail:'math'},
 {id:'raster-depth',title:'Pipeline: интерполяция и depth',time:'2–4 часа',tasks:['Показать affine/perspective-correct UV на наклонном quad и вывести формулу.','Reversed-Z: float format, projection, clear, compare и near-plane stress.','Измерить prepass в сцене с overdraw и объяснить результат.'],fail:'raster-depth'},
 {id:'scene',title:'Сцена: не просто загрузить модель',time:'3–5 часов',tasks:['glTF: несколько primitives/materials, instancing и nested transforms.','Offsets/strides, index bounds и missing texture обрабатываются явно.','Показать в capture соответствие draw→primitive→material; воспроизводимая сборка.'],fail:'scene'},
 {id:'sampling',title:'Sampling, mipmaps и alpha',time:'2–3 часа',tasks:['Наклонная текстура: nearest/linear/mip/aniso в движении с объяснением LOD.','Straight/premultiplied alpha на цветных краях; корректный blend.','Проверить sRGB color и linear data textures; объяснить double gamma.'],fail:'sampling'},
 {id:'light',title:'Освещение и цвет',time:'2–3 часа',tasks:['Directional/point lights в согласованных пространствах и linear HDR.','Normal/albedo/depth debug views; attenuation и нулевое расстояние.','Exposure→tone mapping→display encoding; никаких NaN и двойной gamma.'],fail:'light'},
 {id:'pbr',title:'PBR: формулы и reference',time:'3–5 часов',tasks:['Объяснить D/F/G, roughness convention и energy split без копирования готовой функции.','Sphere grid: metal/dielectric, grazing, roughness→0; normal mapping при mirrored UV.','Сравнение с reference, NaN detection и белое окружение; ограничения модели описаны.'],fail:'pbr'}
];

const JOB_SOURCES=[
 {title:'Ubisoft: 3D Graphics Engineer / Rendering Programmer',url:'https://jobs.smartrecruiters.com/Ubisoft2/744000113760857-3d-graphics-engineer-rendering-programmer-graphics-programmer',kind:'Первичный источник работодателя',note:'C++, API, 3D math, multithreading, memory, profiling и CPU/GPU communication. Содержимое вакансии может измениться.'},
 {title:'Ubisoft Montréal: 3D Programmer — HEXE',url:'https://montreal.ubisoft.com/en/jobs/3d-programmer-assassins-creed-hexe/',kind:'Первичный источник работодателя',note:'Пример опытной роли: rendering systems, profiling, debugging и работа в существующем engine. Выпущенные игры — требование этой вакансии, не входное условие всего roadmap.'},
 {title:'Saber Interactive: Senior Render Programmer',url:'https://render.ru/ru/vacancy/2265',kind:'Вторичная публикация; senior-ориентир',note:'Опубликованы UE5, C/C++, математика, CPU/GPU/memory optimization и работа с art pipeline. Не подтверждение открытого junior найма и не гарантия актуальности вакансии.'}
];

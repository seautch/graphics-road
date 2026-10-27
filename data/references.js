/* Reviewed entry points. A verified URL does not certify every proposed reading. */
'use strict';
const KNOWLEDGE_REFERENCES = [
 ['vkguide','Vulkan Guide / vkguide.dev','https://vkguide.dev/','guide','Vulkan initialization; compute; mesh drawing; textures; GLTF scene loading',true],
 ['vktutorial','Khronos Vulkan Tutorial','https://docs.vulkan.org/tutorial/latest/','guide','Оглавление: найди механизм из карточки',false],
 ['vkspec','Vulkan Specification','https://docs.vulkan.org/spec/latest/','reference','Найди API из карточки, затем Valid Usage и synchronization requirements',false],
 ['vksync','Khronos — Synchronization Examples','https://docs.vulkan.org/guide/latest/synchronization_examples.html','reference','Compute to Compute Dependencies; сопоставь свой producer/consumer с примером',true],
 ['vksamples','Khronos Vulkan Samples','https://github.com/KhronosGroup/Vulkan-Samples','samples','Найди sample по механизму; проверь требования к features',false],
 ['vma','Vulkan Memory Allocator','https://github.com/GPUOpen-LibrariesAndSDKs/VulkanMemoryAllocator','reference','Документация: allocation, mapping и resource lifetime',false],
 ['pbrt','Physically Based Rendering: From Theory to Implementation, 4e','https://pbr-book.org/4ed/contents','book','Geometry and Transformations; Radiometry, Spectra, and Color; Reflection Models; Light Transport',true],
 ['rtr','Real-Time Rendering, 4e','https://www.realtimerendering.com/','book','Найди тему в оглавлении своего издания; номер главы не назначен',false],
 ['fcg','Fundamentals of Computer Graphics','https://www.cs.cornell.edu/~srm/fcg/','book','Проверь оглавление своего издания: rasterization, transformations, sampling',false],
 ['scratch','Scratchapixel','https://www.scratchapixel.com/','guide','Rasterization; Introduction to Shaders and BRDFs; Introduction to Acceleration Structures',true],
 ['rtweekend','Ray Tracing in One Weekend — серия','https://raytracing.github.io/','book','Выбери небольшой раздел по rays, materials или sampling из одного из трёх томов',false],
 ['rtgems','Ray Tracing Gems I / II','https://www.realtimerendering.com/raytracinggems/','book','Ищи название алгоритма в оглавлении; том и главу нужно сверить',false],
 ['gpugems','GPU Gems 1–3','https://developer.nvidia.com/gpugems/gpugems/contributors','book','Выбери главу по теме; учитывай возраст API и архитектуры',false],
 ['bos','The Book of Shaders','https://thebookofshaders.com/','guide','Shaping functions; Shapes; Matrices; Patterns; Noise; Fractional brownian motion',true],
 ['gea','Game Engine Architecture — Jason Gregory','https://www.gameenginebook.com/','book','Ищи подсистему в своём издании: ресурсы, параллелизм, animation, tools',false],
 ['csapp','Computer Systems: A Programmer’s Perspective','https://csapp.cs.cmu.edu/','book','Память, представление данных и machine code; раздел сверить со своим изданием',false],
 ['ostep','Operating Systems: Three Easy Pieces','https://pages.cs.wisc.edu/~remzi/OSTEP/','book','Concurrency или Virtualization: выбери только нужную задаче тему',false],
 ['pmpp','Programming Massively Parallel Processors','https://www.sciencedirect.com/book/9780323912310/programming-massively-parallel-processors','book','Execution model, memory, parallel patterns; точное оглавление издания не проверено',false],
 ['renderdoc','RenderDoc Documentation','https://renderdoc.org/docs/index.html','tool','Захват кадра, pipeline state и просмотр ресурсов; сайт запрещает автоматическое чтение',false],
 ['rgp','Radeon GPU Profiler','https://gpuopen.com/rgp/','tool','Документация profiler; проверь поддержку GPU',false],
 ['advances','Advances in Real-Time Rendering','https://advances.realtimerendering.com/','research','Выбери один доклад по алгоритму; выпиши baseline, допущения и ограничения',false],
 ['gltf','Khronos glTF','https://github.com/KhronosGroup/glTF','reference','Specification: meshes, accessors, materials, skins, animations',false]
].map(([id,title,url,type,where,verified])=>({id,title,url,type,where,verified}));

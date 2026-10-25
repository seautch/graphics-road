# Graphics Programmer Roadmap v7

44 блока · 233 урока · 7 входных испытаний · 8 проектов.

Цель: подготовиться к самостоятельной работе с realtime renderer на C++ и к подходящим по опыту graphics / rendering вакансиям Saber Interactive и других студий. Маршрут не обещает оффер или senior-грейд.

## Как идти

1. Открой `index.html` → «Старт». Выбери один API: D3D12 + HLSL для Windows / PIX либо Vulkan + GLSL/HLSL. Второй backend не обязателен.
2. Подтверди знакомую базу входными испытаниями. Подтверждение блока хранится отдельно от отметок отдельных уроков.
3. Иди по ядру и предпосылкам. Большинство задач делай в одном C++ renderer. Прежние WebGPU и игровые задания доступны как дополнительные.
4. Читай назначенный фрагмент, реализуй эксперимент, проверь edge cases и сохрани commit / capture / результат. Чтение не подтверждает практику.
5. Заверши основной renderer и один проект в глубину. Специализации выбирай под интерес и вакансию; не нужно выполнять все проекты.
6. Каждые 4–6 недель показывай законченную подсистему. Планируй 2–3 сессии кода в неделю, чтение под задачу и отдельную проверку. Оценки времени приблизительны.

## Источники требований

- [Ubisoft: 3D Graphics Engineer / Rendering Programmer](https://jobs.smartrecruiters.com/Ubisoft2/744000113760857-3d-graphics-engineer-rendering-programmer-graphics-programmer) — Первичный источник работодателя. C++, API, 3D math, multithreading, memory, profiling и CPU/GPU communication. Содержимое вакансии может измениться.
- [Ubisoft Montréal: 3D Programmer — HEXE](https://montreal.ubisoft.com/en/jobs/3d-programmer-assassins-creed-hexe/) — Первичный источник работодателя. Пример опытной роли: rendering systems, profiling, debugging и работа в существующем engine. Выпущенные игры — требование этой вакансии, не входное условие всего roadmap.
- [Saber Interactive: Senior Render Programmer](https://render.ru/ru/vacancy/2265) — Вторичная публикация; senior-ориентир. Опубликованы UE5, C/C++, математика, CPU/GPU/memory optimization и работа с art pipeline. Не подтверждение открытого junior найма и не гарантия актуальности вакансии.

Сверено 25.10.2026. Saber — вторичный senior-ориентир, не подтверждение актуального junior найма. Console/shipped-game опыт не заменяется учебными проектами.

## Входные испытания

Работай на собственном коде без пошагового туториала. Нужны все условия и содержательное evidence: commit/путь, команда или шаги воспроизведения, результат. Приложение хранит самооценку и не проверяет код автоматически.

### C++: владение и память · 2–4 часа

- [ ] Move-only resource handle с тестами move/error/double-free; объяснить deferred destruction.
- [ ] Найти invalidated vector reference и stale handle; исправить с тестом.
- [ ] Передать CPU структуру в shader без layout mismatch; чистая CMake Release сборка.

Пробелы → [C++ для renderer: lifetime и ресурсы](#cpp-runtime).

### Математика: камера и геометрия · 2–3 часа

- [ ] Вывести view/projection и численно провести точку через все пространства.
- [ ] Normal matrix при non-uniform scale; тест mirrored transform.
- [ ] Ray/triangle + parallel/edge cases; экранный picking на своей сцене.

Пробелы → [Координаты, камера и геометрия](#math).

### Pipeline: интерполяция и depth · 2–4 часа

- [ ] Показать affine/perspective-correct UV на наклонном quad и вывести формулу.
- [ ] Reversed-Z: float format, projection, clear, compare и near-plane stress.
- [ ] Измерить prepass в сцене с overdraw и объяснить результат.

Пробелы → [Растеризация, глубина и численная устойчивость](#raster-depth).

### Сцена: не просто загрузить модель · 3–5 часов

- [ ] glTF: несколько primitives/materials, instancing и nested transforms.
- [ ] Offsets/strides, index bounds и missing texture обрабатываются явно.
- [ ] Показать в capture соответствие draw→primitive→material; воспроизводимая сборка.

Пробелы → [Сцена: mesh, submesh, material](#scene).

### Sampling, mipmaps и alpha · 2–3 часа

- [ ] Наклонная текстура: nearest/linear/mip/aniso в движении с объяснением LOD.
- [ ] Straight/premultiplied alpha на цветных краях; корректный blend.
- [ ] Проверить sRGB color и linear data textures; объяснить double gamma.

Пробелы → [Текстуры, sampling и прозрачность](#sampling).

### Освещение и цвет · 2–3 часа

- [ ] Directional/point lights в согласованных пространствах и linear HDR.
- [ ] Normal/albedo/depth debug views; attenuation и нулевое расстояние.
- [ ] Exposure→tone mapping→display encoding; никаких NaN и двойной gamma.

Пробелы → [Свет, цвет и простое освещение](#light).

### PBR: формулы и reference · 3–5 часов

- [ ] Объяснить D/F/G, roughness convention и energy split без копирования готовой функции.
- [ ] Sphere grid: metal/dielectric, grazing, roughness→0; normal mapping при mirrored UV.
- [ ] Сравнение с reference, NaN detection и белое окружение; ограничения модели описаны.

Пробелы → [Материалы и PBR](#pbr).

## Основной маршрут: D3D12 ИЛИ Vulkan

1. **Основа без повторения.** C++, математика и входные испытания.

   [Координаты, камера и геометрия](#math) → [C++ для renderer: lifetime и ресурсы](#cpp-runtime)

2. **Модель GPU.** Растеризация, shader toolchain, архитектура.

   [Растеризация, глубина и численная устойчивость](#raster-depth) → [GPU: исполнение, память и стоимость кадра](#gpu-hardware) → [HLSL / GLSL: инструменты и контракты шейдеров](#shader-toolchain)

3. **Свой backend.** Выбери D3D12 или Vulkan; сцена и синхронизация.

   [Сцена: mesh, submesh, material](#scene) → [Текстуры, sampling и прозрачность](#sampling) → [D3D12: ресурсы, bindings и frame loop](#dx12-core) (d3d12) → [Vulkan: ресурсы, descriptors и frame loop](#vk-core) (vulkan) → [Синхронизация и lifetime без queue-idle](#sync-lifetime)

4. **Корректная картинка.** Диагностика, PBR, IBL, тени и compute.

   [Свет, цвет и простое освещение](#light) → [Материалы и PBR](#pbr) → [Разбор кадра и поиск rendering bugs](#frame-debug) → [Image-based lighting и проверка BRDF](#ibl-lab) → [Устойчивые тени и CSM](#shadow-lab) → [Compute: данные, группы и параллельные алгоритмы](#compute-lab)

5. **Масштаб и стабильность.** Temporal, visibility, clustered, graph и CPU.

   [Много источников света: tiled / clustered](#clustered) → [Temporal rendering: motion, TAA и история](#temporal-lab) → [Visibility, LOD и GPU-driven rendering](#visibility) → [Render graph и lifetime проходов](#render-graph) → [CPU performance, job system и streaming](#cpu-jobs)

6. **Работа и глубина.** Релиз, специализация, проекты и интервью.

   [Качество, инструменты художника и релиз](#shipping) → [Подготовка к собеседованиям и самостоятельной работе](#interview-lab)

Блоки внутри этапа можно изучать параллельно после их предпосылок. Если нужна предпосылка backend, требуется D3D12 **или** Vulkan согласно выбранному пути.

## Ядро и backend

<a id="math"></a>

### 01. Координаты, камера и геометрия

**Ветка:** core · **Этап:** 1 · **Объём:** По урокам; обычно 15–40 ч

База преобразований и геометрии. Если уже владеешь — пройди входное испытание с доказательством и переходи дальше.

**Предпосылки:** можно начать сразу.

#### 1. Точки, направления, системы координат · 2–6 ч

- **Понять:** Почему точка и вектор по-разному преобразуются переносом?
- **Читать:** Гл. 2–3: координаты и векторы — [3D Math Primer for Graphics and Game Development](https://gamemath.com/book/).
- **Реализовать:** Напиши 3 теста сложения/вычитания векторов, dot и cross на CPU; нарисуй axes.
- **Проверить:** Проверяешь ортогональность по dot и handedness по cross.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 2. Матрицы и порядок преобразований · 2–6 ч

- **Понять:** Почему rotate*translate и translate*rotate не дают одинаковый результат?
- **Читать:** Гл. 4–5: matrices и transforms (по теме) — [3D Math Primer for Graphics and Game Development](https://gamemath.com/book/).
- **Реализовать:** Для одного объекта переключай порядок матриц, покажи local и world axes.
- **Проверить:** Предсказываешь результат до запуска, находишь масштабирование.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 3. Homogeneous w и perspective divide · 2–6 ч

- **Понять:** Для чего clip-space координата w и почему x,y,z делят на неё?
- **Читать:** Гл. 7: Viewing, подразделы homogeneous/viewing transformations — [Fundamentals of Computer Graphics](https://www.routledge.com/Fundamentals-of-Computer-Graphics-Fifth-Edition/Shirley-Marschner/p/book/9780367505035).
- **Реализовать:** Выведи clip coordinates для трёх точек, сравни перспективу и ortho; нарисуй frustum.
- **Проверить:** Объясни отличия clip/NDC и источник near-plane clipping.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 4. Собственная камера · 2–6 ч

- **Понять:** Как получить view matrix из world transform камеры?
- **Читать:** Гл. 6: orientations; гл. 8: camera / coordinate spaces по теме издания — [3D Math Primer for Graphics and Game Development](https://gamemath.com/book/).
- **Реализовать:** Реализуй orbit + fly camera с delta-time; зафиксируй near/far и pitch clamp.
- **Проверить:** Можешь объяснить mouse → yaw/pitch → view → projection.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 5. Vertex input и интерполяция · 2–6 ч

- **Понять:** Что такое vertex attribute и varying/interpolant?
- **Читать:** Гл. 2: vertex processing и rasterization — [Real-Time Rendering](https://www.realtimerendering.com/).
- **Реализовать:** Покрась вершины RGB, передай UV, нормаль; сравни flat и perspective-correct interpolation (если поддерживается).
- **Проверить:** Вершины и середина треугольника дают ожидаемые цвета и UV.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 6. Луч, плоскость, треугольник · 2–6 ч

- **Понять:** Почему пересечение может быть отрицательным t или параллельным?
- **Читать:** Гл. 5: Ray–Plane и Ray–Triangle Tests (соответствующие подразделы) — [Real-Time Collision Detection](https://realtimecollisiondetection.net/books/rtcd/toc/).
- **Реализовать:** Напиши CPU функции intersectRayPlane и intersectRayTriangle; добавь unit tests hit/miss/edge.
- **Проверить:** Тесты включают параллельность, вырожденный треугольник и t меньше нуля.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 7. Геометрия на экране · 2–6 ч

- **Понять:** Как связаны индексы, winding и ориентация нормали?
- **Читать:** Гл. 2: Basic Geometry; гл. 9 по surface representation (по необходимости) — [Fundamentals of Computer Graphics](https://www.routledge.com/Fundamentals-of-Computer-Graphics-Fifth-Edition/Shirley-Marschner/p/book/9780367505035).
- **Реализовать:** Создай plane/cube с индексами; включи backface culling и debug wireframe.
- **Проверить:** На кубе нет пропавших граней, winding проверен.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

**Итог блока:** В viewer добавь оси, wireframe frustum, тестовый non-uniform scale и picking одного треугольника.

<a id="cpp-runtime"></a>

### 02. C++ для renderer: lifetime и ресурсы

**Ветка:** core · **Этап:** 1 · **Объём:** 15–40 ч

Управлять памятью и владением в C++ без скрытого UB; написать основу собственного C++ renderer.

**Предпосылки:** можно начать сразу.

#### 1. RAII и move-only GPU handles · 3–8 ч

- **Понять:** Кто владелец ресурса и когда его можно уничтожить?
- **Читать:** Guidelines: R.1, R.3, R.5; Effective Modern C++: move semantics — [C++ Core Guidelines](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines).
- **Реализовать:** Напиши move-only handle для mock GPU resource; проверь move, self-move, early return и ошибку создания.
- **Проверить:** Ровно одно освобождение; moved-from объект безопасен; утечки и double free отсутствуют.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 2. Контейнеры, инвалидирование и память · 3–8 ч

- **Понять:** Какая операция ломает pointer/span на данные?
- **Читать:** A Tour of C++: containers; CSAPP: memory hierarchy — [A Tour of C++](https://www.stroustrup.com/tour3toc.pdf).
- **Реализовать:** Воспроизведи инвалидирование vector; замени долгоживущие указатели индексами с generation counter.
- **Проверить:** Тест stale handle после удаления и повторного использования слота; объясни reserve и capacity.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 3. Alignment и CPU ↔ shader layout · 3–8 ч

- **Понять:** Почему sizeof CPU структуры не гарантирует совместимость с GPU?
- **Читать:** HLSL constant buffer packing / документация layout выбранного API — [DirectX Shader Compiler](https://github.com/microsoft/DirectXShaderCompiler).
- **Реализовать:** Передай mat4, float3, scalar и массив структур; добавь static_assert и debug shader с выводом полей.
- **Проверить:** Сравни все поля с ожидаемыми значениями, включая массивы и padding; укажи правила своего backend.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 4. Frame arena и ограничение аллокаций · 3–8 ч

- **Понять:** Какие временные данные живут один CPU frame, а какие — до GPU fence?
- **Читать:** Game Engine Architecture: memory management — [Game Engine Architecture](https://www.gameenginebook.com/toc.html).
- **Реализовать:** Добавь aligned linear allocator, счётчик allocations и reset только в безопасной точке.
- **Проверить:** Замерь allocations/frame до и после; переполнение обработано; GPU transient память не сбрасывается раньше fence.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 5. Сборка, ошибки, sanitizers · 3–8 ч

- **Понять:** Можно ли собрать проект на чистой машине и локализовать UB?
- **Читать:** Guidelines: E — error handling; CMake и compiler docs по месту — [C++ Core Guidelines](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines).
- **Реализовать:** CMake presets Debug/Release, warnings, AddressSanitizer где поддерживается; обработка asset/shader errors.
- **Проверить:** Чистая сборка по README; специально внесённая CPU ошибка поймана; Release не отключает обработку ошибок.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

**Итог блока:** Чистая сборка по README; специально внесённая CPU ошибка поймана; Release не отключает обработку ошибок.

<a id="raster-depth"></a>

### 04. Растеризация, глубина и численная устойчивость

**Ветка:** core · **Этап:** 2 · **Объём:** 15–40 ч

Растеризация, глубина и численная устойчивость

**Предпосылки:** [Координаты, камера и геометрия](#math).

#### 1. Perspective-correct interpolation · 3–8 ч

- **Понять:** Почему линейная интерполяция UV после perspective divide неверна?
- **Читать:** FCG: rasterization и interpolation — [Fundamentals of Computer Graphics](https://www.routledge.com/Fundamentals-of-Computer-Graphics-Fifth-Edition/Shirley-Marschner/p/book/9780367505035).
- **Реализовать:** Сравни affine UV и интерполяцию через 1/w на наклонном quad; выведи формулу.
- **Проверить:** Два треугольника дают непрерывную шахматную текстуру при движении камеры.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 2. Clipping и соглашения координат · 3–8 ч

- **Понять:** Чем clipping отличается от culling и где выполняется divide?
- **Читать:** FCG: viewing; docs clip space выбранного API — [Fundamentals of Computer Graphics](https://www.routledge.com/Fundamentals-of-Computer-Graphics-Fifth-Edition/Shirley-Marschner/p/book/9780367505035).
- **Реализовать:** Проследи вершину через world/view/clip/NDC; пересечь near plane; отладить winding.
- **Проверить:** Нет взрывов геометрии у near plane; записаны handedness, диапазон z и ориентация экрана.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 3. Depth precision и reversed-Z · 3–8 ч

- **Понять:** Почему изменение near plane влияет на precision сильнее far?
- **Читать:** RTR: depth buffering; проекция в FGED Vol. 2 — [Real-Time Rendering](https://www.realtimerendering.com/).
- **Реализовать:** Построй график ошибок float depth для standard/reversed-Z; настрой clear и compare.
- **Проверить:** Пары близких поверхностей на разных расстояниях; объясни необходимость floating point и согласованность всех depth passes.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 4. Early-Z, discard и overdraw · 3–8 ч

- **Понять:** Когда depth prepass окупается, а когда дублирует работу?
- **Читать:** RTR: GPU pipeline, depth/stencil — [Real-Time Rendering](https://www.realtimerendering.com/).
- **Реализовать:** Сравни opaque, alpha test и prepass на сцене с управляемым overdraw.
- **Проверить:** GPU timing по проходам; вывод для двух сцен, включая случай, где prepass замедляет.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 5. Численная устойчивость геометрии · 3–8 ч

- **Понять:** Почему универсальный epsilon не работает при любом масштабе?
- **Читать:** RTCD: closest points и intersection tests — [Real-Time Collision Detection](https://realtimecollisiondetection.net/books/rtcd/toc/).
- **Реализовать:** Тесты ray/AABB/triangle для параллельных лучей, границ, нулевых размеров и разных масштабов.
- **Проверить:** Нет NaN; явно описаны допустимые диапазоны и политика граничных попаданий.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

**Итог блока:** Нет NaN; явно описаны допустимые диапазоны и политика граничных попаданий.

<a id="gpu-hardware"></a>

### 05. GPU: исполнение, память и стоимость кадра

**Ветка:** core · **Этап:** 2 · **Объём:** 20–40 ч

GPU: исполнение, память и стоимость кадра

**Предпосылки:** [C++ для renderer: lifetime и ресурсы](#cpp-runtime).

#### 1. SIMD/SIMT, wave и divergence · 3–8 ч

- **Понять:** Почему разные ветки внутри wave могут стоить дороже?
- **Читать:** RTR: GPU architecture; PMPP: execution model — [Real-Time Rendering](https://www.realtimerendering.com/).
- **Реализовать:** Сравни uniform и divergent branch на одинаковом объёме вычислений; не оптимизируй по одному FPS.
- **Проверить:** Сохрани GPU timing и входные данные; объясни, где compiler мог убрать ветку.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 2. Bandwidth, cache и coalescing · 3–8 ч

- **Понять:** Почему соседние threads должны читать соседние адреса?
- **Читать:** PMPP: global memory access — [Programming Massively Parallel Processors](https://shop.elsevier.com/books/programming-massively-parallel-processors/hwu/978-0-323-91231-0).
- **Реализовать:** Compute copy/transposition с последовательным и strided доступом, несколько размеров buffers.
- **Проверить:** Таблица GB/s и latency; объём данных превышает cache; readback исключён из GPU времени.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 3. Registers, occupancy и latency hiding · 3–8 ч

- **Понять:** Почему максимальная occupancy не всегда даёт минимальное время?
- **Читать:** AMD: occupancy and resource usage — [AMD: occupancy and resource usage](https://gpuopen.com/learn/optimizing-gpu-occupancy-resource-usage-large-thread-groups/).
- **Реализовать:** Измени размер thread group и pressure временных переменных в одном kernel.
- **Проверить:** Не менее трёх вариантов; profiler при наличии поддержки, иначе честно ограничь вывод timing.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 4. Текстурные блоки, ROP и форматы · 3–8 ч

- **Понять:** Когда bottleneck — bandwidth, fill rate или ALU?
- **Читать:** RTR: GPU architecture и texture pipeline — [Real-Time Rendering](https://www.realtimerendering.com/).
- **Реализовать:** Меняй resolution, sample count, формат HDR и сложность shader по одному фактору.
- **Проверить:** Построй таблицу sensitivity; сформулируй и проверь две гипотезы.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 5. CPU submission и GPU queue · 3–8 ч

- **Понять:** Почему CPU frame time, GPU time и latency — разные величины?
- **Читать:** Game Engine Architecture: rendering architecture — [Game Engine Architecture](https://www.gameenginebook.com/toc.html).
- **Реализовать:** Нарисуй timeline для 1/2/3 frames in flight и замерь CPU submit и GPU timestamps.
- **Проверить:** Нет сложения перекрывающихся CPU/GPU времён; указаны VSync и latency ограничения.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

**Итог блока:** Нет сложения перекрывающихся CPU/GPU времён; указаны VSync и latency ограничения.

<a id="shader-toolchain"></a>

### 06. HLSL / GLSL: инструменты и контракты шейдеров

**Ветка:** core · **Этап:** 2 · **Объём:** 15–40 ч

HLSL / GLSL: инструменты и контракты шейдеров

**Предпосылки:** [C++ для renderer: lifetime и ресурсы](#cpp-runtime), [Координаты, камера и геометрия](#math).

#### 1. Компиляция и shader interface · 3–8 ч

- **Понять:** Что compiler проверяет до создания pipeline?
- **Читать:** DXC README: compilation, DXIL и SPIR-V — [DirectX Shader Compiler](https://github.com/microsoft/DirectXShaderCompiler).
- **Реализовать:** CLI-компиляция vertex/fragment/compute, сохранение diagnostics и debug symbols.
- **Проверить:** Сломанный include или тип даёт понятную ошибку и не разрушает последний рабочий pipeline.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 2. Packing и binding contract · 3–8 ч

- **Понять:** Как обнаружить несовпадение CPU binding и shader declaration?
- **Читать:** DXC: shader resources; backend docs по binding — [DirectX Shader Compiler](https://github.com/microsoft/DirectXShaderCompiler).
- **Реализовать:** Опиши binding schema, проверь отражённые bindings или явно валидируй интерфейс.
- **Проверить:** Неверный slot/type обнаруживается до draw; сравни matrix major convention.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 3. Derivatives и implicit LOD · 3–8 ч

- **Понять:** Почему ddx/ddy внутри divergent control flow требуют осторожности?
- **Читать:** RTR: texture filtering, derivatives — [Real-Time Rendering](https://www.realtimerendering.com/).
- **Реализовать:** Визуализируй footprint, implicit LOD и explicit gradients на наклонной поверхности.
- **Проверить:** Сравни мерцание в движении; объясни quad execution и корректное место вычисления derivatives.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 4. Shader variants и hot reload · 3–8 ч

- **Понять:** Почему все комбинации defines быстро становятся проблемой?
- **Читать:** MiniEngine: shader/pipeline organization — [DirectX Graphics Samples / MiniEngine](https://github.com/microsoft/DirectX-Graphics-Samples).
- **Реализовать:** Ключ variant из feature flags; cache по source+include+defines; безопасная замена pipeline.
- **Проверить:** Изменение include инвалидирует cache; compile error сохраняет рабочую версию.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 5. Числа, NaN и precision · 3–8 ч

- **Понять:** Где допустимо уменьшить precision, а где возникает нестабильность?
- **Читать:** Filament: precision; HLSL numeric types — [Filament: Physically Based Rendering](https://google.github.io/filament/Filament.md.html).
- **Реализовать:** Добавь NaN/Inf debug view; проверь roughness→0, normalization нулевого вектора и HDR диапазон.
- **Проверить:** Нет NaN на edge cases; ограничения half/min16float привязаны к hardware и compiler.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

**Итог блока:** Нет NaN на edge cases; ограничения half/min16float привязаны к hardware и compiler.

<a id="scene"></a>

### 09. Сцена: mesh, submesh, material

**Ветка:** core · **Этап:** 3 · **Объём:** По урокам; обычно 15–40 ч

Реализуй сцену и glTF в своём C++ renderer. Существующий WebGPU viewer можно использовать как reference.

**Предпосылки:** [Растеризация, глубина и численная устойчивость](#raster-depth), [C++ для renderer: lifetime и ресурсы](#cpp-runtime); выбранный D3D12 / Vulkan backend.

#### 1. Vertex и index buffers без загадок · 2–6 ч

- **Понять:** Где лежат байты и как читать stride, offsets и count?
- **Читать:** glTF Tutorial: Buffers, Buffer Views, Accessors — [Khronos glTF Tutorial](https://github.khronos.org/glTF-Tutorials/gltfTutorial/).
- **Реализовать:** Загрузи интерливный и раздельный layout вершины; нарисуй indexed cube.
- **Проверить:** Проверены offsets, память не читается за пределами массива.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 2. Mesh против submesh · 2–6 ч

- **Понять:** Почему material может быть у primitive, а не у mesh целиком?
- **Читать:** glTF Tutorial: Meshes, Mesh Primitives — [Khronos glTF Tutorial](https://github.khronos.org/glTF-Tutorials/gltfTutorial/).
- **Реализовать:** Сделай mesh с двумя submeshes / primitives, каждому назначь отдельный material и index range.
- **Проверить:** Оба участка рисуются одним vertex buffer и корректными index offsets.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 3. Material как данные, а не код · 2–6 ч

- **Понять:** Что принадлежит материалу, а что pipeline state?
- **Читать:** glTF Tutorial: Materials (overview) — [Khronos glTF Tutorial](https://github.khronos.org/glTF-Tutorials/gltfTutorial/).
- **Реализовать:** Создай структуры MaterialData и MeshPrimitive; переключай параметры без if по имени модели.
- **Проверить:** Два объекта используют один mesh и разные материалы.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 4. Transform hierarchy · 2–6 ч

- **Понять:** Как получить world transform ребенка?
- **Читать:** glTF Tutorial: Nodes and Scenes — [Khronos glTF Tutorial](https://github.khronos.org/glTF-Tutorials/gltfTutorial/).
- **Реализовать:** Реализуй parent/local/world transforms (необязательно полноценный ECS), два уровня вложенности.
- **Проверить:** При движении родителя дети движутся, локальные transform не портятся.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 5. glTF: первая настоящая сцена · 2–6 ч

- **Понять:** Почему glTF scene отличается от списка мешей?
- **Читать:** glTF Tutorial: Introduction, Buffers, Meshes, Nodes and Scenes — [Khronos glTF Tutorial](https://github.khronos.org/glTF-Tutorials/gltfTutorial/).
- **Реализовать:** Загрузи glTF 2.0 через существующий parser; поддержи 1–2 materials и простую иерархию.
- **Проверить:** Одна сцена с несколькими meshes и nodes выглядит правильно.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 6. Мини-цель: сцена из повторяемых объектов · 2–6 ч

- **Понять:** Как не копировать буферы при 100 объектах?
- **Читать:** Собственные заметки о mesh, instance, material.
- **Реализовать:** Размести 100 объектов, сославшись на один mesh и разные world transforms; пока можно без instancing.
- **Проверить:** Количество GPU ресурсов не растёт линейно с числом объектов.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

**Итог блока:** Один mesh с двумя материалами; два экземпляра общей геометрии; parent-child transform. Загрузчик должен корректно сообщать об отсутствующем ресурсе.

<a id="sampling"></a>

### 10. Текстуры, sampling и прозрачность

**Ветка:** core · **Этап:** 3 · **Объём:** По урокам; обычно 15–40 ч

Понимать откуда появляются aliasing, shimmering и ошибки смешивания.

**Предпосылки:** [Сцена: mesh, submesh, material](#scene).

#### 1. Изображение и texel · 2–6 ч

- **Понять:** Чем normalized UV отличается от texel coordinate?
- **Читать:** Гл. 10: Texture Mapping (вводные подразделы) — [Fundamentals of Computer Graphics](https://www.routledge.com/Fundamentals-of-Computer-Graphics-Fifth-Edition/Shirley-Marschner/p/book/9780367505035).
- **Реализовать:** Нарисуй checker texture, переверни V, покажи UV debug.
- **Проверить:** Чекер не смещён и не зеркалит из-за неверной convention.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 2. Sampler и фильтрация · 2–6 ч

- **Понять:** Почему nearest и linear дают разные артефакты?
- **Читать:** Гл. 6: Texturing, texture filtering — [Real-Time Rendering](https://www.realtimerendering.com/).
- **Реализовать:** Добавь nearest/linear переключатель на наклонённую плоскость.
- **Проверить:** Сравни одинаковый ракурс на двух фильтрах.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 3. Mipmaps и производные · 2–6 ч

- **Понять:** Откуда GPU берёт LOD и зачем derivatives?
- **Читать:** Гл. 6: Mipmapping and anisotropic filtering — [Real-Time Rendering](https://www.realtimerendering.com/).
- **Реализовать:** Добавь mipmap цепочку; сравни при удалении и под скользящим углом.
- **Проверить:** На дальнем объекте меньше shimmering; поясни компромисс качества и памяти.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 4. Цвет: sRGB против linear · 2–6 ч

- **Понять:** Почему цвет текстуры и нормали декодируются по-разному?
- **Читать:** Гл. 8: Light and Color, раздел об encoding/gamma — [Real-Time Rendering](https://www.realtimerendering.com/).
- **Реализовать:** Сделай экран сравнения неправильного/правильного linear mixing двух sRGB цветов.
- **Проверить:** Средний по линейной энергии цвет отличается от наивного RGB average.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 5. Alpha blending и порядок · 2–6 ч

- **Понять:** Почему прозрачность зависит от порядка?
- **Читать:** Гл. 5: Shading Basics / blending и transparency по оглавлению — [Real-Time Rendering](https://www.realtimerendering.com/).
- **Реализовать:** Нарисуй два полупрозрачных квадрата в разном порядке, включи premultiplied alpha в отдельном тесте.
- **Проверить:** Объясни фактор SrcAlpha/OneMinusSrcAlpha и отличие straight/premultiplied.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 6. Тестовая сцена для aliasing · 2–6 ч

- **Понять:** Чем spatial aliasing отличается от MSAA edge smoothing?
- **Читать:** Гл. 3: Raster Images / Sampling and Aliasing — [Fundamentals of Computer Graphics](https://www.routledge.com/Fundamentals-of-Computer-Graphics-Fifth-Edition/Shirley-Marschner/p/book/9780367505035).
- **Реализовать:** Покажи наклонную сетку: no mip / mip / MSAA; сохрани три кадра.
- **Проверить:** Можешь назвать, какой артефакт устраняет каждый метод.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

**Итог блока:** Сцена с наклонной шахматной плоскостью: nearest/linear/mips; отдельный тест straight/premultiplied alpha.

<a id="dx12-core"></a>

### 11. D3D12: ресурсы, bindings и frame loop

**Ветка:** d3d12 · **Этап:** 3 · **Объём:** 15–40 ч

Самостоятельный D3D12 backend для будущих экспериментов. Один API достаточно для основного маршрута.

**Предпосылки:** [GPU: исполнение, память и стоимость кадра](#gpu-hardware), [HLSL / GLSL: инструменты и контракты шейдеров](#shader-toolchain), [Растеризация, глубина и численная устойчивость](#raster-depth).

#### 1. Device, debug layer и swapchain · 3–8 ч

- **Понять:** Что относится к device, а что пересоздаётся при resize?
- **Читать:** Samples: HelloWindow, HelloTriangle; debug layer — [DirectX Graphics Samples / MiniEngine](https://github.com/microsoft/DirectX-Graphics-Samples).
- **Реализовать:** Адаптер, device, queue, swapchain, RTV; debug layer и имена объектов. Треугольник только как smoke test.
- **Проверить:** Resize/minimize/restore не падают; debug layer чистый; выбранный adapter записан.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 2. Command allocators и frame contexts · 3–8 ч

- **Понять:** Почему allocator нельзя reset до завершения GPU работы?
- **Читать:** Samples: HelloFrameBuffering — [DirectX Graphics Samples / MiniEngine](https://github.com/microsoft/DirectX-Graphics-Samples).
- **Реализовать:** Два или три frame contexts: command allocator, fence value, per-frame upload data.
- **Проверить:** Длительный GPU workload не повреждает данные; CPU не ждёт всю очередь каждый кадр.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 3. Heaps, upload и texture footprints · 3–8 ч

- **Понять:** Чем upload/default/readback heaps отличаются по назначению?
- **Читать:** Samples: HelloTexture; D3D12 resource docs — [DirectX Graphics Samples / MiniEngine](https://github.com/microsoft/DirectX-Graphics-Samples).
- **Реализовать:** Загрузи indexed mesh и mip texture; учти row pitch, placement alignment и staging lifetime.
- **Проверить:** Текстура нестандартного размера отображается корректно; staging освобождается после fence.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 4. Root signature и descriptors · 3–8 ч

- **Понять:** Чем CPU descriptor handle отличается от GPU handle?
- **Читать:** Samples: HelloTexture; MiniEngine descriptors — [DirectX Graphics Samples / MiniEngine](https://github.com/microsoft/DirectX-Graphics-Samples).
- **Реализовать:** CBV/SRV/UAV heap, sampler, descriptor table и root constants; несколько материалов.
- **Проверить:** Никаких stale descriptors при смене материала и нескольких frames in flight.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 5. PSO, depth и HDR target · 3–8 ч

- **Понять:** Какие состояния входят в PSO и как не создавать его на каждом draw?
- **Читать:** Samples: HelloBundles / MiniEngine pipeline states — [DirectX Graphics Samples / MiniEngine](https://github.com/microsoft/DirectX-Graphics-Samples).
- **Реализовать:** Indexed scene, depth attachment и HDR offscreen target; PSO cache с явным ключом.
- **Проверить:** Два материала и прозрачный pass; отсутствует создание PSO в стабильном кадре.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

**Итог блока:** Два материала и прозрачный pass; отсутствует создание PSO в стабильном кадре.

<a id="vk-core"></a>

### 12. Vulkan: ресурсы, descriptors и frame loop

**Ветка:** vulkan · **Этап:** 3 · **Объём:** 15–40 ч

Самостоятельный Vulkan backend; второй API можно отложить до готового портфолио.

**Предпосылки:** [GPU: исполнение, память и стоимость кадра](#gpu-hardware), [HLSL / GLSL: инструменты и контракты шейдеров](#shader-toolchain), [Растеризация, глубина и численная устойчивость](#raster-depth).

#### 1. Capabilities и корректный frame loop · 3–8 ч

- **Понять:** Почему нельзя предполагать наличие feature или формата?
- **Читать:** vkguide: initialization, swapchain, drawing — [vkguide](https://vkguide.dev/).
- **Реализовать:** Instance, device, queues, swapchain; validation/debug labels; таблица требуемых features.
- **Проверить:** Resize/minimize/out-of-date обработаны; required features проверяются с понятной ошибкой.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 2. Command pools и frame contexts · 3–8 ч

- **Понять:** Почему frame index и swapchain image index — разные индексы?
- **Читать:** vkguide: command buffers и synchronization — [vkguide](https://vkguide.dev/).
- **Реализовать:** Per-frame command pool, fence, acquire/present synchronization; переиспользование объектов только после завершения.
- **Проверить:** Стресс: resize и медленный GPU; жизненный цикл present semaphores обоснован.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 3. Memory и staging · 3–8 ч

- **Понять:** Что значит host coherent и когда нужен flush/invalidate?
- **Читать:** Vulkan Guide: memory allocation; vkguide buffers — [vkguide](https://vkguide.dev/).
- **Реализовать:** Device-local mesh и texture upload; VMA допустим после объяснения memory type selection.
- **Проверить:** Данные совпадают с CPU; staging lifetime привязан к fence; учтён non-coherent atom size.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 4. Descriptor sets и pipeline layout · 3–8 ч

- **Понять:** Как lifetime descriptor pool связан с незавершёнными submissions?
- **Читать:** vkguide: descriptors, textures — [vkguide](https://vkguide.dev/).
- **Реализовать:** Несколько материалов и per-frame uniforms; документируй layout, ranges и alignment.
- **Проверить:** Нет изменения descriptors, ещё читаемых GPU; validation не выдаёт предупреждений.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 5. Dynamic rendering и pipelines · 3–8 ч

- **Понять:** Что dynamic rendering упрощает, а что оставляет приложению?
- **Читать:** Khronos Vulkan Samples: dynamic rendering — [Khronos Vulkan Samples](https://github.com/KhronosGroup/Vulkan-Samples).
- **Реализовать:** Indexed scene, depth и HDR target; PSO cache; required features проверены.
- **Проверить:** Форматы attachments согласованы с pipeline; transitions и dependencies заданы явно.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

**Итог блока:** Форматы attachments согласованы с pipeline; transitions и dependencies заданы явно.

<a id="sync-lifetime"></a>

### 13. Синхронизация и lifetime без queue-idle

**Ветка:** core · **Этап:** 3 · **Объём:** 24–48 ч

Синхронизация и lifetime без queue-idle

**Предпосылки:** можно начать сразу; выбранный D3D12 / Vulkan backend.

#### 1. RAW, WAR и WAW · 3–8 ч

- **Понять:** Чем execution dependency отличается от memory visibility?
- **Читать:** Khronos synchronization examples; D3D12 resource barriers — [Khronos: Synchronization Examples](https://docs.vulkan.org/guide/latest/synchronization_examples.html).
- **Реализовать:** Для upload→vertex, compute→indirect, depth→sample выпиши producer, consumer и hazard.
- **Проверить:** Таблица стадий/access/layout либо D3D12 states; объясни каждую dependency без ALL_COMMANDS везде.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 2. Barriers выбранного backend · 3–8 ч

- **Понять:** Почему resource transition и ожидание CPU не взаимозаменяемы?
- **Читать:** Vulkan synchronization2 ИЛИ D3D12 transition/UAV barriers — [Khronos: Synchronization Examples](https://docs.vulkan.org/guide/latest/synchronization_examples.html).
- **Реализовать:** Реализуй compute write→graphics read и HDR render target→post sample; намеренно убери barrier.
- **Проверить:** Ошибка воспроизводится в контролируемом тесте, где возможно; валидный вариант проходит validation и стресс.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 3. Fences, semaphores и deferred destruction · 3–8 ч

- **Понять:** Когда безопасно удалить ресурс после последнего CPU использования?
- **Читать:** Backend docs: queues и synchronization — [Khronos: Synchronization Examples](https://docs.vulkan.org/guide/latest/synchronization_examples.html).
- **Реализовать:** Retirement queue по fence/timeline; удаление mesh/texture во время рендеринга.
- **Проверить:** 1000 циклов create/delete при нескольких frames in flight без use-after-free и роста памяти.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 4. Upload ring и backpressure · 3–8 ч

- **Понять:** Как ring allocator отличает занятый диапазон от свободного?
- **Читать:** D3D12 HelloFrameBuffering / vkguide frame overlap — [Khronos: Synchronization Examples](https://docs.vulkan.org/guide/latest/synchronization_examples.html).
- **Реализовать:** Upload ring с alignment и fence retirement; стратегия при исчерпании.
- **Проверить:** Стресс маленького ring: нет overwrite; ждёшь нужный fence, а не idle всего device.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 5. Multi-queue как измеряемая опция · 3–8 ч

- **Понять:** Когда async compute не ускоряет frame?
- **Читать:** Khronos synchronization examples: queue transfers; D3D12 queues — [Khronos: Synchronization Examples](https://docs.vulkan.org/guide/latest/synchronization_examples.html).
- **Реализовать:** Сначала один queue; затем отдельный compute/copy при поддержке, с явными waits и ownership.
- **Проверить:** Timeline до/после; negative result допустим; отсутствие второго queue не блокирует core.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 6. Диагностика device loss · 3–8 ч

- **Понять:** Какие данные собрать, если GPU перестал отвечать?
- **Читать:** PIX / Vulkan validation docs, DRED для D3D12 — [PIX on Windows](https://devblogs.microsoft.com/pix/documentation/).
- **Реализовать:** Debug names, breadcrumbs/markers; документированный путь сбора device-loss diagnostics.
- **Проверить:** Пример отчёта с adapter/driver, последними passes и воспроизведением; не провоцируй бесконтрольный TDR.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

**Итог блока:** Пример отчёта с adapter/driver, последними passes и воспроизведением; не провоцируй бесконтрольный TDR.

<a id="light"></a>

### 15. Свет, цвет и простое освещение

**Ветка:** core · **Этап:** 4 · **Объём:** По урокам; обычно 15–40 ч

Получать предсказуемый свет в linear space и понимать единицы величин.

**Предпосылки:** [Текстуры, sampling и прозрачность](#sampling), [HLSL / GLSL: инструменты и контракты шейдеров](#shader-toolchain).

#### 1. Нормаль и Lambert · 2–6 ч

- **Понять:** Почему N·L ограничен нулём и все направления должны быть в одном пространстве?
- **Читать:** Гл. 5: Surface Shading, базовая часть — [Fundamentals of Computer Graphics](https://www.routledge.com/Fundamentals-of-Computer-Graphics-Fifth-Edition/Shirley-Marschner/p/book/9780367505035).
- **Реализовать:** Добавь directional light Lambert к модели, debug view нормалей.
- **Проверить:** На обратной стороне diffuse равен нулю; вращение модели работает.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 2. Blinn–Phong · 2–6 ч

- **Понять:** Откуда берётся half vector и что меняет shininess?
- **Читать:** Гл. 5: Local Illumination (классические модели обзорно) — [Real-Time Rendering](https://www.realtimerendering.com/).
- **Реализовать:** Добавь specular и слайдер shininess; сравни 3 случая угла наблюдения.
- **Проверить:** Можешь показать бликующий участок и исключить отрицательные dot.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 3. Debug views вместо гадания · 2–6 ч

- **Понять:** Что полезно визуализировать при неправильном освещении?
- **Читать:** Свои структуры vertex/material + API debug labels.
- **Реализовать:** Добавь modes: normals, UV, roughness/metallic placeholders, depth.
- **Проверить:** Все 4 режима работают на проблемной модели.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 4. Линейное освещение и output encoding · 2–6 ч

- **Понять:** Почему освещение считается до tonemapping в linear-space?
- **Читать:** Гл. 8: Light and Color, surface to display — [Real-Time Rendering](https://www.realtimerendering.com/).
- **Реализовать:** На одной сцене сравни гамма-неправильный и линейный Lambert + sRGB output.
- **Проверить:** Называешь точное место декодирования и кодирования.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 5. Освещение сцены 2.5D · 2–6 ч

- **Понять:** Как освещение подчёркивает лазеры без лишних эффектов?
- **Читать:** Повтор Lambert и debug views на своей сцене.
- **Реализовать:** Поставь 3D зеркало и башню на тёмную сцену; направленный и point light в одной системе.
- **Проверить:** На тёмной сцене читаются формы и виден направленный свет.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 6. Введение в photometry · 2–6 ч

- **Понять:** Чем интенсивность источника отличается от radiance и отражения поверхности?
- **Читать:** §4.1–4.3: радиометрические величины (выборочно) — [Physically Based Rendering](https://www.pbr-book.org/4ed/contents).
- **Реализовать:** Сделай шпаргалку единиц и рассуждение об energy conservation для diffuse.
- **Проверить:** Объясняешь почему удвоение экспозиции не равно удвоению albedo.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

**Итог блока:** Directional + point light; normal/albedo/depth debug views; HDR-буфер и явное преобразование для вывода.

<a id="pbr"></a>

### 16. Материалы и PBR

**Ветка:** core · **Этап:** 4 · **Объём:** По урокам; обычно 15–40 ч

Связать BRDF с шероховатостью, металличностью, нормалями и наблюдаемым видом материала.

**Предпосылки:** [Свет, цвет и простое освещение](#light).

#### 1. BRDF и Fresnel до кода · 2–6 ч

- **Понять:** Почему отражение зависит от угла и roughness?
- **Читать:** Гл. 9: Physically Based Shading, подразделы BRDF/Fresnel — [Real-Time Rendering](https://www.realtimerendering.com/).
- **Реализовать:** На бумаге объясни f_r, N·L и F0; сделай Schlick Fresnel график.
- **Проверить:** Верно предсказываешь поведение dielectric и metal на краях.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 2. GGX: D, F, G · 2–6 ч

- **Понять:** Как D, F, G вместе формируют отражённый свет?
- **Читать:** Filament: Material System → Specular BRDF / Microfacet — [Filament: Physically Based Rendering](https://google.github.io/filament/Filament.md.html).
- **Реализовать:** Реализуй GGX+Smith+Schlick в WGSL для одного directional light.
- **Проверить:** При low roughness блик узкий, NaN/inf нет при N·V близком к 0.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 3. Normal matrix для неравномерного масштаба · 2–6 ч

- **Понять:** Почему обычная model matrix неверна для normals?
- **Читать:** Раздел Normal Transformations / Tangent Space (см. оглавление издания) — [Foundations of Game Engine Development, Vol. 2](https://foundationsofgameenginedev.com/).
- **Реализовать:** Создай растянутый объект, выведи normals до/после inverse-transpose.
- **Проверить:** На наклонных гранях освещение не ломается при nonuniform scale.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 4. Normal maps и TBN · 2–6 ч

- **Понять:** Как переносить tangent-space normal в world?
- **Читать:** Раздел Normal Mapping and Tangent Space — [Foundations of Game Engine Development, Vol. 2](https://foundationsofgameenginedev.com/).
- **Реализовать:** Подключи normal map; проверь TBN, handedness и flipped green на тестовом объекте.
- **Проверить:** Источник света вращается, нормаль ведёт себя согласованно.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 5. Материалы glTF metallic/roughness · 2–6 ч

- **Понять:** Какие каналы и пространства у baseColor/metallic/roughness?
- **Читать:** glTF Tutorial: PBR Materials, Metallic Roughness — [Khronos glTF Tutorial](https://github.khronos.org/glTF-Tutorials/gltfTutorial/).
- **Реализовать:** Подключи glTF PBR материалы, 4 тестовые сферы 0/1 metallic и 0.1/0.8 roughness.
- **Проверить:** Тестовая сетка материалов различима, все текстуры декодируются правильно.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 6. Ошибки энергосохранения · 2–6 ч

- **Понять:** Почему нельзя просто сложить две произвольные яркости?
- **Читать:** Filament: Diffuse BRDF + Energy Conservation — [Filament: Physically Based Rendering](https://google.github.io/filament/Filament.md.html).
- **Реализовать:** Сравни твой PBR c простым Lambert/Phong, оцени изменение при grazing angle.
- **Проверить:** Никаких выбросов и неверного освещения с тыльной стороны.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

**Итог блока:** Матрица сфер по roughness/metallic, normal mapping и раздельный просмотр diffuse/specular.

<a id="frame-debug"></a>

### 17. Разбор кадра и поиск rendering bugs

**Ветка:** core · **Этап:** 4 · **Объём:** 15–40 ч

Разбор кадра и поиск rendering bugs

**Предпосылки:** [Синхронизация и lifetime без queue-idle](#sync-lifetime), [Сцена: mesh, submesh, material](#scene).

#### 1. Захват и история одного pixel · 3–8 ч

- **Понять:** Как доказать, какой draw испортил pixel?
- **Читать:** RenderDoc либо PIX: frame capture; Nsight frame debugger — [NVIDIA Nsight Graphics](https://developer.nvidia.com/nsight-graphics).
- **Реализовать:** Захвати свой кадр; найди mesh, bindings, attachments, pipeline state и последний writer.
- **Проверить:** Отчёт с event IDs и скриншотами входа/выхода одного pass.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 2. Пять намеренно сломанных сцен · 3–8 ч

- **Понять:** Как отделить проблему geometry, state, material и presentation?
- **Читать:** Свой renderer + API validation — [NVIDIA Nsight Graphics](https://developer.nvidia.com/nsight-graphics).
- **Реализовать:** Сломай winding, matrix transpose, sRGB, depth compare и binding; затем локализуй.
- **Проверить:** Пять коротких bug reports: симптом → гипотеза → evidence → исправление.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 3. GPU timestamps и корректная статистика · 3–8 ч

- **Понять:** Почему debug capture нельзя считать эталонным benchmark?
- **Читать:** PIX/Nsight: timing captures — [NVIDIA Nsight Graphics](https://developer.nvidia.com/nsight-graphics).
- **Реализовать:** Метки по passes, warm-up, Release, фиксированный camera path и CSV.
- **Проверить:** Median и p95 из нескольких прогонов; указаны GPU, driver, resolution, VSync и settings.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 4. CPU bottleneck или GPU bottleneck · 3–8 ч

- **Понять:** Что изменится при уменьшении resolution и draw count?
- **Читать:** Tracy: zones; Nsight GPU Trace — [Tracy Profiler](https://github.com/wolfpld/tracy).
- **Реализовать:** Два контролируемых workload: submission-heavy и pixel-heavy; независимые perturbation tests.
- **Проверить:** Profiler подтверждает гипотезу; GPU timestamp не подменён CPU wall clock.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 5. Регрессии и reference frames · 3–8 ч

- **Понять:** Как отличить ожидаемое изменение от сломанного рендера?
- **Читать:** Свой image comparison harness — [NVIDIA Nsight Graphics](https://developer.nvidia.com/nsight-graphics).
- **Реализовать:** Фиксированный seed/camera, screenshot capture, difference image и допустимые tolerances.
- **Проверить:** Ловится внесённая ошибка; temporal/random cases имеют отдельную политику сравнения.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

**Итог блока:** Ловится внесённая ошибка; temporal/random cases имеют отдельную политику сравнения.

<a id="ibl-lab"></a>

### 18. Image-based lighting и проверка BRDF

**Ветка:** core · **Этап:** 4 · **Объём:** 15–40 ч

Image-based lighting и проверка BRDF

**Предпосылки:** [Материалы и PBR](#pbr).

#### 1. BRDF: энергия и граничные случаи · 3–8 ч

- **Понять:** Почему specular + diffuse могут вернуть больше падающей энергии?
- **Читать:** Filament: material system; RTR: physically based shading — [Filament: Physically Based Rendering](https://google.github.io/filament/Filament.md.html).
- **Реализовать:** White furnace test; roughness sweep; clamp только с объяснением, без маскировки NaN.
- **Проверить:** График/кадры для dielectric и metal; ограничения single scattering задокументированы.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 2. Diffuse irradiance · 3–8 ч

- **Понять:** Чем radiance cubemap отличается от irradiance?
- **Читать:** Filament: image based lighting — [Filament: Physically Based Rendering](https://google.github.io/filament/Filament.md.html).
- **Реализовать:** Интегрируй diffuse irradiance cubemap или SH; единая orientation конвенция.
- **Проверить:** Constant environment даёт ожидаемый ответ; нет швов и перевёрнутых граней.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 3. Specular prefilter и BRDF LUT · 3–8 ч

- **Понять:** Какие приближения делает split-sum?
- **Читать:** Filament: specular IBL — [Filament: Physically Based Rendering](https://google.github.io/filament/Filament.md.html).
- **Реализовать:** GGX prefiltered mips + 2D integration LUT; сохраняемый offline bake.
- **Проверить:** Sphere grid по roughness/metallic; compare с многосэмпловым reference при том же environment.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 4. Normal maps и material validation · 3–8 ч

- **Понять:** Как tangent handedness и color space портят материалы?
- **Читать:** Khronos glTF: materials; Filament normal mapping — [Khronos glTF Tutorial](https://github.khronos.org/glTF-Tutorials/gltfTutorial/).
- **Реализовать:** TBN debug view, mirrored UV, non-uniform scale, normal map с известными направлениями.
- **Проверить:** Тестовая сцена отделяет tangents, normals и roughness; линейные data textures.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 5. HDR, exposure и tone mapping · 3–8 ч

- **Понять:** Чем tone mapping отличается от sRGB encoding?
- **Читать:** Filament: imaging pipeline — [Filament: Physically Based Rendering](https://google.github.io/filament/Filament.md.html).
- **Реализовать:** HDR pass → exposure → tone mapper → display encoding; сравнение двух операторов.
- **Проверить:** Нет двойной gamma; экспозиция меняется без изменения световых данных.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

**Итог блока:** Нет двойной gamma; экспозиция меняется без изменения световых данных.

<a id="shadow-lab"></a>

### 19. Устойчивые тени и CSM

**Ветка:** core · **Этап:** 4 · **Объём:** 15–40 ч

Устойчивые тени и CSM

**Предпосылки:** [Материалы и PBR](#pbr), [Разбор кадра и поиск rendering bugs](#frame-debug).

#### 1. Shadow mapping и bias · 3–8 ч

- **Понять:** Откуда acne и peter-panning и почему bias зависит от геометрии?
- **Читать:** RTR: shadows — shadow mapping, bias — [Real-Time Rendering](https://www.realtimerendering.com/).
- **Реализовать:** Depth map, slope/normal bias controls; debug light frustum.
- **Проверить:** Сцены с тонкой геометрией, наклонной плоскостью и разными масштабами.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 2. PCF и контактные артефакты · 3–8 ч

- **Понять:** Почему фильтровать depth и фильтровать comparison — разные операции?
- **Читать:** RTR: shadow filtering — [Real-Time Rendering](https://www.realtimerendering.com/).
- **Реализовать:** Несколько PCF kernels и reference hard shadows; фиксированный seed.
- **Проверить:** Сравни качество и GPU cost, нет светлых полос за границей shadow map.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 3. Cascaded shadow maps · 3–8 ч

- **Понять:** Как выбрать splits и стабилизировать projection?
- **Читать:** RTR: cascaded shadow mapping — [Real-Time Rendering](https://www.realtimerendering.com/).
- **Реализовать:** 3–4 cascades, texel snapping, cascade blend и debug colors.
- **Проверить:** Camera pan/rotation video; измерены shimmering и стоимость по cascades.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 4. Shadow caster culling · 3–8 ч

- **Понять:** Почему camera-visible set не равен shadow caster set?
- **Читать:** RTR: acceleration и shadow rendering — [Real-Time Rendering](https://www.realtimerendering.com/).
- **Реализовать:** Отдельные frusta/light volumes; тест offscreen caster.
- **Проверить:** Тень offscreen объекта не исчезает; draw counts и CPU/GPU timings до/после.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 5. Quality tiers и бюджет · 3–8 ч

- **Понять:** Как уменьшать стоимость без случайного изменения всей картинки?
- **Читать:** Свой shadow benchmark — [Real-Time Rendering](https://www.realtimerendering.com/).
- **Реализовать:** Профили low/medium/high: resolution, cascades, kernel; сохраняемые settings.
- **Проверить:** Сравнение одного camera path и заявленный бюджет на собственной GPU.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

**Итог блока:** Сравнение одного camera path и заявленный бюджет на собственной GPU.

<a id="compute-lab"></a>

### 20. Compute: данные, группы и параллельные алгоритмы

**Ветка:** core · **Этап:** 4 · **Объём:** 20–45 ч

Compute: данные, группы и параллельные алгоритмы

**Предпосылки:** [Синхронизация и lifetime без queue-idle](#sync-lifetime), [GPU: исполнение, память и стоимость кадра](#gpu-hardware).

#### 1. Dispatch и bounds checks · 3–8 ч

- **Понять:** Что делать, если N не кратно размеру группы?
- **Читать:** PMPP: data parallelism; shader docs — [Programming Massively Parallel Processors](https://shop.elsevier.com/books/programming-massively-parallel-processors/hwu/978-0-323-91231-0).
- **Реализовать:** Map kernel CPU/GPU, dispatch ceil(N/groupSize), guard по global index.
- **Проверить:** N=0,1,groupSize±1 и большой N; readback совпадает с CPU.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 2. Shared memory и group barriers · 3–8 ч

- **Понять:** Почему barrier нельзя обходить частью одной группы?
- **Читать:** PMPP: shared memory, synchronization — [Programming Massively Parallel Processors](https://shop.elsevier.com/books/programming-massively-parallel-processors/hwu/978-0-323-91231-0).
- **Реализовать:** Tiled blur или matrix transpose; uniform control flow вокруг barrier.
- **Проверить:** Сравни reference, несколько tile sizes; учтены halo и края.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 3. Reduction и atomics · 3–8 ч

- **Понять:** Почему atomic не обеспечивает произвольный порядок всей программы?
- **Читать:** PMPP: reduction, atomics — [Programming Massively Parallel Processors](https://shop.elsevier.com/books/programming-massively-parallel-processors/hwu/978-0-323-91231-0).
- **Реализовать:** Сумма или histogram: naïve atomics, group reduction, двухпроходный вариант.
- **Проверить:** Размеры вне степени двойки; отдельно погрешность float и точность integer.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 4. Prefix sum и compaction · 3–8 ч

- **Понять:** Как превратить visibility flags в плотный массив?
- **Читать:** PMPP: parallel scan — [Programming Massively Parallel Processors](https://shop.elsevier.com/books/programming-massively-parallel-processors/hwu/978-0-323-91231-0).
- **Реализовать:** Exclusive scan + stream compaction; CPU reference и overflow detection.
- **Проверить:** Пустой/полный/случайный набор; стабильный порядок, если он обещан.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 5. Indirect arguments и visibility barrier · 3–8 ч

- **Понять:** Почему запись аргументов не означает готовность indirect draw?
- **Читать:** Khronos synchronization examples / D3D12 ExecuteIndirect sample — [DirectX Graphics Samples / MiniEngine](https://github.com/microsoft/DirectX-Graphics-Samples).
- **Реализовать:** Compute заполняет indirect buffer; graphics читает после dependency.
- **Проверить:** Count=0 и capacity overflow безопасны; GPU buffer dump объясняет draw count.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

**Итог блока:** Count=0 и capacity overflow безопасны; GPU buffer dump объясняет draw count.

<a id="clustered"></a>

### 25. Много источников света: tiled / clustered

**Ветка:** core · **Этап:** 5 · **Объём:** 25–50 ч

Много источников света: tiled / clustered

**Предпосылки:** [Compute: данные, группы и параллельные алгоритмы](#compute-lab), [Image-based lighting и проверка BRDF](#ibl-lab), [Разбор кадра и поиск rendering bugs](#frame-debug).

#### 1. Forward и deferred baseline · 3–8 ч

- **Понять:** Какие данные нужны lighting pass и сколько bandwidth они стоят?
- **Читать:** RTR: rendering pipelines — [Real-Time Rendering](https://www.realtimerendering.com/).
- **Реализовать:** Одна сцена, два набора lights; реализуй один baseline и оцени альтернативу.
- **Проверить:** Посчитай bytes/pixel G-buffer; назови ограничения transparency/MSAA.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 2. Tiled light lists · 3–8 ч

- **Понять:** Как консервативно назначать lights экранным tiles?
- **Читать:** Clustered Deferred and Forward Shading: spatial subdivision — [Clustered Deferred and Forward Shading](https://research.chalmers.se/en/publication/161725).
- **Реализовать:** Depth bounds, light-volume tests, lists и overflow flags.
- **Проверить:** Debug heatmap и compare с brute-force lighting; нет пропавших lights.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 3. Logarithmic Z clusters · 3–8 ч

- **Понять:** Почему экранный tile плох при большом depth discontinuity?
- **Читать:** Clustered paper: 3D subdivision — [Clustered Deferred and Forward Shading](https://research.chalmers.se/en/publication/161725).
- **Реализовать:** Добавь Z slices и debug cluster index; обработай near/far boundaries.
- **Проверить:** Interior/exterior сцены; распределение lights/cluster и совпадение с reference.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 4. Прозрачность и худший случай · 3–8 ч

- **Понять:** Как transparent pixel получает lights, если его нет в opaque depth?
- **Читать:** Свой clustered renderer — [Clustered Deferred and Forward Shading](https://research.chalmers.se/en/publication/161725).
- **Реализовать:** Conservative clusters для прозрачности; тысячи перекрывающихся lights.
- **Проверить:** Overflow не повреждает память; fallback указан; tail latency и memory usage измерены.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 5. Масштабирование и cost model · 3–8 ч

- **Понять:** Когда построение списков дороже сэкономленного shading?
- **Читать:** Свой benchmark — [Clustered Deferred and Forward Shading](https://research.chalmers.se/en/publication/161725).
- **Реализовать:** Sweep 16/128/1024 lights и разных resolutions; CPU/GPU breakdown.
- **Проверить:** Таблица с baseline, culling cost и shading cost; случай проигрыша тоже включён.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

**Итог блока:** Таблица с baseline, culling cost и shading cost; случай проигрыша тоже включён.

<a id="temporal-lab"></a>

### 26. Temporal rendering: motion, TAA и история

**Ветка:** core · **Этап:** 5 · **Объём:** 15–40 ч

Temporal rendering: motion, TAA и история

**Предпосылки:** [Image-based lighting и проверка BRDF](#ibl-lab), [Разбор кадра и поиск rendering bugs](#frame-debug).

#### 1. Motion vectors · 3–8 ч

- **Понять:** В каких единицах velocity и какой знак у previous→current?
- **Читать:** Обзор TAA: reprojection и motion — [Обзор temporal antialiasing](https://research.nvidia.com/labs/rtr/publication/yang2020survey/).
- **Реализовать:** Current/previous matrices для камеры и объекта; debug velocity view.
- **Проверить:** Статика, движение камеры и объекта проверены отдельно; resize сбрасывает history.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 2. Jitter и reprojection · 3–8 ч

- **Понять:** Как согласовать jitter, projection и history lookup?
- **Читать:** Обзор TAA: sampling и accumulation — [Обзор temporal antialiasing](https://research.nvidia.com/labs/rtr/publication/yang2020survey/).
- **Реализовать:** Halton jitter, reprojection, history ping-pong и nearest baseline.
- **Проверить:** Static accumulation сходится; camera cut не оставляет старый кадр.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 3. Disocclusion и rejection · 3–8 ч

- **Понять:** Почему корректные motion vectors не гарантируют валидную history?
- **Читать:** Обзор TAA: validation — [Обзор temporal antialiasing](https://research.nvidia.com/labs/rtr/publication/yang2020survey/).
- **Реализовать:** Depth/normal rejection и neighborhood clamp; debug rejected pixels.
- **Проверить:** Moving occluder, тонкая геометрия, резкий pan; видео ghosting до/после.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 4. HDR и прозрачность во времени · 3–8 ч

- **Понять:** Как exposure и прозрачные объекты влияют на накопление?
- **Читать:** Обзор TAA: practical considerations — [Обзор temporal antialiasing](https://research.nvidia.com/labs/rtr/publication/yang2020survey/).
- **Реализовать:** Тест emissive, смены exposure и прозрачных частиц; зафиксируй выбранную политику.
- **Проверить:** Нет неконтролируемых HDR trails; ограничения прозрачности явно показаны.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 5. TAA quality/performance study · 3–8 ч

- **Понять:** Как сравнить temporal quality без удобного статичного скриншота?
- **Читать:** Один профильный доклад Advances + собственный baseline — [Advances in Real-Time Rendering — доклады и видео](https://advances.realtimerendering.com/).
- **Реализовать:** Одинаковый camera path; no-AA/TAA/reference video; настройка history weight.
- **Проверить:** Стоимость, ghosting и stability оцениваются вместе; sharpening не скрывает defects.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

**Итог блока:** Стоимость, ghosting и stability оцениваются вместе; sharpening не скрывает defects.

<a id="visibility"></a>

### 27. Visibility, LOD и GPU-driven rendering

**Ветка:** core · **Этап:** 5 · **Объём:** 30–60 ч

Visibility, LOD и GPU-driven rendering

**Предпосылки:** [Compute: данные, группы и параллельные алгоритмы](#compute-lab), [Сцена: mesh, submesh, material](#scene), [Разбор кадра и поиск rendering bugs](#frame-debug).

#### 1. CPU frustum culling baseline · 3–8 ч

- **Понять:** Как преобразовать bounds без ложного отбрасывания?
- **Читать:** RTR: acceleration; RTCD: bounds — [Real-Time Collision Detection](https://realtimecollisiondetection.net/books/rtcd/toc/).
- **Реализовать:** Planes, sphere/AABB tests; debug culled set; CPU baseline.
- **Проверить:** Compare с no-culling на границах frustum и non-uniform scales.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 2. LOD и geometric error · 3–8 ч

- **Понять:** Почему расстояние само по себе не описывает экранную ошибку?
- **Читать:** meshoptimizer: simplification и LOD — [meshoptimizer](https://github.com/zeux/meshoptimizer).
- **Реализовать:** Screen-space error, hysteresis, несколько LODs; meshoptimizer разрешён как библиотека.
- **Проверить:** Нет постоянного переключения у границы; triangle counts и visual error записаны.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 3. Hi-Z depth pyramid · 3–8 ч

- **Понять:** Как меняется min/max reduction при reversed-Z?
- **Читать:** GPU Driven Rendering: occlusion approach — [GPU Driven Rendering in Trials Rising — GDC](https://media.gdcvault.com/gdc2019/presentations/Drazhevskyi_Oleksandr_GPU_Driven_Rendering.pdf).
- **Реализовать:** Depth pyramid, conservative bounds и occlusion tests; debug mip selection.
- **Проверить:** No-cull reference не выявляет false occlusion на near-plane/edges; camera cut обработан.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 4. GPU culling и indirect draw · 3–8 ч

- **Понять:** Как убрать per-object CPU draw без readback count каждый кадр?
- **Читать:** GPU Driven Rendering; backend indirect sample — [GPU Driven Rendering in Trials Rising — GDC](https://media.gdcvault.com/gdc2019/presentations/Drazhevskyi_Oleksandr_GPU_Driven_Rendering.pdf).
- **Реализовать:** Visibility flags, compaction, indirect draws; capability fallback.
- **Проверить:** CPU submission time и GPU overhead измерены; нулевая видимость безопасна.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 5. Temporal visibility и latency · 3–8 ч

- **Понять:** Почему прошлый depth ошибается при быстром движении камеры?
- **Читать:** GPU Driven Rendering: dependencies — [GPU Driven Rendering in Trials Rising — GDC](https://media.gdcvault.com/gdc2019/presentations/Drazhevskyi_Oleksandr_GPU_Driven_Rendering.pdf).
- **Реализовать:** Conservative policy, first-frame fallback и camera cut reset.
- **Проверить:** Видео стресс-сцены; false negatives отсутствуют в заявленном наборе тестов.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 6. 100k instances — измерение, а не обещание · 3–8 ч

- **Понять:** Как масштабируются submission, memory и culling cost?
- **Читать:** Свой deterministic benchmark — [GPU Driven Rendering in Trials Rising — GDC](https://media.gdcvault.com/gdc2019/presentations/Drazhevskyi_Oleksandr_GPU_Driven_Rendering.pdf).
- **Реализовать:** Sweep instance counts 1k/10k/100k либо до лимита своей GPU; фиксированная геометрия.
- **Проверить:** CPU/GPU graphs, visible count и VRAM; лимиты hardware честно указаны.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

**Итог блока:** CPU/GPU graphs, visible count и VRAM; лимиты hardware честно указаны.

<a id="render-graph"></a>

### 28. Render graph и lifetime проходов

**Ветка:** core · **Этап:** 5 · **Объём:** 25–55 ч

Render graph и lifetime проходов

**Предпосылки:** [Синхронизация и lifetime без queue-idle](#sync-lifetime), [Устойчивые тени и CSM](#shadow-lab), [Temporal rendering: motion, TAA и история](#temporal-lab).

#### 1. Pass declarations и dependency DAG · 3–8 ч

- **Понять:** Какие reads/writes нужны для построения порядка проходов?
- **Читать:** Epic RDG: concepts и shader parameters — [Epic: Render Dependency Graph](https://dev.epicgames.com/documentation/en-us/unreal-engine/render-dependency-graph-in-unreal-engine).
- **Реализовать:** Свой небольшой graph: shadow→opaque→TAA→tone map; logical resources.
- **Проверить:** Topological order; ошибки cycle, read-before-write и missing producer обнаруживаются.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 2. Автоматические barriers · 3–8 ч

- **Понять:** Как resource usage превращается в transitions?
- **Читать:** Epic RDG: resource dependencies; backend specification — [Epic: Render Dependency Graph](https://dev.epicgames.com/documentation/en-us/unreal-engine/render-dependency-graph-in-unreal-engine).
- **Реализовать:** Сначала single queue, whole-resource tracker; ручной режим как reference.
- **Проверить:** Одинаковый кадр; validation чистая; лог generated barriers объяснён.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 3. Transient lifetime и aliasing · 3–8 ч

- **Понять:** Когда два render targets могут разделять память?
- **Читать:** Epic RDG: transient resources — [Epic: Render Dependency Graph](https://dev.epicgames.com/documentation/en-us/unreal-engine/render-dependency-graph-in-unreal-engine).
- **Реализовать:** Вычисли first/last use, memory timeline; aliasing опционален после корректного graph.
- **Проверить:** Оценка peak bytes; при aliasing добавлены нужные barriers; нет overlap живых ресурсов.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 4. Pass culling и импорт history · 3–8 ч

- **Понять:** Почему unused pass иногда имеет side effect?
- **Читать:** Epic RDG: culling и external resources — [Epic: Render Dependency Graph](https://dev.epicgames.com/documentation/en-us/unreal-engine/render-dependency-graph-in-unreal-engine).
- **Реализовать:** Пометь persistent/history/readback outputs; убери недостижимые pure passes.
- **Проверить:** History не теряется между кадрами; debug output включает нужный producer.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 5. Graph debugger и компромиссы · 3–8 ч

- **Понять:** Как расследовать ошибку, скрытую автоматизацией?
- **Читать:** RDG Insights — как пример интерфейса — [Epic: Render Dependency Graph](https://dev.epicgames.com/documentation/en-us/unreal-engine/render-dependency-graph-in-unreal-engine).
- **Реализовать:** Экспорт graph в DOT/JSON: order, resource lifetimes, barriers и pass timings.
- **Проверить:** По одному screenshot/graph можно объяснить путь кадра; ограничения tracker документированы.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

**Итог блока:** По одному screenshot/graph можно объяснить путь кадра; ограничения tracker документированы.

<a id="cpu-jobs"></a>

### 29. CPU performance, job system и streaming

**Ветка:** core · **Этап:** 5 · **Объём:** 25–50 ч

CPU performance, job system и streaming

**Предпосылки:** [C++ для renderer: lifetime и ресурсы](#cpp-runtime), [Разбор кадра и поиск rendering bugs](#frame-debug).

#### 1. Data layout и cache locality · 3–8 ч

- **Понять:** Почему SoA быстрее лишь для определённых access patterns?
- **Читать:** CSAPP: memory hierarchy; Data-Oriented Design — [Computer Systems: A Programmer’s Perspective](https://csapp.cs.cmu.edu/3e/pieces/preface3e.pdf).
- **Реализовать:** Обработка transforms/bounds в AoS и SoA; одинаковая работа и Release build.
- **Проверить:** Несколько размеров datasets, checksum от dead-code elimination и CPU timings.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 2. Job dependencies и races · 3–8 ч

- **Понять:** Как отличается data race от логической зависимости задач?
- **Читать:** OSTEP: threads, locks, condition variables — [Operating Systems: Three Easy Pieces](https://pages.cs.wisc.edu/~remzi/OSTEP/).
- **Реализовать:** Parallel transform/culling jobs с dependency counter; serial reference.
- **Проверить:** Deterministic results; ThreadSanitizer на поддерживаемой платформе либо stress+review с указанными ограничениями.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 3. Parallel command recording · 3–8 ч

- **Понять:** Что из command state нельзя одновременно писать из двух потоков?
- **Читать:** Backend samples: multithreaded command recording — [Khronos Vulkan Samples](https://github.com/KhronosGroup/Vulkan-Samples).
- **Реализовать:** Per-worker pools/allocators; coarse batches; submit в контролируемом порядке.
- **Проверить:** CPU recording time до/после; GPU output совпадает; overhead на малой сцене учтён.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 4. Async asset loading · 3–8 ч

- **Понять:** Где IO/parse/upload/activation пересекают потоки?
- **Читать:** Game Engine Architecture: resource management — [Game Engine Architecture](https://www.gameenginebook.com/toc.html).
- **Реализовать:** Background load/decode, очередь upload и atomically published handles; cancellation.
- **Проверить:** Не рендерится half-loaded asset; missing file/cancel безопасны; frame spikes измерены.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 5. Memory budget и residency · 3–8 ч

- **Понять:** Что происходит при превышении выбранного VRAM budget?
- **Читать:** Backend memory budget docs; собственный resource manager — [Game Engine Architecture](https://www.gameenginebook.com/toc.html).
- **Реализовать:** Учёт bytes по категориям; eviction policy для неиспользуемых assets и fallback texture.
- **Проверить:** Стресс маленького budget: нет бесконечного роста; peak memory и stutter report.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

**Итог блока:** Стресс маленького budget: нет бесконечного роста; peak memory и stutter report.

<a id="shipping"></a>

### 35. Качество, инструменты художника и релиз

**Ветка:** core · **Этап:** 6 · **Объём:** 25–60 ч

Качество, инструменты художника и релиз

**Предпосылки:** [Render graph и lifetime проходов](#render-graph), [CPU performance, job system и streaming](#cpu-jobs).

#### 1. Asset contract и texture pipeline · 3–8 ч

- **Понять:** Что runtime поддерживает, что конвертирует offline, а что отвергает?
- **Читать:** glTF tutorial; KTX tools documentation — [Khronos KTX / KTX-Software](https://github.com/KhronosGroup/KTX-Software).
- **Реализовать:** Список поддерживаемых glTF features; textures с mips и compression; material diagnostics.
- **Проверить:** Некорректный asset даёт actionable error; licenses и attribution сохранены.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 2. Animation и skinning · 3–8 ч

- **Понять:** Как inverse bind matrices связаны с текущей позой?
- **Читать:** glTF tutorial: skins и animations — [Khronos glTF Tutorial](https://github.khronos.org/glTF-Tutorials/gltfTutorial/).
- **Реализовать:** Skeletal animation одного asset; CPU reference и GPU skinning при необходимости.
- **Проверить:** Bind pose, hierarchy и animated bounds корректны; поясни где применяется mesh transform.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 3. Инструменты для художника · 3–8 ч

- **Понять:** Может ли другой человек настроить эффект без изменения C++?
- **Читать:** Game Engine Architecture: tools pipeline — [Game Engine Architecture](https://www.gameenginebook.com/toc.html).
- **Реализовать:** Material/lighting controls, debug views, presets и безопасные диапазоны параметров.
- **Проверить:** Человек воспроизводит визуальную задачу по инструкции; invalid input не создаёт NaN.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 4. Regression suite и clean release · 3–8 ч

- **Понять:** Что доказывает, что репозиторий можно проверить без автора?
- **Читать:** Свои scene/image tests, CI docs по месту — [Game Engine Architecture](https://www.gameenginebook.com/toc.html).
- **Реализовать:** CI build + CPU tests; deterministic render smoke по доступности GPU; versioned settings.
- **Проверить:** Чистая машина/директория, Release binary, короткая инструкция, известные ограничения.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 5. Technical breakdown · 3–8 ч

- **Понять:** Какие компромиссы ты можешь защитить на code review?
- **Читать:** Один законченный доклад Advances как образец объяснения — [Advances in Real-Time Rendering — доклады и видео](https://advances.realtimerendering.com/).
- **Реализовать:** Опиши архитектуру, 3 решения, 2 rejected alternatives и performance investigation.
- **Проверить:** Другой разработчик воспроизводит benchmark; результаты связаны с commits и scenes.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

**Итог блока:** Другой разработчик воспроизводит benchmark; результаты связаны с commits и scenes.

<a id="interview-lab"></a>

### 41. Подготовка к собеседованиям и самостоятельной работе

**Ветка:** core · **Этап:** 6 · **Объём:** 20–45 ч

Подготовка к собеседованиям и самостоятельной работе

**Предпосылки:** [Разбор кадра и поиск rendering bugs](#frame-debug), [Image-based lighting и проверка BRDF](#ibl-lab), [Синхронизация и lifetime без queue-idle](#sync-lifetime).

#### 1. C++ live debugging · 3–8 ч

- **Понять:** Как объяснить причину ошибки, а не угадать исправление?
- **Читать:** Guidelines: lifetime, containers, concurrency — [C++ Core Guidelines](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines).
- **Реализовать:** Пять задач: dangling view, invalid iterator, move-only owner, data race и alignment.
- **Проверить:** Без подсказки: минимальный reproduction, fix и regression check на каждую.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 2. Математика на доске · 3–8 ч

- **Понять:** Можешь ли вывести нужную формулу из геометрии?
- **Читать:** 3D Math Primer: transforms, quaternions, intersections — [3D Math Primer for Graphics and Game Development](https://gamemath.com/book/).
- **Реализовать:** Выведи view/projection, reflection, inverse-transpose и ray/plane; поясни соглашения.
- **Проверить:** Численные примеры и граничные случаи; 20–30 минут устного объяснения.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 3. Rendering design interview · 3–8 ч

- **Понять:** Как спроектировать feature под ограничение времени и памяти?
- **Читать:** RTR: rendering pipeline и acceleration — [Real-Time Rendering](https://www.realtimerendering.com/).
- **Реализовать:** Письменно спроектируй 1000 lights, stable shadows или streaming; бюджет и fallback.
- **Проверить:** Названы baseline, dependencies, риски, измерения и критерии отказа.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 4. Разбор незнакомого capture · 3–8 ч

- **Понять:** Как действовать, когда ответ заранее неизвестен?
- **Читать:** Свой либо разрешённый публичный capture — [NVIDIA Nsight Graphics](https://developer.nvidia.com/nsight-graphics).
- **Реализовать:** За 60–90 минут найди bottleneck или артефакт, проверь одну гипотезу.
- **Проверить:** Короткий report с evidence; границы вывода отделены от предположений.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 5. Portfolio review и английский · 3–8 ч

- **Понять:** Может ли reviewer понять твой личный вклад за 5 минут?
- **Читать:** Технические README своих проектов — [C++ Core Guidelines](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines).
- **Реализовать:** README/видео на английском, 10-минутный рассказ, mock code review и CV.
- **Проверить:** Два проекта с кодом и evidence; явно отделены libraries/tutorials и собственные решения.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

**Итог блока:** Два проекта с кодом и evidence; явно отделены libraries/tutorials и собственные решения.

## Специализации — выбери одну

<a id="ue-rendering"></a>

### 36. Unreal Engine: rendering feature в большой кодовой базе

**Ветка:** specialization · **Этап:** 6 · **Объём:** 35–70 ч

Рекомендуемая ветка для вакансий, где прямо указан UE. Сначала основа API и диагностики.

**Предпосылки:** [Разбор кадра и поиск rendering bugs](#frame-debug), [Compute: данные, группы и параллельные алгоритмы](#compute-lab).

#### 1. Путь кадра в UE · 3–8 ч

- **Понять:** Как связаны game thread, render thread, RHI и GPU?
- **Читать:** Epic RDG: overview; исходники Renderer модуля установленной версии — [Epic: Render Dependency Graph](https://dev.epicgames.com/documentation/en-us/unreal-engine/render-dependency-graph-in-unreal-engine).
- **Реализовать:** Найди места формирования view, opaque pass и post; сохрани frame capture.
- **Проверить:** Схема с конкретными файлами/функциями своей версии; условия лицензии исходников соблюдены.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 2. Global shader и RDG pass · 3–8 ч

- **Понять:** Как передать ресурсы без скрытых lifetime assumptions?
- **Читать:** Epic RDG: shader parameter structs и compute pass — [Epic: Render Dependency Graph](https://dev.epicgames.com/documentation/en-us/unreal-engine/render-dependency-graph-in-unreal-engine).
- **Реализовать:** Plugin с global compute shader и RDG input/output textures; editor controls.
- **Проверить:** Validation проходит; корректны viewport bounds, resize и разные resolutions.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 3. Новая feature с baseline · 3–8 ч

- **Понять:** Чем самостоятельная feature отличается от изменения настройки?
- **Читать:** Epic RDG + выбранный первоисточник алгоритма — [Epic: Render Dependency Graph](https://dev.epicgames.com/documentation/en-us/unreal-engine/render-dependency-graph-in-unreal-engine).
- **Реализовать:** Простой bilateral filter, outline либо другой bounded effect; quality toggle и debug views.
- **Проверить:** A/B capture, GPU markers, reference и известные artifacts.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 4. Профиль и integration review · 3–8 ч

- **Понять:** Как доказать, что feature укладывается в проектный бюджет?
- **Читать:** Unreal Insights / GPU profiling документация своей версии — [Epic: Render Dependency Graph](https://dev.epicgames.com/documentation/en-us/unreal-engine/render-dependency-graph-in-unreal-engine).
- **Реализовать:** CPU/GPU comparison, render scale sweep, отключение прохода; packaging plugin.
- **Проверить:** Standalone/packaged test; patch/инструкция без публикации закрытого engine source.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 5. Rendering bug report в чужом коде · 3–8 ч

- **Понять:** Как сократить неизвестную систему до минимального reproduction?
- **Читать:** Исходники установленной версии и capture — [Epic: Render Dependency Graph](https://dev.epicgames.com/documentation/en-us/unreal-engine/render-dependency-graph-in-unreal-engine).
- **Реализовать:** Воспроизведи одну rendering проблему, найди responsible pass, предложи fix или workaround.
- **Проверить:** Отчёт с steps, version, hardware, evidence и limitations; отправка наружу не требуется.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

**Итог блока:** Отчёт с steps, version, hardware, evidence и limitations; отправка наружу не требуется.

<a id="ray-lab"></a>

### 37. Ray tracing: CPU reference и hybrid GPU

**Ветка:** specialization · **Этап:** 6 · **Объём:** 45–100 ч

Ray tracing: CPU reference и hybrid GPU

**Предпосылки:** [Image-based lighting и проверка BRDF](#ibl-lab), [Compute: данные, группы и параллельные алгоритмы](#compute-lab).

#### 1. Probability и Monte Carlo · 3–8 ч

- **Понять:** Почему оценка integral зависит от pdf и measure?
- **Читать:** PBRT 4e: Monte Carlo Integration — [Physically Based Rendering](https://www.pbr-book.org/4ed/contents).
- **Реализовать:** Численно оцени простой integral uniform и importance sampling с фиксированными seeds.
- **Проверить:** Mean/variance на серии запусков; ошибки pdf видны на известном analytic integral.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 2. BVH и traversal · 3–8 ч

- **Понять:** Как балансируют build time, traversal и memory?
- **Читать:** PBRT: Bounding Volume Hierarchies — [Physically Based Rendering](https://www.pbr-book.org/4ed/contents).
- **Реализовать:** CPU BVH для triangle scene; compare с brute force.
- **Проверить:** Ray misses, degenerate bounds и randomized rays совпадают; build/traversal timings отдельно.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 3. Path tracer, NEE и MIS · 3–8 ч

- **Понять:** Почему нельзя просто сложить light sampling и BSDF sampling?
- **Читать:** PBRT: Light Transport, Monte Carlo Integration — [Physically Based Rendering](https://www.pbr-book.org/4ed/contents).
- **Реализовать:** Reference tracer: diffuse/GGX, emissive lights, next-event estimation и MIS.
- **Проверить:** Image convergence, разные sample counts и energy tests; нет double counting.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 4. GPU acceleration structures · 3–8 ч

- **Понять:** Чем BLAS/TLAS build отличается от update и barrier?
- **Читать:** DXR samples либо Khronos ray tracing samples — [DirectX Graphics Samples / MiniEngine](https://github.com/microsoft/DirectX-Graphics-Samples).
- **Реализовать:** Optional hardware path: один ray-query shadow/reflection; CPU/compute fallback при отсутствии RT.
- **Проверить:** Capabilities проверены; transforms/lifetime корректны; build cost измерен.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 5. Hybrid denoising experiment · 3–8 ч

- **Понять:** Какие spatial/temporal assumptions ломаются на motion?
- **Читать:** Один доклад Advances по denoising — [Advances in Real-Time Rendering — доклады и видео](https://advances.realtimerendering.com/).
- **Реализовать:** Noisy signal + simple edge-aware spatial/temporal filter; reference frames.
- **Проверить:** Cost, bias, ghosting и disocclusion показаны в video; ограничения честно указаны.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

**Итог блока:** Cost, bias, ghosting и disocclusion показаны в video; ограничения честно указаны.

<a id="effects-lab"></a>

### 38. Объёмный свет, частицы и прозрачность

**Ветка:** specialization · **Этап:** 6 · **Объём:** 35–80 ч

Объёмный свет, частицы и прозрачность

**Предпосылки:** [Compute: данные, группы и параллельные алгоритмы](#compute-lab), [Temporal rendering: motion, TAA и история](#temporal-lab), [Много источников света: tiled / clustered](#clustered).

#### 1. GPU particle lifecycle · 3–8 ч

- **Понять:** Как spawn/update/kill работают без полного CPU readback?
- **Читать:** PMPP: compaction; свой compute-lab — [Programming Massively Parallel Processors](https://shop.elsevier.com/books/programming-massively-parallel-processors/hwu/978-0-323-91231-0).
- **Реализовать:** Alive/dead lists, bounded spawn, indirect draw; deterministic seed.
- **Проверить:** Capacity overflow и dt spike безопасны; CPU submit почти не зависит от particle count.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 2. Прозрачность и порядок · 3–8 ч

- **Понять:** Какие ограничения у sorting и weighted blended OIT?
- **Читать:** RTR: transparency — [Real-Time Rendering](https://www.realtimerendering.com/).
- **Реализовать:** Sorted alpha baseline и weighted blended вариант; плотные пересечения.
- **Проверить:** Показаны counterexamples, memory и GPU cost; приближение не выдано за точное решение.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 3. Beer–Lambert и ray marching · 3–8 ч

- **Понять:** Почему opacity одного шага зависит от его длины?
- **Читать:** PBRT: Volume Scattering — transmittance — [Physically Based Rendering](https://www.pbr-book.org/4ed/contents).
- **Реализовать:** Homogeneous fog, analytic transmittance reference и jittered ray march.
- **Проверить:** Изменение числа шагов не меняет среднюю плотность; указан error/cost.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 4. Froxel lighting · 3–8 ч

- **Понять:** Как ограничить resolution и стоимость scattering?
- **Читать:** Один профильный Advances доклад о volumetrics — [Advances in Real-Time Rendering — доклады и видео](https://advances.realtimerendering.com/).
- **Реализовать:** 3D froxel grid, light injection и integration; debug slices.
- **Проверить:** Сравнение с ray-march baseline; memory budget и leakage cases.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 5. Temporal volumetrics · 3–8 ч

- **Понять:** Как быстро движущийся источник света ломает history?
- **Читать:** Advances: temporal accumulation в выбранном докладе — [Advances in Real-Time Rendering — доклады и видео](https://advances.realtimerendering.com/).
- **Реализовать:** Reprojection, rejection и camera cut reset для fog.
- **Проверить:** Видео moving light, occluder и camera cut; ghosting и timings указаны.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

**Итог блока:** Видео moving light, occluder и camera cut; ghosting и timings указаны.

<a id="screen-space"></a>

### 39. Screen-space эффекты: AO, SSR и ограничения

**Ветка:** specialization · **Этап:** 6 · **Объём:** 30–65 ч

Screen-space эффекты: AO, SSR и ограничения

**Предпосылки:** [Image-based lighting и проверка BRDF](#ibl-lab), [Temporal rendering: motion, TAA и история](#temporal-lab), [Разбор кадра и поиск rendering bugs](#frame-debug).

#### 1. Depth reconstruction · 3–8 ч

- **Понять:** Как восстановить view-space position и не перепутать depth convention?
- **Читать:** RTR: image-space effects; собственная projection matrix — [Real-Time Rendering](https://www.realtimerendering.com/).
- **Реализовать:** Reconstruct из depth с inverse projection; compare с geometry position debug view.
- **Проверить:** Ошибки измерены у near/far и при jitter; фон и reversed-Z обработаны.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 2. Ambient occlusion baseline · 3–8 ч

- **Понять:** Почему AO не является полноценным непрямым освещением?
- **Читать:** RTR: ambient occlusion — [Real-Time Rendering](https://www.realtimerendering.com/).
- **Реализовать:** SSAO с hemisphere samples и radius в scene units; neutral material scene.
- **Проверить:** Сравнение с ray-traced AO либо CPU reference на малой сцене; нет лишнего затемнения direct light.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 3. Bilateral filtering и half resolution · 3–8 ч

- **Понять:** Почему обычный blur переносит occlusion через границы объектов?
- **Читать:** RTR: bilateral filtering — [Real-Time Rendering](https://www.realtimerendering.com/).
- **Реализовать:** Depth/normal-aware blur, half-res AO и bilateral upsample.
- **Проверить:** Тонкие объекты и края; difference image и GPU timings для full/half resolution.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 4. Screen-space reflection tracing · 3–8 ч

- **Понять:** Что невозможно восстановить из текущего depth buffer?
- **Читать:** RTR: screen-space reflections — [Real-Time Rendering](https://www.realtimerendering.com/).
- **Реализовать:** View-space ray march, thickness policy и confidence; IBL fallback для miss.
- **Проверить:** Offscreen, backfaces и near-edge failures показаны явно; нет NaN и бесконечного trace.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 5. Temporal stabilization и regression · 3–8 ч

- **Понять:** Почему temporal фильтр может спрятать шум, но оставить неверный reflection?
- **Читать:** Обзор TAA: history validation — [Обзор temporal antialiasing](https://research.nvidia.com/labs/rtr/publication/yang2020survey/).
- **Реализовать:** History rejection для AO/SSR, debug confidence; несколько camera paths.
- **Проверить:** Видео ghosting/leaks; cost по pass; fallback работает при camera cut.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

**Итог блока:** Видео ghosting/leaks; cost по pass; fallback работает при camera cut.

<a id="gi-lab"></a>

### 40. Непрямое освещение: probes и GI experiment

**Ветка:** specialization · **Этап:** 6 · **Объём:** 45–100 ч

Непрямое освещение: probes и GI experiment

**Предпосылки:** [Ray tracing: CPU reference и hybrid GPU](#ray-lab), [Image-based lighting и проверка BRDF](#ibl-lab), [Temporal rendering: motion, TAA и история](#temporal-lab).

#### 1. Rendering equation и decomposition · 3–8 ч

- **Понять:** Как отделить direct, indirect diffuse и specular без двойного учёта?
- **Читать:** PBRT: Light Transport; RTR: global illumination — [Physically Based Rendering](https://www.pbr-book.org/4ed/contents).
- **Реализовать:** Reference scene с цветным bounce; отдельные debug contributions и light toggles.
- **Проверить:** Объяснение integral, units и путей света; direct-only и reference сравнимы.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 2. Probe representation · 3–8 ч

- **Понять:** Какие направления теряет низкочастотное представление?
- **Читать:** RTR: spherical harmonics и light probes — [Real-Time Rendering](https://www.realtimerendering.com/).
- **Реализовать:** Diffuse irradiance SH probes; constant и directional environment tests.
- **Проверить:** Сравни reconstructed irradiance и brute-force integration; записан normalization convention.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 3. Interpolation и light leaking · 3–8 ч

- **Понять:** Почему простая trilinear interpolation светит через стены?
- **Читать:** RTR: probe lighting — [Real-Time Rendering](https://www.realtimerendering.com/).
- **Реализовать:** Регулярная probe grid, relocation/visibility heuristic; комната с тонкой стеной.
- **Проверить:** Debug probe influence; leaks и границы не скрыты tone mapping.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 4. Update budget и history · 3–8 ч

- **Понять:** Как ограничить стоимость updates при движении света?
- **Читать:** Один доклад Advances по dynamic diffuse GI — [Advances in Real-Time Rendering — доклады и видео](https://advances.realtimerendering.com/).
- **Реализовать:** Обновляй часть probes в кадре; temporal accumulation и invalidation.
- **Проверить:** Cost/update latency sweep; moving light и camera cut не дают бесконечной history.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 5. Paper reproduction и ablation · 3–8 ч

- **Понять:** Какая часть алгоритма приносит пользу и при каких допущениях?
- **Читать:** Выбранный первоисточник с Advances и собственный baseline — [Advances in Real-Time Rendering — доклады и видео](https://advances.realtimerendering.com/).
- **Реализовать:** Один ограниченный GI метод; сравни без visibility/без history/полный вариант.
- **Проверить:** Reference images, timings, memory, limitations и повторяемый experiment; не заявляй production GI.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

**Итог блока:** Reference images, timings, memory, limitations и повторяемый experiment; не заявляй production GI.

## Дополнительные и прежние уроки

<a id="audit"></a>

### 03. Архив: базовая ревизия проекта

**Ветка:** optional · **Этап:** 1 · **Объём:** По урокам; обычно 15–40 ч

Начать с реального пробела. У тебя уже есть tinyrenderer и опыт WebGPU; знакомое можно подтвердить демонстрацией.

**Предпосылки:** можно начать сразу.

#### 1. Зафиксировать отправную точку · 2–6 ч

- **Понять:** Что уже написано мной и что запускается без ИИ?
- **Читать:** Свой README, дерево исходников и CMake.
- **Реализовать:** Собери свой текущий viewer; запиши команды сборки, скрин кадра и список трёх пробелов.
- **Проверить:** Пересобирается с чистой папки build; есть ссылка на commit или точные команды.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 2. Один воспроизводимый кадр · 2–6 ч

- **Понять:** Где CPU подготавливает draw и кто создаёт render target?
- **Читать:** Introduction: mesh, node, scene (обзор терминов, если нужно) — [Khronos glTF Tutorial](https://github.khronos.org/glTF-Tutorials/gltfTutorial/).
- **Реализовать:** Покажи треугольник либо модель; добавь переключение background color и resize без ошибок.
- **Проверить:** После изменения размера модель цела; можно указать функцию начала кадра и отправки команд.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 3. Проследить конвейер своего кадра · 2–6 ч

- **Понять:** Чем vertex stage отличается от rasterization и fragment stage?
- **Читать:** Гл. 2: Graphics Rendering Pipeline (только основные стадии) — [Real-Time Rendering](https://www.realtimerendering.com/).
- **Реализовать:** Нарисуй путь vertex buffer → vertex shader → clipping → rasterization → fragment → attachment для своего draw.
- **Проверить:** Покажи исходные данные и соответствующие функции в своём коде; объясни, где глубина.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 4. Диагностика ошибок до GPU debugger · 2–6 ч

- **Понять:** Почему ошибку GPU API надо видеть рядом с нарушенным предположением?
- **Читать:** Документация своего WebGPU backend: error callbacks, validation и debug labels — [Источник](https://www.w3.org/TR/webgpu/#errors-and-debugging).
- **Реализовать:** Включи validation и метки ресурсов; намеренно создай одну invalid bind/format ситуацию в отдельном тесте.
- **Проверить:** Получи диагностическое сообщение, верни рабочий код, запиши причину.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 5. Первый захват кадра в RenderDoc · 2–6 ч

- **Понять:** Чем захват кадра полезнее простого скриншота?
- **Читать:** RenderDoc: Getting Started / How to Capture a Frame (официальная документация) — [Источник](https://github.com/baldurk/renderdoc/blob/v1.x/docs/getting_started/quick_start.rst).
- **Реализовать:** Подключи RenderDoc к поддерживаемому API/backend, захвати кадр, найди draw call, target и bindings; при несовместимости backend используй поддерживаемый пример Vulkan и зафиксируй ограничение.
- **Проверить:** Скрин event browser + конкретные входные данные draw и итоговый attachment.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

**Итог блока:** Собери viewer и создай заметку: умею / не понимаю / хочу проверить. Сохрани один корректный кадр и способ его повторить.

<a id="shader"></a>

### 07. Научиться думать функциями

**Ветка:** optional · **Этап:** 2 · **Объём:** По урокам; обычно 15–40 ч

Предсказывать изображение по формуле и строить свою формулу по изображению.

**Предпосылки:** можно начать сразу.

#### 1. UV, цвет и градиент · 2–6 ч

- **Понять:** Почему нормализованные координаты легче для функций?
- **Читать:** Гл. 05, раздел о shaping functions; гл. 06, начало о цвете — [The Book of Shaders](https://thebookofshaders.com/).
- **Реализовать:** Нарисуй fullscreen UV и плавный горизонтальный градиент; выведи каналы R, G, B по отдельности.
- **Проверить:** Цвета меняются ожидаемо в центре и по краям.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 2. step, smoothstep и графики · 2–6 ч

- **Понять:** Что именно выдаёт функция в каждой точке x?
- **Читать:** Гл. 05: step, smoothstep, pow, sin (разделы по функциям) — [The Book of Shaders](https://thebookofshaders.com/).
- **Реализовать:** Выведи 4 кривые с plot(), отобрази маску полосы через разность smoothstep.
- **Проверить:** Объясни каждый порог и вычисли 3 значения вручную.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 3. mask, mix и две фигуры · 2–6 ч

- **Понять:** Почему маска — скаляр, а цвет — вектор?
- **Читать:** Гл. 07: Drawing Shapes (прямоугольник и окружность) — [The Book of Shaders](https://thebookofshaders.com/).
- **Реализовать:** Нарисуй прямоугольник и круг; смешай два цвета по маске и передвинь фигуры.
- **Проверить:** Фигуры не пропадают при resize, каждый вызов mix объясним.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 4. Поворот, масштаб, aspect ratio · 2–6 ч

- **Понять:** В чём отличие менять координаты от изменения цвета?
- **Читать:** Гл. 08: Matrices; гл. 09: Patterns (введение) — [The Book of Shaders](https://thebookofshaders.com/).
- **Реализовать:** Сделай функцию 2D rotation для st вокруг центра; нарисуй сетку и исправь aspect ratio.
- **Проверить:** Круг остаётся круглым при 16:9 и 4:3, геометрия вращается.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 5. SDF и мягкие края · 2–6 ч

- **Понять:** Как отрицательное и положительное расстояние задаёт внутреннюю область?
- **Читать:** Гл. 07: Distance to a Field; гл. 05: smoothstep (повтор) — [The Book of Shaders](https://thebookofshaders.com/).
- **Реализовать:** Реализуй signed distance до окружности и box, union и outline, сглаживание краёв.
- **Проверить:** При смещении и изменении толщины маска остаётся непрерывной.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 6. Шум без мистики · 2–6 ч

- **Понять:** Чем hash/random отличается от связного noise?
- **Читать:** Гл. 10: Generative Designs, гл. 11: Noise (вводные части) — [The Book of Shaders](https://thebookofshaders.com/).
- **Реализовать:** Нарисуй клеточный random и smooth noise, анимируй порог; fBm оставь как бонус.
- **Проверить:** На границах ячеек видно различие случайного и интерполированного поля.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 7. Мини-галерея своих шейдеров · 2–6 ч

- **Понять:** Как менять сложность без копирования чужого кода?
- **Читать:** Гл. 09–11: выбрать точные фрагменты под эффекты — [The Book of Shaders](https://thebookofshaders.com/).
- **Реализовать:** Сохрани 5 маленьких эффектов (градиент, полосы, круг, SDF, шум) и панель параметров.
- **Проверить:** Каждый эффект воспроизводим; 2 из 5 перезапиши с нуля.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 8. Эффект для LUX//PRISM · 2–6 ч

- **Понять:** Как сделать визуальную реакцию на попадание без нового движка?
- **Читать:** Конспект по своим маскам: smoothstep, distance, time.
- **Реализовать:** Перенеси одну маску в WGSL эффект выстрела/попадания с uniform времени.
- **Проверить:** Эффект включается по событию игры и отключается по завершении.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

**Итог блока:** Без готового шейдера собери композицию из 4 прямоугольников, круга и светящейся линии. Затем перенеси математику в WGSL.

<a id="cpu"></a>

### 08. C++ и данные под нагрузкой

**Ветка:** optional · **Этап:** 2 · **Объём:** По урокам; обычно 15–40 ч

Владеть временем жизни и объяснять цену CPU-кода. Можно проходить параллельно этапам света, по 1 сессии в неделю.

**Предпосылки:** [C++ для renderer: lifetime и ресурсы](#cpp-runtime).

#### 1. Владение CPU ресурсами · 2–6 ч

- **Понять:** Кто владеет CPU объектом, а кто только ссылается?
- **Читать:** Items 17–21: ownership и smart pointers — [Effective Modern C++](https://www.oreilly.com/library/view/effective-modern-c/9781491908419/).
- **Реализовать:** Нарисуй lifetime mesh/material/cache и убери dangling pointers на CPU.
- **Проверить:** Тест загрузить/удалить сцену 20 раз без ошибок и утечек.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 2. GPU lifetime и deferred destruction · 2–6 ч

- **Понять:** Почему нельзя освобождать буфер сразу после submit?
- **Читать:** Документация своего API о work done / fences — [Источник](https://www.w3.org/TR/webgpu/).
- **Реализовать:** Сделай очередь отложенного удаления resources после подтверждения завершения GPU-работы.
- **Проверить:** Нет use-after-free при быстром reload и resize.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 3. Layout и выравнивание · 2–6 ч

- **Понять:** Как stride, alignment и padding влияют на правильность?
- **Читать:** Гл. 2: representation; гл. 6: memory hierarchy по теме — [Computer Systems: A Programmer’s Perspective](https://csapp.cs.cmu.edu/3e/pieces/preface3e.pdf).
- **Реализовать:** Добавь static_assert размера uniform struct и тест packing/offsets.
- **Проверить:** CPU/GPU видят одинаковые поля и нет неинициализированных байтов.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 4. Контейнеры и паттерны доступа · 2–6 ч

- **Понять:** Чем SoA выигрывает у AoS в линейном проходе?
- **Читать:** Гл. 5: Optimizing Program Performance; гл. 6: Cache Memories — [Computer Systems: A Programmer’s Perspective](https://csapp.cs.cmu.edu/3e/pieces/preface3e.pdf).
- **Реализовать:** Сравни обработку 100k transforms AoS/SoA в Release с многократным прогоном.
- **Проверить:** Среднее и разброс замеров, сравнение при одинаковом алгоритме.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 5. Планомерный рефакторинг · 2–6 ч

- **Понять:** Где граница между renderer, asset cache и scene?
- **Читать:** Game Loop, Data Locality (выборочные главы) — [Game Programming Patterns](https://gameprogrammingpatterns.com/contents.html).
- **Реализовать:** Раздели загрузку модели, хранение данных и draw submission в коде viewer.
- **Проверить:** Новая модель добавляется без копирования render pass.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

**Итог блока:** Проверь ownership GPU-ресурсов; измерь обход AoS и SoA на реальных render items. Сохрани методику и результаты.

<a id="vulkan"></a>

### 14. Vulkan: ресурсы и синхронизация

**Ветка:** optional · **Этап:** 3 · **Объём:** По урокам; обычно 15–40 ч

Понимать явный API. Если ты уже идёшь по vkguide, продолжай небольшими сессиями; не переписывай весь viewer сразу.

**Предпосылки:** [HLSL / GLSL: инструменты и контракты шейдеров](#shader-toolchain), [Растеризация, глубина и численная устойчивость](#raster-depth).

#### 1. Instance, device и queue · 2–6 ч

- **Понять:** За что отвечают instance, physical device, logical device и queue family?
- **Читать:** Getting Started: Initialization + Vulkan core structure — [vkguide](https://vkguide.dev/).
- **Реализовать:** Подними окно с validation layers и выбранной queue; сохрани лог выбора GPU.
- **Проверить:** Можно объяснить каждое созданное handle и путь ошибок.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 2. Swapchain и первый кадр · 2–6 ч

- **Понять:** Кто владеет swapchain images и в каком порядке Acquire/Record/Submit/Present?
- **Читать:** Swapchain, dynamic rendering, command buffers — [vkguide](https://vkguide.dev/).
- **Реализовать:** Очисти swapchain image своим цветом, затем отрисуй треугольник.
- **Проверить:** Resize и закрытие без validation errors.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 3. Vertex/index buffers и staging · 2–6 ч

- **Понять:** Почему device-local буфер часто требует staging?
- **Читать:** Meshes, buffers / uploading data (по оглавлению версии) — [vkguide](https://vkguide.dev/).
- **Реализовать:** Перенеси куб/mesh через staging buffer; drawIndexed, depth test.
- **Проверить:** Валидация без ошибок, кадр повторяем.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 4. Descriptors и материалы · 2–6 ч

- **Понять:** Как shader получает данные без непосредственного CPU указателя?
- **Читать:** Descriptor sets, pipelines, textures — [vkguide](https://vkguide.dev/).
- **Реализовать:** Добавь camera uniform и текстуру, материал на 2 объекта.
- **Проверить:** На двух объектах разные данные, нет stale descriptors.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 5. Barriers и resource layout · 2–6 ч

- **Понять:** Почему stage/access зависят от producer и consumer?
- **Читать:** Synchronization2: Execution and Memory Dependencies — [Khronos Vulkan Guide](https://docs.vulkan.org/guide/latest/).
- **Реализовать:** Задокументируй 3 перехода render-target→sampled и transfer→shader-read через Sync2.
- **Проверить:** Sync validation чиста, объясняешь layout и stage/access обеих сторон.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 6. Frames in flight · 2–6 ч

- **Понять:** Чем fence отличается от semaphore и barrier?
- **Читать:** Synchronization: fences, binary semaphores, timeline semaphores — [Khronos Vulkan Guide](https://docs.vulkan.org/guide/latest/).
- **Реализовать:** 2 кадра in flight с собственными ресурсами per frame, без reuse до completion.
- **Проверить:** Нет ресурсов, используемых двумя незавершёнными кадрами.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 7. Самостоятельный мини-рендерер · 2–6 ч

- **Понять:** Что из гайда я могу написать без копирования?
- **Читать:** Итоговый пересмотр Resources / Render Loop — [vkguide](https://vkguide.dev/).
- **Реализовать:** Собери мини-сцену mesh+texture+depth+camera в отдельном репо; поясни 5 важных решений.
- **Проверить:** Сборка с нуля и скриншот независимой сцены + validation.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

**Итог блока:** Мини-рендерер Vulkan: textured mesh, depth, resize, upload; затем transfer → sampled texture и compute → draw с объяснёнными зависимостями.

<a id="gameplay"></a>

### 21. LUX//PRISM: первый играбельный прототип

**Ветка:** optional · **Этап:** 4 · **Объём:** По урокам; обычно 15–40 ч

Никакого универсального движка: сначала игра, лазеры, зеркала и небольшой tower defense loop.

**Предпосылки:** [Научиться думать функциями](#shader), [Координаты, камера и геометрия](#math).

#### 1. Первый играбельный цикл · 2–6 ч

- **Понять:** Как выглядит loop spawn→move→shoot→reset?
- **Читать:** Собственный прототип LUX//PRISM; минимальный design note.
- **Реализовать:** Отрисуй поле и один движущийся target; стреляет одна башня по фиксированной логике.
- **Проверить:** Демо запускается за 1 минуту и можно проиграть/перезапустить.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 2. Луч и точка пересечения · 2–6 ч

- **Понять:** Как найти ближайшее препятствие луча?
- **Читать:** Гл. 5: ray–plane, ray–AABB — [Real-Time Collision Detection](https://realtimecollisiondetection.net/books/rtcd/toc/).
- **Реализовать:** Реализуй 2D segment/ray intersections и renderer отрезка лазера.
- **Проверить:** Юнит-тесты попадание, промах, параллельность, попадание в конец.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 3. Отражение от зеркала · 2–6 ч

- **Понять:** Почему отражение сохраняет длину направления?
- **Читать:** Формула r=d−2 dot(d,n)n; краткий собственный вывод.
- **Реализовать:** Добавь поворотное зеркало и до 4 отражений луча с epsilon от самопопаданий.
- **Проверить:** Угол падения равен углу отражения, нет бесконечного цикла.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 4. Волны и экономика tower defense · 2–6 ч

- **Понять:** Где лежит состояние wave и зачем fixed step?
- **Читать:** Game Loop, State (по названию главы) — [Game Programming Patterns](https://gameprogrammingpatterns.com/contents.html).
- **Реализовать:** Сделай spawn нескольких врагов, HP базы, стоимость башни, restart, паузу.
- **Проверить:** Результаты повторяются при фиксированном seed/шаге; можно победить/проиграть.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 5. Читабельность визуального сигнала · 2–6 ч

- **Понять:** Что важнее игроку увидеть во время атаки?
- **Читать:** Гл. 05: shaping; гл. 07: masks — [The Book of Shaders](https://thebookofshaders.com/).
- **Реализовать:** Добавь короткую вспышку попадания и полосу HP поверх тёмной 2.5D сцены.
- **Проверить:** Враг, путь луча и зеркало различимы на обычном мониторе.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

**Итог блока:** Запускаемый пяти-минутный прототип с одной башней и зеркалом.

<a id="shadow"></a>

### 22. Тени и точность глубины

**Ветка:** optional · **Этап:** 4 · **Объём:** По урокам; обычно 15–40 ч

Отлаживать shadow maps через измерения и визуализацию промежуточных данных.

**Предпосылки:** [Свет, цвет и простое освещение](#light).

#### 1. Глубина из камеры света · 2–6 ч

- **Понять:** Что хранит depth texture теневого прохода?
- **Читать:** Гл. 7: Shadows, Shadow Mapping — [Real-Time Rendering](https://www.realtimerendering.com/).
- **Реализовать:** Сделай depth-only pass от directional light и визуализируй shadow texture.
- **Проверить:** Видно силуэт препятствия на карте глубины.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 2. Shadow test в основном проходе · 2–6 ч

- **Понять:** Какие матрицы переводят точку в пространство света?
- **Читать:** Гл. 7: Shadow Mapping, раздел сравнения глубин — [Real-Time Rendering](https://www.realtimerendering.com/).
- **Реализовать:** Спроецируй world position в light clip/UV и сравни глубину.
- **Проверить:** Объект отбрасывает тень на плоскость, не на самого себя из-за неверных матриц.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 3. Bias и peter-panning · 2–6 ч

- **Понять:** Почему bias лечит acne и создаёт detached shadow?
- **Читать:** Гл. 7: Biasing / shadow artifacts — [Real-Time Rendering](https://www.realtimerendering.com/).
- **Реализовать:** Выведи слайдер constant/slope bias и скрины acne и peter-panning.
- **Проверить:** Можешь воспроизвести оба дефекта и выбрать обоснованный диапазон.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 4. PCF и границы · 2–6 ч

- **Понять:** Чем PCF отличается от размытия готовой бинарной тени?
- **Читать:** Гл. 7: Percentage-Closer Filtering — [Real-Time Rendering](https://www.realtimerendering.com/).
- **Реализовать:** Добавь 3×3 PCF и корректное поведение за краями карты.
- **Проверить:** Сравни hard/soft, кадры не содержат ложных теней за frustum света.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 5. Стоимость shadow pass · 2–6 ч

- **Понять:** Почему большой shadow map не бесплатен?
- **Читать:** Документация GPU timestamp queries или профайлер своего API — [Источник](https://www.w3.org/TR/webgpu/).
- **Реализовать:** Измерь frame time при 512/1024/2048 и двух сценах.
- **Проверить:** Таблица время/разрешение/сцена и сформулированный компромисс.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

**Итог блока:** Directional shadow map + PCF. Переключатели bias/filter size; визуализация light frustum и depth map.

<a id="ibl"></a>

### 23. IBL, HDR и постобработка

**Ветка:** optional · **Этап:** 4 · **Объём:** По урокам; обычно 15–40 ч

Собрать цельный кадр с окружением и управляемым постпроцессом.

**Предпосылки:** [Материалы и PBR](#pbr).

#### 1. HDR framebuffer без потери диапазона · 2–6 ч

- **Понять:** Для чего float/half-float render target?
- **Читать:** Гл. 8: Light and Color, HDR imaging / tone reproduction — [Real-Time Rendering](https://www.realtimerendering.com/).
- **Реализовать:** Освети сцену значениями >1; выведи HDR-значение через debug и отключи принудительный clamp.
- **Проверить:** Яркие фрагменты не обрезаются до tone mapping.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 2. Tonemapping и exposure · 2–6 ч

- **Понять:** Почему экспозиция и tone mapping решают разные задачи?
- **Читать:** Filament: Tone Mapping + Exposure (разделы документа) — [Filament: Physically Based Rendering](https://google.github.io/filament/Filament.md.html).
- **Реализовать:** Добавь exposure и оператор ACES-like либо Reinhard; переключай режимы.
- **Проверить:** Один и тот же HDR input выводится предсказуемо на sRGB экран.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 3. Bloom как несколько проходов · 2–6 ч

- **Понять:** Почему нужно выделять bright pixels в linear HDR?
- **Читать:** Гл. 12: Image-Space Effects, Bloom — [Real-Time Rendering](https://www.realtimerendering.com/).
- **Реализовать:** Сделай bright-pass, downsample/blur и combine ДО tonemapping.
- **Проверить:** При выключении bloom исходный свет не меняется; нет переполнений.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 4. Environment lighting · 2–6 ч

- **Понять:** Чем diffuse irradiance отличается от зеркальной environment lookup?
- **Читать:** Гл. 10: Environment Lighting, environment maps обзор — [Real-Time Rendering](https://www.realtimerendering.com/).
- **Реализовать:** Сначала подключи environment cubemap как sky и reflection probe.
- **Проверить:** Камера/объект вращается, отражения меняются корректно.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 5. Prefilter и BRDF LUT · 2–6 ч

- **Понять:** Почему один LOD кубмапы не описывает все roughness?
- **Читать:** Filament: Image Based Lighting (diffuse/specular) — [Filament: Physically Based Rendering](https://google.github.io/filament/Filament.md.html).
- **Реализовать:** Добавь diffuse irradiance и roughness-based prefiltered specular + LUT или документированный аналог.
- **Проверить:** Сферы меняют характер отражений при росте roughness, сравни контрольные кадры.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 6. Viewer: первая демонстрационная сборка · 2–6 ч

- **Понять:** Может ли другой человек проверить готовые свет, материалы, тени и bloom?
- **Читать:** README своего Viewer; тестовая сцена.
- **Реализовать:** Зафиксируй scene + скрин before/after всех passes и простую инструкцию запуска.
- **Проверить:** Чистая сборка; кадр воспроизводится с фиксированным camera preset.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

**Итог блока:** Environment lighting + roughness-aware reflection; bloom с просмотром mip-chain; автоматическая экспозиция пока не обязательна.

<a id="compute"></a>

### 24. GPU-модель и parallel patterns

**Ветка:** optional · **Этап:** 4 · **Объём:** По урокам; обычно 15–40 ч

Понимать, как данные и синхронизация определяют цену compute-алгоритма.

**Предпосылки:** [Синхронизация и lifetime без queue-idle](#sync-lifetime), [GPU: исполнение, память и стоимость кадра](#gpu-hardware).

#### 1. Workgroup, invocation, dispatch · 2–6 ч

- **Понять:** Чем invocation отличается от workgroup и dispatch?
- **Читать:** Гл. 2: Heterogeneous Data Parallel Computing (концепции) — [Programming Massively Parallel Processors](https://shop.elsevier.com/books/programming-massively-parallel-processors/hwu/978-0-323-91231-0).
- **Реализовать:** WGSL compute заполняет storage buffer index/value с bounds guard.
- **Проверить:** Работает для 0, 1, 17 и 1025 элементов.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 2. Модель исполнения GPU · 2–6 ч

- **Понять:** Почему ветвления и память влияют на throughput?
- **Читать:** Гл. 3: Multidimensional Grids and Data — [Programming Massively Parallel Processors](https://shop.elsevier.com/books/programming-massively-parallel-processors/hwu/978-0-323-91231-0).
- **Реализовать:** Измерь несколько размеров workgroup для одного алгоритма.
- **Проверить:** Указываешь GPU/driver и измеренные значения; не обещаешь универсальный оптимум.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 3. Reduction: частичные суммы · 2–6 ч

- **Понять:** Почему reduction отличается от map и как избегать out-of-range?
- **Читать:** Гл. 4–5: parallel patterns / memory (по названию темы) — [Programming Massively Parallel Processors](https://shop.elsevier.com/books/programming-massively-parallel-processors/hwu/978-0-323-91231-0).
- **Реализовать:** Реализуй min/max или sum массива на GPU с несколькими workgroups.
- **Проверить:** Сравнение с CPU reference на случайных длинах.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 4. Workgroup barriers · 2–6 ч

- **Понять:** Почему нельзя ставить barrier в ветку, не достижимую всеми invocations?
- **Читать:** Гл. о shared memory и synchronization (в твоём издании — по теме) — [Programming Massively Parallel Processors](https://shop.elsevier.com/books/programming-massively-parallel-processors/hwu/978-0-323-91231-0).
- **Реализовать:** Напиши tiled вычисление или reduction через workgroup memory и barrier.
- **Проверить:** Проверь несколько размеров и код для дивергентного barrier не используй.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 5. Buffer→texture: GPU частицы · 2–6 ч

- **Понять:** Как разделить update и render через общий buffer?
- **Читать:** WebGPU compute examples + данные shader buffer — [Источник](https://webgpu.github.io/webgpu-samples/).
- **Реализовать:** Compute обновляет 10k particles; vertex/fragment рисуют их, FPS счётчик.
- **Проверить:** Нет data race, частицы детерминированны при фиксированном seed.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 6. Профиль GPU алгоритма · 2–6 ч

- **Понять:** Что ограничивает частоту: bandwidth или arithmetic?
- **Читать:** Главы о memory throughput / optimization (выборочно) — [Programming Massively Parallel Processors](https://webgpu.github.io/webgpu-samples/).
- **Реализовать:** Измени layout и размер workgroup, добавь timing.
- **Проверить:** Таблица времени/количества частиц и контроль правильности.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

**Итог блока:** GPU particles: compaction живых частиц и indirect draw. До него — отдельные reduction и prefix scan с CPU-reference.

<a id="scale"></a>

### 30. Видимость, структуры и профилирование

**Ветка:** optional · **Этап:** 5 · **Объём:** По урокам; обычно 15–40 ч

Знать, какая часть кадра ограничивает производительность, и не отправлять невидимую работу.

**Предпосылки:** [Сцена: mesh, submesh, material](#scene), [GPU: исполнение, память и стоимость кадра](#gpu-hardware).

#### 1. Frustum plane tests · 2–6 ч

- **Понять:** Как проверить сферу/AABB относительно 6 плоскостей?
- **Читать:** Гл. 5: plane tests; гл. 4: bounding volumes — [Real-Time Collision Detection](https://realtimecollisiondetection.net/books/rtcd/toc/).
- **Реализовать:** Напиши CPU frustum culling и тесты на границе, внутри и вне.
- **Проверить:** При выключении culling все объекты снова рисуются; нет ложных пропусков.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 2. Instancing против многократных draw · 2–6 ч

- **Понять:** Когда один instanced draw дешевле сотни draw calls?
- **Читать:** Гл. 18: Pipeline Optimization, batching/instancing — [Real-Time Rendering](https://www.realtimerendering.com/).
- **Реализовать:** Отрисуй 100/1000 кубов отдельными draw и через instance buffer.
- **Проверить:** Есть счётчик draw calls и сравнение CPU frame time.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 3. Пространственные структуры · 2–6 ч

- **Понять:** Почему BVH быстрее полного перебора при большинстве лучей?
- **Читать:** Гл. 6: Bounding Volume Hierarchies (концепция построения/обхода) — [Real-Time Collision Detection](https://realtimecollisiondetection.net/books/rtcd/toc/).
- **Реализовать:** Сделай простое median-split BVH на CPU для ray picking.
- **Проверить:** Результат совпадает с brute force на 100 случайных лучах.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 4. Первое профилирование CPU · 2–6 ч

- **Понять:** Как отличить slow update и expensive submission?
- **Читать:** Гл. 5: Measurement / profiling portions — [Computer Systems: A Programmer’s Perspective](https://csapp.cs.cmu.edu/3e/pieces/preface3e.pdf).
- **Реализовать:** Поставь timers на update/render/submit, измерь разные количества объектов.
- **Проверить:** Таблица разрешение/число объектов/CPU update/CPU render.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 5. Первое профилирование GPU · 2–6 ч

- **Понять:** Почему CPU-время submit не равно GPU frame time?
- **Читать:** RenderDoc timing для анализа структуры; для времени GPU используй timestamp queries или GPU profiler — [Источник](https://www.w3.org/TR/webgpu/).
- **Реализовать:** Добавь GPU timestamp для passes (при поддержке); покажи итоговые CPU/GPU времена.
- **Проверить:** Различаешь bottleneck по измерениям, не по догадке.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 6. Оптимизация с доказательством · 2–6 ч

- **Понять:** Почему измерять надо одинаковые камеры, сцены и сборки?
- **Читать:** Гл. 18: Performance and Optimization (выбранные разделы) — [Real-Time Rendering](https://www.realtimerendering.com/).
- **Реализовать:** Сформулируй гипотезу, измени один фактор, измерь минимум 20 кадров до/после.
- **Проверить:** Отчёт: гипотеза, метод, график и честный вывод (в том числе если хуже).
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

**Итог блока:** Сцена с 10 000 экземплярами: baseline → culling → instancing. Отчёт в ms, draw counts и память; сравни несколько ракурсов.

<a id="animation"></a>

### 31. Анимация и деформация

**Ветка:** optional · **Этап:** 5 · **Объём:** По урокам; обычно 15–40 ч

Понимать путь от keyframes и позы до преобразованной вершины.

**Предпосылки:** [Сцена: mesh, submesh, material](#scene).

#### 1. Keyframes и интерполяция · 2–6 ч

- **Понять:** Как вычислить transform между двумя ключами?
- **Читать:** glTF Tutorial: Animations, Animation Samplers — [Khronos glTF Tutorial](https://github.khronos.org/glTF-Tutorials/gltfTutorial/).
- **Реализовать:** Сделай простую translate/rotation анимацию node без skeleton.
- **Проверить:** На t=0 и t=end получаются точные исходные keyframes.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 2. Skeleton joints и bind pose · 2–6 ч

- **Понять:** Почему inverseBindMatrix необходима для skinning?
- **Читать:** glTF Tutorial: Skins and Skeletons — [Khronos glTF Tutorial](https://github.khronos.org/glTF-Tutorials/gltfTutorial/).
- **Реализовать:** Загрузите joint hierarchy и зафиксируй bind-pose matrix для одного сустава.
- **Проверить:** В bind pose меш совпадает с исходной геометрией.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 3. Linear blend skinning · 2–6 ч

- **Понять:** В каком порядке применяются joint matrices и веса?
- **Читать:** 3-е изд., гл. 12: Skeletal Animation, skinning sections — [Game Engine Architecture](https://www.gameenginebook.com/toc.html).
- **Реализовать:** Добавь skinning вершин на GPU с 4 influences и нормализацией weights.
- **Проверить:** При вращении сустава деформация непрерывна, нет NaN.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 4. Тест сложной анимации · 2–6 ч

- **Понять:** Что происходит при pause/restart и смене интерполяции?
- **Читать:** glTF Tutorial: Animations + Skins (практические примеры) — [Khronos glTF Tutorial](https://github.khronos.org/glTF-Tutorials/gltfTutorial/).
- **Реализовать:** Добавь play/pause, scrub timeline и визуализацию joints.
- **Проверить:** Смена анимаций не рвёт transform hierarchy.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

**Итог блока:** Animated glTF с skeleton debug draw, pause/seek и blend двух клипов.

<a id="manylights"></a>

### 32. Много источников и организация shading

**Ветка:** optional · **Этап:** 5 · **Объём:** По урокам; обычно 15–40 ч

Выбирать forward/deferred/clustered исходя из сцены, прозрачности и бюджета.

**Предпосылки:** [GPU-модель и parallel patterns](#compute), [Материалы и PBR](#pbr).

#### 1. Ценность many-lights · 2–6 ч

- **Понять:** Почему forward сложен при 1000 источников?
- **Читать:** Гл. 20: Beyond the Graphics Pipeline, Deferred Shading обзор — [Real-Time Rendering](https://www.realtimerendering.com/).
- **Реализовать:** Добавь 32–128 lights на одной сцене, построй baseline CPU/GPU timings.
- **Проверить:** Измерена точка, где naive forward замедляется.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 2. G-buffer и deferred shading · 2–6 ч

- **Понять:** Зачем сохранять normals/depth/material и какой bandwidth overhead?
- **Читать:** Гл. 20: Deferred Shading, основной алгоритм — [Real-Time Rendering](https://www.realtimerendering.com/).
- **Реализовать:** Реализуй G-buffer из 3 attachments + fullscreen lighting pass.
- **Проверить:** Сравни визуально с forward на той же сцене.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 3. Tiles или clusters · 2–6 ч

- **Понять:** Как ограничить число lights на пиксель?
- **Читать:** Гл. 20: Tiled and Clustered Shading — [Real-Time Rendering](https://www.realtimerendering.com/).
- **Реализовать:** Построй экранные tiles и light index list с пределом ёмкости.
- **Проверить:** Переполнение обнаруживается, а не портит память.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 4. Сравнение и выбор · 2–6 ч

- **Понять:** Где Deferred проигрывает из-за transparency и memory?
- **Читать:** Собственный benchmark, reference кадр.
- **Реализовать:** Сравни forward/deferred и объём G-buffer при одинаковых lights.
- **Проверить:** Таблица quality/performance/memory с объяснением.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

**Итог блока:** Сравнение простого forward, deferred и clustered-варианта на нескольких сценах; хотя бы два реализованы, третий разобран.

<a id="temporal"></a>

### 33. Temporal rendering и качество

**Ветка:** optional · **Этап:** 5 · **Объём:** По урокам; обычно 15–40 ч

Понимать историю кадра, reprojection и причины временных артефактов.

**Предпосылки:** [IBL, HDR и постобработка](#ibl).

#### 1. Jitter и subpixel sampling · 2–6 ч

- **Понять:** Почему один пиксель за кадр не знает под-pixel информацию?
- **Читать:** Гл. 12: Image-Space Effects / Antialiasing (введение) — [Real-Time Rendering](https://www.realtimerendering.com/).
- **Реализовать:** Добавь субпиксельный jitter к projection и режим 4x supersampling reference.
- **Проверить:** При статичной сцене сохраняется правильное центральное положение.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 2. Motion vectors и reprojection · 2–6 ч

- **Понять:** Почему нужны previous frame matrices и пространство motion vectors?
- **Читать:** Temporal Anti-Aliasing: reprojection and history concepts — [Обзор temporal antialiasing](https://research.nvidia.com/labs/rtr/publication/yang2020survey/).
- **Реализовать:** Выведи motion vectors в debug view при движении камеры и объекта.
- **Проверить:** В покое почти нули, при движении направление ожидаемо.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 3. History accumulation · 2–6 ч

- **Понять:** Как аккумулировать без размазывания disocclusion?
- **Читать:** Temporal Anti-Aliasing: accumulation/history rejection — [Обзор temporal antialiasing](https://research.nvidia.com/labs/rtr/publication/yang2020survey/).
- **Реализовать:** Реализуй простую накопительную историю с rejection по depth и neighborhood clamp.
- **Проверить:** Сравнение на движущейся сцене и ghosting debug.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 4. Качество и артефакты · 2–6 ч

- **Понять:** Почему убранный shimmering может стоить blur и ghosting?
- **Читать:** Temporal AA: artifacts/trade-offs — [Обзор temporal antialiasing](https://research.nvidia.com/labs/rtr/publication/yang2020survey/).
- **Реализовать:** Сделай набор видео: no TAA / TAA / supersampled reference.
- **Проверить:** Назови 3 дефекта и конкретные причины, не только FPS.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

**Итог блока:** TAA с визуализацией motion vectors/history weight; сцены с движением камеры, тонкой геометрией и появлением объекта.

<a id="architecture"></a>

### 34. Архитектура кадра и параллелизм

**Ветка:** optional · **Этап:** 5 · **Объём:** По урокам; обычно 15–40 ч

Управлять зависимостями проходов, ресурсами и CPU-задачами без потери наблюдаемости.

**Предпосылки:** [Тени и точность глубины](#shadow), [IBL, HDR и постобработка](#ibl), [C++ и данные под нагрузкой](#cpu).

#### 1. Карта зависимостей проходов · 2–6 ч

- **Понять:** Почему порядок проходов — это отношения чтение/запись, а не случайная последовательность?
- **Читать:** Свой Viewer: draw calls, render targets и lifetime.
- **Реализовать:** Нарисуй DAG shadow → geometry → HDR → bloom → present и используемые textures.
- **Проверить:** Никакой pass не читает ещё не записанный target.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 2. Resources и resize · 2–6 ч

- **Понять:** Кто пересоздаёт render targets и что происходит с in-flight кадрами?
- **Читать:** Гл. 7–8: resource management / rendering engine (по теме) — [Game Engine Architecture](https://www.gameenginebook.com/toc.html).
- **Реализовать:** Введи явный lifecycle create/resize/destroy и тест 50 быстрых resize.
- **Проверить:** Нет leaks, use-after-free и заметного мерцания при resize.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 3. Job system: смысл до потоков · 2–6 ч

- **Понять:** Какие CPU задачи можно параллелить независимо от GPU submission?
- **Читать:** Гл. 26–28: Concurrency, Threads, Locks — [Operating Systems: Three Easy Pieces](https://pages.cs.wisc.edu/~remzi/OSTEP/).
- **Реализовать:** Распараллель CPU scene-update по чанкам, без shared mutable writes.
- **Проверить:** В ThreadSanitizer или эквивалентной проверке нет races.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 4. Маленький task graph · 2–6 ч

- **Понять:** Что значит dependency между двумя jobs?
- **Читать:** Гл. 29–32: lock-based concurrent data structures, condition variables (по теме) — [Operating Systems: Three Easy Pieces](https://pages.cs.wisc.edu/~remzi/OSTEP/).
- **Реализовать:** Реализуй 3 задачи с зависимостями: load → prepare → draw data; сравни serial.
- **Проверить:** Зависимости не нарушаются на многократном запуске.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 5. Проверяемая архитектура · 2–6 ч

- **Понять:** Как обосновать новый слой без «на всякий случай»?
- **Читать:** README и схема своих ресурсов.
- **Реализовать:** Убери лишние абстракции, добавь 2 теста жизненного цикла и карту владельцев.
- **Проверить:** Новый render pass добавляется без изменения всех существующих систем.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

**Итог блока:** Опиши входы/выходы 4 реальных pass; добавь dependency validation. Параллельно готовь draw data и проверь результат относительно одного потока.

<a id="transport"></a>

### 42. Monte Carlo и light transport

**Ветка:** optional · **Этап:** 6 · **Объём:** По урокам; обычно 15–40 ч

Получить надёжную теоретическую базу для GI и ray tracing.

**Предпосылки:** [Материалы и PBR](#pbr), [Координаты, камера и геометрия](#math).

#### 1. CPU ray → hit · 2–6 ч

- **Понять:** Зачем ray(o,d) и диапазон t_min/t_max?
- **Читать:** Разделы The Ray Class, Sphere Intersection, Surface Normals — [Ray Tracing in One Weekend](https://raytracing.github.io/books/RayTracingInOneWeekend.html).
- **Реализовать:** Свой CPU tracer: сферы, normal visualization и ray color.
- **Проверить:** Контрольные пиксели и пересечения сравниваются с аналитикой.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 2. Камера и отражение · 2–6 ч

- **Понять:** Как порождать лучи и отражать направление?
- **Читать:** Разделы Antialiasing, Camera, Diffuse Materials, Metal — [Ray Tracing in One Weekend](https://raytracing.github.io/books/RayTracingInOneWeekend.html).
- **Реализовать:** Добавь camera+Lambert scatter+metal; выводи PPM/PNG.
- **Проверить:** Контроль фиксированного seed и ожидаемая зависимость от roughness.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 3. BRDF и базовый path tracing · 2–6 ч

- **Понять:** Почему следующий луч выбирается случайно?
- **Читать:** Разделы Dielectrics, Defocus Blur; финальные примеры — [Ray Tracing in One Weekend](https://raytracing.github.io/books/RayTracingInOneWeekend.html).
- **Реализовать:** Сделай bounce loop c russian roulette после нескольких отскоков.
- **Проверить:** Результат с 1/16/256 samples предсказуемо становится стабильнее.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 4. PDF и Monte Carlo · 2–6 ч

- **Понять:** Почему вес sample равен f(x)/p(x)?
- **Читать:** Разделы Monte Carlo Integration, PDFs, Importance Sampling — [Ray Tracing: The Rest of Your Life](https://raytracing.github.io/books/RayTracingTheRestOfYourLife.html).
- **Реализовать:** Реализуй importance sampling hemisphere/area light на одной сцене.
- **Проверить:** PDF нормализована, есть сравнение с uniform sampling.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 5. Ускоряющая структура · 2–6 ч

- **Понять:** Почему BVH уменьшает число тестов пересечения?
- **Читать:** Разделы Bounding Volume Hierarchies — [Ray Tracing: The Next Week](https://raytracing.github.io/books/RayTracingTheNextWeek.html).
- **Реализовать:** Переведи CPU tracer на BVH со счётчиком ray/primitive tests.
- **Проверить:** Кадры совпадают с brute force, тестов меньше.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 6. Reference и честная метрика · 2–6 ч

- **Понять:** Как оценивать шум без доверия одному seed?
- **Читать:** Гл. 13: Monte Carlo Integration; § про integrators (выборочно) — [Physically Based Rendering](https://www.pbr-book.org/4ed/contents).
- **Реализовать:** Сравни 4 seeds, вычисли MAE/RMSE против reference и записывай runtime.
- **Проверить:** Есть таблица ошибка/spp/сек, вывод корректен для выбранных сцен.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

**Итог блока:** Небольшой CPU path tracer: diffuse + GGX, area light, BVH. Сравнение равномерной и importance sampling при одинаковом числе лучей.

<a id="craft"></a>

### 43. Инженерная работа с рендерером

**Ветка:** optional · **Этап:** 6 · **Объём:** По урокам; обычно 15–40 ч

Делать изменения, которые можно проверить, воспроизвести и поддерживать вместе с другими.

**Предпосылки:** [Видимость, структуры и профилирование](#scale), [Архитектура кадра и параллелизм](#architecture).

#### 1. Reference scenes и визуальный регресс · 2–6 ч

- **Понять:** Как отличить regression от освещения другой сцены?
- **Читать:** Свой исходный Viewer, screenshots & scenes.
- **Реализовать:** Зафиксируй 3 scenes (matte, metal, stress) и сравнимые camera presets.
- **Проверить:** Before/after скрины совпадают при одной версии.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 2. Воспроизводимый benchmark · 2–6 ч

- **Понять:** Почему FPS одного кадра не является доказательством оптимизации?
- **Читать:** Гл. 18: Optimization, methodology (выборочно) — [Real-Time Rendering](https://www.realtimerendering.com/).
- **Реализовать:** Запиши GPU/CPU median/p95, настройки, разрешение и GPU hardware.
- **Проверить:** Отчёт позволяет другому запустить аналогичный тест.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 3. README и быстрый запуск · 2–6 ч

- **Понять:** Может ли незнакомый разработчик собрать за ограниченное количество действий?
- **Читать:** README, CI pipeline и install instructions — [Источник](https://docs.github.com/en/actions).
- **Реализовать:** Убери локальные абсолютные пути, напиши prerequisites и demo steps.
- **Проверить:** Clean clone/build/run подтверждён отдельно; 3 GIF/screenshot.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 4. Внятное объяснение решений · 2–6 ч

- **Понять:** Почему выбран WebGPU/Vulkan и каков компромисс?
- **Читать:** Design notes / postmortem к своему renderer.
- **Реализовать:** Напиши краткий case study 1–2 страниц: задача, ограничения, решение, измерения.
- **Проверить:** Есть ссылки на код, кадры, проблемы и альтернативы.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 5. Подготовка вертикального среза · 2–6 ч

- **Понять:** Где главный игровой loop и конкретный контент?
- **Читать:** Документ уровня игры и текущая играбельная сборка.
- **Реализовать:** Соедини одну волну, одну башню, отражающий луч, проигрыш/победу и меню Restart.
- **Проверить:** Другой человек проходит 5-минутное демо без разработчика рядом.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

**Итог блока:** Выпусти Viewer 1.0: 5 тестовых сцен, reproducible capture, performance report, README и ограничения. Один эффект доведи до пригодности в LUX//PRISM.

<a id="release"></a>

### 44. LUX//PRISM: вертикальный срез и выпуск

**Ветка:** optional · **Этап:** 6 · **Объём:** По урокам; обычно 15–40 ч

Закончить небольшой игровой цикл, провести тесты и отдельно подготовить выпуск.

**Предпосылки:** [LUX//PRISM: первый играбельный прототип](#gameplay).

#### 1. Маленький контентный срез · 2–6 ч

- **Понять:** Что можно закончить, не создавая универсальный движок?
- **Читать:** Своя концепция LUX//PRISM и список must-have функций.
- **Реализовать:** Сделай 1 карту, 3 волны, 2 башни, 2 типа врагов, 1 зеркало и win/lose screen.
- **Проверить:** Прототип играбелен с нуля без dev-консоли.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 2. UX и управление · 2–6 ч

- **Понять:** Где игрок запутался в выборе/вращении зеркала?
- **Читать:** Собственный playtest checklist.
- **Реализовать:** Добавь hover, preview placement, feedback invalid placement, restart.
- **Проверить:** Незнакомый игрок может поставить башню без объяснения.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 3. Демо для тестирования · 2–6 ч

- **Понять:** Что должно работать без IDE и специальных путей?
- **Читать:** Steamworks / официальные требования магазина — только если планируется публикация — [Источник](https://partner.steamgames.com/doc/home).
- **Реализовать:** Собери релизную сборку, сделай crash/error log и проведи 3 playtests.
- **Проверить:** Результаты тестов записаны, критические ошибки устранены.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

#### 4. Публикация как отдельная цель · 2–6 ч

- **Понять:** Какие обязательства и страницы нужны, прежде чем нажать Publish?
- **Читать:** Steamworks documentation по актуальным требованиям на момент выпуска — [Источник](https://partner.steamgames.com/doc/gettingstarted).
- **Реализовать:** Подготовь build, store assets, описание и финальный checklist; публикуй только когда сам решишь.
- **Проверить:** Сборка протестирована, список блокеров пуст; статус Steam не отмечай без реального выпуска.
- [ ] Могу объяснить без подсказки.
- [ ] Реализовал и проверил; evidence сохранено.

**Итог блока:** Компактное играбельное демо и понятный чеклист выпуска.

## Проекты для портфолио

Рекомендуемый набор: Rendering Lab + visibility, temporal, lighting, performance либо UE под соответствующую вакансию. Все восемь делать не требуется. Время проекта пересекается со временем уроков: не складывай часы механически.

### C++ Rendering Lab

Главный проект · 160–320 ч с базовой инфраструктурой

Свой небольшой renderer на D3D12 или Vulkan. Единая база для большинства уроков и главный репозиторий в портфолио.

**Предпосылки:** [C++ для renderer: lifetime и ресурсы](#cpp-runtime), [Синхронизация и lifetime без queue-idle](#sync-lifetime), [Image-based lighting и проверка BRDF](#ibl-lab), [Устойчивые тени и CSM](#shadow-lab), [Разбор кадра и поиск rendering bugs](#frame-debug), [Качество, инструменты художника и релиз](#shipping).

**Минимум:**

- [ ] Один современный API, frames in flight, корректный lifetime и validation; никаких queue-idle на каждый кадр.
- [ ] glTF meshes/materials, camera, depth, linear HDR, PBR, normal mapping и debug views.
- [ ] IBL, shadow mapping и tone mapping; material/sphere test scenes.

**Сильная версия:**

- [ ] Стабильные CSM с cascade debug, настройки качества и стресс-сцены.
- [ ] IBL bake + BRDF LUT; white furnace и многосэмпловый reference.
- [ ] GPU/CPU markers, CSV benchmark и расследование одного bottleneck с before/after.
- [ ] Resource management, shader hot reload с восстановлением после ошибки; работа при resize.
- [ ] Хотя бы одна развитая подсистема: TAA, clustered lighting, GPU culling или render graph.

**Общее качество — обязательно:**

- [ ] Репозиторий: чистая Release сборка по README, версии SDK, зависимости и лицензии assets.
- [ ] Demo: 2–3 минуты видео, воспроизводимая сцена и debug views; собственный вклад отделён от библиотек.
- [ ] Benchmark: GPU/CPU, driver, resolution, settings, VSync, warm-up, camera path; median/p95 и несколько прогонов.
- [ ] Корректность: reference/A-B сравнение, edge cases, validation, regression checks и известные ограничения.
- [ ] Разбор: архитектура, commits, причины решений, неудачный эксперимент и следующие ограничения.

**Необязательное развитие:**

- Второй API после завершения первого; таблица различий синхронизации.
- Asset cooking/streaming, memory budget или cross-vendor validation.

**Чего недостаточно:** Загруженная Sponza и набор скопированных эффектов без измерений, edge cases и объяснения решений не закрывают проект.

**Демонстрация:** Показать сцену → debug buffers → quality toggles → capture → performance breakdown.

**Источники:** [DirectX Graphics Samples / MiniEngine](https://github.com/microsoft/DirectX-Graphics-Samples), [vkguide](https://vkguide.dev/), [Filament: Physically Based Rendering](https://google.github.io/filament/Filament.md.html).

### GPU-driven Scene Stress Lab

Глубина / visibility · 45–90 ч поверх renderer

Управляемая сцена с большим числом объектов: доказать масштабирование и корректность GPU culling.

**Предпосылки:** [Visibility, LOD и GPU-driven rendering](#visibility), [Compute: данные, группы и параллельные алгоритмы](#compute-lab), [Разбор кадра и поиск rendering bugs](#frame-debug).

**Минимум:**

- [ ] CPU frustum culling и no-culling reference; фиксированный seed и camera path.
- [ ] Compute visibility + compaction + indirect draw; overflow/capability handling.

**Сильная версия:**

- [ ] Hi-Z с корректным depth reduction для выбранной Z-конвенции.
- [ ] LOD по screen-space error с hysteresis; debug bounds и visibility.
- [ ] Camera cuts, near-plane и быстрые повороты не дают false occlusion в тестах.
- [ ] Sweep числа instances; отдельно CPU submit, GPU culling, geometry и VRAM.
- [ ] Сравнение CPU/GPU/no-cull, включая сцену, где GPU culling проигрывает.

**Общее качество — обязательно:**

- [ ] Репозиторий: чистая Release сборка по README, версии SDK, зависимости и лицензии assets.
- [ ] Demo: 2–3 минуты видео, воспроизводимая сцена и debug views; собственный вклад отделён от библиотек.
- [ ] Benchmark: GPU/CPU, driver, resolution, settings, VSync, warm-up, camera path; median/p95 и несколько прогонов.
- [ ] Корректность: reference/A-B сравнение, edge cases, validation, regression checks и известные ограничения.
- [ ] Разбор: архитектура, commits, причины решений, неудачный эксперимент и следующие ограничения.

**Необязательное развитие:**

- Meshlets/mesh shaders при доступной hardware; fallback обязателен.

**Чего недостаточно:** Количество объектов или высокий FPS без сопоставимого baseline не доказывают оптимизацию.

**Демонстрация:** Visibility heatmap → camera stress → сравнение трёх режимов и графики.

**Источники:** [GPU Driven Rendering in Trials Rising — GDC](https://media.gdcvault.com/gdc2019/presentations/Drazhevskyi_Oleksandr_GPU_Driven_Rendering.pdf), [meshoptimizer](https://github.com/zeux/meshoptimizer), [Khronos Vulkan Samples](https://github.com/KhronosGroup/Vulkan-Samples).

### Temporal Reconstruction Lab

Глубина / качество · 40–80 ч поверх renderer

Motion vectors, TAA и контролируемый разбор временных артефактов.

**Предпосылки:** [Temporal rendering: motion, TAA и история](#temporal-lab), [Разбор кадра и поиск rendering bugs](#frame-debug).

**Минимум:**

- [ ] Velocity для камеры и объектов, jitter, history reprojection и camera cut reset.
- [ ] No-AA baseline, static scene и движущийся occluder; запись одного camera path.

**Сильная версия:**

- [ ] Disocclusion rejection и neighborhood clipping с debug views.
- [ ] Тесты тонкой геометрии, emissive, exposure, прозрачности и resize.
- [ ] Видео сравнения с reference, ghosting/trailing и stability; одинаковые настройки.
- [ ] Timing и memory history; sweep веса history/качества с объяснением компромисса.
- [ ] Regression camera sequences и разбор неудачного варианта алгоритма.

**Общее качество — обязательно:**

- [ ] Репозиторий: чистая Release сборка по README, версии SDK, зависимости и лицензии assets.
- [ ] Demo: 2–3 минуты видео, воспроизводимая сцена и debug views; собственный вклад отделён от библиотек.
- [ ] Benchmark: GPU/CPU, driver, resolution, settings, VSync, warm-up, camera path; median/p95 и несколько прогонов.
- [ ] Корректность: reference/A-B сравнение, edge cases, validation, regression checks и известные ограничения.
- [ ] Разбор: архитектура, commits, причины решений, неудачный эксперимент и следующие ограничения.

**Необязательное развитие:**

- Temporal upsampling в меньшем internal resolution; quality/cost comparison.

**Чего недостаточно:** Подключённый готовый upscaler без самостоятельного temporal baseline недостаточен.

**Демонстрация:** Velocity → history rejection → side-by-side video → стоимость и ограничения.

**Источники:** [Обзор temporal antialiasing](https://research.nvidia.com/labs/rtr/publication/yang2020survey/), [Advances in Real-Time Rendering — доклады и видео](https://advances.realtimerendering.com/).

### Unreal Rendering Feature

Большая кодовая база · 35–70 ч

Самостоятельная rendering feature как plugin с RDG pass, диагностикой и измерениями.

**Предпосылки:** [Unreal Engine: rendering feature в большой кодовой базе](#ue-rendering), [Разбор кадра и поиск rendering bugs](#frame-debug).

**Минимум:**

- [ ] Plugin с global shader и RDG pass; явные inputs/outputs и параметры.
- [ ] Effect toggle, baseline и воспроизводимая сцена; версия UE и hardware указаны.

**Сильная версия:**

- [ ] Обработка разных resolutions, viewport bounds, resize и packaged run.
- [ ] RenderDoc/PIX capture с объяснением нового прохода и ресурсов.
- [ ] CPU/GPU before/after; бюджет и quality tiers.
- [ ] Art-facing параметры, безопасные диапазоны и debug visualization.
- [ ] Integration note: threading, lifetime, limitations; чужой engine code не опубликован.

**Общее качество — обязательно:**

- [ ] Репозиторий: чистая Release сборка по README, версии SDK, зависимости и лицензии assets.
- [ ] Demo: 2–3 минуты видео, воспроизводимая сцена и debug views; собственный вклад отделён от библиотек.
- [ ] Benchmark: GPU/CPU, driver, resolution, settings, VSync, warm-up, camera path; median/p95 и несколько прогонов.
- [ ] Корректность: reference/A-B сравнение, edge cases, validation, regression checks и известные ограничения.
- [ ] Разбор: архитектура, commits, причины решений, неудачный эксперимент и следующие ограничения.

**Необязательное развитие:**

- Патч реальной rendering ошибки с regression reproduction.

**Чего недостаточно:** Материал из нод, Blueprint или смена готовой настройки сами по себе не показывают engine graphics programming.

**Демонстрация:** Plugin → исходный pass → RDG graph/capture → A/B и timing.

**Источники:** [Epic: Render Dependency Graph](https://dev.epicgames.com/documentation/en-us/unreal-engine/render-dependency-graph-in-unreal-engine), [PIX on Windows](https://devblogs.microsoft.com/pix/documentation/).

### Clustered Lighting Benchmark

Глубина / lighting · 35–65 ч поверх renderer

Система множества источников света с честной оценкой качества и стоимости.

**Предпосылки:** [Много источников света: tiled / clustered](#clustered), [Image-based lighting и проверка BRDF](#ibl-lab), [Compute: данные, группы и параллельные алгоритмы](#compute-lab).

**Минимум:**

- [ ] Brute-force reference и tiled либо clustered light assignment.
- [ ] Light-list heatmap, capacity/overflow handling и контрольные сцены.

**Сильная версия:**

- [ ] Logarithmic Z slicing и корректные cluster boundaries.
- [ ] Transparency получает консервативно корректные light lists.
- [ ] Scenes с разрывами depth и перекрывающимися lights.
- [ ] Sweep light counts/resolution; list-building и shading измерены отдельно.
- [ ] Память списков и worst-case latency; нет readback stalls в hot path.

**Общее качество — обязательно:**

- [ ] Репозиторий: чистая Release сборка по README, версии SDK, зависимости и лицензии assets.
- [ ] Demo: 2–3 минуты видео, воспроизводимая сцена и debug views; собственный вклад отделён от библиотек.
- [ ] Benchmark: GPU/CPU, driver, resolution, settings, VSync, warm-up, camera path; median/p95 и несколько прогонов.
- [ ] Корректность: reference/A-B сравнение, edge cases, validation, regression checks и известные ограничения.
- [ ] Разбор: архитектура, commits, причины решений, неудачный эксперимент и следующие ограничения.

**Необязательное развитие:**

- Area lights/LTC после проверки базового assignment.

**Чего недостаточно:** Тысяча lights без проверки совпадения с reference и overflow — незаконченная система.

**Демонстрация:** Reference difference → clusters → worst case → scaling curves.

**Источники:** [Clustered Deferred and Forward Shading](https://research.chalmers.se/en/publication/161725), [Real-Time Rendering](https://www.realtimerendering.com/).

### Reference Path Tracer

Глубина / light transport · 60–120 ч

CPU или GPU path tracer как reference для shading и демонстрация вероятностных методов.

**Предпосылки:** [Ray tracing: CPU reference и hybrid GPU](#ray-lab), [Координаты, камера и геометрия](#math), [Материалы и PBR](#pbr).

**Минимум:**

- [ ] Triangle scenes, BVH, diffuse/GGX, emissive lights и воспроизводимые seeds.
- [ ] Сравнение BVH с brute force на randomized rays; простые analytic scenes.

**Сильная версия:**

- [ ] NEE + MIS с корректными pdf/measure и без double counting.
- [ ] Variance/convergence study на нескольких seeds, sample counts и sampling strategies.
- [ ] Energy tests, NaN/Inf guard и documented ray offset policy.
- [ ] Build/traversal/render timings и memory отдельно.
- [ ] Images + собственное объяснение BSDF sampling, estimator и ограничений модели.

**Общее качество — обязательно:**

- [ ] Репозиторий: чистая Release сборка по README, версии SDK, зависимости и лицензии assets.
- [ ] Demo: 2–3 минуты видео, воспроизводимая сцена и debug views; собственный вклад отделён от библиотек.
- [ ] Benchmark: GPU/CPU, driver, resolution, settings, VSync, warm-up, camera path; median/p95 и несколько прогонов.
- [ ] Корректность: reference/A-B сравнение, edge cases, validation, regression checks и известные ограничения.
- [ ] Разбор: архитектура, commits, причины решений, неудачный эксперимент и следующие ограничения.

**Необязательное развитие:**

- Hardware RT hybrid pass при доступности GPU; denoising как отдельный эксперимент.

**Чего недостаточно:** Повтор Ray Tracing in One Weekend без BVH, MIS, измерений и самостоятельного развития — учебное упражнение.

**Демонстрация:** Reference images → convergence → BVH tests → estimator breakdown.

**Источники:** [Physically Based Rendering](https://www.pbr-book.org/4ed/contents), [Ray Tracing in One Weekend](https://raytracing.github.io/books/RayTracingInOneWeekend.html), [Ray Tracing Gems I](https://www.realtimerendering.com/raytracinggems/rtg/index.html).

### Rendering Performance Case Study

Расследование · 20–40 ч

Законченный технический отчёт об одной оптимизации собственного или разрешённого открытого renderer.

**Предпосылки:** [Разбор кадра и поиск rendering bugs](#frame-debug), [GPU: исполнение, память и стоимость кадра](#gpu-hardware), [CPU performance, job system и streaming](#cpu-jobs).

**Минимум:**

- [ ] Зафиксированный baseline commit, scene, build и hardware settings.
- [ ] Profiler evidence для гипотезы; один изолированный bottleneck.

**Сильная версия:**

- [ ] Минимум две проверенные гипотезы, включая неудачную.
- [ ] Before/after CSV, median/p95, несколько прогонов; image correctness сохранена.
- [ ] Объяснение hardware причины и цены по памяти/качеству/сложности.
- [ ] Контрпример, где оптимизация не помогает или ухудшает время.
- [ ] Небольшой читаемый patch и reproduction steps; независимый reviewer может повторить.

**Общее качество — обязательно:**

- [ ] Репозиторий: чистая Release сборка по README, версии SDK, зависимости и лицензии assets.
- [ ] Demo: 2–3 минуты видео, воспроизводимая сцена и debug views; собственный вклад отделён от библиотек.
- [ ] Benchmark: GPU/CPU, driver, resolution, settings, VSync, warm-up, camera path; median/p95 и несколько прогонов.
- [ ] Корректность: reference/A-B сравнение, edge cases, validation, regression checks и известные ограничения.
- [ ] Разбор: архитектура, commits, причины решений, неудачный эксперимент и следующие ограничения.

**Необязательное развитие:**

- Второй GPU/vendor при доступности; не обязательное условие.

**Чего недостаточно:** Рост FPS на одном случайном кадре или профилирование Debug build не доказывают результат.

**Демонстрация:** Проблема → trace → гипотезы → patch → данные → границы применимости.

**Источники:** [NVIDIA Nsight Graphics](https://developer.nvidia.com/nsight-graphics), [Radeon GPU Profiler](https://gpuopen.com/rgp/), [Tracy Profiler](https://github.com/wolfpld/tracy).

### LUX//PRISM: Rendering Vertical Slice

Игра / опционально · 60–140 ч с игровым прототипом

Сохранённая игровая ветка: показать законченную сцену и собственную rendering технологию в реальном игровом цикле.

**Предпосылки:** [LUX//PRISM: первый играбельный прототип](#gameplay), [LUX//PRISM: вертикальный срез и выпуск](#release), [Объёмный свет, частицы и прозрачность](#effects-lab).

**Минимум:**

- [ ] Играбельный loop: начало/бой/результат, лазеры/зеркала, воспроизводимый уровень.
- [ ] Собственная графическая feature: GPU particles, lighting или volumetrics с debug modes.

**Сильная версия:**

- [ ] Frame budget и benchmark интенсивной сцены, а не только пустого уровня.
- [ ] Параметры для художника, quality presets и обработка dt spikes.
- [ ] Profiler report об одной найденной и исправленной проблеме.
- [ ] Release build, управление, короткое видео и лицензии assets.
- [ ] Технический breakdown отдельно объясняет rendering вклад и известные artifacts.

**Общее качество — обязательно:**

- [ ] Репозиторий: чистая Release сборка по README, версии SDK, зависимости и лицензии assets.
- [ ] Demo: 2–3 минуты видео, воспроизводимая сцена и debug views; собственный вклад отделён от библиотек.
- [ ] Benchmark: GPU/CPU, driver, resolution, settings, VSync, warm-up, camera path; median/p95 и несколько прогонов.
- [ ] Корректность: reference/A-B сравнение, edge cases, validation, regression checks и известные ограничения.
- [ ] Разбор: архитектура, commits, причины решений, неудачный эксперимент и следующие ограничения.

**Необязательное развитие:**

- Дополнительные уровни после технического завершения.

**Чего недостаточно:** Большое количество gameplay контента не заменяет evidence по graphics programming.

**Демонстрация:** Игровой фрагмент → отключение эффекта → debug view → frame breakdown.

**Источники:** [Game Programming Patterns](https://gameprogrammingpatterns.com/contents.html), [Advances in Real-Time Rendering — доклады и видео](https://advances.realtimerendering.com/).

## Готовность к откликам

### Можно начинать отклики на подходящие junior / trainee роли

Один законченный основной проект + один технический разбор; способность самостоятельно отладить кадр. Это наша учебная планка, требования конкретной вакансии проверяй отдельно.

Подтвердить: [C++ для renderer: lifetime и ресурсы](#cpp-runtime), [Координаты, камера и геометрия](#math), [Растеризация, глубина и численная устойчивость](#raster-depth), [GPU: исполнение, память и стоимость кадра](#gpu-hardware), [HLSL / GLSL: инструменты и контракты шейдеров](#shader-toolchain), [Сцена: mesh, submesh, material](#scene), [Текстуры, sampling и прозрачность](#sampling), [Свет, цвет и простое освещение](#light), [Материалы и PBR](#pbr), [Синхронизация и lifetime без queue-idle](#sync-lifetime), [Разбор кадра и поиск rendering bugs](#frame-debug), [Image-based lighting и проверка BRDF](#ibl-lab), [Устойчивые тени и CSM](#shadow-lab), [Compute: данные, группы и параллельные алгоритмы](#compute-lab).

### Сильное портфолио для обсуждения rendering роли

Основной renderer + один проект в глубину; code review, измерения и понятное объяснение решений. Senior-опыт и выпущенные коммерческие игры галочками не заменяются.

Подтвердить: [Temporal rendering: motion, TAA и история](#temporal-lab), [Visibility, LOD и GPU-driven rendering](#visibility), [Много источников света: tiled / clustered](#clustered), [Render graph и lifetime проходов](#render-graph), [CPU performance, job system и streaming](#cpu-jobs), [Качество, инструменты художника и релиз](#shipping), [Подготовка к собеседованиям и самостоятельной работе](#interview-lab).

## Источники и чтение

Книги из прежней версии сохранены: FCG / 3D Math Primer — база; RTR — карта realtime rendering; Game Engine Architecture / CSAPP / Effective Modern C++ — инженерия; PBRT — теория и reference. Документацию выбранного API читай под задачу. Номера глав прежних уроков сверяй со своим изданием.

Видео: [Advances — доклады, слайды и записи](https://advances.realtimerendering.com/), [официальный канал](https://www.youtube.com/channel/UC9V4KS8ggGQe_Hfeg1OQrWw), [CMU 15-462/662](https://www.cs.cmu.edu/~15462/). Выпиши задачу, baseline, допущения и воспроизведи ограниченный эксперимент. Просмотр не подтверждает навык.

## Сохранение

Прогресс, notes, испытания, выбранный API и проекты сохраняются в localStorage. Экспорт v7 включает всё; импорт v6 сохраняет исходные lesson IDs. Перед обновлением экспортируй резервную копию. На другом URL или в другом браузере импортируй JSON.

---

Файл генерируется из `data/*.js`: `npm run docs`. Приложение работает без Node.js и без сборки.

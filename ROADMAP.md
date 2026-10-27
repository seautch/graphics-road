# Graphics Programmer Roadmap v9 — карта знаний
207 самостоятельных тем · 15 направлений · Vulkan / C++20.

Открой `index.html`. Главный экран — Дерево. «Мой путь» вычисляется из целей и обязательных prerequisites; «Сегодня» предлагает один конкретный шаг. Порядок направлений не является зависимостью.

Статусы: не изучал, знаком / нужна практика, изучаю, освоил, повторить позже. Знакомые и освоенные темы снимаются с обязательного пути; практическое подтверждение хранится отдельно от самооценки. База доступна как справочник.

Все прежние 245 уроков, ID, заметки, проекты и источники сохранены. Они доступны через «Ещё → Архив прежней программы», прежнюю полку и [архив Markdown](LEGACY-ROADMAP.md). Только точные соответствия конкретных уроков переносят completion в новую карту.

## Цели и проекты

- **Vulkan 3D Viewer:** [Frames in flight](#frames-flight), [glTF: meshes, accessors и materials](#gltf), [Graphics pipeline creation](#graphics-pipeline), [Normal mapping и TBN](#normal-mapping), [RenderDoc: frame capture](#renderdoc).
- **PBR renderer:** [Metallic-roughness workflow](#metallic-roughness), [Split-sum approximation и BRDF LUT](#split-sum), [Shadow bias, acne и peter-panning](#shadow-bias), [Tone mapping](#tone-mapping).
- **Visibility / GPU-driven:** [GPU-driven rendering](#gpu-driven), [Hi-Z occlusion culling](#hiz), [Level of Detail (LOD)](#lod), [BVH traversal](#bvh-traversal).
- **Архитектура renderer:** [Render graph / frame graph](#render-graph), [Asset streaming и residency](#streaming), [GPU profiling и hypothesis](#gpu-profiling).
- **Path tracing и GI:** [Multiple Importance Sampling (MIS)](#mis), [Shader Binding Table](#sbt), [Light transport и transport paths](#light-transport).
- **Temporal rendering:** [Temporal Anti-Aliasing (TAA)](#taa), [Ray tracing denoising](#rt-denoise), [Spatial и temporal upscaling](#upscaling).

### Основной Vulkan Renderer / 3D Viewer

- **01 · Инициализация и изображение:** [Validation layers](#validation), [Surface, swapchain и presentation](#swapchain), [Command pools и buffers](#command-pools), [Frames in flight](#frames-flight). Окно переживает resize/minimize; validation без ошибок.
- **02 · Ресурсы и uploads:** [Vulkan Memory Allocator](#vma), [Staging uploads и non-coherent memory](#staging), [Image layouts и transitions](#image-layouts), [Resource lifetime и deferred deletion](#resource-lifetime). Ресурсы создаются и удаляются под нагрузкой без races и утечек.
- **03 · Mesh, камера и glTF:** [Graphics pipeline creation](#graphics-pipeline), [Scene graph и transforms](#scene-graph), [glTF: meshes, accessors и materials](#gltf), [Perspective и orthographic projection](#projection). Несколько моделей с camera controls; корректные bounds и transforms.
- **04 · Материалы и текстуры:** [Normal mapping и TBN](#normal-mapping), [Mipmaps и footprint](#mipmaps), [Linear light, sRGB и gamma](#linear-srgb). Checker, normal map и linear-light tests воспроизводимы.
- **05 · Свет и тени:** [Lambert diffuse](#lambert), [Point, spot и attenuation](#attenuation), [Shadow mapping](#shadow-map), [Percentage Closer Filtering (PCF)](#pcf). Point/spot lights и shadow debug views; bias обоснован.
- **06 · PBR и IBL:** [Metallic-roughness workflow](#metallic-roughness), [Diffuse irradiance convolution](#diffuse-ibl), [Split-sum approximation и BRDF LUT](#split-sum), [Tone mapping](#tone-mapping). Sphere grid и white furnace comparison с reference.
- **07 · Culling и структуры:** [Frustum culling](#frustum-culling), [BVH traversal](#bvh-traversal), [Level of Detail (LOD)](#lod). Нет false culling; число intersection tests и draws измерено.
- **08 · Render graph:** [Render graph / frame graph](#render-graph), [Transient resources и aliasing](#transient-alias). Pass/resource graph показывает dependencies и peak memory.
- **09 · Compute features:** [Parallel scan / prefix sum](#prefix-sum), [Clustered shading](#clustered), [GPU particles](#particles). CPU reference совпадает; overflow и barriers проверены.
- **10 · GPU-driven:** [GPU-driven rendering](#gpu-driven), [Hi-Z occlusion culling](#hiz). Visibility и draw count формируются без CPU readback.
- **11 · Измерения и качество:** [GPU profiling и hypothesis](#gpu-profiling), [Image regression и integration tests](#integration-tests), [CI и headless validation](#ci). Есть capture, benchmark distribution и воспроизводимая сборка.
- **12 · Углубление по выбору:** [Temporal Anti-Aliasing (TAA)](#taa), [Vulkan ray query](#ray-query), [Task и mesh shaders](#mesh-shaders). Выбери одну функцию; покажи baseline, correctness и cost.

## Источники

1701 записей обработано из docs/likns.md. После объединения повторов и сохранения прежних книг: 1703. Графика: 720; инженерная база: 630; дополнительный архив: 299; служебные: 54. 223 источников имеют конкретные связи с темами; остальные сохраняются с пометкой об отсутствии точной привязки.

Проверены отдельные оглавления и entry points, а не весь каталог. Если номер главы не подтверждён, назначается поиск по теме с явной пометкой. Источники без URL и отсутствующие локальные материалы сохраняются. Автоматическое сопоставление по названию алгоритма нужно проверять при чтении.

## Карта знаний

## Математика

Преобразования, геометрия и численные методы

### Пространства и преобразования

<a id="vectors"></a>

#### Векторы, dot и cross

foundation · theory

Направления, длины и ориентация в 3D.

**Применение:** Преобразования, геометрия и численные методы.
**Обязательные предпосылки:** независимая точка входа.
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — 3.3 Vectors. Название раздела сверено.
- **alternative:** [Scratchapixel](https://www.scratchapixel.com/) — Векторы, dot и cross — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Вычисли угол и площадь треугольника на CPU.
**Завершение:** Нулевая длина и коллинеарность обработаны явно.
**Самопроверка:** Когда cross product меняет знак?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="matrices"></a>

#### Матрицы и пространства координат

foundation · theory

Матрица переводит координаты между выбранными базисами.

**Применение:** Преобразования, геометрия и численные методы.
**Обязательные предпосылки:** [Векторы, dot и cross](#vectors).
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — 3.9 Transformations. Название раздела сверено.
- **alternative:** [Scratchapixel](https://www.scratchapixel.com/) — Матрицы и пространства координат — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Проведи точку и направление через model/view; проверь обратное преобразование.
**Завершение:** Round-trip сохраняет координаты с заданным epsilon.
**Самопроверка:** Почему порядок умножения имеет значение?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="projection"></a>

#### Perspective и orthographic projection

foundation · theory

Однородная проекция задаёт frustum и распределение глубины.

**Применение:** Преобразования, геометрия и численные методы.
**Обязательные предпосылки:** [Матрицы и пространства координат](#matrices).
- **primary:** [Scratchapixel](https://www.scratchapixel.com/) — Perspective и orthographic projection — найти по теме в оглавлении. Точная привязка требует проверки.

**Практика:** Выведи near/far mapping для Vulkan Z в [0,1].
**Завершение:** Near и far попадают в ожидаемые значения; w=0 обработано.
**Самопроверка:** Где именно выполняется perspective divide?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="quaternions"></a>

#### Quaternions и slerp

foundation · theory

Единичный кватернион представляет поворот без углов Эйлера.

**Применение:** Преобразования, геометрия и численные методы.
**Обязательные предпосылки:** [Матрицы и пространства координат](#matrices).
- **primary:** [Scratchapixel](https://www.scratchapixel.com/) — Quaternions и slerp — найти по теме в оглавлении. Точная привязка требует проверки.

**Практика:** Реализуй composition и slerp, сравни с матрицами.
**Завершение:** q и -q дают одну ориентацию; почти равные повороты устойчивы.
**Самопроверка:** Почему перед slerp иногда меняют знак q?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="barycentric"></a>

#### Barycentric coordinates

foundation · theory

Веса вершин задают положение и интерполяцию внутри треугольника.

**Применение:** Преобразования, геометрия и численные методы.
**Обязательные предпосылки:** [Векторы, dot и cross](#vectors).
- **primary:** [Scratchapixel](https://www.scratchapixel.com/) — Barycentric coordinates — найти по теме в оглавлении. Точная привязка требует проверки.

**Практика:** Вычисли веса для центра, ребра и точки вне треугольника.
**Завершение:** Сумма весов равна единице; вырожденный треугольник обнаружен.
**Самопроверка:** Как веса показывают выход за границу?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="normal-matrix"></a>

#### Normal matrix и tangent basis

foundation · theory

Нормали преобразуются inverse transpose при неравномерном масштабе.

**Применение:** Преобразования, геометрия и численные методы.
**Обязательные предпосылки:** [Матрицы и пространства координат](#matrices).
- **primary:** [Scratchapixel](https://www.scratchapixel.com/) — Normal matrix и tangent basis — найти по теме в оглавлении. Точная привязка требует проверки.

**Практика:** Проверь dot преобразованной нормали и касательной.
**Завершение:** Ортогональность сохраняется; singular matrix отклоняется.
**Самопроверка:** Почему обычная model matrix искажает нормаль?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="interpolation"></a>

#### Линейная интерполяция и кривые

foundation · theory

Lerp, smoothstep и Hermite задают разные условия непрерывности.

**Применение:** Преобразования, геометрия и численные методы.
**Обязательные предпосылки:** [Векторы, dot и cross](#vectors).
- **primary:** [Scratchapixel](https://www.scratchapixel.com/) — Линейная интерполяция и кривые — найти по теме в оглавлении. Точная привязка требует проверки.

**Практика:** Построй графики значения и производной на стыке двух сегментов.
**Завершение:** Различия C0 и C1 показаны численно.
**Самопроверка:** Почему clamp и smoothstep не взаимозаменяемы?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

### Анализ и выборки

<a id="derivatives"></a>

#### Производные и конечные разности

intermediate · theory

Производная оценивает локальное изменение функции.

**Применение:** Преобразования, геометрия и численные методы.
**Обязательные предпосылки:** независимая точка входа.
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — Производные и конечные разности — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Scratchapixel](https://www.scratchapixel.com/) — Производные и конечные разности — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Сравни analytic derivative sin(x) с forward и central differences.
**Завершение:** Есть график ошибки от шага; объяснён рост rounding error.
**Самопроверка:** Почему меньший шаг не всегда точнее?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="integrals"></a>

#### Интегралы и квадратуры

intermediate · theory

Интеграл суммирует плотность по области.

**Применение:** Преобразования, геометрия и численные методы.
**Обязательные предпосылки:** [Производные и конечные разности](#derivatives).
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — Интегралы и квадратуры — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Scratchapixel](https://www.scratchapixel.com/) — Интегралы и квадратуры — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Интегрируй полином rectangle/trapezoid rules.
**Завершение:** Показана сходимость к аналитическому ответу.
**Самопроверка:** Что меняется при замене меры интегрирования?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="probability"></a>

#### Вероятность, PDF и expectation

intermediate · theory

PDF нормируется интегралом, а не суммой значений функции.

**Применение:** Преобразования, геометрия и численные методы.
**Обязательные предпосылки:** [Интегралы и квадратуры](#integrals).
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — Вероятность, PDF и expectation — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Scratchapixel](https://www.scratchapixel.com/) — Вероятность, PDF и expectation — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Проверь нормировку uniform и cosine hemisphere PDF.
**Завершение:** Гистограмма и интеграл согласованы; плотность не названа вероятностью точки.
**Самопроверка:** Может ли PDF быть больше единицы?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="monte-carlo"></a>

#### Monte Carlo integration

intermediate · theory

Среднее f(x)/p(x) оценивает интеграл по случайным выборкам.

**Применение:** Преобразования, геометрия и численные методы.
**Обязательные предпосылки:** [Вероятность, PDF и expectation](#probability).
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — 2.1 Monte Carlo: Basics. Название раздела сверено.
- **alternative:** [Scratchapixel](https://www.scratchapixel.com/) — Monte Carlo integration — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Оцени известный интеграл на серии seeds и размеров выборки.
**Завершение:** Ошибка и variance измерены отдельно; нулевая PDF обработана.
**Самопроверка:** От чего зависит несмещённость оценки?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="importance"></a>

#### Importance sampling

intermediate · theory

Выбор PDF близкой к интегранду снижает дисперсию.

**Применение:** Преобразования, геометрия и численные методы.
**Обязательные предпосылки:** [Monte Carlo integration](#monte-carlo).
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — Importance sampling — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Scratchapixel](https://www.scratchapixel.com/) — Importance sampling — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Сравни uniform и cosine-weighted sampling при равном числе samples.
**Завершение:** Средние совпадают в пределах ошибки; variance сравнена.
**Самопроверка:** Что случится, если PDF равна нулю на ненулевом интегранде?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="precision"></a>

#### Floating point и устойчивость

intermediate · theory

Округление, cancellation и масштаб влияют на геометрию.

**Применение:** Преобразования, геометрия и численные методы.
**Обязательные предпосылки:** независимая точка входа.
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — Floating point и устойчивость — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Scratchapixel](https://www.scratchapixel.com/) — Floating point и устойчивость — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Сравни float/double при вычитании близких чисел и больших координатах.
**Завершение:** Погрешность измерена; epsilon обоснован масштабом.
**Самопроверка:** Почему универсальный epsilon ненадёжен?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

## Vulkan / low-level API

Основной backend на C++20

### Инициализация

<a id="vk-instance"></a>

#### Instance и extensions

intermediate · practice

Instance связывает приложение с loader и instance extensions.

**Применение:** Основной backend на C++20.
**Обязательные предпосылки:** независимая точка входа.
- **primary:** [Vulkan Guide / vkguide.dev](https://vkguide.dev/) — Instance и extensions — найти по теме в оглавлении. Точная привязка требует проверки.
- **reference:** [Vulkan Specification](https://docs.vulkan.org/spec/latest/) — Instance и extensions — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Создай instance, перечисли доступные extensions и обработай отсутствие обязательных.
**Завершение:** Программа выдаёт понятную диагностику и корректно завершает работу.
**Самопроверка:** Чем instance extension отличается от device extension?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="validation"></a>

#### Validation layers

intermediate · practice

Validation проверяет соблюдение Vulkan API contracts.

**Применение:** Основной backend на C++20.
**Обязательные предпосылки:** [Instance и extensions](#vk-instance).
- **primary:** [Vulkan Guide / vkguide.dev](https://vkguide.dev/) — Validation layers — найти по теме в оглавлении. Точная привязка требует проверки.
- **reference:** [Vulkan Specification](https://docs.vulkan.org/spec/latest/) — Validation layers — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Подключи debug messenger; намеренно вызови и исправь ошибку valid usage.
**Завершение:** Сообщение с VUID сохранено, после исправления ошибка исчезает.
**Самопроверка:** Что validation не может гарантировать?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="vk-device"></a>

#### Physical и logical devices

intermediate · practice

Features, limits и queue families определяют возможности backend.

**Применение:** Основной backend на C++20.
**Обязательные предпосылки:** [Instance и extensions](#vk-instance).
- **primary:** [Vulkan Guide / vkguide.dev](https://vkguide.dev/) — Physical и logical devices — найти по теме в оглавлении. Точная привязка требует проверки.
- **reference:** [Vulkan Specification](https://docs.vulkan.org/spec/latest/) — Physical и logical devices — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Оцени устройства и создай logical device с минимальным набором features.
**Завершение:** Неподдерживаемая feature даёт fallback или явную ошибку.
**Самопроверка:** Почему наличие extension не означает включение feature?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="vk-queues"></a>

#### Queues и queue families

intermediate · practice

Queue упорядочивает submit, family задаёт классы операций.

**Применение:** Основной backend на C++20.
**Обязательные предпосылки:** [Physical и logical devices](#vk-device).
- **primary:** [Vulkan Guide / vkguide.dev](https://vkguide.dev/) — Queues и queue families — найти по теме в оглавлении. Точная привязка требует проверки.
- **reference:** [Vulkan Specification](https://docs.vulkan.org/spec/latest/) — Queues и queue families — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Выбери graphics/present families; выведи их свойства.
**Завершение:** Поддержан случай разных families.
**Самопроверка:** Почему две queues не гарантируют параллельного исполнения?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="swapchain"></a>

#### Surface, swapchain и presentation

intermediate · practice

Presentation передаёт изображение оконной системе.

**Применение:** Основной backend на C++20.
**Обязательные предпосылки:** [Queues и queue families](#vk-queues).
- **primary:** [Vulkan Guide / vkguide.dev](https://vkguide.dev/) — Surface, swapchain и presentation — найти по теме в оглавлении. Точная привязка требует проверки.
- **reference:** [Vulkan Specification](https://docs.vulkan.org/spec/latest/) — Surface, swapchain и presentation — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Создай swapchain, обработай resize и OUT_OF_DATE.
**Завершение:** Minimize/restore не зависают; extent и formats проверены.
**Самопроверка:** Чем количество swapchain images отличается от frames in flight?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="image-views"></a>

#### Image views

intermediate · practice

View задаёт интерпретацию формата, mip levels и array layers.

**Применение:** Основной backend на C++20.
**Обязательные предпосылки:** [Physical и logical devices](#vk-device).
- **primary:** [Vulkan Guide / vkguide.dev](https://vkguide.dev/) — Image views — найти по теме в оглавлении. Точная привязка требует проверки.
- **reference:** [Vulkan Specification](https://docs.vulkan.org/spec/latest/) — Image views — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Создай отдельные views на mip и слой image.
**Завершение:** Захват подтверждает нужные subresources.
**Самопроверка:** Почему image и image view имеют разное время жизни?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="command-pools"></a>

#### Command pools и buffers

intermediate · practice

Command buffer записывает GPU команды, pool управляет их памятью.

**Применение:** Основной backend на C++20.
**Обязательные предпосылки:** [Queues и queue families](#vk-queues).
- **primary:** [Vulkan Guide / vkguide.dev](https://vkguide.dev/) — Command pools и buffers — найти по теме в оглавлении. Точная привязка требует проверки.
- **reference:** [Vulkan Specification](https://docs.vulkan.org/spec/latest/) — Command pools и buffers — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Запиши clear и повторно используй command buffer только после завершения GPU.
**Завершение:** Reset не выполняется для pending buffer.
**Самопроверка:** Почему command pool нельзя одновременно использовать из двух потоков?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

### Ресурсы и память

<a id="vk-memory"></a>

#### Memory heaps, types и allocation

intermediate · practice

Memory requirements связывают ресурс с совместимым типом памяти.

**Применение:** Основной backend на C++20.
**Обязательные предпосылки:** [Physical и logical devices](#vk-device).
- **primary:** [Vulkan Guide / vkguide.dev](https://vkguide.dev/) — Memory heaps, types и allocation — найти по теме в оглавлении. Точная привязка требует проверки.
- **reference:** [Vulkan Specification](https://docs.vulkan.org/spec/latest/) — Memory heaps, types и allocation — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Выведи heaps/types, выдели и привяжи память для buffer.
**Завершение:** Alignment и memoryTypeBits соблюдены.
**Самопроверка:** Чем heap отличается от memory type?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="vk-buffers"></a>

#### Buffers и usage flags

intermediate · practice

Buffer хранит линейные данные с явно объявленными назначениями.

**Применение:** Основной backend на C++20.
**Обязательные предпосылки:** [Memory heaps, types и allocation](#vk-memory).
- **primary:** [Vulkan Guide / vkguide.dev](https://vkguide.dev/) — Buffers и usage flags — найти по теме в оглавлении. Точная привязка требует проверки.
- **reference:** [Vulkan Specification](https://docs.vulkan.org/spec/latest/) — Buffers и usage flags — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Загрузи vertex/index данные и проверь bounds.
**Завершение:** Usage и размеры согласованы с командами.
**Самопроверка:** Когда buffer нужен STORAGE, а когда UNIFORM usage?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="vk-images"></a>

#### Images, tiling и subresources

intermediate · practice

Image хранит форматированные texels и набор subresources.

**Применение:** Основной backend на C++20.
**Обязательные предпосылки:** [Memory heaps, types и allocation](#vk-memory).
- **primary:** [Vulkan Guide / vkguide.dev](https://vkguide.dev/) — Images, tiling и subresources — найти по теме в оглавлении. Точная привязка требует проверки.
- **reference:** [Vulkan Specification](https://docs.vulkan.org/spec/latest/) — Images, tiling и subresources — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Создай color/depth images с проверкой format features.
**Завершение:** Формат, samples и usage поддерживаются устройством.
**Самопроверка:** Почему optimal tiling нельзя трактовать как простой массив CPU?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="vma"></a>

#### Vulkan Memory Allocator

intermediate · practice

Suballocation и VMA уменьшают число отдельных allocations.

**Применение:** Основной backend на C++20.
**Обязательные предпосылки:** [Memory heaps, types и allocation](#vk-memory).
- **primary:** [Vulkan Memory Allocator](https://github.com/GPUOpen-LibrariesAndSDKs/VulkanMemoryAllocator) — Vulkan Memory Allocator — найти по теме в оглавлении. Точная привязка требует проверки.
- **reference:** [Vulkan Specification](https://docs.vulkan.org/spec/latest/) — Vulkan Memory Allocator — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Замени ручные allocations на VMA и выведи статистику.
**Завершение:** Память освобождается после GPU; нет утечек при resize.
**Самопроверка:** Чего VMA не делает за систему синхронизации?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="staging"></a>

#### Staging uploads и non-coherent memory

intermediate · practice

Transfer upload разделяет host-visible staging и device-local данные.

**Применение:** Основной backend на C++20.
**Обязательные предпосылки:** [Buffers и usage flags](#vk-buffers), [Command pools и buffers](#command-pools), [Pipeline barriers и synchronization2](#barriers).
- **primary:** [Vulkan Guide / vkguide.dev](https://vkguide.dev/) — Staging uploads и non-coherent memory — найти по теме в оглавлении. Точная привязка требует проверки.
- **reference:** [Vulkan Specification](https://docs.vulkan.org/spec/latest/) — Staging uploads и non-coherent memory — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Реализуй upload с flush при необходимости и transfer-to-consumer barrier.
**Завершение:** Данные совпадают с CPU; соблюдён nonCoherentAtomSize.
**Самопроверка:** Когда нужны flush и invalidate?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="image-layouts"></a>

#### Image layouts и transitions

intermediate · practice

Layout описывает допустимое использование subresource.

**Применение:** Основной backend на C++20.
**Обязательные предпосылки:** [Images, tiling и subresources](#vk-images), [Command pools и buffers](#command-pools).
- **primary:** [Vulkan Guide / vkguide.dev](https://vkguide.dev/) — Image layouts и transitions — найти по теме в оглавлении. Точная привязка требует проверки.
- **reference:** [Vulkan Specification](https://docs.vulkan.org/spec/latest/) — Image layouts и transitions — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Проведи image через transfer dst, sampled и attachment usage.
**Завершение:** Каждый переход относится к правильному mip/layer.
**Самопроверка:** Почему переход из UNDEFINED теряет прежнее содержимое?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="resource-lifetime"></a>

#### Resource lifetime и deferred deletion

intermediate · practice

GPU может использовать ресурс после возврата CPU из submit.

**Применение:** Основной backend на C++20.
**Обязательные предпосылки:** [Fences и host waits](#fences).
- **primary:** [Vulkan Guide / vkguide.dev](https://vkguide.dev/) — Resource lifetime и deferred deletion — найти по теме в оглавлении. Точная привязка требует проверки.
- **reference:** [Vulkan Specification](https://docs.vulkan.org/spec/latest/) — Resource lifetime и deferred deletion — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Сделай deletion queue по completion value.
**Завершение:** Resize и удаление сцен под нагрузкой не дают use-after-free.
**Самопроверка:** Почему RAII destructor не означает завершение GPU?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

### Синхронизация

<a id="gpu-sync"></a>

#### Execution и memory dependencies

intermediate · debug

Execution order, availability и visibility решают разные части hazard.

**Применение:** Основной backend на C++20.
**Обязательные предпосылки:** [Command pools и buffers](#command-pools).
- **primary:** [Khronos — Synchronization Examples](https://docs.vulkan.org/guide/latest/synchronization_examples.html) — Execution и memory dependencies — найти по теме в оглавлении. Точная привязка требует проверки.
- **reference:** [Vulkan Specification](https://docs.vulkan.org/spec/latest/) — Execution и memory dependencies — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Нарисуй producer/consumer для compute write → vertex read.
**Завершение:** Правильно названы RAW, WAR и WAW hazards.
**Самопроверка:** Когда достаточно execution dependency без memory dependency?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="barriers"></a>

#### Pipeline barriers и synchronization2

intermediate · debug

Stage/access masks задают область зависимости между GPU операциями.

**Применение:** Основной backend на C++20.
**Обязательные предпосылки:** [Execution и memory dependencies](#gpu-sync).
- **primary:** [Khronos — Synchronization Examples](https://docs.vulkan.org/guide/latest/synchronization_examples.html) — Compute to Compute Dependencies. Название раздела сверено.
- **reference:** [Vulkan Specification](https://docs.vulkan.org/spec/latest/) — Pipeline barriers и synchronization2 — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Свяжи storage write с indirect draw через vkCmdPipelineBarrier2.
**Завершение:** Sync validation чистая; masks объяснены для обоих участников.
**Самопроверка:** Почему ALL_COMMANDS не заменяет выбор корректного access mask?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="semaphores"></a>

#### Binary и timeline semaphores

intermediate · debug

Semaphores синхронизируют submissions; timeline хранит возрастающее значение.

**Применение:** Основной backend на C++20.
**Обязательные предпосылки:** [Execution и memory dependencies](#gpu-sync).
- **primary:** [Khronos — Synchronization Examples](https://docs.vulkan.org/guide/latest/synchronization_examples.html) — Binary и timeline semaphores — найти по теме в оглавлении. Точная привязка требует проверки.
- **reference:** [Vulkan Specification](https://docs.vulkan.org/spec/latest/) — Binary и timeline semaphores — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Свяжи два submit через timeline, WSI оставь на binary semaphores.
**Завершение:** Нет повторного сигнала занятой binary semaphore.
**Самопроверка:** Почему timeline semaphore нельзя напрямую передать present?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="fences"></a>

#### Fences и host waits

intermediate · debug

Fence позволяет CPU узнать о завершении submission.

**Применение:** Основной backend на C++20.
**Обязательные предпосылки:** [Execution и memory dependencies](#gpu-sync).
- **primary:** [Khronos — Synchronization Examples](https://docs.vulkan.org/guide/latest/synchronization_examples.html) — Fences и host waits — найти по теме в оглавлении. Точная привязка требует проверки.
- **reference:** [Vulkan Specification](https://docs.vulkan.org/spec/latest/) — Fences и host waits — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Сделай два frame contexts и безопасный reset fence.
**Завершение:** Ошибка acquire не оставляет несигнализируемую fence для следующего кадра.
**Самопроверка:** Когда допустимо сбрасывать fence?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="frames-flight"></a>

#### Frames in flight

intermediate · debug

Независимые frame contexts разделяют временные данные CPU и GPU.

**Применение:** Основной backend на C++20.
**Обязательные предпосылки:** [Fences и host waits](#fences), [Binary и timeline semaphores](#semaphores), [Surface, swapchain и presentation](#swapchain).
- **primary:** [Khronos — Synchronization Examples](https://docs.vulkan.org/guide/latest/synchronization_examples.html) — Frames in flight — найти по теме в оглавлении. Точная привязка требует проверки.
- **reference:** [Vulkan Specification](https://docs.vulkan.org/spec/latest/) — Frames in flight — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Раздели per-frame buffers и WSI semaphores; проверь reuse по present completion.
**Завершение:** 1000 кадров, resize и разные image counts не дают sync ошибок.
**Самопроверка:** Почему render-finished semaphore безопаснее привязать к swapchain image?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="queue-ownership"></a>

#### Queue family ownership transfers

intermediate · debug

Exclusive resources требуют передачи ownership между families.

**Применение:** Основной backend на C++20.
**Обязательные предпосылки:** [Pipeline barriers и synchronization2](#barriers), [Queues и queue families](#vk-queues).
- **primary:** [Khronos — Synchronization Examples](https://docs.vulkan.org/guide/latest/synchronization_examples.html) — Queue family ownership transfers — найти по теме в оглавлении. Точная привязка требует проверки.
- **reference:** [Vulkan Specification](https://docs.vulkan.org/spec/latest/) — Queue family ownership transfers — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Сравни concurrent sharing и release/acquire для transfer queue.
**Завершение:** Оба варианта дают одинаковый результат.
**Самопроверка:** Почему semaphore не заменяет ownership transfer?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

### Binding и pipelines

<a id="descriptors"></a>

#### Descriptor sets и pools

intermediate · practice

Descriptors связывают shader bindings с ресурсами.

**Применение:** Основной backend на C++20.
**Обязательные предпосылки:** [Buffers и usage flags](#vk-buffers), [Image views](#image-views).
- **primary:** [Vulkan Guide / vkguide.dev](https://vkguide.dev/) — Descriptor sets и pools — найти по теме в оглавлении. Точная привязка требует проверки.
- **reference:** [Vulkan Specification](https://docs.vulkan.org/spec/latest/) — Descriptor sets и pools — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Создай per-frame UBO и sampled texture descriptors.
**Завершение:** Pool и sets живут до завершения использующих их команд.
**Самопроверка:** Чем binding number отличается от set number?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="pipeline-layout"></a>

#### Pipeline layout

intermediate · practice

Layout задаёт совместимость descriptor sets и push constants.

**Применение:** Основной backend на C++20.
**Обязательные предпосылки:** [Descriptor sets и pools](#descriptors).
- **primary:** [Vulkan Guide / vkguide.dev](https://vkguide.dev/) — Pipeline layout — найти по теме в оглавлении. Точная привязка требует проверки.
- **reference:** [Vulkan Specification](https://docs.vulkan.org/spec/latest/) — Pipeline layout — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Собери два pipeline с общим set layout и разными материалами.
**Завершение:** Проверена совместимость при переключении pipelines.
**Самопроверка:** Что делает layouts совместимыми?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="push-constants"></a>

#### Push constants

intermediate · practice

Маленькие команды параметров записываются в command buffer.

**Применение:** Основной backend на C++20.
**Обязательные предпосылки:** [Pipeline layout](#pipeline-layout).
- **primary:** [Vulkan Guide / vkguide.dev](https://vkguide.dev/) — Push constants — найти по теме в оглавлении. Точная привязка требует проверки.
- **reference:** [Vulkan Specification](https://docs.vulkan.org/spec/latest/) — Push constants — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Передай object index через push constants.
**Завершение:** Размер и stage ranges сверены с limits и shader layout.
**Самопроверка:** Почему push constants не подходят для целого scene buffer?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="spirv"></a>

#### Shader modules и SPIR-V

intermediate · practice

SPIR-V — промежуточное представление shader и его interface.

**Применение:** Основной backend на C++20.
**Обязательные предпосылки:** независимая точка входа.
- **primary:** [Vulkan Guide / vkguide.dev](https://vkguide.dev/) — Shader modules и SPIR-V — найти по теме в оглавлении. Точная привязка требует проверки.
- **reference:** [Vulkan Specification](https://docs.vulkan.org/spec/latest/) — Shader modules и SPIR-V — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Скомпилируй GLSL, проверь SPIR-V и intentional binding mismatch.
**Завершение:** Ошибки компиляции и reflection видны до draw.
**Самопроверка:** Какие сведения об interface сохраняются в SPIR-V?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="dynamic-rendering"></a>

#### Dynamic rendering

intermediate · practice

Rendering attachments задаются при записи без render pass objects.

**Применение:** Основной backend на C++20.
**Обязательные предпосылки:** [Images, tiling и subresources](#vk-images), [Image views](#image-views), [Command pools и buffers](#command-pools), [Image layouts и transitions](#image-layouts).
- **primary:** [Vulkan Guide / vkguide.dev](https://vkguide.dev/) — Dynamic rendering — найти по теме в оглавлении. Точная привязка требует проверки.
- **reference:** [Vulkan Specification](https://docs.vulkan.org/spec/latest/) — Dynamic rendering — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Нарисуй mesh через vkCmdBeginRendering с color/depth.
**Завершение:** Attachment formats и layouts согласованы с pipeline.
**Самопроверка:** Почему dynamic rendering не добавляет barriers автоматически?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="graphics-pipeline"></a>

#### Graphics pipeline creation

intermediate · practice

Pipeline объединяет shader stages и fixed-function state.

**Применение:** Основной backend на C++20.
**Обязательные предпосылки:** [Pipeline layout](#pipeline-layout), [Shader modules и SPIR-V](#spirv), [Dynamic rendering](#dynamic-rendering).
- **primary:** [Vulkan Guide / vkguide.dev](https://vkguide.dev/) — Graphics pipeline creation — найти по теме в оглавлении. Точная привязка требует проверки.
- **reference:** [Vulkan Specification](https://docs.vulkan.org/spec/latest/) — Graphics pipeline creation — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Создай depth и wireframe варианты с feature checks.
**Завершение:** Viewport, vertex layout и depth formats проверены.
**Самопроверка:** Какие состояния dynamic, а какие требуют другого pipeline?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="pipeline-cache"></a>

#### Pipeline cache и compilation

intermediate · practice

Повторная компиляция pipelines влияет на stutter.

**Применение:** Основной backend на C++20.
**Обязательные предпосылки:** [Graphics pipeline creation](#graphics-pipeline).
- **primary:** [Vulkan Guide / vkguide.dev](https://vkguide.dev/) — Pipeline cache и compilation — найти по теме в оглавлении. Точная привязка требует проверки.
- **reference:** [Vulkan Specification](https://docs.vulkan.org/spec/latest/) — Pipeline cache и compilation — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Измерь cold/warm creation и сохрани cache с проверкой совместимости.
**Завершение:** Есть timings и безопасный fallback для чужого cache.
**Самопроверка:** Почему pipeline cache нельзя считать переносимым asset?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="descriptor-indexing"></a>

#### Descriptor indexing и bindless

intermediate · practice

Массивы descriptors позволяют shader выбирать ресурс по индексу.

**Применение:** Основной backend на C++20.
**Обязательные предпосылки:** [Descriptor sets и pools](#descriptors).
- **primary:** [Vulkan Guide / vkguide.dev](https://vkguide.dev/) — Descriptor indexing и bindless — найти по теме в оглавлении. Точная привязка требует проверки.
- **reference:** [Vulkan Specification](https://docs.vulkan.org/spec/latest/) — Descriptor indexing и bindless — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Сделай texture array с non-uniform index и feature checks.
**Завершение:** Проверены invalid indices, residency и update lifetime.
**Самопроверка:** Почему UPDATE_AFTER_BIND не решает lifetime ресурса?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="multithread-record"></a>

#### Multithreaded command recording

intermediate · practice

Каждому recording thread нужны собственные pools и согласованное владение.

**Применение:** Основной backend на C++20.
**Обязательные предпосылки:** [Command pools и buffers](#command-pools), [Resource lifetime и deferred deletion](#resource-lifetime).
- **primary:** [Vulkan Guide / vkguide.dev](https://vkguide.dev/) — Multithreaded command recording — найти по теме в оглавлении. Точная привязка требует проверки.
- **reference:** [Vulkan Specification](https://docs.vulkan.org/spec/latest/) — Multithreaded command recording — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Запиши independent command buffers из двух потоков.
**Завершение:** Нет host races; время записи сравнено с одним потоком.
**Самопроверка:** Когда secondary command buffers увеличивают стоимость?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="dx12"></a>

#### DirectX 12: сопоставление с Vulkan

intermediate · practice

D3D12 выражает те же hardware ограничения другими объектами и contracts.

**Применение:** Основной backend на C++20.
**Обязательные предпосылки:** [Execution и memory dependencies](#gpu-sync), [Descriptor sets и pools](#descriptors).
- **primary:** [Vulkan Guide / vkguide.dev](https://vkguide.dev/) — DirectX 12: сопоставление с Vulkan — найти по теме в оглавлении. Точная привязка требует проверки.
- **reference:** [Vulkan Specification](https://docs.vulkan.org/spec/latest/) — DirectX 12: сопоставление с Vulkan — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Сопоставь heaps, root signature, barriers и fences с Vulkan backend.
**Завершение:** Таблица различий объясняет ownership и resource state.
**Самопроверка:** Почему механический перевод Vulkan calls недостаточен?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

## Graphics pipeline

От вершин до видимых фрагментов

### Геометрический конвейер

<a id="vertex-stage"></a>

#### Vertex processing

foundation · practice

Vertex shader выдаёт clip-space position и атрибуты.

**Применение:** От вершин до видимых фрагментов.
**Обязательные предпосылки:** [Матрицы и пространства координат](#matrices).
- **primary:** [Scratchapixel](https://www.scratchapixel.com/) — Vertex processing — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Vertex processing — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.
- **deep:** [Fundamentals of Computer Graphics](https://www.cs.cornell.edu/~srm/fcg/) — Vertex processing — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Проследи одну вершину от model space до clip coordinates.
**Завершение:** CPU reference совпадает с GPU capture.
**Самопроверка:** Что является входом primitive assembly?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="assembly"></a>

#### Primitive assembly и topology

foundation · practice

Topology интерпретирует поток вершин или индексов.

**Применение:** От вершин до видимых фрагментов.
**Обязательные предпосылки:** [Vertex processing](#vertex-stage).
- **primary:** [Scratchapixel](https://www.scratchapixel.com/) — Primitive assembly и topology — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Primitive assembly и topology — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.
- **deep:** [Fundamentals of Computer Graphics](https://www.cs.cornell.edu/~srm/fcg/) — Primitive assembly и topology — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Сравни triangle list/strip на одном index buffer.
**Завершение:** Порядок вершин и restart объяснены.
**Самопроверка:** Как winding зависит от topology?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="clipping"></a>

#### Homogeneous clipping

foundation · practice

Примитив обрезается плоскостями до perspective divide.

**Применение:** От вершин до видимых фрагментов.
**Обязательные предпосылки:** [Perspective и orthographic projection](#projection).
- **primary:** [Scratchapixel](https://www.scratchapixel.com/) — Homogeneous clipping — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Homogeneous clipping — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.
- **deep:** [Fundamentals of Computer Graphics](https://www.cs.cornell.edu/~srm/fcg/) — Homogeneous clipping — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Реализуй clipping треугольника, пересекающего near plane.
**Завершение:** Нет скачков при пересечении камеры.
**Самопроверка:** Почему clipping после divide ломается при отрицательном w?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="viewport"></a>

#### Viewport transform

foundation · practice

NDC переводится в координаты framebuffer с выбранным depth range.

**Применение:** От вершин до видимых фрагментов.
**Обязательные предпосылки:** [Perspective и orthographic projection](#projection).
- **primary:** [Scratchapixel](https://www.scratchapixel.com/) — Viewport transform — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Viewport transform — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.
- **deep:** [Fundamentals of Computer Graphics](https://www.cs.cornell.edu/~srm/fcg/) — Viewport transform — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Сравни CPU и GPU координаты контрольных точек.
**Завершение:** Проверены Y orientation и corner conventions.
**Самопроверка:** Как отрицательная viewport height влияет на winding?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="rasterization"></a>

#### Coverage и rasterization

foundation · practice

Coverage определяет принадлежность samples примитиву.

**Применение:** От вершин до видимых фрагментов.
**Обязательные предпосылки:** [Barycentric coordinates](#barycentric), [Homogeneous clipping](#clipping).
- **primary:** [Scratchapixel](https://www.scratchapixel.com/) — Coverage и rasterization — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Coverage и rasterization — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.
- **deep:** [Fundamentals of Computer Graphics](https://www.cs.cornell.edu/~srm/fcg/) — Coverage и rasterization — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Растеризуй два смежных треугольника с top-left rule.
**Завершение:** Общая граница не даёт дыр и double coverage.
**Самопроверка:** Почему пиксель не является геометрическим квадратом выборки?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="perspective-interp"></a>

#### Perspective-correct interpolation

foundation · practice

Атрибуты интерполируются с учётом reciprocal w.

**Применение:** От вершин до видимых фрагментов.
**Обязательные предпосылки:** [Barycentric coordinates](#barycentric), [Perspective и orthographic projection](#projection).
- **primary:** [Scratchapixel](https://www.scratchapixel.com/) — Perspective-correct interpolation — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Perspective-correct interpolation — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.
- **deep:** [Fundamentals of Computer Graphics](https://www.cs.cornell.edu/~srm/fcg/) — Perspective-correct interpolation — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Сравни affine и perspective UV на наклонном quad.
**Завершение:** Линии UV совпадают по диагонали quad.
**Самопроверка:** Почему интерполяция UV в screen space неверна?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="fragment-stage"></a>

#### Fragment processing

foundation · practice

Fragment shader работает с interpolants и покрытыми samples.

**Применение:** От вершин до видимых фрагментов.
**Обязательные предпосылки:** [Coverage и rasterization](#rasterization).
- **primary:** [Scratchapixel](https://www.scratchapixel.com/) — Fragment processing — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Fragment processing — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.
- **deep:** [Fundamentals of Computer Graphics](https://www.cs.cornell.edu/~srm/fcg/) — Fragment processing — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Выведи barycentric цвета и производные во framebuffer.
**Завершение:** Различены fragment invocation и итоговый pixel.
**Самопроверка:** Может ли fragment shader выполниться для невидимого фрагмента?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="depth-stencil"></a>

#### Depth и stencil tests

foundation · practice

Тесты глубины и stencil ограничивают видимость и запись.

**Применение:** От вершин до видимых фрагментов.
**Обязательные предпосылки:** [Coverage и rasterization](#rasterization).
- **primary:** [Scratchapixel](https://www.scratchapixel.com/) — Depth и stencil tests — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Depth и stencil tests — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.
- **deep:** [Fundamentals of Computer Graphics](https://www.cs.cornell.edu/~srm/fcg/) — Depth и stencil tests — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Проверь перекрытия с изменением draw order и stencil mask.
**Завершение:** Opaque результат не зависит от порядка; маски воспроизводимы.
**Самопроверка:** Чем depth test отличается от depth write?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="early-z"></a>

#### Early/late Z и overdraw

foundation · practice

Положение depth test относительно shader влияет на стоимость.

**Применение:** От вершин до видимых фрагментов.
**Обязательные предпосылки:** [Depth и stencil tests](#depth-stencil), [Fragment processing](#fragment-stage).
- **primary:** [Scratchapixel](https://www.scratchapixel.com/) — Early/late Z и overdraw — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Early/late Z и overdraw — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.
- **deep:** [Fundamentals of Computer Graphics](https://www.cs.cornell.edu/~srm/fcg/) — Early/late Z и overdraw — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Сравни discard, depth write и opaque pass в capture.
**Завершение:** Есть измерение invocations и объяснение ограничений early Z.
**Самопроверка:** Почему discard может ухудшить early-Z эффективность?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="culling"></a>

#### Face culling и winding

foundation · practice

Backface culling отбрасывает примитивы выбранной ориентации.

**Применение:** От вершин до видимых фрагментов.
**Обязательные предпосылки:** [Primitive assembly и topology](#assembly), [Viewport transform](#viewport).
- **primary:** [Scratchapixel](https://www.scratchapixel.com/) — Face culling и winding — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Face culling и winding — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.
- **deep:** [Fundamentals of Computer Graphics](https://www.cs.cornell.edu/~srm/fcg/) — Face culling и winding — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Проверь отрицательный scale и flipped viewport.
**Завершение:** Culling корректен при смене handedness.
**Самопроверка:** Почему зеркальный transform меняет front face?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="instancing"></a>

#### Draw calls и instancing

foundation · practice

Один draw может повторять mesh с разными instance data.

**Применение:** От вершин до видимых фрагментов.
**Обязательные предпосылки:** [Vertex processing](#vertex-stage).
- **primary:** [Scratchapixel](https://www.scratchapixel.com/) — Draw calls и instancing — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Draw calls и instancing — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.
- **deep:** [Fundamentals of Computer Graphics](https://www.cs.cornell.edu/~srm/fcg/) — Draw calls и instancing — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Сравни тысячи draw calls с одним instanced draw.
**Завершение:** Одинаковое изображение; CPU submission time измерено.
**Самопроверка:** Когда instancing не помогает?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="indirect"></a>

#### Indirect drawing

foundation · practice

Параметры draw могут храниться в GPU buffer.

**Применение:** От вершин до видимых фрагментов.
**Обязательные предпосылки:** [Draw calls и instancing](#instancing), [Buffers и usage flags](#vk-buffers).
- **primary:** [Scratchapixel](https://www.scratchapixel.com/) — Indirect drawing — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Indirect drawing — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.
- **deep:** [Fundamentals of Computer Graphics](https://www.cs.cornell.edu/~srm/fcg/) — Indirect drawing — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Заполни indirect commands на CPU и затем compute.
**Завершение:** Структуры и stride сверены; compute-to-draw barrier корректен.
**Самопроверка:** Как GPU уменьшает число commands без CPU readback?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

## Шейдеры

GLSL, SPIR-V и математические изображения

### Язык и изображения

<a id="glsl"></a>

#### GLSL: stages и interfaces

intermediate · practice

Shader stage имеет собственные inputs, outputs и ограничения.

**Применение:** GLSL, SPIR-V и математические изображения.
**Обязательные предпосылки:** независимая точка входа.
- **primary:** [The Book of Shaders](https://thebookofshaders.com/) — GLSL: stages и interfaces — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — GLSL: stages и interfaces — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Собери vertex/fragment pair с explicit locations.
**Завершение:** Interface mismatch диагностируется; uniforms отделены от varyings.
**Самопроверка:** Чем uniform отличается от interpolated input?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="shader-functions"></a>

#### Shaping functions и маски

intermediate · creative

step, smoothstep и периодические функции строят изображение.

**Применение:** GLSL, SPIR-V и математические изображения.
**Обязательные предпосылки:** [Линейная интерполяция и кривые](#interpolation).
- **primary:** [The Book of Shaders](https://thebookofshaders.com/) — Shaping functions. Название раздела сверено.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Shaping functions и маски — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Нарисуй анимированный плакат из трёх масок без текстур.
**Завершение:** Можешь восстановить изображение из формул без исходника.
**Самопроверка:** Как smoothstep меняет ширину перехода?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="sdf"></a>

#### Signed distance functions

intermediate · creative

SDF задаёт расстояние до границы со знаком внутри.

**Применение:** GLSL, SPIR-V и математические изображения.
**Обязательные предпосылки:** [Векторы, dot и cross](#vectors).
- **primary:** [The Book of Shaders](https://thebookofshaders.com/) — Shapes. Название раздела сверено.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Signed distance functions — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Собери композицию кругов и rounded boxes с union/subtraction.
**Завершение:** Контур имеет предсказуемую толщину при масштабировании.
**Самопроверка:** Когда smooth union перестаёт быть точной distance function?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="noise"></a>

#### Noise и fBm

intermediate · creative

Гладкий noise и суммы октав дают процедурные структуры.

**Применение:** GLSL, SPIR-V и математические изображения.
**Обязательные предпосылки:** [Линейная интерполяция и кривые](#interpolation).
- **primary:** [The Book of Shaders](https://thebookofshaders.com/) — Noise; Fractional brownian motion. Название раздела сверено.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Noise и fBm — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Создай два разных материала одним noise kernel.
**Завершение:** Октавная частота ограничена pixel footprint.
**Самопроверка:** Почему увеличение числа октав вызывает aliasing?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="shader-derivatives"></a>

#### dFdx, dFdy и fwidth

intermediate · creative

Quad derivatives оценивают изменение интерполируемых величин.

**Применение:** GLSL, SPIR-V и математические изображения.
**Обязательные предпосылки:** [Fragment processing](#fragment-stage), [Производные и конечные разности](#derivatives).
- **primary:** [The Book of Shaders](https://thebookofshaders.com/) — dFdx, dFdy и fwidth — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — dFdx, dFdy и fwidth — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Сгладь SDF edge через fwidth и сравни resolutions.
**Завершение:** Толщина edge стабильна; divergent control flow учтён.
**Самопроверка:** Почему derivatives ненадёжны в non-uniform branches?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="ray-marching"></a>

#### Sphere tracing и ray marching

intermediate · creative

Шаг по distance bound ищет пересечение с implicit surface.

**Применение:** GLSL, SPIR-V и математические изображения.
**Обязательные предпосылки:** [Signed distance functions](#sdf), [Perspective и orthographic projection](#projection).
- **primary:** [The Book of Shaders](https://thebookofshaders.com/) — Sphere tracing и ray marching — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Sphere tracing и ray marching — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Покажи вращающуюся SDF сцену с ограничением шагов.
**Завершение:** Есть hit epsilon, max distance и диагностика step count.
**Самопроверка:** Почему переоценённое расстояние пропускает поверхность?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="compute"></a>

#### Compute shaders и workgroups

intermediate · practice

Dispatch разбивает задачу на независимые workgroups.

**Применение:** GLSL, SPIR-V и математические изображения.
**Обязательные предпосылки:** [GLSL: stages и interfaces](#glsl).
- **primary:** [The Book of Shaders](https://thebookofshaders.com/) — Compute shaders и workgroups — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Compute shaders и workgroups — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Сделай image transform kernel с CPU reference.
**Завершение:** Bounds проверены для размеров, не кратных group size.
**Самопроверка:** Можно ли синхронизировать все workgroups одним barrier?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="shader-debug"></a>

#### Shader debugging

intermediate · debug

Visual probes и capture позволяют изолировать неверные данные.

**Применение:** GLSL, SPIR-V и математические изображения.
**Обязательные предпосылки:** [GLSL: stages и interfaces](#glsl).
- **primary:** [The Book of Shaders](https://thebookofshaders.com/) — Shader debugging — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Shader debugging — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Найди intentional NaN и ошибку basis через debug views.
**Завершение:** Есть минимальный пример и исправленный capture.
**Самопроверка:** Как отличить ошибку данных от ошибки BRDF?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

## Геометрия и структуры

Видимость, поиск и пространственная организация

### Объёмы и видимость

<a id="aabb"></a>

#### Axis-aligned bounding box (AABB)

intermediate · practice

AABB — min/max bounds, дешёвый консервативный тест.

**Применение:** Broad phase, frustum culling и ray traversal.
**Преимущества:** Дешёвые union, storage и intersection.
**Ограничения:** Неточен для длинных повёрнутых объектов; зависит от выбранных осей.
**Обязательные предпосылки:** [Векторы, dot и cross](#vectors).
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — 3.7 Bounding Boxes. Название раздела сверено.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Axis-aligned bounding box (AABB) — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Построй bounds mesh и test ray–AABB методом slabs.
**Завершение:** Проверены parallel rays, origin inside и пустые bounds.
**Самопроверка:** Почему rotation увеличивает world-space AABB?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="obb"></a>

#### Oriented bounding box (OBB)

intermediate · practice

OBB хранит ориентированный базис и tighter bounds.

**Применение:** Bounds жёстких ориентированных объектов и collision queries.
**Преимущества:** Меньше false positives у вытянутых rotated meshes.
**Ограничения:** Дороже AABB; объединение и обновление basis сложнее.
**Обязательные предпосылки:** [Матрицы и пространства координат](#matrices), [Axis-aligned bounding box (AABB)](#aabb).
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — Oriented bounding box (OBB) — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Oriented bounding box (OBB) — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Сравни AABB/OBB для длинного вращающегося mesh.
**Завершение:** Измерены false positives и стоимость теста.
**Самопроверка:** Когда tighter bounds не окупают дороже traversal?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="bounding-sphere"></a>

#### Bounding sphere

intermediate · practice

Сфера даёт invariant bounds при поворотах.

**Применение:** Coarse culling, LOD и простые distance queries.
**Преимущества:** Поворот не меняет форму bounds; мало данных.
**Ограничения:** Плохо описывает плоские и вытянутые объекты.
**Обязательные предпосылки:** [Векторы, dot и cross](#vectors).
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — Bounding sphere — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Bounding sphere — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Построй консервативную сферу и проверь все вершины.
**Завершение:** Ни одна вершина не выпадает; non-uniform scale учтён.
**Самопроверка:** Почему среднее вершин не даёт минимальную сферу?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="frustum"></a>

#### Frustum planes

intermediate · practice

Шесть плоскостей ограничивают видимый объём камеры.

**Применение:** Видимость, поиск и пространственная организация.
**Обязательные предпосылки:** [Perspective и orthographic projection](#projection).
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — Frustum planes — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Frustum planes — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Извлеки плоскости из view-projection для Vulkan clip conventions.
**Завершение:** Точки на near/far классифицируются верно.
**Самопроверка:** Почему формулы OpenGL нельзя копировать без проверки Z range?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="frustum-culling"></a>

#### Frustum culling

intermediate · practice

Conservative bounds test исключает объекты вне камеры.

**Применение:** CPU/GPU visibility перед draw submission.
**Преимущества:** Консервативное удаление целых объектов.
**Ограничения:** Не обнаруживает occlusion; intersecting bounds могут быть полностью невидимы.
**Обязательные предпосылки:** [Frustum planes](#frustum), [Axis-aligned bounding box (AABB)](#aabb).
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — Frustum culling — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Frustum culling — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Добавь culling и debug draw отклонённых bounds.
**Завершение:** Нет исчезновений на границе; число draw calls измерено.
**Самопроверка:** Почему пересечение bounds не гарантирует видимый pixel?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="spatial-partition"></a>

#### Spatial partitioning

intermediate · practice

Разбиение пространства и разбиение объектов имеют разные trade-offs.

**Применение:** Видимость, поиск и пространственная организация.
**Обязательные предпосылки:** [Axis-aligned bounding box (AABB)](#aabb).
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — Spatial partitioning — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Spatial partitioning — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Сравни brute-force поиск соседей с partition на наборе объектов.
**Завершение:** Измерены update cost и число кандидатов.
**Самопроверка:** Чем object partition отличается от space partition?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

### Пространственные структуры

<a id="spatial-hash"></a>

#### Spatial hashing

advanced · practice

Hash grid хранит только занятые клетки и допускает hash collisions.

**Применение:** Поиск соседей частиц и динамический broad phase.
**Преимущества:** Sparse storage и быстрые локальные updates.
**Ограничения:** Cell size и hash collisions определяют стоимость; clusters перегружают клетки.
**Обязательные предпосылки:** [Spatial partitioning](#spatial-partition).
- **primary:** [Scratchapixel](https://www.scratchapixel.com/) — Spatial hashing — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Spatial hashing — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Сделай radius query для движущихся точек.
**Завершение:** Результат совпадает с brute-force; collisions не теряют элементы.
**Самопроверка:** Как выбирать cell size для заданного радиуса?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="uniform-grid"></a>

#### Uniform grid

advanced · practice

Регулярная сетка ускоряет локальные запросы при равномерной плотности.

**Применение:** DDA ray traversal и локальные queries равномерных данных.
**Преимущества:** Простая адресация и предсказуемая структура.
**Ограничения:** Пустое пространство и неравномерная плотность расходуют память и работу.
**Обязательные предпосылки:** [Spatial partitioning](#spatial-partition).
- **primary:** [Scratchapixel](https://www.scratchapixel.com/) — Uniform grid — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Uniform grid — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Реализуй grid insertion и DDA ray traversal.
**Завершение:** Проверены границы и нулевые компоненты направления.
**Самопроверка:** Почему неоднородная сцена ухудшает сетку?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="quadtree"></a>

#### Quadtree

advanced · practice

Рекурсивное деление плоскости подходит terrain и 2D visibility.

**Применение:** Terrain patches, 2D region queries и image hierarchies.
**Преимущества:** Адаптивная детализация плоскости.
**Ограничения:** Большие spanning objects и transitions между уровнями требуют отдельной политики.
**Обязательные предпосылки:** [Spatial partitioning](#spatial-partition).
- **primary:** [Scratchapixel](https://www.scratchapixel.com/) — Quadtree — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Quadtree — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Сделай region query на terrain tiles.
**Завершение:** Запрос совпадает с exhaustive search; есть limit глубины.
**Самопроверка:** Как хранить объект, пересекающий несколько квадрантов?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="octree"></a>

#### Octree

advanced · practice

Восемь пространственных ячеек на уровень описывают sparse 3D области.

**Применение:** Sparse voxel volumes и 3D region queries.
**Преимущества:** Адаптивный spatial resolution.
**Ограничения:** Глубокие trees дороги по памяти; объекты на границах требуют duplication или loose bounds.
**Обязательные предпосылки:** [Spatial partitioning](#spatial-partition).
- **primary:** [Scratchapixel](https://www.scratchapixel.com/) — Octree — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Octree — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Построй octree occupancy и region queries.
**Завершение:** Разреженные данные не создают полный dense tree.
**Самопроверка:** Почему большие объекты неудобны для octree?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="kd-tree"></a>

#### k-d tree

advanced · practice

Плоскости разрезают пространство по выбранной оси.

**Применение:** Nearest-neighbor queries и статические spatial datasets.
**Преимущества:** Эффективное отсечение областей при удачных splits.
**Ограничения:** Неоднородность и высокая размерность ухудшают поиск; dynamic updates сложны.
**Обязательные предпосылки:** [Spatial partitioning](#spatial-partition).
- **primary:** [Scratchapixel](https://www.scratchapixel.com/) — k-d tree — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — k-d tree — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Сделай nearest-neighbor query с backtracking.
**Завершение:** Результат совпадает с brute-force, включая равные координаты.
**Самопроверка:** Когда нужно посетить дальнюю сторону split?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="bvh"></a>

#### Bounding Volume Hierarchy (BVH)

advanced · practice

BVH группирует объекты под общими bounds, не деля всё пространство.

**Применение:** CPU ray tracing, collision queries и visibility.
**Преимущества:** Object partition допускает быстрый refit и разные primitive types.
**Ограничения:** Overlapping bounds увеличивают traversal; качество зависит от построения.
**Обязательные предпосылки:** [Axis-aligned bounding box (AABB)](#aabb).
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — 7.3 Bounding Volume Hierarchies. Название раздела сверено.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Bounding Volume Hierarchy (BVH) — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Построй median-split BVH для треугольников.
**Завершение:** Каждый primitive покрыт ancestors; дерево останавливается на leaf threshold.
**Самопроверка:** Почему BVH обычно удобнее для deforming meshes, чем k-d tree?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="sah"></a>

#### Surface Area Heuristic (SAH)

advanced · practice

SAH оценивает ожидаемую стоимость посещения children.

**Применение:** Выбор split при построении BVH.
**Преимущества:** Оценивает ожидаемый traversal cost вместо геометрической красоты.
**Ограничения:** Дополнительный build cost; surface-area probability model зависит от распределения rays.
**Обязательные предпосылки:** [Bounding Volume Hierarchy (BVH)](#bvh), [Вероятность, PDF и expectation](#probability).
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — 7.3 Bounding Volume Hierarchies. Название раздела сверено.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Surface Area Heuristic (SAH) — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Сравни binned SAH и median split на одинаковых сценах.
**Завершение:** Показаны build time и traversal cost; degenerates обработаны.
**Самопроверка:** Почему минимальная площадь одного child не гарантирует лучший split?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="bvh-traversal"></a>

#### BVH traversal

advanced · practice

Traversal отбрасывает bounds и обновляет ближайшее t.

**Применение:** Closest-hit и any-hit queries в CPU renderer.
**Преимущества:** Bounds tests исключают много triangle tests.
**Ограничения:** Worst case остаётся линейным; stack depth и ordering влияют на стоимость.
**Обязательные предпосылки:** [Bounding Volume Hierarchy (BVH)](#bvh), [Ray–triangle intersection](#ray-triangle).
**Рекомендуется:** [Surface Area Heuristic (SAH)](#sah).
- **primary:** [Scratchapixel](https://www.scratchapixel.com/) — BVH traversal — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — BVH traversal — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Реализуй closest-hit traversal с near-first order.
**Завершение:** Hits совпадают с brute-force; число triangle tests снижено.
**Самопроверка:** Как tMax помогает отсечь дальние nodes?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="bvh-refit"></a>

#### BVH refit и rebuild

advanced · practice

Refit обновляет bounds без изменения topology, но может ухудшать качество.

**Применение:** Видимость, поиск и пространственная организация.
**Обязательные предпосылки:** [BVH traversal](#bvh-traversal), [Surface Area Heuristic (SAH)](#sah).
- **primary:** [Scratchapixel](https://www.scratchapixel.com/) — BVH refit и rebuild — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — BVH refit и rebuild — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Деформируй mesh и сравни refit с rebuild.
**Завершение:** График traversal cost показывает момент деградации.
**Самопроверка:** Когда rebuild выгоднее продолжения refit?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="scene-graph"></a>

#### Scene graph и transforms

advanced · practice

Иерархия родительских transforms описывает сцены, а не индекс пространства.

**Применение:** Иерархия transforms, skeletal joints и editor objects.
**Преимущества:** Локальные transforms и dirty propagation.
**Ограничения:** Не является spatial search index; глубокие цепочки затрудняют parallel updates.
**Обязательные предпосылки:** [Матрицы и пространства координат](#matrices).
- **primary:** [Scratchapixel](https://www.scratchapixel.com/) — Scene graph и transforms — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Scene graph и transforms — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Реализуй parent/child transforms и dirty propagation.
**Завершение:** Reparent не создаёт цикл; world transforms проверены.
**Самопроверка:** Почему scene graph не заменяет BVH?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="lod"></a>

#### Level of Detail (LOD)

advanced · practice

Screen-space error выбирает геометрию по видимому размеру.

**Применение:** Terrain, meshes и screen-space geometry budgets.
**Преимущества:** Уменьшает detail там, где он мало влияет на изображение.
**Ограничения:** Popping, silhouette error и cracks требуют transitions и согласования.
**Обязательные предпосылки:** [Perspective и orthographic projection](#projection), [Bounding sphere](#bounding-sphere).
- **primary:** [Scratchapixel](https://www.scratchapixel.com/) — Level of Detail (LOD) — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Level of Detail (LOD) — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Добавь LOD с hysteresis и overlay выбранного уровня.
**Завершение:** Нет дрожания на threshold; ошибки silhouette оценены.
**Самопроверка:** Почему расстояние без учёта FOV недостаточно?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="meshlets"></a>

#### Meshlets

advanced · practice

Маленькие clusters ограничивают локальную геометрию и visibility.

**Применение:** Mesh shaders, cluster culling и streaming geometry.
**Преимущества:** Локальные bounds и compact geometry workload.
**Ограничения:** Есть cluster overhead; плохие границы ухудшают reuse и culling.
**Обязательные предпосылки:** [Axis-aligned bounding box (AABB)](#aabb), [Face culling и winding](#culling).
- **primary:** [Scratchapixel](https://www.scratchapixel.com/) — Meshlets — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Meshlets — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Разбей mesh на clusters, построй bounds и normal cones.
**Завершение:** Каждый triangle учтён; memory overhead измерен.
**Самопроверка:** Когда normal-cone culling становится неконсервативным?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

## Свет и материалы

Радиометрия, BRDF и PBR

### Радиометрия

<a id="solid-angle"></a>

#### Solid angle

intermediate · theory

Телесный угол измеряет область направлений в steradians.

**Применение:** Радиометрия, BRDF и PBR.
**Обязательные предпосылки:** [Векторы, dot и cross](#vectors), [Интегралы и квадратуры](#integrals).
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — Solid angle — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Solid angle — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Вычисли solid angle сферы и малого planar patch.
**Завершение:** Полная сфера даёт 4π; площадь переводится в угол с Jacobian.
**Самопроверка:** Почему одинаковая площадь даёт разный solid angle?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="flux"></a>

#### Radiant flux

intermediate · theory

Поток — энергия света в единицу времени, измеряемая в watts.

**Применение:** Радиометрия, BRDF и PBR.
**Обязательные предпосылки:** [Интегралы и квадратуры](#integrals).
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — 4.1 Radiometry. Название раздела сверено.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Radiant flux — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Проверь баланс мощности isotropic point emitter по сфере.
**Завершение:** Интеграл мощности не зависит от радиуса сферы.
**Самопроверка:** Чем flux отличается от radiant intensity?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="radiance"></a>

#### Radiance

intermediate · theory

Radiance — мощность на projected area и solid angle.

**Применение:** Радиометрия, BRDF и PBR.
**Обязательные предпосылки:** [Solid angle](#solid-angle), [Radiant flux](#flux).
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — 4.1 Radiometry. Название раздела сверено.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Radiance — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Проверь перенос вдоль луча в вакууме и преобразование мер.
**Завершение:** Единицы W/(m²·sr) и cosine factor объяснены.
**Самопроверка:** Почему radiance не подчиняется inverse-square falloff вдоль луча?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="irradiance"></a>

#### Irradiance

intermediate · theory

Irradiance интегрирует входящую radiance с cosine по hemisphere.

**Применение:** Радиометрия, BRDF и PBR.
**Обязательные предпосылки:** [Radiance](#radiance).
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — 4.1 Radiometry. Название раздела сверено.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Irradiance — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Вычисли irradiance от constant environment.
**Завершение:** Ответ равен πL для constant radiance.
**Самопроверка:** Почему irradiance не содержит выходящего направления?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="attenuation"></a>

#### Point, spot и attenuation

intermediate · theory

Точечный источник даёт inverse-square irradiance с учётом угла.

**Применение:** Радиометрия, BRDF и PBR.
**Обязательные предпосылки:** [Radiant flux](#flux), [Векторы, dot и cross](#vectors).
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — Point, spot и attenuation — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Point, spot и attenuation — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Реализуй point/spot с безопасным расстоянием и гладким cone.
**Завершение:** Удвоение distance уменьшает вклад вчетверо при том же угле.
**Самопроверка:** Почему произвольный falloff нарушает смысл световых единиц?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

### Local illumination и BRDF

<a id="lambert"></a>

#### Lambert diffuse

intermediate · practice

Lambert BRDF равна albedo/π и не зависит от outgoing direction.

**Применение:** Радиометрия, BRDF и PBR.
**Обязательные предпосылки:** [Irradiance](#irradiance), [BRDF: определение и единицы](#brdf).
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — 9.2 Diffuse Reflection. Название раздела сверено.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Lambert diffuse — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Проверь constant environment и white furnace для diffuse.
**Завершение:** Выходная radiance равна albedo·L; π не потеряно.
**Самопроверка:** Почему cosθ не является частью Lambert BRDF?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="phong"></a>

#### Phong reflection

intermediate · practice

Phong задаёт эмпирическую specular lobe вокруг reflected direction.

**Применение:** Радиометрия, BRDF и PBR.
**Обязательные предпосылки:** [Векторы, dot и cross](#vectors).
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — Phong reflection — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Phong reflection — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Сравни shininess на сфере и свет под grazing angle.
**Завершение:** Разделены ambient, diffuse и specular; exponent объяснён.
**Самопроверка:** Почему Phong не гарантирует сохранение энергии?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="blinn-phong"></a>

#### Blinn–Phong

intermediate · practice

Half vector заменяет reflected light vector в specular lobe.

**Применение:** Радиометрия, BRDF и PBR.
**Обязательные предпосылки:** [Phong reflection](#phong).
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — Blinn–Phong — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Blinn–Phong — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Сравни highlight с Phong при движении камеры.
**Завершение:** Показано, почему одинаковый exponent даёт разную ширину.
**Самопроверка:** Как half vector связан с microfacet normal?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="brdf"></a>

#### BRDF: определение и единицы

intermediate · practice

BRDF связывает outgoing radiance и differential incident irradiance.

**Применение:** Радиометрия, BRDF и PBR.
**Обязательные предпосылки:** [Radiance](#radiance), [Irradiance](#irradiance).
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — 4.3 Surface Reflection. Название раздела сверено.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — BRDF: определение и единицы — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Запиши integral отражения и проверь единицы каждого множителя.
**Завершение:** BRDF измеряется в sr⁻¹; cosine применяется один раз.
**Самопроверка:** Почему BRDF может быть больше единицы?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="energy"></a>

#### Energy conservation

intermediate · practice

Directional-hemispherical reflectance не должна превышать единицу.

**Применение:** Радиометрия, BRDF и PBR.
**Обязательные предпосылки:** [BRDF: определение и единицы](#brdf), [Интегралы и квадратуры](#integrals).
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — Energy conservation — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Energy conservation — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Численно интегрируй diffuse/specular BRDF на hemisphere.
**Завершение:** Отчёт показывает энергию для нескольких roughness и view angles.
**Самопроверка:** Почему точечная проверка значения BRDF недостаточна?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="reciprocity"></a>

#### Helmholtz reciprocity

intermediate · practice

Для reciprocal материала перестановка входа и выхода сохраняет BRDF.

**Применение:** Радиометрия, BRDF и PBR.
**Обязательные предпосылки:** [BRDF: определение и единицы](#brdf).
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — Helmholtz reciprocity — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Helmholtz reciprocity — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Проверь f(wi,wo)=f(wo,wi) на случайных направлениях.
**Завершение:** Невязка измерена; transmission отдельно учитывает меры и IOR.
**Самопроверка:** Достаточна ли reciprocity для energy conservation?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="rendering-equation"></a>

#### Rendering equation

intermediate · practice

Outgoing radiance состоит из emission и интеграла incoming light с BRDF.

**Применение:** Радиометрия, BRDF и PBR.
**Обязательные предпосылки:** [BRDF: определение и единицы](#brdf), [Интегралы и квадратуры](#integrals).
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — 13.1 The Light Transport Equation. Название раздела сверено.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Rendering equation — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Выведи direct diffuse частный случай для одного источника.
**Завершение:** Emission, visibility, measure и cosine названы отдельно.
**Самопроверка:** Где в уравнении скрыта рекурсивная зависимость света?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="reflection-refraction"></a>

#### Reflection, refraction и Snell

intermediate · practice

Reflection и transmission разделяются по IOR и геометрии.

**Применение:** Радиометрия, BRDF и PBR.
**Обязательные предпосылки:** [Векторы, dot и cross](#vectors).
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — Reflection, refraction и Snell — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Reflection, refraction и Snell — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Реализуй направления reflect/refract и total internal reflection.
**Завершение:** Направления единичны; grazing и IOR=1 проверены.
**Самопроверка:** Когда преломлённого направления не существует?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

### Microfacet theory

<a id="microfacet"></a>

#### Microfacet model

advanced · practice

Поверхность описывается статистикой ориентированных микрограней.

**Применение:** Радиометрия, BRDF и PBR.
**Обязательные предпосылки:** [BRDF: определение и единицы](#brdf).
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — 9.6 Roughness Using Microfacet Theory. Название раздела сверено.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Microfacet model — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Нарисуй normal/half-vector geometry и разложи D, F, G.
**Завершение:** Объяснены видимые нормали и отражённые направления.
**Самопроверка:** Почему D не является BRDF само по себе?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="ndf"></a>

#### Normal Distribution Function

advanced · practice

NDF нормирует projected area микрограней.

**Применение:** Радиометрия, BRDF и PBR.
**Обязательные предпосылки:** [Microfacet model](#microfacet), [Вероятность, PDF и expectation](#probability).
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — Normal Distribution Function — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Normal Distribution Function — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Численно проверь integral D(m)·cosθ по hemisphere.
**Завершение:** Интеграл равен единице в пределах ошибки.
**Самопроверка:** Почему integral D без cosine не обязан быть единицей?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="ggx"></a>

#### GGX / Trowbridge–Reitz NDF

advanced · practice

GGX описывает heavy-tailed распределение microfacet normals.

**Применение:** Радиометрия, BRDF и PBR.
**Обязательные предпосылки:** [Normal Distribution Function](#ndf).
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — 9.6 Roughness Using Microfacet Theory. Название раздела сверено.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — GGX / Trowbridge–Reitz NDF — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Реализуй GGX и sphere grid по roughness.
**Завершение:** Нет NaN при малой roughness; alpha convention задокументирован.
**Самопроверка:** Почему roughness и alpha нельзя бездумно подменять?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="masking"></a>

#### Geometry term: masking и shadowing

advanced · practice

Микрограни могут заслонять друг друга для light/view.

**Применение:** Радиометрия, BRDF и PBR.
**Обязательные предпосылки:** [Microfacet model](#microfacet).
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — Geometry term: masking и shadowing — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Geometry term: masking и shadowing — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Сравни BRDF с G=1 и с masking на grazing angles.
**Завершение:** Объяснено переусиление без geometry term.
**Самопроверка:** Чем masking отличается от macro shadow map?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="smith"></a>

#### Smith model

advanced · practice

Smith связывает masking-shadowing с распределением высот и slopes.

**Применение:** Радиометрия, BRDF и PBR.
**Обязательные предпосылки:** [Geometry term: masking и shadowing](#masking), [GGX / Trowbridge–Reitz NDF](#ggx).
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — Smith model — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Smith model — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Реализуй Smith G для GGX; сравни correlated и separable формы.
**Завершение:** Выбор модели указан; пределы численно проверены.
**Самопроверка:** Почему G должен соответствовать выбранному NDF?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="fresnel"></a>

#### Fresnel equations

advanced · practice

Reflectance зависит от угла, IOR и типа вещества.

**Применение:** Радиометрия, BRDF и PBR.
**Обязательные предпосылки:** [Reflection, refraction и Snell](#reflection-refraction).
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — Fresnel equations — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Fresnel equations — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Вычисли dielectric reflectance от normal до grazing incidence.
**Завершение:** При IOR=1 отражение исчезает; TIR обработано.
**Самопроверка:** Чем conductor отличается от dielectric в Fresnel?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="schlick"></a>

#### Schlick approximation

advanced · practice

Schlick приближает угловую зависимость через F0.

**Применение:** Радиометрия, BRDF и PBR.
**Обязательные предпосылки:** [Fresnel equations](#fresnel).
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — Schlick approximation — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Schlick approximation — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Сравни с exact dielectric Fresnel на графике.
**Завершение:** Ошибка измерена по углу и IOR.
**Самопроверка:** Почему approximation требует осторожности около critical angle?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="cook-torrance"></a>

#### Cook–Torrance BRDF

advanced · practice

Microfacet specular собирает D·F·G и normalization denominator.

**Применение:** Радиометрия, BRDF и PBR.
**Обязательные предпосылки:** [GGX / Trowbridge–Reitz NDF](#ggx), [Smith model](#smith), [Fresnel equations](#fresnel), [Energy conservation](#energy).
**Рекомендуется:** [Helmholtz reciprocity](#reciprocity), [Schlick approximation](#schlick).
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — Cook–Torrance BRDF — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Cook–Torrance BRDF — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Собери BRDF и проверь white furnace на сетке roughness.
**Завершение:** Разделены single-scattering energy loss и ошибки реализации.
**Самопроверка:** Почему single-scattering microfacet model теряет энергию при высокой roughness?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

### PBR и environment

<a id="metallic-roughness"></a>

#### Metallic-roughness workflow

advanced · practice

Metalness разделяет dielectric diffuse и conductor specular.

**Применение:** Радиометрия, BRDF и PBR.
**Обязательные предпосылки:** [Cook–Torrance BRDF](#cook-torrance), [Lambert diffuse](#lambert), [Linear light, sRGB и gamma](#linear-srgb), [Texture sampling](#texture-sampling).
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Metallic-roughness workflow — найти по теме в оглавлении. Точная привязка требует проверки.

**Практика:** Построй material sphere grid с документированным parameter mapping.
**Завершение:** Metal не имеет dielectric diffuse; textures декодированы правильно.
**Самопроверка:** Какие texture channels являются linear data?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="material-params"></a>

#### Material parameterization

advanced · practice

Параметры материала имеют conventions, ranges и единицы.

**Применение:** Радиометрия, BRDF и PBR.
**Обязательные предпосылки:** [Metallic-roughness workflow](#metallic-roughness).
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Material parameterization — найти по теме в оглавлении. Точная привязка требует проверки.

**Практика:** Опиши material schema и robust defaults для missing textures.
**Завершение:** Плохие значения не дают NaN; schema согласована с shader.
**Самопроверка:** Почему разные renderers дают разный вид при одинаковом roughness?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="ibl"></a>

#### Image-Based Lighting (IBL)

advanced · practice

Environment map задаёт incident light по направлениям.

**Применение:** Радиометрия, BRDF и PBR.
**Обязательные предпосылки:** [Rendering equation](#rendering-equation), [Texture sampling](#texture-sampling), [HDR и dynamic range](#hdr).
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Image-Based Lighting (IBL) — найти по теме в оглавлении. Точная привязка требует проверки.

**Практика:** Сделай diffuse + specular reference из HDR environment.
**Завершение:** Orientation, rotation и energy проверены constant environment.
**Самопроверка:** Почему обычная mip chain не является specular convolution?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="diffuse-ibl"></a>

#### Diffuse irradiance convolution

advanced · practice

Diffuse convolution интегрирует environment с cosine kernel.

**Применение:** Радиометрия, BRDF и PBR.
**Обязательные предпосылки:** [Image-Based Lighting (IBL)](#ibl), [Lambert diffuse](#lambert).
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Diffuse irradiance convolution — найти по теме в оглавлении. Точная привязка требует проверки.

**Практика:** Построй irradiance cubemap и сравни с brute-force integration.
**Завершение:** Constant environment даёт ожидаемое πL.
**Самопроверка:** Где деление на π находится в твоём pipeline?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="specular-prefilter"></a>

#### Specular environment prefiltering

advanced · practice

Prefiltered mip levels приближают rough specular integral.

**Применение:** Радиометрия, BRDF и PBR.
**Обязательные предпосылки:** [Image-Based Lighting (IBL)](#ibl), [GGX / Trowbridge–Reitz NDF](#ggx), [Importance sampling](#importance).
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Specular environment prefiltering — найти по теме в оглавлении. Точная привязка требует проверки.

**Практика:** Построй GGX prefilter для нескольких roughness.
**Завершение:** Mips не содержат fireflies; PDF и sample LOD объяснены.
**Самопроверка:** Почему число samples влияет на bright spots?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="split-sum"></a>

#### Split-sum approximation и BRDF LUT

advanced · practice

Environment integral разделяется на prefilter и view/roughness LUT.

**Применение:** Радиометрия, BRDF и PBR.
**Обязательные предпосылки:** [Specular environment prefiltering](#specular-prefilter), [Cook–Torrance BRDF](#cook-torrance).
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Split-sum approximation и BRDF LUT — найти по теме в оглавлении. Точная привязка требует проверки.

**Практика:** Сгенерируй BRDF LUT и сравни с reference integration.
**Завершение:** Погрешность показана на grazing и rough surfaces.
**Самопроверка:** Какая зависимость теряется при предположении N=V?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="clustered"></a>

#### Clustered shading

advanced · practice

3D screen clusters ограничивают список влияющих lights.

**Применение:** Радиометрия, BRDF и PBR.
**Обязательные предпосылки:** [Frustum culling](#frustum-culling), [Compute shaders и workgroups](#compute), [Point, spot и attenuation](#attenuation).
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Clustered shading — найти по теме в оглавлении. Точная привязка требует проверки.

**Практика:** Собери lists по tiles и depth slices.
**Завершение:** Результат совпадает с all-lights baseline; overflow обработан.
**Самопроверка:** Почему clustered лучше tiled при большом depth discontinuity?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="area-lights"></a>

#### Area lights и LTC

advanced · practice

Площадные источники интегрируются по площади или approximating distributions.

**Применение:** Радиометрия, BRDF и PBR.
**Обязательные предпосылки:** [Rendering equation](#rendering-equation), [Cook–Torrance BRDF](#cook-torrance).
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Area lights и LTC — найти по теме в оглавлении. Точная привязка требует проверки.

**Практика:** Сравни Monte Carlo rectangle light с LTC sample implementation.
**Завершение:** Area-to-solid-angle PDF учтена; ограничения формы указаны.
**Самопроверка:** Почему area light не равен точечному источнику в центре?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

## Тени

Видимость света и фильтрация

### Shadow maps

<a id="shadow-map"></a>

#### Shadow mapping

intermediate · practice

Depth map из light space приближает visibility источника.

**Применение:** Видимость света и фильтрация.
**Обязательные предпосылки:** [Depth и stencil tests](#depth-stencil), [Perspective и orthographic projection](#projection).
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Shadow mapping — найти по теме в оглавлении. Точная привязка требует проверки.
- **deep:** [GPU Gems 1–3](https://developer.nvidia.com/gpugems/gpugems/contributors) — Shadow mapping — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Добавь directional light shadow map и depth debug view.
**Завершение:** Light-space transform проверен на контрольных точках.
**Самопроверка:** Почему shadow map требует отдельной проекции?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="shadow-bias"></a>

#### Shadow bias, acne и peter-panning

intermediate · practice

Численная неточность self-shadowing конкурирует с отрывом тени.

**Применение:** Видимость света и фильтрация.
**Обязательные предпосылки:** [Shadow mapping](#shadow-map).
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Shadow bias, acne и peter-panning — найти по теме в оглавлении. Точная привязка требует проверки.
- **deep:** [GPU Gems 1–3](https://developer.nvidia.com/gpugems/gpugems/contributors) — Shadow bias, acne и peter-panning — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Сравни constant/slope bias на разном масштабе сцены.
**Завершение:** Есть набор изображений с acne и peter-panning и выбранные параметры.
**Самопроверка:** Почему слишком большой bias теряет contact shadows?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="pcf"></a>

#### Percentage Closer Filtering (PCF)

intermediate · practice

PCF усредняет результаты depth comparisons.

**Применение:** Видимость света и фильтрация.
**Обязательные предпосылки:** [Shadow mapping](#shadow-map), [Bilinear и trilinear filtering](#texture-filtering).
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Percentage Closer Filtering (PCF) — найти по теме в оглавлении. Точная привязка требует проверки.
- **deep:** [GPU Gems 1–3](https://developer.nvidia.com/gpugems/gpugems/contributors) — Percentage Closer Filtering (PCF) — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Сравни 1/9/25 taps на движущемся контуре.
**Завершение:** Фильтруются comparisons; kernel size и стоимость измерены.
**Самопроверка:** Почему усреднение depth перед compare даёт другой результат?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="csm"></a>

#### Cascaded shadow maps

intermediate · practice

Cascades распределяют shadow resolution по view distance.

**Применение:** Видимость света и фильтрация.
**Обязательные предпосылки:** [Shadow mapping](#shadow-map), [Frustum planes](#frustum).
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Cascaded shadow maps — найти по теме в оглавлении. Точная привязка требует проверки.
- **deep:** [GPU Gems 1–3](https://developer.nvidia.com/gpugems/gpugems/contributors) — Cascaded shadow maps — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Сделай split scheme, stable projection и blending cascades.
**Завершение:** Нет резких швов; camera motion не даёт сильного shimmering.
**Самопроверка:** Как texel snapping стабилизирует каскад?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="vsm"></a>

#### Variance shadow maps (VSM)

intermediate · practice

Два depth moments позволяют оценить visibility с фильтрацией.

**Применение:** Видимость света и фильтрация.
**Обязательные предпосылки:** [Shadow mapping](#shadow-map), [Вероятность, PDF и expectation](#probability).
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Variance shadow maps (VSM) — найти по теме в оглавлении. Точная привязка требует проверки.
- **deep:** [GPU Gems 1–3](https://developer.nvidia.com/gpugems/gpugems/contributors) — Variance shadow maps (VSM) — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Сравни VSM и PCF на occluder с большим depth range.
**Завершение:** Измерен light bleeding; variance не уходит в отрицательные значения.
**Самопроверка:** Почему bound по moments допускает light bleeding?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="pcss"></a>

#### PCSS и soft shadows

intermediate · practice

Blocker search оценивает penumbra от конечного источника.

**Применение:** Видимость света и фильтрация.
**Обязательные предпосылки:** [Percentage Closer Filtering (PCF)](#pcf).
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — PCSS и soft shadows — найти по теме в оглавлении. Точная привязка требует проверки.
- **deep:** [GPU Gems 1–3](https://developer.nvidia.com/gpugems/gpugems/contributors) — PCSS и soft shadows — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Реализуй blocker search и variable-radius filtering.
**Завершение:** Penumbra растёт с расстоянием receiver от blocker.
**Самопроверка:** Как depth reconstruction влияет на penumbra estimate?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="contact-shadows"></a>

#### Contact shadows

intermediate · practice

Короткий screen-space trace добавляет мелкую видимость возле контактов.

**Применение:** Видимость света и фильтрация.
**Обязательные предпосылки:** [Shadow mapping](#shadow-map), [Sphere tracing и ray marching](#ray-marching).
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Contact shadows — найти по теме в оглавлении. Точная привязка требует проверки.
- **deep:** [GPU Gems 1–3](https://developer.nvidia.com/gpugems/gpugems/contributors) — Contact shadows — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Добавь depth-buffer ray trace как дополнение shadow map.
**Завершение:** Off-screen и thickness ограничения показаны явно.
**Самопроверка:** Почему screen-space тень не может восстановить скрытый occluder?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

## Текстуры и цвет

Выборки, поверхность и вывод изображения

### Выборки и поверхность

<a id="uv"></a>

#### UV и parameterization

intermediate · practice

UV отображает surface на texture domain с seam и distortion.

**Применение:** Выборки, поверхность и вывод изображения.
**Обязательные предпосылки:** [Barycentric coordinates](#barycentric).
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — UV и parameterization — найти по теме в оглавлении. Точная привязка требует проверки.

**Практика:** Покажи checker и растяжение на mesh.
**Завершение:** Seams и mirrored UV диагностируются.
**Самопроверка:** Почему один UV chart не покрывает любую поверхность без искажений?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="texture-sampling"></a>

#### Texture sampling

intermediate · practice

Sampler задаёт addressing и reconstruction texels.

**Применение:** Выборки, поверхность и вывод изображения.
**Обязательные предпосылки:** [UV и parameterization](#uv).
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Texture sampling — найти по теме в оглавлении. Точная привязка требует проверки.

**Практика:** Сравни repeat/clamp и nearest/linear на тестовой текстуре.
**Завершение:** Проверены texel centers и границы.
**Самопроверка:** Почему texture coordinate не является индексом texel?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="mipmaps"></a>

#### Mipmaps и footprint

intermediate · practice

Предфильтрация сокращает aliasing при minification.

**Применение:** Выборки, поверхность и вывод изображения.
**Обязательные предпосылки:** [Texture sampling](#texture-sampling).
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Mipmaps и footprint — найти по теме в оглавлении. Точная привязка требует проверки.

**Практика:** Сгенерируй mip chain и покажи выбранный LOD.
**Завершение:** Нет дрожания мелких деталей при движении камеры.
**Самопроверка:** Почему averaging normal maps требует renormalization?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="texture-filtering"></a>

#### Bilinear и trilinear filtering

intermediate · practice

Trilinear смешивает bilinear samples соседних mip levels.

**Применение:** Выборки, поверхность и вывод изображения.
**Обязательные предпосылки:** [Mipmaps и footprint](#mipmaps).
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Bilinear и trilinear filtering — найти по теме в оглавлении. Точная привязка требует проверки.

**Практика:** Сравни nearest/bilinear/trilinear на наклонной плоскости.
**Завершение:** Швы переходов между mips объяснены и проверены.
**Самопроверка:** Чего trilinear не учитывает в elongated footprint?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="anisotropic"></a>

#### Anisotropic filtering

intermediate · practice

Вытянутый footprint требует выборок вдоль разных осей.

**Применение:** Выборки, поверхность и вывод изображения.
**Обязательные предпосылки:** [Bilinear и trilinear filtering](#texture-filtering), [dFdx, dFdy и fwidth](#shader-derivatives).
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Anisotropic filtering — найти по теме в оглавлении. Точная привязка требует проверки.

**Практика:** Измерь качество/стоимость при разных anisotropy limits.
**Завершение:** Разница видна под grazing angle; hardware limit соблюдён.
**Самопроверка:** Почему anisotropy полезнее всего на наклонной поверхности?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="texture-compression"></a>

#### Texture compression: BC, ASTC, KTX

intermediate · practice

Block compression меняет footprint памяти, formats и качество.

**Применение:** Выборки, поверхность и вывод изображения.
**Обязательные предпосылки:** [Mipmaps и footprint](#mipmaps).
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Texture compression: BC, ASTC, KTX — найти по теме в оглавлении. Точная привязка требует проверки.

**Практика:** Сравни compressed и uncompressed color/normal textures.
**Завершение:** Есть размер, upload time, error и format fallback.
**Самопроверка:** Почему normal maps требуют другого выбора channels и format?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="normal-mapping"></a>

#### Normal mapping и TBN

intermediate · practice

Tangent-space normal меняет shading normal без изменения silhouette.

**Применение:** Выборки, поверхность и вывод изображения.
**Обязательные предпосылки:** [Normal matrix и tangent basis](#normal-matrix), [UV и parameterization](#uv), [Texture sampling](#texture-sampling), [Linear light, sRGB и gamma](#linear-srgb).
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Normal mapping и TBN — найти по теме в оглавлении. Точная привязка требует проверки.

**Практика:** Поддержи mirrored UV и handedness tangent.w.
**Завершение:** Non-uniform scale не ломает basis; normal map читается linear.
**Самопроверка:** Почему normal map нельзя декодировать как sRGB?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="parallax"></a>

#### Parallax occlusion mapping

intermediate · practice

Height field смещает lookup вдоль view ray в tangent space.

**Применение:** Выборки, поверхность и вывод изображения.
**Обязательные предпосылки:** [Normal mapping и TBN](#normal-mapping), [Sphere tracing и ray marching](#ray-marching).
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Parallax occlusion mapping — найти по теме в оглавлении. Точная привязка требует проверки.

**Практика:** Реализуй layered height tracing и refinement.
**Завершение:** Описаны grazing artifacts и неизменная silhouette.
**Самопроверка:** Почему POM не заменяет геометрию на краю объекта?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="displacement"></a>

#### Displacement mapping

intermediate · practice

Displacement меняет actual surface и требует достаточной геометрии.

**Применение:** Выборки, поверхность и вывод изображения.
**Обязательные предпосылки:** [Normal mapping и TBN](#normal-mapping).
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Displacement mapping — найти по теме в оглавлении. Точная привязка требует проверки.

**Практика:** Сравни normal/parallax/displaced plane на одном height map.
**Завершение:** Silhouette и bounds обновлены для displaced geometry.
**Самопроверка:** Почему прежние bounds могут вызывать неверный culling?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

### Color pipeline

<a id="linear-srgb"></a>

#### Linear light, sRGB и gamma

intermediate · theory

sRGB encoding отличается от linear intensities и простого power law.

**Применение:** Выборки, поверхность и вывод изображения.
**Обязательные предпосылки:** независимая точка входа.
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Linear light, sRGB и gamma — найти по теме в оглавлении. Точная привязка требует проверки.

**Практика:** Сравни blending и texture sampling в linear и encoded space.
**Завершение:** Round-trip и тест 0.5+0.5 объяснены; encode выполняется один раз.
**Самопроверка:** Какие текстуры нельзя автоматически читать как sRGB?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="color-spaces"></a>

#### Color spaces и gamut

intermediate · theory

Primaries, white point и transfer function описывают разные свойства цвета.

**Применение:** Выборки, поверхность и вывод изображения.
**Обязательные предпосылки:** [Linear light, sRGB и gamma](#linear-srgb), [Матрицы и пространства координат](#matrices).
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Color spaces и gamut — найти по теме в оглавлении. Точная привязка требует проверки.

**Практика:** Переведи тестовые цвета между RGB spaces через XYZ.
**Завершение:** Матрицы и white point указаны; out-of-gamut значения обработаны.
**Самопроверка:** Почему gamma не определяет color gamut?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="hdr"></a>

#### HDR и dynamic range

intermediate · theory

HDR buffers сохраняют значения света выше display white.

**Применение:** Выборки, поверхность и вывод изображения.
**Обязательные предпосылки:** [Linear light, sRGB и gamma](#linear-srgb).
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — HDR и dynamic range — найти по теме в оглавлении. Точная привязка требует проверки.

**Практика:** Сохрани HDR gradient и проверь float attachment formats.
**Завершение:** Bright values не clamp до tone mapping.
**Самопроверка:** Чем HDR scene buffer отличается от HDR display output?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="exposure"></a>

#### Exposure и EV

intermediate · theory

Экспозиция масштабирует radiance до display mapping.

**Применение:** Выборки, поверхность и вывод изображения.
**Обязательные предпосылки:** [HDR и dynamic range](#hdr).
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Exposure и EV — найти по теме в оглавлении. Точная привязка требует проверки.

**Практика:** Добавь ручную EV настройку и histogram luminance.
**Завершение:** Сдвиг на +1 EV удваивает сигнал до tone mapping.
**Самопроверка:** Почему auto exposure требует temporal adaptation?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="tone-mapping"></a>

#### Tone mapping

intermediate · theory

Display mapping сжимает диапазон и меняет восприятие контраста.

**Применение:** Выборки, поверхность и вывод изображения.
**Обязательные предпосылки:** [Exposure и EV](#exposure), [Color spaces и gamut](#color-spaces).
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Tone mapping — найти по теме в оглавлении. Точная привязка требует проверки.

**Практика:** Сравни Reinhard и выбранный filmic operator на HDR scene.
**Завершение:** Есть bright-color и dark-gradient tests; output encoding один.
**Самопроверка:** Почему tone mapping не восстанавливает clipped HDR данные?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

## Ray tracing

Пересечения, ускорение и интеграторы

### Лучи и intersections

<a id="camera-rays"></a>

#### Ray generation

intermediate · practice

Camera ray проходит через sample на image plane.

**Применение:** Пересечения, ускорение и интеграторы.
**Обязательные предпосылки:** [Perspective и orthographic projection](#projection).
- **primary:** [Ray Tracing in One Weekend — серия](https://raytracing.github.io/) — Ray generation — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Ray generation — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.
- **deep:** [Ray Tracing Gems I / II](https://www.realtimerendering.com/raytracinggems/) — Ray generation — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Сравни ray направления с inverse view-projection.
**Завершение:** Center/corners и jittered samples согласованы с raster camera.
**Самопроверка:** Почему ray origin зависит от типа камеры?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="ray-sphere"></a>

#### Ray–sphere intersection

intermediate · practice

Квадратное уравнение даёт возможные t пересечений сферы.

**Применение:** Пересечения, ускорение и интеграторы.
**Обязательные предпосылки:** [Векторы, dot и cross](#vectors).
- **primary:** [Ray Tracing in One Weekend — серия](https://raytracing.github.io/) — Ray–sphere intersection — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Ray–sphere intersection — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.
- **deep:** [Ray Tracing Gems I / II](https://www.realtimerendering.com/raytracinggems/) — Ray–sphere intersection — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Реализуй устойчивые roots и range test.
**Завершение:** Inside, tangent и far-away случаи совпадают с double reference.
**Самопроверка:** Почему отрицательное t обычно исключают?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="ray-triangle"></a>

#### Ray–triangle intersection

intermediate · practice

Intersection проверяет plane hit и barycentric bounds.

**Применение:** Пересечения, ускорение и интеграторы.
**Обязательные предпосылки:** [Barycentric coordinates](#barycentric).
- **primary:** [Ray Tracing in One Weekend — серия](https://raytracing.github.io/) — Ray–triangle intersection — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Ray–triangle intersection — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.
- **deep:** [Ray Tracing Gems I / II](https://www.realtimerendering.com/raytracinggems/) — Ray–triangle intersection — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Реализуй Möller–Trumbore с degenerate cases.
**Завершение:** Проверены edge hits, parallel rays и nearest positive t.
**Самопроверка:** Где epsilon может создавать cracks на общем ребре?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="recursive-rt"></a>

#### Recursive ray tracing

intermediate · practice

Вторичные отражённые и преломлённые rays продолжают light query.

**Применение:** Пересечения, ускорение и интеграторы.
**Обязательные предпосылки:** [Ray generation](#camera-rays), [Ray–triangle intersection](#ray-triangle), [Reflection, refraction и Snell](#reflection-refraction).
- **primary:** [Ray Tracing in One Weekend — серия](https://raytracing.github.io/) — Recursive ray tracing — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Recursive ray tracing — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.
- **deep:** [Ray Tracing Gems I / II](https://www.realtimerendering.com/raytracinggems/) — Recursive ray tracing — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Сделай небольшой CPU tracer с mirrors и glass.
**Завершение:** Depth bound и ray origin offset предотвращают self-hit.
**Самопроверка:** Почему фиксированная recursion depth вносит truncation bias?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="path-tracing"></a>

#### Path tracing

intermediate · practice

Случайные пути оценивают многократное рассеяние света.

**Применение:** Пересечения, ускорение и интеграторы.
**Обязательные предпосылки:** [Rendering equation](#rendering-equation), [Monte Carlo integration](#monte-carlo), [Recursive ray tracing](#recursive-rt).
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — 13.2 Path Tracing. Название раздела сверено.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Path tracing — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.
- **deep:** [Ray Tracing Gems I / II](https://www.realtimerendering.com/raytracinggems/) — Path tracing — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Собери diffuse path tracer с deterministic seed.
**Завершение:** Constant environment reference сходится; throughput обновляется с PDF.
**Самопроверка:** Почему число bounces влияет на bias и cost?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="next-event"></a>

#### Next Event Estimation

intermediate · practice

Явная выборка lights уменьшает variance direct illumination.

**Применение:** Пересечения, ускорение и интеграторы.
**Обязательные предпосылки:** [Path tracing](#path-tracing), [Importance sampling](#importance).
- **primary:** [Ray Tracing in One Weekend — серия](https://raytracing.github.io/) — Next Event Estimation — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Next Event Estimation — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.
- **deep:** [Ray Tracing Gems I / II](https://www.realtimerendering.com/raytracinggems/) — Next Event Estimation — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Добавь shadow ray и light sampling для area emitter.
**Завершение:** Нет двойного учёта emission; area PDF переведена в solid angle.
**Самопроверка:** Когда light sampling эффективнее BSDF sampling?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="mis"></a>

#### Multiple Importance Sampling (MIS)

intermediate · practice

MIS комбинирует стратегии, взвешивая их PDFs.

**Применение:** Пересечения, ускорение и интеграторы.
**Обязательные предпосылки:** [Next Event Estimation](#next-event).
- **primary:** [Ray Tracing in One Weekend — серия](https://raytracing.github.io/) — Multiple Importance Sampling (MIS) — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Multiple Importance Sampling (MIS) — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.
- **deep:** [Ray Tracing Gems I / II](https://www.realtimerendering.com/raytracinggems/) — Multiple Importance Sampling (MIS) — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Сравни BSDF-only, light-only и balance/power heuristic.
**Завершение:** Средние согласованы; variance и PDF measures проверены.
**Самопроверка:** Почему PDFs разных мер нельзя сравнивать напрямую?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="russian-roulette"></a>

#### Russian roulette

intermediate · practice

Случайное завершение путей сохраняет expectation при compensation.

**Применение:** Пересечения, ускорение и интеграторы.
**Обязательные предпосылки:** [Path tracing](#path-tracing), [Вероятность, PDF и expectation](#probability).
- **primary:** [Ray Tracing in One Weekend — серия](https://raytracing.github.io/) — Russian roulette — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Russian roulette — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.
- **deep:** [Ray Tracing Gems I / II](https://www.realtimerendering.com/raytracinggems/) — Russian roulette — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Сравни fixed depth и roulette при равном бюджете.
**Завершение:** Weights делятся на survival probability; variance измерена.
**Самопроверка:** Почему просто обрывать тёмные пути даёт bias?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

### Hardware RT

<a id="rt-acceleration"></a>

#### BLAS и TLAS

advanced · practice

Hardware acceleration structures разделяют geometry и instances.

**Применение:** Пересечения, ускорение и интеграторы.
**Обязательные предпосылки:** [Bounding Volume Hierarchy (BVH)](#bvh), [Memory heaps, types и allocation](#vk-memory), [Buffers и usage flags](#vk-buffers), [Pipeline barriers и synchronization2](#barriers).
- **primary:** [Khronos Vulkan Samples](https://github.com/KhronosGroup/Vulkan-Samples) — BLAS и TLAS — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — BLAS и TLAS — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.
- **deep:** [Ray Tracing Gems I / II](https://www.realtimerendering.com/raytracinggems/) — BLAS и TLAS — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Построй BLAS/TLAS с scratch allocation и instance transforms.
**Завершение:** Размеры, alignment и build-to-trace barriers проверены.
**Самопроверка:** Чем update AS отличается от rebuild?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="rt-pipeline"></a>

#### Vulkan ray tracing pipeline

advanced · practice

Raygen, miss и hit groups задают программируемые стадии trace.

**Применение:** Пересечения, ускорение и интеграторы.
**Обязательные предпосылки:** [BLAS и TLAS](#rt-acceleration), [Shader modules и SPIR-V](#spirv), [Pipeline layout](#pipeline-layout).
- **primary:** [Khronos Vulkan Samples](https://github.com/KhronosGroup/Vulkan-Samples) — Vulkan ray tracing pipeline — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Vulkan ray tracing pipeline — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.
- **deep:** [Ray Tracing Gems I / II](https://www.realtimerendering.com/raytracinggems/) — Vulkan ray tracing pipeline — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Собери минимальный RT pipeline с feature detection.
**Завершение:** Unsupported GPU получает понятный fallback.
**Самопроверка:** Какие extensions и features нужны именно твоему pipeline?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="sbt"></a>

#### Shader Binding Table

advanced · practice

SBT связывает rays и geometry с shader groups и records.

**Применение:** Пересечения, ускорение и интеграторы.
**Обязательные предпосылки:** [Vulkan ray tracing pipeline](#rt-pipeline).
- **primary:** [Khronos Vulkan Samples](https://github.com/KhronosGroup/Vulkan-Samples) — Shader Binding Table — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Shader Binding Table — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.
- **deep:** [Ray Tracing Gems I / II](https://www.realtimerendering.com/raytracinggems/) — Shader Binding Table — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Построй aligned SBT по device properties.
**Завершение:** Handle size/stride/base alignment соблюдены.
**Самопроверка:** Почему SBT нельзя упаковать произвольным sizeof структуры?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="ray-query"></a>

#### Vulkan ray query

advanced · practice

Inline traversal выполняется внутри обычного shader.

**Применение:** Пересечения, ускорение и интеграторы.
**Обязательные предпосылки:** [BLAS и TLAS](#rt-acceleration), [Compute shaders и workgroups](#compute).
- **primary:** [Khronos Vulkan Samples](https://github.com/KhronosGroup/Vulkan-Samples) — Vulkan ray query — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Vulkan ray query — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.
- **deep:** [Ray Tracing Gems I / II](https://www.realtimerendering.com/raytracinggems/) — Vulkan ray query — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Добавь ray-query hard shadows в raster renderer.
**Завершение:** Есть feature fallback и comparison со shadow map.
**Самопроверка:** Когда ray query проще отдельного RT pipeline?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="rt-denoise"></a>

#### Ray tracing denoising

advanced · practice

Reconstruction использует geometry и history для редких samples.

**Применение:** Пересечения, ускорение и интеграторы.
**Обязательные предпосылки:** [Path tracing](#path-tracing), [Temporal accumulation](#temporal-accumulation).
- **primary:** [Khronos Vulkan Samples](https://github.com/KhronosGroup/Vulkan-Samples) — Ray tracing denoising — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Ray tracing denoising — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.
- **deep:** [Ray Tracing Gems I / II](https://www.realtimerendering.com/raytracinggems/) — Ray tracing denoising — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Сравни noisy input, spatial filter и temporal reconstruction.
**Завершение:** Показаны ghosting/disocclusion cases и reference high-SPP.
**Самопроверка:** Почему низкая дисперсия не гарантирует отсутствие bias?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

## Global illumination

Перенос света и современные приближения

### Фундамент переноса света

<a id="light-transport"></a>

#### Light transport и transport paths

advanced · practice

Path classes отделяют direct, indirect, diffuse и specular transport.

**Применение:** Перенос света и современные приближения.
**Обязательные предпосылки:** [Rendering equation](#rendering-equation), [Path tracing](#path-tracing).
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — Light transport и transport paths — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Light transport и transport paths — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.
- **deep:** [Advances in Real-Time Rendering](https://advances.realtimerendering.com/) — Light transport и transport paths — выбрать доклад по названию алгоритма; привязка требует проверки. Точная привязка требует проверки.

**Практика:** Разложи reference scene на direct/indirect AOV.
**Завершение:** Сумма компонент воспроизводит baseline.
**Самопроверка:** Почему AO не является решением global illumination?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

### Классические приближения

<a id="light-probes"></a>

#### Light probes и spherical harmonics

advanced · practice

Редкие directional samples приближают environment в пространстве.

**Применение:** Перенос света и современные приближения.
**Обязательные предпосылки:** [Diffuse irradiance convolution](#diffuse-ibl).
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — Light probes и spherical harmonics — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Light probes и spherical harmonics — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.
- **deep:** [Advances in Real-Time Rendering](https://advances.realtimerendering.com/) — Light probes и spherical harmonics — выбрать доклад по названию алгоритма; привязка требует проверки. Точная привязка требует проверки.

**Практика:** Спроецируй irradiance в low-order SH и вращай lighting.
**Завершение:** Constant environment воспроизводится; ringing показан.
**Самопроверка:** Почему low-order SH не хранит sharp specular reflections?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="irradiance-volume"></a>

#### Irradiance volumes

advanced · practice

Сетка probes интерполирует low-frequency indirect light.

**Применение:** Перенос света и современные приближения.
**Обязательные предпосылки:** [Light probes и spherical harmonics](#light-probes).
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — Irradiance volumes — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Irradiance volumes — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.
- **deep:** [Advances in Real-Time Rendering](https://advances.realtimerendering.com/) — Irradiance volumes — выбрать доклад по названию алгоритма; привязка требует проверки. Точная привязка требует проверки.

**Практика:** Добавь trilinear interpolation и debug visualization probes.
**Завершение:** Показаны leaking и границы сетки.
**Самопроверка:** Почему интерполяция через стену даёт light leaks?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="voxel-gi"></a>

#### Voxel cone tracing

advanced · practice

Voxel representation позволяет приближённо интегрировать широкий cone.

**Применение:** Перенос света и современные приближения.
**Обязательные предпосылки:** [Octree](#octree), [Light transport и transport paths](#light-transport).
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — Voxel cone tracing — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Voxel cone tracing — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.
- **deep:** [Advances in Real-Time Rendering](https://advances.realtimerendering.com/) — Voxel cone tracing — выбрать доклад по названию алгоритма; привязка требует проверки. Точная привязка требует проверки.

**Практика:** Построй маленький voxel GI prototype с mip hierarchy.
**Завершение:** Описаны resolution limits, leaks и memory cost.
**Самопроверка:** Как cone aperture выбирает mip level?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

### Современные техники

<a id="ssgi"></a>

#### Screen-space GI

advanced · practice

Depth/color buffers дают неполное приближение indirect light.

**Применение:** Перенос света и современные приближения.
**Обязательные предпосылки:** [Light transport и transport paths](#light-transport), [Depth и stencil tests](#depth-stencil).
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — Screen-space GI — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Screen-space GI — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.
- **deep:** [Advances in Real-Time Rendering](https://advances.realtimerendering.com/) — Screen-space GI — выбрать доклад по названию алгоритма; привязка требует проверки. Точная привязка требует проверки.

**Практика:** Сделай ограниченный diffuse screen-space bounce.
**Завершение:** Off-screen вклад явно отсутствует; noise измерен.
**Самопроверка:** Почему history не может восстановить никогда не видимую геометрию?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="ddgi"></a>

#### Dynamic Diffuse Global Illumination (DDGI)

advanced · practice

Ray-updated probes хранят irradiance и visibility moments.

**Применение:** Перенос света и современные приближения.
**Обязательные предпосылки:** [Irradiance volumes](#irradiance-volume), [Vulkan ray query](#ray-query), [Temporal accumulation](#temporal-accumulation).
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — Dynamic Diffuse Global Illumination (DDGI) — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Dynamic Diffuse Global Illumination (DDGI) — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.
- **deep:** [Advances in Real-Time Rendering](https://advances.realtimerendering.com/) — Dynamic Diffuse Global Illumination (DDGI) — выбрать доклад по названию алгоритма; привязка требует проверки. Точная привязка требует проверки.

**Практика:** Сделай небольшую probe grid с relocation/classification экспериментом.
**Завершение:** Есть сравнение с path-traced reference и измерение update budget.
**Самопроверка:** Как visibility moments уменьшают leaking?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="restir"></a>

#### ReSTIR DI: reservoir resampling

advanced · practice

Reservoir хранит взвешенную выборку и позволяет повторно использовать кандидатов.

**Применение:** Перенос света и современные приближения.
**Обязательные предпосылки:** [Multiple Importance Sampling (MIS)](#mis), [Temporal accumulation](#temporal-accumulation).
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — ReSTIR DI: reservoir resampling — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — ReSTIR DI: reservoir resampling — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.
- **deep:** [Advances in Real-Time Rendering](https://advances.realtimerendering.com/) — ReSTIR DI: reservoir resampling — выбрать доклад по названию алгоритма; привязка требует проверки. Точная привязка требует проверки.

**Практика:** Начни с CPU reservoir estimator, затем отдельный DI prototype.
**Завершение:** Среднее проверено на известном распределении; reuse bias обсуждён.
**Самопроверка:** Почему reservoir с одним sample хранит сведения о многих кандидатах?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

### Исследовательские направления

<a id="restir-gi"></a>

#### ReSTIR GI: исследовательская ветка

advanced · practice

Повторное использование indirect paths требует дополнительных Jacobians и visibility checks.

**Применение:** Перенос света и современные приближения.
**Обязательные предпосылки:** [ReSTIR DI: reservoir resampling](#restir), [Light transport и transport paths](#light-transport).
- **primary:** [Physically Based Rendering: From Theory to Implementation, 4e](https://pbr-book.org/4ed/contents) — ReSTIR GI: исследовательская ветка — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — ReSTIR GI: исследовательская ветка — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.
- **deep:** [Advances in Real-Time Rendering](https://advances.realtimerendering.com/) — ReSTIR GI: исследовательская ветка — выбрать доклад по названию алгоритма; привязка требует проверки. Точная привязка требует проверки.

**Практика:** Разбери один original paper и воспроизведи ограниченный scene case.
**Завершение:** Названы assumptions, bias sources и отличия от ReSTIR DI.
**Самопроверка:** Почему перенос indirect sample между surfaces сложнее DI?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

## Post-processing

Экранные и временные методы

### Экранные эффекты

<a id="multi-pass"></a>

#### Multi-pass rendering

intermediate · practice

Ресурсы проходят producer/consumer passes с явными состояниями.

**Применение:** Экранные и временные методы.
**Обязательные предпосылки:** [Pipeline barriers и synchronization2](#barriers), [Dynamic rendering](#dynamic-rendering).
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Multi-pass rendering — найти по теме в оглавлении. Точная привязка требует проверки.

**Практика:** Раздели scene color и fullscreen composite pass.
**Завершение:** Layouts и barriers объяснены для каждого перехода.
**Самопроверка:** Почему render order сам по себе не гарантирует memory visibility?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="bloom"></a>

#### Bloom

intermediate · practice

Bloom рассеивает bright signal по нескольким scales.

**Применение:** Экранные и временные методы.
**Обязательные предпосылки:** [Multi-pass rendering](#multi-pass), [HDR и dynamic range](#hdr).
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Bloom — найти по теме в оглавлении. Точная привязка требует проверки.

**Практика:** Сделай downsample/upsample chain и impulse test.
**Завершение:** Энергия impulse измерена; resize не ломает mip chain.
**Самопроверка:** Почему threshold влияет на физический смысл bloom?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="ssao"></a>

#### Screen-Space Ambient Occlusion (SSAO)

intermediate · practice

Локальный depth neighbourhood оценивает occlusion hemisphere.

**Применение:** Экранные и временные методы.
**Обязательные предпосылки:** [Depth и stencil tests](#depth-stencil), [Perspective и orthographic projection](#projection).
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Screen-Space Ambient Occlusion (SSAO) — найти по теме в оглавлении. Точная привязка требует проверки.

**Практика:** Добавь SSAO и bilateral blur с view-space reconstruction.
**Завершение:** Radius имеет world-space смысл; halo cases показаны.
**Самопроверка:** Почему AO нельзя умножать на любой direct light?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="gtao"></a>

#### Ground-Truth Ambient Occlusion (GTAO)

intermediate · practice

Horizon-based integration точнее оценивает visibility по slices.

**Применение:** Экранные и временные методы.
**Обязательные предпосылки:** [Screen-Space Ambient Occlusion (SSAO)](#ssao).
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Ground-Truth Ambient Occlusion (GTAO) — найти по теме в оглавлении. Точная привязка требует проверки.

**Практика:** Сравни GTAO и SSAO с ray-traced AO reference.
**Завершение:** Thin objects и camera motion проверены.
**Самопроверка:** Что означает ground truth в названии приближения?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="ssr"></a>

#### Screen-Space Reflections (SSR)

intermediate · practice

Reflection ray проходит через неполную screen-space geometry.

**Применение:** Экранные и временные методы.
**Обязательные предпосылки:** [Reflection, refraction и Snell](#reflection-refraction), [Depth и stencil tests](#depth-stencil), [Multi-pass rendering](#multi-pass).
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Screen-Space Reflections (SSR) — найти по теме в оглавлении. Точная привязка требует проверки.

**Практика:** Реализуй hierarchical depth trace и environment fallback.
**Завершение:** Показаны thickness, off-screen и rough-surface ограничения.
**Самопроверка:** Почему SSR требует fallback даже при идеальном marching?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="motion-blur"></a>

#### Motion blur

intermediate · practice

Velocity buffer приближает интегрирование во времени экспозиции.

**Применение:** Экранные и временные методы.
**Обязательные предпосылки:** [Motion vectors](#motion-vectors).
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Motion blur — найти по теме в оглавлении. Точная привязка требует проверки.

**Практика:** Добавь velocity-based blur с depth-aware gather.
**Завершение:** Camera cuts и неподвижные pixels обработаны.
**Самопроверка:** Какие движения не описывает один velocity vector?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="dof"></a>

#### Depth of field

intermediate · practice

Circle of confusion зависит от focus distance и aperture.

**Применение:** Экранные и временные методы.
**Обязательные предпосылки:** [Perspective и orthographic projection](#projection), [HDR и dynamic range](#hdr).
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Depth of field — найти по теме в оглавлении. Точная привязка требует проверки.

**Практика:** Реализуй near/far CoC и отдельную обработку foreground.
**Завершение:** Показаны foreground bleeding и focus transitions.
**Самопроверка:** Почему обычный variable-radius blur даёт неверную окклюзию?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

### Временные методы

<a id="motion-vectors"></a>

#### Motion vectors

advanced · practice

Velocity сравнивает положения одного surface sample в разных кадрах.

**Применение:** Экранные и временные методы.
**Обязательные предпосылки:** [Матрицы и пространства координат](#matrices), [Scene graph и transforms](#scene-graph).
- **primary:** [Advances in Real-Time Rendering](https://advances.realtimerendering.com/) — Motion vectors — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Motion vectors — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Построй current/previous transforms и debug velocity.
**Завершение:** Camera-only, object-only и zero motion проверены.
**Самопроверка:** Как jitter влияет на convention motion vectors?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="temporal-accumulation"></a>

#### Temporal accumulation

advanced · practice

Reprojection переносит history к текущим samples.

**Применение:** Экранные и временные методы.
**Обязательные предпосылки:** [Motion vectors](#motion-vectors), [Texture sampling](#texture-sampling).
- **primary:** [Advances in Real-Time Rendering](https://advances.realtimerendering.com/) — Temporal accumulation — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Temporal accumulation — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Сделай running average и reject по depth/normal.
**Завершение:** Disocclusion, camera cut и resize сбрасывают неверную history.
**Самопроверка:** Почему совпадение screen position не гарантирует совпадение surface?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="taa"></a>

#### Temporal Anti-Aliasing (TAA)

advanced · practice

Jitter и history reconstruction уменьшают aliasing во времени.

**Применение:** Экранные и временные методы.
**Обязательные предпосылки:** [Temporal accumulation](#temporal-accumulation), [dFdx, dFdy и fwidth](#shader-derivatives).
- **primary:** [Advances in Real-Time Rendering](https://advances.realtimerendering.com/) — Temporal Anti-Aliasing (TAA) — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Temporal Anti-Aliasing (TAA) — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Собери TAA с neighborhood clamp и rejection.
**Завершение:** Есть сравнение ghosting, shimmer и blur на движущейся сцене.
**Самопроверка:** Почему сильное history blending может скрыть ошибки reprojection?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="spatial-denoise"></a>

#### Spatial denoising и bilateral filter

advanced · practice

Edge-aware weights сохраняют boundaries по depth/normal.

**Применение:** Экранные и временные методы.
**Обязательные предпосылки:** [Bilinear и trilinear filtering](#texture-filtering).
- **primary:** [Advances in Real-Time Rendering](https://advances.realtimerendering.com/) — Spatial denoising и bilateral filter — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Spatial denoising и bilateral filter — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Сравни Gaussian и bilateral filter на noisy AO.
**Завершение:** Измерены edge leakage и variance.
**Самопроверка:** Почему большие kernels не гарантируют лучшее восстановление?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="upscaling"></a>

#### Spatial и temporal upscaling

advanced · practice

Восстановление высокого разрешения использует spatial priors и history.

**Применение:** Экранные и временные методы.
**Обязательные предпосылки:** [Temporal Anti-Aliasing (TAA)](#taa).
- **primary:** [Advances in Real-Time Rendering](https://advances.realtimerendering.com/) — Spatial и temporal upscaling — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Spatial и temporal upscaling — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Сравни bilinear, spatial reconstruction и temporal baseline.
**Завершение:** Есть одинаковые input resolution, timings и quality crops.
**Самопроверка:** Какие данные temporal upscaler требует от renderer?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

## GPU и производительность

Исполнение, память и измерения

### Исполнение и память

<a id="simt"></a>

#### SIMD/SIMT, warps и wavefronts

intermediate · performance

Логические threads исполняются группами с общими ресурсами.

**Применение:** Исполнение, память и измерения.
**Обязательные предпосылки:** независимая точка входа.
- **primary:** [Programming Massively Parallel Processors](https://www.sciencedirect.com/book/9780323912310/programming-massively-parallel-processors) — SIMD/SIMT, warps и wavefronts — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Radeon GPU Profiler](https://gpuopen.com/rgp/) — SIMD/SIMT, warps и wavefronts — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Нарисуй mapping threads/workgroups/waves для выбранного GPU.
**Завершение:** Hardware-specific ширина проверена в документации.
**Самопроверка:** Почему wave не равен workgroup?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="divergence"></a>

#### Branch divergence

intermediate · performance

Разные control paths внутри wave снижают эффективность исполнения.

**Применение:** Исполнение, память и измерения.
**Обязательные предпосылки:** [SIMD/SIMT, warps и wavefronts](#simt), [Compute shaders и workgroups](#compute).
- **primary:** [Programming Massively Parallel Processors](https://www.sciencedirect.com/book/9780323912310/programming-massively-parallel-processors) — Branch divergence — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Radeon GPU Profiler](https://gpuopen.com/rgp/) — Branch divergence — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Сравни coherent и alternating branches с одинаковой работой.
**Завершение:** Проверен compiler output и GPU time.
**Самопроверка:** Почему наличие if само по себе не доказывает slowdown?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="gpu-cache"></a>

#### GPU memory hierarchy и caches

intermediate · performance

Registers, shared memory и caches имеют разную область и стоимость.

**Применение:** Исполнение, память и измерения.
**Обязательные предпосылки:** [SIMD/SIMT, warps и wavefronts](#simt).
- **primary:** [Programming Massively Parallel Processors](https://www.sciencedirect.com/book/9780323912310/programming-massively-parallel-processors) — GPU memory hierarchy и caches — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Radeon GPU Profiler](https://gpuopen.com/rgp/) — GPU memory hierarchy и caches — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Сравни sequential/random reads и working sets.
**Завершение:** Есть throughput curve по размеру набора.
**Самопроверка:** Почему высокий cache hit rate не гарантирует быстрый pass?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="coalescing"></a>

#### Memory coalescing

intermediate · performance

Соседние lanes выгоднее обслуживать небольшим числом transactions.

**Применение:** Исполнение, память и измерения.
**Обязательные предпосылки:** [GPU memory hierarchy и caches](#gpu-cache), [Compute shaders и workgroups](#compute).
- **primary:** [Programming Massively Parallel Processors](https://www.sciencedirect.com/book/9780323912310/programming-massively-parallel-processors) — Memory coalescing — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Radeon GPU Profiler](https://gpuopen.com/rgp/) — Memory coalescing — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Сравни AoS/SoA и strided access на одинаковых данных.
**Завершение:** Результаты совпадают; bandwidth и timings измерены.
**Самопроверка:** Как layout влияет на bytes transferred, а не только bytes requested?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="occupancy"></a>

#### Occupancy и register pressure

intermediate · performance

Residency ограничена registers, shared memory и scheduling capacity.

**Применение:** Исполнение, память и измерения.
**Обязательные предпосылки:** [SIMD/SIMT, warps и wavefronts](#simt), [Compute shaders и workgroups](#compute).
- **primary:** [Programming Massively Parallel Processors](https://www.sciencedirect.com/book/9780323912310/programming-massively-parallel-processors) — Occupancy и register pressure — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Radeon GPU Profiler](https://gpuopen.com/rgp/) — Occupancy и register pressure — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Измени workgroup size и local storage, измерь kernel.
**Завершение:** Показаны register usage, occupancy и итоговый time.
**Самопроверка:** Почему максимальная occupancy не всегда оптимальна?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="shared-memory"></a>

#### Shared memory и workgroup barriers

intermediate · performance

Локальная память помогает reuse внутри workgroup.

**Применение:** Исполнение, память и измерения.
**Обязательные предпосылки:** [Compute shaders и workgroups](#compute), [SIMD/SIMT, warps и wavefronts](#simt).
- **primary:** [Programming Massively Parallel Processors](https://www.sciencedirect.com/book/9780323912310/programming-massively-parallel-processors) — Shared memory и workgroup barriers — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Radeon GPU Profiler](https://gpuopen.com/rgp/) — Shared memory и workgroup barriers — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Сделай tiled transpose с barrier и edge handling.
**Завершение:** CPU reference совпадает; bank conflicts рассмотрены.
**Самопроверка:** Почему условный barrier может привести к deadlock?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="bandwidth-latency"></a>

#### Bandwidth, latency и bottleneck

intermediate · performance

Предел throughput и задержка отдельной операции — разные характеристики.

**Применение:** Исполнение, память и измерения.
**Обязательные предпосылки:** [GPU memory hierarchy и caches](#gpu-cache).
- **primary:** [Programming Massively Parallel Processors](https://www.sciencedirect.com/book/9780323912310/programming-massively-parallel-processors) — Bandwidth, latency и bottleneck — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Radeon GPU Profiler](https://gpuopen.com/rgp/) — Bandwidth, latency и bottleneck — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Измерь copy kernel и dependent read chain.
**Завершение:** Есть bytes/s и latency estimate с описанием методики.
**Самопроверка:** Почему больше параллелизма скрывает latency, но не создаёт bandwidth?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="async-compute"></a>

#### Async compute

intermediate · performance

Независимые workloads иногда перекрываются на доступных engines.

**Применение:** Исполнение, память и измерения.
**Обязательные предпосылки:** [Queue family ownership transfers](#queue-ownership), [Execution и memory dependencies](#gpu-sync).
- **primary:** [Programming Massively Parallel Processors](https://www.sciencedirect.com/book/9780323912310/programming-massively-parallel-processors) — Async compute — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Radeon GPU Profiler](https://gpuopen.com/rgp/) — Async compute — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Сравни serial и overlapped schedule в GPU timeline.
**Завершение:** Проверены dependencies; speedup или regression объяснены.
**Самопроверка:** Почему отдельная queue не гарантирует ускорения?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="prefix-sum"></a>

#### Parallel scan / prefix sum

intermediate · performance

Scan строит offsets для compacted data и indirect workloads.

**Применение:** Исполнение, память и измерения.
**Обязательные предпосылки:** [Shared memory и workgroup barriers](#shared-memory).
- **primary:** [Programming Massively Parallel Processors](https://www.sciencedirect.com/book/9780323912310/programming-massively-parallel-processors) — Parallel scan / prefix sum — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Radeon GPU Profiler](https://gpuopen.com/rgp/) — Parallel scan / prefix sum — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Реализуй block scan и multi-block composition.
**Завершение:** Результат совпадает с CPU для odd sizes и пустого input.
**Самопроверка:** Почему scan требует больше одной dispatch для многих workgroups?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="compaction"></a>

#### Stream compaction

intermediate · performance

Predicate + prefix offsets уплотняют видимые элементы.

**Применение:** Исполнение, память и измерения.
**Обязательные предпосылки:** [Parallel scan / prefix sum](#prefix-sum).
- **primary:** [Programming Massively Parallel Processors](https://www.sciencedirect.com/book/9780323912310/programming-massively-parallel-processors) — Stream compaction — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Radeon GPU Profiler](https://gpuopen.com/rgp/) — Stream compaction — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Собери visible index list и indirect draw count.
**Завершение:** Каждый visible объект присутствует ровно один раз.
**Самопроверка:** Когда atomics проще scan и почему результат может быть unordered?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="gpu-profiling"></a>

#### GPU profiling и hypothesis

intermediate · performance

Оптимизация начинается с воспроизводимого bottleneck и измерения.

**Применение:** Исполнение, память и измерения.
**Обязательные предпосылки:** [Bandwidth, latency и bottleneck](#bandwidth-latency).
- **primary:** [Programming Massively Parallel Processors](https://www.sciencedirect.com/book/9780323912310/programming-massively-parallel-processors) — GPU profiling и hypothesis — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Radeon GPU Profiler](https://gpuopen.com/rgp/) — GPU profiling и hypothesis — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Выбери один pass, измени одну причину стоимости, повтори capture.
**Завершение:** Есть warm-up, distribution timings и одинаковая картинка.
**Самопроверка:** Как отличить CPU-bound frame от GPU-bound?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

## Архитектура renderer

Ресурсы, passes, streaming и submission

### Сцена и ресурсы

<a id="resource-manager"></a>

#### Resource manager и handles

intermediate · practice

Handles отделяют identity ресурса от его текущего GPU allocation.

**Применение:** Ресурсы, passes, streaming и submission.
**Обязательные предпосылки:** [Resource lifetime и deferred deletion](#resource-lifetime).
- **primary:** [Game Engine Architecture — Jason Gregory](https://www.gameenginebook.com/) — Resource manager и handles — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Computer Systems: A Programmer’s Perspective](https://csapp.cs.cmu.edu/) — Resource manager и handles — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Сделай generation handles и deferred release.
**Завершение:** Stale handle обнаруживается; unload безопасен для GPU.
**Самопроверка:** Почему raw pointer неудобен при hot reload?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="gltf"></a>

#### glTF: meshes, accessors и materials

intermediate · practice

glTF переносит сцену и material conventions через typed buffers.

**Применение:** Ресурсы, passes, streaming и submission.
**Обязательные предпосылки:** [Buffers и usage flags](#vk-buffers), [Scene graph и transforms](#scene-graph), [Texture sampling](#texture-sampling).
- **primary:** [Khronos glTF](https://github.com/KhronosGroup/glTF) — glTF: meshes, accessors и materials — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Computer Systems: A Programmer’s Perspective](https://csapp.cs.cmu.edu/) — glTF: meshes, accessors и materials — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Загрузи mesh с offsets/strides, indices, textures и transforms.
**Завершение:** Проверены missing attributes, coordinate conventions и malformed data.
**Самопроверка:** Чем accessor отличается от buffer view?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="asset-pipeline"></a>

#### Asset pipeline и serialization

intermediate · practice

Offline processing отделяет authoring formats от runtime representation.

**Применение:** Ресурсы, passes, streaming и submission.
**Обязательные предпосылки:** [glTF: meshes, accessors и materials](#gltf).
- **primary:** [Game Engine Architecture — Jason Gregory](https://www.gameenginebook.com/) — Asset pipeline и serialization — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Computer Systems: A Programmer’s Perspective](https://csapp.cs.cmu.edu/) — Asset pipeline и serialization — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Сохрани versioned mesh cache с hash исходника.
**Завершение:** Изменение source invalidates cache; ошибки версии объяснены.
**Самопроверка:** Почему runtime loader не должен повторять весь import pipeline?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="batching"></a>

#### Draw submission и batching

intermediate · practice

Grouping commands сокращает state changes и CPU overhead.

**Применение:** Ресурсы, passes, streaming и submission.
**Обязательные предпосылки:** [Draw calls и instancing](#instancing), [Resource manager и handles](#resource-manager).
- **primary:** [Game Engine Architecture — Jason Gregory](https://www.gameenginebook.com/) — Draw submission и batching — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Computer Systems: A Programmer’s Perspective](https://csapp.cs.cmu.edu/) — Draw submission и batching — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Отсортируй opaque draws по pipeline/material с baseline comparison.
**Завершение:** Измерены state changes и CPU time; прозрачность учтена отдельно.
**Самопроверка:** Когда batching ухудшает culling granularity?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="job-system"></a>

#### CPU job systems и dependencies

intermediate · practice

Граф CPU jobs распределяет независимую работу и ownership данных.

**Применение:** Ресурсы, passes, streaming и submission.
**Обязательные предпосылки:** независимая точка входа.
- **primary:** [Game Engine Architecture — Jason Gregory](https://www.gameenginebook.com/) — CPU job systems и dependencies — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Computer Systems: A Programmer’s Perspective](https://csapp.cs.cmu.edu/) — CPU job systems и dependencies — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.
- **alternative:** [Operating Systems: Three Easy Pieces](https://pages.cs.wisc.edu/~remzi/OSTEP/) — Concurrency — раздел по синхронизации threads; сверить оглавление. Точная привязка требует проверки.

**Практика:** Параллельно обнови transforms и подготовь draw packets.
**Завершение:** Есть thread-safety проверка и comparison с serial path.
**Самопроверка:** Почему job completion не означает завершение GPU?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="streaming"></a>

#### Asset streaming и residency

intermediate · practice

Асинхронная загрузка требует budget, readiness и безопасных замен.

**Применение:** Ресурсы, passes, streaming и submission.
**Обязательные предпосылки:** [Resource manager и handles](#resource-manager), [Asset pipeline и serialization](#asset-pipeline), [CPU job systems и dependencies](#job-system).
- **primary:** [Game Engine Architecture — Jason Gregory](https://www.gameenginebook.com/) — Asset streaming и residency — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Computer Systems: A Programmer’s Perspective](https://csapp.cs.cmu.edu/) — Asset streaming и residency — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Добавь bounded upload queue и placeholder resources.
**Завершение:** Нет unbounded memory роста; cancellation и eviction проверены.
**Самопроверка:** Когда asset можно выселить из GPU memory?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

### Scheduling и GPU-driven

<a id="render-graph"></a>

#### Render graph / frame graph

advanced · practice

Pass declarations строят зависимости, lifetime и barriers ресурсов.

**Применение:** Ресурсы, passes, streaming и submission.
**Обязательные предпосылки:** [Multi-pass rendering](#multi-pass), [Resource lifetime и deferred deletion](#resource-lifetime).
**Рекомендуется:** [CPU job systems и dependencies](#job-system).
- **primary:** [Khronos Vulkan Samples](https://github.com/KhronosGroup/Vulkan-Samples) — Render graph / frame graph — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Computer Systems: A Programmer’s Perspective](https://csapp.cs.cmu.edu/) — Render graph / frame graph — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Сделай DAG passes с read/write contracts и topological schedule.
**Завершение:** Циклы и read-before-write отвергаются; barriers видны в debug dump.
**Самопроверка:** Почему произвольная сортировка passes не определяет hazards?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="transient-alias"></a>

#### Transient resources и aliasing

advanced · practice

Непересекающиеся lifetimes позволяют переиспользовать память.

**Применение:** Ресурсы, passes, streaming и submission.
**Обязательные предпосылки:** [Render graph / frame graph](#render-graph), [Memory heaps, types и allocation](#vk-memory).
- **primary:** [Khronos Vulkan Samples](https://github.com/KhronosGroup/Vulkan-Samples) — Transient resources и aliasing — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Computer Systems: A Programmer’s Perspective](https://csapp.cs.cmu.edu/) — Transient resources и aliasing — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Добавь allocator для временных attachments и сравни peak memory.
**Завершение:** Aliasing не пересекает lifetime; synchronization проверена.
**Самопроверка:** Почему одинаковые размеры не доказывают возможность aliasing?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="gpu-driven"></a>

#### GPU-driven rendering

advanced · practice

GPU формирует visibility и commands без полного CPU обхода.

**Применение:** Ресурсы, passes, streaming и submission.
**Обязательные предпосылки:** [Indirect drawing](#indirect), [Stream compaction](#compaction), [Frustum culling](#frustum-culling), [Descriptor indexing и bindless](#descriptor-indexing).
- **primary:** [Khronos Vulkan Samples](https://github.com/KhronosGroup/Vulkan-Samples) — GPU-driven rendering — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Computer Systems: A Programmer’s Perspective](https://csapp.cs.cmu.edu/) — GPU-driven rendering — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Сделай compute culling → compacted indirect draws.
**Завершение:** Нет CPU readback для count; overflow и barriers проверены.
**Самопроверка:** Какие данные всё ещё должен подготовить CPU?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="hiz"></a>

#### Hi-Z occlusion culling

advanced · practice

Depth pyramid позволяет консервативно отвергать скрытые bounds.

**Применение:** Ресурсы, passes, streaming и submission.
**Обязательные предпосылки:** [GPU-driven rendering](#gpu-driven), [Depth и stencil tests](#depth-stencil).
- **primary:** [Khronos Vulkan Samples](https://github.com/KhronosGroup/Vulkan-Samples) — Hi-Z occlusion culling — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Computer Systems: A Programmer’s Perspective](https://csapp.cs.cmu.edu/) — Hi-Z occlusion culling — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Построй Hi-Z с выбранным depth convention и temporal fallback.
**Завершение:** Нет false occlusion; camera cuts и near-plane cases проверены.
**Самопроверка:** Почему reduction min/max зависит от reversed Z?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="reversed-z"></a>

#### Reversed Z

advanced · practice

Обратная float depth улучшает распределение точности.

**Применение:** Ресурсы, passes, streaming и submission.
**Обязательные предпосылки:** [Perspective и orthographic projection](#projection), [Floating point и устойчивость](#precision), [Depth и stencil tests](#depth-stencil).
- **primary:** [Khronos Vulkan Samples](https://github.com/KhronosGroup/Vulkan-Samples) — Reversed Z — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Computer Systems: A Programmer’s Perspective](https://csapp.cs.cmu.edu/) — Reversed Z — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Сравни standard/reversed Z на большой дальности.
**Завершение:** Clear, compare, projection и pyramid reduction согласованы.
**Самопроверка:** Почему reversed Z особенно полезен с floating-point depth?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

## Анимация и эффекты

Движение, среды и сложная геометрия

### Анимация

<a id="skeletal"></a>

#### Skeletal animation

intermediate · practice

Иерархия joints и inverse bind matrices преобразуют вершины.

**Применение:** Движение, среды и сложная геометрия.
**Обязательные предпосылки:** [Scene graph и transforms](#scene-graph), [Quaternions и slerp](#quaternions).
- **primary:** [Khronos glTF](https://github.com/KhronosGroup/glTF) — Skeletal animation — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Skeletal animation — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.
- **deep:** [Advances in Real-Time Rendering](https://advances.realtimerendering.com/) — Skeletal animation — выбрать доклад по названию алгоритма; привязка требует проверки. Точная привязка требует проверки.
- **deep:** [GPU Gems 1–3](https://developer.nvidia.com/gpugems/gpugems/contributors) — Skeletal animation — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Загрузи skeleton и вычисли joint matrices.
**Завершение:** Bind pose воспроизводит mesh; порядок transforms проверен.
**Самопроверка:** Для чего нужна inverse bind matrix?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="skinning"></a>

#### Linear blend skinning

intermediate · practice

Vertex blends суммируют влияния нескольких joints.

**Применение:** Движение, среды и сложная геометрия.
**Обязательные предпосылки:** [Skeletal animation](#skeletal), [Normal matrix и tangent basis](#normal-matrix).
- **primary:** [Khronos glTF](https://github.com/KhronosGroup/glTF) — Linear blend skinning — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Linear blend skinning — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.
- **deep:** [Advances in Real-Time Rendering](https://advances.realtimerendering.com/) — Linear blend skinning — выбрать доклад по названию алгоритма; привязка требует проверки. Точная привязка требует проверки.
- **deep:** [GPU Gems 1–3](https://developer.nvidia.com/gpugems/gpugems/contributors) — Linear blend skinning — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Сделай GPU skinning и CPU reference.
**Завершение:** Weights нормированы; normals и bounds корректны.
**Самопроверка:** Почему LBS создаёт candy-wrapper artifact?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="morph-targets"></a>

#### Morph targets

intermediate · practice

Weighted deltas меняют positions и attributes.

**Применение:** Движение, среды и сложная геометрия.
**Обязательные предпосылки:** [Buffers и usage flags](#vk-buffers).
- **primary:** [Khronos glTF](https://github.com/KhronosGroup/glTF) — Morph targets — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Morph targets — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.
- **deep:** [Advances in Real-Time Rendering](https://advances.realtimerendering.com/) — Morph targets — выбрать доклад по названию алгоритма; привязка требует проверки. Точная привязка требует проверки.
- **deep:** [GPU Gems 1–3](https://developer.nvidia.com/gpugems/gpugems/contributors) — Morph targets — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Добавь два morph targets и blend controls.
**Завершение:** Нулевые веса восстанавливают base mesh; bounds консервативны.
**Самопроверка:** Как порядок morph и skinning влияет на результат?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="gpu-animation"></a>

#### GPU animation и previous pose

intermediate · practice

Compute skinning даёт shared deformed vertices нескольким passes.

**Применение:** Движение, среды и сложная геометрия.
**Обязательные предпосылки:** [Linear blend skinning](#skinning), [Compute shaders и workgroups](#compute), [Motion vectors](#motion-vectors).
- **primary:** [Khronos glTF](https://github.com/KhronosGroup/glTF) — GPU animation и previous pose — найти по теме в оглавлении. Точная привязка требует проверки.
- **alternative:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — GPU animation и previous pose — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.
- **deep:** [Advances in Real-Time Rendering](https://advances.realtimerendering.com/) — GPU animation и previous pose — выбрать доклад по названию алгоритма; привязка требует проверки. Точная привязка требует проверки.
- **deep:** [GPU Gems 1–3](https://developer.nvidia.com/gpugems/gpugems/contributors) — GPU animation и previous pose — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Вынеси skinning в compute с current/previous pose.
**Завершение:** Motion vectors корректны для деформируемой геометрии.
**Самопроверка:** Почему только previous object matrix недостаточно для animated mesh?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

### Сложные поверхности и среды

<a id="particles"></a>

#### GPU particles

advanced · practice

GPU simulation обновляет state и visible particle list.

**Применение:** Движение, среды и сложная геометрия.
**Обязательные предпосылки:** [Compute shaders и workgroups](#compute), [Stream compaction](#compaction).
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — GPU particles — найти по теме в оглавлении. Точная привязка требует проверки.
- **deep:** [Advances in Real-Time Rendering](https://advances.realtimerendering.com/) — GPU particles — выбрать доклад по названию алгоритма; привязка требует проверки. Точная привязка требует проверки.
- **deep:** [GPU Gems 1–3](https://developer.nvidia.com/gpugems/gpugems/contributors) — GPU particles — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Сделай bounded particle pool, spawn и indirect draw.
**Завершение:** Нет переполнения; deterministic debug seed доступен.
**Самопроверка:** Почему append counter нужно безопасно сбрасывать?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="transparency"></a>

#### Transparency и sorting

advanced · practice

Alpha compositing зависит от порядка и alpha convention.

**Применение:** Движение, среды и сложная геометрия.
**Обязательные предпосылки:** [Multi-pass rendering](#multi-pass), [Linear light, sRGB и gamma](#linear-srgb).
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Transparency и sorting — найти по теме в оглавлении. Точная привязка требует проверки.
- **deep:** [Advances in Real-Time Rendering](https://advances.realtimerendering.com/) — Transparency и sorting — выбрать доклад по названию алгоритма; привязка требует проверки. Точная привязка требует проверки.
- **deep:** [GPU Gems 1–3](https://developer.nvidia.com/gpugems/gpugems/contributors) — Transparency и sorting — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Сравни straight/premultiplied alpha и back-to-front sorting.
**Завершение:** Нет halos на текстурных краях; blending выполняется linear.
**Самопроверка:** Почему object sorting не решает intersecting transparent meshes?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="oit"></a>

#### Order-Independent Transparency

advanced · practice

OIT приближает или хранит порядок contributions per pixel.

**Применение:** Движение, среды и сложная геометрия.
**Обязательные предпосылки:** [Transparency и sorting](#transparency).
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Order-Independent Transparency — найти по теме в оглавлении. Точная привязка требует проверки.
- **deep:** [Advances in Real-Time Rendering](https://advances.realtimerendering.com/) — Order-Independent Transparency — выбрать доклад по названию алгоритма; привязка требует проверки. Точная привязка требует проверки.
- **deep:** [GPU Gems 1–3](https://developer.nvidia.com/gpugems/gpugems/contributors) — Order-Independent Transparency — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Сделай weighted blended OIT и сравни с sorted reference.
**Завершение:** Показаны ограничения многослойного стекла и opacity.
**Самопроверка:** Почему weighted blended OIT не является точным compositing?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="volumetrics"></a>

#### Volume scattering и Beer–Lambert

advanced · practice

Среда ослабляет и рассеивает свет вдоль луча.

**Применение:** Движение, среды и сложная геометрия.
**Обязательные предпосылки:** [Radiance](#radiance), [Интегралы и квадратуры](#integrals).
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Volume scattering и Beer–Lambert — найти по теме в оглавлении. Точная привязка требует проверки.
- **deep:** [Advances in Real-Time Rendering](https://advances.realtimerendering.com/) — Volume scattering и Beer–Lambert — выбрать доклад по названию алгоритма; привязка требует проверки. Точная привязка требует проверки.
- **deep:** [GPU Gems 1–3](https://developer.nvidia.com/gpugems/gpugems/contributors) — Volume scattering и Beer–Lambert — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Интегрируй homogeneous fog и сравни с analytic transmittance.
**Завершение:** T=exp(-σt·d); шаги не меняют результат сверх ошибки.
**Самопроверка:** Чем extinction отличается от scattering coefficient?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="froxel"></a>

#### Froxel volumetric lighting

advanced · practice

View-aligned volumes хранят освещение и extinction.

**Применение:** Движение, среды и сложная геометрия.
**Обязательные предпосылки:** [Volume scattering и Beer–Lambert](#volumetrics), [Clustered shading](#clustered), [Temporal accumulation](#temporal-accumulation).
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Froxel volumetric lighting — найти по теме в оглавлении. Точная привязка требует проверки.
- **deep:** [Advances in Real-Time Rendering](https://advances.realtimerendering.com/) — Froxel volumetric lighting — выбрать доклад по названию алгоритма; привязка требует проверки. Точная привязка требует проверки.
- **deep:** [GPU Gems 1–3](https://developer.nvidia.com/gpugems/gpugems/contributors) — Froxel volumetric lighting — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Собери low-resolution froxel fog с temporal reprojection.
**Завершение:** Leak, jitter и camera motion показаны отдельно.
**Самопроверка:** Почему интегрирование fog должно учитывать transmittance предыдущих slices?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="atmosphere"></a>

#### Atmospheric scattering

advanced · practice

Rayleigh и Mie scattering описывают разные масштабы частиц.

**Применение:** Движение, среды и сложная геометрия.
**Обязательные предпосылки:** [Volume scattering и Beer–Lambert](#volumetrics), [Importance sampling](#importance).
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Atmospheric scattering — найти по теме в оглавлении. Точная привязка требует проверки.
- **deep:** [Advances in Real-Time Rendering](https://advances.realtimerendering.com/) — Atmospheric scattering — выбрать доклад по названию алгоритма; привязка требует проверки. Точная привязка требует проверки.
- **deep:** [GPU Gems 1–3](https://developer.nvidia.com/gpugems/gpugems/contributors) — Atmospheric scattering — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Сделай single-scattering sky с altitude experiment.
**Завершение:** Проверены horizon, planet shadow и единицы коэффициентов.
**Самопроверка:** Почему цвет неба меняется с длиной optical path?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="terrain"></a>

#### Terrain и clipmaps

advanced · practice

Terrain требует пространственного LOD без cracks на стыках.

**Применение:** Движение, среды и сложная геометрия.
**Обязательные предпосылки:** [Quadtree](#quadtree), [Level of Detail (LOD)](#lod).
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Terrain и clipmaps — найти по теме в оглавлении. Точная привязка требует проверки.
- **deep:** [Advances in Real-Time Rendering](https://advances.realtimerendering.com/) — Terrain и clipmaps — выбрать доклад по названию алгоритма; привязка требует проверки. Точная привязка требует проверки.
- **deep:** [GPU Gems 1–3](https://developer.nvidia.com/gpugems/gpugems/contributors) — Terrain и clipmaps — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Построй patches с skirts или согласованными edges.
**Завершение:** Нет holes при смене LOD; memory budget измерен.
**Самопроверка:** Почему соседние уровни требуют согласования tessellation?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="water"></a>

#### Water rendering

advanced · practice

Вода объединяет wave normals, reflection, absorption и refraction.

**Применение:** Движение, среды и сложная геометрия.
**Обязательные предпосылки:** [Fresnel equations](#fresnel), [Screen-Space Reflections (SSR)](#ssr), [Normal mapping и TBN](#normal-mapping).
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Water rendering — найти по теме в оглавлении. Точная привязка требует проверки.
- **deep:** [Advances in Real-Time Rendering](https://advances.realtimerendering.com/) — Water rendering — выбрать доклад по названию алгоритма; привязка требует проверки. Точная привязка требует проверки.
- **deep:** [GPU Gems 1–3](https://developer.nvidia.com/gpugems/gpugems/contributors) — Water rendering — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Добавь plane water с depth-based absorption и environment fallback.
**Завершение:** Above/below-water conventions и shoreline artifacts показаны.
**Самопроверка:** Почему прозрачная вода не описывается одной alpha?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="mesh-shaders"></a>

#### Task и mesh shaders

advanced · practice

Mesh pipeline генерирует primitives из clusters с feature limits.

**Применение:** Движение, среды и сложная геометрия.
**Обязательные предпосылки:** [Meshlets](#meshlets), [Compute shaders и workgroups](#compute).
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Task и mesh shaders — найти по теме в оглавлении. Точная привязка требует проверки.
- **deep:** [Advances in Real-Time Rendering](https://advances.realtimerendering.com/) — Task и mesh shaders — выбрать доклад по названию алгоритма; привязка требует проверки. Точная привязка требует проверки.
- **deep:** [GPU Gems 1–3](https://developer.nvidia.com/gpugems/gpugems/contributors) — Task и mesh shaders — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Построй meshlet path и conventional fallback.
**Завершение:** Limits проверены; culling и timings сравнены.
**Самопроверка:** Когда mesh shader path хуже indexed draws?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="virtual-texturing"></a>

#### Virtual texturing

advanced · practice

Page tables и residency позволяют адресовать большой virtual texture space.

**Применение:** Движение, среды и сложная геометрия.
**Обязательные предпосылки:** [Asset streaming и residency](#streaming), [Mipmaps и footprint](#mipmaps).
- **primary:** [Real-Time Rendering, 4e](https://www.realtimerendering.com/) — Virtual texturing — найти по теме в оглавлении. Точная привязка требует проверки.
- **deep:** [Advances in Real-Time Rendering](https://advances.realtimerendering.com/) — Virtual texturing — выбрать доклад по названию алгоритма; привязка требует проверки. Точная привязка требует проверки.
- **deep:** [GPU Gems 1–3](https://developer.nvidia.com/gpugems/gpugems/contributors) — Virtual texturing — выбрать раздел по оглавлению своего тома; точная привязка требует проверки. Точная привязка требует проверки.

**Практика:** Сделай CPU page table prototype и feedback-driven residency.
**Завершение:** Missing pages дают fallback; mip borders не создают seams.
**Самопроверка:** Почему feedback не гарантирует наличие page в том же кадре?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

## Инженерные инструменты

Проверки, захваты и воспроизводимость

### Диагностика и проверка

<a id="renderdoc"></a>

#### RenderDoc: frame capture

intermediate · debug

GPU capture показывает pipeline state и resources конкретного draw.

**Применение:** Проверки, захваты и воспроизводимость.
**Обязательные предпосылки:** [Graphics pipeline creation](#graphics-pipeline).
- **primary:** [RenderDoc Documentation](https://renderdoc.org/docs/index.html) — RenderDoc: frame capture — найти по теме в оглавлении. Точная привязка требует проверки.
- **reference:** [Vulkan Specification](https://docs.vulkan.org/spec/latest/) — RenderDoc: frame capture — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Найди неверный descriptor или depth state в намеренно сломанной сцене.
**Завершение:** Есть before/after capture и объяснение причины.
**Самопроверка:** Какой первый draw делает данные неверными?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="rgp"></a>

#### Radeon GPU Profiler

intermediate · debug

Timeline и counters помогают проверять GPU bottleneck на совместимом AMD GPU.

**Применение:** Проверки, захваты и воспроизводимость.
**Обязательные предпосылки:** [GPU profiling и hypothesis](#gpu-profiling).
- **primary:** [Radeon GPU Profiler](https://gpuopen.com/rgp/) — Radeon GPU Profiler — найти по теме в оглавлении. Точная привязка требует проверки.
- **reference:** [Vulkan Specification](https://docs.vulkan.org/spec/latest/) — Radeon GPU Profiler — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Сними trace или используй доступный vendor profiler и сравни pass timings.
**Завершение:** Указаны GPU, driver и условия измерения.
**Самопроверка:** Почему counters разных GPU нельзя сравнивать напрямую?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="cmake"></a>

#### CMake и reproducible builds

intermediate · debug

Воспроизводимая сборка фиксирует toolchain, dependencies и shader compilation.

**Применение:** Проверки, захваты и воспроизводимость.
**Обязательные предпосылки:** независимая точка входа.
- **primary:** [RenderDoc Documentation](https://renderdoc.org/docs/index.html) — CMake и reproducible builds — найти по теме в оглавлении. Точная привязка требует проверки.
- **reference:** [Vulkan Specification](https://docs.vulkan.org/spec/latest/) — CMake и reproducible builds — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Сделай clean Debug/Release build проекта на C++20.
**Завершение:** README содержит команды; incremental shader rebuild работает.
**Самопроверка:** Как dependency shader include попадает в build graph?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="sanitizers"></a>

#### CPU sanitizers и lifetime

intermediate · debug

Sanitizers находят runtime memory и UB ошибки на поддерживаемом toolchain.

**Применение:** Проверки, захваты и воспроизводимость.
**Обязательные предпосылки:** [CMake и reproducible builds](#cmake).
- **primary:** [RenderDoc Documentation](https://renderdoc.org/docs/index.html) — CPU sanitizers и lifetime — найти по теме в оглавлении. Точная привязка требует проверки.
- **reference:** [Vulkan Specification](https://docs.vulkan.org/spec/latest/) — CPU sanitizers и lifetime — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Включи ASan/UBSan или эквивалент, найди intentional stale access.
**Завершение:** Ошибка воспроизведена и исправлена; инструмент действительно запущен.
**Самопроверка:** Почему ASan не проверяет GPU memory accesses?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="integration-tests"></a>

#### Image regression и integration tests

intermediate · debug

Renderer tests сравнивают observable output с допусками.

**Применение:** Проверки, захваты и воспроизводимость.
**Обязательные предпосылки:** [CMake и reproducible builds](#cmake).
- **primary:** [RenderDoc Documentation](https://renderdoc.org/docs/index.html) — Image regression и integration tests — найти по теме в оглавлении. Точная привязка требует проверки.
- **reference:** [Vulkan Specification](https://docs.vulkan.org/spec/latest/) — Image regression и integration tests — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Сделай offscreen image test и отдельные math tests.
**Завершение:** Tolerance обоснован; ошибки orientation/color видны.
**Самопроверка:** Почему exact pixel comparison нестабилен между GPU?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="ci"></a>

#### CI и headless validation

intermediate · debug

CI повторяет сборку и тесты; GPU coverage зависит от runner.

**Применение:** Проверки, захваты и воспроизводимость.
**Обязательные предпосылки:** [Image regression и integration tests](#integration-tests).
- **primary:** [RenderDoc Documentation](https://renderdoc.org/docs/index.html) — CI и headless validation — найти по теме в оглавлении. Точная привязка требует проверки.
- **reference:** [Vulkan Specification](https://docs.vulkan.org/spec/latest/) — CI и headless validation — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Настрой CPU checks и отдельный optional GPU job.
**Завершение:** Недоступный GPU не выдаётся за выполненный capture test.
**Самопроверка:** Какие свойства renderer можно проверить без GPU?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

<a id="gpu-crash"></a>

#### GPU crash diagnostics

intermediate · debug

Device loss требует breadcrumbs, resource history и минимального repro.

**Применение:** Проверки, захваты и воспроизводимость.
**Обязательные предпосылки:** [Validation layers](#validation), [Resource lifetime и deferred deletion](#resource-lifetime).
- **primary:** [RenderDoc Documentation](https://renderdoc.org/docs/index.html) — GPU crash diagnostics — найти по теме в оглавлении. Точная привязка требует проверки.
- **reference:** [Vulkan Specification](https://docs.vulkan.org/spec/latest/) — GPU crash diagnostics — поиск по теме; точный раздел требует проверки. Точная привязка требует проверки.

**Практика:** Собери диагностический log с pass markers и last successful submit.
**Завершение:** Есть сценарий безопасного воспроизведения и lifecycle trace.
**Самопроверка:** Почему место обнаружения device lost может отличаться от причины?
**Углубление:** Повтори эксперимент на граничных данных и измерь ошибку или стоимость. Объясни, в каких условиях выбранный подход перестаёт работать.
**Подсказка:** Сначала сформулируй ожидаемый результат для самого маленького примера. Найди ограничения механизма в основном источнике до чтения готового кода.

## Сохранения и воспроизводимость

Хранилище localStorage и старые keys сохранены. Экспорт v9 включает прежний прогресс и knowledge. Импорт v6–v9 объединяет данные; прежний JSON не стирает новые статусы, заметки и этапы renderer. Поле с практическим подтверждением требует описанного результата. Это самооценка, код автоматически не проверяется.

GitHub Pages: относительные пути поддерживают `/graphics-road/`. Приложение работает и через file://; сборка для запуска не нужна.

Генерация: `npm run sources`, затем `npm run docs`. Проверки: `npm test`, `npm run test:browser`.

// Original v6 lessons: stable IDs preserve existing progress.
const LEARNING_DATA = {
  "books": {
    "fcg": {
      "id": "fcg",
      "title": "Fundamentals of Computer Graphics",
      "edition": "5-е издание, 2021",
      "url": "https://www.routledge.com/Fundamentals-of-Computer-Graphics-Fifth-Edition/Shirley-Marschner/p/book/9780367505035",
      "role": "Основной учебник фундамента. Читай порциями под задачу; знакомые разделы проходи через проверку.",
      "skip": "На первом проходе отложи гл. 15, 17, 19–23; 13–14 понадобятся к Monte Carlo. Старый OpenGL из гл. 17 не нужно переносить построчно.",
      "verify": "Оглавление / официальный материал сверены 25.10.2026"
    },
    "rtr": {
      "id": "rtr",
      "title": "Real-Time Rendering",
      "edition": "4-е издание, 2018",
      "url": "https://www.realtimerendering.com/",
      "role": "Главная карта real-time rendering после базового опыта. Нужные разделы перечитываются при реализации.",
      "skip": "Не нужно подряд читать всю книгу. 13–17 и 21 — по специализации. Современные API и исследования сверяй с текущими первоисточниками.",
      "verify": "Оглавление / официальный материал сверены 25.10.2026"
    },
    "mathprimer": {
      "id": "mathprimer",
      "title": "3D Math Primer for Graphics and Game Development",
      "edition": "2-е издание / веб-версия авторов",
      "url": "https://gamemath.com/book/",
      "role": "Подробное объяснение математики, если FCG слишком сжат. Можно заменить им математическое чтение FCG.",
      "skip": "Не дублируй весь материал двух учебников. Главы 11–12 о механике не обязательны для первых rendering-задач.",
      "verify": "Оглавление / официальный материал сверены 25.10.2026"
    },
    "gameengine": {
      "id": "gameengine",
      "title": "Game Engine Architecture",
      "edition": "Нумерация для 3-го издания, 2018",
      "url": "https://www.gameenginebook.com/toc.html",
      "role": "Выборочные главы об устройстве систем. Сопоставляй с текущим проектом.",
      "skip": "Полный универсальный движок не является предварительным условием игры. В 4-м издании нумерация меняется: анимация — гл. 13, а в 3-м — гл. 12.",
      "verify": "Оглавление / официальный материал сверены 25.10.2026"
    },
    "rtd": {
      "id": "rtd",
      "title": "Real-Time Collision Detection",
      "edition": "Ericson, 2005",
      "url": "https://realtimecollisiondetection.net/books/rtcd/toc/",
      "role": "Справочник геометрии, пересечений и устойчивости вычислений.",
      "skip": "Полный physics engine, GJK/EPA и continuous collision detection — по задаче; для рендера сначала AABB, плоскости, лучи, BVH.",
      "verify": "Оглавление / официальный материал сверены 25.10.2026"
    },
    "pbrt": {
      "id": "pbrt",
      "title": "Physically Based Rendering",
      "edition": "4-е издание, онлайн",
      "url": "https://www.pbr-book.org/4ed/contents",
      "role": "Глубокая теория света, выборки и light transport; после первого real-time renderer.",
      "skip": "Не начинай с воспроизведения всей архитектуры pbrt. Спектральный рендеринг, волосы, сложные среды и GPU wavefront — последующие специализации.",
      "verify": "Оглавление / официальный материал сверены 25.10.2026"
    },
    "csapp": {
      "id": "csapp",
      "title": "Computer Systems: A Programmer’s Perspective",
      "edition": "3-е издание",
      "url": "https://csapp.cs.cmu.edu/3e/pieces/preface3e.pdf",
      "role": "CPU, представление чисел, память и измеряемая оптимизация.",
      "skip": "Y86 из гл. 4 и сети из гл. 11 не обязательны на первом проходе. Номера страниц зависят от издания; используй номера разделов.",
      "verify": "Оглавление / официальный материал сверены 25.10.2026"
    },
    "effective-cpp": {
      "id": "effective-cpp",
      "title": "Effective Modern C++",
      "edition": "Meyers, 42 правила, C++11/14",
      "url": "https://www.oreilly.com/library/view/effective-modern-c/9781491908419/",
      "role": "Короткие независимые правила с обязательным маленьким примером.",
      "skip": "Книга не покрывает весь C++20. Детали универсальных ссылок нужны при написании generic-кода, а не до первого кадра.",
      "verify": "Оглавление / официальный материал сверены 25.10.2026"
    },
    "cuda": {
      "id": "cuda",
      "title": "Programming Massively Parallel Processors",
      "edition": "Нумерация для 4-го издания, 2022",
      "url": "https://shop.elsevier.com/books/programming-massively-parallel-processors/hwu/978-0-323-91231-0",
      "role": "Основы GPU и parallel patterns. На твоём AMD переноси идеи в WGSL/compute или HIP.",
      "skip": "CUDA-примеры не запускаются напрямую на AMD. Номера ниже относятся к 4-му изданию; у 5-го часть поздних глав другая. MRI и deep learning сейчас не нужны.",
      "verify": "Оглавление / официальный материал сверены 25.10.2026"
    },
    "ostep": {
      "id": "ostep",
      "title": "Operating Systems: Three Easy Pieces",
      "edition": "Веб-версия 1.10",
      "url": "https://pages.cs.wisc.edu/~remzi/OSTEP/",
      "role": "ОС для понимания адресного пространства, потоков и синхронизации.",
      "skip": "Файловые системы и безопасность — отдельный интерес. Не делай весь курс ОС условием начала рендеринга.",
      "verify": "Оглавление / официальный материал сверены 25.10.2026"
    },
    "patterns": {
      "id": "patterns",
      "title": "Game Programming Patterns",
      "edition": "Бесплатная веб-версия автора",
      "url": "https://gameprogrammingpatterns.com/contents.html",
      "role": "Компактные главы о цикле игры, локальности и потоках данных.",
      "skip": "Не внедряй каждый паттерн. Читай с вопросом: какую конкретную проблему он решит в моём коде?",
      "verify": "Главы указаны по названию; номера не используются"
    },
    "bos": {
      "id": "bos",
      "title": "The Book of Shaders",
      "edition": "Опубликованные веб-главы 05–13",
      "url": "https://thebookofshaders.com/",
      "role": "Твой ближайший учебник функций, масок, координат и процедурных шейдеров.",
      "skip": "GLSL → WGSL: переноси математику, а интерфейсы и встроенные функции сверяй отдельно. Не рассчитывай на неопубликованные главы из оглавления.",
      "verify": "Оглавление / официальный материал сверены 25.10.2026"
    },
    "gltf": {
      "id": "gltf",
      "title": "Khronos glTF Tutorial",
      "edition": "glTF 2.0",
      "url": "https://github.khronos.org/glTF-Tutorials/gltfTutorial/",
      "role": "Главный первоисточник для сцены, primitive/submesh, материалов и анимации.",
      "skip": "Примеры объясняют формат; конкретный API загрузчика выбирай отдельно. Не нужно писать собственный JSON-парсер.",
      "verify": "Оглавление / официальный материал сверены 25.10.2026"
    },
    "vkguide": {
      "id": "vkguide",
      "title": "vkguide",
      "edition": "Современная ветка на Vulkan 1.3",
      "url": "https://vkguide.dev/",
      "role": "Один практический курс Vulkan. Математику и свет проходи отдельно.",
      "skip": "Не проходи параллельно несколько полных triangle-tutorials. Legacy-разделы могут использовать другую архитектуру.",
      "verify": "Оглавление / официальный материал сверены 25.10.2026"
    },
    "vulkanguide": {
      "id": "vulkanguide",
      "title": "Khronos Vulkan Guide",
      "edition": "Актуальная онлайн-документация",
      "url": "https://docs.vulkan.org/guide/latest/",
      "role": "Проверка семантики памяти, синхронизации и возможностей API.",
      "skip": "Не читать спецификацию подряд; открывать нужные понятия и требования для конкретного кода.",
      "verify": "Оглавление / официальный материал сверены 25.10.2026"
    },
    "filament": {
      "id": "filament",
      "title": "Filament: Physically Based Rendering",
      "edition": "Технический документ проекта",
      "url": "https://google.github.io/filament/Filament.md.html",
      "role": "Разбор инженерных решений PBR; сравнивай формулы со своей реализацией.",
      "skip": "Расширенные материалы и все оптимизации Filament не входят в первый PBR-pass.",
      "verify": "Официальная документация; разделы по названию"
    },
    "rayweekend": {
      "id": "rayweekend",
      "title": "Ray Tracing in One Weekend",
      "edition": "Веб-версия авторов",
      "url": "https://raytracing.github.io/books/RayTracingInOneWeekend.html",
      "role": "Короткий вход в CPU ray tracing. Для тебя повторение камеры можно пройти быстрее.",
      "skip": "Не копировать целиком: сначала свой луч, сфера и камера, потом сравнение.",
      "verify": "Официальная веб-версия; заголовки могут обновляться"
    },
    "raynext": {
      "id": "raynext",
      "title": "Ray Tracing: The Next Week",
      "edition": "Веб-версия авторов",
      "url": "https://raytracing.github.io/books/RayTracingTheNextWeek.html",
      "role": "BVH, текстуры, источники и объёмы после первого трассировщика.",
      "skip": "Motion blur и объёмы можно отложить до корректной геометрии и освещения.",
      "verify": "Официальная веб-версия; разделы по теме"
    },
    "rt-rest": {
      "id": "rt-rest",
      "title": "Ray Tracing: The Rest of Your Life",
      "edition": "Веб-версия авторов",
      "url": "https://raytracing.github.io/books/RayTracingTheRestOfYourLife.html",
      "role": "Переход к вероятностям и importance sampling.",
      "skip": "Используй как более мягкий вход перед PBRT, если Monte Carlo пока тяжёл.",
      "verify": "Содержание официальной веб-версии проверено"
    },
    "rtgems": {
      "id": "rtgems",
      "title": "Ray Tracing Gems I",
      "edition": "Сборник 2019",
      "url": "https://www.realtimerendering.com/raytracinggems/rtg/index.html",
      "role": "Статьи по конкретной проблеме после базового tracer.",
      "skip": "Не нужно читать все статьи подряд. API-код исторический — сверяй с актуальной документацией.",
      "verify": "Оглавление / официальный материал сверены 25.10.2026"
    },
    "raygems2": {
      "id": "raygems2",
      "title": "Ray Tracing Gems II",
      "edition": "Сборник 2021",
      "url": "https://www.realtimerendering.com/raytracinggems/rtg2/",
      "role": "Пересечения, Fresnel, reference tracing, SBT и Vulkan RT.",
      "skip": "Главы 15–16 — после уверенной работы с Vulkan и CPU tracer.",
      "verify": "Оглавление / официальный материал сверены 25.10.2026"
    },
    "fged1": {
      "id": "fged1",
      "title": "Foundations of Game Engine Development, Vol. 1",
      "edition": "Mathematics, 2016",
      "url": "https://foundationsofgameenginedev.com/",
      "role": "Альтернативное углубление в векторы, преобразования и геометрию.",
      "skip": "Гл. 4 с geometric algebra оставь до уверенного владения обычной линейной алгеброй.",
      "verify": "Оглавление / официальный материал сверены 25.10.2026"
    },
    "fged2": {
      "id": "fged2",
      "title": "Foundations of Game Engine Development, Vol. 2",
      "edition": "Rendering, 2019; главы начинаются с 5",
      "url": "https://foundationsofgameenginedev.com/",
      "role": "Практический дополнительный источник для глубины, TBN, теней и culling.",
      "skip": "Не путай с нумерацией отдельного учебника: здесь гл. 5–10. Не заменяет актуальные API-документы.",
      "verify": "Оглавление / официальный материал сверены 25.10.2026"
    },
    "tour3": {
      "id": "tour3",
      "title": "A Tour of C++",
      "edition": "3-е издание, 2022",
      "url": "https://www.stroustrup.com/tour3toc.pdf",
      "role": "Быстрая ревизия языка; полезнее читать по пробелам, чем начинать C++ заново.",
      "skip": "Продвинутые шаблоны, coroutines и весь STL не нужно осваивать до продолжения viewer.",
      "verify": "Оглавление / официальный материал сверены 25.10.2026"
    },
    "dataoriented": {
      "id": "dataoriented",
      "title": "Data-Oriented Design",
      "edition": "Richard Fabian, сокращённая веб-версия",
      "url": "https://www.dataorienteddesign.com/dodbook/",
      "role": "Мышление от преобразований данных и их фактического использования.",
      "skip": "Не воспринимать как запрет OOP. Каждую реорганизацию данных проверяй измерением.",
      "verify": "Оглавление / официальный материал сверены 25.10.2026"
    },
    "taa": {
      "id": "taa",
      "title": "Обзор temporal antialiasing",
      "edition": "Yang, Liu, Salvi, 2020",
      "url": "https://research.nvidia.com/labs/rtr/publication/yang2020survey/",
      "role": "После sampling и первого post-processing: накопление и проверка истории.",
      "skip": "Сначала обычный TAA; upscaling и нейросетевые методы позднее.",
      "verify": "Оглавление / официальный материал сверены 25.10.2026"
    },
    "cluster": {
      "id": "cluster",
      "title": "Clustered Deferred and Forward Shading",
      "edition": "Olsson, Billeter, Assarsson, 2012",
      "url": "https://research.chalmers.se/en/publication/161725",
      "role": "После compute: группировка источников по областям видимости.",
      "skip": "Не начинать с миллионов источников. Сначала эталонный forward и совпадение результата.",
      "verify": "Оглавление / официальный материал сверены 25.10.2026"
    },
    "blackbook": {
      "id": "blackbook",
      "title": "Game Engine Black Book: DOOM",
      "edition": "Fabien Sanglard, 2018",
      "url": "https://fabiensanglard.net/gebbdoom/",
      "role": "Чтение для кругозора: ограничения железа, BSP, устройство движка.",
      "skip": "Номера глав не зафиксированы. Ищи темы renderer, BSP, память по оглавлению своей версии; исторический software renderer не образец современного GPU API.",
      "verify": "Подтверждён официальный источник; точная нумерация не заявляется"
    }
  },
  "modules": [
    {
      "id": "audit",
      "num": 0,
      "title": "Сверить стартовую точку",
      "tier": "base",
      "deps": [],
      "goal": "Начать с реального пробела. У тебя уже есть tinyrenderer и опыт WebGPU; знакомое можно подтвердить демонстрацией.",
      "topics": "Сборка, треугольник, камера, ресурсы, диагностика.",
      "project": "Собери viewer и создай заметку: умею / не понимаю / хочу проверить. Сохрани один корректный кадр и способ его повторить.",
      "checks": [
        "Могу показать путь CPU → draw → изображение.",
        "Объясняю назначение vertex/index buffer, bind group и render target.",
        "Выбрал одну ближайшую функцию viewer и способ проверить её."
      ],
      "nodes": [
        "audit",
        "viewer0",
        "pipeline",
        "debug-tools"
      ],
      "reading": [
        {
          "id": "audit-r1",
          "book": "rtr",
          "where": "Гл. 2–3: конвейер и GPU, обзор",
          "focus": "Пролистай знакомое; запиши только 3 непонятных механизма. Не перечитывай всё ради галочки.",
          "minutes": 30,
          "kind": "main",
          "url": "https://www.realtimerendering.com/"
        }
      ]
    },
    {
      "id": "shader",
      "num": 1,
      "title": "Научиться думать функциями",
      "tier": "base",
      "deps": [
        "audit"
      ],
      "goal": "Предсказывать изображение по формуле и строить свою формулу по изображению.",
      "topics": "step, smoothstep, mix, UV, маски, SDF, композиция.",
      "project": "Без готового шейдера собери композицию из 4 прямоугольников, круга и светящейся линии. Затем перенеси математику в WGSL.",
      "checks": [
        "Могу по графику написать порог, полосу и плавный переход.",
        "Объясняю отдельно цвет и маску, а также покомпонентный mix.",
        "Фигуры сохраняют пропорции при изменении окна."
      ],
      "nodes": [
        "shape",
        "sdf",
        "shader-gallery",
        "game-fx"
      ],
      "reading": [
        {
          "id": "shader-r1",
          "book": "bos",
          "where": "Гл. 05: shaping functions",
          "focus": "Сначала plot и smoothstep. После каждого примера меняй один параметр и предсказывай результат.",
          "minutes": 40,
          "kind": "main",
          "url": "https://thebookofshaders.com/05/"
        },
        {
          "id": "shader-r2",
          "book": "bos",
          "where": "Гл. 06–07: цвет и формы",
          "focus": "В 06 разберись с независимыми RGB-коэффициентами; в 07 — пересечение и объединение масок.",
          "minutes": 50,
          "kind": "main",
          "url": "https://thebookofshaders.com/07/"
        },
        {
          "id": "shader-r3",
          "book": "bos",
          "where": "Гл. 08–09: преобразования и узоры",
          "focus": "Сдвиг/поворот координат, fract, повторение ячеек. Порядок преобразований проверяй картинкой.",
          "minutes": 45,
          "kind": "main",
          "url": "https://thebookofshaders.com/08/"
        },
        {
          "id": "shader-r4",
          "book": "bos",
          "where": "Гл. 10–13: random, noise, cellular, fBm",
          "focus": "После своих масок. Сделай один осмысленный эффект для LUX//PRISM; не пытайся выучить все noise-функции.",
          "minutes": 60,
          "kind": "deep",
          "url": "https://thebookofshaders.com/11/"
        }
      ]
    },
    {
      "id": "math",
      "num": 2,
      "title": "Координаты, камера и геометрия",
      "tier": "base",
      "deps": [
        "audit"
      ],
      "goal": "Понимать все пространства одного кадра и устойчиво работать с геометрией.",
      "topics": "Базис, affine transforms, homogeneous coordinates, нормали, лучи, barycentrics.",
      "project": "В viewer добавь оси, wireframe frustum, тестовый non-uniform scale и picking одного треугольника.",
      "checks": [
        "Объясняю w и различие точки и направления; получаю view из позы камеры.",
        "Объясняю inverse-transpose для нормали и порядок матриц.",
        "Ray–triangle и ray–plane проверены на попадании, промахе и параллельности."
      ],
      "nodes": [
        "coords",
        "viewer-camera",
        "vertex",
        "geometry"
      ],
      "reading": [
        {
          "id": "math-r1",
          "book": "fcg",
          "where": "§2.4, 2.8–2.9; §6.2–6.3; гл. 7",
          "focus": "Векторы, интерполяция, треугольники, матрицы и композиция. По 1–2 подраздела за подход.",
          "minutes": 50,
          "kind": "main",
          "url": "https://www.routledge.com/Fundamentals-of-Computer-Graphics-Fifth-Edition/Shirley-Marschner/p/book/9780367505035"
        },
        {
          "id": "math-r2",
          "book": "fcg",
          "where": "Гл. 8; §9.1–9.2",
          "focus": "Камера, проекция, растеризация и интерполяция. Проследи численно одну вершину.",
          "minutes": 50,
          "kind": "main",
          "url": "https://www.routledge.com/Fundamentals-of-Computer-Graphics-Fifth-Edition/Shirley-Marschner/p/book/9780367505035"
        },
        {
          "id": "math-r3",
          "book": "mathprimer",
          "where": "Гл. 2–6; гл. 8 по необходимости",
          "focus": "Альтернатива математике FCG: подробнее о базисах, матрицах и поворотах. §8.5 — кватернионы перед анимацией.",
          "minutes": 45,
          "kind": "ref",
          "url": "https://gamemath.com/book/"
        },
        {
          "id": "math-r4",
          "book": "rtd",
          "where": "§3.4–3.6; в гл. 5 — пересечения луча с плоскостью и треугольником",
          "focus": "Справочник для picking и зеркальных лучей игры; проверь вырожденные входы.",
          "minutes": 40,
          "kind": "ref",
          "url": "https://realtimecollisiondetection.net/books/rtcd/toc/"
        }
      ]
    },
    {
      "id": "gameplay",
      "num": "03G",
      "title": "LUX//PRISM: первый играбельный прототип",
      "tier": "base",
      "deps": [
        "shader",
        "math"
      ],
      "goal": "Никакого универсального движка: сначала игра, лазеры, зеркала и небольшой tower defense loop.",
      "topics": "Луч, отражение, башни, враги, 2.5D читаемость",
      "project": "Запускаемый пяти-минутный прототип с одной башней и зеркалом.",
      "checks": [],
      "nodes": [
        "game-prototype",
        "laser",
        "td",
        "game-look"
      ],
      "reading": []
    },
    {
      "id": "scene",
      "num": 3,
      "title": "Сцена: mesh, submesh, material",
      "tier": "base",
      "deps": [
        "math"
      ],
      "goal": "Разделить геометрию, экземпляр объекта и материал, затем загрузить небольшую glTF-сцену.",
      "topics": "Vertex/index ranges, glTF primitive, node hierarchy, accessors, texture semantics.",
      "project": "Один mesh с двумя материалами; два экземпляра общей геометрии; parent-child transform. Загрузчик должен корректно сообщать об отсутствующем ресурсе.",
      "checks": [
        "Знаю, какие данные общие, а какие принадлежат экземпляру.",
        "Правильно учитываю offsets, stride, component type и границы индексов.",
        "Материал выбирается для primitive/submesh, world transform — для узла."
      ],
      "nodes": [
        "mesh",
        "scene-graph",
        "gltf"
      ],
      "reading": [
        {
          "id": "scene-r1",
          "book": "fcg",
          "where": "§12.1–12.2",
          "focus": "Меши и граф сцены. Нарисуй структуры данных до реализации.",
          "minutes": 40,
          "kind": "main",
          "url": "https://www.routledge.com/Fundamentals-of-Computer-Graphics-Fifth-Edition/Shirley-Marschner/p/book/9780367505035"
        },
        {
          "id": "scene-r2",
          "book": "gltf",
          "where": "Разделы 4–5, 8–10, 12",
          "focus": "Порядок: узлы → buffers/accessors → meshes/primitives → материалы → textures/images/samplers. Читай по одному разделу и проверяй на простом файле.",
          "minutes": 50,
          "kind": "main",
          "url": "https://github.khronos.org/glTF-Tutorials/gltfTutorial/"
        },
        {
          "id": "scene-r3",
          "book": "gameengine",
          "where": "§7.2: управление ресурсами",
          "focus": "По необходимости: handles, кэш и жизненный цикл. Не вводи asset pipeline до первого корректного импорта.",
          "minutes": 35,
          "kind": "ref",
          "url": "https://www.gameenginebook.com/toc.html"
        }
      ]
    },
    {
      "id": "sampling",
      "num": 4,
      "title": "Текстуры, sampling и прозрачность",
      "tier": "base",
      "deps": [
        "scene"
      ],
      "goal": "Понимать откуда появляются aliasing, shimmering и ошибки смешивания.",
      "topics": "Дискретизация, convolution, reconstruction, mip/LOD, derivatives, alpha.",
      "project": "Сцена с наклонной шахматной плоскостью: nearest/linear/mips; отдельный тест straight/premultiplied alpha.",
      "checks": [
        "Объясняю разницу между sample и площадью пикселя.",
        "Предсказываю, где нужны mipmaps и почему один MSAA не решает texture aliasing.",
        "Сравниваю фильтры и alpha blend на одинаковом входе."
      ],
      "nodes": [
        "textures",
        "color",
        "pipeline"
      ],
      "reading": [
        {
          "id": "sampling-r1",
          "book": "fcg",
          "where": "Гл. 3; гл. 10; §11.1–11.4",
          "focus": "Сначала пиксель и alpha, затем фильтрация и sampling, затем текстурные выборки. Гл. 10 раздели на несколько сессий.",
          "minutes": 60,
          "kind": "main",
          "url": "https://www.routledge.com/Fundamentals-of-Computer-Graphics-Fifth-Edition/Shirley-Marschner/p/book/9780367505035"
        },
        {
          "id": "sampling-r2",
          "book": "rtr",
          "where": "§6.1–6.2; §6.7: текстурный конвейер, фильтрация и bump mapping",
          "focus": "Используй как справочник после эксперимента с FCG. Уточни роль производных и цветовых форматов.",
          "minutes": 45,
          "kind": "ref",
          "url": "https://www.realtimerendering.com/"
        }
      ]
    },
    {
      "id": "light",
      "num": 5,
      "title": "Свет, цвет и простое освещение",
      "tier": "base",
      "deps": [
        "sampling"
      ],
      "goal": "Получать предсказуемый свет в linear space и понимать единицы величин.",
      "topics": "Radiance/irradiance, BRDF-интуиция, N·L, sRGB, HDR, exposure.",
      "project": "Directional + point light; normal/albedo/depth debug views; HDR-буфер и явное преобразование для вывода.",
      "checks": [
        "Указываю пространство для N, L, V и каждой текстуры.",
        "Свет считаю в linear; normal/roughness не трактую как sRGB-цвет.",
        "Объясняю отличие яркости источника, экспозиции и display encoding."
      ],
      "nodes": [
        "light",
        "debug-shader",
        "color",
        "game-look"
      ],
      "reading": [
        {
          "id": "light-r1",
          "book": "fcg",
          "where": "Гл. 5: базовое освещение поверхности",
          "focus": "Реализуй Lambert и один specular-вариант. Ambient constant пометь как приближение.",
          "minutes": 40,
          "kind": "main",
          "url": "https://www.routledge.com/Fundamentals-of-Computer-Graphics-Fifth-Edition/Shirley-Marschner/p/book/9780367505035"
        },
        {
          "id": "light-r2",
          "book": "rtr",
          "where": "§8.1–8.2: величины света и путь к экрану",
          "focus": "На первом проходе: radiometry, radiance/irradiance, color spaces и преобразование для экрана.",
          "minutes": 50,
          "kind": "main",
          "url": "https://www.realtimerendering.com/"
        },
        {
          "id": "light-r3",
          "book": "pbrt",
          "where": "§4.1–4.3",
          "focus": "Углубление единиц и поверхностного отражения. Нарисуй поток света через поверхность и телесный угол.",
          "minutes": 50,
          "kind": "deep",
          "url": "https://www.pbr-book.org/4ed/contents"
        }
      ]
    },
    {
      "id": "pbr",
      "num": 6,
      "title": "Материалы и PBR",
      "tier": "base",
      "deps": [
        "light"
      ],
      "goal": "Связать BRDF с шероховатостью, металличностью, нормалями и наблюдаемым видом материала.",
      "topics": "TBN, GGX, Fresnel, geometry term, metallic-roughness, energy.",
      "project": "Матрица сфер по roughness/metallic, normal mapping и раздельный просмотр diffuse/specular.",
      "checks": [
        "Объясняю роль D, F, G и знаменателя; знаю используемые приближения.",
        "Нормали работают при non-uniform scale; TBN проверен визуально.",
        "Сравниваю dielectric и metal; фиксирую поведение при grazing angle."
      ],
      "nodes": [
        "pbr",
        "normals",
        "viewer-pbr"
      ],
      "reading": [
        {
          "id": "pbr-r1",
          "book": "rtr",
          "where": "§9.1, 9.3–9.8: физика света, BRDF, Fresnel и microfacet",
          "focus": "Читай порциями: BRDF → Fresnel → microfacet → материальные параметры. После каждой части обновляй тестовую сцену.",
          "minutes": 60,
          "kind": "main",
          "url": "https://www.realtimerendering.com/"
        },
        {
          "id": "pbr-r2",
          "book": "filament",
          "where": "Раздел Material system: diffuse, specular, parameterization",
          "focus": "Проверь определения roughness и распределение энергии. Не смешивай формулы из разных моделей без объяснения.",
          "minutes": 45,
          "kind": "ref",
          "url": "https://google.github.io/filament/Filament.md.html"
        },
        {
          "id": "pbr-r3",
          "book": "fged2",
          "where": "§7.5–7.6: tangent space и normal mapping",
          "focus": "Дополнительное подробное объяснение TBN; практикуй на UV-швах и отражённых координатах.",
          "minutes": 45,
          "kind": "ref",
          "url": "https://foundationsofgameenginedev.com/"
        }
      ]
    },
    {
      "id": "shadow",
      "num": 7,
      "title": "Тени и точность глубины",
      "tier": "base",
      "deps": [
        "pbr"
      ],
      "goal": "Отлаживать shadow maps через измерения и визуализацию промежуточных данных.",
      "topics": "Light space, depth comparison, bias, PCF, cascades, depth precision.",
      "project": "Directional shadow map + PCF. Переключатели bias/filter size; визуализация light frustum и depth map.",
      "checks": [
        "Могу воспроизвести acne и peter-panning и объяснить их причины.",
        "Проверяю границы карты, near/far и проекцию света.",
        "Измеряю стоимость прохода; могу сравнить качество при нескольких разрешениях."
      ],
      "nodes": [
        "shadow-theory",
        "viewer-shadow"
      ],
      "reading": [
        {
          "id": "shadow-r1",
          "book": "rtr",
          "where": "§7.4–7.5: shadow maps и PCF; §7.6–7.7 позже",
          "focus": "Начни с одной карты без cascades. Исторические методы сначала обзорно.",
          "minutes": 50,
          "kind": "main",
          "url": "https://www.realtimerendering.com/"
        },
        {
          "id": "shadow-r2",
          "book": "fged2",
          "where": "§6.3; §8.3",
          "focus": "Точность глубины и shadow maps. Cascaded maps добавляй после устойчивого базового shadow pass.",
          "minutes": 45,
          "kind": "ref",
          "url": "https://foundationsofgameenginedev.com/"
        }
      ]
    },
    {
      "id": "ibl",
      "num": 8,
      "title": "IBL, HDR и постобработка",
      "tier": "base",
      "deps": [
        "shadow"
      ],
      "goal": "Собрать цельный кадр с окружением и управляемым постпроцессом.",
      "topics": "Cubemap, irradiance, prefilter, BRDF LUT, bloom, exposure, tone mapping.",
      "project": "Environment lighting + roughness-aware reflection; bloom с просмотром mip-chain; автоматическая экспозиция пока не обязательна.",
      "checks": [
        "Различаю diffuse irradiance и prefiltered specular environment.",
        "Bloom собираю из линейных HDR-значений до отображения на экран.",
        "На одинаковой сцене сравниваю результат с выключенными этапами."
      ],
      "nodes": [
        "post-theory",
        "viewer-post",
        "ibl",
        "viewer-release"
      ],
      "reading": [
        {
          "id": "ibl-r1",
          "book": "rtr",
          "where": "§10.2–10.7: освещение окружением; §11.1–11.2 обзорно",
          "focus": "Выбери части об окружении; полный обзор GI отложи до ветки специализации.",
          "minutes": 45,
          "kind": "main",
          "url": "https://www.realtimerendering.com/"
        },
        {
          "id": "ibl-r2",
          "book": "rtr",
          "where": "§8.2: вывод на экран; §12.1 и 12.3: обработка изображения и bloom",
          "focus": "Построй явный порядок проходов и промежуточных текстур.",
          "minutes": 45,
          "kind": "main",
          "url": "https://www.realtimerendering.com/"
        },
        {
          "id": "ibl-r3",
          "book": "filament",
          "where": "Раздел Lighting: image based lights",
          "focus": "Проверь соглашения cubemap, prefilter и BRDF integration; не копируй LUT без понимания входов.",
          "minutes": 45,
          "kind": "ref",
          "url": "https://google.github.io/filament/Filament.md.html"
        }
      ]
    },
    {
      "id": "cpu",
      "num": 9,
      "title": "C++ и данные под нагрузкой",
      "tier": "engineering",
      "deps": [
        "scene"
      ],
      "goal": "Владеть временем жизни и объяснять цену CPU-кода. Можно проходить параллельно этапам света, по 1 сессии в неделю.",
      "topics": "RAII, move, spans, handles, alignment, locality, SIMD-интуиция, численная точность.",
      "project": "Проверь ownership GPU-ресурсов; измерь обход AoS и SoA на реальных render items. Сохрани методику и результаты.",
      "checks": [
        "Различаю владение, заимствование и время жизни до завершения GPU-работы.",
        "Понимаю float-ошибки, переполнение и влияние layout.",
        "Бенчмарк воспроизводим, оптимизирующая сборка включена, результат используется."
      ],
      "nodes": [
        "cpp",
        "systems",
        "repo-cleanup"
      ],
      "reading": [
        {
          "id": "cpu-r1",
          "book": "effective-cpp",
          "where": "Правила 17–21, 23, 25, 29",
          "focus": "Special members → ownership → move. Одно правило и один компилируемый эксперимент за раз.",
          "minutes": 35,
          "kind": "main",
          "url": "https://www.oreilly.com/library/view/effective-modern-c/9781491908419/"
        },
        {
          "id": "cpu-r2",
          "book": "csapp",
          "where": "§2.4; гл. 5; §6.2–6.6",
          "focus": "Float, оптимизация и кэш. К главам возвращайся при конкретном bottleneck.",
          "minutes": 60,
          "kind": "main",
          "url": "https://csapp.cs.cmu.edu/3e/pieces/preface3e.pdf"
        },
        {
          "id": "cpu-r3",
          "book": "tour3",
          "where": "§1.5; гл. 3–6; гл. 12",
          "focus": "Ревизия lifetime, модульности, ошибок, классов/операций и контейнеров. Только незнакомое.",
          "minutes": 40,
          "kind": "ref",
          "url": "https://www.stroustrup.com/tour3toc.pdf"
        },
        {
          "id": "cpu-r4",
          "book": "dataoriented",
          "where": "Разделы о данных; Searching; Sorting",
          "focus": "Сформулируй запрос к данным и измерь его. Сначала простой контейнер; затем изменение layout.",
          "minutes": 40,
          "kind": "ref",
          "url": "https://www.dataorienteddesign.com/dodbook/"
        }
      ]
    },
    {
      "id": "scale",
      "num": 10,
      "title": "Видимость, структуры и профилирование",
      "tier": "engineering",
      "deps": [
        "ibl",
        "cpu"
      ],
      "goal": "Знать, какая часть кадра ограничивает производительность, и не отправлять невидимую работу.",
      "topics": "AABB/sphere, frustum culling, instancing, draw sorting, LOD, CPU/GPU timings.",
      "project": "Сцена с 10 000 экземплярами: baseline → culling → instancing. Отчёт в ms, draw counts и память; сравни несколько ракурсов.",
      "checks": [
        "Проверяю culling относительно полного рендера, включая границы frustum.",
        "Различаю CPU-bound, GPU-bound и синхронизационные ожидания.",
        "Указываю hardware, resolution, build, camera path и разброс измерений."
      ],
      "nodes": [
        "culling",
        "viewer-perf",
        "spatial",
        "profiling",
        "perf-study"
      ],
      "reading": [
        {
          "id": "scale-r1",
          "book": "rtr",
          "where": "§18.1–18.4; §19.1–19.4, 19.9–19.10",
          "focus": "Диагностика конвейера и ускорение. Из гл. 19 сначала culling/LOD; сложные occlusion-схемы позднее.",
          "minutes": 60,
          "kind": "main",
          "url": "https://www.realtimerendering.com/"
        },
        {
          "id": "scale-r2",
          "book": "rtd",
          "where": "§4.2–4.3; гл. 6 — устройство BVH",
          "focus": "Сначала AABB и sphere; затем сборка и обход дерева на своей сцене.",
          "minutes": 45,
          "kind": "main",
          "url": "https://realtimecollisiondetection.net/books/rtcd/toc/"
        },
        {
          "id": "scale-r3",
          "book": "fged2",
          "where": "§9.3–9.6",
          "focus": "Дополнение: bounding volumes и отбрасывание объектов для камеры, света и теней.",
          "minutes": 40,
          "kind": "ref",
          "url": "https://foundationsofgameenginedev.com/"
        }
      ]
    },
    {
      "id": "vulkan",
      "num": 11,
      "title": "Vulkan: ресурсы и синхронизация",
      "tier": "engineering",
      "deps": [
        "scene",
        "cpu"
      ],
      "goal": "Понимать явный API. Если ты уже идёшь по vkguide, продолжай небольшими сессиями; не переписывай весь viewer сразу.",
      "topics": "Queues, command buffers, memory, descriptors, layouts, barriers, frames in flight.",
      "project": "Мини-рендерер Vulkan: textured mesh, depth, resize, upload; затем transfer → sampled texture и compute → draw с объяснёнными зависимостями.",
      "checks": [
        "Могу нарисовать producer/consumer и stage/access для каждого перехода.",
        "Не освобождаю ресурс, пока его использует GPU; validation и sync validation проверены.",
        "Отличаю fence, semaphore и barrier; объясняю frames in flight."
      ],
      "nodes": [
        "vk-start",
        "vk-mesh",
        "vk-sync",
        "vk-mini"
      ],
      "reading": [
        {
          "id": "vulkan-r1",
          "book": "vkguide",
          "where": "Главы 0–3 современной ветки",
          "focus": "Инициализация → цикл → compute → mesh. Заверши текущую главу, затем воспроизведи ключевую часть без копирования.",
          "minutes": 60,
          "kind": "main",
          "url": "https://vkguide.dev/"
        },
        {
          "id": "vulkan-r2",
          "book": "vkguide",
          "where": "Главы 4–5",
          "focus": "Текстуры, descriptors, загрузка сцены. Сравни границы ответственности со своим WebGPU-кодом.",
          "minutes": 60,
          "kind": "main",
          "url": "https://vkguide.dev/"
        },
        {
          "id": "vulkan-r3",
          "book": "vulkanguide",
          "where": "Synchronization + примеры synchronization2",
          "focus": "Разбирай по одной зависимости из своего кода. Память и features читай по необходимости.",
          "minutes": 45,
          "kind": "main",
          "url": "https://docs.vulkan.org/guide/latest/synchronization.html"
        }
      ]
    },
    {
      "id": "compute",
      "num": 12,
      "title": "GPU-модель и parallel patterns",
      "tier": "engineering",
      "deps": [
        "scale"
      ],
      "goal": "Понимать, как данные и синхронизация определяют цену compute-алгоритма.",
      "topics": "SIMT, divergence, coalescing, registers, occupancy, workgroup memory, reduction, scan.",
      "project": "GPU particles: compaction живых частиц и indirect draw. До него — отдельные reduction и prefix scan с CPU-reference.",
      "checks": [
        "Проверяю размеры 0, 1, не кратные workgroup size и большие входы.",
        "Все участники workgroup достигают необходимых barriers.",
        "Изменение workgroup size и layout подкреплено GPU-замерами."
      ],
      "nodes": [
        "compute",
        "gpu-model",
        "compute-project"
      ],
      "reading": [
        {
          "id": "compute-r1",
          "book": "cuda",
          "where": "Гл. 2–6",
          "focus": "Потоки, сетки, scheduling, память, локальность и производительность. Одна глава + один небольшой kernel.",
          "minutes": 60,
          "kind": "main",
          "url": "https://shop.elsevier.com/books/programming-massively-parallel-processors/hwu/978-0-323-91231-0"
        },
        {
          "id": "compute-r2",
          "book": "cuda",
          "where": "Гл. 9–11",
          "focus": "Histogram → reduction → prefix sum. Начни с простого корректного варианта каждого алгоритма.",
          "minutes": 60,
          "kind": "main",
          "url": "https://shop.elsevier.com/books/programming-massively-parallel-processors/hwu/978-0-323-91231-0"
        },
        {
          "id": "compute-r3",
          "book": "cuda",
          "where": "Гл. 7–8 и 13",
          "focus": "Convolution/stencil и sorting — когда понадобятся в bloom, simulation или GPU culling.",
          "minutes": 45,
          "kind": "deep",
          "url": "https://shop.elsevier.com/books/programming-massively-parallel-processors/hwu/978-0-323-91231-0"
        }
      ]
    },
    {
      "id": "animation",
      "num": 13,
      "title": "Анимация и деформация",
      "tier": "engineering",
      "deps": [
        "scene",
        "math"
      ],
      "goal": "Понимать путь от keyframes и позы до преобразованной вершины.",
      "topics": "TRS interpolation, quaternion, inverse bind matrices, skinning, morph targets.",
      "project": "Animated glTF с skeleton debug draw, pause/seek и blend двух клипов.",
      "checks": [
        "Bind pose воспроизводит исходный mesh без деформации.",
        "Объясняю пространства joint matrices и inverse bind matrices.",
        "Проверяю интерполяцию, нормализацию весов и совместное движение узлов."
      ],
      "nodes": [
        "viewer-animation"
      ],
      "reading": [
        {
          "id": "animation-r1",
          "book": "gltf",
          "where": "Разделы 6–7, 17–20",
          "focus": "Animations → morph targets → skins. Сначала один канал анимации, затем простой двухкостный mesh.",
          "minutes": 50,
          "kind": "main",
          "url": "https://github.khronos.org/glTF-Tutorials/gltfTutorial/"
        },
        {
          "id": "animation-r2",
          "book": "gameengine",
          "where": "§12.2–12.6 (3-е издание)",
          "focus": "Skeletons, poses, clips, skinning и blending. В 4-м издании ищи соответствующие §13.2–13.6.",
          "minutes": 50,
          "kind": "main",
          "url": "https://www.gameenginebook.com/toc.html"
        },
        {
          "id": "animation-r3",
          "book": "mathprimer",
          "where": "§8.5 и разделы об интерполяции вращений в гл. 8",
          "focus": "Разбери q и −q, shortest path и slerp до смешивания поз.",
          "minutes": 40,
          "kind": "ref",
          "url": "https://gamemath.com/book/"
        }
      ]
    },
    {
      "id": "manylights",
      "num": 14,
      "title": "Много источников и организация shading",
      "tier": "advanced",
      "deps": [
        "compute",
        "pbr"
      ],
      "goal": "Выбирать forward/deferred/clustered исходя из сцены, прозрачности и бюджета.",
      "topics": "G-buffer, bandwidth, light lists, tiled/clustered shading, MSAA, transparency.",
      "project": "Сравнение простого forward, deferred и clustered-варианта на нескольких сценах; хотя бы два реализованы, третий разобран.",
      "checks": [
        "Результат сравнивается при одинаковых материалах и освещении.",
        "Могу назвать цену G-buffer в памяти и bandwidth.",
        "Проверяю переполнение light lists и поведение прозрачных объектов."
      ],
      "nodes": [
        "advanced",
        "viewer-architecture"
      ],
      "reading": [
        {
          "id": "manylights-r1",
          "book": "rtr",
          "where": "§20.1, 20.3–20.4: deferred, tiled и clustered shading",
          "focus": "Читай с таблицей: что сохраняем, где считаем свет, какой объём трафика.",
          "minutes": 50,
          "kind": "main",
          "url": "https://www.realtimerendering.com/"
        },
        {
          "id": "manylights-r2",
          "book": "cluster",
          "where": "Статья: постановка задачи, метод, результаты",
          "focus": "Выпиши предположения метода. Реализуй свой небольшой вариант и сравни с обычным forward.",
          "minutes": 60,
          "kind": "main",
          "url": "https://research.chalmers.se/en/publication/161725"
        }
      ]
    },
    {
      "id": "temporal",
      "num": 15,
      "title": "Temporal rendering и качество",
      "tier": "advanced",
      "deps": [
        "sampling",
        "ibl"
      ],
      "goal": "Понимать историю кадра, reprojection и причины временных артефактов.",
      "topics": "Motion vectors, jitter, disocclusion, history rejection, TAA, image reconstruction.",
      "project": "TAA с визуализацией motion vectors/history weight; сцены с движением камеры, тонкой геометрией и появлением объекта.",
      "checks": [
        "Не путаю пространства motion vectors и jittered/unjittered matrices.",
        "Умею показать ghosting, blurring и disocclusion и обосновать компромисс.",
        "Сравниваю со статическим supersampled reference и видеопоследовательностью."
      ],
      "nodes": [
        "viewer-post",
        "advanced"
      ],
      "reading": [
        {
          "id": "temporal-r1",
          "book": "taa",
          "where": "Статья: accumulation и history validation",
          "focus": "Читай по одному механизму; сначала reprojection без накопления, затем blending и rejection.",
          "minutes": 60,
          "kind": "main",
          "url": "https://research.nvidia.com/labs/rtr/publication/yang2020survey/"
        },
        {
          "id": "temporal-r2",
          "book": "rtr",
          "where": "§12.1–12.2: image processing и reprojection",
          "focus": "Свяжи reconstruction с sampling из FCG; SSR/SSAO пока не добавляй одновременно.",
          "minutes": 40,
          "kind": "ref",
          "url": "https://www.realtimerendering.com/"
        }
      ]
    },
    {
      "id": "transport",
      "num": 16,
      "title": "Monte Carlo и light transport",
      "tier": "advanced",
      "deps": [
        "pbr",
        "sampling",
        "scale"
      ],
      "goal": "Получить надёжную теоретическую базу для GI и ray tracing.",
      "topics": "Вероятность, PDF, solid angle, rendering equation, importance sampling, MIS, BVH.",
      "project": "Небольшой CPU path tracer: diffuse + GGX, area light, BVH. Сравнение равномерной и importance sampling при одинаковом числе лучей.",
      "checks": [
        "PDF и мера интегрирования согласованы; объясняю деление на PDF.",
        "Оцениваю шум по нескольким seed и считаю ошибку относительно reference.",
        "Проверяю intersections, energy и поведение при grazing angles."
      ],
      "nodes": [
        "tracer",
        "spatial"
      ],
      "reading": [
        {
          "id": "transport-r1",
          "book": "pbrt",
          "where": "Гл. 2; §4.1–4.3; §9.1–9.6",
          "focus": "Сначала проверь интегралы и плотность вероятности: FCG §2.5–2.6, 2.10–2.12 при пробеле. Затем математика выборки, радиометрия и отражение. Архитектуру pbrt целиком переносить не нужно.",
          "minutes": 60,
          "kind": "main",
          "url": "https://www.pbr-book.org/4ed/contents"
        },
        {
          "id": "transport-r2",
          "book": "pbrt",
          "where": "§7.3; §13.1–13.4",
          "focus": "BVH и surface light transport. Затем сравни naive estimator, light sampling и MIS.",
          "minutes": 60,
          "kind": "main",
          "url": "https://www.pbr-book.org/4ed/contents"
        },
        {
          "id": "transport-r3",
          "book": "rt-rest",
          "where": "Разделы о Monte Carlo, PDF и importance sampling",
          "focus": "Более мягкая альтернатива первому чтению PBRT. Если нет tracer — сначала One Weekend, затем Next Week: BVH и lights.",
          "minutes": 45,
          "kind": "ref",
          "url": "https://raytracing.github.io/books/RayTracingTheRestOfYourLife.html"
        },
        {
          "id": "transport-r4",
          "book": "fcg",
          "where": "Гл. 13; §14.6–14.10",
          "focus": "Альтернативное объяснение sampling и transport; выбирай при непонимании PBRT, а не для дублирования.",
          "minutes": 45,
          "kind": "ref",
          "url": "https://www.routledge.com/Fundamentals-of-Computer-Graphics-Fifth-Edition/Shirley-Marschner/p/book/9780367505035"
        }
      ]
    },
    {
      "id": "architecture",
      "num": 17,
      "title": "Архитектура кадра и параллелизм",
      "tier": "advanced",
      "deps": [
        "vulkan",
        "compute",
        "cpu"
      ],
      "goal": "Управлять зависимостями проходов, ресурсами и CPU-задачами без потери наблюдаемости.",
      "topics": "Render graph, resource lifetimes, transient memory, jobs, upload queues, shader variants.",
      "project": "Опиши входы/выходы 4 реальных pass; добавь dependency validation. Параллельно готовь draw data и проверь результат относительно одного потока.",
      "checks": [
        "Зависимости объясняют порядок работы и barriers.",
        "Время жизни временных ресурсов известно; изменение размера не ломает кадр.",
        "Нет data races; профилирование показывает выигрыш или его отсутствие."
      ],
      "nodes": [
        "viewer-architecture",
        "threading"
      ],
      "reading": [
        {
          "id": "architecture-r1",
          "book": "gameengine",
          "where": "Гл. 6–8; гл. 10; §11.2 (3-е издание)",
          "focus": "Выборочно: память, ресурсы, frame loop, инструменты и pipeline. Читай вокруг конкретной границы своего renderer.",
          "minutes": 60,
          "kind": "main",
          "url": "https://www.gameenginebook.com/toc.html"
        },
        {
          "id": "architecture-r2",
          "book": "ostep",
          "where": "Гл. 26–32",
          "focus": "Потоки, locks, condition variables, semaphores и bugs. Разбей минимум на несколько сессий.",
          "minutes": 50,
          "kind": "main",
          "url": "https://pages.cs.wisc.edu/~remzi/OSTEP/"
        },
        {
          "id": "architecture-r3",
          "book": "ostep",
          "where": "Гл. 13–15, 18–19",
          "focus": "Адресное пространство, allocation, paging и TLB — при пробелах системной модели.",
          "minutes": 45,
          "kind": "ref",
          "url": "https://pages.cs.wisc.edu/~remzi/OSTEP/"
        }
      ]
    },
    {
      "id": "craft",
      "num": 18,
      "title": "Инженерная работа с рендерером",
      "tier": "advanced",
      "deps": [
        "scale",
        "architecture",
        "temporal"
      ],
      "goal": "Делать изменения, которые можно проверить, воспроизвести и поддерживать вместе с другими.",
      "topics": "Image regression, metrics, captures, budgets, shader debugging, research, artist workflow.",
      "project": "Выпусти Viewer 1.0: 5 тестовых сцен, reproducible capture, performance report, README и ограничения. Один эффект доведи до пригодности в LUX//PRISM.",
      "checks": [
        "Человек по README собирает и воспроизводит результат.",
        "Есть CPU/GPU/memory budget и визуальные регрессионные сцены.",
        "Объясняю trade-offs и могу улучшить изображение по конкретной обратной связи."
      ],
      "nodes": [
        "viewer-release",
        "perf-study",
        "portfolio-ready",
        "game-content"
      ],
      "reading": [
        {
          "id": "craft-r1",
          "book": "rtr",
          "where": "§18.1–18.4 повторно: на данных своего проекта",
          "focus": "Прочитай после собственного профиля и запиши, какие гипотезы подтвердились.",
          "minutes": 45,
          "kind": "main",
          "url": "https://www.realtimerendering.com/"
        },
        {
          "id": "craft-r2",
          "book": "gameengine",
          "where": "Гл. 10 повторно: нужные development tools",
          "focus": "Сделай доступными debug views, параметры, захват ошибок и воспроизводимые сцены.",
          "minutes": 40,
          "kind": "ref",
          "url": "https://www.gameenginebook.com/toc.html"
        }
      ]
    },
    {
      "id": "release",
      "num": "18G",
      "title": "LUX//PRISM: вертикальный срез и выпуск",
      "tier": "engineering",
      "deps": [
        "gameplay"
      ],
      "goal": "Закончить небольшой игровой цикл, провести тесты и отдельно подготовить выпуск.",
      "topics": "Контент, UX, релиз, тесты",
      "project": "Компактное играбельное демо и понятный чеклист выпуска.",
      "checks": [],
      "nodes": [
        "game-content",
        "game-ship"
      ],
      "reading": []
    }
  ],
  "specializations": [
    {
      "id": "gi",
      "title": "Глобальное освещение и ray tracing",
      "after": [
        "transport",
        "vulkan"
      ],
      "read": "PBRT 4: гл. 8, 12–13; Ray Tracing Gems II: гл. 2, 9, 14–16. Затем актуальные исследования sampling и denoising.",
      "books": [
        "pbrt",
        "raygems2"
      ],
      "build": "Начни с reference path tracer и ray traced shadows. Затем один GI-метод: измерь шум, утечки света, скорость и временную устойчивость.",
      "prove": "Умеешь объяснить estimator, bias/variance, acceleration structures, SBT и границы применимости метода."
    },
    {
      "id": "gpu-driven",
      "title": "GPU-driven renderer и геометрия",
      "after": [
        "compute",
        "manylights",
        "vulkan"
      ],
      "read": "RTR 4: гл. 16, 19–20; PMPP 4: гл. 10–11, 13; актуальные Vulkan feature descriptions и samples по indirect drawing / mesh shading.",
      "books": [
        "rtr",
        "cuda",
        "vulkanguide"
      ],
      "build": "GPU culling → compaction → indirect draw; затем Hi-Z occlusion и LOD. Проверяй лимиты и доступность features своего устройства.",
      "prove": "Сравниваешь CPU/GPU cost, overdraw и bandwidth; можешь отладить потерянную геометрию. Hardware RT и mesh shaders выноси в Vulkan-ветку при поддержке features."
    },
    {
      "id": "volumes",
      "title": "Объёмы, атмосфера и сложные материалы",
      "after": [
        "transport",
        "temporal"
      ],
      "read": "RTR 4: гл. 14; PBRT 4: гл. 11 и 14; FGED 2: §8.5, 10.4, 10.6.",
      "books": [
        "rtr",
        "pbrt",
        "fged2"
      ],
      "build": "Homogeneous fog → single scattering → shadowed volume. Сравни с медленным reference и проверь Beer–Lambert на простом случае.",
      "prove": "Понимаешь transmittance, extinction, phase function, integration steps и ошибки temporal accumulation."
    },
    {
      "id": "appearance",
      "title": "Материалы, цвет и художественный результат",
      "after": [
        "pbr",
        "ibl",
        "temporal"
      ],
      "read": "RTR 4: гл. 8–10, 15; PBRT 4: §4.5–4.6, 9.7–9.9; FCG 5: гл. 18–20.",
      "books": [
        "rtr",
        "pbrt",
        "fcg"
      ],
      "build": "Материальная лаборатория с эталонным светом; затем один сложный материал или NPR-эффект по референсу художника.",
      "prove": "Объясняешь, что является физической моделью, что художественным контролем и какие артефакты возникают."
    },
    {
      "id": "systems-depth",
      "title": "GPU-архитектура и производительность",
      "after": [
        "compute",
        "architecture"
      ],
      "read": "RTR 4: гл. 18, 23; CS:APP 3: гл. 3, 5–6, 9; PMPP 4: гл. 4–6. Далее документация GPUOpen по конкретной архитектуре.",
      "books": [
        "rtr",
        "csapp",
        "cuda"
      ],
      "build": "Изучи один bottleneck на нескольких kernels: register pressure, divergence или bandwidth. Сравни объяснение с profiler counters.",
      "prove": "Модель предсказывает результат эксперимента; знаешь, какие детали аппаратно зависимы, и не переносишь слепо CUDA warp=32 на любой GPU."
    },
    {
      "id": "research",
      "title": "Исследования и техническое лидерство",
      "after": [
        "craft",
        "transport"
      ],
      "read": "Выбери одну работу из Advances in Real-Time Rendering или JCGT. Пройди цепочку: проблема → предшествующие методы → формулы → реализация → ограничения.",
      "books": [
        "rtr",
        "pbrt"
      ],
      "build": "Воспроизведи базовый метод и один новый. Напиши сравнительный отчёт и предложи собственное проверяемое улучшение.",
      "prove": "Другой человек повторяет эксперимент; ты умеешь отклонить красивую технику, если она хуже по бюджету, качеству или сопровождению."
    }
  ],
  "breaks": [
    {
      "id": "recall",
      "minutes": 5,
      "title": "Вспомнить вчерашнюю идею",
      "book": null,
      "where": "Без нового источника",
      "task": "Закрой конспект. Напиши три предложения: идея, где применяется, что в ней пока не понял. Затем проверь по книге.",
      "after": [],
      "kind": "recall",
      "url": ""
    },
    {
      "id": "mix",
      "minutes": 5,
      "title": "Предсказать результат mix",
      "book": "bos",
      "where": "Гл. 06: один пример",
      "task": "Возьми t = 0, 0.5, 1 и посчитай RGB на бумаге. Затем объясни, что меняется при vec3-коэффициенте.",
      "after": [],
      "kind": "read",
      "url": "https://thebookofshaders.com/06/"
    },
    {
      "id": "rect",
      "minutes": 10,
      "title": "Один прямоугольник из масок",
      "book": "bos",
      "where": "Гл. 07: rectangular shapes",
      "task": "Нарисуй графики четырёх ограничений. Объясни, почему их произведение выделяет внутреннюю область.",
      "after": [],
      "kind": "read",
      "url": "https://thebookofshaders.com/07/"
    },
    {
      "id": "dot",
      "minutes": 10,
      "title": "Геометрический смысл dot",
      "book": "mathprimer",
      "where": "§2.11",
      "task": "Нарисуй два единичных вектора. Предскажи знак dot и связь с яркостью Lambert.",
      "after": [],
      "kind": "read",
      "url": "https://gamemath.com/book/"
    },
    {
      "id": "spaces",
      "minutes": 10,
      "title": "Точка проходит три пространства",
      "book": "mathprimer",
      "where": "§3.2–3.3",
      "task": "На бумаге подпиши model/world/view и в каком пространстве сейчас лежит normal.",
      "after": [
        "math"
      ],
      "kind": "read",
      "url": "https://gamemath.com/book/"
    },
    {
      "id": "one-rule",
      "minutes": 15,
      "title": "Одно правило о move",
      "book": "effective-cpp",
      "where": "Правило 23",
      "task": "Объясни, делает ли std::move перенос сам по себе. При желании запусти маленький эксперимент.",
      "after": [
        "cpu"
      ],
      "kind": "read",
      "url": "https://www.oreilly.com/library/view/effective-modern-c/9781491908419/"
    },
    {
      "id": "ownership",
      "minutes": 10,
      "title": "Один пример владения",
      "book": "effective-cpp",
      "where": "Правило 18",
      "task": "Выбери ресурс в своём проекте и назови единственного владельца. Где заканчивается время жизни?",
      "after": [
        "audit"
      ],
      "kind": "read",
      "url": "https://www.oreilly.com/library/view/effective-modern-c/9781491908419/"
    },
    {
      "id": "locality",
      "minutes": 20,
      "title": "Локальность на знакомом массиве",
      "book": "csapp",
      "where": "§6.2",
      "task": "Нарисуй последовательность адресов при обходе матрицы по строкам и столбцам. Свяжи с cache line.",
      "after": [
        "cpu"
      ],
      "kind": "read",
      "url": "https://csapp.cs.cmu.edu/3e/pieces/preface3e.pdf"
    },
    {
      "id": "primitive",
      "minutes": 10,
      "title": "Mesh и primitive",
      "book": "gltf",
      "where": "Раздел 9: Meshes",
      "task": "Найди в простом glTF primitives. Для каждого назови материал и диапазон геометрии.",
      "after": [
        "scene"
      ],
      "kind": "read",
      "url": "https://github.khronos.org/glTF-Tutorials/gltfTutorial/gltfTutorial_009_Meshes.html"
    },
    {
      "id": "node",
      "minutes": 10,
      "title": "Локальная и мировая матрица",
      "book": "gltf",
      "where": "Раздел 4: Scenes and Nodes",
      "task": "Нарисуй дерево из трёх узлов и выпиши world transform дочернего узла.",
      "after": [
        "scene"
      ],
      "kind": "read",
      "url": "https://github.khronos.org/glTF-Tutorials/gltfTutorial/gltfTutorial_004_ScenesNodes.html"
    },
    {
      "id": "loop",
      "minutes": 20,
      "title": "Один раздел об игровом цикле",
      "book": "patterns",
      "where": "Game Loop: мотивация и решение",
      "task": "Нарисуй update/render своего проекта. Что изменится при падении FPS?",
      "after": [],
      "kind": "read",
      "url": "https://gameprogrammingpatterns.com/game-loop.html"
    },
    {
      "id": "data",
      "minutes": 20,
      "title": "Почему данные лежат рядом",
      "book": "patterns",
      "where": "Data Locality: мотивация",
      "task": "Найди одну структуру, где горячие и редкие данные смешаны. Запиши гипотезу, пока не меняй код.",
      "after": [
        "cpu"
      ],
      "kind": "read",
      "url": "https://gameprogrammingpatterns.com/data-locality.html"
    },
    {
      "id": "depth",
      "minutes": 15,
      "title": "Один артефакт глубины",
      "book": "fged2",
      "where": "§6.3.3",
      "task": "Нарисуй два почти совпадающих полигона. Объясни, как near plane влияет на проблему.",
      "after": [
        "shadow"
      ],
      "kind": "read",
      "url": "https://foundationsofgameenginedev.com/"
    },
    {
      "id": "shadowbug",
      "minutes": 5,
      "title": "Разобрать один скриншот тени",
      "book": null,
      "where": "Собственная тестовая сцена",
      "task": "Выбери acne или peter-panning. Запиши одну гипотезу и один контролируемый эксперимент.",
      "after": [
        "shadow"
      ],
      "kind": "recall",
      "url": ""
    },
    {
      "id": "pdf",
      "minutes": 15,
      "title": "Плотность — не вероятность точки",
      "book": "pbrt",
      "where": "§2.1: первый небольшой фрагмент",
      "task": "Придумай равномерную PDF на интервале длины 2. Проверь её интеграл.",
      "after": [
        "transport"
      ],
      "kind": "read",
      "url": "https://www.pbr-book.org/4ed/contents"
    },
    {
      "id": "fresnel",
      "minutes": 20,
      "title": "Пределы Fresnel",
      "book": "raygems2",
      "where": "Гл. 9: вводная часть",
      "task": "Проверь поведение аппроксимации при normal и grazing incidence. Полную статью оставь для длинной сессии.",
      "after": [
        "pbr"
      ],
      "kind": "read",
      "url": "https://www.realtimerendering.com/raytracinggems/rtg2/"
    },
    {
      "id": "bsp",
      "minutes": 20,
      "title": "Как DOOM использует ограничения",
      "book": "blackbook",
      "where": "Тема BSP/renderer по оглавлению",
      "task": "Прочитай 3–5 страниц и запиши одно решение, полезное сейчас, и одно, зависящее от старого железа.",
      "after": [],
      "kind": "read",
      "url": "https://fabiensanglard.net/gebbdoom/"
    },
    {
      "id": "english",
      "minutes": 10,
      "title": "Разобрать трудное английское предложение",
      "book": null,
      "where": "Абзац из текущей главы",
      "task": "Найди подлежащее, действие, условие. Перескажи смысл на русском, сохрани технические термины; не переводи весь раздел.",
      "after": [],
      "kind": "recall",
      "url": ""
    },
    {
      "id": "capture",
      "minutes": 15,
      "title": "Проверить один draw call",
      "book": null,
      "where": "Собственный frame capture",
      "task": "Назови входные buffers, pipeline, textures и выходной attachment одного вызова. Новый эффект не добавляй.",
      "after": [
        "audit"
      ],
      "kind": "practice",
      "url": ""
    },
    {
      "id": "return",
      "minutes": 5,
      "title": "Подготовить возвращение к коду",
      "book": null,
      "where": "Текущая задача",
      "task": "Оставь точку возврата: следующая функция, ожидаемый результат и как проверить. Затем отдохни от экрана.",
      "after": [],
      "kind": "recall",
      "url": ""
    },
    {
      "id": "rest",
      "minutes": 5,
      "title": "Настоящий перерыв",
      "book": null,
      "where": "Отойти от рабочего места",
      "task": "Встань, посмотри вдаль, пройдись. Чтение — вариант для свободного окна, но оно не обязано заменять отдых.",
      "after": [],
      "kind": "rest",
      "url": ""
    }
  ],
  "reviewed": "2026-10-25"
};

const LESSON_DATA = [
  {
    "id": "audit-01",
    "module": "audit",
    "position": 1,
    "title": "Зафиксировать отправную точку",
    "book": "",
    "where": "Свой README, дерево исходников и CMake",
    "why": "Что уже написано мной и что запускается без ИИ?",
    "build": "Собери свой текущий viewer; запиши команды сборки, скрин кадра и список трёх пробелов.",
    "prove": "Пересобирается с чистой папки build; есть ссылка на commit или точные команды.",
    "nodes": [
      "audit"
    ]
  },
  {
    "id": "audit-02",
    "module": "audit",
    "position": 2,
    "title": "Один воспроизводимый кадр",
    "book": "gltf",
    "where": "Introduction: mesh, node, scene (обзор терминов, если нужно)",
    "why": "Где CPU подготавливает draw и кто создаёт render target?",
    "build": "Покажи треугольник либо модель; добавь переключение background color и resize без ошибок.",
    "prove": "После изменения размера модель цела; можно указать функцию начала кадра и отправки команд.",
    "nodes": [
      "viewer0"
    ]
  },
  {
    "id": "audit-03",
    "module": "audit",
    "position": 3,
    "title": "Проследить конвейер своего кадра",
    "book": "rtr",
    "where": "Гл. 2: Graphics Rendering Pipeline (только основные стадии)",
    "why": "Чем vertex stage отличается от rasterization и fragment stage?",
    "build": "Нарисуй путь vertex buffer → vertex shader → clipping → rasterization → fragment → attachment для своего draw.",
    "prove": "Покажи исходные данные и соответствующие функции в своём коде; объясни, где глубина.",
    "nodes": [
      "pipeline"
    ]
  },
  {
    "id": "audit-04",
    "module": "audit",
    "position": 4,
    "title": "Диагностика ошибок до GPU debugger",
    "book": "",
    "where": "Документация своего WebGPU backend: error callbacks, validation и debug labels",
    "why": "Почему ошибку GPU API надо видеть рядом с нарушенным предположением?",
    "build": "Включи validation и метки ресурсов; намеренно создай одну invalid bind/format ситуацию в отдельном тесте.",
    "prove": "Получи диагностическое сообщение, верни рабочий код, запиши причину.",
    "nodes": [],
    "url": "https://www.w3.org/TR/webgpu/#errors-and-debugging"
  },
  {
    "id": "audit-05",
    "module": "audit",
    "position": 5,
    "title": "Первый захват кадра в RenderDoc",
    "book": "",
    "where": "RenderDoc: Getting Started / How to Capture a Frame (официальная документация)",
    "why": "Чем захват кадра полезнее простого скриншота?",
    "build": "Подключи RenderDoc к поддерживаемому API/backend, захвати кадр, найди draw call, target и bindings; при несовместимости backend используй поддерживаемый пример Vulkan и зафиксируй ограничение.",
    "prove": "Скрин event browser + конкретные входные данные draw и итоговый attachment.",
    "nodes": [
      "debug-tools"
    ],
    "url": "https://github.com/baldurk/renderdoc/blob/v1.x/docs/getting_started/quick_start.rst"
  },
  {
    "id": "shader-01",
    "module": "shader",
    "position": 1,
    "title": "UV, цвет и градиент",
    "book": "bos",
    "where": "Гл. 05, раздел о shaping functions; гл. 06, начало о цвете",
    "why": "Почему нормализованные координаты легче для функций?",
    "build": "Нарисуй fullscreen UV и плавный горизонтальный градиент; выведи каналы R, G, B по отдельности.",
    "prove": "Цвета меняются ожидаемо в центре и по краям.",
    "nodes": [
      "shape"
    ]
  },
  {
    "id": "shader-02",
    "module": "shader",
    "position": 2,
    "title": "step, smoothstep и графики",
    "book": "bos",
    "where": "Гл. 05: step, smoothstep, pow, sin (разделы по функциям)",
    "why": "Что именно выдаёт функция в каждой точке x?",
    "build": "Выведи 4 кривые с plot(), отобрази маску полосы через разность smoothstep.",
    "prove": "Объясни каждый порог и вычисли 3 значения вручную.",
    "nodes": [
      "shape"
    ]
  },
  {
    "id": "shader-03",
    "module": "shader",
    "position": 3,
    "title": "mask, mix и две фигуры",
    "book": "bos",
    "where": "Гл. 07: Drawing Shapes (прямоугольник и окружность)",
    "why": "Почему маска — скаляр, а цвет — вектор?",
    "build": "Нарисуй прямоугольник и круг; смешай два цвета по маске и передвинь фигуры.",
    "prove": "Фигуры не пропадают при resize, каждый вызов mix объясним.",
    "nodes": [
      "shape"
    ]
  },
  {
    "id": "shader-04",
    "module": "shader",
    "position": 4,
    "title": "Поворот, масштаб, aspect ratio",
    "book": "bos",
    "where": "Гл. 08: Matrices; гл. 09: Patterns (введение)",
    "why": "В чём отличие менять координаты от изменения цвета?",
    "build": "Сделай функцию 2D rotation для st вокруг центра; нарисуй сетку и исправь aspect ratio.",
    "prove": "Круг остаётся круглым при 16:9 и 4:3, геометрия вращается.",
    "nodes": [
      "sdf"
    ]
  },
  {
    "id": "shader-05",
    "module": "shader",
    "position": 5,
    "title": "SDF и мягкие края",
    "book": "bos",
    "where": "Гл. 07: Distance to a Field; гл. 05: smoothstep (повтор)",
    "why": "Как отрицательное и положительное расстояние задаёт внутреннюю область?",
    "build": "Реализуй signed distance до окружности и box, union и outline, сглаживание краёв.",
    "prove": "При смещении и изменении толщины маска остаётся непрерывной.",
    "nodes": [
      "sdf"
    ]
  },
  {
    "id": "shader-06",
    "module": "shader",
    "position": 6,
    "title": "Шум без мистики",
    "book": "bos",
    "where": "Гл. 10: Generative Designs, гл. 11: Noise (вводные части)",
    "why": "Чем hash/random отличается от связного noise?",
    "build": "Нарисуй клеточный random и smooth noise, анимируй порог; fBm оставь как бонус.",
    "prove": "На границах ячеек видно различие случайного и интерполированного поля.",
    "nodes": [
      "shader-gallery"
    ]
  },
  {
    "id": "shader-07",
    "module": "shader",
    "position": 7,
    "title": "Мини-галерея своих шейдеров",
    "book": "bos",
    "where": "Гл. 09–11: выбрать точные фрагменты под эффекты",
    "why": "Как менять сложность без копирования чужого кода?",
    "build": "Сохрани 5 маленьких эффектов (градиент, полосы, круг, SDF, шум) и панель параметров.",
    "prove": "Каждый эффект воспроизводим; 2 из 5 перезапиши с нуля.",
    "nodes": [
      "shader-gallery"
    ]
  },
  {
    "id": "shader-08",
    "module": "shader",
    "position": 8,
    "title": "Эффект для LUX//PRISM",
    "book": "",
    "where": "Конспект по своим маскам: smoothstep, distance, time",
    "why": "Как сделать визуальную реакцию на попадание без нового движка?",
    "build": "Перенеси одну маску в WGSL эффект выстрела/попадания с uniform времени.",
    "prove": "Эффект включается по событию игры и отключается по завершении.",
    "nodes": [
      "game-fx"
    ]
  },
  {
    "id": "math-01",
    "module": "math",
    "position": 1,
    "title": "Точки, направления, системы координат",
    "book": "mathprimer",
    "where": "Гл. 2–3: координаты и векторы",
    "why": "Почему точка и вектор по-разному преобразуются переносом?",
    "build": "Напиши 3 теста сложения/вычитания векторов, dot и cross на CPU; нарисуй axes.",
    "prove": "Проверяешь ортогональность по dot и handedness по cross.",
    "nodes": [
      "coords"
    ]
  },
  {
    "id": "math-02",
    "module": "math",
    "position": 2,
    "title": "Матрицы и порядок преобразований",
    "book": "mathprimer",
    "where": "Гл. 4–5: matrices и transforms (по теме)",
    "why": "Почему rotate*translate и translate*rotate не дают одинаковый результат?",
    "build": "Для одного объекта переключай порядок матриц, покажи local и world axes.",
    "prove": "Предсказываешь результат до запуска, находишь масштабирование.",
    "nodes": [
      "coords"
    ]
  },
  {
    "id": "math-03",
    "module": "math",
    "position": 3,
    "title": "Homogeneous w и perspective divide",
    "book": "fcg",
    "where": "Гл. 7: Viewing, подразделы homogeneous/viewing transformations",
    "why": "Для чего clip-space координата w и почему x,y,z делят на неё?",
    "build": "Выведи clip coordinates для трёх точек, сравни перспективу и ortho; нарисуй frustum.",
    "prove": "Объясни отличия clip/NDC и источник near-plane clipping.",
    "nodes": [
      "coords"
    ]
  },
  {
    "id": "math-04",
    "module": "math",
    "position": 4,
    "title": "Собственная камера",
    "book": "mathprimer",
    "where": "Гл. 6: orientations; гл. 8: camera / coordinate spaces по теме издания",
    "why": "Как получить view matrix из world transform камеры?",
    "build": "Реализуй orbit + fly camera с delta-time; зафиксируй near/far и pitch clamp.",
    "prove": "Можешь объяснить mouse → yaw/pitch → view → projection.",
    "nodes": [
      "viewer-camera"
    ]
  },
  {
    "id": "math-05",
    "module": "math",
    "position": 5,
    "title": "Vertex input и интерполяция",
    "book": "rtr",
    "where": "Гл. 2: vertex processing и rasterization",
    "why": "Что такое vertex attribute и varying/interpolant?",
    "build": "Покрась вершины RGB, передай UV, нормаль; сравни flat и perspective-correct interpolation (если поддерживается).",
    "prove": "Вершины и середина треугольника дают ожидаемые цвета и UV.",
    "nodes": [
      "vertex"
    ]
  },
  {
    "id": "math-06",
    "module": "math",
    "position": 6,
    "title": "Луч, плоскость, треугольник",
    "book": "rtd",
    "where": "Гл. 5: Ray–Plane и Ray–Triangle Tests (соответствующие подразделы)",
    "why": "Почему пересечение может быть отрицательным t или параллельным?",
    "build": "Напиши CPU функции intersectRayPlane и intersectRayTriangle; добавь unit tests hit/miss/edge.",
    "prove": "Тесты включают параллельность, вырожденный треугольник и t меньше нуля.",
    "nodes": [
      "geometry"
    ]
  },
  {
    "id": "math-07",
    "module": "math",
    "position": 7,
    "title": "Геометрия на экране",
    "book": "fcg",
    "where": "Гл. 2: Basic Geometry; гл. 9 по surface representation (по необходимости)",
    "why": "Как связаны индексы, winding и ориентация нормали?",
    "build": "Создай plane/cube с индексами; включи backface culling и debug wireframe.",
    "prove": "На кубе нет пропавших граней, winding проверен.",
    "nodes": [
      "geometry"
    ]
  },
  {
    "id": "scene-01",
    "module": "scene",
    "position": 1,
    "title": "Vertex и index buffers без загадок",
    "book": "gltf",
    "where": "glTF Tutorial: Buffers, Buffer Views, Accessors",
    "why": "Где лежат байты и как читать stride, offsets и count?",
    "build": "Загрузи интерливный и раздельный layout вершины; нарисуй indexed cube.",
    "prove": "Проверены offsets, память не читается за пределами массива.",
    "nodes": [
      "mesh"
    ]
  },
  {
    "id": "scene-02",
    "module": "scene",
    "position": 2,
    "title": "Mesh против submesh",
    "book": "gltf",
    "where": "glTF Tutorial: Meshes, Mesh Primitives",
    "why": "Почему material может быть у primitive, а не у mesh целиком?",
    "build": "Сделай mesh с двумя submeshes / primitives, каждому назначь отдельный material и index range.",
    "prove": "Оба участка рисуются одним vertex buffer и корректными index offsets.",
    "nodes": [
      "mesh"
    ]
  },
  {
    "id": "scene-03",
    "module": "scene",
    "position": 3,
    "title": "Material как данные, а не код",
    "book": "gltf",
    "where": "glTF Tutorial: Materials (overview)",
    "why": "Что принадлежит материалу, а что pipeline state?",
    "build": "Создай структуры MaterialData и MeshPrimitive; переключай параметры без if по имени модели.",
    "prove": "Два объекта используют один mesh и разные материалы.",
    "nodes": [
      "mesh"
    ]
  },
  {
    "id": "scene-04",
    "module": "scene",
    "position": 4,
    "title": "Transform hierarchy",
    "book": "gltf",
    "where": "glTF Tutorial: Nodes and Scenes",
    "why": "Как получить world transform ребенка?",
    "build": "Реализуй parent/local/world transforms (необязательно полноценный ECS), два уровня вложенности.",
    "prove": "При движении родителя дети движутся, локальные transform не портятся.",
    "nodes": [
      "scene-graph"
    ]
  },
  {
    "id": "scene-05",
    "module": "scene",
    "position": 5,
    "title": "glTF: первая настоящая сцена",
    "book": "gltf",
    "where": "glTF Tutorial: Introduction, Buffers, Meshes, Nodes and Scenes",
    "why": "Почему glTF scene отличается от списка мешей?",
    "build": "Загрузи glTF 2.0 через существующий parser; поддержи 1–2 materials и простую иерархию.",
    "prove": "Одна сцена с несколькими meshes и nodes выглядит правильно.",
    "nodes": [
      "gltf"
    ]
  },
  {
    "id": "scene-06",
    "module": "scene",
    "position": 6,
    "title": "Мини-цель: сцена из повторяемых объектов",
    "book": "",
    "where": "Собственные заметки о mesh, instance, material",
    "why": "Как не копировать буферы при 100 объектах?",
    "build": "Размести 100 объектов, сославшись на один mesh и разные world transforms; пока можно без instancing.",
    "prove": "Количество GPU ресурсов не растёт линейно с числом объектов.",
    "nodes": [
      "gltf"
    ]
  },
  {
    "id": "sampling-01",
    "module": "sampling",
    "position": 1,
    "title": "Изображение и texel",
    "book": "fcg",
    "where": "Гл. 10: Texture Mapping (вводные подразделы)",
    "why": "Чем normalized UV отличается от texel coordinate?",
    "build": "Нарисуй checker texture, переверни V, покажи UV debug.",
    "prove": "Чекер не смещён и не зеркалит из-за неверной convention.",
    "nodes": [
      "textures"
    ]
  },
  {
    "id": "sampling-02",
    "module": "sampling",
    "position": 2,
    "title": "Sampler и фильтрация",
    "book": "rtr",
    "where": "Гл. 6: Texturing, texture filtering",
    "why": "Почему nearest и linear дают разные артефакты?",
    "build": "Добавь nearest/linear переключатель на наклонённую плоскость.",
    "prove": "Сравни одинаковый ракурс на двух фильтрах.",
    "nodes": [
      "textures"
    ]
  },
  {
    "id": "sampling-03",
    "module": "sampling",
    "position": 3,
    "title": "Mipmaps и производные",
    "book": "rtr",
    "where": "Гл. 6: Mipmapping and anisotropic filtering",
    "why": "Откуда GPU берёт LOD и зачем derivatives?",
    "build": "Добавь mipmap цепочку; сравни при удалении и под скользящим углом.",
    "prove": "На дальнем объекте меньше shimmering; поясни компромисс качества и памяти.",
    "nodes": [
      "textures"
    ]
  },
  {
    "id": "sampling-04",
    "module": "sampling",
    "position": 4,
    "title": "Цвет: sRGB против linear",
    "book": "rtr",
    "where": "Гл. 8: Light and Color, раздел об encoding/gamma",
    "why": "Почему цвет текстуры и нормали декодируются по-разному?",
    "build": "Сделай экран сравнения неправильного/правильного linear mixing двух sRGB цветов.",
    "prove": "Средний по линейной энергии цвет отличается от наивного RGB average.",
    "nodes": [
      "color"
    ]
  },
  {
    "id": "sampling-05",
    "module": "sampling",
    "position": 5,
    "title": "Alpha blending и порядок",
    "book": "rtr",
    "where": "Гл. 5: Shading Basics / blending и transparency по оглавлению",
    "why": "Почему прозрачность зависит от порядка?",
    "build": "Нарисуй два полупрозрачных квадрата в разном порядке, включи premultiplied alpha в отдельном тесте.",
    "prove": "Объясни фактор SrcAlpha/OneMinusSrcAlpha и отличие straight/premultiplied.",
    "nodes": [
      "pipeline"
    ]
  },
  {
    "id": "sampling-06",
    "module": "sampling",
    "position": 6,
    "title": "Тестовая сцена для aliasing",
    "book": "fcg",
    "where": "Гл. 3: Raster Images / Sampling and Aliasing",
    "why": "Чем spatial aliasing отличается от MSAA edge smoothing?",
    "build": "Покажи наклонную сетку: no mip / mip / MSAA; сохрани три кадра.",
    "prove": "Можешь назвать, какой артефакт устраняет каждый метод.",
    "nodes": [
      "textures"
    ]
  },
  {
    "id": "light-01",
    "module": "light",
    "position": 1,
    "title": "Нормаль и Lambert",
    "book": "fcg",
    "where": "Гл. 5: Surface Shading, базовая часть",
    "why": "Почему N·L ограничен нулём и все направления должны быть в одном пространстве?",
    "build": "Добавь directional light Lambert к модели, debug view нормалей.",
    "prove": "На обратной стороне diffuse равен нулю; вращение модели работает.",
    "nodes": [
      "light"
    ]
  },
  {
    "id": "light-02",
    "module": "light",
    "position": 2,
    "title": "Blinn–Phong",
    "book": "rtr",
    "where": "Гл. 5: Local Illumination (классические модели обзорно)",
    "why": "Откуда берётся half vector и что меняет shininess?",
    "build": "Добавь specular и слайдер shininess; сравни 3 случая угла наблюдения.",
    "prove": "Можешь показать бликующий участок и исключить отрицательные dot.",
    "nodes": [
      "light"
    ]
  },
  {
    "id": "light-03",
    "module": "light",
    "position": 3,
    "title": "Debug views вместо гадания",
    "book": "",
    "where": "Свои структуры vertex/material + API debug labels",
    "why": "Что полезно визуализировать при неправильном освещении?",
    "build": "Добавь modes: normals, UV, roughness/metallic placeholders, depth.",
    "prove": "Все 4 режима работают на проблемной модели.",
    "nodes": [
      "debug-shader"
    ]
  },
  {
    "id": "light-04",
    "module": "light",
    "position": 4,
    "title": "Линейное освещение и output encoding",
    "book": "rtr",
    "where": "Гл. 8: Light and Color, surface to display",
    "why": "Почему освещение считается до tonemapping в linear-space?",
    "build": "На одной сцене сравни гамма-неправильный и линейный Lambert + sRGB output.",
    "prove": "Называешь точное место декодирования и кодирования.",
    "nodes": [
      "color"
    ]
  },
  {
    "id": "light-05",
    "module": "light",
    "position": 5,
    "title": "Освещение сцены 2.5D",
    "book": "",
    "where": "Повтор Lambert и debug views на своей сцене",
    "why": "Как освещение подчёркивает лазеры без лишних эффектов?",
    "build": "Поставь 3D зеркало и башню на тёмную сцену; направленный и point light в одной системе.",
    "prove": "На тёмной сцене читаются формы и виден направленный свет.",
    "nodes": [
      "game-look"
    ]
  },
  {
    "id": "light-06",
    "module": "light",
    "position": 6,
    "title": "Введение в photometry",
    "book": "pbrt",
    "where": "§4.1–4.3: радиометрические величины (выборочно)",
    "why": "Чем интенсивность источника отличается от radiance и отражения поверхности?",
    "build": "Сделай шпаргалку единиц и рассуждение об energy conservation для diffuse.",
    "prove": "Объясняешь почему удвоение экспозиции не равно удвоению albedo.",
    "nodes": [
      "light"
    ]
  },
  {
    "id": "pbr-01",
    "module": "pbr",
    "position": 1,
    "title": "BRDF и Fresnel до кода",
    "book": "rtr",
    "where": "Гл. 9: Physically Based Shading, подразделы BRDF/Fresnel",
    "why": "Почему отражение зависит от угла и roughness?",
    "build": "На бумаге объясни f_r, N·L и F0; сделай Schlick Fresnel график.",
    "prove": "Верно предсказываешь поведение dielectric и metal на краях.",
    "nodes": [
      "pbr"
    ]
  },
  {
    "id": "pbr-02",
    "module": "pbr",
    "position": 2,
    "title": "GGX: D, F, G",
    "book": "filament",
    "where": "Filament: Material System → Specular BRDF / Microfacet",
    "why": "Как D, F, G вместе формируют отражённый свет?",
    "build": "Реализуй GGX+Smith+Schlick в WGSL для одного directional light.",
    "prove": "При low roughness блик узкий, NaN/inf нет при N·V близком к 0.",
    "nodes": [
      "pbr"
    ]
  },
  {
    "id": "pbr-03",
    "module": "pbr",
    "position": 3,
    "title": "Normal matrix для неравномерного масштаба",
    "book": "fged2",
    "where": "Раздел Normal Transformations / Tangent Space (см. оглавление издания)",
    "why": "Почему обычная model matrix неверна для normals?",
    "build": "Создай растянутый объект, выведи normals до/после inverse-transpose.",
    "prove": "На наклонных гранях освещение не ломается при nonuniform scale.",
    "nodes": [
      "normals"
    ]
  },
  {
    "id": "pbr-04",
    "module": "pbr",
    "position": 4,
    "title": "Normal maps и TBN",
    "book": "fged2",
    "where": "Раздел Normal Mapping and Tangent Space",
    "why": "Как переносить tangent-space normal в world?",
    "build": "Подключи normal map; проверь TBN, handedness и flipped green на тестовом объекте.",
    "prove": "Источник света вращается, нормаль ведёт себя согласованно.",
    "nodes": [
      "normals"
    ]
  },
  {
    "id": "pbr-05",
    "module": "pbr",
    "position": 5,
    "title": "Материалы glTF metallic/roughness",
    "book": "gltf",
    "where": "glTF Tutorial: PBR Materials, Metallic Roughness",
    "why": "Какие каналы и пространства у baseColor/metallic/roughness?",
    "build": "Подключи glTF PBR материалы, 4 тестовые сферы 0/1 metallic и 0.1/0.8 roughness.",
    "prove": "Тестовая сетка материалов различима, все текстуры декодируются правильно.",
    "nodes": [
      "viewer-pbr"
    ]
  },
  {
    "id": "pbr-06",
    "module": "pbr",
    "position": 6,
    "title": "Ошибки энергосохранения",
    "book": "filament",
    "where": "Filament: Diffuse BRDF + Energy Conservation",
    "why": "Почему нельзя просто сложить две произвольные яркости?",
    "build": "Сравни твой PBR c простым Lambert/Phong, оцени изменение при grazing angle.",
    "prove": "Никаких выбросов и неверного освещения с тыльной стороны.",
    "nodes": [
      "viewer-pbr"
    ]
  },
  {
    "id": "shadow-01",
    "module": "shadow",
    "position": 1,
    "title": "Глубина из камеры света",
    "book": "rtr",
    "where": "Гл. 7: Shadows, Shadow Mapping",
    "why": "Что хранит depth texture теневого прохода?",
    "build": "Сделай depth-only pass от directional light и визуализируй shadow texture.",
    "prove": "Видно силуэт препятствия на карте глубины.",
    "nodes": [
      "shadow-theory"
    ]
  },
  {
    "id": "shadow-02",
    "module": "shadow",
    "position": 2,
    "title": "Shadow test в основном проходе",
    "book": "rtr",
    "where": "Гл. 7: Shadow Mapping, раздел сравнения глубин",
    "why": "Какие матрицы переводят точку в пространство света?",
    "build": "Спроецируй world position в light clip/UV и сравни глубину.",
    "prove": "Объект отбрасывает тень на плоскость, не на самого себя из-за неверных матриц.",
    "nodes": [
      "viewer-shadow"
    ]
  },
  {
    "id": "shadow-03",
    "module": "shadow",
    "position": 3,
    "title": "Bias и peter-panning",
    "book": "rtr",
    "where": "Гл. 7: Biasing / shadow artifacts",
    "why": "Почему bias лечит acne и создаёт detached shadow?",
    "build": "Выведи слайдер constant/slope bias и скрины acne и peter-panning.",
    "prove": "Можешь воспроизвести оба дефекта и выбрать обоснованный диапазон.",
    "nodes": [
      "shadow-theory"
    ]
  },
  {
    "id": "shadow-04",
    "module": "shadow",
    "position": 4,
    "title": "PCF и границы",
    "book": "rtr",
    "where": "Гл. 7: Percentage-Closer Filtering",
    "why": "Чем PCF отличается от размытия готовой бинарной тени?",
    "build": "Добавь 3×3 PCF и корректное поведение за краями карты.",
    "prove": "Сравни hard/soft, кадры не содержат ложных теней за frustum света.",
    "nodes": [
      "viewer-shadow"
    ]
  },
  {
    "id": "shadow-05",
    "module": "shadow",
    "position": 5,
    "title": "Стоимость shadow pass",
    "book": "",
    "where": "Документация GPU timestamp queries или профайлер своего API",
    "why": "Почему большой shadow map не бесплатен?",
    "build": "Измерь frame time при 512/1024/2048 и двух сценах.",
    "prove": "Таблица время/разрешение/сцена и сформулированный компромисс.",
    "nodes": [
      "viewer-shadow"
    ],
    "url": "https://www.w3.org/TR/webgpu/"
  },
  {
    "id": "ibl-01",
    "module": "ibl",
    "position": 1,
    "title": "HDR framebuffer без потери диапазона",
    "book": "rtr",
    "where": "Гл. 8: Light and Color, HDR imaging / tone reproduction",
    "why": "Для чего float/half-float render target?",
    "build": "Освети сцену значениями >1; выведи HDR-значение через debug и отключи принудительный clamp.",
    "prove": "Яркие фрагменты не обрезаются до tone mapping.",
    "nodes": [
      "post-theory"
    ]
  },
  {
    "id": "ibl-02",
    "module": "ibl",
    "position": 2,
    "title": "Tonemapping и exposure",
    "book": "filament",
    "where": "Filament: Tone Mapping + Exposure (разделы документа)",
    "why": "Почему экспозиция и tone mapping решают разные задачи?",
    "build": "Добавь exposure и оператор ACES-like либо Reinhard; переключай режимы.",
    "prove": "Один и тот же HDR input выводится предсказуемо на sRGB экран.",
    "nodes": [
      "post-theory"
    ]
  },
  {
    "id": "ibl-03",
    "module": "ibl",
    "position": 3,
    "title": "Bloom как несколько проходов",
    "book": "rtr",
    "where": "Гл. 12: Image-Space Effects, Bloom",
    "why": "Почему нужно выделять bright pixels в linear HDR?",
    "build": "Сделай bright-pass, downsample/blur и combine ДО tonemapping.",
    "prove": "При выключении bloom исходный свет не меняется; нет переполнений.",
    "nodes": [
      "viewer-post"
    ]
  },
  {
    "id": "ibl-04",
    "module": "ibl",
    "position": 4,
    "title": "Environment lighting",
    "book": "rtr",
    "where": "Гл. 10: Environment Lighting, environment maps обзор",
    "why": "Чем diffuse irradiance отличается от зеркальной environment lookup?",
    "build": "Сначала подключи environment cubemap как sky и reflection probe.",
    "prove": "Камера/объект вращается, отражения меняются корректно.",
    "nodes": [
      "ibl"
    ]
  },
  {
    "id": "ibl-05",
    "module": "ibl",
    "position": 5,
    "title": "Prefilter и BRDF LUT",
    "book": "filament",
    "where": "Filament: Image Based Lighting (diffuse/specular)",
    "why": "Почему один LOD кубмапы не описывает все roughness?",
    "build": "Добавь diffuse irradiance и roughness-based prefiltered specular + LUT или документированный аналог.",
    "prove": "Сферы меняют характер отражений при росте roughness, сравни контрольные кадры.",
    "nodes": [
      "ibl"
    ]
  },
  {
    "id": "ibl-06",
    "module": "ibl",
    "position": 6,
    "title": "Viewer: первая демонстрационная сборка",
    "book": "",
    "where": "README своего Viewer; тестовая сцена",
    "why": "Может ли другой человек проверить готовые свет, материалы, тени и bloom?",
    "build": "Зафиксируй scene + скрин before/after всех passes и простую инструкцию запуска.",
    "prove": "Чистая сборка; кадр воспроизводится с фиксированным camera preset.",
    "nodes": [
      "viewer-release"
    ]
  },
  {
    "id": "cpu-01",
    "module": "cpu",
    "position": 1,
    "title": "Владение CPU ресурсами",
    "book": "effective-cpp",
    "where": "Items 17–21: ownership и smart pointers",
    "why": "Кто владеет CPU объектом, а кто только ссылается?",
    "build": "Нарисуй lifetime mesh/material/cache и убери dangling pointers на CPU.",
    "prove": "Тест загрузить/удалить сцену 20 раз без ошибок и утечек.",
    "nodes": [
      "cpp"
    ]
  },
  {
    "id": "cpu-02",
    "module": "cpu",
    "position": 2,
    "title": "GPU lifetime и deferred destruction",
    "book": "",
    "where": "Документация своего API о work done / fences",
    "why": "Почему нельзя освобождать буфер сразу после submit?",
    "build": "Сделай очередь отложенного удаления resources после подтверждения завершения GPU-работы.",
    "prove": "Нет use-after-free при быстром reload и resize.",
    "nodes": [
      "cpp"
    ],
    "url": "https://www.w3.org/TR/webgpu/"
  },
  {
    "id": "cpu-03",
    "module": "cpu",
    "position": 3,
    "title": "Layout и выравнивание",
    "book": "csapp",
    "where": "Гл. 2: representation; гл. 6: memory hierarchy по теме",
    "why": "Как stride, alignment и padding влияют на правильность?",
    "build": "Добавь static_assert размера uniform struct и тест packing/offsets.",
    "prove": "CPU/GPU видят одинаковые поля и нет неинициализированных байтов.",
    "nodes": [
      "systems"
    ]
  },
  {
    "id": "cpu-04",
    "module": "cpu",
    "position": 4,
    "title": "Контейнеры и паттерны доступа",
    "book": "csapp",
    "where": "Гл. 5: Optimizing Program Performance; гл. 6: Cache Memories",
    "why": "Чем SoA выигрывает у AoS в линейном проходе?",
    "build": "Сравни обработку 100k transforms AoS/SoA в Release с многократным прогоном.",
    "prove": "Среднее и разброс замеров, сравнение при одинаковом алгоритме.",
    "nodes": [
      "systems"
    ]
  },
  {
    "id": "cpu-05",
    "module": "cpu",
    "position": 5,
    "title": "Планомерный рефакторинг",
    "book": "patterns",
    "where": "Game Loop, Data Locality (выборочные главы)",
    "why": "Где граница между renderer, asset cache и scene?",
    "build": "Раздели загрузку модели, хранение данных и draw submission в коде viewer.",
    "prove": "Новая модель добавляется без копирования render pass.",
    "nodes": [
      "repo-cleanup"
    ]
  },
  {
    "id": "scale-01",
    "module": "scale",
    "position": 1,
    "title": "Frustum plane tests",
    "book": "rtd",
    "where": "Гл. 5: plane tests; гл. 4: bounding volumes",
    "why": "Как проверить сферу/AABB относительно 6 плоскостей?",
    "build": "Напиши CPU frustum culling и тесты на границе, внутри и вне.",
    "prove": "При выключении culling все объекты снова рисуются; нет ложных пропусков.",
    "nodes": [
      "culling"
    ]
  },
  {
    "id": "scale-02",
    "module": "scale",
    "position": 2,
    "title": "Instancing против многократных draw",
    "book": "rtr",
    "where": "Гл. 18: Pipeline Optimization, batching/instancing",
    "why": "Когда один instanced draw дешевле сотни draw calls?",
    "build": "Отрисуй 100/1000 кубов отдельными draw и через instance buffer.",
    "prove": "Есть счётчик draw calls и сравнение CPU frame time.",
    "nodes": [
      "viewer-perf"
    ]
  },
  {
    "id": "scale-03",
    "module": "scale",
    "position": 3,
    "title": "Пространственные структуры",
    "book": "rtd",
    "where": "Гл. 6: Bounding Volume Hierarchies (концепция построения/обхода)",
    "why": "Почему BVH быстрее полного перебора при большинстве лучей?",
    "build": "Сделай простое median-split BVH на CPU для ray picking.",
    "prove": "Результат совпадает с brute force на 100 случайных лучах.",
    "nodes": [
      "spatial"
    ]
  },
  {
    "id": "scale-04",
    "module": "scale",
    "position": 4,
    "title": "Первое профилирование CPU",
    "book": "csapp",
    "where": "Гл. 5: Measurement / profiling portions",
    "why": "Как отличить slow update и expensive submission?",
    "build": "Поставь timers на update/render/submit, измерь разные количества объектов.",
    "prove": "Таблица разрешение/число объектов/CPU update/CPU render.",
    "nodes": [
      "profiling"
    ]
  },
  {
    "id": "scale-05",
    "module": "scale",
    "position": 5,
    "title": "Первое профилирование GPU",
    "book": "",
    "where": "RenderDoc timing для анализа структуры; для времени GPU используй timestamp queries или GPU profiler",
    "why": "Почему CPU-время submit не равно GPU frame time?",
    "build": "Добавь GPU timestamp для passes (при поддержке); покажи итоговые CPU/GPU времена.",
    "prove": "Различаешь bottleneck по измерениям, не по догадке.",
    "nodes": [
      "profiling"
    ],
    "url": "https://www.w3.org/TR/webgpu/"
  },
  {
    "id": "scale-06",
    "module": "scale",
    "position": 6,
    "title": "Оптимизация с доказательством",
    "book": "rtr",
    "where": "Гл. 18: Performance and Optimization (выбранные разделы)",
    "why": "Почему измерять надо одинаковые камеры, сцены и сборки?",
    "build": "Сформулируй гипотезу, измени один фактор, измерь минимум 20 кадров до/после.",
    "prove": "Отчёт: гипотеза, метод, график и честный вывод (в том числе если хуже).",
    "nodes": [
      "perf-study",
      "viewer-perf"
    ]
  },
  {
    "id": "vulkan-01",
    "module": "vulkan",
    "position": 1,
    "title": "Instance, device и queue",
    "book": "vkguide",
    "where": "Getting Started: Initialization + Vulkan core structure",
    "why": "За что отвечают instance, physical device, logical device и queue family?",
    "build": "Подними окно с validation layers и выбранной queue; сохрани лог выбора GPU.",
    "prove": "Можно объяснить каждое созданное handle и путь ошибок.",
    "nodes": [
      "vk-start"
    ]
  },
  {
    "id": "vulkan-02",
    "module": "vulkan",
    "position": 2,
    "title": "Swapchain и первый кадр",
    "book": "vkguide",
    "where": "Swapchain, dynamic rendering, command buffers",
    "why": "Кто владеет swapchain images и в каком порядке Acquire/Record/Submit/Present?",
    "build": "Очисти swapchain image своим цветом, затем отрисуй треугольник.",
    "prove": "Resize и закрытие без validation errors.",
    "nodes": [
      "vk-start"
    ]
  },
  {
    "id": "vulkan-03",
    "module": "vulkan",
    "position": 3,
    "title": "Vertex/index buffers и staging",
    "book": "vkguide",
    "where": "Meshes, buffers / uploading data (по оглавлению версии)",
    "why": "Почему device-local буфер часто требует staging?",
    "build": "Перенеси куб/mesh через staging buffer; drawIndexed, depth test.",
    "prove": "Валидация без ошибок, кадр повторяем.",
    "nodes": [
      "vk-mesh"
    ]
  },
  {
    "id": "vulkan-04",
    "module": "vulkan",
    "position": 4,
    "title": "Descriptors и материалы",
    "book": "vkguide",
    "where": "Descriptor sets, pipelines, textures",
    "why": "Как shader получает данные без непосредственного CPU указателя?",
    "build": "Добавь camera uniform и текстуру, материал на 2 объекта.",
    "prove": "На двух объектах разные данные, нет stale descriptors.",
    "nodes": [
      "vk-mesh"
    ]
  },
  {
    "id": "vulkan-05",
    "module": "vulkan",
    "position": 5,
    "title": "Barriers и resource layout",
    "book": "vulkanguide",
    "where": "Synchronization2: Execution and Memory Dependencies",
    "why": "Почему stage/access зависят от producer и consumer?",
    "build": "Задокументируй 3 перехода render-target→sampled и transfer→shader-read через Sync2.",
    "prove": "Sync validation чиста, объясняешь layout и stage/access обеих сторон.",
    "nodes": [
      "vk-sync"
    ]
  },
  {
    "id": "vulkan-06",
    "module": "vulkan",
    "position": 6,
    "title": "Frames in flight",
    "book": "vulkanguide",
    "where": "Synchronization: fences, binary semaphores, timeline semaphores",
    "why": "Чем fence отличается от semaphore и barrier?",
    "build": "2 кадра in flight с собственными ресурсами per frame, без reuse до completion.",
    "prove": "Нет ресурсов, используемых двумя незавершёнными кадрами.",
    "nodes": [
      "vk-sync"
    ]
  },
  {
    "id": "vulkan-07",
    "module": "vulkan",
    "position": 7,
    "title": "Самостоятельный мини-рендерер",
    "book": "vkguide",
    "where": "Итоговый пересмотр Resources / Render Loop",
    "why": "Что из гайда я могу написать без копирования?",
    "build": "Собери мини-сцену mesh+texture+depth+camera в отдельном репо; поясни 5 важных решений.",
    "prove": "Сборка с нуля и скриншот независимой сцены + validation.",
    "nodes": [
      "vk-mini"
    ]
  },
  {
    "id": "compute-01",
    "module": "compute",
    "position": 1,
    "title": "Workgroup, invocation, dispatch",
    "book": "cuda",
    "where": "Гл. 2: Heterogeneous Data Parallel Computing (концепции)",
    "why": "Чем invocation отличается от workgroup и dispatch?",
    "build": "WGSL compute заполняет storage buffer index/value с bounds guard.",
    "prove": "Работает для 0, 1, 17 и 1025 элементов.",
    "nodes": [
      "compute"
    ]
  },
  {
    "id": "compute-02",
    "module": "compute",
    "position": 2,
    "title": "Модель исполнения GPU",
    "book": "cuda",
    "where": "Гл. 3: Multidimensional Grids and Data",
    "why": "Почему ветвления и память влияют на throughput?",
    "build": "Измерь несколько размеров workgroup для одного алгоритма.",
    "prove": "Указываешь GPU/driver и измеренные значения; не обещаешь универсальный оптимум.",
    "nodes": [
      "gpu-model"
    ]
  },
  {
    "id": "compute-03",
    "module": "compute",
    "position": 3,
    "title": "Reduction: частичные суммы",
    "book": "cuda",
    "where": "Гл. 4–5: parallel patterns / memory (по названию темы)",
    "why": "Почему reduction отличается от map и как избегать out-of-range?",
    "build": "Реализуй min/max или sum массива на GPU с несколькими workgroups.",
    "prove": "Сравнение с CPU reference на случайных длинах.",
    "nodes": [
      "compute"
    ]
  },
  {
    "id": "compute-04",
    "module": "compute",
    "position": 4,
    "title": "Workgroup barriers",
    "book": "cuda",
    "where": "Гл. о shared memory и synchronization (в твоём издании — по теме)",
    "why": "Почему нельзя ставить barrier в ветку, не достижимую всеми invocations?",
    "build": "Напиши tiled вычисление или reduction через workgroup memory и barrier.",
    "prove": "Проверь несколько размеров и код для дивергентного barrier не используй.",
    "nodes": [
      "compute"
    ]
  },
  {
    "id": "compute-05",
    "module": "compute",
    "position": 5,
    "title": "Buffer→texture: GPU частицы",
    "book": "",
    "where": "WebGPU compute examples + данные shader buffer",
    "why": "Как разделить update и render через общий buffer?",
    "build": "Compute обновляет 10k particles; vertex/fragment рисуют их, FPS счётчик.",
    "prove": "Нет data race, частицы детерминированны при фиксированном seed.",
    "nodes": [
      "compute-project"
    ],
    "url": "https://webgpu.github.io/webgpu-samples/"
  },
  {
    "id": "compute-06",
    "module": "compute",
    "position": 6,
    "title": "Профиль GPU алгоритма",
    "book": "cuda",
    "where": "Главы о memory throughput / optimization (выборочно)",
    "why": "Что ограничивает частоту: bandwidth или arithmetic?",
    "build": "Измени layout и размер workgroup, добавь timing.",
    "prove": "Таблица времени/количества частиц и контроль правильности.",
    "nodes": [
      "gpu-model",
      "compute-project"
    ],
    "url": "https://webgpu.github.io/webgpu-samples/"
  },
  {
    "id": "animation-01",
    "module": "animation",
    "position": 1,
    "title": "Keyframes и интерполяция",
    "book": "gltf",
    "where": "glTF Tutorial: Animations, Animation Samplers",
    "why": "Как вычислить transform между двумя ключами?",
    "build": "Сделай простую translate/rotation анимацию node без skeleton.",
    "prove": "На t=0 и t=end получаются точные исходные keyframes.",
    "nodes": [
      "viewer-animation"
    ]
  },
  {
    "id": "animation-02",
    "module": "animation",
    "position": 2,
    "title": "Skeleton joints и bind pose",
    "book": "gltf",
    "where": "glTF Tutorial: Skins and Skeletons",
    "why": "Почему inverseBindMatrix необходима для skinning?",
    "build": "Загрузите joint hierarchy и зафиксируй bind-pose matrix для одного сустава.",
    "prove": "В bind pose меш совпадает с исходной геометрией.",
    "nodes": [
      "viewer-animation"
    ]
  },
  {
    "id": "animation-03",
    "module": "animation",
    "position": 3,
    "title": "Linear blend skinning",
    "book": "gameengine",
    "where": "3-е изд., гл. 12: Skeletal Animation, skinning sections",
    "why": "В каком порядке применяются joint matrices и веса?",
    "build": "Добавь skinning вершин на GPU с 4 influences и нормализацией weights.",
    "prove": "При вращении сустава деформация непрерывна, нет NaN.",
    "nodes": [
      "viewer-animation"
    ]
  },
  {
    "id": "animation-04",
    "module": "animation",
    "position": 4,
    "title": "Тест сложной анимации",
    "book": "gltf",
    "where": "glTF Tutorial: Animations + Skins (практические примеры)",
    "why": "Что происходит при pause/restart и смене интерполяции?",
    "build": "Добавь play/pause, scrub timeline и визуализацию joints.",
    "prove": "Смена анимаций не рвёт transform hierarchy.",
    "nodes": [
      "viewer-animation"
    ]
  },
  {
    "id": "manylights-01",
    "module": "manylights",
    "position": 1,
    "title": "Ценность many-lights",
    "book": "rtr",
    "where": "Гл. 20: Beyond the Graphics Pipeline, Deferred Shading обзор",
    "why": "Почему forward сложен при 1000 источников?",
    "build": "Добавь 32–128 lights на одной сцене, построй baseline CPU/GPU timings.",
    "prove": "Измерена точка, где naive forward замедляется.",
    "nodes": [
      "advanced"
    ]
  },
  {
    "id": "manylights-02",
    "module": "manylights",
    "position": 2,
    "title": "G-buffer и deferred shading",
    "book": "rtr",
    "where": "Гл. 20: Deferred Shading, основной алгоритм",
    "why": "Зачем сохранять normals/depth/material и какой bandwidth overhead?",
    "build": "Реализуй G-buffer из 3 attachments + fullscreen lighting pass.",
    "prove": "Сравни визуально с forward на той же сцене.",
    "nodes": [
      "viewer-architecture"
    ]
  },
  {
    "id": "manylights-03",
    "module": "manylights",
    "position": 3,
    "title": "Tiles или clusters",
    "book": "rtr",
    "where": "Гл. 20: Tiled and Clustered Shading",
    "why": "Как ограничить число lights на пиксель?",
    "build": "Построй экранные tiles и light index list с пределом ёмкости.",
    "prove": "Переполнение обнаруживается, а не портит память.",
    "nodes": [
      "advanced"
    ]
  },
  {
    "id": "manylights-04",
    "module": "manylights",
    "position": 4,
    "title": "Сравнение и выбор",
    "book": "",
    "where": "Собственный benchmark, reference кадр",
    "why": "Где Deferred проигрывает из-за transparency и memory?",
    "build": "Сравни forward/deferred и объём G-buffer при одинаковых lights.",
    "prove": "Таблица quality/performance/memory с объяснением.",
    "nodes": [
      "viewer-architecture"
    ]
  },
  {
    "id": "temporal-01",
    "module": "temporal",
    "position": 1,
    "title": "Jitter и subpixel sampling",
    "book": "rtr",
    "where": "Гл. 12: Image-Space Effects / Antialiasing (введение)",
    "why": "Почему один пиксель за кадр не знает под-pixel информацию?",
    "build": "Добавь субпиксельный jitter к projection и режим 4x supersampling reference.",
    "prove": "При статичной сцене сохраняется правильное центральное положение.",
    "nodes": [
      "viewer-post"
    ]
  },
  {
    "id": "temporal-02",
    "module": "temporal",
    "position": 2,
    "title": "Motion vectors и reprojection",
    "book": "taa",
    "where": "Temporal Anti-Aliasing: reprojection and history concepts",
    "why": "Почему нужны previous frame matrices и пространство motion vectors?",
    "build": "Выведи motion vectors в debug view при движении камеры и объекта.",
    "prove": "В покое почти нули, при движении направление ожидаемо.",
    "nodes": [
      "viewer-post"
    ]
  },
  {
    "id": "temporal-03",
    "module": "temporal",
    "position": 3,
    "title": "History accumulation",
    "book": "taa",
    "where": "Temporal Anti-Aliasing: accumulation/history rejection",
    "why": "Как аккумулировать без размазывания disocclusion?",
    "build": "Реализуй простую накопительную историю с rejection по depth и neighborhood clamp.",
    "prove": "Сравнение на движущейся сцене и ghosting debug.",
    "nodes": [
      "viewer-post"
    ]
  },
  {
    "id": "temporal-04",
    "module": "temporal",
    "position": 4,
    "title": "Качество и артефакты",
    "book": "taa",
    "where": "Temporal AA: artifacts/trade-offs",
    "why": "Почему убранный shimmering может стоить blur и ghosting?",
    "build": "Сделай набор видео: no TAA / TAA / supersampled reference.",
    "prove": "Назови 3 дефекта и конкретные причины, не только FPS.",
    "nodes": [
      "advanced"
    ]
  },
  {
    "id": "transport-01",
    "module": "transport",
    "position": 1,
    "title": "CPU ray → hit",
    "book": "rayweekend",
    "where": "Разделы The Ray Class, Sphere Intersection, Surface Normals",
    "why": "Зачем ray(o,d) и диапазон t_min/t_max?",
    "build": "Свой CPU tracer: сферы, normal visualization и ray color.",
    "prove": "Контрольные пиксели и пересечения сравниваются с аналитикой.",
    "nodes": [
      "tracer"
    ]
  },
  {
    "id": "transport-02",
    "module": "transport",
    "position": 2,
    "title": "Камера и отражение",
    "book": "rayweekend",
    "where": "Разделы Antialiasing, Camera, Diffuse Materials, Metal",
    "why": "Как порождать лучи и отражать направление?",
    "build": "Добавь camera+Lambert scatter+metal; выводи PPM/PNG.",
    "prove": "Контроль фиксированного seed и ожидаемая зависимость от roughness.",
    "nodes": [
      "tracer"
    ]
  },
  {
    "id": "transport-03",
    "module": "transport",
    "position": 3,
    "title": "BRDF и базовый path tracing",
    "book": "rayweekend",
    "where": "Разделы Dielectrics, Defocus Blur; финальные примеры",
    "why": "Почему следующий луч выбирается случайно?",
    "build": "Сделай bounce loop c russian roulette после нескольких отскоков.",
    "prove": "Результат с 1/16/256 samples предсказуемо становится стабильнее.",
    "nodes": [
      "tracer"
    ]
  },
  {
    "id": "transport-04",
    "module": "transport",
    "position": 4,
    "title": "PDF и Monte Carlo",
    "book": "rt-rest",
    "where": "Разделы Monte Carlo Integration, PDFs, Importance Sampling",
    "why": "Почему вес sample равен f(x)/p(x)?",
    "build": "Реализуй importance sampling hemisphere/area light на одной сцене.",
    "prove": "PDF нормализована, есть сравнение с uniform sampling.",
    "nodes": [
      "tracer"
    ]
  },
  {
    "id": "transport-05",
    "module": "transport",
    "position": 5,
    "title": "Ускоряющая структура",
    "book": "raynext",
    "where": "Разделы Bounding Volume Hierarchies",
    "why": "Почему BVH уменьшает число тестов пересечения?",
    "build": "Переведи CPU tracer на BVH со счётчиком ray/primitive tests.",
    "prove": "Кадры совпадают с brute force, тестов меньше.",
    "nodes": [
      "spatial"
    ]
  },
  {
    "id": "transport-06",
    "module": "transport",
    "position": 6,
    "title": "Reference и честная метрика",
    "book": "pbrt",
    "where": "Гл. 13: Monte Carlo Integration; § про integrators (выборочно)",
    "why": "Как оценивать шум без доверия одному seed?",
    "build": "Сравни 4 seeds, вычисли MAE/RMSE против reference и записывай runtime.",
    "prove": "Есть таблица ошибка/spp/сек, вывод корректен для выбранных сцен.",
    "nodes": [
      "tracer"
    ]
  },
  {
    "id": "architecture-01",
    "module": "architecture",
    "position": 1,
    "title": "Карта зависимостей проходов",
    "book": "",
    "where": "Свой Viewer: draw calls, render targets и lifetime",
    "why": "Почему порядок проходов — это отношения чтение/запись, а не случайная последовательность?",
    "build": "Нарисуй DAG shadow → geometry → HDR → bloom → present и используемые textures.",
    "prove": "Никакой pass не читает ещё не записанный target.",
    "nodes": [
      "viewer-architecture"
    ]
  },
  {
    "id": "architecture-02",
    "module": "architecture",
    "position": 2,
    "title": "Resources и resize",
    "book": "gameengine",
    "where": "Гл. 7–8: resource management / rendering engine (по теме)",
    "why": "Кто пересоздаёт render targets и что происходит с in-flight кадрами?",
    "build": "Введи явный lifecycle create/resize/destroy и тест 50 быстрых resize.",
    "prove": "Нет leaks, use-after-free и заметного мерцания при resize.",
    "nodes": [
      "viewer-architecture"
    ]
  },
  {
    "id": "architecture-03",
    "module": "architecture",
    "position": 3,
    "title": "Job system: смысл до потоков",
    "book": "ostep",
    "where": "Гл. 26–28: Concurrency, Threads, Locks",
    "why": "Какие CPU задачи можно параллелить независимо от GPU submission?",
    "build": "Распараллель CPU scene-update по чанкам, без shared mutable writes.",
    "prove": "В ThreadSanitizer или эквивалентной проверке нет races.",
    "nodes": [
      "threading"
    ]
  },
  {
    "id": "architecture-04",
    "module": "architecture",
    "position": 4,
    "title": "Маленький task graph",
    "book": "ostep",
    "where": "Гл. 29–32: lock-based concurrent data structures, condition variables (по теме)",
    "why": "Что значит dependency между двумя jobs?",
    "build": "Реализуй 3 задачи с зависимостями: load → prepare → draw data; сравни serial.",
    "prove": "Зависимости не нарушаются на многократном запуске.",
    "nodes": [
      "threading"
    ]
  },
  {
    "id": "architecture-05",
    "module": "architecture",
    "position": 5,
    "title": "Проверяемая архитектура",
    "book": "",
    "where": "README и схема своих ресурсов",
    "why": "Как обосновать новый слой без «на всякий случай»?",
    "build": "Убери лишние абстракции, добавь 2 теста жизненного цикла и карту владельцев.",
    "prove": "Новый render pass добавляется без изменения всех существующих систем.",
    "nodes": [
      "viewer-architecture"
    ]
  },
  {
    "id": "craft-01",
    "module": "craft",
    "position": 1,
    "title": "Reference scenes и визуальный регресс",
    "book": "",
    "where": "Свой исходный Viewer, screenshots & scenes",
    "why": "Как отличить regression от освещения другой сцены?",
    "build": "Зафиксируй 3 scenes (matte, metal, stress) и сравнимые camera presets.",
    "prove": "Before/after скрины совпадают при одной версии.",
    "nodes": [
      "viewer-release"
    ]
  },
  {
    "id": "craft-02",
    "module": "craft",
    "position": 2,
    "title": "Воспроизводимый benchmark",
    "book": "rtr",
    "where": "Гл. 18: Optimization, methodology (выборочно)",
    "why": "Почему FPS одного кадра не является доказательством оптимизации?",
    "build": "Запиши GPU/CPU median/p95, настройки, разрешение и GPU hardware.",
    "prove": "Отчёт позволяет другому запустить аналогичный тест.",
    "nodes": [
      "perf-study"
    ]
  },
  {
    "id": "craft-03",
    "module": "craft",
    "position": 3,
    "title": "README и быстрый запуск",
    "book": "",
    "where": "README, CI pipeline и install instructions",
    "why": "Может ли незнакомый разработчик собрать за ограниченное количество действий?",
    "build": "Убери локальные абсолютные пути, напиши prerequisites и demo steps.",
    "prove": "Clean clone/build/run подтверждён отдельно; 3 GIF/screenshot.",
    "nodes": [
      "viewer-release"
    ],
    "url": "https://docs.github.com/en/actions"
  },
  {
    "id": "craft-04",
    "module": "craft",
    "position": 4,
    "title": "Внятное объяснение решений",
    "book": "",
    "where": "Design notes / postmortem к своему renderer",
    "why": "Почему выбран WebGPU/Vulkan и каков компромисс?",
    "build": "Напиши краткий case study 1–2 страниц: задача, ограничения, решение, измерения.",
    "prove": "Есть ссылки на код, кадры, проблемы и альтернативы.",
    "nodes": [
      "portfolio-ready"
    ]
  },
  {
    "id": "craft-05",
    "module": "craft",
    "position": 5,
    "title": "Подготовка вертикального среза",
    "book": "",
    "where": "Документ уровня игры и текущая играбельная сборка",
    "why": "Где главный игровой loop и конкретный контент?",
    "build": "Соедини одну волну, одну башню, отражающий луч, проигрыш/победу и меню Restart.",
    "prove": "Другой человек проходит 5-минутное демо без разработчика рядом.",
    "nodes": [
      "game-content"
    ]
  },
  {
    "id": "gameplay-01",
    "module": "gameplay",
    "position": 1,
    "title": "Первый играбельный цикл",
    "book": "",
    "where": "Собственный прототип LUX//PRISM; минимальный design note",
    "why": "Как выглядит loop spawn→move→shoot→reset?",
    "build": "Отрисуй поле и один движущийся target; стреляет одна башня по фиксированной логике.",
    "prove": "Демо запускается за 1 минуту и можно проиграть/перезапустить.",
    "nodes": [
      "game-prototype"
    ]
  },
  {
    "id": "gameplay-02",
    "module": "gameplay",
    "position": 2,
    "title": "Луч и точка пересечения",
    "book": "rtd",
    "where": "Гл. 5: ray–plane, ray–AABB",
    "why": "Как найти ближайшее препятствие луча?",
    "build": "Реализуй 2D segment/ray intersections и renderer отрезка лазера.",
    "prove": "Юнит-тесты попадание, промах, параллельность, попадание в конец.",
    "nodes": [
      "laser"
    ]
  },
  {
    "id": "gameplay-03",
    "module": "gameplay",
    "position": 3,
    "title": "Отражение от зеркала",
    "book": "",
    "where": "Формула r=d−2 dot(d,n)n; краткий собственный вывод",
    "why": "Почему отражение сохраняет длину направления?",
    "build": "Добавь поворотное зеркало и до 4 отражений луча с epsilon от самопопаданий.",
    "prove": "Угол падения равен углу отражения, нет бесконечного цикла.",
    "nodes": [
      "laser"
    ]
  },
  {
    "id": "gameplay-04",
    "module": "gameplay",
    "position": 4,
    "title": "Волны и экономика tower defense",
    "book": "patterns",
    "where": "Game Loop, State (по названию главы)",
    "why": "Где лежит состояние wave и зачем fixed step?",
    "build": "Сделай spawn нескольких врагов, HP базы, стоимость башни, restart, паузу.",
    "prove": "Результаты повторяются при фиксированном seed/шаге; можно победить/проиграть.",
    "nodes": [
      "td"
    ]
  },
  {
    "id": "gameplay-05",
    "module": "gameplay",
    "position": 5,
    "title": "Читабельность визуального сигнала",
    "book": "bos",
    "where": "Гл. 05: shaping; гл. 07: masks",
    "why": "Что важнее игроку увидеть во время атаки?",
    "build": "Добавь короткую вспышку попадания и полосу HP поверх тёмной 2.5D сцены.",
    "prove": "Враг, путь луча и зеркало различимы на обычном мониторе.",
    "nodes": [
      "game-look"
    ]
  },
  {
    "id": "release-01",
    "module": "release",
    "position": 1,
    "title": "Маленький контентный срез",
    "book": "",
    "where": "Своя концепция LUX//PRISM и список must-have функций",
    "why": "Что можно закончить, не создавая универсальный движок?",
    "build": "Сделай 1 карту, 3 волны, 2 башни, 2 типа врагов, 1 зеркало и win/lose screen.",
    "prove": "Прототип играбелен с нуля без dev-консоли.",
    "nodes": [
      "game-content"
    ]
  },
  {
    "id": "release-02",
    "module": "release",
    "position": 2,
    "title": "UX и управление",
    "book": "",
    "where": "Собственный playtest checklist",
    "why": "Где игрок запутался в выборе/вращении зеркала?",
    "build": "Добавь hover, preview placement, feedback invalid placement, restart.",
    "prove": "Незнакомый игрок может поставить башню без объяснения.",
    "nodes": [
      "game-content"
    ]
  },
  {
    "id": "release-03",
    "module": "release",
    "position": 3,
    "title": "Демо для тестирования",
    "book": "",
    "where": "Steamworks / официальные требования магазина — только если планируется публикация",
    "why": "Что должно работать без IDE и специальных путей?",
    "build": "Собери релизную сборку, сделай crash/error log и проведи 3 playtests.",
    "prove": "Результаты тестов записаны, критические ошибки устранены.",
    "nodes": [
      "game-ship"
    ],
    "url": "https://partner.steamgames.com/doc/home"
  },
  {
    "id": "release-04",
    "module": "release",
    "position": 4,
    "title": "Публикация как отдельная цель",
    "book": "",
    "where": "Steamworks documentation по актуальным требованиям на момент выпуска",
    "why": "Какие обязательства и страницы нужны, прежде чем нажать Publish?",
    "build": "Подготовь build, store assets, описание и финальный checklist; публикуй только когда сам решишь.",
    "prove": "Сборка протестирована, список блокеров пуст; статус Steam не отмечай без реального выпуска.",
    "nodes": [
      "game-ship"
    ],
    "url": "https://partner.steamgames.com/doc/gettingstarted"
  }
];

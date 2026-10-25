# Graphics Programmer Roadmap

Готовая статическая страница, не требует сборки и backend.

## GitHub Pages

1. Создайте публичный репозиторий, например `graphics-roadmap`.
2. Загрузите в корень репозитория `index.html` и `.nojekyll`.
3. Откройте Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: main, /(root) → Save.
4. Адрес: `https://USERNAME.github.io/graphics-roadmap/` (замените USERNAME).

## Nginx

Скопируйте `index.html` в директорию статических файлов, указанную директивой `root` вашего сайта.
Например, `/var/www/graphics-roadmap/index.html`.

## Важно о прогрессе

Прогресс сохраняется в localStorage браузера (домен + браузер). Между устройствами не синхронизируется. Перед сменой адреса или версии экспортируйте прогресс в JSON и импортируйте на новом адресе.

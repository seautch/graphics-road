# Graphics Programmer Roadmap

A ready-to-use static page that requires no build step or backend.

## GitHub Pages

1. Create a public repository (e.g., `graphics-roadmap`).
2. Push `index.html` and `.nojekyll` to the repository root.
3. Go to **Settings** → **Pages** → **Build and deployment** → **Source**: *Deploy from a branch* → **Branch**: *main*, */(root)* → **Save**.
4. URL: `[https://USERNAME.github.io/graphics-roadmap/](https://USERNAME.github.io/graphics-roadmap/)` (replace `USERNAME` with your account handle).

## Nginx

Copy `index.html` to the static files directory defined by the `root` directive of your website block.
For example: `/var/www/graphics-roadmap/index.html`.

## Important Note on Progress

Progress is saved in the browser's `localStorage` (scoped to domain + browser). It does not sync across devices. Before changing domains or updating versions, export your progress as a JSON file and import it at the new URL.

## Quick repo snapshot

- Small static site: plain HTML pages that link to a generated stylesheet at `dist/styles.css`.
- Tailwind is used via PostCSS; source is `styles.css` (it imports `tailwindcss` and Google Fonts). There is no JS app, server, or bundler.

## Core developer commands

- Install deps: run `npm install` in the repo root.
- Build CSS once: `npm run build` (runs `postcss styles.css -o dist/styles.css`).
- Rebuild on change: `npm run watch` (same command with `--watch`).

If styles don't update, run `npm run build` and confirm `home.html` (and other pages) reference `dist/styles.css`.

## Key files to read or modify

- `home.html`, `products.html`, `about.html`, `cart.html` — static pages that reference `dist/styles.css`.
- `styles.css` — source stylesheet; imports Google Fonts, `@import "tailwindcss"`, defines CSS variables (e.g. `--font-GreatVibes`) and a few keyframes.
- `postcss.config.js` — enables the PostCSS plugin `@tailwindcss/postcss`.
- `package.json` — contains `build` and `watch` scripts and Tailwind/PostCSS deps. There is no `tailwind.config.js`.

## Project-specific conventions & patterns

- Output target: always write generated CSS to `dist/styles.css`. HTML files link directly to that path — changing the output requires updating HTML.
- Fonts: Google Fonts are imported in `styles.css`. The project uses custom font class names in HTML like `font-GreatVibes` and `font-Tinos`.
- Images: stored in `images/`. Filenames contain spaces and punctuation (e.g. `wedding dress.jpg`); keep exact names or update HTML if you rename files.

## Integration points & dependencies

- NPM packages: `tailwindcss`, `postcss`, `postcss-cli`, and `@tailwindcss/postcss` (see `package.json`).
- No external APIs or servers are used. All assets are local (`images/`, `home.html`, etc.).

## Examples from the codebase

- build script: `package.json` -> `"build": "postcss styles.css -o dist/styles.css"`.
- font usage: `home.html` uses `class="text-6xl font-GreatVibes"` while `styles.css` defines `--font-GreatVibes` — if switching to Tailwind font utilities, map `GreatVibes` in `tailwind.config.js`.

## Small safe tasks an AI agent can perform

- Rebuild CSS and verify `dist/styles.css` updates.
- Add a new static page (copy `home.html`), ensure it links to `dist/styles.css` and add images from `images/`.

---

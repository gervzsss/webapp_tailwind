## Repo: webapp_tailwind — quick-start guidance for AI coding agents

This repository is a small static Tailwind-based storefront (HTML + CSS + small JS). The goal of these instructions is to surface the project-specific patterns and workflows so an AI agent can be productive immediately.

Core facts
- Static HTML pages: `home.html`, `products.html`, `about.html`, `cart.html` are the primary views.
- Styling: Tailwind utilities via PostCSS. The built stylesheet is `dist/styles.css` (generated from `styles.css`). See `package.json` scripts: `npm run build` and `npm run watch`.
- Small shared JS: `/js/main.js` (jQuery) contains the mobile nav toggle and small UX helpers. Keep using it unless migrating intentionally.
- Assets: `images/` contains photos used by pages.

Key project conventions (do not change without reason)
- Mobile-first Tailwind utilities: classes target small screens by default and use `sm:`, `md:`, `lg:` breakpoints for larger sizes.
- Component patterns to follow:
  - Nav: buttons use `id="nav-toggle"` and `id="nav-menu"` and rely on `aria-controls`/`aria-expanded`. Don't remove these attributes.
  - Product cards: image wrapper (`div`) + image uses `object-cover` and either a fixed wrapper height (h-56 sm:h-64 md:h-72) or aspect helpers (aspect-[3/2], sm:aspect-[4/3]) so cards stay uniform.
  - Sidebar/order summary: use `self-start` on the `<aside>` and `lg:sticky lg:top-24` to avoid stretching and keep sticky behaviour.
  - Controls: small-screen stacking uses `flex flex-col gap-4 sm:flex-row` and `flex-shrink-0` where needed to avoid clamping.

Build & developer workflow
- Install deps: `npm install` (project uses PostCSS + Tailwind v4 via CLI). Then build:

  ```powershell
  npm run build
  # or for live development
  npm run watch
  ```

- When you add or change Tailwind utility classes in HTML, re-run `npm run build` so the new classes appear in `dist/styles.css`.
- There are no unit tests or automated linters configured beyond Prettier devDeps. Validate changes by opening the HTML files in a browser.

Integration notes & gotchas
- The site uses jQuery for the mobile nav toggle in `js/main.js`. If you prefer modernizing, do it in a separate change and keep the existing behaviour until verified.
- Image handling:
  - Many templates use `object-cover` and responsive wrappers; prefer changing wrapper classes (aspect or responsive h- classes) over inline CSS.
  - Add `loading="lazy"` and `srcset` when adding new large images.
- Avoid adding global CSS files; the project relies on Tailwind utilities. If you must add CSS, keep it minimal and update the PostCSS pipeline.

Where to look when editing
- `home.html` — hero + featured products grid (pattern for responsive grids).
- `products.html` — filter sidebar, product-grid, control-bar patterns (good examples of sidebar `self-start` and control stacking).
- `about.html` — split-card story/image pattern and social icons (recent edits show aspect wrappers).
- `cart.html` — mobile-first cart list and sticky order-summary pattern.
- `js/main.js` — nav toggle and small UX helpers.
- `styles.css` & `dist/styles.css` — input and built CSS.

Common small tasks examples (explicit)
- To add a new social icon next to existing ones: copy the anchor pattern in `about.html` (inline SVG, `inline-flex h-10 w-10 rounded-full border ... hover:scale-110`) to match hover/shadow behaviour.
- To make a product card uniform: wrap the `<img>` in a fixed wrapper (e.g. `div class="relative h-56 sm:h-64 md:h-72 overflow-hidden"`) and set `<img class="w-full h-full object-cover">`.
- To keep a sidebar from stretching: ensure the aside uses `self-start` and `lg:sticky lg:top-24` for large screens.

If you modify layout classes, always run `npm run build` and visually verify the page in a browser. If a change requires JS behaviour changes (nav, quantity controls), keep the old behaviour working until the new code is tested.

If anything above looks out-of-date, point me to the exact file and I will merge updates accordingly.

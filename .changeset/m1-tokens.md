---
"vue-ecosphere": minor
"@ecosphere/tokens": minor
---

M1 — Token Pipeline

- **New package `@ecosphere/tokens`** built via Style Dictionary v4: ships
  `tokens.css`, `tokens.dark.css`, `tokens.scss`, `tokens.d.ts`, `tokens.js`,
  `tokens.cjs`, and `tailwind.preset.cjs`. Three-tier hierarchy
  (primitive → semantic → component) with the `--ep-*` prefix convention.
- **`vue-ecosphere`** now consumes the token pipeline. The lib's bundled CSS
  inlines `--ep-*` custom properties and re-aliases legacy `--color-*` and
  `--font-*` vars to the new tokens for full backwards compatibility — no
  existing component SCSS changes were required.
- **New `<EpConfigProvider>` component** establishes a runtime config contract
  for `theme` (`light` | `dark` | `auto` | `invert`), `size`, and `locale` via
  `provide`/`inject` (`EpConfigKey`). When `theme="auto"` it sets
  `data-theme="auto"` on `<html>` and live-reacts to
  `prefers-color-scheme: dark` via a `matchMedia` listener that is torn down on
  unmount.
- **Theme helpers refactored**: `setTheme()` now sets `data-theme` on `<html>`
  (while still toggling the legacy `body.ecosphere-dark` class), and
  `setColors()` / `setFonts()` are deprecated with a `console.warn` — consumers
  should override `--ep-color-*` / `--ep-font-family-*` CSS variables on
  `:root` (or per-subtree via `<EpConfigProvider>`) instead.
- Inter (default `--ep-font-family-base`) is an **opt-in font load**: consumers
  install `@fontsource-variable/inter` and call
  `import "@fontsource-variable/inter"` once at app entry. Opt-out by
  overriding `--ep-font-family-base`.

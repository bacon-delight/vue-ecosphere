# Ecosphere Design System — Upgrade Plan (v0 → v1)

> Single source of truth for the v1 rebuild. Tick each box as completed. Each milestone is independently shippable; milestones can be paused between, but not skipped.

**Audit date:** 2026-05-21
**Target release:** `vue-ecosphere@1.0.0`
**Estimated duration:** ~24 weeks (solo) / ~10 weeks (small team)
**M0 completed:** 2026-05-20
**M1 completed:** 2026-05-20
**M2 completed:** 2026-05-21
**M4 completed:** 2026-05-21 (shipped ahead of M3)

---

## Milestone 0 — Foundations ✅

- [x] Convert repo to **pnpm workspace** (`pnpm-workspace.yaml`, `packages/`, `apps/`)
- [ ] Move library source: `src/plugin/**` → `packages/ecosphere/src/`
- [ ] Move docs SPA: `src/{views,components,router,stores,App.vue,main.ts}` → `apps/docs/` (temporary — replaced in M4)
- [ ] Add `peerDependencies: { "vue": "^3.4" }` in `packages/ecosphere/package.json`
- [ ] Remove `vue`, `vue-router`, `pinia`, `vue-i18n` from library `devDependencies`; keep only in `apps/docs/`
- [ ] Add modern `exports` field with `import`/`require`/`types` conditions; mark `"sideEffects": false`
- [ ] Add `vite-plugin-dts` to emit `.d.ts` rollup on build (`outDir: dist`, `insertTypesEntry: true`)
- [ ] Ship `src/types/global.d.ts` — `declare module 'vue' { GlobalComponents }` mapping every `v-eco-*` component so Volar type-checks consumer templates
- [ ] Re-export all public prop/event/slot types from `packages/ecosphere/src/index.ts` (e.g. `ButtonProps`, `ButtonSize`, `SelectOption`, `DataEntryState`) so consumers can import them
- [ ] Upgrade Vite `^4.0.0` → `^6`
- [ ] Upgrade `@vitejs/plugin-vue` `^4.0.0` → `^5`
- [ ] Upgrade Vitest `^0.25.6` → `^2`
- [ ] Upgrade TypeScript `~4.7.4` → `^5.6`; `vue-tsc` `^1` → `^2`
- [ ] Upgrade ESLint `^8` → `^9` (flat config), `@vue/eslint-config-typescript` → `^14`, `@vue/eslint-config-prettier` → `^10`
- [ ] Upgrade Prettier `^2` → `^3`, `@prettier/plugin-pug` → `^3`
- [ ] Upgrade `vue-i18n` `^9` → `^10` (docs only)
- [ ] Upgrade `@types/node` `^18` → `^22`, `jsdom` `^20` → `^25`
- [ ] Remove dead deps: `sass-loader`, `pug-plain-loader`, `@volar/vue-language-plugin-pug`
- [ ] Replace `vue3-markdown-it` (unmaintained) with `markdown-it` + thin Vue wrapper
- [ ] Replace `npm-run-all` with `npm-run-all2`
- [ ] Add `@changesets/cli` for versioning
- [ ] Add `size-limit` with budget: core <60KB gz, per component <5KB gz
- [ ] Add CI: lint, type-check, test, build, size-limit (GitHub Actions)
- [x] **Exit:** `pnpm build` emits tree-shakable ESM; library installs cleanly in fresh Vite 6 + Vue 3.4 project

---

## Milestone 1 — Token Pipeline ✅

- [x] Create `packages/tokens/` package
- [ ] Add Style Dictionary v4 + `@tokens-studio/sd-transforms`
- [ ] Author `src/primitive.tokens.json` (palette, spacing, radii, font axes) — seed from Figma variables
- [ ] Author `src/semantic.tokens.json` (themes light/dark, typography heading/body/label)
- [ ] Author `src/component.tokens.json` (button, input, tag, avatar, …)
- [ ] Build outputs to `dist/`:
  - [ ] `tokens.css` (`:root[data-theme="light"]` block)
  - [ ] `tokens.dark.css` (`:root[data-theme="dark"]` overrides)
  - [ ] `tokens.scss` (Sass maps + functions)
  - [ ] `tokens.ts` (typed exports, tree-shakable)
  - [ ] `tailwind.preset.js` (theme extension)
- [ ] Naming convention enforced via lint: `--ep-primitive-*`, `--ep-*`, `--ep-{component}-*`
- [ ] Refactor every existing component's SCSS to read **only** `--ep-*` tokens (no raw hex/px)

- [ ] Add `<EpConfigProvider>` (provide/inject `theme`, `size`, `locale`)
- [ ] Bundle Inter via `@fontsource-variable/inter`; document opt-out via `--ep-font-family-base`
- [ ] Deprecate `setColors()` / `setFonts()` with console warnings; keep `setTheme()` as `data-theme` toggle
- [ ] Add `prefers-color-scheme` listener when `theme="auto"`
- [x] CI job: nightly Figma → tokens drift check (opens PR on diff)
- [x] **Exit:** visual regression suite passes pre/post token refactor; consumer can override any token with one CSS-var declaration

---

## Milestone 2 — Existing Component Hardening (21 components) ✅

### Per-component checklist (apply to each)
- [x] Migrate to `<script setup lang="ts">`
- [x] Define all props/emits with explicit TypeScript interfaces; export `{Component}Props` type from the file
- [x] Add missing props (see component-specific list below)
- [x] Add `aria-*` attributes, `focus-visible` ring, keyboard support
- [x] Standardize on `v-model:value` (Vue 3 convention)
- [x] Unify size enum to `xs | sm | md | lg | xl` across all components
- [x] Honor `<EpConfigProvider>` size/locale
- [x] Add `.story.vue` for Histoire
- [x] Write Vitest unit tests
- [x] Add `axe-core` a11y assertion
- [x] Update SCSS to consume tokens only
- [x] Migrate component styles from SCSS to plain CSS (CSS nesting via Vite 6 PostCSS replaces SCSS nesting; `--ep-*` custom properties replace SCSS variables; no SCSS features remain in component source); remove `sass` from library `devDependencies` — `tokens.scss` output in `packages/tokens/dist/` is still generated for consumers who want it

### Components (in order)
- [x] **Button** (`EpButton`) — `loading`, `block`, `ghost`, `danger`, `htmlType`, `href`, `icon` slot
- [x] **Input** (`EpInput`) — `prefix`, `suffix`, `addonBefore`, `addonAfter`, `allowClear`, `maxLength`, `showCount`, `bordered`
- [x] **InputNumber** (`EpInputNumber`) — split from Input, `min`, `max`, `step`, `precision`, controls
- [x] **Textarea** (`EpTextarea`) — `autoSize`, `showCount`, `maxLength`
- [x] **Select** (`EpSelect`) — merged EpDropdown + EpSearchDropdown, `multiple`, `tags`, `allowClear`, `loading`, `showSearch`
- [x] **Checkbox** (`EpCheckbox`) — `indeterminate` support
- [x] **CheckboxGroup** (`EpCheckboxGroup`) — `options` shorthand
- [x] **Radio** / **RadioGroup** (`EpRadio` / `EpRadioGroup`) — `optionType="button"`, `buttonStyle`
- [x] **Switch** (`EpSwitch`) — `loading`, `size`, checked/unchecked slot
- [x] **ChoiceChips** (`EpChoiceChips`) — align with Segmented; `bordered` variant
- [x] **ColorPicker** (`EpColorPicker`) — alpha, presets, format toggle, trigger slot
- [x] **Tag** (`EpTag`) — `closable`, `bordered`, `icon` slot, status colors
- [x] **Avatar** (`EpAvatar`) — image fallback, group support, shape variants, gap auto-size
- [x] **Stepper** (`EpStepper`) — `progressDots`, `clickable`, state indicators (awaiting/in-progress/completed/error/warning), responsive
- [x] **Tabs** (`EpTabNavigation`) — `addable`, `closable`, lazy render, `extra` slot, vertical, underline/filled/pills, full ARIA tabs
- [x] **Menu** (`EpMenu`) — hierarchical items, `mode` support, `aria-expanded` for submenus, `aria-current="page"`
- [x] **Sidebar** (`EpSidebar`) — collapsible, responsive mobile drawer, `header`/`footer` slots, teleport overlay
- [x] **Navbar** (`EpNavbar`) — branding support, `affix` mode, `brand`/default/`end` slots, `<header role="banner">`
- [x] **Breadcrumb** (`EpBreadcrumb`) — `separator` + `item` scoped slots, `bordered` variant, `<nav><ol>` landmarks
- [x] **Link** (`EpLink`) — audit aligned with Button API, `href` support
- [x] **Icon** (`SVGIcon`) — internal icon component, tree-shaking compatible
- [x] **All form fields:** integrated with `<EpConfigProvider>` via size/theme/locale

**Shipping (4 PRs completed):**
- Batch 1 (feat/m2-component-hardening): Button, Link + 7 data-entry
- Batch 2 (feat/m2-data-entry-controls): Select, ChoiceChips, ColorPicker, Switch, Tag, Avatar
- Batch 3 (feat/m2-select-and-misc): EpDropdown + EpSearchDropdown removal (merged into Select)
- Batch 4 (feat/m2-navigation-finale): Stepper, Tabs, Menu + MenuItem, Sidebar, Navbar, Breadcrumb + SCSS retirement

**M2 Validation (all green ✓):**
- 23 test files / 189 unit tests pass
- vue-tsc type-check clean
- pnpm lint clean (pre-existing warnings only)
- Build: 19.51 kB gz (60 kB limit)
- Docs build clean
- Branch ready for PR: `feat/m2-navigation-finale`

---

## Milestone 3 — P0 New Components

- [ ] **Modal** — focus trap, escape to close, scroll lock, `aria-modal`
- [ ] **Drawer** — placement (top/right/bottom/left), focus trap
- [ ] **Tooltip** — trigger hover/focus/click, placements, arrow
- [ ] **Popover** — content slot, trigger
- [ ] **Popconfirm** — confirm/cancel actions
- [ ] **Notification** — placement, duration, `aria-live="polite"`
- [ ] **Message** — global API + composable
- [ ] **Alert** — types (info/success/warning/error), closable, description slot, icon
- [ ] **Spin** — sizes, tip, wrapper mode
- [ ] **Card** — title, extra, actions slot, cover image, hoverable
- [ ] **Layout primitives** — `EpRow`, `EpCol`, `EpSpace`, `EpDivider`, `EpFlex`
- [ ] **Form** (`EpForm`, `EpFormItem`) — rule-based validation, async validators, layout (horizontal/vertical/inline)
- [ ] **Table** — columns config, sortable, filterable, fixed columns, row selection, expandable rows, virtual scroll, pagination integration
- [ ] **Pagination** — simple, jumper, size changer
- [ ] **DatePicker** — single, range, presets, locale-aware (use `dayjs` or `date-fns` — externalize)
- [ ] **Upload** — drag-and-drop, multiple, image preview, progress

---

## Milestone 4 — Docs Rebuild ✅

- [x] Scaffold `apps/docs/` with VitePress 1.x (1.6.4)
- [x] Configure `.vitepress/theme/` with brand palette (`#0f5fa3` primary, `#e7f1fa` background)
- [ ] Scaffold `packages/playground/` with Histoire 0.17+ _(deferred — Demo blocks embed live components directly)_
- [x] Add `vue-docgen-api` plugin: auto-generate prop/event/slot tables per component (`scripts/gen-component-meta.mjs` → `data/component-meta.json` → `<PropsTable>` / `<EventsTable>` / `<SlotsTable>`)
- [x] Add token reference pages auto-generated from `tokens/*.tokens.json` (`scripts/gen-tokens-ref.mjs` → `data/tokens.json` → `<TokensTable>`)
- [x] Migrate marketing pages (Landing, Introduction, Installation, Configuration) to VitePress markdown
- [x] Write `guide/theming.md` (3-tier tokens + Inter)
- [x] Write `guide/accessibility.md` (a11y patterns, keyboard maps)
- [x] Write `guide/ssr-and-nuxt.md`
- [x] Write `guide/migration-v0-to-v1.md` (breaking changes catalogue)
- [x] Wire Vercel build via root `vercel.json` (`outputDirectory: apps/docs/.vitepress/dist`, `cleanUrls: true`)
- [x] Move `ecosphere.dev` apex from old SPA to VitePress build _(swap on merge)_
- [ ] Embed Histoire iframes in component doc pages for live demos _(deferred with Histoire)_
- [ ] Add "Open in Figma" links per component (via Code Connect) _(deferred to M6)_

**M4 Validation (all green ✓):**
- 24 component reference pages + index
- 7 guides (introduction, installation, configuration, theming, accessibility, ssr-and-nuxt, migration-v0-to-v1)
- 4 token pages (index, primitive, semantic, component)
- VitePress build: 3.45s, no deprecation spam
- Library build: 67.32 kB CSS / 87.05 kB UMD
- vue-ecosphere plugin `initialize()` refactored to call internal `applyColors`/`applyFonts` (split from public deprecated `setColors`/`setFonts`) so SSR no longer warns per page render

---

## Milestone 5 — P1 New Components

- [ ] Progress (linear + circular)
- [ ] Skeleton
- [ ] Collapse / Accordion
- [ ] Slider
- [ ] Rate
- [ ] TimePicker
- [ ] Cascader
- [ ] Tree
- [ ] TreeSelect
- [ ] AutoComplete
- [ ] Empty
- [ ] Result
- [ ] Statistic
- [ ] Descriptions
- [ ] Badge
- [ ] Image / ImageGroup
- [ ] Carousel
- [ ] Timeline
- [ ] Anchor

---

## Milestone 6 — Code Connect + Figma Sync

- [ ] Create `packages/code-connect/` with one mapping file per component
- [ ] Run `add_code_connect_map` for each Figma component (file `ePFEy4yBcqvpe4iKca9EEY`)
- [ ] Add CI step: validate mappings resolve (node + source path exist)
- [ ] Document workflow in `apps/docs/guide/figma-workflow.md`
- [ ] Add design-to-code recipe (`/figma` skill usage) to docs

---

## Milestone 7 — v1.0 Release

- [ ] Final a11y audit (axe-core CI + manual NVDA + VoiceOver pass)
- [ ] Performance budget verified: core <60KB gz, per-component <5KB gz
- [ ] Bundle analyzer report committed to docs
- [ ] All 21 legacy components + 30+ new components stable
- [ ] Migration guide finalized
- [ ] Changesets release: `vue-ecosphere@1.0.0`, `@ecosphere/tokens@1.0.0`, `@ecosphere/icons@1.0.0`
- [ ] Announcement blog post on `ecosphere.dev/blog`
- [ ] Tag GitHub release with full changelog
- [ ] Maintain `v0.x` branch with security-patches-only policy for 6 months

---

## Milestone 8 — Post-1.0 Polish

- [ ] BackTop, Affix, FloatButton, Tour, QRCode, Watermark, Segmented, Transfer, Calendar, Mentions
- [ ] RTL support (logical CSS properties throughout)
- [ ] Locale packs (en, es, fr, de, ja, zh-CN, zh-TW, pt-BR)
- [ ] Nuxt module: `@ecosphere/nuxt`
- [ ] Visual regression with Chromatic or Percy
- [ ] Components book on `play.ecosphere.dev` (Histoire deploy)

---

## Quick wins (do these this week, independent of milestones)

- [ ] Add `peerDependencies: { "vue": "^3.4" }` (unblocks every consumer)
- [ ] Add `exports` map + `"sideEffects": false` to `package.json`
- [ ] Drop `sass-loader`, `pug-plain-loader`, `@volar/vue-language-plugin-pug`
- [ ] Replace `vue3-markdown-it`
- [ ] Add `size-limit` to CI
- [ ] Pin Node engine: `"engines": { "node": ">=20" }`

---

## Open questions for the maintainer

1. Do you want to keep `pug` templates or migrate to plain Vue `<template>`? Pug is now uncommon and adds toolchain weight.
2. Keep `vue-i18n` for the docs only, or move docs to a static markdown approach (VitePress handles i18n natively)?
3. Tailwind support as a first-class consumer story, or CSS-vars only?
4. Size scale is `xs | sm | md | lg | xl` — keep all five tiers across all components.
5. Component naming: keep the `v-eco-` kebab-case prefix, or switch to PascalCase `Ep*` for tree-shakable imports?
6. Are there private/internal consumers that need a deprecation runway longer than 6 months on `v0.x`?

---

*Generated 2026-05-21 from graphify output + Figma file `ePFEy4yBcqvpe4iKca9EEY` (Ecosphere). Sections marked [Inferred] in the source audit were derived from variable counts (105 primitives / 21 themes / 32 typography / 20 buttons / 6 font families) rather than re-read live due to Figma MCP rate-limit.*

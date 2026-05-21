# Ecosphere Design System — Upgrade Plan (v0 → v1)

> Single source of truth for the v1 rebuild. Tick each box as completed. Each milestone is independently shippable; milestones can be paused between, but not skipped.

**Audit date:** 2026-05-21
**Target release:** `vue-ecosphere@1.0.0`
**Estimated duration:** ~24 weeks (solo) / ~10 weeks (small team)

---

## Milestone 0 — Foundations

- [ ] Convert repo to **pnpm workspace** (`pnpm-workspace.yaml`, `packages/`, `apps/`)
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
- [ ] **Exit:** `pnpm build` emits tree-shakable ESM; library installs cleanly in fresh Vite 6 + Vue 3.4 project

---

## Milestone 1 — Token Pipeline

- [ ] Create `packages/tokens/` package
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
- [ ] CI job: nightly Figma → tokens drift check (opens PR on diff)
- [ ] **Exit:** visual regression suite passes pre/post token refactor; consumer can override any token with one CSS-var declaration

---

## Milestone 2 — Existing Component Hardening (21 components)

### Per-component checklist (apply to each)
- [ ] Migrate to `<script setup lang="ts">`
- [ ] Define all props/emits with explicit TypeScript interfaces; export `{Component}Props` type from the file
- [ ] Add missing props (see component-specific list below)
- [ ] Add `aria-*` attributes, `focus-visible` ring, keyboard support
- [ ] Standardize on `v-model:value` (Vue 3 convention)
- [ ] Unify size enum to `small | middle | large` (warn on legacy)
- [ ] Honor `<EpConfigProvider>` size/locale
- [ ] Add `.story.vue` for Histoire
- [ ] Write Vitest unit tests
- [ ] Add `axe-core` a11y assertion
- [ ] Update SCSS to consume tokens only

### Components (in order)
- [ ] **Button** (`v-eco-button`) — add `loading`, `block`, `ghost`, `danger`, `htmlType`, `href`, `icon` slot
- [ ] **Input** (`v-eco-input`) — add `prefix`, `suffix`, `addonBefore`, `addonAfter`, `allowClear`, `maxLength`, `showCount`, `bordered`
- [ ] **InputNumber** (new — split from `v-eco-input type="number"`) — add `min`, `max`, `step`, `precision`, controls
- [ ] **Textarea** (`v-eco-textarea`) — add `autoSize`, `showCount`, `maxLength`
- [ ] **Select** (`v-eco-dropdown` + `v-eco-search-dropdown` merged) — add `multiple`, `tags`, `allowClear`, `loading`, `showSearch`, virtual scroll
- [ ] **Checkbox** (`v-eco-checkbox`) — add `indeterminate`
- [ ] **CheckboxGroup** — add `options` shorthand
- [ ] **Radio / RadioGroup** — add `optionType="button"`, `buttonStyle`
- [ ] **Switch** (`v-eco-switch`) — add `loading`, `size`, checked/unchecked slot
- [ ] **ChoiceChips** — align with Segmented; consider deprecation in favor of `v-eco-segmented`
- [ ] **ColorPicker** — add alpha, presets, format toggle, trigger slot
- [ ] **Tag** (`v-eco-tag`) — add `closable`, `bordered`, `icon` slot, status colors
- [ ] **Avatar** (`v-eco-avatar`) — add image fallback, group, shape, gap auto-size
- [ ] **Stepper** (`v-eco-stepper`) — add `progressDot`, `clickable`, per-step `percent`, responsive
- [ ] **Tabs** (`v-eco-tab-navigation`) — add `addable`, `closable`, lazy render, `tabBarExtraContent`, vertical
- [ ] **Menu** (`v-eco-menu`) — add `mode="horizontal"`, `inlineCollapsed`, controlled `selectedKeys`/`openKeys`
- [ ] **Sidebar** (`v-eco-sidebar`) — add collapsible, theme dark/light, footer slot, mobile breakpoint
- [ ] **Navbar** (`v-eco-navbar`) — add mobile drawer, right slot, sticky/affix mode
- [ ] **Breadcrumb** (`v-eco-breadcrumb`) — add separator slot, dropdown per item, route auto-bind
- [ ] **Link** (`v-eco-link`) — audit and align with Button api where applicable
- [ ] **Icon** (`v-eco-icon`) — add spin, rotate, two-tone, icon registry
- [ ] **All form fields:** integrate with future `<EpForm>` via `valuePropName`/`trigger` contract

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

## Milestone 4 — Docs Rebuild

- [ ] Scaffold `apps/docs/` with VitePress 1.x
- [ ] Configure `.vitepress/theme/` with brand layout (Ecosphere bird, blue background `#e7f1fa`)
- [ ] Scaffold `packages/playground/` with Histoire 0.17+
- [ ] Add `vue-docgen-api` plugin: auto-generate prop/event/slot tables per component
- [ ] Add token reference pages auto-generated from `tokens/*.tokens.json`
- [ ] Migrate marketing pages (Landing, Introduction, Installation, Configuration, Types) to VitePress markdown
- [ ] Write `guide/theming.md` (3-tier tokens + Inter)
- [ ] Write `guide/accessibility.md` (a11y patterns, keyboard maps)
- [ ] Write `guide/ssr-and-nuxt.md`
- [ ] Write `guide/migration-v0-to-v1.md` (breaking changes catalogue)
- [ ] Wire Vercel preview deploys per PR
- [ ] Move `ecosphere.dev` apex from old SPA to VitePress build
- [ ] Embed Histoire iframes in component doc pages for live demos
- [ ] Add "Open in Figma" links per component (via Code Connect)

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
4. Acceptable to drop `xs` and `xl` sizes from Button (consolidating to AntD's `small | middle | large`)?
5. Component naming: keep the `v-eco-` kebab-case prefix, or switch to PascalCase `Ep*` for tree-shakable imports?
6. Are there private/internal consumers that need a deprecation runway longer than 6 months on `v0.x`?

---

*Generated 2026-05-21 from graphify output + Figma file `ePFEy4yBcqvpe4iKca9EEY` (Ecosphere). Sections marked [Inferred] in the source audit were derived from variable counts (105 primitives / 21 themes / 32 typography / 20 buttons / 6 font families) rather than re-read live due to Figma MCP rate-limit.*

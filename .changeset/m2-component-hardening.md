---
"vue-ecosphere": major
---

M2 Component Hardening — full milestone, breaking changes across all components.

The M2 milestone rewrites the design system's component layer on top of the
M0 + M1 foundations. Every component now ships with: strict TypeScript prop
types, ARIA-first markup, full keyboard navigation, axe-core verified
accessibility, plain-CSS using `--ep-*` tokens (no SCSS), unified sizing
(`xs|sm|md|lg|xl`), and unified `EpHue` palette.

### Breaking changes (consolidated)

- **v-model rename**: every form / interactive component now uses
  `v-model:value` instead of `v-model:modelValue`. Affected: `EpInput`,
  `EpInputNumber`, `EpTextarea`, `EpSelect`, `EpRadio`, `EpRadioGroup`,
  `EpCheckbox`, `EpCheckboxGroup`, `EpSwitch`, `EpChoiceChips`, `EpColorPicker`,
  `EpTabNavigation`, `EpStepper`, `EpSidebar` (collapsed).
- **`EpDropdown` and `EpSearchDropdown` removed**. Use `EpSelect` instead:
  it supports single + multiple selection, searchable filtering, prepend /
  append slots, and primitive (string/number/boolean) options.
- **Stepper**: `current` prop renamed to `value` (now v-model-able);
  `responsive` defaults to `true`; new `clickable`, `progressDots`, `state`
  props; emits `change` alongside `update:value`.
- **Breadcrumb**: `options` prop renamed to `items`; `outline` prop renamed
  to `bordered`; emits a typed `select` event; supports `separator` and
  `item` scoped slots; uses proper `<nav><ol>` landmark semantics.
- **Tag, ChoiceChips**: `outline` prop renamed to `bordered`.
- **Tabs**: `EpTabNavigation` now uses `value` (v-model) instead of
  `active`; new `variant: "underline" | "filled" | "pills"`, `closable`,
  `addable`, `lazy`, `vertical` props; emits `add` and `close` events;
  arrow-key / Home / End keyboard navigation following the WAI-ARIA tabs
  pattern.
- **Menu, Sidebar**: rewritten on the new `MenuItem` primitive (proper
  `role="menu"` + `role="menuitem"`, `aria-expanded` for submenus,
  `aria-current="page"` for active items). `EpSidebar` now supports
  `collapsible`, `responsive` (mobile drawer via `<Teleport>`), `header` +
  `footer` slots, and `v-model:collapsed`.
- **Navbar**: `EpNavbar` now uses `<header role="banner">` + `<nav>`
  landmarks; new `branding`, `affix`, `bordered`, `hue`, `theme` props;
  three slots (`brand`, default centre area, `end`).
- **Sizing**: `EpSize` is unified to `"xs" | "sm" | "md" | "lg" | "xl"`
  everywhere; pass `size` directly or fall back to `useEpConfig().size`.
- **Hue**: `EpHue` is unified to `primary | primary-variant | secondary |
  secondary-variant | error | success | warning | information`; legacy
  per-component palette tokens were removed.

### Internal

- `sass` removed from `vue-ecosphere`'s devDependencies. The package's
  SFCs no longer use `<style lang="scss">`; all styling is plain CSS over
  design tokens. (`apps/docs` keeps its own `sass` dep transitionally.)
- `framework.scss` is no longer exported by the package (`./styles/framework.scss`
  exports entry removed). The legacy SCSS partials remain in source for
  the docs SPA's transitional usage only.
- The `**/*.scss` entry was removed from the package's `sideEffects` list.
- New shared test helper `expectNoA11yViolations()` ships axe-core based
  a11y assertions used by 23 component spec files (189 unit tests total).

### Migration

```diff
- <EpDropdown v-model:modelValue="value" :options="opts" />
+ <EpSelect v-model:value="value" :options="opts" />

- <EpBreadcrumb :options="trail" outline />
+ <EpBreadcrumb :items="trail" bordered />

- <EpStepper :current="n" :steps="steps" />
+ <EpStepper v-model:value="n" :steps="steps" />

- <EpTabNavigation :active="t" :options="opts" />
+ <EpTabNavigation v-model:value="t" :options="opts" />

- <EpTag outline>...
+ <EpTag bordered>...
```

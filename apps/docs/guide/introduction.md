# Introduction

**Vue Ecosphere** is a Vue 3 component library focused on three things:

1. **Tokens, not magic.** Every color, radius, spacing value, and shadow is a `--ep-*` CSS custom property. There are no Sass mixins, no theme objects, no `$primary` variables hiding in a deep import. If you can change a CSS variable, you can theme the library.
2. **Accessibility as a default.** Each component ships with ARIA roles, keyboard handlers, focus management, and a passing axe-core test. We treat broken accessibility the same way we treat a broken build.
3. **Explicit, modern Vue.** Single-file components, `<script setup>`, `v-model:value`, no global event bus, no implicit context. The shape of an `<EpInput>` is the shape of its props — nothing more.

## What's in the box

- **24 components** across call-to-action, data entry, navigation, miscellaneous, and general utilities.
- **A token pipeline** (`@ecosphere/tokens`) that produces CSS, SCSS, and TypeScript outputs from a single JSON source of truth.
- **A Vue plugin** that registers every `Ep*` component globally and exposes an `<EpConfigProvider>` for size, hue, and locale defaults.
- **TypeScript types** for every prop, event payload, and slot scope, plus `GlobalComponents` augmentation for IDE auto-completion.

## What's not in the box

- Form state managers, validation libraries, or schema engines. Use what you already have (`vee-validate`, `@formkit/core`, etc.).
- Icon sets. `<EpIcon>` accepts any SVG; bring your own.
- Style frameworks. There is no Tailwind dependency, no Bootstrap reset, no global selector hijacking.

## Versioning

Vue Ecosphere follows [semantic versioning](https://semver.org/). The `0.1.x` line is the **v1 redesign preview** — APIs are stable, but minor releases may still introduce changes documented in the [migration guide](/guide/migration-v0-to-v1).

## Where to next?

- [Install](/guide/installation) the package and render your first button.
- [Configure](/guide/configuration) defaults via the plugin or `<EpConfigProvider>`.
- [Theme](/guide/theming) the library by overriding `--ep-*` variables.
- Browse [all components](/components/).

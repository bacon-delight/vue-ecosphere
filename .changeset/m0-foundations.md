---
"vue-ecosphere": minor
---

Foundations: convert repo to a pnpm workspace (`packages/ecosphere` library and `apps/docs` SPA), upgrade to Vite 6 / Vitest 2 / TypeScript 5.6 / ESLint 9 flat config / Prettier 3, remove `vue-i18n`, switch the docs `MarkdownParser` to `markdown-it`, and add `Ep*` PascalCase component exports plus a `GlobalComponents` type augmentation. Adds `@changesets/cli`, `size-limit` (60 kB gz budget) and a CI workflow running lint, type-check, build, test and size.

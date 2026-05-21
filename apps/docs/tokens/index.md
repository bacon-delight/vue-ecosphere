# Design Tokens

Vue Ecosphere ships every visual decision as a CSS custom property prefixed `--ep-*`. The tokens live in [`packages/tokens`](https://github.com/bacon-delight/vue-ecosphere/tree/main/packages/tokens) and are generated from JSON via Style Dictionary.

## Three layers

```
Primitive ──► Semantic ──► Component
```

- **Primitive** — raw values: hex colors, px sizes, font weights. No semantics.
- **Semantic** — role aliases (`text`, `background`, `primary-500`) that reference primitives.
- **Component** — component-scoped (`button-radius`, `input-bg`) that reference semantics.

Override at any layer; the cascade does the work. See [Theming](/guide/theming) for examples.

## Browse the tokens

- [Primitive tokens](/tokens/primitive)
- [Semantic tokens](/tokens/semantic)
- [Component tokens](/tokens/component)

## Bundle outputs

The `@ecosphere/tokens` package produces:

- `dist/tokens.css` — `:root { --ep-*: …; }` declarations.
- `dist/tokens.dark.css` — dark-mode overrides under `:root.dark`.
- `dist/tokens.scss` — SCSS variables (legacy, still available for downstream consumers).
- `dist/tokens.ts` / `dist/tokens.js` — typed JS exports for runtime access.

The library imports the CSS variants automatically when you `import "vue-ecosphere/styles"`.

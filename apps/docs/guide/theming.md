# Theming

Every visual decision in Vue Ecosphere is expressed as a `--ep-*` CSS custom property. To theme the library, you override those variables — at `:root`, on a specific subtree, or on the `<html>` element when toggling dark mode.

## How tokens flow

```
primitive.tokens.json   ← raw values (hex, px)
        │
        ▼
semantic.tokens.json    ← role-based aliases (text, background, primary-500)
        │
        ▼
component.tokens.json   ← component-scoped (button-radius, input-bg)
        │
        ▼
   --ep-* CSS vars
```

You can override at any layer; component tokens take precedence over semantic, which take precedence over primitive.

## Light theme override

```css
:root {
	--ep-color-primary-500: #6750a4; /* Material You purple */
	--ep-color-primary-600: #523f8e;
	--ep-radius-base: 12px;
}
```

That's it. Every button, switch, focus ring, and active tab inherits the new accent.

## Dark theme

The library ships a dark token set under `vue-ecosphere/styles`. Toggle it with a class:

```ts
document.documentElement.classList.toggle("dark");
```

```css
/* Already shipped — no work required. */
:root.dark {
	--ep-color-background: #0d1620;
	--ep-color-text: #e7f1fa;
	/* ...and so on */
}
```

For SSR, set the class server-side based on a cookie or `prefers-color-scheme` header to avoid flash.

## Scoped themes

Drop tokens onto any container and the cascade does the rest:

```vue
<template>
	<section class="brand-island">
		<EpButton label="Save" hue="primary" />
	</section>
</template>

<style scoped>
.brand-island {
	--ep-color-primary-500: #ff6b35;
	--ep-radius-base: 999px;
}
</style>
```

## Token reference

- [Primitive tokens](/tokens/primitive) — raw color, spacing, and radius values.
- [Semantic tokens](/tokens/semantic) — role aliases (`text`, `background`, `primary`, etc.).
- [Component tokens](/tokens/component) — per-component overrides.

## Building your own brand

The full pipeline lives in [`packages/tokens`](https://github.com/bacon-delight/vue-ecosphere/tree/main/packages/tokens). Fork the repo, edit the JSON, run `pnpm --filter @ecosphere/tokens build`, and consume the generated CSS instead of the default stylesheet.

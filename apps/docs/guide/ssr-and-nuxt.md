# SSR & Nuxt

Vue Ecosphere is **SSR-safe**: no component touches `window`, `document`, or `localStorage` at module scope. The package can be imported and rendered on the server without guards.

## Nuxt 3

Create a plugin:

```ts
// plugins/ecosphere.ts
import Ecosphere from "vue-ecosphere";
import "vue-ecosphere/styles";

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(Ecosphere, {
		size: "md",
		hue: "primary",
	});
});
```

Add the package to `transpile` if you're on an older bundler:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
	build: {
		transpile: ["vue-ecosphere"],
	},
});
```

## Avoiding hydration flash

The library reads `--ep-*` variables from CSS, so theme color is correct on the first paint. For **dark mode** specifically, the `dark` class needs to be on `<html>` before hydration. The simplest pattern:

```ts
// app.vue
useHead({
	htmlAttrs: { class: () => (isDark.value ? "dark" : "") },
});
```

For cookie-driven preference, set it in a middleware so the SSR'd HTML already has the right class.

## Vite / Vitest

For unit tests that mount components, use `jsdom`:

```ts
// vitest.config.ts
export default defineConfig({
	test: {
		environment: "jsdom",
	},
});
```

The library's own test suite uses `jsdom` 25 + `@vue/test-utils` 2.4 and runs without polyfills.

## Astro

Use the Vue integration:

```ts
import vue from "@astrojs/vue";
export default defineConfig({ integrations: [vue()] });
```

Then in a `.astro` or `.vue` island, import from `vue-ecosphere` as usual. Stylesheet must be imported once in your layout.

## Common pitfalls

- **Forgetting `import "vue-ecosphere/styles"`** — components render but look unstyled. The stylesheet is not auto-injected.
- **Conditional theme class on `<body>` instead of `<html>`** — the `:root.dark` selector targets `<html>`; mismatched targets break dark mode.
- **`window.matchMedia` at setup time** — never do this in your own wrapper; use `onMounted` or a `useMediaQuery` composable.

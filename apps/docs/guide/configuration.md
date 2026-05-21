# Configuration

Vue Ecosphere exposes two ways to set defaults: a **global plugin option** and a **scoped `<EpConfigProvider>`** component. They share the same shape, and the provider always wins inside its subtree.

## Global defaults (plugin options)

```ts
import { createApp } from "vue";
import App from "./App.vue";
import Ecosphere from "vue-ecosphere";
import "vue-ecosphere/styles";

createApp(App)
	.use(Ecosphere, {
		size: "md",          // "xs" | "sm" | "md" | "lg" | "xl"
		hue: "primary",      // EpHue (see below)
		locale: "en-US",
	})
	.mount("#app");
```

Anything you set here becomes the default value of the corresponding prop on every `Ep*` component. Components still accept explicit overrides.

## Scoped defaults (`<EpConfigProvider>`)

When part of your app needs different defaults — for example, a marketing surface that uses larger inputs — wrap it in a provider:

```vue
<template>
	<EpConfigProvider :size="'lg'" :hue="'accent'">
		<HeroForm />
	</EpConfigProvider>
</template>
```

Providers nest. The deepest one wins.

## EpHue palette

The library's color contract is **eight hues**, each backed by semantic tokens:

| Hue | Use case |
| --- | --- |
| `primary` | Default action color |
| `accent` | Secondary brand color |
| `neutral` | Greyscale / muted controls |
| `info` | Informational status |
| `success` | Positive status |
| `warning` | Cautionary status |
| `danger` | Destructive / error |
| `system` | OS-level interactions |

Hues are exposed as `--ep-color-{hue}-{role}` tokens. See [Theming](/guide/theming).

## EpSize scale

| Token | px (default) | Notes |
| --- | --- | --- |
| `xs` | 24 | Inline / dense |
| `sm` | 32 | Sidebar controls |
| `md` | 40 | Default |
| `lg` | 48 | Hero forms |
| `xl` | 56 | Display |

Size affects height, font-size, and padding — never spacing between components.

## Reading config in your own components

```ts
import { useEpConfig } from "vue-ecosphere";

const config = useEpConfig();
// config.size.value, config.hue.value, config.locale.value
```

The composable returns reactive refs so your component re-renders when defaults change.

# Installation

## Requirements

- **Vue** `^3.4`
- **Node** `>=20` (for tooling — the runtime has no Node requirement)
- A bundler that handles ESM and CSS imports (Vite, Webpack 5, Rspack, etc.)

## Install

::: code-group

```bash [pnpm]
pnpm add vue-ecosphere
```

```bash [npm]
npm install vue-ecosphere
```

```bash [yarn]
yarn add vue-ecosphere
```

:::

## Register as a plugin

```ts
// main.ts
import { createApp } from "vue";
import App from "./App.vue";

import Ecosphere from "vue-ecosphere";
import "vue-ecosphere/styles";

createApp(App).use(Ecosphere).mount("#app");
```

This registers every component globally as `<EpButton>`, `<EpInput>`, etc., and applies the default `--ep-*` tokens to `:root`.

## Or import on demand

If you'd rather tree-shake, skip the plugin and import components directly:

```vue
<script setup lang="ts">
import { EpButton, EpInput } from "vue-ecosphere";
import "vue-ecosphere/styles";
</script>

<template>
	<EpInput v-model:value="name" label="Name" />
	<EpButton label="Submit" hue="primary" />
</template>
```

The stylesheet is the same in both modes; you only need to import it once in your app.

## TypeScript

Types are bundled. If you use the global plugin, the package augments `vue`'s `GlobalComponents` interface so every `Ep*` component appears in your template's IntelliSense — no extra setup required.

## Next steps

- Set library-wide defaults: [Configuration](/guide/configuration).
- Make it your own: [Theming](/guide/theming).
- Ship to Nuxt: [SSR & Nuxt](/guide/ssr-and-nuxt).

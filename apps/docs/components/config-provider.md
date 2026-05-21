# ConfigProvider

Provides scoped defaults for `size`, `hue`, `locale`, and `theme` to its children. Nest providers freely; the deepest one wins.

## Usage

```vue
<template>
	<EpConfigProvider size="lg" hue="accent">
		<HeroForm />
	</EpConfigProvider>
</template>
```

Any `Ep*` component rendered inside `<HeroForm>` uses `size="lg"` and `hue="accent"` unless it overrides those props explicitly.

## Reading config in a custom component

```ts
import { useEpConfig } from "vue-ecosphere";

const config = useEpConfig();
// config.size.value, config.hue.value, config.locale.value
```

## API

### Props
<PropsTable component="EpConfigProvider" />

### Slots
<SlotsTable component="EpConfigProvider" />

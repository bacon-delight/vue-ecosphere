# ColorPicker

Pick a color from a palette + custom picker. Supports alpha, presets, and multiple output formats.

<script setup>
import { ref } from "vue";
const color = ref("#0f5fa3");
</script>

## Basic usage

<Demo>
	<EpColorPicker v-model:value="color" label="Brand color" />

<template #code>

```vue
<EpColorPicker v-model:value="color" label="Brand color" />
```

</template>
</Demo>

## With alpha

<Demo>
	<EpColorPicker v-model:value="color" :alpha="true" format="rgba" />
</Demo>

## With presets

<Demo>
	<EpColorPicker
		v-model:value="color"
		:presets="['#0f5fa3', '#ff6b35', '#46a3ff', '#71e2b2', '#ffcc1d']"
	/>
</Demo>

## API

### Props
<PropsTable component="EpColorPicker" />

### Events
<EventsTable component="EpColorPicker" />

### Slots
<SlotsTable component="EpColorPicker" />

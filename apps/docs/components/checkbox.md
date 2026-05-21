# Checkbox

Boolean (or tri-state via `indeterminate`) input.

## Basic usage

<script setup>
import { ref } from "vue";
const agree = ref(false);
const partial = ref(false);
</script>

<Demo>
	<EpCheckbox v-model:value="agree" label="I agree to the terms" />

<template #code>

```vue
<script setup>
import { ref } from "vue";
const agree = ref(false);
</script>

<template>
	<EpCheckbox v-model:value="agree" label="I agree to the terms" />
</template>
```

</template>
</Demo>

## Indeterminate

<Demo>
	<EpCheckbox v-model:value="partial" :indeterminate="true" label="Some items selected" />
</Demo>

## Sizes

<Demo>
	<EpCheckbox label="xs" size="xs" />
	<EpCheckbox label="sm" size="sm" />
	<EpCheckbox label="md" size="md" />
	<EpCheckbox label="lg" size="lg" />
	<EpCheckbox label="xl" size="xl" />
</Demo>

## Accessibility

- Renders a native `<input type="checkbox">` for full assistive-tech support.
- `aria-checked="mixed"` is applied automatically when `indeterminate`.
- `Space` toggles state.

## API

### Props
<PropsTable component="EpCheckbox" />

### Events
<EventsTable component="EpCheckbox" />

### Slots
<SlotsTable component="EpCheckbox" />

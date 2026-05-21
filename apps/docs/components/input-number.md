# InputNumber

Numeric input with stepper buttons, min/max, step, and precision.

<script setup>
import { ref } from "vue";
const count = ref(1);
const price = ref(9.99);
</script>

## Basic usage

<Demo>
	<EpInputNumber v-model:value="count" label="Quantity" :min="0" :max="99" />

<template #code>

```vue
<EpInputNumber v-model:value="count" label="Quantity" :min="0" :max="99" />
```

</template>
</Demo>

## With precision and step

<Demo>
	<EpInputNumber v-model:value="price" label="Price (USD)" :step="0.5" :precision="2" />
</Demo>

## API

### Props
<PropsTable component="EpInputNumber" />

### Events
<EventsTable component="EpInputNumber" />

### Slots
<SlotsTable component="EpInputNumber" />

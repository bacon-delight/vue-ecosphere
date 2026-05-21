# CheckboxGroup

Multi-select from a list of options. Renders a `role="group"` with a fieldset semantics.

<script setup>
import { ref } from "vue";
const selected = ref(["apple"]);
const options = [
	{ label: "Apple", value: "apple" },
	{ label: "Banana", value: "banana" },
	{ label: "Cherry", value: "cherry" },
];
</script>

## Basic usage

<Demo>
	<EpCheckboxGroup v-model:value="selected" :options="options" label="Fruit" />

<template #code>

```vue
<script setup>
import { ref } from "vue";
const selected = ref(["apple"]);
const options = [
	{ label: "Apple", value: "apple" },
	{ label: "Banana", value: "banana" },
	{ label: "Cherry", value: "cherry" },
];
</script>

<template>
	<EpCheckboxGroup v-model:value="selected" :options="options" label="Fruit" />
</template>
```

</template>
</Demo>

## Horizontal layout

<Demo>
	<EpCheckboxGroup v-model:value="selected" :options="options" label="Fruit" alignment="horizontal" />
</Demo>

## API

### Props
<PropsTable component="EpCheckboxGroup" />

### Events
<EventsTable component="EpCheckboxGroup" />

### Slots
<SlotsTable component="EpCheckboxGroup" />

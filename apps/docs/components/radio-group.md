# RadioGroup

Single-select group. Renders ARIA `radiogroup` with `Arrow` key navigation.

<script setup>
import { ref } from "vue";
const plan = ref("pro");
const options = [
	{ label: "Free", value: "free" },
	{ label: "Pro", value: "pro" },
	{ label: "Team", value: "team" },
];
</script>

## Basic usage

<Demo>
	<EpRadioGroup v-model:value="plan" :options="options" label="Plan" />

<template #code>

```vue
<EpRadioGroup v-model:value="plan" :options="options" label="Plan" />
```

</template>
</Demo>

## Button style

<Demo>
	<EpRadioGroup v-model:value="plan" :options="options" optionType="button" />
</Demo>

## API

### Props
<PropsTable component="EpRadioGroup" />

### Events
<EventsTable component="EpRadioGroup" />

### Slots
<SlotsTable component="EpRadioGroup" />

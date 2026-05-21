# ChoiceChips

Compact single- or multi-select rendered as chips. Good for filters and quick toggles.

<script setup>
import { ref } from "vue";
const single = ref("week");
const many = ref(["a"]);
const ranges = [
	{ label: "Day", value: "day" },
	{ label: "Week", value: "week" },
	{ label: "Month", value: "month" },
	{ label: "Year", value: "year" },
];
const tags = [
	{ label: "A", value: "a" },
	{ label: "B", value: "b" },
	{ label: "C", value: "c" },
];
</script>

## Single select

<Demo>
	<EpChoiceChips v-model:value="single" :options="ranges" label="Range" />

<template #code>

```vue
<EpChoiceChips v-model:value="single" :options="ranges" label="Range" />
```

</template>
</Demo>

## Multi-select

<Demo>
	<EpChoiceChips v-model:value="many" :options="tags" :multiple="true" label="Tags" />
</Demo>

## Bordered

<Demo>
	<EpChoiceChips v-model:value="single" :options="ranges" :bordered="true" />
</Demo>

## API

### Props
<PropsTable component="EpChoiceChips" />

### Events
<EventsTable component="EpChoiceChips" />

### Slots
<SlotsTable component="EpChoiceChips" />

# Tabs

Tabbed content. Supports horizontal / vertical orientation, line / card / button variants, and addable / closable tabs.

<script setup>
import { ref } from "vue";
const tab = ref("overview");
const tabs = [
	{ label: "Overview", value: "overview" },
	{ label: "Pricing", value: "pricing" },
	{ label: "FAQ", value: "faq" },
];
</script>

## Basic usage

<Demo>
	<EpTabNavigation v-model:value="tab" :options="tabs" />

<template #code>

```vue
<script setup>
import { ref } from "vue";
const tab = ref("overview");
const tabs = [
	{ label: "Overview", value: "overview" },
	{ label: "Pricing", value: "pricing" },
	{ label: "FAQ", value: "faq" },
];
</script>

<template>
	<EpTabNavigation v-model:value="tab" :options="tabs" />
</template>
```

</template>
</Demo>

## Card variant

<Demo>
	<EpTabNavigation v-model:value="tab" :options="tabs" variant="card" />
</Demo>

## Vertical

<Demo>
	<EpTabNavigation v-model:value="tab" :options="tabs" :vertical="true" />
</Demo>

## API

### Props
<PropsTable component="EpTabNavigation" />

### Events
<EventsTable component="EpTabNavigation" />

### Slots
<SlotsTable component="EpTabNavigation" />

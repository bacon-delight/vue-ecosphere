# Switch

A boolean toggle. Use when the action takes effect immediately; use [Checkbox](/components/checkbox) when the value is part of a form to be submitted.

<script setup>
import { ref } from "vue";
const on = ref(true);
const loading = ref(false);
</script>

## Basic usage

<Demo>
	<EpSwitch v-model:value="on" label="Notifications" />

<template #code>

```vue
<EpSwitch v-model:value="on" label="Notifications" />
```

</template>
</Demo>

## With labels inside

<Demo>
	<EpSwitch v-model:value="on" checkedText="On" uncheckedText="Off" />
</Demo>

## Loading

<Demo>
	<EpSwitch v-model:value="loading" loading />
</Demo>

## API

### Props
<PropsTable component="EpSwitch" />

### Events
<EventsTable component="EpSwitch" />

### Slots
<SlotsTable component="EpSwitch" />

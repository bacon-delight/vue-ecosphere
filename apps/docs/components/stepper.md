# Stepper

Multi-step progress. Supports horizontal / vertical orientation, progress dots, and clickable steps.

<script setup>
import { ref } from "vue";
const step = ref(1);
const steps = [
	{ label: "Account", description: "Sign in" },
	{ label: "Details", description: "Personal info" },
	{ label: "Confirm", description: "Review & submit" },
];
</script>

## Basic usage

<Demo>
	<EpStepper v-model:value="step" :steps="steps" />

<template #code>

```vue
<script setup>
import { ref } from "vue";
const step = ref(1);
const steps = [
	{ label: "Account", description: "Sign in" },
	{ label: "Details", description: "Personal info" },
	{ label: "Confirm", description: "Review & submit" },
];
</script>

<template>
	<EpStepper v-model:value="step" :steps="steps" />
</template>
```

</template>
</Demo>

## Vertical

<Demo>
	<EpStepper v-model:value="step" :steps="steps" orientation="vertical" />
</Demo>

## Progress dots

<Demo>
	<EpStepper v-model:value="step" :steps="steps" :progress-dots="true" />
</Demo>

## API

### Props
<PropsTable component="EpStepper" />

### Events
<EventsTable component="EpStepper" />

# Textarea

Multi-line text with optional auto-size, clear button, and character count.

<script setup>
import { ref } from "vue";
const bio = ref("");
</script>

## Basic usage

<Demo>
	<EpTextarea v-model:value="bio" label="Bio" :rows="4" placeholder="Tell us about yourself…" />

<template #code>

```vue
<EpTextarea v-model:value="bio" label="Bio" :rows="4" placeholder="…" />
```

</template>
</Demo>

## Auto-size

<Demo>
	<EpTextarea v-model:value="bio" label="Notes" :auto-size="{ minRows: 2, maxRows: 8 }" />
</Demo>

## With count

<Demo>
	<EpTextarea v-model:value="bio" label="Tweet" :show-count="true" :max-length="280" />
</Demo>

## API

### Props
<PropsTable component="EpTextarea" />

### Events
<EventsTable component="EpTextarea" />

### Slots
<SlotsTable component="EpTextarea" />

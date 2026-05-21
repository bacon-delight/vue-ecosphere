# Input

Single-line text input with addons, prefix / suffix slots, clear button, and character count.

<script setup>
import { ref } from "vue";
const name = ref("");
const url = ref("");
const search = ref("");
</script>

## Basic usage

<Demo>
	<EpInput v-model:value="name" label="Name" placeholder="Ada Lovelace" />

<template #code>

```vue
<EpInput v-model:value="name" label="Name" placeholder="Ada Lovelace" />
```

</template>
</Demo>

## With addons

<Demo>
	<EpInput v-model:value="url" label="Website" addonBefore="https://" addonAfter=".com" />

<template #code>

```vue
<EpInput
	v-model:value="url"
	label="Website"
	addonBefore="https://"
	addonAfter=".com"
/>
```

</template>
</Demo>

## Clearable + character count

<Demo>
	<EpInput
		v-model:value="search"
		label="Search"
		:allow-clear="true"
		:show-count="true"
		:max-length="50"
		placeholder="Type to search…"
	/>
</Demo>

## States

<Demo>
	<EpInput label="Default" />
	<EpInput label="Disabled" disabled />
	<EpInput label="Error" state="error" alertMessage="Required" />
	<EpInput label="Success" state="success" assistiveText="Looks good" />
</Demo>

## API

### Props
<PropsTable component="EpInput" />

### Events
<EventsTable component="EpInput" />

### Slots
<SlotsTable component="EpInput" />

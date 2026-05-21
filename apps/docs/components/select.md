# Select

Dropdown select with single / multi / tag / searchable modes. Replaces the old `EpDropdown` and `EpSearchDropdown`.

<script setup>
import { ref } from "vue";
const fruit = ref();
const fruits = ref([]);
const free = ref([]);
const options = [
	{ label: "Apple", value: "apple" },
	{ label: "Banana", value: "banana" },
	{ label: "Cherry", value: "cherry" },
	{ label: "Date", value: "date" },
	{ label: "Elderberry", value: "elderberry" },
];
</script>

## Single

<Demo>
	<EpSelect v-model:value="fruit" :options="options" label="Fruit" placeholder="Pick one" />

<template #code>

```vue
<EpSelect v-model:value="fruit" :options="options" label="Fruit" placeholder="Pick one" />
```

</template>
</Demo>

## Multiple

<Demo>
	<EpSelect v-model:value="fruits" :options="options" :multiple="true" label="Fruits" />
</Demo>

## Searchable

<Demo>
	<EpSelect v-model:value="fruit" :options="options" :show-search="true" label="Search fruit" />
</Demo>

## Tags (free-text entries)

<Demo>
	<EpSelect v-model:value="free" :options="options" :tags="true" :multiple="true" label="Tags" />
</Demo>

## API

### Props
<PropsTable component="EpSelect" />

### Events
<EventsTable component="EpSelect" />

### Slots
<SlotsTable component="EpSelect" />

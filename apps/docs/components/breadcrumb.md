# Breadcrumb

Hierarchical trail. Uses ARIA `nav` + `aria-current="page"` on the active item.

<script setup>
const items = [
	{ label: "Home", value: "home" },
	{ label: "Library", value: "library" },
	{ label: "Components", value: "components" },
	{ label: "Breadcrumb", value: "breadcrumb" },
];
</script>

## Basic usage

<Demo>
	<EpBreadcrumb :items="items" />

<template #code>

```vue
<script setup>
const items = [
	{ label: "Home", value: "home" },
	{ label: "Library", value: "library" },
	{ label: "Components", value: "components" },
	{ label: "Breadcrumb", value: "breadcrumb" },
];
</script>

<template>
	<EpBreadcrumb :items="items" />
</template>
```

</template>
</Demo>

## Bordered

<Demo>
	<EpBreadcrumb :items="items" :bordered="true" />
</Demo>

## API

### Props
<PropsTable component="EpBreadcrumb" />

### Events
<EventsTable component="EpBreadcrumb" />

### Slots
<SlotsTable component="EpBreadcrumb" />

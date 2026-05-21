# Sidebar

Vertical navigation with optional collapse and responsive behavior.

<script setup>
import { ref } from "vue";
const collapsed = ref(false);
const options = [
	{ label: "Dashboard", value: "dashboard" },
	{ label: "Projects", value: "projects" },
	{
		label: "Team",
		value: "team",
		children: [
			{ label: "Members", value: "members" },
			{ label: "Roles", value: "roles" },
		],
	},
	{ label: "Settings", value: "settings" },
];
</script>

## Basic usage

<Demo>
	<div style="display: flex; min-height: 280px; width: 100%;">
		<EpSidebar v-model:collapsed="collapsed" :options="options" :collapsible="true" />
		<div style="padding: 1rem; flex: 1;">Page content</div>
	</div>

<template #code>

```vue
<EpSidebar v-model:collapsed="collapsed" :options="options" :collapsible="true" />
```

</template>
</Demo>

## API

### Props
<PropsTable component="EpSidebar" />

### Events
<EventsTable component="EpSidebar" />

### Slots
<SlotsTable component="EpSidebar" />

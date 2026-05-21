# Menu

Horizontal or vertical menu with nested children.

<script setup>
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

## Horizontal

<Demo>
	<EpMenu :options="options" mode="horizontal" />

<template #code>

```vue
<EpMenu :options="options" mode="horizontal" />
```

</template>
</Demo>

## Vertical

<Demo>
	<EpMenu :options="options" mode="vertical" />
</Demo>

## API

### Props
<PropsTable component="EpMenu" />

### Slots
<SlotsTable component="EpMenu" />

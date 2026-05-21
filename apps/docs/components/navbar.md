# Navbar

Top app bar with branding, menu slot, and end-of-bar slot.

<script setup>
const branding = {
	logo: "/logo.png",
	label: "Vue Ecosphere",
};
</script>

## Basic usage

<Demo>
	<EpNavbar :branding="branding" />

<template #code>

```vue
<EpNavbar :branding="{ logo: '/logo.png', label: 'Vue Ecosphere' }" />
```

</template>
</Demo>

## With end slot

<Demo>
	<EpNavbar :branding="branding">
		<template #end>
			<EpButton label="Sign in" size="sm" />
		</template>
	</EpNavbar>
</Demo>

## API

### Props
<PropsTable component="EpNavbar" />

### Slots
<SlotsTable component="EpNavbar" />

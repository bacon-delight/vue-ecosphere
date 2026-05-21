# Link

A semantic anchor that can be styled to match the hue palette. Use for navigation; use [Button](/components/button) for actions.

## Basic usage

<Demo>
	<EpLink label="Documentation" href="#" />
	<EpLink label="External" href="https://github.com/bacon-delight/vue-ecosphere" target="_blank" />

<template #code>

```vue
<EpLink label="Documentation" href="/guide/introduction" />
<EpLink label="External" href="https://github.com/..." target="_blank" />
```

</template>
</Demo>

## Hues

<Demo>
	<EpLink label="Primary" href="#" hue="primary" />
	<EpLink label="Accent" href="#" hue="accent" />
	<EpLink label="Danger" href="#" hue="danger" />
	<EpLink label="Neutral" href="#" hue="neutral" />
</Demo>

## Underline modes

<Demo>
	<EpLink label="Always" href="#" underline="always" />
	<EpLink label="Hover" href="#" underline="hover" />
	<EpLink label="Never" href="#" underline="never" />
</Demo>

## API

### Props
<PropsTable component="EpLink" />

### Events
<EventsTable component="EpLink" />

### Slots
<SlotsTable component="EpLink" />

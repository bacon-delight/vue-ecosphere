# Button

A clickable action. Eight hues, five sizes, ghost and danger modes, optional loading and icon.

## Basic usage

<Demo>
	<EpButton label="Save" />
	<EpButton label="Cancel" hue="neutral" ghost />
	<EpButton label="Delete" hue="danger" />

<template #code>

```vue
<EpButton label="Save" />
<EpButton label="Cancel" hue="neutral" ghost />
<EpButton label="Delete" hue="danger" />
```

</template>
</Demo>

## Hues

<Demo>
	<EpButton label="Primary" hue="primary" />
	<EpButton label="Accent" hue="accent" />
	<EpButton label="Neutral" hue="neutral" />
	<EpButton label="Info" hue="info" />
	<EpButton label="Success" hue="success" />
	<EpButton label="Warning" hue="warning" />
	<EpButton label="Danger" hue="danger" />
	<EpButton label="System" hue="system" />
</Demo>

## Sizes

<Demo>
	<EpButton label="xs" size="xs" />
	<EpButton label="sm" size="sm" />
	<EpButton label="md" size="md" />
	<EpButton label="lg" size="lg" />
	<EpButton label="xl" size="xl" />
</Demo>

## States

<Demo>
	<EpButton label="Loading" loading />
	<EpButton label="Disabled" disabled />
	<EpButton label="Block" block />
</Demo>

## Link button

Pass an `href` to render an `<a>` styled like a button.

<Demo>
	<EpButton label="Go to GitHub" href="https://github.com/bacon-delight/vue-ecosphere" target="_blank" />

<template #code>

```vue
<EpButton
	label="Go to GitHub"
	href="https://github.com/bacon-delight/vue-ecosphere"
	target="_blank"
/>
```

</template>
</Demo>

## Accessibility

- Always has a `<button>` (or `<a>` if `href`) — never a `<div>`.
- `aria-busy` is set during `loading`.
- `disabled` removes from the tab order and prevents click handlers.

## API

### Props
<PropsTable component="EpButton" />

### Events
<EventsTable component="EpButton" />

### Slots
<SlotsTable component="EpButton" />

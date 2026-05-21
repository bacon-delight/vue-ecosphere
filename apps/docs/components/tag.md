# Tag

Compact status pill / chip. Closable, bordered, hue-aware.

## Basic usage

<Demo>
	<EpTag label="Default" />
	<EpTag label="Primary" hue="primary" />
	<EpTag label="Success" hue="success" />
	<EpTag label="Warning" hue="warning" />
	<EpTag label="Danger" hue="danger" />
</Demo>

## Bordered

<Demo>
	<EpTag label="Bordered" :bordered="true" hue="primary" />
	<EpTag label="Bordered" :bordered="true" hue="success" />
</Demo>

## Closable

<Demo>
	<EpTag label="Removable" :closable="true" hue="accent" />
</Demo>

## Sizes

<Demo>
	<EpTag label="xs" size="xs" />
	<EpTag label="sm" size="sm" />
	<EpTag label="md" size="md" />
	<EpTag label="lg" size="lg" />
</Demo>

## API

### Props
<PropsTable component="EpTag" />

### Events
<EventsTable component="EpTag" />

### Slots
<SlotsTable component="EpTag" />

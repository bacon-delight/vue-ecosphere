# AvatarGroup

Stacked avatars with overflow indicator (`+N more`).

## Basic usage

<Demo>
	<EpAvatarGroup :overflow="3">
		<EpAvatar name="Ada" />
		<EpAvatar name="Grace" />
		<EpAvatar name="Linus" />
		<EpAvatar name="Margaret" />
		<EpAvatar name="Donald" />
	</EpAvatarGroup>

<template #code>

```vue
<EpAvatarGroup :overflow="3">
	<EpAvatar name="Ada" />
	<EpAvatar name="Grace" />
	<EpAvatar name="Linus" />
	<EpAvatar name="Margaret" />
	<EpAvatar name="Donald" />
</EpAvatarGroup>
```

</template>
</Demo>

## API

### Props
<PropsTable component="EpAvatarGroup" />

### Slots
<SlotsTable component="EpAvatarGroup" />

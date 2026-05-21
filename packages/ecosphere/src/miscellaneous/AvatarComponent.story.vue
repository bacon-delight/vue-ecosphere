<script setup lang="ts">
import AvatarComponent from "./AvatarComponent.vue";
import AvatarGroup from "./AvatarGroup.vue";
</script>
<template>
	<Story title="Miscellaneous/Avatar">
		<Variant title="Initials"
			><AvatarComponent name="Ada Lovelace"
		/></Variant>
		<Variant title="Image">
			<AvatarComponent name="Ada" image="https://i.pravatar.cc/100" />
		</Variant>
		<Variant title="Group">
			<AvatarGroup :overflow="2">
				<AvatarComponent name="A B" hue="primary" />
				<AvatarComponent name="C D" hue="secondary" />
				<AvatarComponent name="E F" hue="success" />
			</AvatarGroup>
		</Variant>
	</Story>
</template>

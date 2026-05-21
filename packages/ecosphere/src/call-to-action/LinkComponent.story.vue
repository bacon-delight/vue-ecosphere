<script setup lang="ts">
import LinkComponent from "./LinkComponent.vue";
</script>
<template>
	<Story title="Call to action/Link">
		<Variant title="Default">
			<LinkComponent label="Go to docs" href="#" />
		</Variant>
		<Variant title="With icon">
			<LinkComponent label="External" href="#" icon="ri-external-link-line" />
		</Variant>
		<Variant title="Disabled">
			<LinkComponent label="Disabled" href="#" disabled />
		</Variant>
	</Story>
</template>

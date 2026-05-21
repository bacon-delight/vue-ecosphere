<script setup lang="ts">
import TagComponent from "./TagComponent.vue";
</script>
<template>
	<Story title="Miscellaneous/Tag">
		<Variant title="Default"><TagComponent label="Tag" /></Variant>
		<Variant title="Closable"
			><TagComponent label="Removable" closable
		/></Variant>
		<Variant title="Bordered"
			><TagComponent label="Bordered" bordered hue="error"
		/></Variant>
	</Story>
</template>

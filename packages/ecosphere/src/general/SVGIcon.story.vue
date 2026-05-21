<script setup lang="ts">
import SVGIcon from "./SVGIcon.vue";
</script>
<template>
	<Story title="General/Icon">
		<Variant title="Default"><SVGIcon name="ri-home-line" /></Variant>
		<Variant title="Spin"><SVGIcon name="ri-loader-line" spin /></Variant>
		<Variant title="Rotate 90"><SVGIcon name="ri-arrow-up-line" :rotate="90" /></Variant>
	</Story>
</template>

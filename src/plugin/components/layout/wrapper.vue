<template lang="pug">
.main-wrapper
	slot
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "Wrapper",
});
</script>

<style lang="scss" scoped>
.main-wrapper {
	@include occupy-full-parent;
	background: $color-background-faded;
	color: $color-contrast;
	@include font-light;
	margin: 0 !important;
}
</style>

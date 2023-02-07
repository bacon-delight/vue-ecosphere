<template>
	<i :class="name"></i>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";

export default defineComponent({
	props: {
		name: {
			type: String as PropType<string>,
			required: true,
		},
	},
});
</script>

<style lang="scss" scoped>
@import url("https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css");
</style>

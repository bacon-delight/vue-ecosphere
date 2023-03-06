<template lang="pug">
.radio-group
	.radio-group__label {{ label }}
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";

export default defineComponent({
	name: "RadioGroup",
	components: {
		// SVGIcon,
	},
	props: {
		label: {
			type: String as PropType<string>,
			required: true,
		},
		// modelValue: {
		// 	type: Boolean as PropType<boolean>,
		// 	default: false,
		// },
	},
	data() {
		return {
			// value: false,
		};
	},
	mounted() {
		// this.value = this.modelValue;
	},
	methods: {
		// handleClick(): void {
		// 	this.value = !this.value;
		// 	this.$emit("update:modelValue", this.value);
		// },
	},
});
</script>

<style lang="scss" scoped>
.radio-group {
	@include font-footnote;
}
</style>

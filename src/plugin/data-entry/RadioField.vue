<template lang="pug">
.radio(@click="handleClick", :class="[{ 'radio--disabled': disabled }]")
	SVGIcon.radio__icon(
		:name="value ? 'ri-radio-button-line' : 'ri-checkbox-blank-circle-line'",
		:tabindex="disabled ? -1 : 0",
		@keypress.enter="handleClick"
	)
	.radio__label {{ label }}
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import SVGIcon from "../general/SVGIcon.vue";

export default defineComponent({
	name: "RadioField",
	components: {
		SVGIcon,
	},
	props: {
		label: {
			type: String as PropType<string>,
			required: true,
		},
		modelValue: {
			type: Boolean as PropType<boolean>,
			default: false,
		},
		disabled: {
			type: Boolean as PropType<boolean>,
			default: false,
		},
	},
	data() {
		return {
			value: false,
		};
	},
	mounted() {
		this.value = this.modelValue;
	},
	methods: {
		handleClick(): void {
			this.value = !this.value;
			this.$emit("update:modelValue", this.value);
		},
	},
});
</script>

<style lang="scss" scoped>
.radio {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	column-gap: 0.5rem;
	align-items: center;
	cursor: pointer;

	&__icon {
		border-radius: 50%;
		padding: 0.25rem;
		transition: $transition-standard;

		&:focus {
			color: $color-hyperlink;
			outline: none;
		}
	}

	&--disabled {
		opacity: 50%;
		pointer-events: none;
	}
}

.radio:hover .radio__icon {
	background: $color-background;
	color: $color-hyperlink;
}
</style>

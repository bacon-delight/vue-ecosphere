<template lang="pug">
.switch(@click="handleClick", :class="[{ 'switch--disabled': disabled }]")
	SVGIcon.switch__icon(
		:class="[value ? `switch__icon--${hue}` : '']",
		:name="value ? 'ri-toggle-fill' : 'ri-toggle-line'",
		:tabindex="disabled ? -1 : 0",
		@keypress.enter="handleClick"
	)
	.switch__label {{ label }}
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import { type hue, hue_options } from "@/plugin/utilities/types.interface";
import SVGIcon from "../general/SVGIcon.vue";

export default defineComponent({
	name: "SwitchField",
	emits: ["update:modelValue", "update"],
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
		default: {
			type: [Boolean, null] as PropType<boolean | null>,
			default: null,
		},
		hue: {
			type: String as PropType<hue>,
			default: "information",
			validator(value: hue): boolean {
				return hue_options.includes(value);
			},
		},
	},
	data() {
		return {
			value: false,
		};
	},
	mounted() {
		this.value = this.default !== null ? this.default : this.modelValue;
	},
	methods: {
		handleClick(): void {
			this.value = !this.value;
			this.$emit("update:modelValue", this.value);
			this.$emit("update", this.value);
		},
	},
	watch: {
		default(newDefault: boolean) {
			this.value = newDefault;
		},
	},
});
</script>

<style lang="scss" scoped>
.switch {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	column-gap: 0.5rem;
	align-items: center;
	cursor: pointer;
	-webkit-tap-highlight-color: transparent;

	&__icon {
		border-radius: $border-radius-standard;
		padding: 0 0.25rem;
		transition: $transition-standard;
		@include hue-color-modifiers;
		font-size: 1.5rem;

		&:focus {
			outline: 1px solid $color-hyperlink;
			background: $color-background;
		}
	}

	&__label {
		@include font-regular;
		user-select: none;
	}

	&--disabled {
		opacity: 50%;
		pointer-events: none;
	}
}

.switch:hover .switch__icon {
	background: $color-background;
	color: $color-hyperlink;
}
</style>

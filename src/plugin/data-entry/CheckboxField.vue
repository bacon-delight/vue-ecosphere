<template lang="pug">
.checkbox(@click="handleClick", :class="[{ 'checkbox--disabled': disabled }]")
	SVGIcon.checkbox__icon(
		:class="[value ? `checkbox__icon--${hue}` : '']",
		:name="value ? 'ri-checkbox-fill' : 'ri-checkbox-blank-line'",
		:tabindex="disabled ? -1 : 0",
		@keypress.enter="handleClick"
	)
	.checkbox__label {{ label }}
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import { type hue, hue_options } from "@/plugin/utilities/types.interface";
import SVGIcon from "../general/SVGIcon.vue";

export default defineComponent({
	name: "CheckboxField",
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
.checkbox {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	column-gap: 0.5rem;
	align-items: center;
	cursor: pointer;
	-webkit-tap-highlight-color: transparent;

	&__icon {
		border-radius: 50%;
		padding: 0.25rem;
		transition: $transition-standard;
		@include hue-color-modifiers;
		font-size: 1.125rem;

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

.checkbox:hover .checkbox__icon {
	background: $color-background;
	color: $color-hyperlink;
}
</style>

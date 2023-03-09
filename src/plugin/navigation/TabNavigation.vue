<template lang="pug">
.tabs__wrapper
	.tabs(:class="[{ 'tabs--disabled': disabled }]")
		//- Option
		.tabs__option(
			v-for="(option, index) in options",
			:class="[{ 'tabs__option--disabled': option.disabled, 'tabs__option--vertical': iconPosition === 'above' }, value === index ? `tabs__option--${hue}` : '']",
			@click="handleClick(index)",
			@keypress.enter="handleClick(index)",
			:tabindex="option.disabled || disabled ? -1 : 0"
		)
			//- Before or Above Icon
			SVGIcon.tabs__option-icon(
				:class="[{ 'tabs__option-icon--above': iconPosition === 'above' }]",
				v-if="iconPosition === 'before' || iconPosition === 'above'",
				:name="option.icon"
			)

			//- Label
			.tabs__option-label {{ option.label }}

			//- After Icon
			SVGIcon.tabs__option-icon(
				v-if="iconPosition === 'after'",
				:name="option.icon"
			)
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import {
	tab_navigation_option_icon_position_options,
	hue_options,
} from "@/plugin/utilities/types.interface";
import type {
	tab_navigation_option,
	tab_navigation_option_icon_position,
	hue,
} from "@/plugin/utilities/types.interface";
import SVGIcon from "@/plugin/general/SVGIcon.vue";

export default defineComponent({
	name: "TabNavigation",
	components: {
		SVGIcon,
	},
	props: {
		options: {
			type: Array as PropType<tab_navigation_option[]>,
			required: true,
		},
		disabled: {
			type: Boolean as PropType<boolean>,
			default: false,
		},
		iconPosition: {
			type: String as PropType<tab_navigation_option_icon_position>,
			default: "before",
			validator(value: tab_navigation_option_icon_position): boolean {
				return tab_navigation_option_icon_position_options.includes(
					value
				);
			},
		},
		modelValue: {
			type: [String, Number, Boolean, null] as PropType<
				string | number | boolean | null
			>,
			default: null,
		},
		default: {
			type: [String, Number, Boolean, null] as PropType<
				string | number | boolean | null
			>,
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
			value: null as null | number | string | boolean,
		};
	},
	mounted() {
		const initialValue =
			this.default !== null ? this.default : this.modelValue;
		if (initialValue !== null) {
			this.options.forEach(
				(option: tab_navigation_option, index: number) => {
					if (option.value === initialValue) {
						this.value = index;
					}
				}
			);
		}
	},
	methods: {
		handleClick(index: number): void {
			this.value = index;
			this.$emit("update:modelValue", this.options[this.value].value);
			this.$emit("update", this.options[this.value].value);
			if (this.options[this.value].action) {
				(this.options[this.value].action as () => void)();
			}
		},
	},
	watch: {
		default(newDefault: string | number | boolean | null): void {
			if (newDefault === null) {
				this.value = null;
			} else {
				this.options.forEach(
					(option: tab_navigation_option, index: number) => {
						if (option.value === newDefault) {
							this.value = index;
						}
					}
				);
			}
		},
		modelValue(newValue: string | number | boolean | null): void {
			if (newValue === null) {
				this.value = null;
			} else {
				this.options.forEach(
					(option: tab_navigation_option, index: number) => {
						if (option.value === newValue) {
							this.value = index;
						}
					}
				);
			}
		},
	},
});
</script>

<style lang="scss" scoped>
.tabs {
	display: grid;
	grid-auto-flow: column;
	grid-auto-columns: 1fr;
	column-gap: 1px;
	border-radius: $border-radius-standard;
	overflow: hidden;
	width: fit-content;
	background: $color-background-faded;

	&__wrapper {
		overflow-x: auto;
		padding-bottom: 0.5rem;
	}

	&--disabled {
		opacity: 50%;
		pointer-events: none;
	}

	&__option {
		background: $color-background;
		padding: 0.55rem 1rem 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		column-gap: 0.5rem;
		cursor: pointer;
		border-bottom: 2px solid transparent;
		@include hue-border-modifiers(border-bottom, 2px);
		user-select: none;
		transition: $transition-standard;
		border: 1px solid transparent;

		&:focus {
			// background: $color-background-faded;
			outline: none;
			color: $color-information;
			// border-radius: $border-radius-standard;
			// border: 1px solid $color-information;
		}

		&:hover {
			background: $color-background-faded;
			color: $color-information;
		}

		&--disabled {
			opacity: 30%;
			pointer-events: none;
		}

		&--vertical {
			flex-direction: column;
			row-gap: 0.25rem;
			justify-content: space-between;
		}
	}

	&__option-label {
		display: block;
		white-space: nowrap;
	}

	&__option-icon {
		&--above {
			font-size: 1.25rem;
		}
	}
}
</style>

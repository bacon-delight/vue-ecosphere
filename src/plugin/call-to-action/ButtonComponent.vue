<template lang="pug">
button.button(
	:class="[`button--${hue}${ghost ? '-ghost' : ''}`, `button--${size}`, { 'button--disabled': disabled }]",
	:disabled="disabled"
)
	SVGIcon(v-if="icon && iconPosition === 'before'", :name="icon")
	span {{ label }}
	SVGIcon(v-if="icon && iconPosition === 'after'", :name="icon")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type {
	hue,
	button_size,
	button_icon_position,
} from "@/plugin/utilities/types.interface";
import {
	hue_options,
	button_size_options,
	button_icon_position_options,
} from "@/plugin/utilities/types.interface";
import SVGIcon from "@/plugin/general/SVGIcon.vue";

export default defineComponent({
	name: "ButtonComponent",
	props: {
		label: {
			type: String as PropType<string>,
			required: true,
		},
		size: {
			type: String as PropType<button_size>,
			default: "md",
			validator(value: button_size): boolean {
				return button_size_options.includes(value);
			},
		},
		hue: {
			type: String as PropType<hue>,
			default: "primary",
			validator(value: hue): boolean {
				return hue_options.includes(value);
			},
		},
		ghost: {
			type: Boolean as PropType<boolean>,
			default: false,
		},
		icon: {
			type: String as PropType<string>,
			default: "",
		},
		iconPosition: {
			type: String as PropType<button_icon_position>,
			default: "after",
			validator(value: button_icon_position): boolean {
				return button_icon_position_options.includes(value);
			},
		},
		disabled: {
			type: Boolean as PropType<boolean>,
			default: false,
		},
	},
	components: {
		SVGIcon,
	},
});
</script>

<style lang="scss" scoped>
.button {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	align-items: center;
	border-radius: $border-radius-standard;
	cursor: pointer;
	transition: $transition-standard;
	border: 1px solid $color-transparent;
	-webkit-tap-highlight-color: transparent;
	user-select: none;

	&:focus {
		outline: 2px solid $color-hyperlink;
	}

	&--disabled {
		opacity: 50%;
		color: $color-dark !important;
		background: $color-disabled !important;
		cursor: not-allowed;
	}

	// Hues
	&--primary {
		background: $color-primary;
		color: $color-primary-contrast;

		&:hover {
			background: $color-primary-variant;
			color: $color-primary-variant-contrast;
		}
	}

	&--primary-ghost {
		background: $color-transparent;
		color: $color-primary;
		border: 1px solid $color-primary;

		&:hover {
			background: $color-primary-variant;
			color: $color-primary-variant-contrast;
		}
	}

	&--primary-variant {
		background: $color-primary-variant;
		color: $color-primary-variant-contrast;

		&:hover {
			background: $color-primary;
			color: $color-primary-contrast;
		}
	}

	&--primary-variant-ghost {
		background: $color-transparent;
		color: $color-primary-variant;
		border: 1px solid $color-primary-variant;

		&:hover {
			background: $color-primary;
			color: $color-primary-contrast;
		}
	}

	&--secondary {
		background: $color-secondary;
		color: $color-secondary-contrast;

		&:hover {
			background: $color-secondary-variant;
			color: $color-secondary-variant-contrast;
		}
	}

	&--secondary-ghost {
		background: $color-transparent;
		color: $color-secondary;
		border: 1px solid $color-secondary;

		&:hover {
			background: $color-secondary-variant;
			color: $color-secondary-variant-contrast;
		}
	}

	&--secondary-variant {
		background: $color-secondary-variant;
		color: $color-secondary-variant-contrast;

		&:hover {
			background: $color-secondary;
			color: $color-secondary-contrast;
		}
	}

	&--secondary-variant-ghost {
		background: $color-transparent;
		color: $color-secondary-variant;
		border: 1px solid $color-secondary-variant;

		&:hover {
			background: $color-secondary;
			color: $color-secondary-contrast;
		}
	}

	&--error {
		background: $color-error;
		color: $color-dark;

		&:hover {
			background: $color-error-variant;
			color: $color-dark;
		}
	}

	&--error-ghost {
		background: $color-transparent;
		color: $color-error;
		border: 1px solid $color-error;

		&:hover {
			background: $color-error-variant;
			color: $color-dark;
		}
	}

	&--success {
		background: $color-success;
		color: $color-dark;

		&:hover {
			background: $color-success-variant;
			color: $color-dark;
		}
	}

	&--success-ghost {
		background: $color-transparent;
		color: $color-success;
		border: 1px solid $color-success;

		&:hover {
			background: $color-success-variant;
			color: $color-dark;
		}
	}

	&--warning {
		background: $color-warning;
		color: $color-dark;

		&:hover {
			background: $color-warning-variant;
			color: $color-dark;
		}
	}

	&--warning-ghost {
		background: $color-transparent;
		color: $color-warning;
		border: 1px solid $color-warning;

		&:hover {
			background: $color-warning-variant;
			color: $color-dark;
		}
	}

	&--information {
		background: $color-information;
		color: $color-dark;

		&:hover {
			background: $color-information-variant;
			color: $color-dark;
		}
	}

	&--information-ghost {
		background: $color-transparent;
		color: $color-information;
		border: 1px solid $color-information;

		&:hover {
			background: $color-information-variant;
			color: $color-dark;
		}
	}

	// Sizes
	&--xs {
		padding: 0.25rem 1rem;
		column-gap: 0.5rem;
		@include font-footnote;
	}

	&--sm {
		padding: 0.375rem 1.25rem;
		column-gap: 0.625rem;
		@include font-regular;
	}

	&--md {
		padding: 0.5rem 1.5rem;
		column-gap: 0.75rem;
		@include font-regular;
	}

	&--lg {
		padding: 0.625rem 1.75rem;
		column-gap: 0.875rem;
		@include header-6;
	}

	&--xl {
		padding: 0.75rem 2rem;
		column-gap: 1rem;
		@include header-5;
	}
}
</style>

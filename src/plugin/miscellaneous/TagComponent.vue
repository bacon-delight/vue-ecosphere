<template lang="pug">
.tag(
	:class="[`tag--${hue}`, `tag--${size}`, outline ? `tag--outline` : '', disabled ? `tag--disabled` : '']"
)
	//- Label
	.tag__label {{ label }}

	//- Clear Icon
	SVGIcon.tag__icon.tag__icon-clear(
		v-if="allowClear",
		name="ri-close-line",
		tabindex="0",
		@click="handleClear"
	)
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import SVGIcon from "@/plugin/general/SVGIcon.vue";
import {
	tag_size_options,
	hue_extended_options,
} from "@/plugin/utilities/types.interface";
import type {
	hue_extended,
	tag_size,
} from "@/plugin/utilities/types.interface";

export default defineComponent({
	name: "TagComponent",
	emits: ["clear"],
	props: {
		label: {
			type: String as PropType<string>,
			required: true,
		},
		hue: {
			type: String as PropType<hue_extended>,
			default: "information",
			validator(value: hue_extended): boolean {
				return hue_extended_options.includes(value);
			},
		},
		size: {
			type: String as PropType<tag_size>,
			default: "md",
			validator(value: tag_size): boolean {
				return tag_size_options.includes(value);
			},
		},
		allowClear: {
			type: Boolean as PropType<boolean>,
			default: false,
		},
		outline: {
			type: Boolean as PropType<boolean>,
			default: false,
		},
		disabled: {
			type: Boolean as PropType<boolean>,
			default: false,
		},
	},
	components: {
		SVGIcon,
	},
	methods: {
		handleClear(): void {
			this.$emit("clear");
		},
	},
});
</script>

<style lang="scss" scoped>
.tag {
	background: $color-background;
	border-radius: calc($border-radius-standard * 3);
	user-select: none;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	align-items: center;
	column-gap: 0.25rem;
	@include hue-modifiers;
	width: fit-content;

	// Sizes
	&--sm {
		padding: 0.25rem 0.5rem;
		@include font-footnote;
	}

	&--md {
		padding: 0.125rem 0.75rem;
		@include font-regular;
	}

	&--lg {
		padding: 0.25rem 0.75rem;
		@include font-bold;
	}

	&__icon-clear {
		cursor: pointer;
		border-radius: 50%;
		transition: $transition-standard;
		-webkit-tap-highlight-color: transparent;

		&:hover {
			color: $color-disabled;
		}

		&:focus {
			outline: none;
			color: $color-hyperlink;
			// outline: 1px solid $color-hyperlink;
			// background: $color-background;
		}
	}

	&--outline {
		border: 1px solid $color-contrast;
	}

	&--disabled {
		background: $color-disabled;
		color: $color-dark;
		opacity: 0.3;
		pointer-events: none;
	}
}
</style>

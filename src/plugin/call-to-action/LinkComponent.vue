<template lang="pug">
a.link
	SVGIcon.link__icon(
		v-if="iconPosition === 'before'",
		:class="[`link__label--${hue}`]",
		:name="icon"
	)
	.link__label(:class="[`link__label--${hue}`]") {{ iconPosition === "before" && icon ? "&nbsp;" : "" }} {{ label }} {{ iconPosition === "after" && icon ? "&nbsp;" : "" }}
	SVGIcon.link__icon(
		v-if="iconPosition === 'after'",
		:class="[`link__label--${hue}`]",
		:name="icon"
	)
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import {
	hue_options,
	type hue,
	cta_icon_position_options,
	type cta_icon_position,
} from "@/plugin/utilities/types.interface";
import SVGIcon from "../general/SVGIcon.vue";

export default defineComponent({
	name: "LinkComponent",
	components: {
		SVGIcon,
	},
	props: {
		label: {
			type: String as PropType<string>,
			required: true,
		},
		hue: {
			type: String as PropType<hue>,
			default: "information",
			validator(value: hue): boolean {
				return hue_options.includes(value);
			},
		},
		icon: {
			type: String as PropType<string>,
			default: "",
		},
		iconPosition: {
			type: String as PropType<cta_icon_position>,
			default: "after",
			validator(value: cta_icon_position): boolean {
				return cta_icon_position_options.includes(value);
			},
		},
	},
});
</script>

<style lang="scss" scoped>
.link {
	display: inline-flex;
	flex-wrap: nowrap;
	cursor: pointer;
	text-decoration: none;
	@include font-regular;
	-webkit-tap-highlight-color: transparent;

	&:hover {
		// text-decoration: underline;
		// text-decoration-color: $color-information;
		@include font-bold;
	}

	&:focus {
		outline: 1px solid $color-hyperlink;
		padding: 0 0.125rem;
		border-radius: $border-radius-standard;
		// text-decoration: underline;
		// text-decoration-color: $color-information;
		// @include font-bold;
	}

	&__label {
		@include hue-color-modifiers;
	}
}
</style>

<template lang="pug">
a.link(:class="[`link--${hue}`]")
	SVGIcon.link__icon(v-if="iconPosition === 'before'", :name="icon")
	.link__label {{ iconPosition === "before" && icon ? "&nbsp;" : "" }} {{ label }} {{ iconPosition === "after" && icon ? "&nbsp;" : "" }}
	SVGIcon.link__icon(v-if="iconPosition === 'after'", :name="icon")
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
	@include hue-color-modifiers;
	-webkit-tap-highlight-color: transparent;
	max-width: fit-content;

	&:hover {
		color: $color-hyperlink;
	}

	&:focus {
		color: $color-hyperlink;
		outline: none;
		outline: 1px solid $color-hyperlink;
	}
}
</style>

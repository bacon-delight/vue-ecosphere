<template lang="pug">
.menu
	MenuItem(
		v-for="option in options",
		:option="option",
		:skeleton="skeleton",
		:hue="hue",
		:theme="theme"
	)
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type { menu_item, hue, theme } from "@/plugin/utilities/types.interface";
import MenuItem from "./MenuNavigation/MenuItem.vue";

export default defineComponent({
	name: "MenuNavigation",
	props: {
		options: {
			type: Array as PropType<menu_item[]>,
			required: true,
		},
		skeleton: {
			type: Boolean as PropType<boolean>,
			default: true,
		},
		hue: {
			type: String as PropType<hue>,
			default: "information",
		},
		theme: {
			type: String as PropType<theme>,
			default: "auto",
		},
	},
	components: {
		MenuItem,
	},
});
</script>

<style lang="scss" scoped>
.menu {
	background: $color-background;
	color: $color-contrast;
	display: flex;
	flex-direction: column;
	row-gap: 0.25rem;
	padding: 0.25rem;
	border-radius: $border-radius-standard;
}
</style>

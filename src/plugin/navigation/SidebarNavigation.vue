<template lang="pug">
.sidebar
	MenuItem(
		v-for="option in options",
		:option="option",
		:hue="hue",
		:skeleton="skeleton"
	)
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type { hue, theme, menu_item } from "@/plugin/utilities/types.interface";
import MenuItem from "./MenuNavigation/MenuItem.vue";

export default defineComponent({
	name: "SidebarNavigation",
	props: {
		options: {
			type: Array as PropType<menu_item[]>,
			required: true,
		},
		hue: {
			type: String as PropType<hue>,
			default: "information",
		},
		theme: {
			type: String as PropType<theme>,
			default: "auto",
		},
		skeleton: {
			type: Boolean as PropType<boolean>,
			default: true,
		},
	},
	components: {
		MenuItem,
	},
});
</script>

<style lang="scss" scoped>
.sidebar {
	height: 100%;
	overflow-y: auto;
	background: $color-background;
	color: $color-contrast;
	display: flex;
	flex-direction: column;
	row-gap: 0.25rem;
	padding: 0.5rem;
	// @include scrollbar-vertical;
}
</style>

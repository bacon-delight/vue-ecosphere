<template lang="pug">
.layout
	SidebarNavigation.layout__sidebar(:options="options")
	.layout__body
		.layout__navbar Navbar
		.layout__content
			router-view
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SidebarNavigation from "@/plugin/navigation/SidebarNavigation.vue";
import navigation_options from "@/assets/utilities/navigation_options";
import type { menu_item } from "@/plugin/utilities/types.interface";

export default defineComponent({
	name: "CommonLayout",
	components: {
		SidebarNavigation,
	},
	computed: {
		options(): menu_item[] {
			return navigation_options;
		},
	},
});
</script>

<style lang="scss" scoped>
.layout {
	height: 100vh;
	width: 100vw;
	display: grid;
	grid-template-columns: min-content 1fr;
	overflow: hidden;

	&__body {
		display: grid;
		grid-template-rows: min-content 1fr;
		overflow: hidden;
	}

	&__sidebar {
		min-width: 200px;
	}

	&__content {
		overflow-y: auto;
		@include scrollbar-vertical;
	}
}
</style>

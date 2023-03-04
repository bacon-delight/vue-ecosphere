<template lang="pug">
.layout
	SidebarNavigation.layout__sidebar(:options="options", :skeleton="true")
	.layout__body
		NavigationBar.layout__navbar(:options="[]", :branding="branding")
		.layout__content
			router-view
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavigationBar from "@/plugin/navigation/NavigationBar.vue";
import SidebarNavigation from "@/plugin/navigation/SidebarNavigation.vue";
import navigation_options from "@/assets/utilities/navigation_options";
import type { menu_item } from "@/plugin/utilities/types.interface";

export default defineComponent({
	name: "CommonLayout",
	components: {
		NavigationBar,
		SidebarNavigation,
	},
	data() {
		return {
			branding: {
				logo: "./logo.png",
				label: this.$t("title"),
				action: () => {
					this.$router.push("/");
				},
			},
		};
	},
	computed: {
		options(): menu_item[] {
			return navigation_options();
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

	@include respond-below(sm) {
		grid-template-columns: 1fr;
	}

	&__body {
		display: grid;
		grid-template-rows: min-content 1fr;
		overflow: hidden;
	}

	&__sidebar {
		min-width: 200px;

		@include respond-below(sm) {
			display: none;
		}
	}

	&__content {
		overflow-y: auto;
		@include scrollbar-vertical;
	}
}
</style>

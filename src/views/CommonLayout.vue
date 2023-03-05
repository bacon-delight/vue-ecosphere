<template lang="pug">
//- .layout
//- 	.layout__sidebar
//- 		SidebarNavigation(:options="options", :skeleton="true")
//- 	.layout__body
//- 		.layout__navbar
//- 			NavigationBar(:options="[]", :branding="branding")
//- 		.layout__content
//- 			router-view
.layout
	.layout__navbar
		NavigationBar(:options="[]", :branding="branding")
	.layout__body
		.layout__sidebar
			SidebarNavigation(
				:options="options",
				:skeleton="true",
				:responsive="true"
			)
		.layout__content
			router-view
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavigationBar from "@/plugin/navigation/NavigationBar.vue";
import SidebarNavigation from "@/plugin/navigation/SidebarNavigation.vue";
import MenuNavigation from "@/plugin/navigation/MenuNavigation.vue";
import navigation_options from "@/assets/utilities/navigation_options";
import type { menu_item } from "@/plugin/utilities/types.interface";

export default defineComponent({
	name: "CommonLayout",
	components: {
		NavigationBar,
		SidebarNavigation,
		MenuNavigation,
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

<style lang="scss">
.layout {
	height: 100vh;
	width: 100vw;
	display: grid;
	grid-template-rows: min-content 1fr;
	overflow: hidden;

	&__body {
		display: grid;
		grid-template-columns: min-content 1fr;
		overflow: hidden;

		@include respond-below(sm) {
			// grid-template-columns: 1fr;
		}
	}

	&__navbar {
		display: block;
		border-bottom: 1px solid rgba(134, 134, 134, 0.1);
	}

	&__sidebar {
		padding: 1rem;
		overflow-y: auto;

		> * {
			border-radius: $border-radius-standard;
			box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
		}

		@include respond-below(sm) {
			padding: 0;
		}
	}

	&__content {
		overflow-y: auto;
	}
}

// .layout {
// 	height: 100vh;
// 	width: 100vw;
// 	display: grid;
// 	grid-template-columns: min-content 1fr;
// 	overflow: hidden;

// 	@include respond-below(sm) {
// 		grid-template-columns: 1fr;
// 	}

// 	&__body {
// 		height: 100%;
// 		display: grid;
// 		grid-template-rows: min-content 1fr;
// 		overflow: hidden;
// 	}

// 	&__sidebar {
// 		min-width: 200px;
// 		height: 100vh;
// 		border-right: 1px solid rgba(134, 134, 134, 0.3);

// 		@include respond-below(sm) {
// 			display: none;
// 		}
// 	}

// 	&__content {
// 		overflow-y: auto;
// 		@include scrollbar-vertical;
// 	}
// }

.wrapper {
	display: block;
	width: $reading-width-standard;
	max-width: 100%;
	margin: 0 auto;
	padding: 0 1rem 1rem;

	&__title {
		@include header-2;
	}

	&__body {
		display: block;
	}
}

.section {
	margin: 1rem 0 1.5rem;

	&__title {
		@include header-4;
	}

	&__subtitle {
		@include header-6;
	}

	&__flex {
		display: flex;
		flex-wrap: wrap;
		column-gap: 0.5rem;
		row-gap: 0.5rem;
		align-items: center;
	}
}
</style>

<template lang="pug">
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
		#content.layout__content
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
	mounted() {
		if (this.$route.hash) {
			setTimeout(() => {
				document
					.getElementById(this.$route.hash.replace("#", ""))
					?.scrollIntoView({ behavior: "smooth" });
			}, 1000);
		}
	},
	watch: {
		$route() {
			if (!this.$route.hash) {
				document
					.getElementById("content")
					?.scrollTo({ top: 0, behavior: "smooth" });
			}
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

	&__description {
		@include font-light;
	}

	&__flex {
		display: flex;
		flex-wrap: wrap;
		column-gap: 0.5rem;
		row-gap: 0.5rem;
		align-items: center;
	}

	&__grid {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		column-gap: 1rem;
		row-gap: 1rem;

		@include respond-below(sm) {
			grid-template-columns: 1fr 1fr;
		}
	}

	&__playground {
		margin-top: 0.5rem;
		border: 1px dashed $color-divider;
		border-radius: $border-radius-standard;
		padding: 1rem 1rem 0.5rem;
		display: flex;
		flex-direction: column;
		row-gap: 1rem;
	}
}
</style>

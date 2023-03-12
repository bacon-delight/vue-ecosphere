<template lang="pug">
.wrapper
	.wrapper__title {{ $t("pages.navigation.breadcrumb.title") }}
	.wrapper__body
		.section
			BreadcrumbNavigation(:options="options")

		MarkdownParser(:content="$t('pages.navigation.breadcrumb.content')")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownParser from "@/components/MarkdownParser.vue";
import BreadcrumbNavigation from "@/plugin/navigation/BreadcrumbNavigation.vue";

export default defineComponent({
	name: "BreadcrumbPage",
	components: {
		MarkdownParser,
		BreadcrumbNavigation,
	},
	data() {
		return {
			options: [
				{
					label: "Home",
					icon: "ri-home-line",
					action: () => {
						alert("You clicked home!");
					},
				},
				{
					label: "Navigation",
					icon: "ri-navigation-line",
					disabled: true,
				},
				{
					label: "Breadcrumb",
					active: true,
				},
			],
		};
	},
});
</script>

<style lang="scss" scoped></style>

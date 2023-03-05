<template lang="pug">
.wrapper
	.wrapper__title {{ $t("pages.navigation.sidebar.title") }}

	.wrapper__body
		.section
			.section__flex
				SidebarNavigation(:options="options", hue="error")

		MarkdownParser(:content="$t('pages.navigation.sidebar.content')")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownParser from "@/components/MarkdownParser.vue";
import SidebarNavigation from "@/plugin/navigation/SidebarNavigation.vue";

export default defineComponent({
	name: "SidebarPage",
	components: {
		MarkdownParser,
		SidebarNavigation,
	},
	data() {
		return {
			options: [
				{
					label: "Dashboard",
					icon: "ri-dashboard-line",
				},
				{
					label: "Cash Flow",
					icon: "ri-money-cny-circle-line",
					children: [
						{
							label: "Outgoing Transfers",
						},
						{
							label: "Inflows",
						},
					],
					expanded: true,
				},
				{
					label: "Settings",
					icon: "ri-settings-line",
				},
			],
		};
	},
});
</script>

<style lang="scss" scoped></style>

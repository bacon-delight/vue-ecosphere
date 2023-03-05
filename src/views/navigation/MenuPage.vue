<template lang="pug">
.wrapper
	.wrapper__title {{ $t("pages.navigation.menu.title") }}

	.wrapper__body
		.section
			.section__flex
				MenuNavigation(:options="options")

		MarkdownParser(:content="$t('pages.navigation.menu.content')")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownParser from "@/components/MarkdownParser.vue";
import MenuNavigation from "@/plugin/navigation/MenuNavigation.vue";

export default defineComponent({
	name: "MenuPage",
	components: {
		MarkdownParser,
		MenuNavigation,
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

<template>
	<div class="wrapper">
		<div class="wrapper__title">
			{{ $t("pages.navigation.menu.title") }}
		</div>
		<div class="wrapper__body">
			<div class="section">
				<div class="section__flex">
					<MenuNavigation :options="options"></MenuNavigation>
				</div>
			</div>
			<MarkdownParser
				:content="$t('pages.navigation.menu.content')"
			></MarkdownParser>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownParser from "@/components/MarkdownParser.vue";
import MenuNavigation from "@ecosphere/navigation/MenuNavigation.vue";

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

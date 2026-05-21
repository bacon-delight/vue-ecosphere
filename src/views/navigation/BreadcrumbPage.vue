<template>
	<div class="wrapper">
		<div class="wrapper__title">{{ $t("pages.navigation.breadcrumb.title") }}</div>
		<div class="wrapper__body">
			<div class="section">
				<BreadcrumbNavigation :options="options"></BreadcrumbNavigation>
			</div>
			<MarkdownParser :content="$t('pages.navigation.breadcrumb.content')"></MarkdownParser>
		</div>
	</div>
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

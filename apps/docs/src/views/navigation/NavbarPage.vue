<template>
	<div class="wrapper">
		<div class="wrapper__title">
			{{ $t("pages.navigation.navbar.title") }}
		</div>
		<div class="wrapper__body">
			<div class="section">
				<div class="section__flex">
					<NavigationBar
						:options="[]"
						:branding="branding"
					></NavigationBar>
				</div>
			</div>
			<MarkdownParser
				:content="$t('pages.navigation.navbar.content')"
			></MarkdownParser>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownParser from "@/components/MarkdownParser.vue";
import NavigationBar from "@ecosphere/navigation/NavigationBar.vue";

export default defineComponent({
	name: "NavbarPage",
	components: {
		MarkdownParser,
		NavigationBar,
	},
	data() {
		return {
			branding: {
				logo: "/logo.png",
				label: "Ecosphere",
				action: () => {
					alert("Clicked on Branding!");
				},
			},
			options: [],
		};
	},
});
</script>

<style lang="scss" scoped></style>

<template lang="pug">
.wrapper
	.wrapper__title {{ $t("pages.navigation.navbar.title") }}

	.wrapper__body
		.section
			.section__flex
				NavigationBar(:options="[]", :branding="branding")

		MarkdownParser(:content="$t('pages.navigation.navbar.content')")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownParser from "@/components/MarkdownParser.vue";
import NavigationBar from "@/plugin/navigation/NavigationBar.vue";

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

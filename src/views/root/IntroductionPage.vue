<template lang="pug">
.wrapper
	.wrapper__title {{ $t("pages.introduction.title") }}
	.wrapper__body
		MarkdownParser(:content="$t('pages.introduction.content')")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownParser from "@/components/MarkdownParser.vue";

export default defineComponent({
	name: "IntroductionPage",
	components: {
		MarkdownParser,
	},
});
</script>

<style lang="scss" scoped>
.wrapper {
	display: block;
	width: 600px;
	max-width: 100%;
	margin: 0 auto;
	padding: 1rem;

	&__title {
		@include header-2;
	}

	&__body {
		display: block;
	}
}
</style>

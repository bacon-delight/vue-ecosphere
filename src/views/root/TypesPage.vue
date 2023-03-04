<template lang="pug">
.wrapper
	.wrapper__title {{ $t("pages.types.title") }}
	.wrapper__body
		MarkdownParser(:content="$t('pages.types.content')")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownParser from "@/components/MarkdownParser.vue";

export default defineComponent({
	name: "TypesPage",
	components: {
		MarkdownParser,
	},
});
</script>

<style lang="scss" scoped>
.wrapper {
	display: block;
	width: $reading-width-standard;
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

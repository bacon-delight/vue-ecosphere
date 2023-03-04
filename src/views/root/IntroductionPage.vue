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

<style lang="scss" scoped></style>

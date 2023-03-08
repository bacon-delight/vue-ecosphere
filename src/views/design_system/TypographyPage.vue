<template lang="pug">
.wrapper
	.wrapper__title {{ $t("pages.design_system.typography.title") }}
	.wrapper__body
		MarkdownParser(:content="$t('pages.design_system.typography.content')")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownParser from "@/components/MarkdownParser.vue";

export default defineComponent({
	name: "TypographyPage",
	components: {
		MarkdownParser,
	},
});
</script>

<style lang="scss" scoped></style>

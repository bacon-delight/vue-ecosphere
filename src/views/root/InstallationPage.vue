<template lang="pug">
.wrapper
	.wrapper__title {{ $t("pages.installation.title") }}
	.wrapper__body
		MarkdownParser(:content="$t('pages.installation.content')")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownParser from "@/components/MarkdownParser.vue";

export default defineComponent({
	name: "InstallationPage",
	components: {
		MarkdownParser,
	},
});
</script>

<style lang="scss" scoped></style>

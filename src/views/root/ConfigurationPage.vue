<template lang="pug">
.wrapper
	.wrapper__title {{ $t("pages.configuration.title") }}
	.wrapper__body
		MarkdownParser(:content="$t('pages.configuration.content')")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownParser from "@/components/MarkdownParser.vue";

export default defineComponent({
	name: "ConfigurationPage",
	components: {
		MarkdownParser,
	},
});
</script>

<style lang="scss" scoped></style>

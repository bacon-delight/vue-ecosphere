<template lang="pug">
.wrapper
	.wrapper__title {{ $t("pages.data_entry.textarea.title") }}

	.wrapper__body
		.section
			.section__flex
			TextareaField(label="Label", placeholder="Placeholder")
		MarkdownParser(:content="$t('pages.data_entry.textarea.content')")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownParser from "@/components/MarkdownParser.vue";
import TextareaField from "@/plugin/data-entry/TextareaField.vue";

export default defineComponent({
	name: "NavbarPage",
	components: {
		MarkdownParser,
		TextareaField,
	},
});
</script>

<style lang="scss" scoped></style>

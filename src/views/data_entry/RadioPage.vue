<template lang="pug">
.wrapper
	.wrapper__title {{ $t("pages.data_entry.radio.title") }}

	.wrapper__body
		.section
			.section__flex
				RadioField(label="Radio Option", :disabled="false")
		MarkdownParser(:content="$t('pages.data_entry.radio.content')")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownParser from "@/components/MarkdownParser.vue";
import RadioField from "@/plugin/data-entry/RadioField.vue";

export default defineComponent({
	name: "RadioPage",
	components: {
		MarkdownParser,
		RadioField,
	},
});
</script>

<style lang="scss" scoped></style>

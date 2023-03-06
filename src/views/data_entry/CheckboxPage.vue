<template lang="pug">
.wrapper
	.wrapper__title {{ $t("pages.data_entry.checkbox.title") }}

	.wrapper__body
		.section
			.section__flex
				CheckboxField(label="Checkbox Option", :disabled="false")
		MarkdownParser(:content="$t('pages.data_entry.checkbox.content')")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownParser from "@/components/MarkdownParser.vue";
import CheckboxField from "@/plugin/data-entry/CheckboxField.vue";

export default defineComponent({
	name: "CheckboxPage",
	components: {
		MarkdownParser,
		CheckboxField,
	},
});
</script>

<style lang="scss" scoped></style>

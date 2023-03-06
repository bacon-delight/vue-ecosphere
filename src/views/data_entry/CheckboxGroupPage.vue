<template lang="pug">
.wrapper
	.wrapper__title {{ $t("pages.data_entry.checkbox_group.title") }}

	.wrapper__body
		.section
			.section__flex
				RadioGroup(label="Radio Option")
		MarkdownParser(:content="$t('pages.data_entry.checkbox_group.content')")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownParser from "@/components/MarkdownParser.vue";
import RadioGroup from "@/plugin/data-entry/RadioGroup.vue";

export default defineComponent({
	name: "CheckboxGroupPage",
	components: {
		MarkdownParser,
		RadioGroup,
	},
});
</script>

<style lang="scss" scoped></style>

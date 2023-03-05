<template lang="pug">
.wrapper
	.wrapper__title {{ $t("pages.data_entry.input.title") }}

	.wrapper__body
		.section
			.section__flex
				InputField(
					label="Label",
					placeholder="Placeholder",
					assistive-text="Assistive Text",
					status="none",
					type="number",
					:outline="true",
					:disabled="false",
					:allow-clear="true"
				)

		MarkdownParser(:content="$t('pages.data_entry.input.content')")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownParser from "@/components/MarkdownParser.vue";
import InputField from "@/plugin/data-entry/InputField.vue";

export default defineComponent({
	name: "NavbarPage",
	components: {
		MarkdownParser,
		InputField,
	},
});
</script>

<style lang="scss" scoped></style>

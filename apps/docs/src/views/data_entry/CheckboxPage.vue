<template>
	<div class="wrapper">
		<div class="wrapper__title">
			{{ $t("pages.data_entry.checkbox.title") }}
		</div>
		<div class="wrapper__body">
			<div class="section">
				<div class="section__flex">
					<CheckboxField
						label="Checkbox Option"
						:disabled="false"
					></CheckboxField>
				</div>
			</div>
			<MarkdownParser
				:content="$t('pages.data_entry.checkbox.content')"
			></MarkdownParser>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownParser from "@/components/MarkdownParser.vue";
import CheckboxField from "@ecosphere/data-entry/CheckboxField.vue";

export default defineComponent({
	name: "CheckboxPage",
	components: {
		MarkdownParser,
		CheckboxField,
	},
});
</script>

<style lang="scss" scoped></style>

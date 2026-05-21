<template>
	<div class="wrapper">
		<div class="wrapper__title">
			{{ $t("pages.data_entry.radio.title") }}
		</div>
		<div class="wrapper__body">
			<div class="section">
				<div class="section__flex">
					<RadioField
						label="Radio Option"
						:disabled="false"
					></RadioField>
				</div>
			</div>
			<MarkdownParser
				:content="$t('pages.data_entry.radio.content')"
			></MarkdownParser>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownParser from "@/components/MarkdownParser.vue";
import RadioField from "@ecosphere/data-entry/RadioField.vue";

export default defineComponent({
	name: "RadioPage",
	components: {
		MarkdownParser,
		RadioField,
	},
});
</script>

<style lang="scss" scoped></style>

<template lang="pug">
.wrapper
	.wrapper__title {{ $t("pages.data_entry.radio_group.title") }}

	.wrapper__body
		.section
			.section__flex
				RadioGroup(
					label="Radio Option",
					assistive-text="Assistive Text",
					:options="options",
					v-model="selection"
				)
			p {{ selection }}
		MarkdownParser(:content="$t('pages.data_entry.radio_group.content')")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownParser from "@/components/MarkdownParser.vue";
import RadioGroup from "@/plugin/data-entry/RadioGroup.vue";

export default defineComponent({
	name: "RadioGroupPage",
	components: {
		MarkdownParser,
		RadioGroup,
	},
	data() {
		return {
			selection: false,
			options: [
				{
					label: "Option 1",
					value: 1,
				},
				{
					label: "Option 2",
					value: 2,
				},
				{
					label: "Option 3",
					value: 3,
				},
				{
					label: "Option 4",
					value: 4,
				},
				{
					label: "Option 5",
					value: 5,
				},
				{
					label: "Option 6",
					value: 6,
				},
			],
		};
	},
});
</script>

<style lang="scss" scoped></style>

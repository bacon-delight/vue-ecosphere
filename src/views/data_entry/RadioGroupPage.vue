<template lang="pug">
.wrapper
	.wrapper__title {{ $t("pages.data_entry.radio_group.title") }}

	.wrapper__body
		.section
			.section__flex
				RadioGroup(
					label="Select your favourite fruit",
					assistive-text="Firethorns are inedible, but they're good source for birds!",
					:options="options",
					v-model="selection"
				)
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
					label: "Apple",
					value: 1,
				},
				{
					label: "Banana",
					value: 2,
				},
				{
					label: "Firethorn",
					value: 3,
					disabled: true,
				},
				{
					label: "Grapefruit",
					value: 4,
				},
				{
					label: "Dragonfruit",
					value: 5,
				},
				{
					label: "Kiwi",
					value: 6,
				},
			],
		};
	},
});
</script>

<style lang="scss" scoped></style>

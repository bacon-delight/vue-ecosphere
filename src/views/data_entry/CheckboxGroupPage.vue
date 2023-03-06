<template lang="pug">
.wrapper
	.wrapper__title {{ $t("pages.data_entry.checkbox_group.title") }}

	.wrapper__body
		.section
			.section__flex
				CheckboxGroup(
					label="Select your favourite fruits",
					assistive-text="Firethorns are inedible, but they're good source for birds!",
					:options="options",
					v-model="selections",
					:default="[2]"
				)
		MarkdownParser(:content="$t('pages.data_entry.checkbox_group.content')")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownParser from "@/components/MarkdownParser.vue";
import CheckboxGroup from "@/plugin/data-entry/CheckboxGroup.vue";

export default defineComponent({
	name: "CheckboxGroupPage",
	components: {
		MarkdownParser,
		CheckboxGroup,
	},
	data() {
		return {
			selections: ["gp", 1],
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
					action: () => {
						alert("You have selected Grapefruit!");
					},
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

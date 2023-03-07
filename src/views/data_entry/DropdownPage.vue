<template lang="pug">
.wrapper
	.wrapper__title {{ $t("pages.data_entry.dropdown.title") }}

	.wrapper__body
		.section
			.section__flex
				DropdownField(
					label="Select your favourite fruit",
					placeholder="Select an option",
					assistive-text="Firethorns are inedible, but they're good source for birds!",
					:options="options",
					@clear="handleUpdate",
					:allow-clear="true"
				)
		MarkdownParser(:content="$t('pages.data_entry.dropdown.content')")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownParser from "@/components/MarkdownParser.vue";
import DropdownField from "@/plugin/data-entry/DropdownField.vue";

export default defineComponent({
	name: "DropdownPage",
	components: {
		MarkdownParser,
		DropdownField,
	},
	data() {
		return {
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
	methods: {
		handleUpdate() {
			console.log("Cleared");
		},
	},
});
</script>

<style lang="scss" scoped></style>

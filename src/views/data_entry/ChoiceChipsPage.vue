<template lang="pug">
.wrapper
	.wrapper__title {{ $t("pages.data_entry.choice_chips.title") }}

	.wrapper__body
		.section
			.section__flex
				ChoiceChips(
					:label="attributeAlterations.includes('label') ? 'Choice Chips' : ''",
					:assistive-text="attributeAlterations.includes('assistive-text') ? 'Assistive Text' : ''",
					:disabled="attributeAlterations.includes('disabled')",
					:outline="attributeAlterations.includes('outline')",
					:options="options",
					:default="attributeAlterations.includes('default') ? [1, 2] : []",
					:multiple="attributeAlterations.includes('multiple')",
					:hue="hueAlteration",
					:size="sizeAlteration",
					:state="stateAlteration",
					:alert-message="attributeAlterations.includes('alert-message') ? 'Alert Message' : ''",
					v-model="value"
				)

		.section
			.section__subtitle Playground {{ value }}
			.section__description Customise the options below to see changes on the choice chips
			.section__playground
				CheckboxGroup(
					label="Customise the attributes of the choice chips",
					:options="attributeAlterationOptions",
					v-model="attributeAlterations",
					alignment="flex"
				)
				RadioGroup(
					label="Customise the size of the choice chips",
					:options="sizeAlterationOptions",
					v-model="sizeAlteration"
				)
				RadioGroup(
					label="Customise the hue of the choice chips",
					:options="hueAlterationOptions",
					v-model="hueAlteration"
				)
				RadioGroup(
					label="Customise the state of the choice chips",
					:options="stateAlterationOptions",
					v-model="stateAlteration",
					alignment="grid"
				)
		MarkdownParser(:content="$t('pages.data_entry.choice_chips.content')")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownParser from "@/components/MarkdownParser.vue";
import ChoiceChips from "@/plugin/data-entry/ChoiceChips.vue";
import CheckboxGroup from "@/plugin/data-entry/CheckboxGroup.vue";
import RadioGroup from "@/plugin/data-entry/RadioGroup.vue";

export default defineComponent({
	name: "RadioPage",
	components: {
		MarkdownParser,
		ChoiceChips,
		CheckboxGroup,
		RadioGroup,
	},
	methods: {
		handleUpdate(value: any) {
			console.log(value);
		},
	},
	data() {
		return {
			value: [1, 2],
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
			attributeAlterations: ["label", "multiple"] as string[],
			attributeAlterationOptions: [
				{
					label: "Allow Multiple Selections",
					value: "multiple",
				},
				{
					label: "Label",
					value: "label",
				},
				{
					label: "Default",
					value: "default",
				},
				{
					label: "Disabled",
					value: "disabled",
				},
				{
					label: "Outline",
					value: "outline",
				},
				{
					label: "Assistive Text",
					value: "assistive-text",
				},
				{
					label: "Alert Message",
					value: "alert-message",
				},
			],
			sizeAlteration: "md" as string,
			sizeAlterationOptions: [
				{
					label: "Small",
					value: "sm",
				},
				{
					label: "Medium",
					value: "md",
				},
				{
					label: "Large",
					value: "lg",
				},
			],
			hueAlteration: "information" as string,
			hueAlterationOptions: [
				{
					label: "Information",
					value: "information",
				},
				{
					label: "Error",
					value: "error",
				},
				{
					label: "Warning",
					value: "warning",
				},
				{
					label: "Success",
					value: "success",
				},
				{
					label: "Primary",
					value: "primary",
				},
				{
					label: "Primary Variant",
					value: "primary-variant",
				},
				{
					label: "Secondary",
					value: "secondary",
				},
				{
					label: "Secondary Variant",
					value: "secondary-variant",
				},
			],
			stateAlteration: "default",
			stateAlterationOptions: [
				{
					label: "Default",
					value: "default",
				},
				{
					label: "Error",
					value: "error",
				},
				{
					label: "Warning",
					value: "warning",
				},
				{
					label: "Success",
					value: "success",
				},
			],
		};
	},
});
</script>

<style lang="scss" scoped></style>

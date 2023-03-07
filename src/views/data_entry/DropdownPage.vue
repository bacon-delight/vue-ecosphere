<template lang="pug">
.wrapper
	.wrapper__title {{ $t("pages.data_entry.dropdown.title") }}

	.wrapper__body
		.section
			.section__flex
				DropdownField(
					:label="inputAttributeAlterations.includes('label') ? 'Select your favourite fruit' : null",
					:placeholder="inputAttributeAlterations.includes('placeholder') ? 'Select an option' : null",
					:assistive-text="inputAttributeAlterations.includes('assistiveText') ? 'Firethorns are inedible, but they are good source for birds!' : null",
					:options="options",
					:state="inputStateAlteration",
					:allow-clear="inputAttributeAlterations.includes('allowClear')",
					:disabled="inputAttributeAlterations.includes('disabled')",
					:outline="inputAttributeAlterations.includes('outline')",
					:alert-message="inputAttributeAlterations.includes('alertMessage') ? 'Alert Message' : null"
				)

		.section
			.section__subtitle Playground
			.section__description Customise the options below to see changes on the dropdown
			.section__playground
				CheckboxGroup(
					label="Customise the attributes of the input field",
					:options="inputAttributeAlterationOptions",
					v-model="inputAttributeAlterations",
					alignment="flex",
					:assistive-text="inputAttributeAlterationsAssistiveText"
				)
				RadioGroup(
					label="Customise the state of the input field",
					:options="inputStateAlterationOptions",
					v-model="inputStateAlteration",
					alignment="grid",
					:assistive-text="inputStateAlterationsAssistiveText"
				)
		MarkdownParser(:content="$t('pages.data_entry.dropdown.content')")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownParser from "@/components/MarkdownParser.vue";
import DropdownField from "@/plugin/data-entry/DropdownField.vue";
import CheckboxGroup from "@/plugin/data-entry/CheckboxGroup.vue";
import RadioGroup from "@/plugin/data-entry/RadioGroup.vue";

export default defineComponent({
	name: "DropdownPage",
	components: {
		MarkdownParser,
		DropdownField,
		CheckboxGroup,
		RadioGroup,
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
			inputAttributeAlterations: ["label", "placeholder"] as string[],
			inputAttributeAlterationOptions: [
				{
					label: "Label",
					value: "label",
				},
				{
					label: "Placeholder",
					value: "placeholder",
				},
				{
					label: "Allow Clear",
					value: "allowClear",
				},
				// {
				// 	label: "Default",
				// 	value: "default",
				// },
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
					value: "assistiveText",
				},
				{
					label: "Alert Message",
					value: "alertMessage",
				},
			],
			inputTypeAlteration: "text",
			inputTypeAlterationOptions: [
				{
					label: "Text",
					value: "text",
				},
				{
					label: "Email",
					value: "email",
				},
				{
					label: "Number",
					value: "number",
				},
				{
					label: "Password",
					value: "password",
				},
				{
					label: "Search",
					value: "search",
				},
			],
			inputStateAlteration: "default",
			inputStateAlterationOptions: [
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
	computed: {
		inputAttributeAlterationsAssistiveText(): string | null {
			if (
				this.inputAttributeAlterations.includes("alertMessage") &&
				this.inputStateAlteration === "default"
			) {
				return "Change the state of the input field to something other than `default` to see the alert message";
			}
			if (
				this.inputAttributeAlterations.includes("maxLength") &&
				!this.inputAttributeAlterations.includes("showLength")
			) {
				return "Activate `Show Length` to see the length with the input field";
			}
			return null;
		},
		inputStateAlterationsAssistiveText(): string | null {
			if (
				this.inputStateAlteration !== "default" &&
				!this.inputAttributeAlterations.includes("alertMessage")
			) {
				return "Select the 'Alert Message' attribute to see a message with the input field";
			}
			return null;
		},
	},
});
</script>

<style lang="scss" scoped></style>

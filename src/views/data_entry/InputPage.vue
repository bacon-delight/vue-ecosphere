<template lang="pug">
.wrapper
	.wrapper__title {{ $t("pages.data_entry.input.title") }}

	.wrapper__body
		.section
			.section__flex
				InputField(
					:label="inputAttributeAlterations.includes('label') ? 'Label' : null",
					:placeholder="inputAttributeAlterations.includes('placeholder') ? 'Placeholder' : null",
					:type="inputTypeAlteration",
					:default="inputAttributeAlterations.includes('default') ? 'Default Value' : null",
					:state="inputStateAlteration",
					:allow-clear="inputAttributeAlterations.includes('allowClear')",
					:disabled="inputAttributeAlterations.includes('disabled')",
					:outline="inputAttributeAlterations.includes('outline')",
					:max-length="inputAttributeAlterations.includes('maxLength') ? 15 : null",
					:show-length="inputAttributeAlterations.includes('showLength')",
					:alert-message="inputAttributeAlterations.includes('alertMessage') ? 'Alert Message' : null",
					:assistive-text="inputAttributeAlterations.includes('assistiveText') ? 'Assistive Text' : null"
				)

		.section
			.section__subtitle Playground
			.section__description Customise the options below to see changes on the input field
			.section__playground
				RadioGroup(
					label="Customise the type of the input field",
					:options="inputTypeAlterationOptions",
					v-model="inputTypeAlteration",
					alignment="grid"
				)
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

		MarkdownParser(:content="$t('pages.data_entry.input.content')")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownParser from "@/components/MarkdownParser.vue";
import InputField from "@/plugin/data-entry/InputField.vue";
import CheckboxGroup from "@/plugin/data-entry/CheckboxGroup.vue";
import RadioGroup from "@/plugin/data-entry/RadioGroup.vue";

export default defineComponent({
	name: "InputPage",
	components: {
		MarkdownParser,
		InputField,
		CheckboxGroup,
		RadioGroup,
	},
	data() {
		return {
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
					value: "assistiveText",
				},
				{
					label: "Alert Message",
					value: "alertMessage",
				},
				{
					label: "Max Length",
					value: "maxLength",
				},
				{
					label: "Show Length",
					value: "showLength",
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

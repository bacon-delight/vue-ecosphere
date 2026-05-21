<template>
	<div class="wrapper">
		<div class="wrapper__title">
			{{ $t("pages.data_entry.search_dropdown.title") }}
		</div>
		<div class="wrapper__body">
			<div class="section">
				<div class="section__flex">
					<SearchDropdown
						:label="
							inputAttributeAlterations.includes('label')
								? 'Select your favourite fruit'
								: null
						"
						:placeholder="
							inputAttributeAlterations.includes('placeholder')
								? 'Search & Select Option'
								: null
						"
						:assistive-text="
							inputAttributeAlterations.includes('assistiveText')
								? 'Firethorns are inedible, but they are good source for birds!'
								: null
						"
						:options="options"
						:state="inputStateAlteration"
						:allow-clear="
							inputAttributeAlterations.includes('allowClear')
						"
						:disabled="
							inputAttributeAlterations.includes('disabled')
						"
						:outline="inputAttributeAlterations.includes('outline')"
						:alert-message="
							inputAttributeAlterations.includes('alertMessage')
								? 'Alert Message'
								: null
						"
						:default="
							inputAttributeAlterations.includes('default')
								? 2
								: null
						"
						:hue="inputHueAlteration"
						expand="below"
					></SearchDropdown>
				</div>
			</div>
			<div class="section">
				<div class="section__subtitle">Playground</div>
				<div class="section__description">
					Customise the options below to see changes on the dropdown
				</div>
				<div class="section__playground">
					<CheckboxGroup
						v-model="inputAttributeAlterations"
						label="Customise the attributes of the dropdown"
						:options="inputAttributeAlterationOptions"
						alignment="flex"
						:assistive-text="inputAttributeAlterationsAssistiveText"
					></CheckboxGroup>
					<RadioGroup
						v-model="inputStateAlteration"
						label="Customise the state of the dropdown"
						:options="inputStateAlterationOptions"
						alignment="grid"
						:assistive-text="inputStateAlterationsAssistiveText"
					></RadioGroup>
					<RadioGroup
						v-model="inputHueAlteration"
						label="Customise the hue of the dropdown"
						:options="inputHueAlterationOptions"
						alignment="flex"
						assistive-text="The selected option in the dropdown will be highlighted"
					></RadioGroup>
				</div>
			</div>
			<MarkdownParser
				:content="$t('pages.data_entry.search_dropdown.content')"
			></MarkdownParser>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownParser from "@/components/MarkdownParser.vue";
import DropdownField from "@ecosphere/data-entry/DropdownField.vue";
import CheckboxGroup from "@ecosphere/data-entry/CheckboxGroup.vue";
import RadioGroup from "@ecosphere/data-entry/RadioGroup.vue";
import SearchDropdown from "@ecosphere/data-entry/SearchDropdown.vue";

export default defineComponent({
	name: "DropdownPage",
	components: {
		MarkdownParser,
		DropdownField,
		CheckboxGroup,
		RadioGroup,
		SearchDropdown,
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
			inputHueAlteration: "information",
			inputHueAlterationOptions: [
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

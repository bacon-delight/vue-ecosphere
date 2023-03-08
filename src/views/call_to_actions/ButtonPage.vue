<template lang="pug">
.wrapper
	.wrapper__title {{ $t("pages.call_to_actions.button.title") }}

	.wrapper__body
		.section
			.section__flex
				ButtonComponent(label="Primary", hue="primary")
				ButtonComponent(label="Cancel", hue="error", icon="ri-close-circle-line")
				ButtonComponent(label="Accept", hue="success", icon="ri-check-double-line")
				ButtonComponent(label="Disabled", hue="success", :disabled="true")

		.section
			.section__subtitle Playground
			ButtonComponent(
				label="Customise Me!",
				:size="sizeAlteration",
				:hue="hueAlteration",
				:ghost="otherAlterations.includes('ghost')",
				:disabled="otherAlterations.includes('disabled')",
				:icon="otherAlterations.includes('icon') ? 'ri-artboard-2-line' : null",
				:icon-position="iconPositionAlteration"
			)
			.section__description Customise the options below to see changes in the button
			.section__playground
				RadioGroup(
					label="Customise the size of the button",
					:options="sizeAlterationOptions",
					v-model="sizeAlteration",
					alignment="flex"
				)
				RadioGroup(
					label="Customise the hue of the button",
					:options="hueAlterationOptions",
					v-model="hueAlteration",
					alignment="flex"
				)
				CheckboxGroup(
					label="Customise the attributes of the button",
					:options="otherAlterationOptions",
					v-model="otherAlterations",
					alignment="flex"
				)
				RadioGroup(
					v-if="otherAlterations.includes('icon')",
					label="Customise the position of the icon in the button",
					:options="iconPositionAlterationOptions",
					v-model="iconPositionAlteration",
					alignment="grid"
				)

		MarkdownParser(:content="$t('pages.call_to_actions.button.content')")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownParser from "@/components/MarkdownParser.vue";
import ButtonComponent from "@/plugin/call-to-action/ButtonComponent.vue";
import RadioGroup from "@/plugin/data-entry/RadioGroup.vue";
import CheckboxGroup from "@/plugin/data-entry/CheckboxGroup.vue";

export default defineComponent({
	name: "ButtonPage",
	components: {
		MarkdownParser,
		ButtonComponent,
		RadioGroup,
		CheckboxGroup,
	},
	data() {
		return {
			sizeAlteration: "md",
			sizeAlterationOptions: [
				{
					label: "Extra Small",
					value: "xs",
				},
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
				{
					label: "Extra Large",
					value: "xl",
				},
			],
			hueAlteration: "information",
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
			otherAlterations: [],
			otherAlterationOptions: [
				{
					label: "Ghost",
					value: "ghost",
				},
				{
					label: "Disabled",
					value: "disabled",
				},
				{
					label: "Icon",
					value: "icon",
				},
			],
			iconPositionAlteration: "after",
			iconPositionAlterationOptions: [
				{
					label: "Before",
					value: "before",
				},
				{
					label: "After",
					value: "after",
				},
			],
		};
	},
});
</script>

<style lang="scss" scoped></style>

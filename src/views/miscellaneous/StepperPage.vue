<template lang="pug">
.wrapper
	.wrapper__title {{ $t("pages.miscellaneous.stepper.title") }}
	.wrapper__body
		.section
			.section__flex.stepper-wrapper
				StepperComponent(
					:current="currentStepAlteration",
					:responsive="attributeAlterations.includes('responsive')",
					:hue="hueAlteration",
					:orientation="orientationAlteration",
					:steps="steps",
					:state="stateAlteration"
				)

		.section
			.section__subtitle Playground
			.section__description Customise the options below to see changes on the stepper
			.section__playground
				CheckboxGroup(
					label="Customise the attributes of the stepper",
					:options="attributeAlterationOptions",
					v-model="attributeAlterations",
					alignment="flex"
				)
				RadioGroup(
					label="Customise the orientation of the stepper",
					:options="orientationAlterationOptions",
					v-model="orientationAlteration"
				)
				RadioGroup(
					label="Select the current step of the stepper",
					:options="currentStepAlterationOptions",
					v-model="currentStepAlteration"
				)
				RadioGroup(
					label="Select the state of the current step in the stepper",
					:options="stateAlterationOptions",
					v-model="stateAlteration"
				)
				RadioGroup(
					label="Customise the hue of the stepper",
					:options="hueAlterationOptions",
					v-model="hueAlteration"
				)
		MarkdownParser(:content="$t('pages.miscellaneous.stepper.content')")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownParser from "@/components/MarkdownParser.vue";
import StepperComponent from "@/plugin/miscellaneous/StepperComponent.vue";
import CheckboxGroup from "@/plugin/data-entry/CheckboxGroup.vue";
import RadioGroup from "@/plugin/data-entry/RadioGroup.vue";

export default defineComponent({
	name: "StepperPage",
	components: {
		MarkdownParser,
		StepperComponent,
		CheckboxGroup,
		RadioGroup,
	},
	data() {
		return {
			steps: [
				{
					label: "Step 1",
					description: "Install Ecosphere in your project",
				},
				{
					label: "Step 2",
					icon: "ri-home-2-line",
					description: "Configure your main.ts file",
				},
				{
					label: "Step 3",
					description: "You're all set!",
				},
				{
					label: "Step 4",
					description:
						"Review theme customisations to match your need",
				},
			],
			attributeAlterations: ["responsive"] as string[],
			attributeAlterationOptions: [
				{
					label: "Responsive",
					value: "responsive",
				},
			],
			currentStepAlteration: 0 as number,
			currentStepAlterationOptions: [
				{
					label: "Step 1",
					value: 0,
				},
				{
					label: "Step 2",
					value: 1,
				},
				{
					label: "Step 3",
					value: 2,
				},
				{
					label: "Step 4",
					value: 3,
				},
			],
			stateAlteration: "in-progress" as string,
			stateAlterationOptions: [
				{
					label: "Awaiting",
					value: "awaiting",
				},
				{
					label: "In Progress",
					value: "in-progress",
				},
				{
					label: "Completed",
					value: "completed",
				},
				{
					label: "Error",
					value: "error",
				},
				{
					label: "Warning",
					value: "warning",
				},
			],
			orientationAlteration: "horizontal" as string,
			orientationAlterationOptions: [
				{
					label: "Horizontal",
					value: "horizontal",
				},
				{
					label: "Vertical",
					value: "vertical",
				},
			],
			hueAlteration: "information" as string,
			hueAlterationOptions: [
				{
					label: "Information",
					value: "information",
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
});
</script>

<style lang="scss" scoped>
.stepper-wrapper {
	min-width: 600px;
	overflow-x: auto;
}
</style>

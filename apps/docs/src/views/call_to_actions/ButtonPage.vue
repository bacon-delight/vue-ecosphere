<template>
	<div class="wrapper">
		<div class="wrapper__title">
			{{ $t("pages.call_to_actions.button.title") }}
		</div>
		<div class="wrapper__body">
			<div class="section">
				<div class="section__flex">
					<ButtonComponent
						label="Primary"
						hue="primary"
					></ButtonComponent>
					<ButtonComponent
						label="Cancel"
						hue="error"
						icon="ri-close-circle-line"
					></ButtonComponent>
					<ButtonComponent
						label="Accept"
						hue="success"
						icon="ri-check-double-line"
					></ButtonComponent>
					<ButtonComponent
						label="Disabled"
						hue="success"
						:disabled="true"
					></ButtonComponent>
				</div>
			</div>
			<div class="section">
				<div class="section__subtitle">Playground</div>
				<ButtonComponent
					label="Customise Me!"
					:size="sizeAlteration"
					:hue="hueAlteration"
					:ghost="otherAlterations.includes('ghost')"
					:disabled="otherAlterations.includes('disabled')"
					:icon="
						otherAlterations.includes('icon')
							? 'ri-artboard-2-line'
							: null
					"
					:icon-position="iconPositionAlteration"
				></ButtonComponent>
				<div class="section__description">
					Customise the options below to see changes in the button
				</div>
				<div class="section__playground">
					<RadioGroup
						v-model="sizeAlteration"
						label="Customise the size of the button"
						:options="sizeAlterationOptions"
						alignment="flex"
					></RadioGroup>
					<RadioGroup
						v-model="hueAlteration"
						label="Customise the hue of the button"
						:options="hueAlterationOptions"
						alignment="flex"
					></RadioGroup>
					<CheckboxGroup
						v-model="otherAlterations"
						label="Customise the attributes of the button"
						:options="otherAlterationOptions"
						alignment="flex"
					></CheckboxGroup>
					<RadioGroup
						v-if="otherAlterations.includes('icon')"
						v-model="iconPositionAlteration"
						label="Customise the position of the icon in the button"
						:options="iconPositionAlterationOptions"
						alignment="grid"
					></RadioGroup>
				</div>
			</div>
			<MarkdownParser
				:content="$t('pages.call_to_actions.button.content')"
			></MarkdownParser>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownParser from "@/components/MarkdownParser.vue";
import ButtonComponent from "@ecosphere/call-to-action/ButtonComponent.vue";
import RadioGroup from "@ecosphere/data-entry/RadioGroup.vue";
import CheckboxGroup from "@ecosphere/data-entry/CheckboxGroup.vue";

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

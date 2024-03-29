<template lang="pug">
.wrapper
	.wrapper__title {{ $t("pages.navigation.tabs.title") }}
	.wrapper__body
		.section
			TabNavigation(
				:options="options",
				v-model="value",
				:icon-position="positionAlteration",
				:hue="hueAlteration",
				:disabled="attributeAlterations.includes('disabled') ? true : false",
				:default="attributeAlterations.includes('default') ? 'two' : null"
			)

		.section
			.section__subtitle Playground
			.section__description Customise the options below to see changes on the dropdown
			.section__playground
				CheckboxGroup(
					label="Customise the attributes of the tab navigation",
					:options="attributeAlterationOptions",
					v-model="attributeAlterations",
					alignment="flex"
				)
				RadioGroup(
					label="Customise the position of the icons",
					:options="positionAlterationOptions",
					v-model="positionAlteration",
					alignment="flex"
				)
				RadioGroup(
					label="Customise the hue of the tab navigation",
					:options="hueAlterationOptions",
					v-model="hueAlteration"
				)

		MarkdownParser(:content="$t('pages.navigation.tabs.content')")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownParser from "@/components/MarkdownParser.vue";
import TabNavigation from "@/plugin/navigation/TabNavigation.vue";
import CheckboxGroup from "@/plugin/data-entry/CheckboxGroup.vue";
import RadioGroup from "@/plugin/data-entry/RadioGroup.vue";

export default defineComponent({
	name: "TabNavigationPage",
	components: {
		MarkdownParser,
		TabNavigation,
		CheckboxGroup,
		RadioGroup,
	},
	data() {
		return {
			value: null,
			options: [
				{
					label: "Home",
					icon: "ri-home-line",
					value: "one",
				},
				{
					label: "Dashboard",
					icon: "ri-dashboard-line",
					value: "two",
				},
				{
					label: "Analytics",
					icon: "ri-pie-chart-line",
					value: "three",
					disabled: true,
				},
				{
					label: "Settings",
					icon: "ri-settings-line",
					value: "five",
				},
				{
					label: "Logout",
					icon: "ri-logout-circle-line",
					value: "six",
				},
			],
			attributeAlterations: [] as string[],
			attributeAlterationOptions: [
				{
					label: "Default",
					value: "default",
				},
				{
					label: "Disabled",
					value: "disabled",
				},
			],
			positionAlteration: "before" as string | null,
			positionAlterationOptions: [
				{
					label: "Above",
					value: "above",
				},
				{
					label: "Before",
					value: "before",
				},
				{
					label: "After",
					value: "after",
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
		};
	},
});
</script>

<style lang="scss" scoped></style>

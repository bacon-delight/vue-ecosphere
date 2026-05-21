<template>
	<div class="wrapper">
		<div class="wrapper__title">
			{{ $t("pages.navigation.tabs.title") }}
		</div>
		<div class="wrapper__body">
			<div class="section">
				<TabNavigation
					v-model="value"
					:options="options"
					:icon-position="positionAlteration"
					:hue="hueAlteration"
					:disabled="
						attributeAlterations.includes('disabled') ? true : false
					"
					:default="
						attributeAlterations.includes('default') ? 'two' : null
					"
				></TabNavigation>
			</div>
			<div class="section">
				<div class="section__subtitle">Playground</div>
				<div class="section__description">
					Customise the options below to see changes on the dropdown
				</div>
				<div class="section__playground">
					<CheckboxGroup
						v-model="attributeAlterations"
						label="Customise the attributes of the tab navigation"
						:options="attributeAlterationOptions"
						alignment="flex"
					></CheckboxGroup>
					<RadioGroup
						v-model="positionAlteration"
						label="Customise the position of the icons"
						:options="positionAlterationOptions"
						alignment="flex"
					></RadioGroup>
					<RadioGroup
						v-model="hueAlteration"
						label="Customise the hue of the tab navigation"
						:options="hueAlterationOptions"
					></RadioGroup>
				</div>
			</div>
			<MarkdownParser
				:content="$t('pages.navigation.tabs.content')"
			></MarkdownParser>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownParser from "@/components/MarkdownParser.vue";
import TabNavigation from "@ecosphere/navigation/TabNavigation.vue";
import CheckboxGroup from "@ecosphere/data-entry/CheckboxGroup.vue";
import RadioGroup from "@ecosphere/data-entry/RadioGroup.vue";

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

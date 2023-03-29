<template lang="pug">
.wrapper
	.wrapper__title {{ $t("pages.miscellaneous.tag.title") }}
	.wrapper__body
		.section
			.section__flex
				TagComponent(
					label="Label",
					:size="sizeAlteration",
					:allow-clear="attributeAlterations.includes('allowClear')",
					:outline="attributeAlterations.includes('outline')",
					:hue="hueAlteration"
				)

		.section
			.section__subtitle Playground
			.section__description Customise the options below to see changes on the tag
			.section__playground
				CheckboxGroup(
					label="Customise the attributes of the tag",
					:options="attributeAlterationOptions",
					v-model="attributeAlterations",
					alignment="flex"
				)
				RadioGroup(
					label="Customise the size of the tag",
					:options="sizeAlterationOptions",
					v-model="sizeAlteration"
				)
				RadioGroup(
					label="Customise the hue of the tag",
					:options="hueAlterationOptions",
					v-model="hueAlteration"
				)
		MarkdownParser(:content="$t('pages.miscellaneous.tag.content')")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownParser from "@/components/MarkdownParser.vue";
import TagComponent from "@/plugin/miscellaneous/TagComponent.vue";
import CheckboxGroup from "@/plugin/data-entry/CheckboxGroup.vue";
import RadioGroup from "@/plugin/data-entry/RadioGroup.vue";

export default defineComponent({
	name: "TagPage",
	components: {
		MarkdownParser,
		TagComponent,
		CheckboxGroup,
		RadioGroup,
	},
	data() {
		return {
			attributeAlterations: ["label"] as string[],
			attributeAlterationOptions: [
				{
					label: "Label",
					value: "label",
					disabled: true,
				},
				{
					label: "Allow Clear",
					value: "allowClear",
				},
				{
					label: "Outline",
					value: "outline",
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
		};
	},
});
</script>

<style lang="scss" scoped></style>

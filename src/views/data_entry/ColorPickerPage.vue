<template lang="pug">
.wrapper
	.wrapper__title {{ $t("pages.data_entry.color_picker.title") }}
	.wrapper__body
		.section
			.section__flex
				ColorPicker(
					:label="attributeAlterations.includes('label') ? 'What is your favourite color?' : null",
					:outline="attributeAlterations.includes('outline')",
					:disabled="attributeAlterations.includes('disabled')",
					:overlay="attributeAlterations.includes('overlay')",
					:default="attributeAlterations.includes('default') ? '#ff7878' : null",
					:overlay-color="attributeAlterations.includes('overlayColor') ? '#ade8f4' : '#ffffff'"
				)

		.section
			.section__subtitle Playground
			.section__description Customise the options below to see changes on the color picker
			.section__playground
				CheckboxGroup(
					label="Customise the attributes of the dropdown",
					:options="attributeAlterationOptions",
					v-model="attributeAlterations",
					alignment="flex"
				)

		MarkdownParser(:content="$t('pages.data_entry.color_picker.content')")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownParser from "@/components/MarkdownParser.vue";
import ColorPicker from "@/plugin/data-entry/ColorPicker.vue";
import CheckboxGroup from "@/plugin/data-entry/CheckboxGroup.vue";

export default defineComponent({
	name: "ColorPickerPage",
	components: {
		MarkdownParser,
		ColorPicker,
		CheckboxGroup,
	},
	data() {
		return {
			attributeAlterations: ["label", "placeholder"] as string[],
			attributeAlterationOptions: [
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
					label: "Overlay",
					value: "overlay",
				},
				{
					label: "Overlay Color",
					value: "overlayColor",
				},
			],
		};
	},
});
</script>

<style lang="scss" scoped></style>

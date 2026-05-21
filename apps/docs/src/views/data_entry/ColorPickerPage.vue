<template>
	<div class="wrapper">
		<div class="wrapper__title">
			{{ $t("pages.data_entry.color_picker.title") }}
		</div>
		<div class="wrapper__body">
			<div class="section">
				<div class="section__flex">
					<ColorPicker
						:label="
							attributeAlterations.includes('label')
								? 'What is your favourite color?'
								: null
						"
						:outline="attributeAlterations.includes('outline')"
						:disabled="attributeAlterations.includes('disabled')"
						:overlay="attributeAlterations.includes('overlay')"
						:default="
							attributeAlterations.includes('default')
								? '#ff7878'
								: null
						"
						:overlay-color="
							attributeAlterations.includes('overlayColor')
								? '#ade8f4'
								: '#ffffff'
						"
					></ColorPicker>
				</div>
			</div>
			<div class="section">
				<div class="section__subtitle">Playground</div>
				<div class="section__description">
					Customise the options below to see changes on the color
					picker
				</div>
				<div class="section__playground">
					<CheckboxGroup
						v-model="attributeAlterations"
						label="Customise the attributes of the dropdown"
						:options="attributeAlterationOptions"
						alignment="flex"
					></CheckboxGroup>
				</div>
			</div>
			<MarkdownParser
				:content="$t('pages.data_entry.color_picker.content')"
			></MarkdownParser>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownParser from "@/components/MarkdownParser.vue";
import ColorPicker from "@ecosphere/data-entry/ColorPicker.vue";
import CheckboxGroup from "@ecosphere/data-entry/CheckboxGroup.vue";

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

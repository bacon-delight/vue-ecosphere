<template lang="pug">
.wrapper
	.wrapper__title {{ $t("pages.design_system.colors.title") }}
	.wrapper__body
		.section
			.section__description Play around with the colors below to change the color palette across the design system. You can navigate to other pages as well to view the changes after setting them here. If you refresh, the changes will be reset.

		.section
			ButtonComponent(
				label="Restore Defaults",
				size="sm",
				hue="error",
				icon="ri-arrow-go-back-line",
				icon-position="before",
				@click="restoreDefaults"
			)

		.section
			.section__subtitle Elementary Colors
			.section__grid
				ColorField(
					label="Dark",
					v-model="colors.dark",
					:outline="true",
					:overlay="true",
					:overlay-color="colors['light-faded']",
					@update="handleChange"
				)
				ColorField(
					label="Dark - Faded",
					v-model="colors['dark-faded']",
					:outline="true",
					:overlay="true",
					:overlay-color="colors.light",
					@update="handleChange"
				)
				ColorField(
					label="Light",
					v-model="colors.light",
					:outline="true",
					:overlay="true",
					:overlay-color="colors['dark-faded']",
					@update="handleChange"
				)
				ColorField(
					label="Light - Faded",
					v-model="colors['light-faded']",
					:outline="true",
					:overlay="true",
					:overlay-color="colors.dark",
					@update="handleChange"
				)

		.section
			.section__subtitle Primary Colors
			.section__grid
				ColorField(
					label="Primary",
					v-model="colors.primary",
					:outline="true",
					:overlay="true",
					:overlay-color="colors['primary-contrast']",
					@update="handleChange"
				)
				ColorField(
					label="Primary - Contrast",
					v-model="colors['primary-contrast']",
					:outline="true",
					:overlay="true",
					:overlay-color="colors['primary']",
					@update="handleChange"
				)
				ColorField(
					label="Primary Variant",
					v-model="colors['primary-variant']",
					:outline="true",
					:overlay="true",
					:overlay-color="colors['primary-variant-contrast']",
					@update="handleChange"
				)
				ColorField(
					label="Primary Variant - Contrast",
					v-model="colors['primary-variant-contrast']",
					:outline="true",
					:overlay="true",
					:overlay-color="colors['primary-variant']",
					@update="handleChange"
				)

		.section
			.section__subtitle Secondary Colors
			.section__grid
				ColorField(
					label="Secondary",
					v-model="colors.secondary",
					:outline="true",
					:overlay="true",
					:overlay-color="colors['secondary-contrast']",
					@update="handleChange"
				)
				ColorField(
					label="Secondary - Contrast",
					v-model="colors['secondary-contrast']",
					:outline="true",
					:overlay="true",
					:overlay-color="colors['secondary']",
					@update="handleChange"
				)
				ColorField(
					label="Secondary Variant",
					v-model="colors['secondary-variant']",
					:outline="true",
					:overlay="true",
					:overlay-color="colors['secondary-variant-contrast']",
					@update="handleChange"
				)
				ColorField(
					label="Secondary Variant - Contrast",
					v-model="colors['secondary-variant-contrast']",
					:outline="true",
					:overlay="true",
					:overlay-color="colors['secondary-variant']",
					@update="handleChange"
				)

		.section
			.section__subtitle Helpers
			.section__grid
				ColorField(
					label="Hyperlink",
					v-model="colors.hyperlink",
					:outline="true",
					:overlay="true",
					:overlay-color="colors.dark",
					@update="handleChange"
				)
				ColorField(
					label="Offline",
					v-model="colors.offline",
					:outline="true",
					:overlay="true",
					:overlay-color="colors.dark",
					@update="handleChange"
				)
				ColorField(
					label="Divider",
					v-model="colors.divider",
					:outline="true",
					:overlay="true",
					:overlay-color="colors.dark",
					@update="handleChange"
				)
				ColorField(
					label="Disabled",
					v-model="colors.disabled",
					:outline="true",
					:overlay="true",
					:overlay-color="colors.dark",
					@update="handleChange"
				)

		.section
			.section__subtitle Indicators
			.section__grid
				ColorField(
					label="Error",
					v-model="colors.error",
					:outline="true",
					:overlay="true",
					:overlay-color="colors.dark",
					@update="handleChange"
				)
				ColorField(
					label="Success",
					v-model="colors.success",
					:outline="true",
					:overlay="true",
					:overlay-color="colors.dark",
					@update="handleChange"
				)
				ColorField(
					label="Warning",
					v-model="colors.warning",
					:outline="true",
					:overlay="true",
					:overlay-color="colors.dark",
					@update="handleChange"
				)
				ColorField(
					label="Information",
					v-model="colors.information",
					:outline="true",
					:overlay="true",
					:overlay-color="colors.dark",
					@update="handleChange"
				)
				ColorField(
					label="Error Variant",
					v-model="colors['error-variant']",
					:outline="true",
					:overlay="true",
					:overlay-color="colors.dark",
					@update="handleChange"
				)
				ColorField(
					label="Success Variant",
					v-model="colors['success-variant']",
					:outline="true",
					:overlay="true",
					:overlay-color="colors.dark",
					@update="handleChange"
				)
				ColorField(
					label="Warning Variant",
					v-model="colors['warning-variant']",
					:outline="true",
					:overlay="true",
					:overlay-color="colors.dark",
					@update="handleChange"
				)
				ColorField(
					label="Information Variant",
					v-model="colors['information-variant']",
					:outline="true",
					:overlay="true",
					:overlay-color="colors.dark",
					@update="handleChange"
				)

		MarkdownParser(:content="$t('pages.design_system.colors.content')")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownParser from "@/components/MarkdownParser.vue";
import ColorField from "@/plugin/data-entry/ColorField.vue";
import ButtonComponent from "@/plugin/call-to-action/ButtonComponent.vue";
import default_colors from "@/assets/utilities/colors";

export default defineComponent({
	name: "ColorsPage",
	components: {
		MarkdownParser,
		ColorField,
		ButtonComponent,
	},
	data() {
		return {
			value: "",
			colors: { ...default_colors },
		};
	},
	methods: {
		handleChange(): void {
			this.$ecosphere.theming.setColors(this.colors);
		},
		restoreDefaults(): void {
			this.$ecosphere.theming.setColors(default_colors);
		},
	},
});
</script>

<style lang="scss" scoped></style>

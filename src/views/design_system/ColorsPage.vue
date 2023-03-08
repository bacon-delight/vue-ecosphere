<template lang="pug">
.wrapper
	.wrapper__title {{ $t("pages.design_system.colors.title") }}
	.wrapper__body
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
			.section__subtitle Helper Colors
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
			.section__subtitle Helper Colors
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

export default defineComponent({
	name: "ColorsPage",
	components: {
		MarkdownParser,
		ColorField,
	},
	data() {
		return {
			value: "",
			colors: {
				dark: "#0d0f11",
				"dark-faded": "#202b35",
				light: "#ffffff",
				"light-faded": "#eeeeee",
				primary: "#0b3567",
				"primary-contrast": "#fefefe",
				"primary-variant": "#ade8f4",
				"primary-variant-contrast": "#1a2129",
				secondary: "#bbadff",
				"secondary-contrast": "#160a22",
				"secondary-variant": "#c4c7ff",
				"secondary-variant-contrast": "#18192e",
				hyperlink: "#56abff",
				offline: "#e8eae6",
				divider: "#d2d0d0",
				disabled: "#a1a1a1",
				error: "#ff7878",
				success: "#71e2b2",
				warning: "#ffcc1d",
				information: "#8dc6ff",
				"error-variant": "#fc9a9a",
				"success-variant": "#96f8cf",
				"warning-variant": "#fad459",
				"information-variant": "#a6ccf1",
			},
		};
	},
	methods: {
		handleChange(): void {
			this.$ecosphere.theming.setColors(this.colors);
		},
	},
});
</script>

<style lang="scss" scoped></style>

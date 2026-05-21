<template>
	<div class="wrapper">
		<div class="wrapper__title">{{ $t("pages.design_system.colors.title") }}</div>
		<div class="wrapper__body">
			<div class="section">
				<div class="section__description">Play around with the colors below to change the color palette across the design system. You can navigate to other pages as well to view the changes after setting them here. If you refresh, the changes will be reset.</div>
			</div>
			<div class="section">
				<div class="section__flex">
					<ButtonComponent label="Restore Defaults" size="sm" hue="error" icon="ri-arrow-go-back-line" icon-position="before" @click="restoreDefaults"></ButtonComponent>
					<ButtonComponent label="Toggle Theme" size="sm" icon="ri-arrow-left-right-line" icon-position="before" @click="toggleTheme"></ButtonComponent>
				</div>
			</div>
			<div class="section">
				<div class="section__subtitle">Elementary Colors</div>
				<div class="section__grid">
					<ColorPicker label="Dark" v-model="colors.dark" :outline="true" :overlay="true" :overlay-color="colors['light-faded']" @update="handleChange"></ColorPicker>
					<ColorPicker label="Dark - Faded" v-model="colors['dark-faded']" :outline="true" :overlay="true" :overlay-color="colors.light" @update="handleChange"></ColorPicker>
					<ColorPicker label="Light" v-model="colors.light" :outline="true" :overlay="true" :overlay-color="colors['dark-faded']" @update="handleChange"></ColorPicker>
					<ColorPicker label="Light - Faded" v-model="colors['light-faded']" :outline="true" :overlay="true" :overlay-color="colors.dark" @update="handleChange"></ColorPicker>
				</div>
			</div>
			<div class="section">
				<div class="section__subtitle">Primary Colors</div>
				<div class="section__grid">
					<ColorPicker label="Primary" v-model="colors.primary" :outline="true" :overlay="true" :overlay-color="colors['primary-contrast']" @update="handleChange"></ColorPicker>
					<ColorPicker label="Primary - Contrast" v-model="colors['primary-contrast']" :outline="true" :overlay="true" :overlay-color="colors['primary']" @update="handleChange"></ColorPicker>
					<ColorPicker label="Primary Variant" v-model="colors['primary-variant']" :outline="true" :overlay="true" :overlay-color="colors['primary-variant-contrast']" @update="handleChange"></ColorPicker>
					<ColorPicker label="Primary Variant - Contrast" v-model="colors['primary-variant-contrast']" :outline="true" :overlay="true" :overlay-color="colors['primary-variant']" @update="handleChange"></ColorPicker>
				</div>
			</div>
			<div class="section">
				<div class="section__subtitle">Secondary Colors</div>
				<div class="section__grid">
					<ColorPicker label="Secondary" v-model="colors.secondary" :outline="true" :overlay="true" :overlay-color="colors['secondary-contrast']" @update="handleChange"></ColorPicker>
					<ColorPicker label="Secondary - Contrast" v-model="colors['secondary-contrast']" :outline="true" :overlay="true" :overlay-color="colors['secondary']" @update="handleChange"></ColorPicker>
					<ColorPicker label="Secondary Variant" v-model="colors['secondary-variant']" :outline="true" :overlay="true" :overlay-color="colors['secondary-variant-contrast']" @update="handleChange"></ColorPicker>
					<ColorPicker label="Secondary Variant - Contrast" v-model="colors['secondary-variant-contrast']" :outline="true" :overlay="true" :overlay-color="colors['secondary-variant']" @update="handleChange"></ColorPicker>
				</div>
			</div>
			<div class="section">
				<div class="section__subtitle">Helpers</div>
				<div class="section__grid">
					<ColorPicker label="Hyperlink" v-model="colors.hyperlink" :outline="true" :overlay="true" :overlay-color="colors.dark" @update="handleChange"></ColorPicker>
					<ColorPicker label="Offline" v-model="colors.offline" :outline="true" :overlay="true" :overlay-color="colors.dark" @update="handleChange"></ColorPicker>
					<ColorPicker label="Divider" v-model="colors.divider" :outline="true" :overlay="true" :overlay-color="colors.dark" @update="handleChange"></ColorPicker>
					<ColorPicker label="Disabled" v-model="colors.disabled" :outline="true" :overlay="true" :overlay-color="colors.dark" @update="handleChange"></ColorPicker>
				</div>
			</div>
			<div class="section">
				<div class="section__subtitle">Indicators</div>
				<div class="section__grid">
					<ColorPicker label="Error" v-model="colors.error" :outline="true" :overlay="true" :overlay-color="colors.dark" @update="handleChange"></ColorPicker>
					<ColorPicker label="Success" v-model="colors.success" :outline="true" :overlay="true" :overlay-color="colors.dark" @update="handleChange"></ColorPicker>
					<ColorPicker label="Warning" v-model="colors.warning" :outline="true" :overlay="true" :overlay-color="colors.dark" @update="handleChange"></ColorPicker>
					<ColorPicker label="Information" v-model="colors.information" :outline="true" :overlay="true" :overlay-color="colors.dark" @update="handleChange"></ColorPicker>
					<ColorPicker label="Error Variant" v-model="colors['error-variant']" :outline="true" :overlay="true" :overlay-color="colors.dark" @update="handleChange"></ColorPicker>
					<ColorPicker label="Success Variant" v-model="colors['success-variant']" :outline="true" :overlay="true" :overlay-color="colors.dark" @update="handleChange"></ColorPicker>
					<ColorPicker label="Warning Variant" v-model="colors['warning-variant']" :outline="true" :overlay="true" :overlay-color="colors.dark" @update="handleChange"></ColorPicker>
					<ColorPicker label="Information Variant" v-model="colors['information-variant']" :outline="true" :overlay="true" :overlay-color="colors.dark" @update="handleChange"></ColorPicker>
				</div>
			</div>
			<MarkdownParser :content="$t('pages.design_system.colors.content')"></MarkdownParser>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownParser from "@/components/MarkdownParser.vue";
import ColorPicker from "@/plugin/data-entry/ColorPicker.vue";
import ButtonComponent from "@/plugin/call-to-action/ButtonComponent.vue";
import default_colors from "@/assets/utilities/colors";

export default defineComponent({
	name: "ColorsPage",
	components: {
		MarkdownParser,
		ColorPicker,
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
		toggleTheme(): void {
			if (this.$ecosphere.theming.getTheme() === "dark") {
				this.$ecosphere.theming.setTheme("light");
			} else {
				this.$ecosphere.theming.setTheme("dark");
			}
		},
	},
});
</script>

<style lang="scss" scoped></style>

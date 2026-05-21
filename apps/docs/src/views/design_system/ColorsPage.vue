<template>
	<div class="wrapper">
		<div class="wrapper__title">
			{{ $t("pages.design_system.colors.title") }}
		</div>
		<div class="wrapper__body">
			<div class="section">
				<div class="section__description">
					Play around with the colors below to change the color
					palette across the design system. You can navigate to other
					pages as well to view the changes after setting them here.
					If you refresh, the changes will be reset.
				</div>
			</div>
			<div class="section">
				<div class="section__flex">
					<ButtonComponent
						label="Restore Defaults"
						size="sm"
						hue="error"
						icon="ri-arrow-go-back-line"
						icon-position="before"
						@click="restoreDefaults"
					></ButtonComponent>
					<ButtonComponent
						label="Toggle Theme"
						size="sm"
						icon="ri-arrow-left-right-line"
						icon-position="before"
						@click="toggleTheme"
					></ButtonComponent>
				</div>
			</div>
			<div class="section">
				<div class="section__subtitle">Elementary Colors</div>
				<div class="section__grid">
					<ColorPicker
						v-model="colors.dark"
						label="Dark"
						:outline="true"
						:overlay="true"
						:overlay-color="colors['light-faded']"
						@update="handleChange"
					></ColorPicker>
					<ColorPicker
						v-model="colors['dark-faded']"
						label="Dark - Faded"
						:outline="true"
						:overlay="true"
						:overlay-color="colors.light"
						@update="handleChange"
					></ColorPicker>
					<ColorPicker
						v-model="colors.light"
						label="Light"
						:outline="true"
						:overlay="true"
						:overlay-color="colors['dark-faded']"
						@update="handleChange"
					></ColorPicker>
					<ColorPicker
						v-model="colors['light-faded']"
						label="Light - Faded"
						:outline="true"
						:overlay="true"
						:overlay-color="colors.dark"
						@update="handleChange"
					></ColorPicker>
				</div>
			</div>
			<div class="section">
				<div class="section__subtitle">Primary Colors</div>
				<div class="section__grid">
					<ColorPicker
						v-model="colors.primary"
						label="Primary"
						:outline="true"
						:overlay="true"
						:overlay-color="colors['primary-contrast']"
						@update="handleChange"
					></ColorPicker>
					<ColorPicker
						v-model="colors['primary-contrast']"
						label="Primary - Contrast"
						:outline="true"
						:overlay="true"
						:overlay-color="colors['primary']"
						@update="handleChange"
					></ColorPicker>
					<ColorPicker
						v-model="colors['primary-variant']"
						label="Primary Variant"
						:outline="true"
						:overlay="true"
						:overlay-color="colors['primary-variant-contrast']"
						@update="handleChange"
					></ColorPicker>
					<ColorPicker
						v-model="colors['primary-variant-contrast']"
						label="Primary Variant - Contrast"
						:outline="true"
						:overlay="true"
						:overlay-color="colors['primary-variant']"
						@update="handleChange"
					></ColorPicker>
				</div>
			</div>
			<div class="section">
				<div class="section__subtitle">Secondary Colors</div>
				<div class="section__grid">
					<ColorPicker
						v-model="colors.secondary"
						label="Secondary"
						:outline="true"
						:overlay="true"
						:overlay-color="colors['secondary-contrast']"
						@update="handleChange"
					></ColorPicker>
					<ColorPicker
						v-model="colors['secondary-contrast']"
						label="Secondary - Contrast"
						:outline="true"
						:overlay="true"
						:overlay-color="colors['secondary']"
						@update="handleChange"
					></ColorPicker>
					<ColorPicker
						v-model="colors['secondary-variant']"
						label="Secondary Variant"
						:outline="true"
						:overlay="true"
						:overlay-color="colors['secondary-variant-contrast']"
						@update="handleChange"
					></ColorPicker>
					<ColorPicker
						v-model="colors['secondary-variant-contrast']"
						label="Secondary Variant - Contrast"
						:outline="true"
						:overlay="true"
						:overlay-color="colors['secondary-variant']"
						@update="handleChange"
					></ColorPicker>
				</div>
			</div>
			<div class="section">
				<div class="section__subtitle">Helpers</div>
				<div class="section__grid">
					<ColorPicker
						v-model="colors.hyperlink"
						label="Hyperlink"
						:outline="true"
						:overlay="true"
						:overlay-color="colors.dark"
						@update="handleChange"
					></ColorPicker>
					<ColorPicker
						v-model="colors.offline"
						label="Offline"
						:outline="true"
						:overlay="true"
						:overlay-color="colors.dark"
						@update="handleChange"
					></ColorPicker>
					<ColorPicker
						v-model="colors.divider"
						label="Divider"
						:outline="true"
						:overlay="true"
						:overlay-color="colors.dark"
						@update="handleChange"
					></ColorPicker>
					<ColorPicker
						v-model="colors.disabled"
						label="Disabled"
						:outline="true"
						:overlay="true"
						:overlay-color="colors.dark"
						@update="handleChange"
					></ColorPicker>
				</div>
			</div>
			<div class="section">
				<div class="section__subtitle">Indicators</div>
				<div class="section__grid">
					<ColorPicker
						v-model="colors.error"
						label="Error"
						:outline="true"
						:overlay="true"
						:overlay-color="colors.dark"
						@update="handleChange"
					></ColorPicker>
					<ColorPicker
						v-model="colors.success"
						label="Success"
						:outline="true"
						:overlay="true"
						:overlay-color="colors.dark"
						@update="handleChange"
					></ColorPicker>
					<ColorPicker
						v-model="colors.warning"
						label="Warning"
						:outline="true"
						:overlay="true"
						:overlay-color="colors.dark"
						@update="handleChange"
					></ColorPicker>
					<ColorPicker
						v-model="colors.information"
						label="Information"
						:outline="true"
						:overlay="true"
						:overlay-color="colors.dark"
						@update="handleChange"
					></ColorPicker>
					<ColorPicker
						v-model="colors['error-variant']"
						label="Error Variant"
						:outline="true"
						:overlay="true"
						:overlay-color="colors.dark"
						@update="handleChange"
					></ColorPicker>
					<ColorPicker
						v-model="colors['success-variant']"
						label="Success Variant"
						:outline="true"
						:overlay="true"
						:overlay-color="colors.dark"
						@update="handleChange"
					></ColorPicker>
					<ColorPicker
						v-model="colors['warning-variant']"
						label="Warning Variant"
						:outline="true"
						:overlay="true"
						:overlay-color="colors.dark"
						@update="handleChange"
					></ColorPicker>
					<ColorPicker
						v-model="colors['information-variant']"
						label="Information Variant"
						:outline="true"
						:overlay="true"
						:overlay-color="colors.dark"
						@update="handleChange"
					></ColorPicker>
				</div>
			</div>
			<MarkdownParser
				:content="$t('pages.design_system.colors.content')"
			></MarkdownParser>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownParser from "@/components/MarkdownParser.vue";
import ColorPicker from "@ecosphere/data-entry/ColorPicker.vue";
import ButtonComponent from "@ecosphere/call-to-action/ButtonComponent.vue";
import default_colors from "@ecosphere/defaults/colors";

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

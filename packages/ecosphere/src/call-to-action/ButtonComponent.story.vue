<script setup lang="ts">
import ButtonComponent from "./ButtonComponent.vue";
import type { EpHue } from "../utilities/types/shared";
import type { EpSize } from "../general/config";

const hues: EpHue[] = [
	"primary",
	"primary-variant",
	"secondary",
	"secondary-variant",
	"error",
	"success",
	"warning",
	"information",
];

const sizes: EpSize[] = ["xs", "sm", "md", "lg", "xl"];
</script>

<template>
	<Story title="Call to action/Button" :layout="{ type: 'grid', width: 360 }">
		<Variant title="Hues">
			<div style="display: flex; flex-wrap: wrap; gap: 0.5rem">
				<ButtonComponent
					v-for="hue in hues"
					:key="hue"
					:label="hue"
					:hue="hue"
				/>
			</div>
		</Variant>

		<Variant title="Ghost">
			<div style="display: flex; flex-wrap: wrap; gap: 0.5rem">
				<ButtonComponent
					v-for="hue in hues"
					:key="hue"
					:label="hue"
					:hue="hue"
					ghost
				/>
			</div>
		</Variant>

		<Variant title="Sizes">
			<div style="display: flex; align-items: center; gap: 0.5rem">
				<ButtonComponent
					v-for="size in sizes"
					:key="size"
					:label="size"
					:size="size"
				/>
			</div>
		</Variant>

		<Variant title="States">
			<div style="display: flex; gap: 0.5rem">
				<ButtonComponent label="Default" />
				<ButtonComponent label="Loading" loading />
				<ButtonComponent label="Disabled" disabled />
				<ButtonComponent label="Danger" danger />
			</div>
		</Variant>

		<Variant title="Block">
			<ButtonComponent label="Full width" block />
		</Variant>

		<Variant title="As link">
			<ButtonComponent label="Open docs" href="https://example.com" target="_blank" />
		</Variant>
	</Story>
</template>

<template>
	<Story title="Miscellaneous/StepperComponent">
		<Variant title="Horizontal">
			<StepperComponent :value="1" :steps="steps" />
		</Variant>
		<Variant title="Vertical">
			<StepperComponent
				:value="2"
				:steps="steps"
				orientation="vertical"
			/>
		</Variant>
		<Variant title="Error state">
			<StepperComponent :value="1" :steps="steps" state="error" />
		</Variant>
		<Variant title="Progress dots + clickable">
			<StepperComponent
				v-model:value="current"
				:steps="steps"
				progress-dots
				clickable
			/>
		</Variant>
	</Story>
</template>

<script setup lang="ts">
import { ref } from "vue";
import StepperComponent, { type StepperStep } from "./StepperComponent.vue";

const current = ref(0);
const steps: StepperStep[] = [
	{ label: "Step 1", description: "Install Ecosphere" },
	{
		label: "Step 2",
		description: "Configure main.ts",
		icon: "ri-home-2-line",
	},
	{ label: "Step 3", description: "You're all set!" },
];
</script>

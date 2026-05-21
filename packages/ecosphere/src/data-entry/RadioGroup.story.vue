<script setup lang="ts">
import { ref } from "vue";
import RadioGroup from "./RadioGroup.vue";
const choice = ref<string | number | boolean | null>("week");
</script>
<template>
	<Story title="Data entry/RadioGroup">
		<Variant title="Options shorthand">
			<RadioGroup
				v-model:value="choice"
				label="Range"
				:options="['day', 'week', 'month']"
			/>
		</Variant>
		<Variant title="Button outline">
			<RadioGroup
				v-model:value="choice"
				label="Range"
				option-type="button"
				:options="[
					{ label: 'Day', value: 'day' },
					{ label: 'Week', value: 'week' },
					{ label: 'Month', value: 'month' },
				]"
			/>
		</Variant>
		<Variant title="Button solid">
			<RadioGroup
				v-model:value="choice"
				label="Range"
				option-type="button"
				button-style="solid"
				:options="['day', 'week', 'month']"
			/>
		</Variant>
		<Variant title="With error state">
			<RadioGroup
				v-model:value="choice"
				label="Range"
				state="error"
				alert-message="Required"
				:options="['day', 'week']"
			/>
		</Variant>
	</Story>
</template>

<script setup lang="ts">
import { ref } from "vue";
import InputNumberField from "./InputNumberField.vue";
const n = ref<number | null>(5);
</script>
<template>
	<Story title="Data entry/InputNumber">
		<Variant title="Default">
			<InputNumberField v-model:value="n" label="Quantity" />
		</Variant>
		<Variant title="Min/Max + step">
			<InputNumberField v-model:value="n" label="Volume" :min="0" :max="10" :step="2" />
		</Variant>
		<Variant title="Precision (2dp)">
			<InputNumberField v-model:value="n" label="Price" :step="0.1" :precision="2" />
		</Variant>
		<Variant title="No controls">
			<InputNumberField v-model:value="n" label="Pages" :controls="false" />
		</Variant>
	</Story>
</template>

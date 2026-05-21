<script setup lang="ts">
import { ref } from "vue";
import ChoiceChips from "./ChoiceChips.vue";

const single = ref<string | null>("md");
const multi = ref<string[]>(["sm"]);

const sizes = [
	{ label: "Small", value: "sm" },
	{ label: "Medium", value: "md" },
	{ label: "Large", value: "lg" },
];
</script>
<template>
	<Story title="Data entry/ChoiceChips">
		<Variant title="Single">
			<ChoiceChips v-model:value="single" label="Size" :options="sizes" />
		</Variant>
		<Variant title="Multiple">
			<ChoiceChips v-model:value="multi" label="Sizes" :options="sizes" multiple hue="success" />
		</Variant>
		<Variant title="Bordered">
			<ChoiceChips v-model:value="single" label="Size" :options="sizes" bordered hue="information" />
		</Variant>
		<Variant title="Grid">
			<ChoiceChips v-model:value="multi" label="Tags" :options="sizes" multiple alignment="grid" />
		</Variant>
	</Story>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SelectField from "./SelectField.vue";

const single = ref<string | null>(null);
const multi = ref<string[]>([]);
const tagged = ref<string[]>([]);

const options = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];
const big = Array.from({ length: 500 }, (_, i) => `Option ${i + 1}`);
</script>
<template>
	<Story title="Data entry/Select">
		<Variant title="Single">
			<SelectField v-model:value="single" label="Fruit" :options="options" />
		</Variant>
		<Variant title="Multiple">
			<SelectField v-model:value="multi" label="Fruits" :options="options" multiple allow-clear />
		</Variant>
		<Variant title="Searchable">
			<SelectField v-model:value="single" label="Fruit" :options="options" show-search />
		</Variant>
		<Variant title="Tags">
			<SelectField v-model:value="tagged" label="Tags" :options="options" tags allow-clear />
		</Variant>
		<Variant title="Virtual scroll (500 opts)">
			<SelectField v-model:value="single" label="Pick one" :options="big" show-search />
		</Variant>
		<Variant title="Loading">
			<SelectField v-model:value="single" label="Async" :options="[]" loading />
		</Variant>
	</Story>
</template>

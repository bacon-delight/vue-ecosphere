<script setup lang="ts">
import { ref } from "vue";
import CheckboxGroup from "./CheckboxGroup.vue";
const selected = ref<(string | number | boolean)[]>(["apple"]);
</script>
<template>
	<Story title="Data entry/CheckboxGroup">
		<Variant title="Options shorthand">
			<CheckboxGroup
				v-model:value="selected"
				label="Fruit"
				:options="['apple', 'banana', 'cherry']"
			/>
		</Variant>
		<Variant title="With states">
			<CheckboxGroup
				v-model:value="selected"
				label="Fruit"
				state="error"
				alert-message="Please choose at least one"
				:options="[
					{ label: 'Apple', value: 'apple' },
					{ label: 'Banana', value: 'banana' },
					{ label: 'Cherry', value: 'cherry', disabled: true },
				]"
			/>
		</Variant>
		<Variant title="Vertical">
			<CheckboxGroup
				v-model:value="selected"
				label="Fruit"
				alignment="vertical"
				:options="['apple', 'banana']"
			/>
		</Variant>
	</Story>
</template>

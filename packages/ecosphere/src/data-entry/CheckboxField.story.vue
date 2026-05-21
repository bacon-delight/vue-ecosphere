<script setup lang="ts">
import { ref } from "vue";
import CheckboxField from "./CheckboxField.vue";
const value = ref(false);
const items = ref<(string | number | boolean)[]>(["a", "c"]);
</script>
<template>
	<Story title="Data entry/Checkbox">
		<Variant title="Default">
			<CheckboxField v-model:value="value" label="I agree" />
		</Variant>
		<Variant title="Indeterminate">
			<CheckboxField :value="false" indeterminate label="Some selected" />
		</Variant>
		<Variant title="Disabled">
			<CheckboxField :value="true" disabled label="Locked" />
		</Variant>
		<Variant title="Array (multi)">
			<CheckboxField v-model:value="items" native-value="a" label="A" />
			<CheckboxField v-model:value="items" native-value="b" label="B" />
			<CheckboxField v-model:value="items" native-value="c" label="C" />
		</Variant>
	</Story>
</template>

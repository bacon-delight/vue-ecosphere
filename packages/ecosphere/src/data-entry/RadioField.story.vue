<script setup lang="ts">
import { ref } from "vue";
import RadioField from "./RadioField.vue";
const value = ref<string | number | boolean | null>("a");
</script>
<template>
	<Story title="Data entry/Radio">
		<Variant title="Default">
			<RadioField v-model:value="value" native-value="a" label="Option A" />
			<RadioField v-model:value="value" native-value="b" label="Option B" />
		</Variant>
		<Variant title="Disabled">
			<RadioField :value="'a'" native-value="b" disabled label="Locked" />
		</Variant>
		<Variant title="Button style">
			<RadioField
				v-model:value="value"
				native-value="a"
				label="Day"
				option-type="button"
			/>
			<RadioField
				v-model:value="value"
				native-value="b"
				label="Week"
				option-type="button"
				button-style="solid"
			/>
		</Variant>
	</Story>
</template>

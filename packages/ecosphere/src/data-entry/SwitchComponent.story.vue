<script setup lang="ts">
import { ref } from "vue";
import SwitchComponent from "./SwitchComponent.vue";
const value = ref(false);
</script>
<template>
	<Story title="Data entry/Switch">
		<Variant title="Default">
			<SwitchComponent v-model:value="value" label="Notify me" />
		</Variant>
		<Variant title="Loading">
			<SwitchComponent :value="true" label="Saving" loading />
		</Variant>
		<Variant title="With slots">
			<SwitchComponent
				v-model:value="value"
				checked-text="ON"
				unchecked-text="OFF"
			/>
		</Variant>
	</Story>
</template>

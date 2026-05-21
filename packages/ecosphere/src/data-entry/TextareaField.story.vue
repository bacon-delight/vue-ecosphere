<script setup lang="ts">
import { ref } from "vue";
import TextareaField from "./TextareaField.vue";
const value = ref("");
</script>
<template>
	<Story title="Data entry/Textarea">
		<Variant title="Default">
			<TextareaField v-model:value="value" label="Notes" placeholder="Type" />
		</Variant>
		<Variant title="AutoSize">
			<TextareaField v-model:value="value" label="Bio" :auto-size="{ minRows: 2, maxRows: 6 }" />
		</Variant>
		<Variant title="Show count">
			<TextareaField v-model:value="value" label="Comment" :max-length="120" show-count />
		</Variant>
		<Variant title="Clearable">
			<TextareaField v-model:value="value" label="Notes" allow-clear />
		</Variant>
	</Story>
</template>

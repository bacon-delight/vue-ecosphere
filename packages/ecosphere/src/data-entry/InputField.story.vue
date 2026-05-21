<script setup lang="ts">
import { ref } from "vue";
import InputField from "./InputField.vue";
const value = ref("");
</script>
<template>
	<Story title="Data entry/Input">
		<Variant title="Default">
			<InputField
				v-model:value="value"
				label="Name"
				placeholder="Type here"
			/>
		</Variant>
		<Variant title="With prefix / suffix">
			<InputField
				v-model:value="value"
				label="Amount"
				prefix="$"
				suffix="USD"
			/>
		</Variant>
		<Variant title="Addon before / after">
			<InputField
				v-model:value="value"
				label="URL"
				addon-before="https://"
				addon-after=".com"
			/>
		</Variant>
		<Variant title="Clearable + show count">
			<InputField
				v-model:value="value"
				label="Tag"
				allow-clear
				:max-length="20"
				show-count
			/>
		</Variant>
		<Variant title="Password">
			<InputField
				v-model:value="value"
				label="Password"
				type="password"
			/>
		</Variant>
		<Variant title="Search">
			<InputField v-model:value="value" label="Search" type="search" />
		</Variant>
		<Variant title="Error">
			<InputField
				v-model:value="value"
				label="Email"
				state="error"
				alert-message="Invalid email"
			/>
		</Variant>
	</Story>
</template>

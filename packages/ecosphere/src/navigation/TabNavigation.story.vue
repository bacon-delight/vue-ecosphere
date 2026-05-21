<template>
	<Story title="Navigation/TabNavigation">
		<Variant title="Default (underline)">
			<TabNavigation v-model:value="value" :options="options">
				<template #default="{ option }">
					<div>Content for {{ option.label }}</div>
				</template>
			</TabNavigation>
		</Variant>
		<Variant title="Vertical">
			<TabNavigation v-model:value="value" :options="options" vertical />
		</Variant>
		<Variant title="Pills">
			<TabNavigation
				v-model:value="value"
				:options="options"
				variant="pills"
			/>
		</Variant>
		<Variant title="Closable + Addable">
			<TabNavigation
				v-model:value="value"
				:options="options"
				closable
				addable
			/>
		</Variant>
	</Story>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TabNavigation, { type TabOption } from "./TabNavigation.vue";

const options: TabOption[] = [
	{ label: "Home", icon: "ri-home-line", value: "home" },
	{ label: "Dashboard", icon: "ri-dashboard-line", value: "dash" },
	{ label: "Settings", icon: "ri-settings-line", value: "settings" },
];
const value = ref<string>("home");
</script>

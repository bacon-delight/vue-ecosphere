<template>
	<Story title="Navigation/MenuNavigation">
		<Variant title="Inline (default)">
			<MenuNavigation :options="options" />
		</Variant>
		<Variant title="Horizontal">
			<MenuNavigation :options="options" mode="horizontal" />
		</Variant>
		<Variant title="Collapsed">
			<MenuNavigation :options="options" collapsed />
		</Variant>
	</Story>
</template>

<script setup lang="ts">
import MenuNavigation, { type MenuItemData } from "./MenuNavigation.vue";

const options: MenuItemData[] = [
	{ label: "Home", icon: "ri-home-line", active: true },
	{
		label: "Products",
		icon: "ri-box-3-line",
		children: [{ label: "Plants" }, { label: "Seeds" }],
	},
	{ label: "About", icon: "ri-information-line" },
	{ label: "Disabled", icon: "ri-lock-line", disabled: true },
];
</script>

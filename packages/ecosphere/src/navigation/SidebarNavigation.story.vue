<template>
	<Story title="Navigation/SidebarNavigation">
		<Variant title="Default">
			<SidebarNavigation :options="options" />
		</Variant>
		<Variant title="Collapsible">
			<SidebarNavigation :options="options" collapsible />
		</Variant>
		<Variant title="With header + footer">
			<SidebarNavigation :options="options" collapsible>
				<template #header>
					<strong>Workspace</strong>
				</template>
				<template #footer>
					<small>v1.0.0</small>
				</template>
			</SidebarNavigation>
		</Variant>
	</Story>
</template>

<script setup lang="ts">
import SidebarNavigation from "./SidebarNavigation.vue";
import type { MenuItemData } from "./MenuNavigation/MenuItem.vue";

const options: MenuItemData[] = [
	{ label: "Home", icon: "ri-home-line", active: true },
	{ label: "Dashboard", icon: "ri-dashboard-line" },
	{ label: "Settings", icon: "ri-settings-line" },
];
</script>

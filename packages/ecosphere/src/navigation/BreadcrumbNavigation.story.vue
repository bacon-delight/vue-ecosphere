<template>
	<Story title="Navigation/BreadcrumbNavigation">
		<Variant title="Default">
			<BreadcrumbNavigation :items="items" />
		</Variant>
		<Variant title="Bordered">
			<BreadcrumbNavigation :items="items" bordered />
		</Variant>
		<Variant title="With icons + custom separator">
			<BreadcrumbNavigation :items="iconItems">
				<template #separator>
					<span>/</span>
				</template>
			</BreadcrumbNavigation>
		</Variant>
		<Variant title="Disabled">
			<BreadcrumbNavigation :items="items" disabled />
		</Variant>
	</Story>
</template>

<script setup lang="ts">
import BreadcrumbNavigation, {
	type BreadcrumbItem,
} from "./BreadcrumbNavigation.vue";

const items: BreadcrumbItem[] = [
	{ label: "Home", href: "/" },
	{ label: "Library", href: "/library" },
	{ label: "Data", active: true },
];
const iconItems: BreadcrumbItem[] = [
	{ label: "Home", icon: "ri-home-line", href: "/" },
	{ label: "Navigation", icon: "ri-navigation-line", disabled: true },
	{ label: "Breadcrumb", active: true },
];
</script>

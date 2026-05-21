<template>
	<ul
		class="ep-menu"
		:class="[`ep-menu--${size}`, `ep-menu--${mode}`]"
		role="menu"
		:aria-label="ariaLabel"
	>
		<MenuItem
			v-for="(option, idx) in options"
			:key="idx"
			:option="option"
			:hue="hue"
			:skeleton="skeleton"
			:collapsed="collapsed"
		/>
	</ul>
</template>

<script setup lang="ts">
import MenuItem, { type MenuItemData } from "./MenuNavigation/MenuItem.vue";
import { useEpSize } from "../composables/useEpSize";
import type { EpSize } from "../general/config";
import type { EpHue } from "../utilities/types/shared";

export type MenuMode = "inline" | "vertical" | "horizontal";

export interface MenuProps {
	options: MenuItemData[];
	mode?: MenuMode;
	hue?: EpHue;
	size?: EpSize;
	skeleton?: boolean;
	collapsed?: boolean;
	ariaLabel?: string;
}

const props = withDefaults(defineProps<MenuProps>(), {
	mode: "inline",
	hue: "information",
	size: undefined,
	skeleton: true,
	collapsed: false,
	ariaLabel: "Menu",
});

const size = useEpSize(() => props.size);
export type { MenuItemData };
</script>

<style scoped>
.ep-menu {
	list-style: none;
	margin: 0;
	padding: 0.25rem;
	background: var(--ep-color-background);
	color: var(--ep-color-contrast);
	font-family: var(--ep-font-family-base);
	border-radius: var(--ep-radius-base);
	display: flex;
	flex-direction: column;
	row-gap: 0.15rem;
}

.ep-menu--horizontal {
	flex-direction: row;
	column-gap: 0.25rem;
	row-gap: 0;
	flex-wrap: wrap;
}

.ep-menu--xs {
	font-size: 0.75rem;
}
.ep-menu--sm {
	font-size: 0.875rem;
}
.ep-menu--md {
	font-size: 1rem;
}
.ep-menu--lg {
	font-size: 1.125rem;
}
.ep-menu--xl {
	font-size: 1.25rem;
}
</style>

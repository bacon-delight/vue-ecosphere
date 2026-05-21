<template>
	<aside
		class="ep-sidebar"
		:class="[
			`ep-sidebar--${size}`,
			{
				'ep-sidebar--responsive': responsive,
				'ep-sidebar--collapsed': effectiveCollapsed,
			},
		]"
		:aria-label="ariaLabel"
	>
		<div v-if="$slots.header" class="ep-sidebar__header">
			<slot name="header" :collapsed="effectiveCollapsed" />
		</div>
		<ul class="ep-sidebar__menu" role="menu">
			<MenuItem
				v-for="(option, idx) in options"
				:key="idx"
				:option="option"
				:hue="hue"
				:skeleton="skeleton"
				:collapsed="effectiveCollapsed"
			/>
		</ul>
		<div v-if="$slots.footer" class="ep-sidebar__footer">
			<slot name="footer" :collapsed="effectiveCollapsed" />
		</div>
		<button
			v-if="collapsible && !mobileDrawerOpen"
			type="button"
			class="ep-sidebar__toggle"
			:aria-label="
				effectiveCollapsed ? 'Expand sidebar' : 'Collapse sidebar'
			"
			:aria-expanded="!effectiveCollapsed"
			@click="toggleCollapse"
		>
			<SVGIcon
				:name="
					effectiveCollapsed
						? 'ri-arrow-right-s-line'
						: 'ri-arrow-left-s-line'
				"
			/>
		</button>
	</aside>
	<Teleport v-if="responsive" to="body">
		<Transition name="ep-sidebar-overlay">
			<div
				v-if="mobileDrawerOpen"
				class="ep-sidebar-overlay"
				@click="mobileDrawerOpen = false"
			>
				<div
					class="ep-sidebar-overlay__drawer"
					role="dialog"
					aria-modal="true"
					:aria-label="ariaLabel"
					@click.stop
				>
					<div v-if="$slots.header" class="ep-sidebar__header">
						<slot name="header" :collapsed="false" />
					</div>
					<ul class="ep-sidebar__menu" role="menu">
						<MenuItem
							v-for="(option, idx) in options"
							:key="idx"
							:option="option"
							:hue="hue"
							:skeleton="skeleton"
							@action="mobileDrawerOpen = false"
						/>
					</ul>
					<div v-if="$slots.footer" class="ep-sidebar__footer">
						<slot name="footer" :collapsed="false" />
					</div>
				</div>
			</div>
		</Transition>
	</Teleport>
	<Teleport v-if="responsive" to="body">
		<Transition name="ep-sidebar-trigger">
			<button
				v-if="!mobileDrawerOpen"
				type="button"
				class="ep-sidebar__trigger"
				aria-label="Open sidebar"
				@click="mobileDrawerOpen = true"
			>
				<SVGIcon name="ri-menu-4-line" />
			</button>
		</Transition>
	</Teleport>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import SVGIcon from "../general/SVGIcon.vue";
import MenuItem, { type MenuItemData } from "./MenuNavigation/MenuItem.vue";
import { useEpSize } from "../composables/useEpSize";
import type { EpSize } from "../general/config";
import type { EpHue } from "../utilities/types/shared";

export interface SidebarProps {
	options: MenuItemData[];
	hue?: EpHue;
	size?: EpSize;
	theme?: "auto" | "light" | "dark";
	skeleton?: boolean;
	responsive?: boolean;
	collapsible?: boolean;
	collapsed?: boolean;
	ariaLabel?: string;
}

const props = withDefaults(defineProps<SidebarProps>(), {
	hue: "information",
	size: undefined,
	theme: "auto",
	skeleton: true,
	responsive: false,
	collapsible: false,
	collapsed: false,
	ariaLabel: "Sidebar",
});

const emit = defineEmits<{
	(e: "update:collapsed", value: boolean): void;
}>();

const size = useEpSize(() => props.size);
const internalCollapsed = ref(props.collapsed);
const mobileDrawerOpen = ref(false);

watch(
	() => props.collapsed,
	(v) => {
		internalCollapsed.value = v;
	}
);

const effectiveCollapsed = computed(() => internalCollapsed.value);

function toggleCollapse() {
	internalCollapsed.value = !internalCollapsed.value;
	emit("update:collapsed", internalCollapsed.value);
}
</script>

<style scoped>
.ep-sidebar {
	position: relative;
	max-height: 100%;
	overflow-y: auto;
	background: var(--ep-color-background);
	color: var(--ep-color-contrast);
	font-family: var(--ep-font-family-base);
	display: flex;
	flex-direction: column;
	padding: 0.5rem;
	row-gap: 0.5rem;
	transition: var(--ep-transition-base);
	width: 16rem;
	min-width: 16rem;
}

.ep-sidebar--collapsed {
	width: 3.5rem;
	min-width: 3.5rem;
}

.ep-sidebar--responsive {
	display: flex;
}

@media (max-width: 640px) {
	.ep-sidebar--responsive {
		display: none;
	}
}

.ep-sidebar--xs {
	font-size: 0.75rem;
}
.ep-sidebar--sm {
	font-size: 0.875rem;
}
.ep-sidebar--md {
	font-size: 1rem;
}
.ep-sidebar--lg {
	font-size: 1.125rem;
}
.ep-sidebar--xl {
	font-size: 1.25rem;
}

.ep-sidebar__menu {
	list-style: none;
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	row-gap: 0.15rem;
	flex: 1 1 auto;
}

.ep-sidebar__header,
.ep-sidebar__footer {
	padding: 0.25rem;
}

.ep-sidebar__toggle {
	appearance: none;
	background: var(--ep-color-background);
	color: inherit;
	border: 1px solid var(--ep-color-divider);
	border-radius: 50%;
	height: 1.5rem;
	width: 1.5rem;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	position: absolute;
	top: 0.75rem;
	right: -0.75rem;
	z-index: 2;
}

.ep-sidebar__toggle:focus-visible {
	outline: var(--ep-outline-focus);
	outline-offset: 2px;
}

.ep-sidebar-overlay {
	position: fixed;
	inset: 0;
	background: rgba(0, 0, 0, 0.5);
	display: none;
	cursor: pointer;
	z-index: 1000;
}

@media (max-width: 640px) {
	.ep-sidebar-overlay {
		display: block;
	}
}

.ep-sidebar-overlay__drawer {
	min-width: 50vw;
	max-width: 80vw;
	height: 100%;
	background: var(--ep-color-background);
	color: var(--ep-color-contrast);
	overflow-y: auto;
	padding: 0.5rem;
	cursor: default;
	display: flex;
	flex-direction: column;
	row-gap: 0.5rem;
}

.ep-sidebar__trigger {
	position: fixed;
	top: 5.5rem;
	left: 0;
	z-index: 999;
	appearance: none;
	background: var(--ep-color-background);
	color: inherit;
	border: 1px solid var(--ep-color-divider);
	padding: 0.5rem;
	border-top-right-radius: var(--ep-radius-base);
	border-bottom-right-radius: var(--ep-radius-base);
	cursor: pointer;
	display: none;
}

@media (max-width: 640px) {
	.ep-sidebar__trigger {
		display: inline-flex;
	}
}

.ep-sidebar__trigger:hover {
	background: var(--ep-color-background-faded);
}

.ep-sidebar__trigger:focus-visible {
	outline: var(--ep-outline-focus);
	outline-offset: 2px;
}

.ep-sidebar-overlay-enter-active,
.ep-sidebar-overlay-leave-active,
.ep-sidebar-trigger-enter-active,
.ep-sidebar-trigger-leave-active {
	transition: var(--ep-transition-base);
}

.ep-sidebar-overlay-enter-from,
.ep-sidebar-overlay-leave-to {
	opacity: 0;
}

.ep-sidebar-trigger-enter-from,
.ep-sidebar-trigger-leave-to {
	transform: translateX(-100%);
}
</style>

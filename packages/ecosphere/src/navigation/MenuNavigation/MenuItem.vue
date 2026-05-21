<template>
	<li v-if="!option.hidden" class="ep-menu-item" role="none">
		<component
			:is="option.children ? 'button' : option.href ? 'a' : 'button'"
			class="ep-menu-item__trigger"
			:class="[
				{
					'ep-menu-item__trigger--active': option.active,
					'ep-menu-item__trigger--disabled': option.disabled,
					'ep-menu-item__trigger--collapsed':
						collapsed && depth === 0,
				},
			]"
			:role="option.children ? 'menuitem' : 'menuitem'"
			:href="!option.children && option.href ? option.href : undefined"
			:type="!option.href ? 'button' : undefined"
			:aria-haspopup="option.children ? 'menu' : undefined"
			:aria-expanded="
				option.children ? (showChildren ? 'true' : 'false') : undefined
			"
			:aria-current="option.active ? 'page' : undefined"
			:aria-disabled="option.disabled ? 'true' : undefined"
			:disabled="option.disabled && !option.href ? true : undefined"
			:tabindex="option.disabled ? -1 : 0"
			@click="handleClick"
			@keydown.enter.prevent="handleClick"
			@keydown.space.prevent="handleClick"
		>
			<SVGIcon
				v-if="option.icon"
				class="ep-menu-item__icon"
				:name="option.icon"
				aria-hidden="true"
			/>
			<span
				v-if="!(collapsed && depth === 0) || !option.icon"
				class="ep-menu-item__label"
				>{{ option.label }}</span
			>
			<span class="ep-menu-item__indicators">
				<SVGIcon
					v-if="option.children"
					class="ep-menu-item__chevron"
					:name="
						showChildren
							? 'ri-arrow-up-s-line'
							: 'ri-arrow-down-s-line'
					"
					aria-hidden="true"
				/>
				<span
					v-if="option.active && !option.children"
					class="ep-menu-item__active-dot"
					:class="`ep-menu-item__active-dot--${hue}`"
					aria-hidden="true"
				/>
			</span>
		</component>
		<Transition name="ep-menu-children">
			<ul
				v-if="
					option.children &&
					showChildren &&
					!(collapsed && depth === 0)
				"
				class="ep-menu-item__children"
				role="menu"
			>
				<MenuItem
					v-for="(child, idx) in option.children"
					:key="idx"
					:option="child"
					:hue="hue"
					:skeleton="skeleton"
					:depth="depth + 1"
					@action="$emit('action')"
				/>
			</ul>
		</Transition>
	</li>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import SVGIcon from "../../general/SVGIcon.vue";
import type { EpHue } from "../../utilities/types/shared";

export interface MenuItemData {
	label: string;
	icon?: string;
	href?: string;
	hidden?: boolean;
	disabled?: boolean;
	active?: boolean;
	expanded?: boolean;
	action?: () => void;
	children?: MenuItemData[];
}

export interface MenuItemProps {
	option: MenuItemData;
	hue?: EpHue;
	skeleton?: boolean;
	depth?: number;
	collapsed?: boolean;
}

const props = withDefaults(defineProps<MenuItemProps>(), {
	hue: "information",
	skeleton: true,
	depth: 0,
	collapsed: false,
});

const emit = defineEmits<{ (e: "action"): void }>();

const showChildren = ref(false);

onMounted(() => {
	showChildren.value = props.option.expanded || false;
});

function handleClick() {
	if (props.option.disabled) return;
	if (props.option.children) {
		showChildren.value = !showChildren.value;
	}
	if (props.option.action) {
		props.option.action();
		emit("action");
	}
}
</script>

<style scoped>
.ep-menu-item {
	list-style: none;
	width: 100%;
}

.ep-menu-item__trigger {
	appearance: none;
	background: transparent;
	color: inherit;
	border: none;
	font: inherit;
	width: 100%;
	display: flex;
	align-items: center;
	column-gap: 0.5rem;
	padding: 0.4rem 0.6rem;
	border-radius: var(--ep-radius-base);
	cursor: pointer;
	transition: var(--ep-transition-base);
	text-align: left;
	text-decoration: none;
	-webkit-tap-highlight-color: transparent;
}

.ep-menu-item__trigger:hover:not(.ep-menu-item__trigger--disabled) {
	background: var(--ep-color-background-faded);
}

.ep-menu-item__trigger:focus-visible {
	outline: var(--ep-outline-focus);
	outline-offset: 2px;
}

.ep-menu-item__trigger--active {
	background: var(--ep-color-background-faded);
	font-weight: 600;
}

.ep-menu-item__trigger--disabled {
	cursor: not-allowed;
	opacity: 0.5;
	pointer-events: none;
}

.ep-menu-item__trigger--collapsed {
	justify-content: center;
}

.ep-menu-item__icon {
	flex: 0 0 auto;
	font-size: 1.1em;
}

.ep-menu-item__label {
	flex: 1 1 auto;
	min-width: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.ep-menu-item__indicators {
	display: inline-flex;
	align-items: center;
	column-gap: 0.25rem;
	margin-left: auto;
}

.ep-menu-item__chevron {
	opacity: 0.6;
}

.ep-menu-item__active-dot {
	display: inline-block;
	height: 0.5rem;
	width: 0.5rem;
	border-radius: 50%;
	background: var(--ep-color-information);
}

.ep-menu-item__active-dot--primary {
	background: var(--ep-color-primary);
}
.ep-menu-item__active-dot--primary-variant {
	background: var(--ep-color-primary-variant);
}
.ep-menu-item__active-dot--secondary {
	background: var(--ep-color-secondary);
}
.ep-menu-item__active-dot--secondary-variant {
	background: var(--ep-color-secondary-variant);
}
.ep-menu-item__active-dot--error {
	background: var(--ep-color-error);
}
.ep-menu-item__active-dot--success {
	background: var(--ep-color-success);
}
.ep-menu-item__active-dot--warning {
	background: var(--ep-color-warning);
}
.ep-menu-item__active-dot--information {
	background: var(--ep-color-information);
}

.ep-menu-item__children {
	list-style: none;
	margin: 0.25rem 0 0;
	padding: 0 0 0 0.75rem;
	border-left: 2px solid var(--ep-color-divider);
	display: flex;
	flex-direction: column;
	row-gap: 0.15rem;
}

.ep-menu-children-enter-active,
.ep-menu-children-leave-active {
	transition: var(--ep-transition-base);
	overflow: hidden;
}

.ep-menu-children-enter-from,
.ep-menu-children-leave-to {
	opacity: 0;
	transform: translateY(-0.25rem);
}
</style>

<template>
	<nav
		class="ep-breadcrumb"
		:class="[
			`ep-breadcrumb--${size}`,
			{
				'ep-breadcrumb--bordered': bordered,
				'ep-breadcrumb--scroll': !wrap,
				'ep-breadcrumb--disabled': disabled,
			},
		]"
		:aria-label="ariaLabel"
	>
		<ol class="ep-breadcrumb__list">
			<template v-for="(item, index) in visibleItems" :key="index">
				<li
					v-if="index > 0"
					class="ep-breadcrumb__separator"
					aria-hidden="true"
				>
					<slot name="separator" :index="index">
						<SVGIcon :name="dividerIcon" />
					</slot>
				</li>
				<li
					class="ep-breadcrumb__item"
					:class="{
						'ep-breadcrumb__item--active': item.active,
						'ep-breadcrumb__item--disabled':
							item.disabled || disabled,
					}"
				>
					<slot name="item" :item="item" :index="index">
						<component
							:is="
								item.active || item.disabled || disabled
									? 'span'
									: 'a'
							"
							class="ep-breadcrumb__link"
							:href="
								item.active || item.disabled || disabled
									? undefined
									: (item.href ?? '#')
							"
							:aria-current="item.active ? 'page' : undefined"
							:aria-disabled="
								item.disabled || disabled ? 'true' : undefined
							"
							:tabindex="
								item.active || item.disabled || disabled
									? undefined
									: 0
							"
							@click="onItemClick($event, item)"
							@keydown.enter.prevent="onItemActivate(item)"
							@keydown.space.prevent="onItemActivate(item)"
						>
							<SVGIcon
								v-if="item.icon"
								class="ep-breadcrumb__icon"
								:name="item.icon"
								aria-hidden="true"
							/>
							<span class="ep-breadcrumb__label">{{
								item.label
							}}</span>
						</component>
					</slot>
				</li>
			</template>
		</ol>
	</nav>
</template>

<script setup lang="ts">
import { computed } from "vue";
import SVGIcon from "../general/SVGIcon.vue";
import { useEpSize } from "../composables/useEpSize";
import type { EpSize } from "../general/config";

export interface BreadcrumbItem {
	label?: string;
	icon?: string;
	href?: string;
	hidden?: boolean;
	disabled?: boolean;
	active?: boolean;
	action?: () => void;
}

export interface BreadcrumbProps {
	items: BreadcrumbItem[];
	disabled?: boolean;
	bordered?: boolean;
	wrap?: boolean;
	dividerIcon?: string;
	size?: EpSize;
	ariaLabel?: string;
}

const props = withDefaults(defineProps<BreadcrumbProps>(), {
	disabled: false,
	bordered: false,
	wrap: true,
	dividerIcon: "ri-arrow-right-s-line",
	size: undefined,
	ariaLabel: "Breadcrumb",
});

const emit = defineEmits<{
	(e: "select", item: BreadcrumbItem, index: number): void;
}>();

const size = useEpSize(() => props.size);
const visibleItems = computed(() => props.items.filter((i) => !i.hidden));

function onItemActivate(item: BreadcrumbItem) {
	if (item.active || item.disabled || props.disabled) return;
	item.action?.();
	const idx = visibleItems.value.indexOf(item);
	emit("select", item, idx);
}

function onItemClick(e: MouseEvent, item: BreadcrumbItem) {
	if (!item.href || item.href === "#") {
		e.preventDefault();
	}
	onItemActivate(item);
}
</script>

<style scoped>
.ep-breadcrumb {
	display: block;
	width: fit-content;
	max-width: 100%;
	color: var(--ep-color-contrast);
	font-family: var(--ep-font-family-base);
}

.ep-breadcrumb--bordered {
	padding: 0.25rem 0.5rem;
	border-radius: var(--ep-radius-base);
	border: 1px solid var(--ep-color-divider);
}

.ep-breadcrumb--scroll {
	overflow-x: auto;
	padding-bottom: 0.25rem;
}

.ep-breadcrumb--disabled {
	opacity: 0.5;
	pointer-events: none;
}

.ep-breadcrumb--xs {
	font-size: 0.75rem;
}
.ep-breadcrumb--sm {
	font-size: 0.875rem;
}
.ep-breadcrumb--md {
	font-size: 1rem;
}
.ep-breadcrumb--lg {
	font-size: 1.125rem;
}
.ep-breadcrumb--xl {
	font-size: 1.25rem;
}

.ep-breadcrumb__list {
	list-style: none;
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: row;
	align-items: center;
	flex-wrap: wrap;
	column-gap: 0.25rem;
	row-gap: 0.25rem;
}

.ep-breadcrumb--scroll .ep-breadcrumb__list {
	flex-wrap: nowrap;
}

.ep-breadcrumb__separator {
	display: inline-flex;
	align-items: center;
	opacity: 0.5;
	font-size: 1em;
}

.ep-breadcrumb__item {
	display: inline-flex;
	align-items: center;
	min-width: 0;
}

.ep-breadcrumb__item--disabled {
	opacity: 0.5;
}

.ep-breadcrumb__link {
	display: inline-flex;
	align-items: center;
	column-gap: 0.25rem;
	padding: 0 0.25rem;
	border-radius: var(--ep-radius-base);
	color: inherit;
	text-decoration: none;
	cursor: pointer;
	transition: var(--ep-transition-base);
	white-space: nowrap;
}

.ep-breadcrumb__link:hover:not([aria-disabled="true"]):not([aria-current]) {
	color: var(--ep-color-information);
}

.ep-breadcrumb__link:focus-visible {
	outline: var(--ep-outline-focus);
	outline-offset: 2px;
}

.ep-breadcrumb__link[aria-current="page"] {
	cursor: default;
	font-weight: 600;
}

.ep-breadcrumb__link[aria-disabled="true"] {
	cursor: not-allowed;
	pointer-events: none;
}

.ep-breadcrumb__icon {
	font-size: 1em;
}

.ep-breadcrumb__label {
	min-width: 0;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>

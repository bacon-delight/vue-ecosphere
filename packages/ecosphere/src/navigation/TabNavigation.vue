<template>
	<div
		class="ep-tabs"
		:class="[
			`ep-tabs--${size}`,
			`ep-tabs--${variant}`,
			{
				'ep-tabs--vertical': vertical,
				'ep-tabs--disabled': disabled,
			},
		]"
	>
		<div
			ref="tablistRef"
			class="ep-tabs__list"
			role="tablist"
			:aria-label="ariaLabel"
			:aria-orientation="vertical ? 'vertical' : 'horizontal'"
		>
			<button
				v-for="(option, index) in visibleOptions"
				:id="`${tablistId}-tab-${index}`"
				:key="String(option.value)"
				ref="tabRefs"
				type="button"
				role="tab"
				class="ep-tabs__tab"
				:class="[
					{
						'ep-tabs__tab--selected': isSelected(option),
						'ep-tabs__tab--disabled': option.disabled,
						'ep-tabs__tab--icon-above': iconPosition === 'above',
					},
					isSelected(option) ? `ep-tabs__tab--${hue}` : '',
				]"
				:aria-selected="isSelected(option) ? 'true' : 'false'"
				:aria-controls="option.panelId ?? `${tablistId}-panel-${index}`"
				:aria-disabled="option.disabled ? 'true' : undefined"
				:tabindex="isSelected(option) ? 0 : -1"
				:disabled="disabled || option.disabled"
				@click="select(option)"
				@keydown="onKeydown($event, index)"
			>
				<SVGIcon
					v-if="
						option.icon &&
						(iconPosition === 'before' || iconPosition === 'above')
					"
					class="ep-tabs__icon"
					:class="{
						'ep-tabs__icon--above': iconPosition === 'above',
					}"
					:name="option.icon"
					aria-hidden="true"
				/>
				<span v-if="option.label" class="ep-tabs__label">{{
					option.label
				}}</span>
				<SVGIcon
					v-if="option.icon && iconPosition === 'after'"
					class="ep-tabs__icon"
					:name="option.icon"
					aria-hidden="true"
				/>
				<button
					v-if="closable && !option.disabled"
					type="button"
					class="ep-tabs__close"
					:aria-label="`Close ${option.label ?? 'tab'}`"
					@click.stop="close(option, index)"
				>
					<SVGIcon name="ri-close-line" />
				</button>
			</button>
			<button
				v-if="addable"
				type="button"
				class="ep-tabs__add"
				aria-label="Add tab"
				@click="emit('add')"
			>
				<SVGIcon name="ri-add-line" />
			</button>
			<div v-if="$slots.extra" class="ep-tabs__extra">
				<slot name="extra" />
			</div>
		</div>
		<div class="ep-tabs__panels">
			<div
				v-for="(option, index) in visibleOptions"
				:id="option.panelId ?? `${tablistId}-panel-${index}`"
				:key="`panel-${String(option.value)}`"
				class="ep-tabs__panel"
				role="tabpanel"
				:aria-labelledby="`${tablistId}-tab-${index}`"
				:hidden="!isSelected(option)"
				tabindex="0"
			>
				<slot
					v-if="isSelected(option) || !lazy"
					:name="`tab-${String(option.value)}`"
					:option="option"
				>
					<slot name="default" :option="option" />
				</slot>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from "vue";
import SVGIcon from "../general/SVGIcon.vue";
import { useEpSize } from "../composables/useEpSize";
import { useEpId } from "../composables/useEpId";
import type { EpSize } from "../general/config";
import type { EpHue } from "../utilities/types/shared";

export type TabIconPosition = "before" | "after" | "above";
export type TabValue = string | number | boolean | null;

export interface TabOption {
	label?: string;
	icon?: string;
	value: Exclude<TabValue, null>;
	hidden?: boolean;
	disabled?: boolean;
	panelId?: string;
}

export interface TabsProps {
	options: TabOption[];
	value?: TabValue;
	hue?: EpHue;
	size?: EpSize;
	iconPosition?: TabIconPosition;
	disabled?: boolean;
	vertical?: boolean;
	variant?: "underline" | "filled" | "pills";
	addable?: boolean;
	closable?: boolean;
	lazy?: boolean;
	ariaLabel?: string;
}

const props = withDefaults(defineProps<TabsProps>(), {
	value: null,
	hue: "information",
	size: undefined,
	iconPosition: "before",
	disabled: false,
	vertical: false,
	variant: "underline",
	addable: false,
	closable: false,
	lazy: true,
	ariaLabel: "Tabs",
});

const emit = defineEmits<{
	(e: "update:value", value: TabValue): void;
	(e: "change", value: TabValue, option: TabOption): void;
	(e: "add"): void;
	(e: "close", option: TabOption, index: number): void;
}>();

const tablistId = useEpId("ep-tabs");
const size = useEpSize(() => props.size);
const tabRefs = ref<HTMLButtonElement[]>([]);
const tablistRef = ref<HTMLDivElement | null>(null);

const visibleOptions = computed(() => props.options.filter((o) => !o.hidden));

function isSelected(option: TabOption) {
	return props.value === option.value;
}

function select(option: TabOption) {
	if (props.disabled || option.disabled) return;
	if (isSelected(option)) return;
	emit("update:value", option.value);
	emit("change", option.value, option);
}

function close(option: TabOption, index: number) {
	emit("close", option, index);
}

function focusTab(index: number) {
	nextTick(() => {
		tabRefs.value[index]?.focus();
	});
}

function findNextEnabled(start: number, dir: 1 | -1): number {
	const list = visibleOptions.value;
	const len = list.length;
	for (let i = 1; i <= len; i++) {
		const next = (start + dir * i + len) % len;
		if (!list[next].disabled) return next;
	}
	return start;
}

function onKeydown(e: KeyboardEvent, index: number) {
	const horiz = !props.vertical;
	const nextKey = horiz ? "ArrowRight" : "ArrowDown";
	const prevKey = horiz ? "ArrowLeft" : "ArrowUp";
	if (e.key === nextKey) {
		e.preventDefault();
		const next = findNextEnabled(index, 1);
		focusTab(next);
		select(visibleOptions.value[next]);
	} else if (e.key === prevKey) {
		e.preventDefault();
		const next = findNextEnabled(index, -1);
		focusTab(next);
		select(visibleOptions.value[next]);
	} else if (e.key === "Home") {
		e.preventDefault();
		const next = findNextEnabled(-1, 1);
		focusTab(next);
		select(visibleOptions.value[next]);
	} else if (e.key === "End") {
		e.preventDefault();
		const next = findNextEnabled(visibleOptions.value.length, -1);
		focusTab(next);
		select(visibleOptions.value[next]);
	}
}
</script>

<style scoped>
.ep-tabs {
	display: flex;
	flex-direction: column;
	font-family: var(--ep-font-family-base);
	color: var(--ep-color-contrast);
}

.ep-tabs--vertical {
	flex-direction: row;
	column-gap: 0.5rem;
}

.ep-tabs--disabled {
	opacity: 0.5;
	pointer-events: none;
}

.ep-tabs--xs {
	font-size: 0.75rem;
}
.ep-tabs--sm {
	font-size: 0.875rem;
}
.ep-tabs--md {
	font-size: 1rem;
}
.ep-tabs--lg {
	font-size: 1.125rem;
}
.ep-tabs--xl {
	font-size: 1.25rem;
}

.ep-tabs__list {
	display: flex;
	flex-direction: row;
	align-items: stretch;
	flex-wrap: nowrap;
	border-bottom: 1px solid var(--ep-color-divider);
	overflow-x: auto;
}

.ep-tabs--vertical .ep-tabs__list {
	flex-direction: column;
	border-bottom: none;
	border-right: 1px solid var(--ep-color-divider);
	overflow-x: visible;
}

.ep-tabs--pills .ep-tabs__list,
.ep-tabs--filled .ep-tabs__list {
	border: none;
	column-gap: 0.25rem;
}

.ep-tabs__tab {
	appearance: none;
	background: transparent;
	color: inherit;
	font: inherit;
	border: none;
	border-bottom: 2px solid transparent;
	padding: 0.55rem 1rem 0.5rem;
	display: inline-flex;
	align-items: center;
	column-gap: 0.5rem;
	cursor: pointer;
	transition: var(--ep-transition-base);
	-webkit-tap-highlight-color: transparent;
	user-select: none;
	white-space: nowrap;
	justify-content: center;
}

.ep-tabs--vertical .ep-tabs__tab {
	border-bottom: none;
	border-right: 2px solid transparent;
	justify-content: flex-start;
}

.ep-tabs__tab:hover:not(.ep-tabs__tab--disabled):not(.ep-tabs__tab--selected) {
	background: var(--ep-color-background-faded);
}

.ep-tabs__tab:focus-visible {
	outline: var(--ep-outline-focus);
	outline-offset: -2px;
}

.ep-tabs__tab--disabled {
	opacity: 0.4;
	cursor: not-allowed;
}

.ep-tabs__tab--icon-above {
	flex-direction: column;
	row-gap: 0.25rem;
}

.ep-tabs--pills .ep-tabs__tab {
	border: none;
	border-radius: var(--ep-radius-pill, 999px);
}
.ep-tabs--filled .ep-tabs__tab {
	border: none;
	border-radius: var(--ep-radius-base);
}

/* selected color per hue (underline + pill/filled bg) */
.ep-tabs__tab--selected.ep-tabs__tab--primary {
	border-color: var(--ep-color-primary);
	color: var(--ep-color-primary);
}
.ep-tabs__tab--selected.ep-tabs__tab--primary-variant {
	border-color: var(--ep-color-primary-variant);
	color: var(--ep-color-primary-variant);
}
.ep-tabs__tab--selected.ep-tabs__tab--secondary {
	border-color: var(--ep-color-secondary);
	color: var(--ep-color-secondary);
}
.ep-tabs__tab--selected.ep-tabs__tab--secondary-variant {
	border-color: var(--ep-color-secondary-variant);
	color: var(--ep-color-secondary-variant);
}
.ep-tabs__tab--selected.ep-tabs__tab--error {
	border-color: var(--ep-color-error);
	color: var(--ep-color-error);
}
.ep-tabs__tab--selected.ep-tabs__tab--success {
	border-color: var(--ep-color-success);
	color: var(--ep-color-success);
}
.ep-tabs__tab--selected.ep-tabs__tab--warning {
	border-color: var(--ep-color-warning);
	color: var(--ep-color-warning);
}
.ep-tabs__tab--selected.ep-tabs__tab--information {
	border-color: var(--ep-color-information);
	color: var(--ep-color-information);
}

.ep-tabs--pills .ep-tabs__tab--selected,
.ep-tabs--filled .ep-tabs__tab--selected {
	color: var(--ep-color-contrast);
}
.ep-tabs--pills .ep-tabs__tab--selected.ep-tabs__tab--primary,
.ep-tabs--filled .ep-tabs__tab--selected.ep-tabs__tab--primary {
	background: var(--ep-color-primary);
	color: var(--ep-color-primary-contrast);
}
.ep-tabs--pills .ep-tabs__tab--selected.ep-tabs__tab--secondary,
.ep-tabs--filled .ep-tabs__tab--selected.ep-tabs__tab--secondary {
	background: var(--ep-color-secondary);
	color: var(--ep-color-secondary-contrast);
}
.ep-tabs--pills .ep-tabs__tab--selected.ep-tabs__tab--information,
.ep-tabs--filled .ep-tabs__tab--selected.ep-tabs__tab--information {
	background: var(--ep-color-information);
	color: var(--ep-color-contrast);
}

.ep-tabs__icon--above {
	font-size: 1.25em;
}

.ep-tabs__close {
	appearance: none;
	background: transparent;
	color: inherit;
	border: none;
	padding: 0;
	margin-left: 0.25rem;
	cursor: pointer;
	border-radius: var(--ep-radius-base);
	display: inline-flex;
	align-items: center;
	justify-content: center;
}

.ep-tabs__close:hover {
	background: var(--ep-color-background-faded);
}

.ep-tabs__add {
	appearance: none;
	background: transparent;
	color: inherit;
	border: none;
	padding: 0.5rem 0.75rem;
	cursor: pointer;
	border-radius: var(--ep-radius-base);
	display: inline-flex;
	align-items: center;
}

.ep-tabs__add:hover {
	background: var(--ep-color-background-faded);
}

.ep-tabs__add:focus-visible {
	outline: var(--ep-outline-focus);
	outline-offset: -2px;
}

.ep-tabs__extra {
	margin-left: auto;
	display: inline-flex;
	align-items: center;
	column-gap: 0.5rem;
	padding: 0 0.5rem;
}

.ep-tabs__panels {
	flex: 1 1 auto;
	min-width: 0;
}

.ep-tabs__panel {
	padding: 0.75rem 0;
}

.ep-tabs__panel:focus-visible {
	outline: var(--ep-outline-focus);
	outline-offset: 2px;
}
</style>

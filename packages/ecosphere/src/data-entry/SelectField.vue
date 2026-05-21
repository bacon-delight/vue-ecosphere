<template>
	<div
		class="ep-select"
		:class="[
			`ep-select--${size}`,
			state !== 'default' && `ep-select--${state}`,
			{
				'ep-select--disabled': disabled,
				'ep-select--bordered': bordered,
				'ep-select--open': isOpen,
				'ep-select--multiple': isMultiple,
			},
		]"
	>
		<label
			v-if="label"
			:id="labelId"
			:for="triggerId"
			class="ep-select__label"
			:class="state !== 'default' && `ep-select__label--${state}`"
		>
			{{ label }}
		</label>
		<div ref="rootRef" class="ep-select__wrapper">
			<div
				:id="triggerId"
				ref="triggerRef"
				class="ep-select__trigger"
				:tabindex="disabled ? -1 : 0"
				role="combobox"
				:aria-controls="listboxId"
				:aria-expanded="isOpen ? 'true' : 'false'"
				:aria-haspopup="'listbox'"
				:aria-labelledby="label ? labelId : undefined"
				:aria-label="!label ? ariaLabel || undefined : undefined"
				:aria-disabled="disabled || undefined"
				:aria-invalid="state === 'error' ? 'true' : undefined"
				:aria-describedby="describedById"
				:aria-activedescendant="activeOptionDomId || undefined"
				@click="onTriggerClick"
				@keydown="onTriggerKeydown"
				@focus="emit('focus', $event)"
				@blur="onTriggerBlur"
			>
				<div class="ep-select__selection">
					<template v-if="isMultiple || tags">
						<span
							v-for="(tag, i) in selectedDisplay"
							:key="`tag-${i}`"
							class="ep-select__tag"
						>
							{{ tag.label }}
							<button
								v-if="!disabled"
								type="button"
								class="ep-select__tag-close"
								:aria-label="`Remove ${tag.label}`"
								tabindex="-1"
								@click.stop="removeValue(tag.value)"
								@mousedown.prevent
							>
								<SVGIcon name="ri-close-line" aria-hidden />
							</button>
						</span>
					</template>
					<template v-else-if="selectedSingle">
						<span class="ep-select__single">{{
							selectedSingle.label
						}}</span>
					</template>

					<input
						v-if="showSearch || tags"
						ref="searchRef"
						v-model="searchText"
						class="ep-select__search"
						:placeholder="searchPlaceholder"
						:disabled="disabled"
						type="text"
						autocomplete="off"
						:aria-label="searchAriaLabel"
						@input="onSearchInput"
						@keydown="onSearchKeydown"
						@focus="onSearchFocus"
					/>
					<span
						v-else-if="!hasSelection"
						class="ep-select__placeholder"
						>{{ placeholder }}</span
					>
				</div>
				<div class="ep-select__icons">
					<button
						v-if="allowClear && hasSelection && !disabled"
						type="button"
						class="ep-select__icon-btn"
						:aria-label="clearLabel"
						tabindex="-1"
						@click.stop="clearAll"
						@mousedown.prevent
					>
						<SVGIcon name="ri-close-circle-line" aria-hidden />
					</button>
					<SVGIcon
						v-if="loading"
						class="ep-select__icon ep-select__icon--spin"
						name="ri-loader-4-line"
						aria-hidden
					/>
					<SVGIcon
						v-else
						class="ep-select__icon"
						:name="
							isOpen
								? 'ri-arrow-up-s-line'
								: 'ri-arrow-down-s-line'
						"
						aria-hidden
					/>
				</div>
			</div>
			<Transition name="ep-select-pop">
				<div
					v-if="isOpen"
					:id="listboxId"
					ref="listboxRef"
					class="ep-select__listbox"
					role="listbox"
					:aria-multiselectable="
						isMultiple || tags ? 'true' : undefined
					"
					:style="{ maxHeight: `${listboxMaxHeight}px` }"
					@mousedown.prevent
					@scroll="onListScroll"
				>
					<div v-if="loading" class="ep-select__loading">
						{{ loadingText }}
					</div>
					<div
						v-else-if="
							filteredOptions.length === 0 && !canCreateTag
						"
						class="ep-select__empty"
					>
						{{ notFoundText }}
					</div>
					<div
						v-else
						class="ep-select__virtual"
						:style="{ height: `${virtualTotalHeight}px` }"
					>
						<div
							class="ep-select__virtual-window"
							:style="{
								transform: `translateY(${virtualOffsetY}px)`,
							}"
						>
							<div
								v-for="(opt, vi) in visibleOptions"
								:id="`${listboxId}-opt-${virtualStart + vi}`"
								:key="`${opt.value}-${virtualStart + vi}`"
								class="ep-select__option"
								:class="[
									{
										'ep-select__option--active':
											virtualStart + vi === activeIndex,
										'ep-select__option--selected':
											isSelected(opt.value),
										'ep-select__option--disabled':
											opt.disabled,
									},
								]"
								role="option"
								:aria-selected="
									isSelected(opt.value) ? 'true' : 'false'
								"
								:aria-disabled="opt.disabled || undefined"
								:style="{ height: `${optionHeight}px` }"
								@click="selectOption(opt)"
								@mouseenter="activeIndex = virtualStart + vi"
							>
								<span class="ep-select__option-label">{{
									opt.label
								}}</span>
								<SVGIcon
									v-if="isSelected(opt.value)"
									class="ep-select__option-check"
									name="ri-check-line"
									aria-hidden
								/>
							</div>
						</div>
					</div>
					<div
						v-if="canCreateTag"
						class="ep-select__option ep-select__option--create"
						role="option"
						aria-selected="false"
						@click="createTag"
					>
						<SVGIcon name="ri-add-line" aria-hidden />
						<span>{{ createLabel }} "{{ searchText }}"</span>
					</div>
				</div>
			</Transition>
		</div>
		<div v-if="hasFooter" :id="describedById" class="ep-select__footer">
			<div
				v-if="alertMessage && state !== 'default'"
				class="ep-select__alert"
				:class="`ep-select__alert--${state}`"
				role="alert"
			>
				{{ alertMessage }}
			</div>
			<div v-else-if="assistiveText" class="ep-select__assistive">
				{{ assistiveText }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import {
	computed,
	nextTick,
	onBeforeUnmount,
	onMounted,
	ref,
	watch,
} from "vue";
import SVGIcon from "../general/SVGIcon.vue";
import { useEpId } from "../composables/useEpId";
import { useEpSize } from "../composables/useEpSize";
import type { EpSize } from "../general/config";

export type SelectPrimitive = string | number | boolean;
export type SelectValue = SelectPrimitive | SelectPrimitive[] | null;
export type DataEntryState = "default" | "error" | "warning" | "success";

export interface SelectOption {
	label: string;
	value: SelectPrimitive;
	disabled?: boolean;
	hidden?: boolean;
}

export type SelectOptionLike = SelectOption | string | number | boolean;

export interface SelectProps {
	value?: SelectValue;
	options?: SelectOptionLike[];
	label?: string;
	placeholder?: string;
	searchPlaceholder?: string;
	multiple?: boolean;
	tags?: boolean;
	allowClear?: boolean;
	showSearch?: boolean;
	loading?: boolean;
	disabled?: boolean;
	bordered?: boolean;
	state?: DataEntryState;
	size?: EpSize;
	assistiveText?: string;
	alertMessage?: string;
	ariaLabel?: string;
	listMaxHeight?: number;
	optionHeight?: number;
	notFoundText?: string;
	loadingText?: string;
	clearLabel?: string;
	createLabel?: string;
	searchAriaLabel?: string;
	filter?: ((option: SelectOption, query: string) => boolean) | null;
}

const props = withDefaults(defineProps<SelectProps>(), {
	value: null,
	options: () => [],
	label: "",
	placeholder: "Select",
	searchPlaceholder: "",
	multiple: false,
	tags: false,
	allowClear: false,
	showSearch: false,
	loading: false,
	disabled: false,
	bordered: true,
	state: "default",
	size: undefined,
	assistiveText: "",
	alertMessage: "",
	ariaLabel: "",
	listMaxHeight: 240,
	optionHeight: 32,
	notFoundText: "No options",
	loadingText: "Loading…",
	clearLabel: "Clear",
	createLabel: "Create",
	searchAriaLabel: "Search options",
	filter: null,
});

const emit = defineEmits<{
	(e: "update:value", value: SelectValue): void;
	(e: "change", value: SelectValue): void;
	(e: "search", query: string): void;
	(e: "clear"): void;
	(e: "open"): void;
	(e: "close"): void;
	(e: "focus", event: FocusEvent): void;
	(e: "blur", event: FocusEvent): void;
}>();

const size = useEpSize(() => props.size);
const triggerId = useEpId("ep-select-trigger");
const listboxId = useEpId("ep-select-list");
const labelId = useEpId("ep-select-label");
const describedById = useEpId("ep-select-desc");

const rootRef = ref<HTMLElement | null>(null);
const triggerRef = ref<HTMLElement | null>(null);
const searchRef = ref<HTMLInputElement | null>(null);
const listboxRef = ref<HTMLElement | null>(null);

const isOpen = ref(false);
const searchText = ref("");
const activeIndex = ref(-1);
const dynamicOptions = ref<SelectOption[]>([]); // user-created tags

const isMultiple = computed(() => props.multiple || props.tags);
const listboxMaxHeight = computed(() => props.listMaxHeight);

function normalizeOption(o: SelectOptionLike): SelectOption {
	if (typeof o === "object" && o !== null) return o;
	return { label: String(o), value: o };
}

const allOptions = computed<SelectOption[]>(() => {
	const base = (props.options || [])
		.map(normalizeOption)
		.filter((o) => !o.hidden);
	return [...base, ...dynamicOptions.value];
});

const filteredOptions = computed<SelectOption[]>(() => {
	const q = searchText.value.trim().toLowerCase();
	if (!q || (!props.showSearch && !props.tags)) return allOptions.value;
	if (props.filter)
		return allOptions.value.filter((o) => props.filter!(o, q));
	return allOptions.value.filter((o) => o.label.toLowerCase().includes(q));
});

const canCreateTag = computed(() => {
	if (!props.tags) return false;
	const q = searchText.value.trim();
	if (!q) return false;
	return !allOptions.value.some(
		(o) => String(o.value).toLowerCase() === q.toLowerCase()
	);
});

const valuesArray = computed<SelectPrimitive[]>(() => {
	if (props.value == null) return [];
	return Array.isArray(props.value)
		? props.value
		: [props.value as SelectPrimitive];
});

function isSelected(v: SelectPrimitive): boolean {
	return valuesArray.value.some((x) => x === v);
}

const selectedSingle = computed<SelectOption | null>(() => {
	if (isMultiple.value) return null;
	if (props.value == null || props.value === "") return null;
	const found = allOptions.value.find((o) => o.value === props.value);
	return found ?? null;
});

const selectedDisplay = computed<SelectOption[]>(() => {
	if (!isMultiple.value) return [];
	return valuesArray.value.map(
		(v) =>
			allOptions.value.find((o) => o.value === v) ?? {
				label: String(v),
				value: v,
			}
	);
});

const hasSelection = computed(() =>
	isMultiple.value
		? valuesArray.value.length > 0
		: selectedSingle.value !== null
);

const hasFooter = computed(
	() =>
		!!props.assistiveText ||
		(!!props.alertMessage && props.state !== "default")
);

// Virtual scroll
const scrollTop = ref(0);
const visibleCount = computed(
	() => Math.ceil(props.listMaxHeight / props.optionHeight) + 4
);
const virtualStart = computed(() =>
	Math.max(0, Math.floor(scrollTop.value / props.optionHeight) - 2)
);
const virtualEnd = computed(() =>
	Math.min(
		filteredOptions.value.length,
		virtualStart.value + visibleCount.value
	)
);
const visibleOptions = computed(() =>
	filteredOptions.value.slice(virtualStart.value, virtualEnd.value)
);
const virtualTotalHeight = computed(
	() => filteredOptions.value.length * props.optionHeight
);
const virtualOffsetY = computed(() => virtualStart.value * props.optionHeight);

const activeOptionDomId = computed(() => {
	if (activeIndex.value < 0) return "";
	return `${listboxId}-opt-${activeIndex.value}`;
});

function onListScroll(e: Event) {
	scrollTop.value = (e.target as HTMLElement).scrollTop;
}

function open() {
	if (props.disabled || isOpen.value) return;
	isOpen.value = true;
	emit("open");
	// Set activeIndex to first selected/enabled option
	const sel = filteredOptions.value.findIndex((o) => isSelected(o.value));
	activeIndex.value =
		sel >= 0 ? sel : filteredOptions.value.findIndex((o) => !o.disabled);
	scrollTop.value = 0;
	nextTick(() => {
		if (listboxRef.value) listboxRef.value.scrollTop = 0;
		if (props.showSearch || props.tags) searchRef.value?.focus();
	});
}

function close() {
	if (!isOpen.value) return;
	isOpen.value = false;
	if (!props.tags) searchText.value = "";
	emit("close");
}

function toggle() {
	if (isOpen.value) close();
	else open();
}

function commit(next: SelectValue) {
	emit("update:value", next);
	emit("change", next);
}

function selectOption(opt: SelectOption) {
	if (opt.disabled || props.disabled) return;
	if (isMultiple.value) {
		const set = new Set(valuesArray.value);
		if (set.has(opt.value)) set.delete(opt.value);
		else set.add(opt.value);
		commit(Array.from(set));
		searchText.value = "";
		searchRef.value?.focus();
	} else {
		commit(opt.value);
		close();
		triggerRef.value?.focus();
	}
}

function removeValue(v: SelectPrimitive) {
	if (props.disabled) return;
	if (isMultiple.value) {
		commit(valuesArray.value.filter((x) => x !== v));
	} else {
		commit(null);
	}
}

function clearAll() {
	if (props.disabled) return;
	commit(isMultiple.value ? [] : null);
	searchText.value = "";
	emit("clear");
}

function createTag() {
	const q = searchText.value.trim();
	if (!q) return;
	const opt: SelectOption = { label: q, value: q };
	dynamicOptions.value.push(opt);
	selectOption(opt);
}

function onTriggerClick() {
	if (props.disabled) return;
	toggle();
}

function onTriggerKeydown(e: KeyboardEvent) {
	if (props.disabled) return;
	switch (e.key) {
		case "ArrowDown":
			e.preventDefault();
			if (!isOpen.value) open();
			else moveActive(1);
			break;
		case "ArrowUp":
			e.preventDefault();
			if (!isOpen.value) open();
			else moveActive(-1);
			break;
		case "Home":
			if (isOpen.value) {
				e.preventDefault();
				setActiveFirst();
			}
			break;
		case "End":
			if (isOpen.value) {
				e.preventDefault();
				setActiveLast();
			}
			break;
		case "Enter":
		case " ":
			e.preventDefault();
			if (!isOpen.value) open();
			else activateCurrent();
			break;
		case "Escape":
			if (isOpen.value) {
				e.preventDefault();
				close();
			}
			break;
		case "Tab":
			if (isOpen.value) close();
			break;
	}
}

function onSearchInput() {
	if (!isOpen.value) open();
	activeIndex.value = filteredOptions.value.findIndex((o) => !o.disabled);
	emit("search", searchText.value);
}

function onSearchKeydown(e: KeyboardEvent) {
	switch (e.key) {
		case "ArrowDown":
			e.preventDefault();
			if (!isOpen.value) open();
			else moveActive(1);
			break;
		case "ArrowUp":
			e.preventDefault();
			moveActive(-1);
			break;
		case "Enter":
			e.preventDefault();
			if (canCreateTag.value && activeIndex.value < 0) {
				createTag();
			} else {
				activateCurrent();
			}
			break;
		case "Escape":
			e.preventDefault();
			close();
			triggerRef.value?.focus();
			break;
		case "Backspace":
			if (
				!searchText.value &&
				isMultiple.value &&
				valuesArray.value.length
			) {
				removeValue(valuesArray.value[valuesArray.value.length - 1]);
			}
			break;
		case "Tab":
			if (isOpen.value) close();
			break;
	}
}

function onSearchFocus() {
	if (!isOpen.value) open();
}

function onTriggerBlur(e: FocusEvent) {
	emit("blur", e);
}

function moveActive(delta: number) {
	const list = filteredOptions.value;
	if (!list.length) return;
	let idx = activeIndex.value;
	for (let i = 0; i < list.length; i++) {
		idx = (idx + delta + list.length) % list.length;
		if (!list[idx].disabled) {
			activeIndex.value = idx;
			scrollActiveIntoView();
			return;
		}
	}
}

function setActiveFirst() {
	activeIndex.value = filteredOptions.value.findIndex((o) => !o.disabled);
	scrollActiveIntoView();
}

function setActiveLast() {
	for (let i = filteredOptions.value.length - 1; i >= 0; i--) {
		if (!filteredOptions.value[i].disabled) {
			activeIndex.value = i;
			scrollActiveIntoView();
			return;
		}
	}
}

function activateCurrent() {
	const opt = filteredOptions.value[activeIndex.value];
	if (opt) selectOption(opt);
}

function scrollActiveIntoView() {
	const list = listboxRef.value;
	if (!list) return;
	const targetTop = activeIndex.value * props.optionHeight;
	const targetBottom = targetTop + props.optionHeight;
	nextTick(() => {
		if (targetTop < list.scrollTop) list.scrollTop = targetTop;
		else if (targetBottom > list.scrollTop + list.clientHeight)
			list.scrollTop = targetBottom - list.clientHeight;
	});
}

function onDocClick(e: MouseEvent) {
	if (!isOpen.value) return;
	const target = e.target as Node;
	if (rootRef.value && !rootRef.value.contains(target)) close();
}

onMounted(() => document.addEventListener("mousedown", onDocClick));
onBeforeUnmount(() => document.removeEventListener("mousedown", onDocClick));

watch(
	() => props.options,
	() => {
		activeIndex.value = Math.min(
			activeIndex.value,
			filteredOptions.value.length - 1
		);
	}
);

function focus() {
	triggerRef.value?.focus();
}
function blur() {
	triggerRef.value?.blur();
	searchRef.value?.blur();
}
defineExpose({ focus, blur, open, close });
</script>

<style>
.ep-select {
	display: flex;
	flex-direction: column;
	row-gap: 0.25rem;
	font-family: var(--ep-font-family-base, inherit);
	color: var(--ep-color-text, currentColor);

	&__label {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--ep-color-text, currentColor);

		&--error {
			color: var(--ep-color-error);
		}
		&--warning {
			color: var(--ep-color-warning);
		}
		&--success {
			color: var(--ep-color-success);
		}
	}

	&__wrapper {
		position: relative;
	}

	&__trigger {
		display: flex;
		align-items: center;
		column-gap: 0.5rem;
		min-height: 2rem;
		padding: 0.25rem 0.5rem;
		background: var(--ep-color-surface, transparent);
		border-radius: var(--ep-radius-md, 6px);
		cursor: pointer;
		transition: border-color 0.15s ease;

		&:focus-visible {
			outline: var(--ep-outline-focus, 2px solid var(--ep-color-primary));
			outline-offset: 1px;
		}
	}

	&--bordered &__trigger {
		border: 1px solid var(--ep-color-border, currentColor);
	}
	&--bordered.ep-select--error &__trigger {
		border-color: var(--ep-color-error);
	}
	&--bordered.ep-select--warning &__trigger {
		border-color: var(--ep-color-warning);
	}
	&--bordered.ep-select--success &__trigger {
		border-color: var(--ep-color-success);
	}

	&--disabled &__trigger {
		cursor: not-allowed;
		opacity: 0.6;
	}

	&--xs &__trigger {
		font-size: 0.75rem;
		padding: 0.125rem 0.375rem;
	}
	&--sm &__trigger {
		font-size: 0.8125rem;
		padding: 0.1875rem 0.5rem;
	}
	&--md &__trigger {
		font-size: 0.9375rem;
		padding: 0.25rem 0.625rem;
	}
	&--lg &__trigger {
		font-size: 1rem;
		padding: 0.375rem 0.75rem;
	}
	&--xl &__trigger {
		font-size: 1.125rem;
		padding: 0.5rem 0.875rem;
	}

	&__selection {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.25rem;
	}

	&__single,
	&__placeholder {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	&__placeholder {
		color: var(--ep-color-disabled, currentColor);
	}

	&__tag {
		display: inline-flex;
		align-items: center;
		column-gap: 0.25rem;
		padding: 0 0.375rem;
		background: var(
			--ep-color-primary-tint,
			var(--ep-color-surface-alt, #eef)
		);
		color: var(--ep-color-text);
		border-radius: var(--ep-radius-sm, 4px);
		font-size: 0.8125em;
		line-height: 1.4;
	}

	&__tag-close {
		all: unset;
		display: inline-flex;
		cursor: pointer;
		font-size: 0.875em;
		color: var(--ep-color-disabled, currentColor);

		&:hover {
			color: var(--ep-color-text);
		}
	}

	&__search {
		flex: 1;
		min-width: 4rem;
		border: 0;
		outline: 0;
		background: transparent;
		color: var(--ep-color-text);
		font: inherit;

		&::placeholder {
			color: var(--ep-color-disabled, currentColor);
		}
	}

	&__icons {
		display: inline-flex;
		align-items: center;
		column-gap: 0.25rem;
		color: var(--ep-color-disabled, currentColor);
		flex-shrink: 0;
	}

	&__icon-btn {
		all: unset;
		display: inline-flex;
		cursor: pointer;
		padding: 0.125rem;
		border-radius: 4px;

		&:hover {
			color: var(--ep-color-text);
		}
	}

	&__icon {
		display: inline-flex;
	}

	&__icon--spin {
		animation: ep-select-spin 1s linear infinite;
	}

	&__listbox {
		position: absolute;
		left: 0;
		right: 0;
		top: calc(100% + 4px);
		z-index: 50;
		overflow-y: auto;
		background: var(--ep-color-surface, #fff);
		border: 1px solid var(--ep-color-border, #ddd);
		border-radius: var(--ep-radius-md, 6px);
		box-shadow: var(--ep-shadow-md, 0 8px 24px rgba(0, 0, 0, 0.12));
		padding: 0.25rem 0;
	}

	&__virtual {
		position: relative;
		width: 100%;
	}

	&__virtual-window {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
	}

	&__option {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 0.75rem;
		cursor: pointer;
		font-size: 0.875rem;

		&--active {
			background: var(--ep-color-surface-alt, rgba(0, 0, 0, 0.04));
		}
		&--selected {
			color: var(--ep-color-primary);
			font-weight: 500;
		}
		&--disabled {
			cursor: not-allowed;
			opacity: 0.5;
		}
		&--create {
			column-gap: 0.5rem;
			color: var(--ep-color-primary);
			padding: 0.375rem 0.75rem;
			border-top: 1px solid var(--ep-color-border, #eee);
		}
	}

	&__option-label {
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	&__option-check {
		color: var(--ep-color-primary);
		margin-left: 0.5rem;
	}

	&__loading,
	&__empty {
		padding: 0.5rem 0.75rem;
		color: var(--ep-color-disabled, currentColor);
		font-size: 0.875rem;
		text-align: center;
	}

	&__footer {
		display: flex;
		column-gap: 1rem;
		align-items: center;
		font-size: 0.75rem;
	}

	&__assistive {
		color: var(--ep-color-disabled, currentColor);
	}

	&__alert {
		&--error {
			color: var(--ep-color-error);
		}
		&--warning {
			color: var(--ep-color-warning);
		}
		&--success {
			color: var(--ep-color-success);
		}
	}
}

.ep-select-pop-enter-active,
.ep-select-pop-leave-active {
	transition:
		opacity 0.12s ease,
		transform 0.12s ease;
}
.ep-select-pop-enter-from,
.ep-select-pop-leave-to {
	opacity: 0;
	transform: translateY(-4px);
}

@keyframes ep-select-spin {
	to {
		transform: rotate(360deg);
	}
}
</style>

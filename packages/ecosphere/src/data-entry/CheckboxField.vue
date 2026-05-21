<template>
	<label
		class="ep-checkbox"
		:class="[
			`ep-checkbox--${size}`,
			`ep-checkbox--${hue}`,
			{
				'ep-checkbox--checked': isChecked,
				'ep-checkbox--indeterminate': indeterminate,
				'ep-checkbox--disabled': disabled,
			},
		]"
	>
		<input
			ref="inputRef"
			type="checkbox"
			class="ep-checkbox__native"
			:checked="isChecked"
			:disabled="disabled"
			:name="name"
			:value="nativeValueAttr"
			:aria-label="ariaLabel || label"
			:aria-checked="indeterminate ? 'mixed' : isChecked ? 'true' : 'false'"
			:aria-describedby="describedBy"
			@change="onChange"
			@focus="emit('focus', $event)"
			@blur="emit('blur', $event)"
		/>
		<span class="ep-checkbox__box" aria-hidden="true">
			<svg
				v-if="indeterminate"
				class="ep-checkbox__indicator"
				viewBox="0 0 16 16"
				focusable="false"
			>
				<line
					x1="3"
					y1="8"
					x2="13"
					y2="8"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
				/>
			</svg>
			<svg
				v-else-if="isChecked"
				class="ep-checkbox__indicator"
				viewBox="0 0 16 16"
				focusable="false"
			>
				<polyline
					points="3,8.5 6.5,12 13,4.5"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</span>
		<span v-if="label || $slots.default" class="ep-checkbox__label">
			<slot>{{ label }}</slot>
		</span>
	</label>
</template>

<script setup lang="ts">
import { computed, ref, watchPostEffect } from "vue";
import { useEpSize } from "../composables/useEpSize";
import type { EpSize } from "../general/config";
import type { EpHue } from "../utilities/types/shared";

export type CheckboxValue = boolean | (string | number | boolean)[];

export interface CheckboxProps {
	value?: CheckboxValue;
	label?: string;
	disabled?: boolean;
	indeterminate?: boolean;
	size?: EpSize;
	hue?: EpHue;
	ariaLabel?: string;
	describedBy?: string;
	name?: string;
	/** Used when this checkbox is one of many sharing an array value */
	nativeValue?: string | number | boolean;
}

const props = withDefaults(defineProps<CheckboxProps>(), {
	value: false,
	label: undefined,
	disabled: false,
	indeterminate: false,
	size: undefined,
	hue: "information",
	ariaLabel: undefined,
	describedBy: undefined,
	name: undefined,
	nativeValue: undefined,
});

const emit = defineEmits<{
	(e: "update:value", value: CheckboxValue): void;
	(e: "change", value: CheckboxValue, event: Event): void;
	(e: "focus", event: FocusEvent): void;
	(e: "blur", event: FocusEvent): void;
}>();

const size = useEpSize(() => props.size);
const inputRef = ref<HTMLInputElement | null>(null);

const isArrayMode = computed(() => Array.isArray(props.value));

const isChecked = computed<boolean>(() => {
	if (Array.isArray(props.value)) {
		return props.nativeValue !== undefined && props.value.includes(props.nativeValue);
	}
	return !!props.value;
});

const nativeValueAttr = computed(() =>
	props.nativeValue === undefined ? undefined : String(props.nativeValue),
);

function onChange(e: Event) {
	if (props.disabled) return;
	const next: CheckboxValue = isArrayMode.value
		? toggleInArray(props.value as (string | number | boolean)[], props.nativeValue)
		: !isChecked.value;
	emit("update:value", next);
	emit("change", next, e);
}

function toggleInArray<T>(arr: T[], item: T | undefined): T[] {
	if (item === undefined) return arr;
	return arr.includes(item) ? arr.filter((v) => v !== item) : [...arr, item];
}

watchPostEffect(() => {
	if (inputRef.value) inputRef.value.indeterminate = props.indeterminate;
});
</script>

<style scoped>
.ep-checkbox {
	display: inline-flex;
	align-items: center;
	column-gap: 0.5rem;
	cursor: pointer;
	user-select: none;
	font-family: var(--ep-font-family-base);
	-webkit-tap-highlight-color: transparent;
	line-height: 1.4;

	&--disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	&__native {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	&__box {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		background: var(--ep-color-background, #fff);
		border: 1px solid var(--ep-color-border, currentColor);
		border-radius: 4px;
		transition: var(--ep-transition-base, all 0.2s ease);
		color: transparent;
	}

	&--xs &__box {
		width: 0.875rem;
		height: 0.875rem;
		border-radius: 3px;
	}
	&--sm &__box {
		width: 1rem;
		height: 1rem;
	}
	&--md &__box {
		width: 1.125rem;
		height: 1.125rem;
	}
	&--lg &__box {
		width: 1.25rem;
		height: 1.25rem;
		border-radius: 5px;
	}
	&--xl &__box {
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 6px;
	}

	&__indicator {
		width: 100%;
		height: 100%;
	}

	&__label {
		font-size: 1rem;
	}
	&--xs &__label {
		font-size: 0.75rem;
	}
	&--sm &__label {
		font-size: 0.875rem;
	}
	&--lg &__label {
		font-size: 1.125rem;
	}
	&--xl &__label {
		font-size: 1.25rem;
	}

	&__native:focus-visible + &__box {
		outline: var(--ep-outline-focus, 2px solid currentColor);
		outline-offset: 2px;
	}

	/* checked / indeterminate fills, per hue */
	&--checked.ep-checkbox--primary &__box,
	&--indeterminate.ep-checkbox--primary &__box {
		background: var(--ep-color-primary);
		border-color: var(--ep-color-primary);
		color: var(--ep-color-contrast, #fff);
	}
	&--checked.ep-checkbox--primary-variant &__box,
	&--indeterminate.ep-checkbox--primary-variant &__box {
		background: var(--ep-color-primary-variant, var(--ep-color-primary));
		border-color: var(--ep-color-primary-variant, var(--ep-color-primary));
		color: var(--ep-color-contrast, #fff);
	}
	&--checked.ep-checkbox--secondary &__box,
	&--indeterminate.ep-checkbox--secondary &__box {
		background: var(--ep-color-secondary);
		border-color: var(--ep-color-secondary);
		color: var(--ep-color-contrast, #fff);
	}
	&--checked.ep-checkbox--secondary-variant &__box,
	&--indeterminate.ep-checkbox--secondary-variant &__box {
		background: var(--ep-color-secondary-variant, var(--ep-color-secondary));
		border-color: var(--ep-color-secondary-variant, var(--ep-color-secondary));
		color: var(--ep-color-contrast, #fff);
	}
	&--checked.ep-checkbox--information &__box,
	&--indeterminate.ep-checkbox--information &__box {
		background: var(--ep-color-information);
		border-color: var(--ep-color-information);
		color: var(--ep-color-contrast, #fff);
	}
	&--checked.ep-checkbox--success &__box,
	&--indeterminate.ep-checkbox--success &__box {
		background: var(--ep-color-success);
		border-color: var(--ep-color-success);
		color: var(--ep-color-contrast, #fff);
	}
	&--checked.ep-checkbox--warning &__box,
	&--indeterminate.ep-checkbox--warning &__box {
		background: var(--ep-color-warning);
		border-color: var(--ep-color-warning);
		color: var(--ep-color-contrast, #fff);
	}
	&--checked.ep-checkbox--error &__box,
	&--indeterminate.ep-checkbox--error &__box {
		background: var(--ep-color-error);
		border-color: var(--ep-color-error);
		color: var(--ep-color-contrast, #fff);
	}

	&:hover:not(.ep-checkbox--disabled) &__box {
		border-color: var(--ep-color-primary);
	}
}
</style>

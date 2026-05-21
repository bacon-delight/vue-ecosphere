<template>
	<div
		class="ep-choice-chips"
		:class="[`ep-choice-chips--${size}`]"
		role="group"
		:aria-labelledby="label ? labelId : undefined"
		:aria-label="!label ? ariaLabel : undefined"
	>
		<div
			v-if="label"
			:id="labelId"
			class="ep-choice-chips__label"
			:class="state !== 'default' && `ep-choice-chips__label--${state}`"
		>
			{{ label }}
		</div>
		<div
			class="ep-choice-chips__options"
			:class="`ep-choice-chips__options--${alignment}`"
		>
			<button
				v-for="opt in normalizedOptions"
				:key="String(opt.value)"
				type="button"
				class="ep-choice-chips__chip"
				:class="[
					`ep-choice-chips__chip--${size}`,
					{
						'ep-choice-chips__chip--active': isSelected(opt.value),
						'ep-choice-chips__chip--disabled':
							opt.disabled || disabled,
						[`ep-choice-chips__chip--${hue}`]: isSelected(
							opt.value
						),
						'ep-choice-chips__chip--bordered': bordered,
					},
				]"
				:disabled="opt.disabled || disabled"
				:aria-pressed="isSelected(opt.value) ? 'true' : 'false'"
				@click="toggle(opt)"
			>
				<slot
					name="chip"
					:option="opt"
					:selected="isSelected(opt.value)"
				>
					{{ opt.label }}
				</slot>
			</button>
		</div>
		<div
			v-if="alertMessage && state !== 'default'"
			:id="describedById"
			class="ep-choice-chips__alert"
			:class="`ep-choice-chips__alert--${state}`"
			role="alert"
		>
			{{ alertMessage }}
		</div>
		<div
			v-else-if="assistiveText"
			:id="describedById"
			class="ep-choice-chips__assistive"
		>
			{{ assistiveText }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useEpId } from "../composables/useEpId";
import { useEpSize } from "../composables/useEpSize";
import type { EpSize } from "../general/config";
import type { EpHue } from "../utilities/types/shared";

export type ChoicePrimitive = string | number | boolean;
export type ChoiceChipsValue = ChoicePrimitive | ChoicePrimitive[] | null;

export interface ChoiceOption {
	label: string;
	value: ChoicePrimitive;
	disabled?: boolean;
	hidden?: boolean;
}

export type ChoiceOptionLike = ChoiceOption | string | number | boolean;
export type ChoiceAlignment = "flex" | "vertical" | "grid";
export type DataEntryState = "default" | "error" | "warning" | "success";

export interface ChoiceChipsProps {
	value?: ChoiceChipsValue;
	options?: ChoiceOptionLike[];
	multiple?: boolean;
	label?: string;
	alignment?: ChoiceAlignment;
	hue?: EpHue;
	state?: DataEntryState;
	size?: EpSize;
	disabled?: boolean;
	bordered?: boolean;
	assistiveText?: string;
	alertMessage?: string;
	ariaLabel?: string;
}

const props = withDefaults(defineProps<ChoiceChipsProps>(), {
	value: null,
	options: () => [],
	multiple: false,
	label: "",
	alignment: "flex",
	hue: "primary",
	state: "default",
	size: undefined,
	disabled: false,
	bordered: false,
	assistiveText: "",
	alertMessage: "",
	ariaLabel: "",
});

const emit = defineEmits<{
	(e: "update:value", value: ChoiceChipsValue): void;
	(e: "change", value: ChoiceChipsValue): void;
}>();

const size = useEpSize(() => props.size);
const labelId = useEpId("ep-choice-chips-label");
const describedById = useEpId("ep-choice-chips-desc");

function normalize(o: ChoiceOptionLike): ChoiceOption {
	if (typeof o === "object" && o !== null) return o;
	return { label: String(o), value: o };
}

const normalizedOptions = computed<ChoiceOption[]>(() =>
	(props.options || []).map(normalize).filter((o) => !o.hidden)
);

const valuesArray = computed<ChoicePrimitive[]>(() => {
	if (props.value == null) return [];
	return Array.isArray(props.value)
		? props.value
		: [props.value as ChoicePrimitive];
});

function isSelected(v: ChoicePrimitive): boolean {
	return valuesArray.value.some((x) => x === v);
}

function commit(next: ChoiceChipsValue) {
	emit("update:value", next);
	emit("change", next);
}

function toggle(opt: ChoiceOption) {
	if (opt.disabled || props.disabled) return;
	if (props.multiple) {
		const set = new Set(valuesArray.value);
		if (set.has(opt.value)) set.delete(opt.value);
		else set.add(opt.value);
		commit(Array.from(set));
	} else {
		commit(isSelected(opt.value) ? null : opt.value);
	}
}
</script>

<style>
.ep-choice-chips {
	display: flex;
	flex-direction: column;
	row-gap: 0.5rem;
	font-family: var(--ep-font-family-base, inherit);
	color: var(--ep-color-text, currentColor);

	&__label {
		font-size: 0.875rem;
		font-weight: 500;

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

	&__options {
		column-gap: 0.375rem;
		row-gap: 0.375rem;

		&--flex {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
		}
		&--vertical {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
		}
		&--grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
		}
	}

	&__chip {
		all: unset;
		box-sizing: border-box;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		font: inherit;
		line-height: 1;
		border-radius: var(--ep-radius-pill, 999px);
		background: var(--ep-color-surface-alt, rgba(0, 0, 0, 0.04));
		color: var(--ep-color-text, currentColor);
		transition:
			background 0.15s ease,
			color 0.15s ease,
			border-color 0.15s ease;

		&--bordered {
			border: 1px solid var(--ep-color-border, currentColor);
			background: transparent;
		}

		&--xs {
			padding: 0.125rem 0.5rem;
			font-size: 0.6875rem;
		}
		&--sm {
			padding: 0.1875rem 0.625rem;
			font-size: 0.75rem;
		}
		&--md {
			padding: 0.25rem 0.75rem;
			font-size: 0.8125rem;
		}
		&--lg {
			padding: 0.375rem 0.875rem;
			font-size: 0.9375rem;
		}
		&--xl {
			padding: 0.5rem 1rem;
			font-size: 1rem;
		}

		&:hover:not(.ep-choice-chips__chip--disabled) {
			background: var(--ep-color-surface-hover, rgba(0, 0, 0, 0.06));
		}

		&:focus-visible {
			outline: var(--ep-outline-focus, 2px solid var(--ep-color-primary));
			outline-offset: 2px;
		}

		&--disabled {
			cursor: not-allowed;
			opacity: 0.5;
		}

		&--active {
			color: var(--ep-color-on-primary, #fff);
			background: var(--ep-color-primary);
			border-color: var(--ep-color-primary);
		}

		&--active.ep-choice-chips__chip--primary {
			background: var(--ep-color-primary);
			border-color: var(--ep-color-primary);
			color: var(--ep-color-on-primary, #fff);
		}
		&--active.ep-choice-chips__chip--primary-variant {
			background: var(--ep-color-primary-variant);
			border-color: var(--ep-color-primary-variant);
			color: var(--ep-color-on-primary, #fff);
		}
		&--active.ep-choice-chips__chip--secondary {
			background: var(--ep-color-secondary);
			border-color: var(--ep-color-secondary);
			color: var(--ep-color-on-secondary, #fff);
		}
		&--active.ep-choice-chips__chip--secondary-variant {
			background: var(--ep-color-secondary-variant);
			border-color: var(--ep-color-secondary-variant);
			color: var(--ep-color-on-secondary, #fff);
		}
		&--active.ep-choice-chips__chip--information {
			background: var(--ep-color-information);
			border-color: var(--ep-color-information);
			color: #fff;
		}
		&--active.ep-choice-chips__chip--success {
			background: var(--ep-color-success);
			border-color: var(--ep-color-success);
			color: #fff;
		}
		&--active.ep-choice-chips__chip--warning {
			background: var(--ep-color-warning);
			border-color: var(--ep-color-warning);
			color: #fff;
		}
		&--active.ep-choice-chips__chip--error {
			background: var(--ep-color-error);
			border-color: var(--ep-color-error);
			color: #fff;
		}
	}

	&__assistive {
		font-size: 0.75rem;
		color: var(--ep-color-disabled, currentColor);
	}

	&__alert {
		font-size: 0.75rem;
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
</style>

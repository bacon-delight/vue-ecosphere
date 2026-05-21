<template>
	<div
		class="ep-checkbox-group"
		role="group"
		:aria-labelledby="label ? labelId : undefined"
		:aria-label="!label ? ariaLabel : undefined"
	>
		<div
			v-if="label"
			:id="labelId"
			class="ep-checkbox-group__label"
			:class="state !== 'default' && `ep-checkbox-group__label--${state}`"
		>
			{{ label }}
		</div>
		<div
			class="ep-checkbox-group__options"
			:class="`ep-checkbox-group__options--${alignment}`"
		>
			<CheckboxField
				v-for="opt in normalizedOptions"
				:key="String(opt.value)"
				:label="opt.label"
				:disabled="opt.disabled || disabled"
				:hue="hue"
				:size="size"
				:value="value"
				:native-value="opt.value"
				:name="name"
				@update:value="handleUpdate"
				@change="handleChange"
			/>
			<slot />
		</div>
		<div
			v-if="alertMessage && state !== 'default'"
			:id="assistId"
			class="ep-checkbox-group__alert-message"
			:class="`ep-checkbox-group__alert-message--${state}`"
		>
			{{ alertMessage }}
		</div>
		<div
			v-else-if="assistiveText"
			:id="assistId"
			class="ep-checkbox-group__assistive-text"
		>
			{{ assistiveText }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import CheckboxField from "./CheckboxField.vue";
import { useEpId } from "../composables/useEpId";
import { useEpSize } from "../composables/useEpSize";
import type { EpSize } from "../general/config";
import type { EpHue } from "../utilities/types/shared";

export type CheckboxGroupValue = (string | number | boolean)[];

export interface CheckboxOption {
	label: string;
	value: string | number | boolean;
	disabled?: boolean;
	hidden?: boolean;
}

export type CheckboxOptionLike =
	| CheckboxOption
	| string
	| number
	| boolean;

export type CheckboxGroupAlignment = "flex" | "vertical" | "grid";
export type DataEntryState = "default" | "error" | "warning" | "success";

export interface CheckboxGroupProps {
	value?: CheckboxGroupValue;
	options?: CheckboxOptionLike[];
	label?: string;
	assistiveText?: string;
	alertMessage?: string;
	state?: DataEntryState;
	alignment?: CheckboxGroupAlignment;
	disabled?: boolean;
	hue?: EpHue;
	size?: EpSize;
	ariaLabel?: string;
	name?: string;
}

const props = withDefaults(defineProps<CheckboxGroupProps>(), {
	value: () => [],
	options: () => [],
	label: "",
	assistiveText: "",
	alertMessage: "",
	state: "default",
	alignment: "flex",
	disabled: false,
	hue: "information",
	size: undefined,
	ariaLabel: undefined,
	name: undefined,
});

const emit = defineEmits<{
	(e: "update:value", value: CheckboxGroupValue): void;
	(e: "change", value: CheckboxGroupValue, event: Event): void;
}>();

const size = useEpSize(() => props.size);
const labelId = useEpId("ep-checkbox-group-label");
const assistId = useEpId("ep-checkbox-group-assist");

const normalizedOptions = computed<CheckboxOption[]>(() =>
	props.options
		.map((opt): CheckboxOption =>
			typeof opt === "object" && opt !== null && "label" in opt
				? (opt as CheckboxOption)
				: { label: String(opt), value: opt as string | number | boolean },
		)
		.filter((opt) => !opt.hidden),
);

function handleUpdate(next: boolean | CheckboxGroupValue) {
	if (Array.isArray(next)) emit("update:value", next);
}
function handleChange(next: boolean | CheckboxGroupValue, ev: Event) {
	if (Array.isArray(next)) emit("change", next, ev);
}
</script>

<style scoped>
.ep-checkbox-group {
	display: flex;
	flex-direction: column;
	row-gap: 0.5rem;
	font-family: var(--ep-font-family-base);

	&__label {
		font-size: 0.875rem;
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

	&__options {
		column-gap: 1.5rem;
		row-gap: 0.4rem;

		&--flex {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
		}
		&--vertical {
			display: flex;
			flex-direction: column;
		}
		&--grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
		}
	}

	&__assistive-text {
		font-size: 0.75rem;
		color: var(--ep-color-disabled, currentColor);
	}

	&__alert-message {
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

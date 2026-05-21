<template>
	<div
		class="ep-radio-group"
		:class="optionType === 'button' && 'ep-radio-group--button'"
		role="radiogroup"
		:aria-labelledby="label ? labelId : undefined"
		:aria-label="!label ? ariaLabel : undefined"
	>
		<div
			v-if="label"
			:id="labelId"
			class="ep-radio-group__label"
			:class="state !== 'default' && `ep-radio-group__label--${state}`"
		>
			{{ label }}
		</div>
		<div
			class="ep-radio-group__options"
			:class="[
				`ep-radio-group__options--${alignment}`,
				optionType === 'button' && 'ep-radio-group__options--button',
			]"
		>
			<RadioField
				v-for="opt in normalizedOptions"
				:key="String(opt.value)"
				:label="opt.label"
				:disabled="opt.disabled || disabled"
				:hue="hue"
				:size="size"
				:value="value"
				:native-value="opt.value"
				:name="groupName"
				:option-type="optionType"
				:button-style="buttonStyle"
				@update:value="handleUpdate"
				@change="handleChange"
			/>
			<slot />
		</div>
		<div
			v-if="alertMessage && state !== 'default'"
			class="ep-radio-group__alert-message"
			:class="`ep-radio-group__alert-message--${state}`"
		>
			{{ alertMessage }}
		</div>
		<div
			v-else-if="assistiveText"
			class="ep-radio-group__assistive-text"
		>
			{{ assistiveText }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import RadioField from "./RadioField.vue";
import { useEpId } from "../composables/useEpId";
import { useEpSize } from "../composables/useEpSize";
import type { EpSize } from "../general/config";
import type { EpHue } from "../utilities/types/shared";
import type { RadioValue, RadioOptionType, RadioButtonStyle } from "./RadioField.vue";

export interface RadioOption {
	label: string;
	value: string | number | boolean;
	disabled?: boolean;
	hidden?: boolean;
}
export type RadioOptionLike = RadioOption | string | number | boolean;

export type RadioGroupAlignment = "flex" | "vertical" | "grid";
export type DataEntryState = "default" | "error" | "warning" | "success";

export interface RadioGroupProps {
	value?: RadioValue;
	options?: RadioOptionLike[];
	label?: string;
	assistiveText?: string;
	alertMessage?: string;
	state?: DataEntryState;
	alignment?: RadioGroupAlignment;
	disabled?: boolean;
	hue?: EpHue;
	size?: EpSize;
	ariaLabel?: string;
	name?: string;
	optionType?: RadioOptionType;
	buttonStyle?: RadioButtonStyle;
}

const props = withDefaults(defineProps<RadioGroupProps>(), {
	value: null,
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
	optionType: "default",
	buttonStyle: "outline",
});

const emit = defineEmits<{
	(e: "update:value", value: RadioValue): void;
	(e: "change", value: RadioValue, event: Event): void;
}>();

const size = useEpSize(() => props.size);
const labelId = useEpId("ep-radio-group-label");
const autoName = useEpId("ep-radio-group");
const groupName = computed(() => props.name ?? autoName);

const normalizedOptions = computed<RadioOption[]>(() =>
	props.options
		.map((opt): RadioOption =>
			typeof opt === "object" && opt !== null && "label" in opt
				? (opt as RadioOption)
				: { label: String(opt), value: opt as string | number | boolean },
		)
		.filter((opt) => !opt.hidden),
);

function handleUpdate(v: RadioValue) {
	emit("update:value", v);
}
function handleChange(v: RadioValue, ev: Event) {
	emit("change", v, ev);
}
</script>

<style scoped>
.ep-radio-group {
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

		&--button {
			column-gap: 0;
			row-gap: 0;
			display: inline-flex;
			flex-wrap: nowrap;

			& > :deep(.ep-radio--button) {
				border-radius: 0;
				margin-left: -1px;
			}
			& > :deep(.ep-radio--button:first-of-type) {
				border-top-left-radius: var(--ep-radius-md, 6px);
				border-bottom-left-radius: var(--ep-radius-md, 6px);
				margin-left: 0;
			}
			& > :deep(.ep-radio--button:last-of-type) {
				border-top-right-radius: var(--ep-radius-md, 6px);
				border-bottom-right-radius: var(--ep-radius-md, 6px);
			}
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

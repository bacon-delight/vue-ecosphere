<template>
	<label
		class="ep-radio"
		:class="[
			`ep-radio--${size}`,
			`ep-radio--${hue}`,
			`ep-radio--${optionType}`,
			optionType === 'button' && `ep-radio--button-${buttonStyle}`,
			{
				'ep-radio--checked': isChecked,
				'ep-radio--disabled': disabled,
			},
		]"
	>
		<input
			type="radio"
			class="ep-radio__native"
			:checked="isChecked"
			:disabled="disabled"
			:name="name"
			:value="nativeValueAttr"
			:aria-label="ariaLabel || label"
			:aria-checked="isChecked ? 'true' : 'false'"
			@change="onChange"
			@focus="emit('focus', $event)"
			@blur="emit('blur', $event)"
		/>
		<span v-if="optionType === 'default'" class="ep-radio__circle" aria-hidden="true">
			<span class="ep-radio__dot" />
		</span>
		<span class="ep-radio__label">
			<slot>{{ label }}</slot>
		</span>
	</label>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useEpSize } from "../composables/useEpSize";
import type { EpSize } from "../general/config";
import type { EpHue } from "../utilities/types/shared";

export type RadioValue = string | number | boolean | null;
export type RadioOptionType = "default" | "button";
export type RadioButtonStyle = "outline" | "solid";

export interface RadioProps {
	value?: RadioValue;
	nativeValue: string | number | boolean;
	label?: string;
	disabled?: boolean;
	size?: EpSize;
	hue?: EpHue;
	ariaLabel?: string;
	name?: string;
	optionType?: RadioOptionType;
	buttonStyle?: RadioButtonStyle;
}

const props = withDefaults(defineProps<RadioProps>(), {
	value: null,
	label: undefined,
	disabled: false,
	size: undefined,
	hue: "information",
	ariaLabel: undefined,
	name: undefined,
	optionType: "default",
	buttonStyle: "outline",
});

const emit = defineEmits<{
	(e: "update:value", value: RadioValue): void;
	(e: "change", value: RadioValue, event: Event): void;
	(e: "focus", event: FocusEvent): void;
	(e: "blur", event: FocusEvent): void;
}>();

const size = useEpSize(() => props.size);
const isChecked = computed(() => props.value === props.nativeValue);
const nativeValueAttr = computed(() => String(props.nativeValue));

function onChange(e: Event) {
	if (props.disabled) return;
	emit("update:value", props.nativeValue);
	emit("change", props.nativeValue, e);
}
</script>

<style scoped>
.ep-radio {
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

	&__circle {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		background: var(--ep-color-background, #fff);
		border: 1px solid var(--ep-color-border, currentColor);
		border-radius: 50%;
		transition: var(--ep-transition-base, all 0.2s ease);
	}

	&--xs &__circle {
		width: 0.875rem;
		height: 0.875rem;
	}
	&--sm &__circle {
		width: 1rem;
		height: 1rem;
	}
	&--md &__circle {
		width: 1.125rem;
		height: 1.125rem;
	}
	&--lg &__circle {
		width: 1.25rem;
		height: 1.25rem;
	}
	&--xl &__circle {
		width: 1.5rem;
		height: 1.5rem;
	}

	&__dot {
		display: inline-block;
		width: 50%;
		height: 50%;
		border-radius: 50%;
		background: currentColor;
		transform: scale(0);
		transition: transform var(--ep-transition-base, 0.2s ease);
	}

	&--checked &__dot {
		transform: scale(1);
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

	&__native:focus-visible ~ &__circle {
		outline: var(--ep-outline-focus, 2px solid currentColor);
		outline-offset: 2px;
	}

	&--checked.ep-radio--primary &__circle {
		border-color: var(--ep-color-primary);
		color: var(--ep-color-primary);
	}
	&--checked.ep-radio--primary-variant &__circle {
		border-color: var(--ep-color-primary-variant, var(--ep-color-primary));
		color: var(--ep-color-primary-variant, var(--ep-color-primary));
	}
	&--checked.ep-radio--secondary &__circle {
		border-color: var(--ep-color-secondary);
		color: var(--ep-color-secondary);
	}
	&--checked.ep-radio--secondary-variant &__circle {
		border-color: var(--ep-color-secondary-variant, var(--ep-color-secondary));
		color: var(--ep-color-secondary-variant, var(--ep-color-secondary));
	}
	&--checked.ep-radio--information &__circle {
		border-color: var(--ep-color-information);
		color: var(--ep-color-information);
	}
	&--checked.ep-radio--success &__circle {
		border-color: var(--ep-color-success);
		color: var(--ep-color-success);
	}
	&--checked.ep-radio--warning &__circle {
		border-color: var(--ep-color-warning);
		color: var(--ep-color-warning);
	}
	&--checked.ep-radio--error &__circle {
		border-color: var(--ep-color-error);
		color: var(--ep-color-error);
	}

	&:hover:not(.ep-radio--disabled) &__circle {
		border-color: var(--ep-color-primary);
	}

	/* button-style radio */
	&--button {
		column-gap: 0;
		padding: 0.375rem 0.875rem;
		border: 1px solid var(--ep-color-border, currentColor);
		border-radius: var(--ep-radius-md, 6px);
		font-size: 0.875rem;
		background: var(--ep-color-background, transparent);
		transition: var(--ep-transition-base, all 0.2s ease);

		& > .ep-radio__label {
			font-size: inherit;
		}

		&.ep-radio--xs {
			padding: 0.125rem 0.5rem;
			font-size: 0.75rem;
		}
		&.ep-radio--sm {
			padding: 0.25rem 0.625rem;
			font-size: 0.8125rem;
		}
		&.ep-radio--lg {
			padding: 0.5rem 1rem;
			font-size: 1rem;
		}
		&.ep-radio--xl {
			padding: 0.625rem 1.25rem;
			font-size: 1.125rem;
		}
	}

	&--button.ep-radio--checked.ep-radio--button-outline {
		border-color: var(--ep-color-primary);
		color: var(--ep-color-primary);
	}
	&--button.ep-radio--checked.ep-radio--button-solid {
		background: var(--ep-color-primary);
		border-color: var(--ep-color-primary);
		color: var(--ep-color-contrast, #fff);
	}

	&--button:hover:not(.ep-radio--disabled):not(.ep-radio--checked) {
		border-color: var(--ep-color-primary);
		color: var(--ep-color-primary);
	}

	&--button &__native:focus-visible ~ .ep-radio__label {
		outline: var(--ep-outline-focus, 2px solid currentColor);
		outline-offset: 2px;
	}
}
</style>

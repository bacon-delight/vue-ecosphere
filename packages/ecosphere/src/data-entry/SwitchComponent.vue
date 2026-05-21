<template>
	<label
		class="ep-switch"
		:class="[
			`ep-switch--${size}`,
			`ep-switch--${hue}`,
			{
				'ep-switch--checked': checked,
				'ep-switch--disabled': disabled,
				'ep-switch--loading': loading,
			},
		]"
	>
		<button
			type="button"
			role="switch"
			class="ep-switch__track"
			:aria-checked="checked ? 'true' : 'false'"
			:aria-disabled="disabled || loading ? 'true' : undefined"
			:aria-label="label || ariaLabel"
			:disabled="disabled || loading"
			:tabindex="disabled ? -1 : 0"
			@click.prevent="toggle"
			@keydown.space.prevent="toggle"
		>
			<span class="ep-switch__thumb">
				<span v-if="loading" class="ep-switch__spinner" aria-hidden="true">
					<svg
						viewBox="0 0 24 24"
						width="0.75em"
						height="0.75em"
						focusable="false"
					>
						<circle
							cx="12"
							cy="12"
							r="9"
							fill="none"
							stroke="currentColor"
							stroke-width="3"
							stroke-linecap="round"
							stroke-dasharray="40 60"
						/>
					</svg>
				</span>
			</span>
			<span class="ep-switch__inner ep-switch__inner--on">
				<slot name="checked">{{ checkedText }}</slot>
			</span>
			<span class="ep-switch__inner ep-switch__inner--off">
				<slot name="unchecked">{{ uncheckedText }}</slot>
			</span>
		</button>
		<span v-if="label || $slots.default" class="ep-switch__label">
			<slot>{{ label }}</slot>
		</span>
	</label>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useEpSize } from "../composables/useEpSize";
import type { EpSize } from "../general/config";
import type { EpHue } from "../utilities/types/shared";

export interface SwitchProps {
	value?: boolean;
	label?: string;
	disabled?: boolean;
	loading?: boolean;
	size?: EpSize;
	hue?: EpHue;
	checkedText?: string;
	uncheckedText?: string;
	ariaLabel?: string;
}

const props = withDefaults(defineProps<SwitchProps>(), {
	value: false,
	label: undefined,
	disabled: false,
	loading: false,
	size: undefined,
	hue: "information",
	checkedText: "",
	uncheckedText: "",
	ariaLabel: undefined,
});

const emit = defineEmits<{
	(e: "update:value", value: boolean): void;
	(e: "change", value: boolean): void;
}>();

const size = useEpSize(() => props.size);
const checked = computed(() => props.value);

function toggle() {
	if (props.disabled || props.loading) return;
	const next = !props.value;
	emit("update:value", next);
	emit("change", next);
}
</script>

<style scoped>
.ep-switch {
	display: inline-flex;
	align-items: center;
	column-gap: 0.5rem;
	cursor: pointer;
	user-select: none;
	font-family: var(--ep-font-family-base);
	-webkit-tap-highlight-color: transparent;

	&--disabled,
	&--loading {
		cursor: not-allowed;
		opacity: 0.5;
	}

	&__track {
		all: unset;
		position: relative;
		display: inline-flex;
		align-items: center;
		background: var(--ep-color-disabled);
		border-radius: 999px;
		transition: var(--ep-transition-base);
		cursor: inherit;

		&:focus-visible {
			outline: var(--ep-outline-focus);
			outline-offset: 2px;
		}
	}

	&__thumb {
		position: absolute;
		left: 2px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: #fff;
		border-radius: 50%;
		box-shadow: var(--ep-shadow-sm);
		transition: var(--ep-transition-base);
	}

	&__inner {
		font-size: 0.75em;
		line-height: 1;
		color: #fff;
		transition: opacity var(--ep-transition-base);

		&--on {
			padding-inline: 0.4em 1.2em;
			opacity: 0;
		}
		&--off {
			padding-inline: 1.2em 0.4em;
			opacity: 1;
		}
	}

	&--checked &__inner--on {
		opacity: 1;
	}
	&--checked &__inner--off {
		opacity: 0;
	}

	&--xs &__track {
		height: 14px;
		min-width: 28px;
	}
	&--xs &__thumb {
		width: 10px;
		height: 10px;
	}
	&--sm &__track {
		height: 18px;
		min-width: 36px;
	}
	&--sm &__thumb {
		width: 14px;
		height: 14px;
	}
	&--md &__track {
		height: 22px;
		min-width: 44px;
	}
	&--md &__thumb {
		width: 18px;
		height: 18px;
	}
	&--lg &__track {
		height: 26px;
		min-width: 52px;
	}
	&--lg &__thumb {
		width: 22px;
		height: 22px;
	}
	&--xl &__track {
		height: 32px;
		min-width: 64px;
	}
	&--xl &__thumb {
		width: 28px;
		height: 28px;
	}

	&--checked &__thumb {
		left: calc(100% - 2px);
		transform: translateX(-100%);
	}

	&--primary.ep-switch--checked &__track {
		background: var(--ep-color-primary);
	}
	&--secondary.ep-switch--checked &__track {
		background: var(--ep-color-secondary);
	}
	&--success.ep-switch--checked &__track {
		background: var(--ep-color-success);
	}
	&--error.ep-switch--checked &__track,
	&--warning.ep-switch--checked &__track,
	&--information.ep-switch--checked &__track,
	&--primary-variant.ep-switch--checked &__track,
	&--secondary-variant.ep-switch--checked &__track {
		background: var(--ep-color-information);
	}
	&--warning.ep-switch--checked &__track {
		background: var(--ep-color-warning);
	}
	&--error.ep-switch--checked &__track {
		background: var(--ep-color-error);
	}

	&__spinner {
		display: inline-flex;
		color: var(--ep-color-contrast);
		animation: ep-switch-spin 0.85s linear infinite;
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
}

@keyframes ep-switch-spin {
	to {
		transform: rotate(360deg);
	}
}
</style>

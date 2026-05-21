<template>
	<component
		:is="tag"
		class="ep-button"
		:class="[
			`ep-button--${effectiveHue}`,
			`ep-button--${size}`,
			{
				'ep-button--ghost': ghost,
				'ep-button--block': block,
				'ep-button--loading': loading,
				'ep-button--icon-only': isIconOnly,
				'ep-button--disabled': isDisabled,
			},
		]"
		:type="tag === 'button' ? htmlType : undefined"
		:href="tag === 'a' ? href : undefined"
		:target="tag === 'a' ? target : undefined"
		:rel="
			tag === 'a' && target === '_blank'
				? 'noopener noreferrer'
				: undefined
		"
		:disabled="tag === 'button' ? isDisabled : undefined"
		:aria-disabled="isDisabled ? 'true' : undefined"
		:aria-busy="loading ? 'true' : undefined"
		@click="onClick"
	>
		<span v-if="loading" class="ep-button__spinner" aria-hidden="true">
			<svg viewBox="0 0 24 24" width="1em" height="1em" focusable="false">
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
		<span
			v-if="!loading && hasIcon && iconPosition === 'before'"
			class="ep-button__icon"
			aria-hidden="true"
		>
			<slot name="icon">
				<SVGIcon v-if="icon" :name="icon" />
			</slot>
		</span>
		<span v-if="hasLabel" class="ep-button__label">
			<slot>{{ label }}</slot>
		</span>
		<span
			v-if="!loading && hasIcon && iconPosition === 'after'"
			class="ep-button__icon"
			aria-hidden="true"
		>
			<slot name="icon">
				<SVGIcon v-if="icon" :name="icon" />
			</slot>
		</span>
	</component>
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue";
import SVGIcon from "../general/SVGIcon.vue";
import { useEpSize } from "../composables/useEpSize";
import type { EpSize } from "../general/config";
import type { EpHue, EpPosition } from "../utilities/types/shared";

export interface ButtonProps {
	/** Visible label. Override with the default slot for richer content. */
	label?: string;
	/** Semantic hue. */
	hue?: EpHue;
	/** Size. Falls back to `<EpConfigProvider size>`, then `"md"`. */
	size?: EpSize;
	/** Ghost / outline style. */
	ghost?: boolean;
	/** Force the destructive (error) palette regardless of `hue`. */
	danger?: boolean;
	/** Render full-width. */
	block?: boolean;
	/** Show a spinner and ignore clicks. */
	loading?: boolean;
	/** Disable interaction. */
	disabled?: boolean;
	/** `<button>` `type` attribute. Ignored when `href` is set. */
	htmlType?: "button" | "submit" | "reset";
	/** When set, the component renders as an `<a>` instead of a `<button>`. */
	href?: string;
	/** Anchor target. Auto-applies `rel="noopener noreferrer"` for `_blank`. */
	target?: "_self" | "_blank" | "_parent" | "_top";
	/** Icon name (resolved by `SVGIcon`). Prefer the `#icon` slot. */
	icon?: string;
	/** Position of the icon relative to the label. */
	iconPosition?: EpPosition;
}

const props = withDefaults(defineProps<ButtonProps>(), {
	label: undefined,
	hue: "primary",
	size: undefined,
	ghost: false,
	danger: false,
	block: false,
	loading: false,
	disabled: false,
	htmlType: "button",
	href: undefined,
	target: undefined,
	icon: undefined,
	iconPosition: "after",
});

const emit = defineEmits<{
	(e: "click", event: MouseEvent): void;
}>();

const slots = useSlots();
const size = useEpSize(() => props.size);

const tag = computed<"button" | "a">(() => (props.href ? "a" : "button"));
const isDisabled = computed(() => props.disabled || props.loading);
const effectiveHue = computed<EpHue>(() =>
	props.danger ? "error" : props.hue
);
const hasIcon = computed(() => Boolean(props.icon || slots.icon));
const hasLabel = computed(() => Boolean(props.label || slots.default));
const isIconOnly = computed(() => hasIcon.value && !hasLabel.value);

function onClick(event: MouseEvent) {
	if (isDisabled.value) {
		event.preventDefault();
		event.stopImmediatePropagation();
		return;
	}
	emit("click", event);
}
</script>

<style scoped>
.ep-button {
	display: inline-flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	column-gap: 0.5em;
	border-radius: var(--ep-radius-base);
	border: 1px solid var(--ep-color-transparent);
	cursor: pointer;
	transition: var(--ep-transition-base);
	-webkit-tap-highlight-color: transparent;
	user-select: none;
	font-family: var(--ep-font-family-base);
	line-height: 1.2;
	white-space: nowrap;

	&:focus-visible {
		outline: var(--ep-outline-focus);
		outline-offset: 2px;
	}

	&--block {
		display: flex;
		width: 100%;
	}

	&--disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	&--loading {
		cursor: progress;
	}

	&--icon-only {
		aspect-ratio: 1 / 1;
		padding-inline: 0;
	}

	&--xs {
		font-size: 0.75rem;
		padding: 0.25rem 1rem;
	}
	&--sm {
		font-size: 0.875rem;
		padding: 0.375rem 1.25rem;
	}
	&--md {
		font-size: 1rem;
		padding: 0.5rem 1.5rem;
	}
	&--lg {
		font-size: 1.125rem;
		padding: 0.625rem 1.75rem;
	}
	&--xl {
		font-size: 1.25rem;
		padding: 0.75rem 2rem;
	}

	&--primary {
		background: var(--ep-color-primary);
		color: var(--ep-color-primary-contrast);
		&:hover:not(.ep-button--disabled) {
			background: var(--ep-color-primary-variant);
			color: var(--ep-color-primary-variant-contrast);
		}
	}
	&--primary-variant {
		background: var(--ep-color-primary-variant);
		color: var(--ep-color-primary-variant-contrast);
		&:hover:not(.ep-button--disabled) {
			background: var(--ep-color-primary);
			color: var(--ep-color-primary-contrast);
		}
	}
	&--secondary {
		background: var(--ep-color-secondary);
		color: var(--ep-color-secondary-contrast);
		&:hover:not(.ep-button--disabled) {
			background: var(--ep-color-secondary-variant);
			color: var(--ep-color-secondary-variant-contrast);
		}
	}
	&--secondary-variant {
		background: var(--ep-color-secondary-variant);
		color: var(--ep-color-secondary-variant-contrast);
		&:hover:not(.ep-button--disabled) {
			background: var(--ep-color-secondary);
			color: var(--ep-color-secondary-contrast);
		}
	}
	&--error {
		background: var(--ep-color-error);
		color: var(--ep-color-contrast);
		&:hover:not(.ep-button--disabled) {
			background: var(--ep-color-error-variant);
		}
	}
	&--success {
		background: var(--ep-color-success);
		color: var(--ep-color-contrast);
		&:hover:not(.ep-button--disabled) {
			background: var(--ep-color-success-variant);
		}
	}
	&--warning {
		background: var(--ep-color-warning);
		color: var(--ep-color-contrast);
		&:hover:not(.ep-button--disabled) {
			background: var(--ep-color-warning-variant);
		}
	}
	&--information {
		background: var(--ep-color-information);
		color: var(--ep-color-contrast);
		&:hover:not(.ep-button--disabled) {
			background: var(--ep-color-information-variant);
		}
	}

	&--ghost {
		background: var(--ep-color-transparent);

		&.ep-button--primary {
			color: var(--ep-color-primary);
			border-color: var(--ep-color-primary);
			&:hover:not(.ep-button--disabled) {
				background: var(--ep-color-primary-variant);
				color: var(--ep-color-primary-variant-contrast);
			}
		}
		&.ep-button--primary-variant {
			color: var(--ep-color-primary-variant);
			border-color: var(--ep-color-primary-variant);
			&:hover:not(.ep-button--disabled) {
				background: var(--ep-color-primary);
				color: var(--ep-color-primary-contrast);
			}
		}
		&.ep-button--secondary {
			color: var(--ep-color-secondary);
			border-color: var(--ep-color-secondary);
			&:hover:not(.ep-button--disabled) {
				background: var(--ep-color-secondary-variant);
				color: var(--ep-color-secondary-variant-contrast);
			}
		}
		&.ep-button--secondary-variant {
			color: var(--ep-color-secondary-variant);
			border-color: var(--ep-color-secondary-variant);
			&:hover:not(.ep-button--disabled) {
				background: var(--ep-color-secondary);
				color: var(--ep-color-secondary-contrast);
			}
		}
		&.ep-button--error {
			color: var(--ep-color-error);
			border-color: var(--ep-color-error);
			&:hover:not(.ep-button--disabled) {
				background: var(--ep-color-error-variant);
				color: var(--ep-color-contrast);
			}
		}
		&.ep-button--success {
			color: var(--ep-color-success);
			border-color: var(--ep-color-success);
			&:hover:not(.ep-button--disabled) {
				background: var(--ep-color-success-variant);
				color: var(--ep-color-contrast);
			}
		}
		&.ep-button--warning {
			color: var(--ep-color-warning);
			border-color: var(--ep-color-warning);
			&:hover:not(.ep-button--disabled) {
				background: var(--ep-color-warning-variant);
				color: var(--ep-color-contrast);
			}
		}
		&.ep-button--information {
			color: var(--ep-color-information);
			border-color: var(--ep-color-information);
			&:hover:not(.ep-button--disabled) {
				background: var(--ep-color-information-variant);
				color: var(--ep-color-contrast);
			}
		}
	}

	&__spinner {
		display: inline-flex;
		animation: ep-button-spin 0.85s linear infinite;
	}
	&__icon,
	&__label {
		display: inline-flex;
		align-items: center;
	}
}

@keyframes ep-button-spin {
	to {
		transform: rotate(360deg);
	}
}
</style>

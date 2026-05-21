<template>
	<span
		class="ep-tag"
		:class="[
			`ep-tag--${hue}`,
			`ep-tag--${size}`,
			{
				'ep-tag--bordered': bordered,
				'ep-tag--disabled': disabled,
			},
		]"
		:aria-disabled="disabled ? 'true' : undefined"
	>
		<span v-if="hasIcon" class="ep-tag__icon" aria-hidden="true">
			<slot name="icon">
				<SVGIcon v-if="icon" :name="icon" />
			</slot>
		</span>
		<span class="ep-tag__label">
			<slot>{{ label }}</slot>
		</span>
		<button
			v-if="closable"
			type="button"
			class="ep-tag__close"
			:aria-label="closeLabel"
			:disabled="disabled"
			@click="onClose"
			@keydown.enter.prevent="onClose"
			@keydown.space.prevent="onClose"
		>
			<SVGIcon name="ri-close-line" />
		</button>
	</span>
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue";
import SVGIcon from "../general/SVGIcon.vue";
import { useEpSize } from "../composables/useEpSize";
import type { EpSize } from "../general/config";
import type { EpHue } from "../utilities/types/shared";

export interface TagProps {
	label?: string;
	/** Semantic hue or `"default"` for neutral. */
	hue?: EpHue | "default";
	size?: EpSize;
	closable?: boolean;
	bordered?: boolean;
	disabled?: boolean;
	icon?: string;
	/** Accessible label for the close button. */
	closeLabel?: string;
}

const props = withDefaults(defineProps<TagProps>(), {
	label: undefined,
	hue: "information",
	size: undefined,
	closable: false,
	bordered: false,
	disabled: false,
	icon: undefined,
	closeLabel: "Remove",
});

const emit = defineEmits<{
	(e: "close", event: MouseEvent | KeyboardEvent): void;
}>();

const slots = useSlots();
const size = useEpSize(() => props.size);
const hasIcon = computed(() => Boolean(props.icon || slots.icon));

function onClose(event: MouseEvent | KeyboardEvent) {
	if (props.disabled) return;
	emit("close", event);
}
</script>

<style scoped>
.ep-tag {
	display: inline-flex;
	align-items: center;
	column-gap: 0.25rem;
	background: var(--ep-color-background-faded, var(--ep-color-background));
	border: 1px solid var(--ep-color-transparent);
	border-radius: calc(var(--ep-radius-base) * 3);
	user-select: none;
	font-family: var(--ep-font-family-base);
	width: fit-content;
	white-space: nowrap;

	&--bordered {
		border-color: currentColor;
	}

	&--disabled {
		opacity: 0.4;
		pointer-events: none;
	}

	&--xs {
		padding: 0.125rem 0.375rem;
		font-size: 0.6875rem;
	}
	&--sm {
		padding: 0.125rem 0.5rem;
		font-size: 0.75rem;
	}
	&--md {
		padding: 0.25rem 0.625rem;
		font-size: 0.875rem;
	}
	&--lg {
		padding: 0.25rem 0.75rem;
		font-size: 1rem;
		font-weight: 600;
	}
	&--xl {
		padding: 0.375rem 1rem;
		font-size: 1.125rem;
		font-weight: 600;
	}

	&--default {
		color: var(--ep-color-contrast);
	}
	&--primary {
		color: var(--ep-color-primary);
	}
	&--primary-variant {
		color: var(--ep-color-primary-variant);
	}
	&--secondary {
		color: var(--ep-color-secondary);
	}
	&--secondary-variant {
		color: var(--ep-color-secondary-variant);
	}
	&--error {
		color: var(--ep-color-error);
	}
	&--success {
		color: var(--ep-color-success);
	}
	&--warning {
		color: var(--ep-color-warning);
	}
	&--information {
		color: var(--ep-color-information);
	}

	&__close {
		all: unset;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		border-radius: 50%;
		padding: 0.0625rem;
		transition: var(--ep-transition-base);

		&:hover {
			color: var(--ep-color-disabled);
		}

		&:focus-visible {
			outline: var(--ep-outline-focus);
			outline-offset: 1px;
		}
	}
}
</style>

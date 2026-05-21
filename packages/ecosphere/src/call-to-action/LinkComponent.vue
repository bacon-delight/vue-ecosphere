<template>
	<a
		class="ep-link"
		:class="[
			`ep-link--${hue}`,
			`ep-link--${size}`,
			{
				'ep-link--disabled': disabled,
				'ep-link--underline': underline,
			},
		]"
		:href="disabled ? undefined : href"
		:target="target"
		:rel="target === '_blank' ? 'noopener noreferrer' : undefined"
		:aria-disabled="disabled ? 'true' : undefined"
		:tabindex="disabled ? -1 : undefined"
		@click="onClick"
	>
		<span
			v-if="hasIcon && iconPosition === 'before'"
			class="ep-link__icon"
			aria-hidden="true"
		>
			<slot name="icon">
				<SVGIcon v-if="icon" :name="icon" />
			</slot>
		</span>
		<span class="ep-link__label">
			<slot>{{ label }}</slot>
		</span>
		<span
			v-if="hasIcon && iconPosition === 'after'"
			class="ep-link__icon"
			aria-hidden="true"
		>
			<slot name="icon">
				<SVGIcon v-if="icon" :name="icon" />
			</slot>
		</span>
	</a>
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue";
import SVGIcon from "../general/SVGIcon.vue";
import { useEpSize } from "../composables/useEpSize";
import type { EpSize } from "../general/config";
import type { EpHue, EpPosition } from "../utilities/types/shared";

export interface LinkProps {
	label?: string;
	hue?: EpHue;
	size?: EpSize;
	href?: string;
	target?: "_self" | "_blank" | "_parent" | "_top";
	disabled?: boolean;
	underline?: boolean;
	icon?: string;
	iconPosition?: EpPosition;
}

const props = withDefaults(defineProps<LinkProps>(), {
	label: undefined,
	hue: "information",
	size: undefined,
	href: undefined,
	target: undefined,
	disabled: false,
	underline: false,
	icon: undefined,
	iconPosition: "after",
});

const emit = defineEmits<{
	(e: "click", event: MouseEvent): void;
}>();

const slots = useSlots();
const size = useEpSize(() => props.size);
const hasIcon = computed(() => Boolean(props.icon || slots.icon));

function onClick(event: MouseEvent) {
	if (props.disabled) {
		event.preventDefault();
		event.stopImmediatePropagation();
		return;
	}
	emit("click", event);
}
</script>

<style scoped>
.ep-link {
	display: inline-flex;
	align-items: center;
	column-gap: 0.25rem;
	cursor: pointer;
	text-decoration: none;
	font-family: var(--ep-font-family-base);
	transition: var(--ep-transition-base);
	-webkit-tap-highlight-color: transparent;

	&:hover:not(.ep-link--disabled) {
		text-decoration: underline;
		color: var(--ep-color-hyperlink);
	}

	&:focus-visible {
		outline: var(--ep-outline-focus);
		outline-offset: 2px;
		border-radius: var(--ep-radius-base);
	}

	&--underline {
		text-decoration: underline;
	}

	&--disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	&--xs {
		font-size: 0.75rem;
	}
	&--sm {
		font-size: 0.875rem;
	}
	&--md {
		font-size: 1rem;
	}
	&--lg {
		font-size: 1.125rem;
	}
	&--xl {
		font-size: 1.25rem;
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
}
</style>

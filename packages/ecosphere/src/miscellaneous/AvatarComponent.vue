<template>
	<span
		class="ep-avatar"
		:class="[
			`ep-avatar--${size}`,
			`ep-avatar--${shape}`,
			`ep-avatar--${hue}`,
			`ep-avatar--${status}`,
		]"
		:role="ariaLabel ? 'img' : 'presentation'"
		:aria-label="ariaLabel ?? name"
	>
		<img
			v-if="image && !imageFailed"
			class="ep-avatar__image"
			:src="image"
			:alt="ariaLabel ?? name"
			@error="onImageError"
		/>
		<slot v-else-if="$slots.default" />
		<span v-else class="ep-avatar__initials">{{ initials }}</span>
	</span>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useEpSize } from "../composables/useEpSize";
import type { EpSize } from "../general/config";
import type { EpHue, EpShape } from "../utilities/types/shared";

export type EpAvatarStatus = "default" | "offline" | "online" | "away" | "busy";

export interface AvatarProps {
	/** Display name; first/last initials are derived when no image. */
	name?: string;
	/** Image source URL. If load fails, falls back to initials. */
	image?: string;
	size?: EpSize;
	shape?: Extract<EpShape, "circle" | "round" | "square">;
	hue?: EpHue | "default";
	status?: EpAvatarStatus;
	/** Accessible label (overrides `name` for screen readers). */
	ariaLabel?: string;
}

const props = withDefaults(defineProps<AvatarProps>(), {
	name: "",
	image: undefined,
	size: undefined,
	shape: "circle",
	hue: "information",
	status: "default",
	ariaLabel: undefined,
});

const size = useEpSize(() => props.size);
const imageFailed = ref(false);

watch(
	() => props.image,
	() => {
		imageFailed.value = false;
	}
);

function onImageError() {
	imageFailed.value = true;
}

const initials = computed(() => {
	const name = props.name?.trim() ?? "";
	if (!name) return "?";
	const parts = name.split(/\s+/).filter(Boolean);
	if (parts.length === 1) {
		return parts[0].slice(0, 2).toUpperCase();
	}
	return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
});
</script>

<style scoped>
.ep-avatar {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	user-select: none;
	box-sizing: border-box;
	font-family: var(--ep-font-family-base);
	font-weight: 600;
	background: var(--ep-color-background-faded, var(--ep-color-background));

	&--circle {
		border-radius: 50%;
	}
	&--round {
		border-radius: calc(var(--ep-radius-base) * 2);
	}
	&--square {
		border-radius: 0;
	}

	&--xs {
		width: 1.5rem;
		height: 1.5rem;
		font-size: 0.625rem;
	}
	&--sm {
		width: 2.5rem;
		height: 2.5rem;
		font-size: 0.875rem;
	}
	&--md {
		width: 3.5rem;
		height: 3.5rem;
		font-size: 1.125rem;
	}
	&--lg {
		width: 5rem;
		height: 5rem;
		font-size: 1.75rem;
	}
	&--xl {
		width: 6.5rem;
		height: 6.5rem;
		font-size: 2.25rem;
	}

	&--default {
		color: var(--ep-color-contrast);
	}
	&--primary {
		background: var(--ep-color-primary);
		color: var(--ep-color-primary-contrast);
	}
	&--primary-variant {
		background: var(--ep-color-primary-variant);
		color: var(--ep-color-primary-variant-contrast);
	}
	&--secondary {
		background: var(--ep-color-secondary);
		color: var(--ep-color-secondary-contrast);
	}
	&--secondary-variant {
		background: var(--ep-color-secondary-variant);
		color: var(--ep-color-secondary-variant-contrast);
	}
	&--error {
		background: var(--ep-color-error);
		color: var(--ep-color-contrast);
	}
	&--success {
		background: var(--ep-color-success);
		color: var(--ep-color-contrast);
	}
	&--warning {
		background: var(--ep-color-warning);
		color: var(--ep-color-contrast);
	}
	&--information {
		background: var(--ep-color-information);
		color: var(--ep-color-contrast);
	}

	&--online {
		box-shadow: 0 0 0 3px var(--ep-color-success);
	}
	&--away {
		box-shadow: 0 0 0 3px var(--ep-color-warning);
	}
	&--busy {
		box-shadow: 0 0 0 3px var(--ep-color-error);
	}
	&--offline {
		box-shadow: 0 0 0 3px var(--ep-color-offline, var(--ep-color-disabled));
	}

	&__image {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
}
</style>

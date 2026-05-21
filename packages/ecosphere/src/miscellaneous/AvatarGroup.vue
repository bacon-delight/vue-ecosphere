<template>
	<span
		class="ep-avatar-group"
		:style="{ '--ep-avatar-group-gap': `-${gap}px` }"
		role="group"
		:aria-label="ariaLabel"
	>
		<slot />
		<span v-if="overflow && overflow > 0" class="ep-avatar-group__overflow">
			+{{ overflow }}
		</span>
	</span>
</template>

<script setup lang="ts">
export interface AvatarGroupProps {
	/** Negative spacing between avatars in pixels (default 8). */
	gap?: number;
	/** Number to display in the overflow indicator (e.g. `+3`). */
	overflow?: number;
	ariaLabel?: string;
}

withDefaults(defineProps<AvatarGroupProps>(), {
	gap: 8,
	overflow: 0,
	ariaLabel: "Avatar group",
});
</script>

<style scoped>
.ep-avatar-group {
	display: inline-flex;
	align-items: center;

	& > :deep(.ep-avatar) + :deep(.ep-avatar),
	& > :deep(.ep-avatar) + .ep-avatar-group__overflow {
		margin-inline-start: var(--ep-avatar-group-gap, -8px);
		border: 2px solid var(--ep-color-background);
	}

	&__overflow {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 2rem;
		height: 2rem;
		padding-inline: 0.5rem;
		border-radius: 999px;
		background: var(
			--ep-color-background-faded,
			var(--ep-color-background)
		);
		color: var(--ep-color-contrast);
		font-family: var(--ep-font-family-base);
		font-size: 0.75rem;
		font-weight: 600;
	}
}
</style>

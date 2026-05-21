<template>
	<i
		class="ep-icon"
		:class="[
			name,
			{
				'ep-icon--spin': spin,
				[`ep-icon--rotate-${rotate}`]: rotate !== 0,
			},
		]"
		:aria-hidden="ariaLabel ? undefined : 'true'"
		:aria-label="ariaLabel"
		:role="ariaLabel ? 'img' : undefined"
	/>
</template>

<script setup lang="ts">
export interface SVGIconProps {
	/** Class name (e.g. `"ri-close-line"` for Remix Icon). */
	name: string;
	/** Continuously rotate. */
	spin?: boolean;
	/** Fixed rotation in degrees: 0, 90, 180, 270. */
	rotate?: 0 | 90 | 180 | 270;
	/** Accessible label. When omitted, the icon is treated as decorative. */
	ariaLabel?: string;
}

withDefaults(defineProps<SVGIconProps>(), {
	spin: false,
	rotate: 0,
	ariaLabel: undefined,
});
</script>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css");

.ep-icon {
	display: inline-block;
	line-height: 1;

	&--spin {
		animation: ep-icon-spin 1s linear infinite;
	}

	&--rotate-90 {
		transform: rotate(90deg);
	}
	&--rotate-180 {
		transform: rotate(180deg);
	}
	&--rotate-270 {
		transform: rotate(270deg);
	}
}

@keyframes ep-icon-spin {
	to {
		transform: rotate(360deg);
	}
}
</style>

<template lang="pug">
.navbar
	img.navbar__logo(
		v-if="branding.logo",
		:src="branding.logo",
		@click="handleBrandingClick"
	)
	.navbar__title(
		v-if="branding.label",
		:class="`navbar__title--${hue}`",
		@click="handleBrandingClick"
	) {{ branding.label }}
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type {
	hue,
	theme,
	menu_item,
	navbar_branding,
} from "@/plugin/utilities/types.interface";

export default defineComponent({
	name: "NavigationBar",
	props: {
		branding: {
			type: Object as PropType<navbar_branding>,
			default: () => {
				return {
					logo: "",
					label: "",
					action: () => {},
				};
			},
		},
		options: {
			type: Array as PropType<menu_item[]>,
			default: () => [],
		},
		hue: {
			type: String as PropType<hue>,
			default: "primary",
		},
		theme: {
			type: String as PropType<theme>,
			default: "auto",
		},
	},
	methods: {
		handleBrandingClick(): void {
			if (this.branding.action) {
				this.branding.action();
			}
		},
	},
});
</script>

<style lang="scss" scoped>
.navbar {
	background: $color-background;
	padding: 0.3rem 0.5rem;
	display: flex;
	flex-direction: row;
	align-items: center;
	column-gap: 0.25rem;
	user-select: none;
	width: 100%;

	&__logo {
		max-height: 2rem;
		cursor: pointer;
	}

	&__title {
		cursor: pointer;
		transition: $transition-standard;

		&:hover {
			color: $color-information;
		}
	}
}
</style>

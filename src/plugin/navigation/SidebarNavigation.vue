<template lang="pug">
.sidebar(:class="[{ 'sidebar--responsive': responsive }]")
	MenuItem(
		v-for="option in options",
		:option="option",
		:hue="hue",
		:skeleton="skeleton"
	)

Teleport(to="body")
	Transition(name="sidebar-overlay")
		.overlay(v-if="overlay && responsive", @click="overlay = false")
			.overlay__menu(@click.stop)
				MenuItem(
					v-for="option in options",
					:option="option",
					:hue="hue",
					:skeleton="skeleton",
					@action="overlay = false"
				)

Teleport(to="body")
	Transition(name="trigger-overlay")
		SVGIcon.trigger(
			v-if="!overlay && responsive",
			name="ri-menu-4-line",
			@click="overlay = true"
		)
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type { hue, theme, menu_item } from "@/plugin/utilities/types.interface";
import { hue_options, theme_options } from "@/plugin/utilities/types.interface";
import MenuItem from "./MenuNavigation/MenuItem.vue";
import SVGIcon from "@/plugin/general/SVGIcon.vue";

export default defineComponent({
	name: "SidebarNavigation",
	props: {
		options: {
			type: Array as PropType<menu_item[]>,
			required: true,
		},
		hue: {
			type: String as PropType<hue>,
			default: "information",
			validator(value: hue): boolean {
				return hue_options.includes(value);
			},
		},
		theme: {
			type: String as PropType<theme>,
			default: "auto",
			validator(value: theme): boolean {
				return theme_options.includes(value);
			},
		},
		skeleton: {
			type: Boolean as PropType<boolean>,
			default: true,
		},
		responsive: {
			type: Boolean as PropType<boolean>,
			default: false,
		},
	},
	data() {
		return {
			overlay: false,
		};
	},
	components: {
		SVGIcon,
		MenuItem,
	},
});
</script>

<style lang="scss" scoped>
.sidebar {
	max-height: 100%;
	overflow-y: auto;
	background: $color-background;
	color: $color-contrast;
	display: flex;
	flex-direction: column;
	row-gap: 0.25rem;
	padding: 0.5rem;
	transition: $transition-standard;
	// @include scrollbar-vertical;

	&--responsive {
		@include respond-below(sm) {
			display: none;
		}
	}
}

.overlay {
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(#bbbbbb, 0.8);
	overflow: hidden;
	cursor: pointer;
	display: none;
	-webkit-tap-highlight-color: transparent;

	@include respond-below(sm) {
		display: block;
	}

	&__menu {
		min-width: 50vw;
		width: fit-content;
		background: $color-background;
		height: 100%;
		overflow-y: auto;
		padding: 0.5rem;
		border-top-right-radius: $border-radius-standard;
		border-bottom-right-radius: $border-radius-standard;

		@include respond-below(xs) {
			min-width: 75vw;
		}
	}
}

.trigger {
	position: absolute;
	top: 5.5rem;
	left: 0;
	background: $color-background;
	padding: 0.5rem;
	border-top-right-radius: $border-radius-standard;
	border-bottom-right-radius: $border-radius-standard;
	cursor: pointer;
	box-shadow: $box-shadow-standard;
	display: none;

	@include respond-below(sm) {
		display: block;
	}

	&:hover {
		background: $color-background-faded;
	}
}

.sidebar-overlay-enter-active,
.sidebar-overlay-leave-active {
	transition: $transition-standard;
}

.trigger-overlay-enter-active,
.trigger-overlay-leave-active {
	transition: $transition-standard;
}

.sidebar-overlay-enter-active .overlay__menu,
.sidebar-overlay-leave-active .overlay__menu {
	transition: $transition-standard;
}

.sidebar-overlay-enter-from {
	opacity: 0;
}

.sidebar-overlay-leave-to {
	opacity: 0;
}

.trigger-overlay-enter-from {
	transform: translateX(-100%);
}

.trigger-overlay-leave-to {
	transform: translateX(-100%);
}

.sidebar-overlay-enter-from .overlay__menu,
.sidebar-overlay-leave-to .overlay__menu {
	transform: translateX(-100%);
}
</style>

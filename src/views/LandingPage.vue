<template lang="pug">
DynamicBackground.background
.container
	.container__navbar &nbsp;
	.container__content.content
		img.content__logo(src="logo.png")
		.content__header {{ $t("pages.landing.title") }}
		.content__subheader {{ $t("pages.landing.subtitle") }}
		.content__description {{ $t("pages.landing.description") }}
		.content__actions
			ButtonComponent(
				label="Get Started",
				@click="$router.push('/introduction')",
				icon="ri-arrow-right-line",
				size="sm"
			)
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DynamicBackground from "@/components/DynamicBackground.vue";
import ButtonComponent from "@/plugin/call-to-action/ButtonComponent.vue";

export default defineComponent({
	name: "LandingPage",
	components: {
		DynamicBackground,
		ButtonComponent,
	},
});
</script>

<style lang="scss" scoped>
.container {
	height: 100vh;
	overflow: hidden;
	color: $color-contrast;
	display: grid;
	grid-template-rows: min-content 1fr;
	position: relative;

	&__content {
		display: flex;
		flex-direction: column;
		row-gap: 0.5rem;
		align-items: center;
		justify-content: center;
	}

	&::before {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: $color-background-faded;
		opacity: 0.6;
		content: "";
		z-index: -1;
	}
}

.background {
	position: absolute;
	z-index: -2;
	height: 100vh;
	width: 100vw;
	overflow: hidden;
}

.content {
	&__logo {
		height: 8rem;
	}

	&__header {
		@include header-3;
		text-align: center;
	}

	&__subheader {
		@include header-6;
	}

	&__description {
		@include font-regular;
		text-align: center;
		margin-top: 1rem;
		padding: 0 1.5rem;
		max-width: 600px;
	}

	&__actions {
		margin-top: 0.5rem;
		display: flex;
		align-items: center;
	}
}
</style>

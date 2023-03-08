<template lang="pug">
.footer
	img.footer__contributors(
		src="https://contrib.rocks/image?repo=bacon-delight/vue-ecosphere",
		@click="navigateTo('https://github.com/bacon-delight/vue-ecosphere/graphs/contributors')"
	)
	.footer__edit Caught a mistake or want to improve the content on this page?
	img.footer__logo(src="/logo.png", @click="navigateTo('/')")
	.footer__brand Ecosphere Design System
	.footer__description
		span Released as Open Source under the &nbsp;
		LinkComponent(
			label="MIT License",
			href="https://opensource.org/license/mit/",
			target="_blank"
		)
	.footer__description
		span Copyright &copy; 2021 - {{ new Date().getFullYear() }} &nbsp;
		LinkComponent(label="Team Ecosphere", href="/about")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LinkComponent from "@/plugin/call-to-action/LinkComponent.vue";

export default defineComponent({
	name: "CommonLayout",
	components: {
		LinkComponent,
	},
	methods: {
		navigateTo(href: string): void {
			if (href.includes("http")) {
				window.open(href);
			} else {
				this.$router.push(href);
			}
		},
	},
});
</script>

<style lang="scss" scoped>
.footer {
	display: block;
	background: $color-background;
	padding: 1rem;
	box-shadow: $box-shadow-heavy;
	border-radius: $border-radius-standard;
	display: flex;
	flex-direction: column;
	border: 1px solid rgba(#868686, 0.3);

	@include respond-below(sm) {
		border-radius: 0;
		box-shadow: none;
		border: none;
	}

	&__contributors {
		height: 2rem;
	}

	&__edit {
		text-align: center;
		@include font-footnote;
		color: $color-disabled;
		margin: 0.5rem 0;
	}

	&__logo {
		height: 8rem;
		width: 8rem;
		margin: 1rem auto 0.5rem;
		cursor: pointer;
		transition: $transition-standard;
		-webkit-tap-highlight-color: transparent;

		&:hover {
			opacity: 0.5;
			filter: grayscale(100%);
		}
	}

	&__brand {
		text-align: center;
		@include header-5;
	}

	&__description {
		text-align: center;
		@include font-light;
	}
}
</style>

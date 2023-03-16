<template lang="pug">
.wrapper
	.wrapper__title {{ $t("pages.about.team.title") }}
	.wrapper__body
		.team
			.team__member
				AvatarComponent.team__avatar(
					name="Dipanjan De",
					size="lg",
					image="https://bacon-delight.sirv.com/Users/Dipanjan.jpeg?cw=1400"
				)
				.team__name Dipanjan De
				.team__email
					LinkComponent(
						label="Email",
						icon="ri-mail-line",
						icon-position="before",
						hue="information",
						href="mailto:hello@dipanjande.com"
					)
				.team__tags
					TagComponent(label="Design", size="sm", hue="success")
					TagComponent(label="Components", size="sm", hue="warning")
					TagComponent(label="Plugin", size="sm")
				.team__section
					SVGIcon.team__section-icon(name="ri-braces-line")
					.team__section-description Founder - Ecosphere
				.team__section
					SVGIcon.team__section-icon(name="ri-suitcase-line")
					.team__section-description
						span Full Stack - &nbsp;
						LinkComponent(
							label="Karkinos Healthcare",
							href="https://www.karkinos.in/",
							target="_blank"
						)
				.team__section
					SVGIcon.team__section-icon(name="ri-map-pin-2-line")
					.team__section-description Bangalore, KA, India

				//- Socials
				.team__header Socials
				.social
					LinkComponent.social__link(
						label="Portfolio",
						icon="ri-global-line",
						icon-position="before",
						hue="error",
						href="https://dipanjande.com/",
						target="_blank"
					)
					LinkComponent.social__link(
						label="LinkedIn",
						icon="ri-linkedin-line",
						icon-position="before",
						hue="error",
						href="https://www.linkedin.com/in/dipanjan131/",
						target="_blank"
					)
					LinkComponent.social__link(
						label="GitHub",
						icon="ri-github-line",
						icon-position="before",
						hue="error",
						href="https://github.com/bacon-delight",
						target="_blank"
					)
					LinkComponent.social__link(
						label="Instagram",
						icon="ri-instagram-line",
						icon-position="before",
						hue="error",
						href="https://www.instagram.com/bacon_delight/",
						target="_blank"
					)
					LinkComponent.social__link(
						label="Get Mentored on ADPList",
						icon="ri-hand-heart-line",
						icon-position="before",
						hue="error",
						href="https://adplist.org/mentors/dipanjan-de",
						target="_blank"
					)

			.team__member
				AvatarComponent.team__avatar(
					name="Nilsen Chaubey",
					size="lg",
					image="https://bacon-delight.sirv.com/Users/Nilsen.jpeg?ch=1400"
				)
				.team__name Nilsen Chaubey
				.team__tags
					TagComponent(label="Design", size="sm", hue="success")
				.team__section
					SVGIcon.team__section-icon(name="ri-suitcase-line")
					.team__section-description
						span Designer - &nbsp;
						LinkComponent(
							label="Karkinos Healthcare",
							href="https://www.karkinos.in/",
							target="_blank"
						)
				.team__section
					SVGIcon.team__section-icon(name="ri-map-pin-2-line")
					.team__section-description Bangalore, KA, India

				//- Socials
				.team__header Socials
				.social
					LinkComponent.social__link(
						label="LinkedIn",
						icon="ri-linkedin-line",
						icon-position="before",
						hue="error",
						href="https://www.linkedin.com/in/nilsen-chaubey-70a95b204/",
						target="_blank"
					)
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SVGIcon from "@/plugin/general/SVGIcon.vue";
import LinkComponent from "@/plugin/call-to-action/LinkComponent.vue";
import AvatarComponent from "@/plugin/miscellaneous/AvatarComponent.vue";
import TagComponent from "@/plugin/miscellaneous/TagComponent.vue";

export default defineComponent({
	name: "TeamPage",
	components: {
		SVGIcon,
		LinkComponent,
		AvatarComponent,
		TagComponent,
	},
});
</script>

<style lang="scss" scoped>
.team {
	margin: 1.5rem 0;
	display: grid;
	grid-template-columns: 1fr 1fr;
	column-gap: 1rem;
	row-gap: 1rem;

	@include respond-below(sm) {
		grid-template-columns: 1fr;
	}

	&__member {
		border: 1px solid $color-divider;
		border-radius: $border-radius-standard;
		padding: 1rem;
		box-shadow: $box-shadow-heavy;
		background: $color-background;
		// height: fit-content;
	}

	&__email {
		text-align: center;
	}

	&__tags {
		margin: 0.75rem 0 1rem;
		display: flex;
		flex-wrap: wrap;
		column-gap: 0.5rem;
		row-gap: 0.5rem;
		justify-content: center;
	}

	&__avatar {
		margin: 0 auto 1rem;
	}

	&__name {
		@include header-4;
		margin: 0 0 0.5rem;
		text-align: center;
	}

	&__header {
		@include header-6;
	}

	&__section {
		margin: 0 0 0.25rem;
		@include font-light;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		column-gap: 0.7rem;
	}
}

.social {
	display: flex;
	flex-direction: column;
	row-gap: 0.25rem;
}
</style>

<template>
	<div class="wrapper">
		<div class="wrapper__title">{{ $t("pages.about.team.title") }}</div>
		<div class="wrapper__body">
			<div class="team">
				<div class="team__member">
					<AvatarComponent class="team__avatar" name="Dipanjan De" size="lg" image="https://bacon-delight.sirv.com/Users/Dipanjan.jpeg?cw=1400"></AvatarComponent>
					<div class="team__name">Dipanjan De</div>
					<div class="team__email">
						<LinkComponent label="Email" icon="ri-mail-line" icon-position="before" hue="information" href="mailto:hello@dipanjande.com"></LinkComponent>
					</div>
					<div class="team__tags">
						<TagComponent label="Design" size="sm" hue="success"></TagComponent>
						<TagComponent label="Components" size="sm" hue="warning"></TagComponent>
						<TagComponent label="Plugin" size="sm"></TagComponent>
					</div>
					<div class="team__section">
						<SVGIcon class="team__section-icon" name="ri-braces-line"></SVGIcon>
						<div class="team__section-description">Founder - Ecosphere</div>
					</div>
					<div class="team__section">
						<SVGIcon class="team__section-icon" name="ri-suitcase-line"></SVGIcon>
						<div class="team__section-description"><span>Tech Specialist - &nbsp;</span>
							<LinkComponent label="Vince AS" href="https://vince.no/" target="_blank"></LinkComponent>
						</div>
					</div>
					<div class="team__section">
						<SVGIcon class="team__section-icon" name="ri-map-pin-2-line"></SVGIcon>
						<div class="team__section-description">Bangalore, KA, India</div>
					</div>
					<div class="team__header">Socials</div>
					<div class="social">
						<LinkComponent class="social__link" label="Portfolio" icon="ri-global-line" icon-position="before" hue="error" href="https://dipanjande.com/" target="_blank"></LinkComponent>
						<LinkComponent class="social__link" label="LinkedIn" icon="ri-linkedin-line" icon-position="before" hue="error" href="https://www.linkedin.com/in/dipanjan131/" target="_blank"></LinkComponent>
						<LinkComponent class="social__link" label="GitHub" icon="ri-github-line" icon-position="before" hue="error" href="https://github.com/bacon-delight" target="_blank"></LinkComponent>
						<LinkComponent class="social__link" label="Instagram" icon="ri-instagram-line" icon-position="before" hue="error" href="https://www.instagram.com/bacon_delight/" target="_blank"></LinkComponent>
						<LinkComponent class="social__link" label="Get Mentored on ADPList" icon="ri-hand-heart-line" icon-position="before" hue="error" href="https://adplist.org/mentors/dipanjan-de" target="_blank"></LinkComponent>
					</div>
				</div>
				<div class="team__member">
					<AvatarComponent class="team__avatar" name="Nilsen Chaubey" size="lg" image="https://bacon-delight.sirv.com/Users/Nilsen.jpeg?ch=1400"></AvatarComponent>
					<div class="team__name">Nilsen Chaubey</div>
					<div class="team__tags">
						<TagComponent label="Design" size="sm" hue="success"></TagComponent>
					</div>
					<div class="team__section">
						<SVGIcon class="team__section-icon" name="ri-suitcase-line"></SVGIcon>
						<div class="team__section-description"><span>Designer - &nbsp;</span>
							<LinkComponent label="Karkinos Healthcare" href="https://www.karkinos.in/" target="_blank"></LinkComponent>
						</div>
					</div>
					<div class="team__section">
						<SVGIcon class="team__section-icon" name="ri-map-pin-2-line"></SVGIcon>
						<div class="team__section-description">Bangalore, KA, India</div>
					</div>
					<div class="team__header">Socials</div>
					<div class="social">
						<LinkComponent class="social__link" label="LinkedIn" icon="ri-linkedin-line" icon-position="before" hue="error" href="https://www.linkedin.com/in/nilsen-chaubey-70a95b204/" target="_blank"></LinkComponent>
					</div>
				</div>
			</div>
		</div>
	</div>
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

	@include respond-below(md) {
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

<template>
	<header
		class="ep-navbar"
		:class="[
			`ep-navbar--${size}`,
			`ep-navbar--${theme}`,
			{
				'ep-navbar--affix': affix,
				'ep-navbar--bordered': bordered,
			},
		]"
		role="banner"
	>
		<nav class="ep-navbar__inner" :aria-label="ariaLabel">
			<div class="ep-navbar__brand">
				<slot name="brand">
					<component
						:is="branding?.action ? 'button' : 'div'"
						class="ep-navbar__brand-inner"
						:class="{
							'ep-navbar__brand-inner--clickable': Boolean(
								branding?.action
							),
						}"
						:type="branding?.action ? 'button' : undefined"
						@click="onBrandClick"
					>
						<img
							v-if="branding?.logo"
							class="ep-navbar__logo"
							:src="branding.logo"
							:alt="branding.label ?? 'Logo'"
						/>
						<span
							v-if="branding?.label"
							class="ep-navbar__title"
							:class="`ep-navbar__title--${hue}`"
						>
							{{ branding.label }}
						</span>
					</component>
				</slot>
			</div>
			<div class="ep-navbar__center">
				<slot />
			</div>
			<div class="ep-navbar__end">
				<slot name="end" />
			</div>
		</nav>
	</header>
</template>

<script setup lang="ts">
import { useEpSize } from "../composables/useEpSize";
import type { EpSize } from "../general/config";
import type { EpHue } from "../utilities/types/shared";

export interface NavbarBranding {
	label?: string;
	logo?: string;
	action?: () => void;
}

export interface NavbarProps {
	branding?: NavbarBranding;
	hue?: EpHue;
	size?: EpSize;
	theme?: "auto" | "light" | "dark";
	affix?: boolean;
	bordered?: boolean;
	ariaLabel?: string;
}

const props = withDefaults(defineProps<NavbarProps>(), {
	branding: () => ({}),
	hue: "primary",
	size: undefined,
	theme: "auto",
	affix: false,
	bordered: true,
	ariaLabel: "Primary",
});

const size = useEpSize(() => props.size);

function onBrandClick() {
	props.branding?.action?.();
}
</script>

<style scoped>
.ep-navbar {
	background: var(--ep-color-background);
	color: var(--ep-color-contrast);
	font-family: var(--ep-font-family-base);
	width: 100%;
	user-select: none;
}

.ep-navbar--affix {
	position: sticky;
	top: 0;
	z-index: 100;
}

.ep-navbar--bordered {
	border-bottom: 1px solid var(--ep-color-divider);
}

.ep-navbar--xs {
	font-size: 0.75rem;
}
.ep-navbar--sm {
	font-size: 0.875rem;
}
.ep-navbar--md {
	font-size: 1rem;
}
.ep-navbar--lg {
	font-size: 1.125rem;
}
.ep-navbar--xl {
	font-size: 1.25rem;
}

.ep-navbar__inner {
	display: flex;
	align-items: center;
	column-gap: 0.5rem;
	padding: 0.5rem 0.75rem;
	max-width: 100%;
}

.ep-navbar__brand {
	display: flex;
	align-items: center;
	min-width: 0;
}

.ep-navbar__brand-inner {
	appearance: none;
	background: none;
	border: none;
	color: inherit;
	font: inherit;
	padding: 0.25rem 0.25rem;
	display: inline-flex;
	align-items: center;
	column-gap: 0.5rem;
	border-radius: var(--ep-radius-base);
	cursor: default;
}

.ep-navbar__brand-inner--clickable {
	cursor: pointer;
	transition: var(--ep-transition-base);
}

.ep-navbar__brand-inner--clickable:hover {
	background: var(--ep-color-background-faded);
}

.ep-navbar__brand-inner--clickable:focus-visible {
	outline: var(--ep-outline-focus);
	outline-offset: 2px;
}

.ep-navbar__logo {
	max-height: 2rem;
	display: block;
}

.ep-navbar__title {
	font-weight: 600;
	white-space: nowrap;
	transition: var(--ep-transition-base);
}

.ep-navbar__title--primary {
	color: var(--ep-color-primary);
}
.ep-navbar__title--primary-variant {
	color: var(--ep-color-primary-variant);
}
.ep-navbar__title--secondary {
	color: var(--ep-color-secondary);
}
.ep-navbar__title--secondary-variant {
	color: var(--ep-color-secondary-variant);
}
.ep-navbar__title--error {
	color: var(--ep-color-error);
}
.ep-navbar__title--success {
	color: var(--ep-color-success);
}
.ep-navbar__title--warning {
	color: var(--ep-color-warning);
}
.ep-navbar__title--information {
	color: var(--ep-color-information);
}

.ep-navbar__center {
	flex: 1 1 auto;
	min-width: 0;
	display: flex;
	align-items: center;
	column-gap: 0.5rem;
}

.ep-navbar__end {
	display: flex;
	align-items: center;
	column-gap: 0.5rem;
}
</style>

<template>
	<Story title="Navigation/NavigationBar">
		<Variant title="Default">
			<NavigationBar :branding="branding" />
		</Variant>
		<Variant title="With end slot">
			<NavigationBar :branding="branding">
				<template #end>
					<button type="button">Sign in</button>
				</template>
			</NavigationBar>
		</Variant>
		<Variant title="Affix + dark hue">
			<NavigationBar :branding="branding" affix hue="secondary" />
		</Variant>
	</Story>
</template>

<script setup lang="ts">
import NavigationBar, { type NavbarBranding } from "./NavigationBar.vue";

const branding: NavbarBranding = {
	label: "Ecosphere",
	action: () => console.log("brand"),
};
</script>

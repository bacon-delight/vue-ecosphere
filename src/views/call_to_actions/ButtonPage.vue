<template lang="pug">
.wrapper
	.wrapper__title {{ $t("pages.call_to_actions.button.title") }}

	.wrapper__body
		.section
			.section__flex
				ButtonComponent(label="Primary", hue="primary")
				ButtonComponent(label="Cancel", hue="error", icon="ri-close-circle-line")
				ButtonComponent(label="Accept", hue="success", icon="ri-check-double-line")
				ButtonComponent(label="Disabled", hue="success", :disabled="true")

		MarkdownParser(:content="$t('pages.call_to_actions.button.content')")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownParser from "@/components/MarkdownParser.vue";
import ButtonComponent from "@/plugin/call-to-action/ButtonComponent.vue";

export default defineComponent({
	name: "ButtonPage",
	components: {
		MarkdownParser,
		ButtonComponent,
	},
});
</script>

<style lang="scss" scoped></style>

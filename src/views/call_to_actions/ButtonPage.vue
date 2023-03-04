<template lang="pug">
.wrapper
	.wrapper__title {{ $t("pages.call_to_actions.button.title") }}

	.wrapper__body
		.section
			.section__title Examples
			.section__flex
				ButtonComponent(label="Button", hue="primary")
				ButtonComponent(label="Button", hue="error")
				ButtonComponent(label="Button", hue="success")

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

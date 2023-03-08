<template lang="pug">
.wrapper
	.wrapper__title {{ $t("pages.call_to_actions.link.title") }}
	.wrapper__body
		.section
			.section__flex
				LinkComponent(
					label="Visit GitHub Page",
					icon="ri-arrow-right-up-line",
					href="https://github.com/bacon-delight/vue-ecosphere",
					target="_blank"
				)

		MarkdownParser(:content="$t('pages.call_to_actions.link.content')")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownParser from "@/components/MarkdownParser.vue";
import LinkComponent from "@/plugin/call-to-action/LinkComponent.vue";

export default defineComponent({
	name: "LinkPage",
	components: {
		MarkdownParser,
		LinkComponent,
	},
});
</script>

<style lang="scss" scoped></style>

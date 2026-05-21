<template>
	<div class="wrapper">
		<div class="wrapper__title">
			{{ $t("pages.call_to_actions.link.title") }}
		</div>
		<div class="wrapper__body">
			<div class="section">
				<div class="section__flex">
					<LinkComponent
						label="Visit GitHub Page"
						icon="ri-arrow-right-up-line"
						href="https://github.com/bacon-delight/vue-ecosphere"
						target="_blank"
					></LinkComponent>
				</div>
			</div>
			<MarkdownParser
				:content="$t('pages.call_to_actions.link.content')"
			></MarkdownParser>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownParser from "@/components/MarkdownParser.vue";
import LinkComponent from "@ecosphere/call-to-action/LinkComponent.vue";

export default defineComponent({
	name: "LinkPage",
	components: {
		MarkdownParser,
		LinkComponent,
	},
});
</script>

<style lang="scss" scoped></style>

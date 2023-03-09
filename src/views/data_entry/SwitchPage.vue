<template lang="pug">
.wrapper
	.wrapper__title {{ $t("pages.data_entry.switch.title") }}
	.wrapper__body
		.section
			.section__flex
				SwitchComponent(label="Switch Label", :disabled="false", hue="error")

		MarkdownParser(:content="$t('pages.data_entry.switch.content')")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownParser from "@/components/MarkdownParser.vue";
import SwitchComponent from "@/plugin/data-entry/SwitchComponent.vue";

export default defineComponent({
	name: "SwitchPage",
	components: {
		MarkdownParser,
		SwitchComponent,
	},
});
</script>

<style lang="scss" scoped></style>

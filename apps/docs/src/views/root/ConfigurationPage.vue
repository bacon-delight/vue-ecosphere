<template>
	<div class="wrapper">
		<div class="wrapper__title">{{ $t("pages.configuration.title") }}</div>
		<div class="wrapper__body">
			<MarkdownParser
				:content="$t('pages.configuration.content')"
			></MarkdownParser>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownParser from "@/components/MarkdownParser.vue";

export default defineComponent({
	name: "ConfigurationPage",
	components: {
		MarkdownParser,
	},
});
</script>

<style lang="scss" scoped></style>

<template lang="pug">
.wrapper
	.wrapper__title {{ $t("pages.miscellaneous.avatar.title") }}
	.wrapper__body
		MarkdownParser(:content="$t('pages.miscellaneous.avatar.content')")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownParser from "@/components/MarkdownParser.vue";

export default defineComponent({
	name: "AvatarPage",
	components: {
		MarkdownParser,
	},
});
</script>

<style lang="scss" scoped></style>

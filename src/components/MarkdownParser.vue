<template lang="pug">
.markdown(v-html="parsedContent")
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { marked } from "marked";

export default defineComponent({
	name: "MarkdownParser",
	props: {
		content: {
			type: String as PropType<string>,
			default: "# Markdown",
		},
	},
	computed: {
		parsedContent() {
			return marked(this.content);
		},
	},
});
</script>

<style lang="scss">
.markdown {
	display: block;
	overflow: hidden;

	h1 {
		@include header-1;
	}
	h2 {
		@include header-2;
	}
	h3 {
		@include header-3;
	}
	h4 {
		@include header-4;
	}
	h5 {
		@include header-5;
	}
	h6 {
		@include header-6;
	}
	p {
		@include font-light;
	}
}
</style>

<template lang="pug">
markdown.markdown(:source="content")
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import markdown from "vue3-markdown-it";
import "highlight.js/styles/obsidian.css";

export default defineComponent({
	name: "MarkdownParser",
	props: {
		content: {
			type: String as PropType<string>,
			default: "# Markdown",
		},
	},
	components: {
		markdown,
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
		margin: 0.5rem 0;
		@include font-light;
	}
	code {
		padding: 0 0.5rem;
		@include font-monospace;
		color: $color-contrast;
		background: $color-background;
		border-radius: $border-radius-standard;
		border: 1px solid $color-contrast-faded;
		font-size: 0.85em;
		max-height: 60vh;
	}

	a {
		text-decoration: none;
		color: $color-hyperlink;

		code {
			color: $color-hyperlink;
		}
	}

	.class_ {
		color: $color-success;
	}

	.hljs-keyword {
		color: $color-contrast;
	}

	.hljs-string {
		color: $color-hyperlink;
	}

	table {
		display: block;
		margin: 1rem auto;
		overflow-x: auto;
	}

	th {
		@include header-6;
		text-align: left;
	}

	td {
		@include font-light;
	}

	tr {
		box-shadow: 0 -1px 0 rgba(#868686, 0.3) inset;
	}

	th,
	td {
		padding: 0.5rem 0.5rem;
		min-width: 150px;

		// &:last-child {
		// 	min-width: 200px;
		// }

		&:first-child {
			padding-left: 0;
		}

		&:last-child {
			padding-right: 0;
		}
	}

	ul {
		padding-left: 1rem;
	}

	li {
		margin: 0.3rem 0;
	}
}
</style>

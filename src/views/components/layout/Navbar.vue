<template lang="pug">
.content
	PageHeader(:label="$t('headers.navbar')")

	v-eco-header(:label="$t('keywords.examples')", :type="5")
	v-eco-navbar(
		logo="/img/logo.png",
		brand="Ecosphere",
		:options="[{ type: 'link', attributes: { label: 'Link to nowhere', value: '/link' } }, { type: 'theme' }]"
	)
	v-eco-navbar(
		logo="/img/logo.png",
		brand="Ecosphere",
		:toggle="true",
		:options="[{ type: 'select', attributes: { label: 'Select', config: { flow: 'left', hue: false }, options: [{ label: 'Option 1', value: '1' }] } }]"
	)

	vue3-markdown-it.markdown(:source="content")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import locale from "@/locale";
import content_en from "@/assets/docs/components/layout/navbar/en.md";
import content_zh from "@/assets/docs/components/layout/navbar/zh.md";
import PageHeader from "@/components/common/PageHeader.vue";

export default defineComponent({
	name: "Navbar",
	data() {
		return { locale };
	},
	computed: {
		content() {
			const locale = this.locale(this.$i18n);
			if (locale === "zh") {
				return content_zh;
			} else {
				return content_en;
			}
		},
	},
	components: {
		PageHeader,
	},
});
</script>

<template>
	<div class="wrapper">
		<div class="wrapper__title">{{ $t("pages.data_entry.switch.title") }}</div>
		<div class="wrapper__body">
			<div class="section">
				<div class="section__flex">
					<SwitchComponent label="Switch Label" :disabled="false" hue="error"></SwitchComponent>
				</div>
			</div>
			<MarkdownParser :content="$t('pages.data_entry.switch.content')"></MarkdownParser>
		</div>
	</div>
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

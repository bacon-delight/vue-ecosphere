<template>
	<div class="wrapper">
		<div class="wrapper__title">
			{{ $t("pages.data_entry.radio_group.title") }}
		</div>
		<div class="wrapper__body">
			<div class="section">
				<div class="section__flex">
					<RadioGroup
						label="Select your favourite fruit"
						assistive-text="Firethorns are inedible, but they're good source for birds!"
						:options="options"
					></RadioGroup>
				</div>
			</div>
			<MarkdownParser
				:content="$t('pages.data_entry.radio_group.content')"
			></MarkdownParser>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownParser from "@/components/MarkdownParser.vue";
import RadioGroup from "@ecosphere/data-entry/RadioGroup.vue";

export default defineComponent({
	name: "RadioGroupPage",
	components: {
		MarkdownParser,
		RadioGroup,
	},
	data() {
		return {
			options: [
				{
					label: "Apple",
					value: 1,
				},
				{
					label: "Banana",
					value: 2,
				},
				{
					label: "Firethorn",
					value: 3,
					disabled: true,
				},
				{
					label: "Grapefruit",
					value: 4,
					action: () => {
						alert("You have selected Grapefruit!");
					},
				},
				{
					label: "Dragonfruit",
					value: 5,
				},
				{
					label: "Kiwi",
					value: 6,
				},
			],
		};
	},
});
</script>

<style lang="scss" scoped></style>

<template lang="pug">
.wrapper
	.wrapper__title {{ $t("pages.miscellaneous.avatar.title") }}
	.wrapper__body
		.section
			.section__flex
				AvatarComponent(
					name="Feng Mian",
					:hue="hueAlteration",
					:size="sizeAlteration",
					:status="statusAlteration",
					:image="attributeAlterations.includes('image') ? 'https://images.pexels.com/photos/1073567/pexels-photo-1073567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' : null"
				)

		.section
			.section__subtitle Playground (Name: Feng Mian)
			.section__description Customise the options below to see changes on the avatar
			.section__playground
				CheckboxGroup(
					label="Customise the attributes of the avatar",
					:options="attributeAlterationOptions",
					v-model="attributeAlterations",
					alignment="flex"
				)
				RadioGroup(
					label="Customise the size of the avatar",
					:options="sizeAlterationOptions",
					v-model="sizeAlteration"
				)
				RadioGroup(
					label="Customise the status of the avatar",
					:options="statusAlterationOptions",
					v-model="statusAlteration"
				)
				RadioGroup(
					label="Customise the hue of the avatar",
					:options="hueAlterationOptions",
					v-model="hueAlteration",
					assistive-text="It's not recommended to use 'Error', 'Success' and 'Warning' hues with this component, even though they are supported, because of similarities with the supported statuses"
				)

		MarkdownParser(:content="$t('pages.miscellaneous.avatar.content')")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MarkdownParser from "@/components/MarkdownParser.vue";
import AvatarComponent from "@/plugin/miscellaneous/AvatarComponent.vue";
import RadioGroup from "@/plugin/data-entry/RadioGroup.vue";
import CheckboxGroup from "@/plugin/data-entry/CheckboxGroup.vue";

export default defineComponent({
	name: "AvatarPage",
	components: {
		MarkdownParser,
		AvatarComponent,
		RadioGroup,
		CheckboxGroup,
	},
	data() {
		return {
			attributeAlterations: [] as string[],
			attributeAlterationOptions: [
				{
					label: "Image",
					value: "image",
				},
			],
			sizeAlteration: "md" as string,
			sizeAlterationOptions: [
				{
					label: "Small",
					value: "sm",
				},
				{
					label: "Medium",
					value: "md",
				},
				{
					label: "Large",
					value: "lg",
				},
			],
			statusAlteration: "default" as string,
			statusAlterationOptions: [
				{
					label: "Default",
					value: "default",
				},
				{
					label: "Offline",
					value: "offline",
				},
				{
					label: "Online",
					value: "online",
				},
				{
					label: "Away",
					value: "away",
				},
				{
					label: "Busy",
					value: "busy",
				},
			],
			hueAlteration: "information" as string,
			hueAlterationOptions: [
				{
					label: "Primary",
					value: "primary",
				},
				{
					label: "Primary Variant",
					value: "primary-variant",
				},
				{
					label: "Secondary",
					value: "secondary",
				},
				{
					label: "Secondary Variant",
					value: "secondary-variant",
				},
				{
					label: "Information",
					value: "information",
				},
				{
					label: "Error",
					value: "error",
				},
				{
					label: "Warning",
					value: "warning",
				},
				{
					label: "Success",
					value: "success",
				},
			],
		};
	},
});
</script>

<style lang="scss" scoped></style>

<template>
	<div class="wrapper">
		<div class="wrapper__title">{{ $t("pages.miscellaneous.avatar.title") }}</div>
		<div class="wrapper__body">
			<div class="section">
				<div class="section__flex">
					<AvatarComponent name="Feng Mian" :hue="hueAlteration" :size="sizeAlteration" :status="statusAlteration" :image="attributeAlterations.includes('image') ? 'https://images.pexels.com/photos/1073567/pexels-photo-1073567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' : null"></AvatarComponent>
				</div>
			</div>
			<div class="section">
				<div class="section__subtitle">Playground (Name: Feng Mian)</div>
				<div class="section__description">Customise the options below to see changes on the avatar</div>
				<div class="section__playground">
					<CheckboxGroup label="Customise the attributes of the avatar" :options="attributeAlterationOptions" v-model="attributeAlterations" alignment="flex"></CheckboxGroup>
					<RadioGroup label="Customise the size of the avatar" :options="sizeAlterationOptions" v-model="sizeAlteration"></RadioGroup>
					<RadioGroup label="Customise the status of the avatar" :options="statusAlterationOptions" v-model="statusAlteration"></RadioGroup>
					<RadioGroup label="Customise the hue of the avatar (when no image is used)" :options="hueAlterationOptions" v-model="hueAlteration" assistive-text="It's not recommended to use 'Error', 'Success' and 'Warning' hues with this component, even though they are supported, because of similarities with the supported statuses"></RadioGroup>
				</div>
			</div>
			<MarkdownParser :content="$t('pages.miscellaneous.avatar.content')"></MarkdownParser>
		</div>
	</div>
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

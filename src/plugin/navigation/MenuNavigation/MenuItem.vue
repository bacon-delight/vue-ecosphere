<template lang="pug">
.menu-item(v-if="!option.hidden", @click="handleClick")
	//- Menu Item Icon
	SVGIcon.menu-item__icon(v-if="option.icon", :name="option.icon")

	//- Menu Item Label
	.menu-item__label {{ option.label }}

	//- Menu Item Indicators
	.menu-item__indicators
		//- Arrow Indicator for Nested Menu
		SVGIcon.menu-item__icon(
			v-if="option.children",
			:name="showChildren ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'"
		)

		//- Active Dot
		SVGIcon.menu-item__icon.menu-item__status(
			v-if="option.active",
			:class="`menu-item__icon--${hue}`",
			name="ri-checkbox-blank-circle-fill"
		)

//- Nested Menu
.children(v-if="option.children && showChildren")
	//- Vertical Bar
	.children__bar(:class="`children__bar--${hue}`")

	//- Children
	.children__items
		MenuItem(v-for="child in option.children", :option="child")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type { menu_item, hue, theme } from "@/plugin/utilities/types.interface";
import SVGIcon from "@/plugin/general/SVGIcon.vue";

export default defineComponent({
	name: "MenuItem",
	props: {
		option: {
			type: Object as PropType<menu_item>,
			required: true,
		},
		hue: {
			type: String as PropType<hue>,
			default: "information",
		},
		theme: {
			type: String as PropType<theme>,
			default: "auto",
		},
	},
	data() {
		return {
			showChildren: false,
		};
	},
	components: {
		SVGIcon,
	},
	methods: {
		handleClick(): void {
			if (this.option.children) {
				this.showChildren = !this.showChildren;
			}
		},
	},
	mounted() {
		this.showChildren = this.option.expanded || false;
	},
});
</script>

<style lang="scss" scoped>
.menu-item {
	display: flex;
	flex-direction: row;
	align-items: center;
	column-gap: 0.5rem;
	padding: 0.25rem 0.5rem;
	border-radius: $border-radius-standard;
	cursor: pointer;

	&__label {
		white-space: nowrap;
		user-select: none;
		@include font-light;
	}

	&__indicators {
		margin-left: auto;
		display: flex;
		flex-direction: row;
		align-items: center;
		column-gap: 0.25rem;
	}

	&__icon {
		@include hue-color-modifiers;
	}

	&__status {
		font-size: 0.75rem;
	}

	&:hover {
		background: $color-background-faded;
	}
}

.children {
	display: grid;
	grid-template-columns: min-content 1fr;
	padding-left: 0.5rem;
	column-gap: 0.25rem;

	&__items {
		display: flex;
		flex-direction: column;
		row-gap: 0.25rem;
	}

	&__bar {
		border-radius: $border-radius-standard;
		width: 0.25rem;
		@include hue-background-modifiers;
	}
}
</style>

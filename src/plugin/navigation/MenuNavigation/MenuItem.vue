<template lang="pug">
.menu-item(
	v-if="!option.hidden",
	@click="handleClick",
	tabindex="0",
	@keypress.enter="handleClick"
)
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
			:class="[`menu-item__icon--${hue}`, { 'menu-item__icon--hidden': !option.active }]",
			name="ri-checkbox-blank-circle-fill"
		)

//- Nested Menu
Transition(name="nested-children")
	.children(v-if="option.children && showChildren")
		//- Vertical Bar
		.children__bar(
			:class="[`children__bar--${hue}`, { 'children__bar--hidden': !skeleton }]"
		)

		//- Children
		.children__items
			MenuItem(
				v-for="child in option.children",
				:option="child",
				@action="$emit('action')"
			)
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type { menu_item, hue, theme } from "@/plugin/utilities/types.interface";
import SVGIcon from "@/plugin/general/SVGIcon.vue";

export default defineComponent({
	name: "MenuItem",
	emits: ["action"],
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
		skeleton: {
			type: Boolean as PropType<boolean>,
			default: true,
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
			if (this.option.action) {
				this.option.action();
				this.$emit("action");
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
	transition: $transition-standard;
	-webkit-tap-highlight-color: transparent;

	&:focus {
		outline: 1px solid $color-hyperlink;
	}

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

		&--hidden {
			opacity: 0;
		}
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
	padding-left: 0.875rem;
	column-gap: 0.35rem;

	&__items {
		display: flex;
		flex-direction: column;
		row-gap: 0.25rem;
	}

	&__bar {
		border-radius: $border-radius-standard;
		width: 0.25rem;
		@include hue-background-modifiers;
		background: $color-divider;
		opacity: 0.25;

		&--hidden {
			opacity: 0;
		}
	}
}

.nested-children-enter-active,
.nested-children-leave-active {
	transition: $transition-standard;
}

.nested-children-enter-from {
	// height: 0;
	opacity: 0;
	scale: 0;
	// transform: translateY(-100%);
	transform: translate(-100%, -100%);
}

.nested-children-leave-to {
	// height: 0;
	opacity: 0;
	scale: 0;
	// transform: translateY(-100%);
	transform: translate(-100%, -100%);
}
</style>

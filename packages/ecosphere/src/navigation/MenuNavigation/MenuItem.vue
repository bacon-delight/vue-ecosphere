<template>
	<div
		v-if="!option.hidden"
		class="menu-item"
		tabindex="0"
		@click="handleClick"
		@keypress.enter="handleClick"
	>
		<SVGIcon
			v-if="option.icon"
			class="menu-item__icon"
			:name="option.icon"
		></SVGIcon>
		<div class="menu-item__label">{{ option.label }}</div>
		<div class="menu-item__indicators">
			<SVGIcon
				v-if="option.children"
				class="menu-item__icon"
				:name="
					showChildren ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'
				"
			></SVGIcon>
			<SVGIcon
				v-if="option.active || !option.children"
				class="menu-item__icon menu-item__status"
				:class="[
					`menu-item__icon--${hue}`,
					{ 'menu-item__icon--hidden': !option.active },
				]"
				name="ri-checkbox-blank-circle-fill"
			></SVGIcon>
		</div>
	</div>
	<Transition name="nested-children">
		<div v-if="option.children && showChildren" class="children">
			<div
				class="children__bar"
				:class="[
					`children__bar--${hue}`,
					{ 'children__bar--hidden': !skeleton },
				]"
			></div>
			<div class="children__items">
				<MenuItem
					v-for="child in option.children"
					:option="child"
					@action="$emit('action')"
				></MenuItem>
			</div>
		</div>
	</Transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type { menu_item, hue, theme } from "../../utilities/types.interface";
import SVGIcon from "../../general/SVGIcon.vue";

export default defineComponent({
	name: "MenuItem",
	components: {
		SVGIcon,
	},
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
	emits: ["action"],
	data() {
		return {
			showChildren: false,
		};
	},
	mounted() {
		this.showChildren = this.option.expanded || false;
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

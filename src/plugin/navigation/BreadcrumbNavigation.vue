<template lang="pug">
.breadcrumb(
	:class="{ 'breadcrumb--outline': outline, 'breadcrumb--expand': !wrap }"
)
	.breadcrumb__item(
		v-for="option in renderOptions",
		:class="[{ 'breadcrumb__item--active': option.active, 'breadcrumb__item--disabled': option.disabled || disabled }]",
		:tabindex="option.disabled ? -1 : 0",
		@click="handleClick(option)"
	)
		SVGIcon.breadcrumb__item-icon(v-if="option.icon", :name="option.icon")
		.breadcrumb__item-label {{ option.label }}
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import SVGIcon from "@/plugin/general/SVGIcon.vue";
import type {
	breadcrumb_item,
	breadcrumb_item_compiled,
} from "@/plugin/utilities/types.interface";

export default defineComponent({
	name: "BreadcrumbNavigation",
	components: {
		SVGIcon,
	},
	props: {
		options: {
			type: Array as PropType<breadcrumb_item[]>,
			required: true,
		},
		disabled: {
			type: Boolean as PropType<boolean>,
			default: false,
		},
		outline: {
			type: Boolean as PropType<boolean>,
			default: false,
		},
		wrap: {
			type: Boolean as PropType<boolean>,
			default: false,
		},
		dividerIcon: {
			type: String as PropType<string>,
			default: "ri-arrow-right-s-line",
		},
	},
	methods: {
		handleClick(option: breadcrumb_item): void {
			if (option.action) {
				option.action();
			}
		},
	},
	computed: {
		renderOptions(): breadcrumb_item_compiled[] {
			const filtered_options = this.options
				.filter((option: breadcrumb_item) => !option.hidden)
				.map((option: breadcrumb_item): breadcrumb_item_compiled => {
					return {
						...option,
						type: "item",
					};
				});
			const options: breadcrumb_item_compiled[] = [];
			for (let index = 0; index < filtered_options.length; index++) {
				if (index !== 0) {
					options.push({
						type: "divider",
						icon: this.dividerIcon,
						disabled: true,
					});
				}
				options.push(filtered_options[index]);
			}
			return options;
		},
	},
});
</script>

<style lang="scss" scoped>
.breadcrumb {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
	column-gap: 0.25rem;
	row-gap: 0.25rem;
	@include font-light;
	width: fit-content;

	&--expand {
		flex-wrap: nowrap;
		max-width: 100%;
		padding-bottom: 0.5rem;
		overflow-x: auto;
	}

	&--outline {
		padding: 0.25rem 0.5rem;
		border-radius: $border-radius-standard;
		border: 1px solid $color-divider;
	}

	&__item {
		cursor: pointer;
		transition: $transition-standard;
		padding: 0 0.25rem;
		border-radius: $border-radius-standard;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		column-gap: 0.25rem;
		align-items: center;

		&:hover {
			color: $color-hyperlink;
		}

		&:focus {
			outline: $outline-focus;
		}

		&--active {
			@include font-bold;
		}

		&--disabled {
			opacity: 0.5;
			color: $color-disabled;
			pointer-events: none;
		}
	}
}
</style>

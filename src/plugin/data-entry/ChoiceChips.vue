<template lang="pug">
.choice-chips
	.choice-chips__label(:class="[`choice-chips__label--${state}`]") {{ label }}
	.choice-chips__options
		TagComponent.option(
			v-for="(option, index) in options",
			:tabindex="option.disabled || disabled ? -1 : 0",
			:label="option.label",
			:size="size",
			:hue="values.includes(index) ? hue : 'auto'",
			:outline="outline",
			:disabled="option.disabled || disabled",
			@click="handleClick(index)",
			@keypress.enter="handleClick(index)"
		)

	//- Alert Message
	.choice-chips__alert-message(
		v-if="alertMessage && state !== 'default'",
		:class="[`choice-chips__alert-message--${state}`]"
	) {{ alertMessage }}

	//- Assistive Text
	.choice-chips__assistive-text(v-else) {{ assistiveText }}
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import SVGIcon from "@/plugin/general/SVGIcon.vue";
import TagComponent from "../miscellaneous/TagComponent.vue";
import {
	tag_size_options,
	hue_options,
	data_entry_state_options,
} from "@/plugin/utilities/types.interface";
import type {
	hue,
	tag_size,
	choice_option,
	data_entry_state,
} from "@/plugin/utilities/types.interface";

export default defineComponent({
	name: "ChoiceChips",
	emits: ["update:modelValue", "update"],
	props: {
		label: {
			type: String as PropType<string>,
			required: true,
		},
		hue: {
			type: String as PropType<hue>,
			default: "information",
			validator(value: hue): boolean {
				return hue_options.includes(value);
			},
		},
		size: {
			type: String as PropType<tag_size>,
			default: "md",
			validator(value: tag_size): boolean {
				return tag_size_options.includes(value);
			},
		},
		options: {
			type: Array as PropType<choice_option[]>,
			required: true,
		},
		outline: {
			type: Boolean as PropType<boolean>,
			default: false,
		},
		disabled: {
			type: Boolean as PropType<boolean>,
			default: false,
		},
		multiple: {
			type: Boolean as PropType<boolean>,
			default: true,
		},
		state: {
			type: String as PropType<data_entry_state>,
			default: "default",
			validator(value: data_entry_state): boolean {
				return data_entry_state_options.includes(value);
			},
		},
		assistiveText: {
			type: String as PropType<string>,
			default: "",
		},
		alertMessage: {
			type: String as PropType<string>,
			default: "",
		},
		modelValue: {
			type: Array as PropType<(string | number | boolean)[]>,
			default: () => [],
		},
		default: {
			type: Array as PropType<(string | number | boolean)[]>,
			default: () => [],
		},
	},
	components: {
		SVGIcon,
		TagComponent,
	},
	data() {
		return {
			values: [] as number[],
		};
	},
	mounted() {
		const initialValues = this.default.length
			? this.default
			: this.modelValue;
		if (initialValues.length) {
			this.options.forEach((option: choice_option, index: number) => {
				if (initialValues.includes(option.value)) {
					this.values.push(index);
				}
			});
		}
	},
	methods: {
		handleClick(index: number): void {
			if (this.values.includes(index)) {
				this.values = this.values.filter(
					(existing: number) => existing !== index
				);
			} else {
				if (this.multiple) {
					this.values.push(index);
				} else {
					this.values = [index];
				}
			}
			this.$emit(
				"update:modelValue",
				this.values.map((index: number) => {
					return this.options[index].value;
				})
			);
			this.$emit(
				"update",
				this.values.map((index: number) => {
					return this.options[index].value;
				})
			);
			if (this.options[index].action && this.values.includes(index)) {
				(this.options[index].action as () => void)();
			}
		},
	},
	watch: {
		default(newDefaults: (string | number | boolean | null)[]): void {
			if (newDefaults === null || !newDefaults.length) {
				this.values = [];
			} else {
				this.options.forEach((option: choice_option, index: number) => {
					if (newDefaults.includes(option.value)) {
						this.values.push(index);
					}
				});
			}
		},
		modelValue(newValues: (string | number | boolean | null)[]): void {
			this.options.forEach((option: choice_option, index: number) => {
				if (newValues.includes(option.value)) {
					this.values.push(index);
				}
			});
		},
	},
});
</script>

<style lang="scss" scoped>
.choice-chips {
	&__label {
		@include font-footnote;

		&--error {
			color: $color-error;
		}

		&--warning {
			color: $color-warning;
		}

		&--success {
			color: $color-success;
		}
	}

	&__options {
		margin: 0.5rem 0;
		display: flex;
		column-gap: 0.5rem;
		row-gap: 0.5rem;
		flex-wrap: wrap;
		max-width: 100%;
	}

	&__assistive-text {
		@include font-footnote;
		color: $color-disabled;
	}

	&__alert-message {
		@include font-footnote;

		&--error {
			color: $color-error;
		}

		&--warning {
			color: $color-warning;
		}

		&--success {
			color: $color-success;
		}
	}
}

.option {
	cursor: pointer;
	transition: $transition-standard;

	&:hover {
		box-shadow: $box-shadow-standard;
	}

	&:focus {
		outline: $outline-focus;
	}
}
</style>

<template lang="pug">
.choice-chips
	//- Label
	.choice-chips__label(:class="[`choice-chips__label--${state}`]") {{ label }}

	//- Options
	.choice-chips__options(:class="[`choice-chips__options--${alignment}`]")
		.choice-chips__field(v-for="(option, index) in options")
			//- Tag
			TagComponent.choice-chips__tag(
				v-if="!option.hidden",
				:label="option.label",
				:disabled="option.disabled || disabled",
				:hue="values.includes(index) ? hue : 'auto'",
				:outline="outline",
				:tabindex="option.disabled || disabled ? -1 : 0",
				:size="size",
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
import type {
	data_entry_state,
	choice_option,
	choice_option_alignment,
	hue,
	tag_size,
} from "@/plugin/utilities/types.interface";
import {
	data_entry_state_options,
	choice_option_alignment_options,
	hue_options,
	tag_size_options,
} from "@/plugin/utilities/types.interface";
import CheckboxField from "./CheckboxField.vue";
import TagComponent from "../miscellaneous/TagComponent.vue";

export default defineComponent({
	name: "CheckboxGroup",
	emits: ["update:modelValue", "update"],
	components: {
		CheckboxField,
		TagComponent,
	},
	props: {
		label: {
			type: String as PropType<string>,
			default: "",
		},
		disabled: {
			type: Boolean as PropType<boolean>,
			default: false,
		},
		assistiveText: {
			type: String as PropType<string>,
			default: "",
		},
		alertMessage: {
			type: String as PropType<string>,
			default: "",
		},
		hue: {
			type: String as PropType<hue>,
			default: "information",
			validator(value: hue): boolean {
				return hue_options.includes(value);
			},
		},
		state: {
			type: String as PropType<data_entry_state>,
			default: "default",
			validator(value: data_entry_state): boolean {
				return data_entry_state_options.includes(value);
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
		multiple: {
			type: Boolean as PropType<boolean>,
			default: true,
		},
		size: {
			type: String as PropType<tag_size>,
			default: "md",
			validator(value: tag_size): boolean {
				return tag_size_options.includes(value);
			},
		},
		alignment: {
			type: String as PropType<choice_option_alignment>,
			default: "flex",
			validator(value: choice_option_alignment): boolean {
				return choice_option_alignment_options.includes(value);
			},
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
	data() {
		return {
			values: [] as number[],
		};
	},
	mounted() {
		const initialValues = this.default.length
			? this.default
			: this.modelValue;
		this.populateValues(initialValues);
	},
	methods: {
		handleClick(index: number): void {
			if (this.values.includes(index)) {
				this.values = this.values.filter(
					(existing: number) => existing !== index
				);
			} else {
				if (!this.multiple) {
					this.values = [];
				}
				this.values.push(index);
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
		populateValues(defaults: (string | number | boolean)[]): void {
			if (!defaults.length) {
				return;
			}
			this.options.forEach((option: choice_option, index: number) => {
				if (defaults.includes(option.value)) {
					this.values.push(index);
				}
			});
		},
	},
	watch: {
		default(newDefaults: (string | number | boolean)[]): void {
			this.populateValues(newDefaults);
		},
		modelValue(newValues: (string | number | boolean)[]): void {
			this.populateValues(newValues);
		},
		multiple(): void {
			this.values = [];
		},
	},
});
</script>

<style lang="scss" scoped>
.choice-chips {
	display: flex;
	flex-direction: column;
	row-gap: 0.5rem;

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

	&__tag {
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;

		&:focus {
			outline: 1px solid $color-hyperlink;
		}
	}

	&__assistive-text {
		@include font-footnote;
		color: $color-disabled;
	}

	&__options {
		column-gap: 0.375rem;
		row-gap: 0.375rem;

		&--flex {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
		}

		&--vertical {
			display: flex;
			flex-direction: column;
		}

		&--grid {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
			align-items: center;
			justify-content: center;
			column-gap: 1.5rem;

			@include respond-below(lg) {
				grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
			}

			@include respond-below(md) {
				grid-template-columns: 1fr 1fr 1fr 1fr;
			}

			@include respond-below(sm) {
				grid-template-columns: 1fr 1fr 1fr;
			}

			@include respond-below(xs) {
				grid-template-columns: 1fr 1fr;
			}
		}
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
</style>

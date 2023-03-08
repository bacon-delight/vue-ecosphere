<template lang="pug">
.radio-group
	//- Label
	.radio-group__label(:class="[`radio-group__label--${state}`]") {{ label }}

	//- Options
	.radio-group__options(:class="[`radio-group__options--${alignment}`]")
		.radio-group__field(v-for="(option, index) in options")
			//- Radio Button
			RadioField(
				v-if="!option.hidden",
				:label="option.label",
				:disabled="option.disabled || disabled",
				:default="index === value",
				:hue="hue",
				@update="handleClick(index)"
			)

	//- Alert Message
	.radio-group__alert-message(
		v-if="alertMessage && state !== 'default'",
		:class="[`radio-group__alert-message--${state}`]"
	) {{ alertMessage }}

	//- Assistive Text
	.radio-group__assistive-text(v-else) {{ assistiveText }}
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type {
	data_entry_state,
	choice_option,
	choice_option_alignment,
	hue,
} from "@/plugin/utilities/types.interface";
import {
	data_entry_state_options,
	choice_option_alignment_options,
	hue_options,
} from "@/plugin/utilities/types.interface";
import RadioField from "./RadioField.vue";

export default defineComponent({
	name: "RadioGroup",
	emits: ["update:modelValue", "update"],
	components: {
		RadioField,
	},
	props: {
		label: {
			type: String as PropType<string>,
			default: "",
		},
		assistiveText: {
			type: String as PropType<string>,
			default: "",
		},
		alertMessage: {
			type: String as PropType<string>,
			default: "",
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
		alignment: {
			type: String as PropType<choice_option_alignment>,
			default: "flex",
			validator(value: choice_option_alignment): boolean {
				return choice_option_alignment_options.includes(value);
			},
		},
		modelValue: {
			type: [String, Number, Boolean, null] as PropType<
				string | number | boolean | null
			>,
			default: null,
		},
		default: {
			type: [String, Number, Boolean, null] as PropType<
				string | number | boolean | null
			>,
			default: null,
		},
		disabled: {
			type: Boolean as PropType<boolean>,
			default: false,
		},
		hue: {
			type: String as PropType<hue>,
			default: "information",
			validator(value: hue): boolean {
				return hue_options.includes(value);
			},
		},
	},
	data() {
		return {
			value: null as number | null,
		};
	},
	mounted() {
		const initialValue =
			this.default !== null ? this.default : this.modelValue;
		if (initialValue !== null) {
			this.options.forEach((option: choice_option, index: number) => {
				if (option.value === initialValue) {
					this.value = index;
				}
			});
		}
	},
	methods: {
		handleClick(index: number): void {
			this.value = index;
			this.$emit("update:modelValue", this.options[this.value].value);
			this.$emit("update", this.options[this.value].value);
			if (this.options[this.value].action) {
				(this.options[this.value].action as () => void)();
			}
		},
	},
	watch: {
		default(newDefault: string | number | boolean | null): void {
			if (newDefault === null) {
				this.value = null;
			} else {
				this.options.forEach((option: choice_option, index: number) => {
					if (option.value === newDefault) {
						this.value = index;
					}
				});
			}
		},
	},
});
</script>

<style lang="scss" scoped>
.radio-group {
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

	&__assistive-text {
		@include font-footnote;
		color: $color-disabled;
	}

	&__options {
		column-gap: 1.75rem;
		row-gap: 0.25rem;

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

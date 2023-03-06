<template lang="pug">
.checkbox-group
	//- Label
	.checkbox-group__label(:class="[`checkbox-group__label--${state}`]") {{ label }}

	//- Options
	.checkbox-group__options(:class="[`checkbox-group__options--${alignment}`]")
		.checkbox-group__field(v-for="(option, index) in options")
			//- Checkbox
			CheckboxField(
				v-if="!option.hidden",
				:label="option.label",
				:disabled="option.disabled || disabled",
				:default="values.includes(index)",
				@update="handleClick(index)"
			)

	//- Alert Message
	.checkbox-group__alert-message(
		v-if="alertMessage && state !== 'default'",
		:class="[`checkbox-group__alert-message--${state}`]"
	) {{ alertMessage }}

	//- Assistive Text
	.checkbox-group__assistive-text(v-else) {{ assistiveText }}
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type {
	data_entry_state,
	choice_option,
	choice_option_alignment,
} from "@/plugin/utilities/types.interface";
import CheckboxField from "./CheckboxField.vue";

export default defineComponent({
	name: "CheckboxGroup",
	emits: ["update:modelValue", "update"],
	components: {
		CheckboxField,
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
		},
		options: {
			type: Array as PropType<choice_option[]>,
			required: true,
		},
		alignment: {
			type: String as PropType<choice_option_alignment>,
			default: "flex",
		},
		modelValue: {
			type: Array as PropType<(string | number | boolean)[]>,
			default: () => [],
		},
		default: {
			type: Array as PropType<(string | number | boolean)[]>,
			default: () => [],
		},
		disabled: {
			type: Boolean as PropType<boolean>,
			default: false,
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
		},
	},
});
</script>

<style lang="scss" scoped>
.checkbox-group {
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

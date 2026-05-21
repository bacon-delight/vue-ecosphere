<template>
	<div class="checkbox-group">
		<div
			class="checkbox-group__label"
			:class="[`checkbox-group__label--${state}`]"
		>
			{{ label }}
		</div>
		<div
			class="checkbox-group__options"
			:class="[`checkbox-group__options--${alignment}`]"
		>
			<div
				v-for="(option, index) in options"
				class="checkbox-group__field"
			>
				<CheckboxField
					v-if="!option.hidden"
					:label="option.label"
					:disabled="option.disabled || disabled"
					:default="values.includes(index)"
					:hue="hue"
					@update="handleClick(index)"
				></CheckboxField>
			</div>
		</div>
		<div
			v-if="alertMessage && state !== 'default'"
			class="checkbox-group__alert-message"
			:class="[`checkbox-group__alert-message--${state}`]"
		>
			{{ alertMessage }}
		</div>
		<div v-else class="checkbox-group__assistive-text">
			{{ assistiveText }}
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type {
	data_entry_state,
	choice_option,
	choice_option_alignment,
	hue,
} from "../utilities/types.interface";
import {
	data_entry_state_options,
	choice_option_alignment_options,
	hue_options,
} from "../utilities/types.interface";
import CheckboxField from "./CheckboxField.vue";

export default defineComponent({
	name: "CheckboxGroup",
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
		hue: {
			type: String as PropType<hue>,
			default: "information",
			validator(value: hue): boolean {
				return hue_options.includes(value);
			},
		},
	},
	emits: ["update:modelValue", "update"],
	data() {
		return {
			values: [] as number[],
		};
	},
	watch: {
		default(newDefaults: (string | number | boolean)[]): void {
			this.populateValues(newDefaults);
		},
		modelValue(newValues: (string | number | boolean)[]): void {
			this.populateValues(newValues);
		},
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

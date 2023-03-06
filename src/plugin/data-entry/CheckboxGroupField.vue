<template lang="pug">
.radio-group
	//- Label
	.radio-group__label(:class="[`radio-group__label--${state}`]") {{ label }}

	//- Options
	.radio-group__options(:class="[`radio-group__options--${alignment}`]")
		RadioField(v-for="option in options", :label="option.label")

	//- Assistive Text
	.radio-group__alert-message(
		v-if="alertMessage && state !== 'default'",
		:class="[`radio-group__alert-message--${state}`]"
	) {{ alertMessage }}
	.radio-group__assistive-text(v-else) {{ assistiveText }}
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type {
	data_entry_state,
	choice_option,
	choice_option_alignment,
} from "@/plugin/utilities/types.interface";
import RadioField from "./RadioField.vue";

export default defineComponent({
	name: "CheckboxGroup",
	components: {
		RadioField,
	},
	props: {
		label: {
			type: String as PropType<string>,
			required: true,
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
		// modelValue: {
		// 	type: Boolean as PropType<boolean>,
		// 	default: false,
		// },
	},
	data() {
		return {
			// value: false,
		};
	},
	mounted() {
		// this.value = this.modelValue;
	},
	methods: {
		// handleClick(): void {
		// 	this.value = !this.value;
		// 	this.$emit("update:modelValue", this.value);
		// },
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

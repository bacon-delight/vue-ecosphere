<template lang="pug">
.input(:class="[{ 'input--disabled': disabled }]")
	//- Input Label
	.input__label(:class="[`input__label--${state}`]") {{ label }}

	//- Input Wrapper
	.input__wrapper
		//- Input Field
		textarea.input__field(
			:class="[`input__field--${state}`, { 'input__field--outline': outline }, { 'input__field--disabled': disabled }]",
			:placeholder="placeholder",
			:disabled="disabled",
			v-model="value",
			@input="handleUpdate",
			:maxlength="maxLength",
			:rows="rows"
		)

		//- Clear Icon
		SVGIcon.input__icon(
			v-if="allowClear",
			name="ri-close-circle-line",
			:class="[{ 'input__icon--disabled': disabled }]",
			@click="clearValue"
		)

	//- Assistive Text
	.input__texts
		.input__alert-message(
			v-if="alertMessage && state !== 'default'",
			:class="[`input__alert-message--${state}`]"
		) {{ alertMessage }}
		.input__assistive-text(v-else) {{ assistiveText }}
		.input__assistive-text.input__length(v-if="showLength") {{ inputLengthInformation }}
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type { data_entry_state } from "@/plugin/utilities/types.interface";
import { data_entry_state_options } from "@/plugin/utilities/types.interface";
import SVGIcon from "../general/SVGIcon.vue";

export default defineComponent({
	name: "InputField",
	props: {
		modelValue: {
			type: [String, Number, null] as PropType<string | null>,
			default: "",
		},
		label: {
			type: String as PropType<string>,
			default: "",
		},
		placeholder: {
			type: String as PropType<string>,
			default: "",
		},
		rows: {
			type: Number as PropType<number>,
			default: 3,
		},
		disabled: {
			type: Boolean as PropType<boolean>,
			default: false,
		},
		outline: {
			type: Boolean as PropType<boolean>,
			default: false,
		},
		assistiveText: {
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
		allowClear: {
			type: Boolean as PropType<boolean>,
			default: false,
		},
		maxLength: {
			type: [Number, null] as PropType<number | null>,
			default: null,
		},
		showLength: {
			type: Boolean as PropType<boolean>,
			default: false,
		},
		alertMessage: {
			type: String as PropType<string>,
			default: "",
		},
		default: {
			type: [String, null] as PropType<string | null>,
			default: "",
		},
	},
	components: {
		SVGIcon,
	},
	data() {
		return {
			value: "" as string | null,
		};
	},
	mounted() {
		if (this.modelValue !== null) {
			this.value = this.modelValue;
		}
		if (this.default !== null) {
			this.value = this.default;
		}
	},
	methods: {
		handleUpdate(): void {
			this.$emit("update:modelValue", this.value);
		},
		clearValue(): void {
			this.value = "";
			this.handleUpdate();
		},
	},
	computed: {
		inputLengthInformation(): string | number {
			if (this.maxLength !== null) {
				return `${
					this.value === null ? "0" : this.value.toString().length
				} / ${this.maxLength}`;
			}
			return this.value === null ? 0 : this.value.toString().length;
		},
	},
	watch: {
		default(newDefault: string | null): void {
			this.value = newDefault;
		},
	},
});
</script>

<style lang="scss" scoped>
.input {
	display: block;
	display: flex;
	flex-direction: column;
	row-gap: 0.25rem;
	width: 100%;

	&--disabled {
		opacity: 50%;
	}

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

	&__wrapper {
		position: relative;
		width: 100%;
	}

	&__field {
		background: $color-background;
		border: 1px solid $color-transparent;
		border-radius: $border-radius-standard;
		padding: 0.5rem 0.75rem;
		@include font-regular;
		color: $color-contrast;
		width: 100%;

		&::placeholder {
			color: $color-disabled;
			@include font-regular;
		}

		&:focus {
			outline: 1px solid $color-hyperlink;
		}

		&--outline {
			outline: 1px solid $color-contrast-faded;
		}

		&--error {
			outline: 1px solid $color-error;
		}

		&--warning {
			outline: 1px solid $color-warning;
		}

		&--success {
			outline: 1px solid $color-success;
		}

		&--disabled {
			cursor: not-allowed;
		}
	}

	&__icon {
		position: absolute;
		top: 1.125rem;
		right: 0.5rem;
		transform: translateY(-50%);
		font-size: 1.25rem;
		color: $color-disabled;
		cursor: pointer;

		&:hover {
			color: $color-contrast;
		}

		&--disabled {
			cursor: not-allowed;
			pointer-events: none;
		}
	}

	&__texts {
		display: flex;
		flex-direction: row;
		column-gap: 1rem;
		align-items: center;
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

	&__length {
		margin-left: auto;
	}
}
</style>

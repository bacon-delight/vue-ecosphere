<template lang="pug">
.input(:class="[{ 'input--disabled': disabled }]")
	//- Input Label
	.input__label(:class="[`input__label--${state}`]") {{ label }}

	//- Input Wrapper
	.input__wrapper
		//- Input Field
		input.input__field(
			:class="[`input__field--${state}`, { 'input__field--outline': outline }, { 'input__field--disabled': disabled }]",
			:type="inputFieldType",
			:placeholder="placeholder",
			:disabled="disabled",
			v-model="value",
			@input="handleUpdate",
			:maxlength="maxLength",
			@keypress.enter="handleEnterPress"
		)

		//- Icons
		.input__icons
			//- Clear Icon
			SVGIcon.input__icon(
				v-if="allowClear",
				name="ri-close-circle-line",
				:class="[{ 'input__icon--disabled': disabled }]",
				@click="clearValue"
			)

			//- Show or Hide Password Icon
			SVGIcon.input__icon(
				v-if="type === 'password'",
				:name="showPassword ? 'ri-eye-off-line' : 'ri-eye-line'",
				:class="[{ 'input__icon--disabled': disabled }]",
				@click="showPassword = !showPassword"
			)

			//- Search Icon
			SVGIcon.input__icon(
				v-if="type === 'search'",
				name="ri-search-2-line",
				:class="[{ 'input__icon--disabled': disabled }]",
				@click="handleSearch"
			)

	//- Input Length, Assistive Text & Alert Message
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
import type {
	input_type,
	data_entry_state,
} from "@/plugin/utilities/types.interface";
import SVGIcon from "../general/SVGIcon.vue";

export default defineComponent({
	name: "InputField",
	emits: ["update:modelValue", "update", "enterPress", "clear", "search"],
	props: {
		modelValue: {
			type: [String, Number, null] as PropType<string | number | null>,
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
		type: {
			type: String as PropType<input_type>,
			default: "text",
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
			type: [String, Number, null] as PropType<string | number | null>,
			default: "",
		},
	},
	components: {
		SVGIcon,
	},
	data() {
		return {
			value: "" as string | number | null,
			showPassword: false,
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
			this.$emit("update", this.value);
			if (!this.value) {
				this.$emit("clear");
			}
		},
		clearValue(): void {
			this.value = "";
			this.handleUpdate();
		},
		handleEnterPress(): void {
			this.$emit("enterPress", this.value);
		},
		handleSearch(): void {
			this.$emit("search", this.value);
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
		inputFieldType(): input_type {
			if (this.type === "password") {
				if (this.showPassword) {
					return "text";
				}
			}
			return this.type;
		},
	},
	watch: {
		default(newDefault: string | number | null): void {
			this.value = newDefault;
		},
	},
});
</script>

<style lang="scss" scoped>
.input {
	display: flex;
	flex-direction: column;
	row-gap: 0.25rem;
	width: 100%;
	position: relative;

	&--disabled {
		opacity: 50%;
		pointer-events: none;
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

	&__icons {
		position: absolute;
		top: 50%;
		right: 0.75rem;
		transform: translateY(-50%);
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		column-gap: 0.325rem;
		align-items: center;
	}

	&__icon {
		font-size: 1.25rem;
		color: $color-disabled;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;

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

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}
</style>

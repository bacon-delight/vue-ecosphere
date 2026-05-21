<template>
	<div class="input" :class="[{ 'input--disabled': disabled }]">
		<div class="input__label" :class="[`input__label--${state}`]">
			{{ label }}
		</div>
		<div class="input__wrapper">
			<input
				v-model="value"
				class="input__field"
				:class="[
					`input__field--${state}`,
					{ 'input__field--outline': outline },
					{ 'input__field--disabled': disabled },
				]"
				:type="inputFieldType"
				:placeholder="placeholder"
				:disabled="disabled"
				:maxlength="maxLength ?? undefined"
				@input="handleUpdate"
				@keypress.enter="handleEnterPress"
			/>
			<div class="input__icons">
				<SVGIcon
					v-if="allowClear"
					class="input__icon"
					name="ri-close-circle-line"
					:class="[{ 'input__icon--disabled': disabled }]"
					@click="clearValue"
				></SVGIcon>
				<SVGIcon
					v-if="type === 'password'"
					class="input__icon"
					:name="showPassword ? 'ri-eye-off-line' : 'ri-eye-line'"
					:class="[{ 'input__icon--disabled': disabled }]"
					@click="showPassword = !showPassword"
				></SVGIcon>
				<SVGIcon
					v-if="type === 'search'"
					class="input__icon"
					name="ri-search-2-line"
					:class="[{ 'input__icon--disabled': disabled }]"
					@click="handleSearch"
				></SVGIcon>
			</div>
		</div>
		<div class="input__texts">
			<div
				v-if="alertMessage && state !== 'default'"
				class="input__alert-message"
				:class="[`input__alert-message--${state}`]"
			>
				{{ alertMessage }}
			</div>
			<div v-else class="input__assistive-text">{{ assistiveText }}</div>
			<div v-if="showLength" class="input__assistive-text input__length">
				{{ inputLengthInformation }}
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type {
	input_type,
	data_entry_state,
} from "../utilities/types.interface";
import {
	data_entry_state_options,
	input_type_options,
} from "../utilities/types.interface";
import SVGIcon from "../general/SVGIcon.vue";

export default defineComponent({
	name: "InputField",
	components: {
		SVGIcon,
	},
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
			validator(value: input_type): boolean {
				return input_type_options.includes(value);
			},
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
			type: [String, Number, null] as PropType<string | number | null>,
			default: "",
		},
	},
	emits: ["update:modelValue", "update", "enterPress", "clear", "search"],
	data() {
		return {
			value: "" as string | number | null,
			showPassword: false,
		};
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

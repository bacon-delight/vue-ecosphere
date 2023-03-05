<template lang="pug">
.input(:class="[{ 'input--disabled': disabled }]")
	//- Input Label
	.input__label {{ label }}

	//- Input Wrapper
	.input__wrapper
		//- Input Field
		input.input__field(
			:class="[`input__field--${status}`, { 'input__field--outline': outline }, { 'input__field--disabled': disabled }]",
			:type="type",
			:placeholder="placeholder",
			:disabled="disabled",
			@keyup="handleUpdate",
			v-model="value"
		)

		//- Clear Icon
		SVGIcon.input__icon(
			v-if="allowClear",
			name="ri-close-circle-line",
			:class="[{ 'input__icon--disabled': disabled }]",
			@click="clearValue"
		)

	//- Assistive Text
	.input__assistive-text {{ assistiveText }}
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type {
	input_type,
	input_status,
} from "@/plugin/utilities/types.interface";
import SVGIcon from "../general/SVGIcon.vue";

export default defineComponent({
	name: "InputField",
	props: {
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
		status: {
			type: String as PropType<input_status>,
			default: "none",
		},
		allowClear: {
			type: Boolean as PropType<boolean>,
			default: false,
		},
	},
	components: {
		SVGIcon,
	},
	data() {
		return {
			value: null as null | string | number,
		};
	},
	methods: {
		handleUpdate(): void {
			console.log(this.value);
			console.log(typeof this.value);
		},
		clearValue(): void {
			this.value = null;
			this.handleUpdate();
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
		top: 50%;
		right: 0.75rem;
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

	&__assistive-text {
		@include font-footnote;
		color: $color-disabled;
	}
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}
</style>

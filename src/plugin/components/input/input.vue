<template lang="pug">
.input(@change.prevent)
	//- Label
	VEcoText.input__label(v-if="label", :label="label")

	//- Input Field
	.input__field
		input.input__container.input__container--input(
			:type="input_types_to_html_types[type]",
			:placeholder="placeholder",
			:class="[{ 'input__container--outline': settings.outline, 'input__container--invalid': invalid }, `input__container--theme-${settings.theme}`, `input__container--type-${input_types_to_html_types[type]}`]",
			v-model="value",
			@blur="validate",
			@focus="invalid = false",
			@change="$emit('change', value)"
		)
		VEcoIcon.input__icon(
			v-if="type === input_types.password",
			:type="showPassword ? 'ri-eye-off-line' : 'ri-eye-line'",
			@click="showPassword = !showPassword"
		)

	//- Footer
	.input__footer
		VEcoText.input__footer--password(
			v-if="type === input_types.password && showPassword && value",
			:label="value"
		)
		VEcoText.input__footer--invalid(
			v-if="invalid",
			:label="settings.invalidWarning"
		)
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import {
	input_type,
	input_types,
	input_config,
	input_types_to_html_types,
} from "@/plugin/utils/types.interface";
import config from "@/plugin/utils/defaults/components/input.config";
import VEcoText from "@/plugin/components/common/text.vue";
import VEcoIcon from "@/plugin/components/common/icon.vue";

export default defineComponent({
	name: "Input",
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
		required: {
			type: Boolean as PropType<boolean>,
			default: false,
		},
		defaultValue: {
			type: [String, Number] as PropType<string | number>,
			default: null,
		},
		config: {
			type: Object as PropType<input_type>,
			default: () => config,
		},
	},
	emits: ["change", "valid"],
	computed: {
		settings(): input_config {
			return Object.assign({ ...config }, this.config);
		},
	},
	components: {
		VEcoText,
		VEcoIcon,
	},
	data() {
		return {
			input_types,
			input_types_to_html_types,
			value: null as string | number | null,
			invalid: false,
			showPassword: false,
		};
	},
	methods: {
		validate(): void {
			// Required Checks
			if (this.required && !this.value) {
				this.invalid = true;
			}
			// Custom Validation
			if (this.settings.regex) {
				this.invalid = !this.$ecosphere.validators.validate(
					this.settings.regex,
					this.value
				);
			}
			// Email Validation
			if (this.type === this.input_types.email) {
				this.invalid = !this.$ecosphere.validators.validate(
					this.$ecosphere.validators.email,
					this.value
				);
			}
			// Phone Validation
			if (this.type === this.input_types.phone) {
				this.invalid = !this.$ecosphere.validators.validate(
					this.$ecosphere.validators.phone,
					this.value
				);
			}
			if (!this.invalid) {
				this.$emit("valid", this.value);
			}
		},
	},
	mounted() {
		this.value = this.defaultValue;
	},
});
</script>

<style lang="scss" scoped>
.input {
	user-select: none;
	position: relative;
	width: 100%;

	&__label,
	&__footer {
		@include font-sidenote;
		margin: 0;
	}

	&__container {
		@include input-container;
	}

	&__field {
		width: 100%;
		position: relative;
	}

	&__footer {
		&--password {
			color: $color-helper-grey;
			display: block;
		}

		&--invalid {
			color: $color-helper-error;
			// display: block;
		}
	}

	&__icon {
		position: absolute;
		right: $spacer-0-5;
		top: 50%;
		transform: translateY(-50%);
		cursor: pointer;
		@include hover-color;
		color: $color-helper-grey;
	}
}
</style>

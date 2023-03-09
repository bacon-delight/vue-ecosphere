<template lang="pug">
.input(:class="[{ 'input--outline': outline, 'input--disabled': disabled }]")
	//- Input Field
	input.input__field(
		type="color",
		v-model="value",
		@change="handleChange",
		:disabled="disabled",
		tabindex="0"
	)

	//- Texts
	.input__texts(:class="[{ 'input__overlay-texts': overlay }]")
		.input__label(:style="{ color: overlay ? overlayColor : 'inherit' }") {{ label }}
		.input__color(:style="{ color: overlay ? overlayColor : '#a1a1a1' }") {{ value ? value.toUpperCase() : "#000000" }}
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";

export default defineComponent({
	name: "ColorPicker",
	emits: ["update:modelValue", "update"],
	props: {
		label: {
			type: String as PropType<string>,
			default: "",
		},
		modelValue: {
			type: [String, null] as PropType<string | null>,
			default: "#000000",
		},
		disabled: {
			type: Boolean as PropType<boolean>,
			default: false,
		},
		default: {
			type: [String, null] as PropType<string | null>,
			default: null,
		},
		overlay: {
			type: Boolean as PropType<boolean>,
			default: false,
		},
		overlayColor: {
			type: String as PropType<string>,
			default: "#FFFFFF",
		},
		outline: {
			type: Boolean as PropType<boolean>,
			default: false,
		},
	},
	data() {
		return {
			value: null as null | string,
		};
	},
	mounted() {
		this.value = this.default !== null ? this.default : this.modelValue;
	},
	methods: {
		handleChange(): void {
			this.$emit("update:modelValue", this.value);
			this.$emit("update", this.value);
		},
	},
	watch: {
		default(newDefault: string | null): void {
			this.value = newDefault === null ? "#000000" : newDefault;
		},
		modelValue(newValue: string | null): void {
			this.value = newValue;
		},
	},
});
</script>

<style lang="scss" scoped>
.input {
	display: block;
	width: 100%;
	background: $color-background;
	display: flex;
	flex-direction: column;
	row-gap: 0.25rem;
	border-radius: $border-radius-standard;
	overflow: hidden;
	height: fit-content;
	position: relative;

	&--outline {
		border: 1px solid $color-contrast;
	}

	&--disabled {
		opacity: 50%;
		pointer-events: none;
	}

	&:focus-within {
		outline: 2px solid $color-hyperlink;
	}

	&__overlay-texts {
		position: absolute;
		bottom: 0.25rem;
		left: 0;
	}

	&__field {
		border: 0;
		padding: 0;
		cursor: pointer;
		background: none;
		width: 100%;
		height: 5rem;

		&:focus {
			outline: none;
		}
	}

	&__texts {
		display: flex;
		flex-direction: column;
		row-gap: 0rem;
		padding: 0 0.5rem 0.25rem;
		user-select: none;
	}

	&__label {
		@include font-footnote;
	}

	&__color {
		@include font-footnote;
		font-weight: 600;
	}
}

input[type="color"]::-webkit-color-swatch-wrapper {
	padding: 0;
}

input[type="color"]::-webkit-color-swatch {
	border: none;
}
</style>

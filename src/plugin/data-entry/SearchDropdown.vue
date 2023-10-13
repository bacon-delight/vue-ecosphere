<template lang="pug">
.dropdown(:class="[{ 'dropdown--disabled': disabled }]")
	//- Dropdown Label
	.dropdown__label(:class="[`dropdown__label--${state}`]") {{ label }}

	//- Dropdown Wrapper
	.dropdown__wrapper(:id="dropdownID")
		input.dropdown__field(
			:ref="`input_${dropdownID}`",
			:id="`input_${dropdownID}`",
			:class="[`dropdown__field--${state}`, { 'dropdown__field--outline': outline }, { 'dropdown__field--selected': value !== null && !showOptions }]",
			@click="showOptions = true",
			@focus="showOptions = true",
			:placeholder="value !== null && !showOptions ? options[value].label : placeholder",
			v-model="search",
			type="text"
		)

		//- Icons
		.dropdown__icons
			//- Clear Icon
			SVGIcon.dropdown__icon(
				v-if="allowClear",
				name="ri-close-circle-line",
				:class="[{ 'dropdown__icon--disabled': disabled }]",
				@click.stop="clearValue"
			)

			//- Dropdown Arrow Icon
			SVGIcon.dropdown__icon(
				:name="showOptions ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'",
				@click.stop="toggleDropdown"
			)

		//- Dropdown Options
		Transition(name="dropdown-options")
			.dropdown__options(
				v-if="showOptions",
				:class="[`dropdown__options--${expand}`, { 'dropdown__field--outline': outline }]"
			)
				//- Dropdown Option
				.dropdown-option(
					v-for="option in filteredOptions",
					:class="[{ 'dropdown-option--disabled': option.disabled }]",
					:tabindex="option.disabled ? -1 : 0",
					@click="handleClick(option.index)",
					@keypress.enter="handleClick(option.index)"
				)
					//- Dropdown Option Label
					.dropdown-option__label(
						:class="[option.index === value ? `dropdown-option__label--active` : '']"
					) {{ option.label }}

					//- Active Icon
					SVGIcon.dropdown-option__icon(
						name="ri-checkbox-blank-circle-fill",
						:class="[`dropdown-option__icon--${hue}`, { 'dropdown-option__icon--hidden': !(option.index === value) }]"
					)
				//- No Available Options
				.dropdown__empty(v-if="!filteredOptions.length") No Results

	//- Assistive Text & Alert Message
	.dropdown__texts
		.dropdown__alert-message(
			v-if="alertMessage && state !== 'default'",
			:class="[`dropdown__alert-message--${state}`]"
		) {{ alertMessage }}
		.dropdown__assistive-text(v-else) {{ assistiveText }}
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type {
	choice_option,
	data_entry_state,
	hue,
	choice_option_expand,
	choice_option_filtered,
} from "@/plugin/utilities/types.interface";
import {
	choice_option_expand_options,
	hue_options,
	data_entry_state_options,
} from "@/plugin/utilities/types.interface";
import SVGIcon from "../general/SVGIcon.vue";

export default defineComponent({
	name: "SearchDropdown",
	emits: ["update:modelValue", "update", "clear"],
	props: {
		label: {
			type: String as PropType<string>,
			default: "",
		},
		placeholder: {
			type: String as PropType<string>,
			default: "",
		},
		assistiveText: {
			type: String as PropType<string>,
			default: "",
		},
		allowClear: {
			type: Boolean as PropType<boolean>,
			default: false,
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
		outline: {
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
		expand: {
			type: String as PropType<choice_option_expand>,
			default: "below",
			validator(value: choice_option_expand): boolean {
				return choice_option_expand_options.includes(value);
			},
		},
	},
	components: {
		SVGIcon,
	},
	data() {
		return {
			showOptions: false,
			search: "",
			value: null as null | number,
			dropdownID: `eco-dropdown-${Date.now()
				.toString()
				.slice(8)}-${Math.random().toFixed(5).slice(2)}`,
		};
	},
	methods: {
		toggleDropdown(): void {
			this.showOptions = !this.showOptions;
		},
		handleClick(index: number): void {
			this.value = index;
			this.$emit("update:modelValue", this.options[this.value].value);
			this.$emit("update", this.options[this.value].value);
			if (this.options[this.value].action) {
				(this.options[this.value].action as () => void)();
			}
			this.showOptions = false;
		},
		clearValue(): void {
			this.value = null;
			this.$emit("update:modelValue", null);
			this.$emit("update", null);
			this.$emit("clear");
			this.showOptions = false;
		},
		clickHandler(event: any | null): void {
			if (
				document
					.getElementById(this.dropdownID)
					?.contains(event?.target)
			) {
				// Chicked Inside Dropdown - Do Nothing
			} else {
				this.showOptions = false;
				window.removeEventListener("click", this.clickHandler);
			}
		},
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
	watch: {
		showOptions(value: boolean): void {
			if (value) {
				window.addEventListener("click", this.clickHandler);
			} else {
				window.removeEventListener("click", this.clickHandler);
			}
			this.search = "";
		},
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
	computed: {
		filteredOptions(): choice_option_filtered[] {
			return this.options
				.map(
					(
						option: choice_option,
						index: number
					): choice_option_filtered => {
						return {
							...option,
							index,
						};
					}
				)
				.filter((option: choice_option_filtered) => {
					return option.label
						.toString()
						.toLowerCase()
						.includes(this.search.toLowerCase());
				});
			// .filter(((option: choice_option_filtered)) => {
			// 	if (
			// 		option.label
			// 			.toString()
			// 			.toLowerCase()
			// 			.includes(this.search.toLowerCase())
			// 	) {
			// 		return true;
			// 	}
			// 	return false;
			// });
		},
	},
});
</script>

<style lang="scss" scoped>
.dropdown {
	display: flex;
	flex-direction: column;
	row-gap: 0.25rem;
	width: 100%;
	position: relative;

	&__options {
		position: absolute;
		width: 100%;
		z-index: 10;
		background: $color-background;
		border-radius: $border-radius-standard;
		user-select: none;
		padding: 0.325rem 0.325rem;
		display: flex;
		flex-direction: column;
		row-gap: 0.25rem;
		box-shadow: $box-shadow-heavy;
		max-height: 50vh;
		overflow-y: auto;

		&--above {
			top: 0;
			left: 0;
			transform: translateY(calc(-100% - 0.325rem));
		}

		&--below {
			top: 100%;
			left: 0;
			transform: translateY(0.325rem);
		}
	}

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
	}

	&__field {
		background: $color-background;
		padding: 0.5rem 0.75rem;
		// cursor: pointer;
		border-radius: $border-radius-standard;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		column-gap: 0.5rem;
		align-items: center;
		-webkit-tap-highlight-color: transparent;
		border: 1px solid $color-transparent;
		width: 100%;
		@include font-regular;
		color: $color-contrast;

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

		&--selected {
			&::placeholder {
				color: $color-contrast;
				@include font-regular;
			}
		}
	}

	&__placeholder {
		color: $color-disabled;
		@include font-regular;
		margin-right: auto;
	}

	&__value {
		color: $color-contrast;
		@include font-regular;
		margin-right: auto;
	}

	&__icons {
		position: absolute;
		top: 50%;
		right: 0.75rem;
		transform: translateY(-50%);
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		column-gap: 0.25rem;
	}

	&__icon {
		font-size: 1.25rem;
		color: $color-disabled;
		cursor: pointer;

		&:hover {
			color: $color-contrast;
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

	&__empty {
		text-align: center;
		padding: 1rem 0.5rem;
		color: $color-disabled;
	}
}

.dropdown-option {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	align-items: center;
	column-gap: 0.5rem;
	padding: 0.25rem 0.5rem;
	border-radius: $border-radius-standard;
	cursor: pointer;
	transition: $transition-standard;
	-webkit-tap-highlight-color: transparent;

	&:focus {
		outline: 1px solid $color-hyperlink;
	}

	&:hover {
		background: $color-background-faded;
	}

	&__label {
		@include font-regular;

		&--active {
			@include font-bold;
		}
	}

	&__icon {
		@include hue-color-modifiers;
		font-size: 0.75rem;
		margin-left: auto;

		&--hidden {
			opacity: 0;
		}
	}

	&--disabled {
		opacity: 50%;
		background: $color-offline;
		pointer-events: none;
		cursor: not-allowed;
	}
}

.dropdown-options-enter-active,
.dropdown-options-leave-active {
	transition: $transition-standard;
}

.dropdown-options-enter-from {
	// height: 0;
	opacity: 0;
	scale: 0;
	transform: translateY(-100%);
	// transform: translate(-100%, -100%);
}

.dropdown-options-leave-to {
	// height: 0;
	opacity: 0;
	scale: 0;
	transform: translateY(-100%);
	// transform: translate(-100%, -100%);
}
</style>

<template lang="pug">
.stepper(:class="`stepper--${responsiveOrientation}`", :id="stepperID")
	.step(
		:class="[`step--${responsiveOrientation}`, index <= current ? `step-completed step-completed--${responsiveOrientation}` : '']",
		v-for="(step, index) in steps"
	)
		.step__icon(:class="[`step__icon--${stepHue(index)}`]")
			SVGIcon(
				v-if="index < current || (index === current && state === 'completed')",
				name="ri-check-line"
			)
			SVGIcon(
				v-else-if="index === current && state === 'error'",
				name="ri-close-line"
			)
			SVGIcon(
				v-else-if="index === current && state === 'warning'",
				name="ri-error-warning-line"
			)
			SVGIcon(v-else-if="step.icon", :name="step.icon")
			span(v-else) {{ index + 1 }}
		.step__details(:class="`step__details--${responsiveOrientation}`")
			.step__label(
				:class="[current === index ? `step__label--${state}` : '', `step__label--${stepHue(index)}`]"
			) {{ step.label }}
			.step__description(:class="`step__description--${responsiveOrientation}`") {{ step.description }}
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type {
	hue_limited,
	stepper_step,
	stepper_orientation,
	stepper_state,
	hue,
} from "@/plugin/utilities/types.interface";
import {
	hue_limited_options,
	stepper_orientation_options,
	stepper_state_options,
} from "@/plugin/utilities/types.interface";
import SVGIcon from "../general/SVGIcon.vue";

export default defineComponent({
	name: "StepperComponent",
	props: {
		current: {
			type: Number as PropType<number>,
			default: 0,
		},
		hue: {
			type: String as PropType<hue_limited>,
			default: "information",
			validator(value: hue_limited): boolean {
				return hue_limited_options.includes(value);
			},
		},
		steps: {
			type: Array as PropType<stepper_step[]>,
			required: true,
		},
		orientation: {
			type: String as PropType<stepper_orientation>,
			default: "horizontal",
			validator(value: stepper_orientation): boolean {
				return stepper_orientation_options.includes(value);
			},
		},
		state: {
			type: String as PropType<stepper_state>,
			default: "in-progress",
			validator(value: stepper_state): boolean {
				return stepper_state_options.includes(value);
			},
		},
		responsive: {
			type: Boolean as PropType<boolean>,
			default: true,
		},
	},
	data() {
		return {
			stepperID: `eco-stepper-${Date.now()
				.toString()
				.slice(8)}-${Math.random().toFixed(5).slice(2)}`,
			allowHorizontal: false,
		};
	},
	beforeMount() {
		window.addEventListener("resize", this.assessHorizontalCapability);
	},
	mounted() {
		this.assessHorizontalCapability();
	},
	methods: {
		stepHue(index: number): hue | "default" {
			if (index < this.current) {
				return "success";
			} else if (index <= this.current) {
				switch (this.state) {
					case "awaiting":
						return "default";
					case "in-progress":
						return this.hue;
					case "completed":
						return "success";
					case "warning":
						return "warning";
					case "error":
						return "error";
					default:
						break;
				}
				return "information";
			}
			return "default";
		},
		assessHorizontalCapability(): void {
			const containerWidth: number =
				document.getElementById(this.stepperID)?.getBoundingClientRect()
					.width || 0;
			const minimumRequiredHorizontalWidth = 150 * this.steps.length + 50;
			if (containerWidth < minimumRequiredHorizontalWidth) {
				this.allowHorizontal = false;
			} else {
				this.allowHorizontal = true;
			}
		},
	},
	computed: {
		responsiveOrientation(): stepper_orientation {
			if (this.orientation === "horizontal" && this.responsive) {
				if (!this.allowHorizontal) {
					return "vertical";
				}
			}
			return this.orientation;
		},
	},
	components: {
		SVGIcon,
	},
	beforeUnmount() {
		window.removeEventListener("resize", this.assessHorizontalCapability);
	},
});
</script>

<style lang="scss" scoped>
.stepper {
	display: grid;
	width: 100%;

	&--horizontal {
		grid-auto-columns: minmax(0, 1fr);
		grid-auto-flow: column;
		column-gap: 1rem;
	}

	&--vertical {
		grid-auto-flow: row;
		grid-auto-columns: 1fr;
		row-gap: 1.5rem;

		// &::before {
		// 	content: "";
		// 	background: $color-divider;
		// 	position: absolute;
		// 	height: calc(100% - 1rem);
		// 	width: 1px;
		// 	transform: translateX(1rem) translateY(10px);
		// }
	}
}

.step {
	align-items: center;
	min-width: 150px;

	&--horizontal {
		display: flex;
		flex-direction: column;
	}

	&--vertical {
		display: grid;
		grid-template-columns: min-content 1fr;
		column-gap: 0.5rem;
	}

	&__icon {
		background: $color-offline;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 2rem;
		width: 2rem;
		@include font-bold;
		@include hue-modifiers;
		border: 1px solid $color-transparent;

		&--default {
			border: 1px solid $color-divider;
			color: $color-dark-faded;
		}
	}

	&__details {
		display: flex;
		flex-direction: column;

		&--horizontal {
			align-items: center;
		}
	}

	&__label {
		@include font-bold;
		@include hue-color-modifiers;
		color: $color-disabled;
	}

	&__description {
		@include font-footnote;

		&--horizontal {
			text-align: center;
		}
	}
}

.step + .step--horizontal:after {
	content: "";
	position: absolute;
	transform: translateX(-50%);
	top: 1rem;
	background: $color-divider;
	height: 1px;
	width: 100%;
	z-index: -1;
}

.step-completed + .step-completed--horizontal:after {
	background: $color-success;
}

.step + .step--vertical:after {
	content: "";
	position: absolute;
	transform: translateY(-2rem);
	left: 1rem;
	background: $color-divider;
	height: 100%;
	width: 1px;
	z-index: -1;
}

.step-completed + .step-completed--vertical:after {
	background: $color-success;
}
</style>

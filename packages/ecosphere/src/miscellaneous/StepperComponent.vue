<template>
	<ol
		:id="stepperId"
		class="ep-stepper"
		:class="[
			`ep-stepper--${effectiveOrientation}`,
			`ep-stepper--${size}`,
			{
				'ep-stepper--clickable': clickable,
				'ep-stepper--progress-dots': progressDots,
			},
		]"
		:aria-label="ariaLabel"
	>
		<li
			v-for="(step, index) in steps"
			:key="index"
			class="ep-stepper__step"
			:class="[
				`ep-stepper__step--${effectiveOrientation}`,
				`ep-stepper__step--${stepHue(index)}`,
				{
					'ep-stepper__step--complete': index < value,
					'ep-stepper__step--current': index === value,
					'ep-stepper__step--pending': index > value,
				},
			]"
			:aria-current="index === value ? 'step' : undefined"
		>
			<component
				:is="clickable ? 'button' : 'div'"
				class="ep-stepper__indicator"
				:type="clickable ? 'button' : undefined"
				:tabindex="clickable ? 0 : undefined"
				:aria-label="
					clickable
						? `Go to step ${index + 1}: ${step.label}`
						: undefined
				"
				:disabled="clickable && !canClick(index) ? true : undefined"
				@click="onStepClick(index)"
				@keydown.enter.prevent="onStepClick(index)"
				@keydown.space.prevent="onStepClick(index)"
			>
				<SVGIcon
					v-if="
						index < value ||
						(index === value && state === 'completed')
					"
					name="ri-check-line"
				/>
				<SVGIcon
					v-else-if="index === value && state === 'error'"
					name="ri-close-line"
				/>
				<SVGIcon
					v-else-if="index === value && state === 'warning'"
					name="ri-error-warning-line"
				/>
				<SVGIcon v-else-if="step.icon" :name="step.icon" />
				<span v-else>{{ index + 1 }}</span>
			</component>
			<div
				class="ep-stepper__details"
				:class="`ep-stepper__details--${effectiveOrientation}`"
			>
				<div class="ep-stepper__label">{{ step.label }}</div>
				<div v-if="step.description" class="ep-stepper__description">
					{{ step.description }}
				</div>
			</div>
			<div
				v-if="index < steps.length - 1"
				class="ep-stepper__connector"
				:class="[
					`ep-stepper__connector--${effectiveOrientation}`,
					{
						'ep-stepper__connector--complete': index < value,
					},
				]"
				aria-hidden="true"
			/>
		</li>
	</ol>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import SVGIcon from "../general/SVGIcon.vue";
import { useEpSize } from "../composables/useEpSize";
import { useEpId } from "../composables/useEpId";
import type { EpSize } from "../general/config";
import type { EpHue } from "../utilities/types/shared";

export type StepperOrientation = "horizontal" | "vertical";
export type StepperState =
	| "awaiting"
	| "in-progress"
	| "completed"
	| "error"
	| "warning";

export interface StepperStep {
	label: string;
	description?: string;
	icon?: string;
}

export interface StepperProps {
	value?: number;
	steps: StepperStep[];
	hue?: EpHue;
	orientation?: StepperOrientation;
	state?: StepperState;
	responsive?: boolean;
	clickable?: boolean;
	progressDots?: boolean;
	size?: EpSize;
	ariaLabel?: string;
}

const props = withDefaults(defineProps<StepperProps>(), {
	value: 0,
	hue: "information",
	orientation: "horizontal",
	state: "in-progress",
	responsive: true,
	clickable: false,
	progressDots: false,
	size: undefined,
	ariaLabel: "Progress",
});

const emit = defineEmits<{
	(e: "update:value", value: number): void;
	(e: "change", value: number, step: StepperStep): void;
}>();

const stepperId = useEpId("ep-stepper");
const size = useEpSize(() => props.size);
const allowHorizontal = ref(true);

const effectiveOrientation = computed<StepperOrientation>(() => {
	if (
		props.orientation === "horizontal" &&
		props.responsive &&
		!allowHorizontal.value
	) {
		return "vertical";
	}
	return props.orientation;
});

function stepHue(index: number): EpHue | "default" {
	if (index < props.value) return "success";
	if (index === props.value) {
		switch (props.state) {
			case "awaiting":
				return "default";
			case "in-progress":
				return props.hue;
			case "completed":
				return "success";
			case "warning":
				return "warning";
			case "error":
				return "error";
		}
	}
	return "default";
}

function canClick(index: number): boolean {
	return props.clickable && index <= props.value + 1;
}

function onStepClick(index: number) {
	if (!props.clickable || !canClick(index)) return;
	emit("update:value", index);
	emit("change", index, props.steps[index]);
}

function assessHorizontalCapability() {
	if (typeof document === "undefined") return;
	const el = document.getElementById(stepperId);
	if (!el) return;
	const width = el.getBoundingClientRect().width || 0;
	const minWidth = 150 * props.steps.length + 50;
	allowHorizontal.value = width >= minWidth;
}

onMounted(() => {
	assessHorizontalCapability();
	if (typeof window !== "undefined") {
		window.addEventListener("resize", assessHorizontalCapability);
	}
});

onBeforeUnmount(() => {
	if (typeof window !== "undefined") {
		window.removeEventListener("resize", assessHorizontalCapability);
	}
});
</script>

<style scoped>
.ep-stepper {
	list-style: none;
	margin: 0;
	padding: 0;
	display: grid;
	width: 100%;
	font-family: var(--ep-font-family-base);
	color: var(--ep-color-contrast);
}

.ep-stepper--horizontal {
	grid-auto-flow: column;
	grid-auto-columns: minmax(0, 1fr);
	column-gap: 0;
}

.ep-stepper--vertical {
	grid-auto-flow: row;
	row-gap: 1.25rem;
}

.ep-stepper--xs {
	font-size: 0.75rem;
}
.ep-stepper--sm {
	font-size: 0.875rem;
}
.ep-stepper--md {
	font-size: 1rem;
}
.ep-stepper--lg {
	font-size: 1.125rem;
}
.ep-stepper--xl {
	font-size: 1.25rem;
}

.ep-stepper__step {
	position: relative;
	min-width: 0;
}

.ep-stepper__step--horizontal {
	display: flex;
	flex-direction: column;
	align-items: center;
	row-gap: 0.5rem;
}

.ep-stepper__step--vertical {
	display: grid;
	grid-template-columns: min-content 1fr;
	column-gap: 0.75rem;
}

.ep-stepper__indicator {
	appearance: none;
	border: 1px solid var(--ep-color-transparent);
	background: var(--ep-color-background-faded);
	color: var(--ep-color-contrast);
	height: 2rem;
	width: 2rem;
	min-width: 2rem;
	border-radius: 50%;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	font-weight: 600;
	cursor: default;
	transition: var(--ep-transition-base);
	font-family: inherit;
}

.ep-stepper--progress-dots .ep-stepper__indicator {
	height: 0.75rem;
	width: 0.75rem;
	min-width: 0.75rem;
	font-size: 0;
}

.ep-stepper--progress-dots .ep-stepper__indicator > * {
	display: none;
}

.ep-stepper--clickable .ep-stepper__indicator {
	cursor: pointer;
}

.ep-stepper--clickable .ep-stepper__indicator:focus-visible {
	outline: var(--ep-outline-focus);
	outline-offset: 2px;
}

.ep-stepper--clickable .ep-stepper__indicator:disabled {
	cursor: not-allowed;
}

.ep-stepper__step--primary .ep-stepper__indicator {
	background: var(--ep-color-primary);
	color: var(--ep-color-primary-contrast);
}
.ep-stepper__step--primary-variant .ep-stepper__indicator {
	background: var(--ep-color-primary-variant);
	color: var(--ep-color-primary-variant-contrast);
}
.ep-stepper__step--secondary .ep-stepper__indicator {
	background: var(--ep-color-secondary);
	color: var(--ep-color-secondary-contrast);
}
.ep-stepper__step--secondary-variant .ep-stepper__indicator {
	background: var(--ep-color-secondary-variant);
	color: var(--ep-color-secondary-variant-contrast);
}
.ep-stepper__step--error .ep-stepper__indicator {
	background: var(--ep-color-error);
	color: var(--ep-color-contrast);
}
.ep-stepper__step--success .ep-stepper__indicator {
	background: var(--ep-color-success);
	color: var(--ep-color-contrast);
}
.ep-stepper__step--warning .ep-stepper__indicator {
	background: var(--ep-color-warning);
	color: var(--ep-color-contrast);
}
.ep-stepper__step--information .ep-stepper__indicator {
	background: var(--ep-color-information);
	color: var(--ep-color-contrast);
}
.ep-stepper__step--default .ep-stepper__indicator {
	background: var(--ep-color-background-faded);
	color: var(--ep-color-contrast);
	border: 1px solid var(--ep-color-divider);
	opacity: 0.7;
}

.ep-stepper__details {
	display: flex;
	flex-direction: column;
	min-width: 0;
}

.ep-stepper__details--horizontal {
	align-items: center;
	text-align: center;
}

.ep-stepper__label {
	font-weight: 600;
}

.ep-stepper__step--pending .ep-stepper__label {
	opacity: 0.6;
}

.ep-stepper__description {
	font-size: 0.875em;
	opacity: 0.7;
}

.ep-stepper__connector {
	background: var(--ep-color-divider);
	z-index: 0;
}

.ep-stepper__connector--horizontal {
	position: absolute;
	top: 1rem;
	left: 50%;
	width: 100%;
	height: 1px;
}

.ep-stepper--progress-dots .ep-stepper__connector--horizontal {
	top: 0.375rem;
}

.ep-stepper__connector--vertical {
	position: absolute;
	left: 1rem;
	top: 2rem;
	height: calc(100% + 1.25rem - 2rem);
	width: 1px;
}

.ep-stepper--progress-dots .ep-stepper__connector--vertical {
	left: 0.375rem;
}

.ep-stepper__connector--complete {
	background: var(--ep-color-success);
}
</style>

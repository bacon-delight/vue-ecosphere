<template>
	<div
		class="ep-input ep-input-number"
		:class="[
			`ep-input--${size}`,
			state !== 'default' && `ep-input--${state}`,
			{
				'ep-input--disabled': disabled,
				'ep-input--bordered': bordered,
				'ep-input-number--no-controls': !controls,
			},
		]"
	>
		<label
			v-if="label"
			:for="inputId"
			class="ep-input__label"
			:class="state !== 'default' && `ep-input__label--${state}`"
		>
			{{ label }}
		</label>
		<div class="ep-input__row">
			<div class="ep-input__wrapper">
				<input
					:id="inputId"
					ref="inputRef"
					type="text"
					inputmode="decimal"
					class="ep-input__field"
					:value="displayValue"
					:placeholder="placeholder"
					:disabled="disabled"
					:readonly="readonly"
					:aria-valuenow="value ?? undefined"
					:aria-valuemin="min ?? undefined"
					:aria-valuemax="max ?? undefined"
					:aria-invalid="state === 'error' ? 'true' : undefined"
					:aria-describedby="describedById"
					role="spinbutton"
					@input="onInput"
					@change="onCommit"
					@keydown.up.prevent="step(stepValue)"
					@keydown.down.prevent="step(-stepValue)"
					@keydown.enter="emit('enter', value, $event)"
					@focus="emit('focus', $event)"
					@blur="onBlur($event)"
				/>
				<div
					v-if="controls"
					class="ep-input-number__controls"
					aria-hidden="true"
				>
					<button
						type="button"
						class="ep-input-number__btn"
						tabindex="-1"
						:disabled="disabled || readonly || !canIncrement"
						@mousedown.prevent
						@click="step(stepValue)"
					>
						<SVGIcon name="ri-arrow-up-s-line" />
					</button>
					<button
						type="button"
						class="ep-input-number__btn"
						tabindex="-1"
						:disabled="disabled || readonly || !canDecrement"
						@mousedown.prevent
						@click="step(-stepValue)"
					>
						<SVGIcon name="ri-arrow-down-s-line" />
					</button>
				</div>
			</div>
		</div>
		<div v-if="hasFooter" :id="describedById" class="ep-input__footer">
			<div
				v-if="alertMessage && state !== 'default'"
				class="ep-input__alert"
				:class="`ep-input__alert--${state}`"
				role="alert"
			>
				{{ alertMessage }}
			</div>
			<div v-else-if="assistiveText" class="ep-input__assistive">
				{{ assistiveText }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import SVGIcon from "../general/SVGIcon.vue";
import { useEpId } from "../composables/useEpId";
import { useEpSize } from "../composables/useEpSize";
import type { EpSize } from "../general/config";

export type DataEntryState = "default" | "error" | "warning" | "success";
export type InputNumberValue = number | null;

export interface InputNumberProps {
	value?: InputNumberValue;
	label?: string;
	placeholder?: string;
	disabled?: boolean;
	readonly?: boolean;
	bordered?: boolean;
	min?: number | null;
	max?: number | null;
	step?: number;
	precision?: number | null;
	controls?: boolean;
	assistiveText?: string;
	alertMessage?: string;
	state?: DataEntryState;
	size?: EpSize;
}

const props = withDefaults(defineProps<InputNumberProps>(), {
	value: null,
	label: "",
	placeholder: "",
	disabled: false,
	readonly: false,
	bordered: true,
	min: null,
	max: null,
	step: 1,
	precision: null,
	controls: true,
	assistiveText: "",
	alertMessage: "",
	state: "default",
	size: undefined,
});

const emit = defineEmits<{
	(e: "update:value", value: InputNumberValue): void;
	(e: "change", value: InputNumberValue, event: Event): void;
	(e: "enter", value: InputNumberValue, event: KeyboardEvent): void;
	(e: "focus", event: FocusEvent): void;
	(e: "blur", event: FocusEvent): void;
}>();

const size = useEpSize(() => props.size);
const inputId = useEpId("ep-input-number");
const describedById = useEpId("ep-input-number-desc");
const inputRef = ref<HTMLInputElement | null>(null);
const rawText = ref<string | null>(null);

const stepValue = computed(() => props.step || 1);

const displayValue = computed(() => {
	if (rawText.value !== null) return rawText.value;
	if (props.value === null || props.value === undefined) return "";
	if (props.precision !== null) return props.value.toFixed(props.precision);
	return String(props.value);
});

const canIncrement = computed(
	() =>
		props.max === null ||
		(props.value ?? 0) + stepValue.value <= (props.max as number)
);
const canDecrement = computed(
	() =>
		props.min === null ||
		(props.value ?? 0) - stepValue.value >= (props.min as number)
);

const hasFooter = computed(
	() =>
		(props.alertMessage && props.state !== "default") ||
		!!props.assistiveText
);

function clamp(n: number): number {
	let r = n;
	if (props.min !== null && r < (props.min as number))
		r = props.min as number;
	if (props.max !== null && r > (props.max as number))
		r = props.max as number;
	if (props.precision !== null) r = Number(r.toFixed(props.precision));
	return r;
}

function parse(s: string): number | null {
	if (s === "" || s === "-") return null;
	const n = Number(s);
	return Number.isFinite(n) ? n : null;
}

function onInput(e: Event) {
	const text = (e.target as HTMLInputElement).value;
	rawText.value = text;
	const n = parse(text);
	if (n === null) {
		emit("update:value", null);
	} else {
		emit("update:value", clamp(n));
	}
}

function onCommit(e: Event) {
	rawText.value = null;
	emit("change", props.value, e);
}

function onBlur(e: FocusEvent) {
	rawText.value = null;
	emit("blur", e);
}

function step(delta: number) {
	if (props.disabled || props.readonly) return;
	const base = props.value ?? 0;
	const next = clamp(base + delta);
	emit("update:value", next);
}

defineExpose({
	focus: () => inputRef.value?.focus(),
	blur: () => inputRef.value?.blur(),
});
</script>

<style scoped>
.ep-input-number__controls {
	display: inline-flex;
	flex-direction: column;
	border-left: 1px solid var(--ep-color-border, currentColor);
	align-self: stretch;
}
.ep-input-number__btn {
	all: unset;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	flex: 1;
	min-width: 1.5rem;
	padding: 0 0.25rem;
	cursor: pointer;
	color: var(--ep-color-disabled, currentColor);
	font-size: 0.875rem;
	line-height: 1;
}
.ep-input-number__btn:hover:not(:disabled) {
	color: var(--ep-color-primary);
	background: var(--ep-color-surface, transparent);
}
.ep-input-number__btn:disabled {
	opacity: 0.4;
	cursor: not-allowed;
}
.ep-input-number--no-controls .ep-input-number__controls {
	display: none;
}
</style>

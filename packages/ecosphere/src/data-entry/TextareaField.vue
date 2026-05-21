<template>
	<div
		class="ep-textarea ep-input"
		:class="[
			`ep-input--${size}`,
			state !== 'default' && `ep-input--${state}`,
			{
				'ep-input--disabled': disabled,
				'ep-input--bordered': bordered,
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
		<div class="ep-input__wrapper ep-textarea__wrapper">
			<textarea
				:id="inputId"
				ref="textareaRef"
				v-model="internalValue"
				class="ep-input__field ep-textarea__field"
				:placeholder="placeholder"
				:disabled="disabled"
				:readonly="readonly"
				:rows="effectiveRows"
				:maxlength="maxLength ?? undefined"
				:aria-invalid="state === 'error' ? 'true' : undefined"
				:aria-describedby="describedById"
				:style="autoSize ? { resize: 'none' } : undefined"
				@input="onInput"
				@change="onChange"
				@focus="emit('focus', $event)"
				@blur="emit('blur', $event)"
			/>
			<button
				v-if="allowClear && hasValue && !disabled && !readonly"
				type="button"
				class="ep-input__icon-btn ep-textarea__clear"
				:aria-label="clearLabel"
				@click="clearValue"
			>
				<SVGIcon name="ri-close-circle-line" aria-hidden />
			</button>
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
			<div v-if="showCount" class="ep-input__count">
				{{ currentLength
				}}<template v-if="maxLength != null">
					/ {{ maxLength }}</template
				>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from "vue";
import SVGIcon from "../general/SVGIcon.vue";
import { useEpId } from "../composables/useEpId";
import { useEpSize } from "../composables/useEpSize";
import type { EpSize } from "../general/config";

export type DataEntryState = "default" | "error" | "warning" | "success";
export type TextareaValue = string | null;
export type AutoSize = boolean | { minRows?: number; maxRows?: number };

export interface TextareaProps {
	value?: TextareaValue;
	label?: string;
	placeholder?: string;
	rows?: number;
	disabled?: boolean;
	readonly?: boolean;
	bordered?: boolean;
	allowClear?: boolean;
	maxLength?: number | null;
	showCount?: boolean;
	autoSize?: AutoSize;
	assistiveText?: string;
	alertMessage?: string;
	state?: DataEntryState;
	size?: EpSize;
	clearLabel?: string;
}

const props = withDefaults(defineProps<TextareaProps>(), {
	value: "",
	label: "",
	placeholder: "",
	rows: 3,
	disabled: false,
	readonly: false,
	bordered: true,
	allowClear: false,
	maxLength: null,
	showCount: false,
	autoSize: false,
	assistiveText: "",
	alertMessage: "",
	state: "default",
	size: undefined,
	clearLabel: "Clear",
});

const emit = defineEmits<{
	(e: "update:value", value: TextareaValue): void;
	(e: "change", value: TextareaValue, event: Event): void;
	(e: "clear"): void;
	(e: "focus", event: FocusEvent): void;
	(e: "blur", event: FocusEvent): void;
}>();

const size = useEpSize(() => props.size);
const inputId = useEpId("ep-textarea");
const describedById = useEpId("ep-textarea-desc");
const textareaRef = ref<HTMLTextAreaElement | null>(null);

const internalValue = computed<TextareaValue>({
	get: () => props.value ?? "",
	set: (v) => emit("update:value", v),
});

const hasValue = computed(
	() => internalValue.value !== null && internalValue.value !== ""
);
const currentLength = computed(() => (internalValue.value ?? "").length);
const effectiveRows = computed(() => {
	if (typeof props.autoSize === "object" && props.autoSize.minRows)
		return props.autoSize.minRows;
	return props.rows;
});

const hasFooter = computed(
	() =>
		(props.alertMessage && props.state !== "default") ||
		!!props.assistiveText ||
		props.showCount
);

function resize() {
	if (!props.autoSize || !textareaRef.value) return;
	const ta = textareaRef.value;
	ta.style.height = "auto";
	let newHeight = ta.scrollHeight;
	if (typeof props.autoSize === "object" && props.autoSize.maxRows) {
		const lineHeight = parseFloat(getComputedStyle(ta).lineHeight) || 20;
		const maxHeight = lineHeight * props.autoSize.maxRows;
		if (newHeight > maxHeight) newHeight = maxHeight;
	}
	ta.style.height = `${newHeight}px`;
}

function onInput(e: Event) {
	emit("change", (e.target as HTMLTextAreaElement).value, e);
	if (props.autoSize) nextTick(resize);
}
function onChange(e: Event) {
	emit("change", (e.target as HTMLTextAreaElement).value, e);
}
function clearValue() {
	emit("update:value", "");
	emit("clear");
	textareaRef.value?.focus();
}

watch(
	() => internalValue.value,
	() => {
		if (props.autoSize) nextTick(resize);
	},
	{ immediate: true }
);

defineExpose({
	focus: () => textareaRef.value?.focus(),
	blur: () => textareaRef.value?.blur(),
});
</script>

<style scoped>
.ep-textarea__wrapper {
	align-items: stretch;
	padding: 0;
}
.ep-textarea__field {
	resize: vertical;
	min-height: 4rem;
	line-height: 1.5;
}
.ep-textarea__clear {
	position: absolute;
	top: 0.375rem;
	right: 0.375rem;
}
.ep-textarea {
	position: relative;
}
</style>

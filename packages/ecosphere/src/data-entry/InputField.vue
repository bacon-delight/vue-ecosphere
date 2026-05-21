<template>
	<div
		class="ep-input"
		:class="[
			`ep-input--${size}`,
			state !== 'default' && `ep-input--${state}`,
			{
				'ep-input--disabled': disabled,
				'ep-input--bordered': bordered,
				'ep-input--has-addon-before': hasAddonBefore,
				'ep-input--has-addon-after': hasAddonAfter,
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
			<div
				v-if="hasAddonBefore"
				class="ep-input__addon ep-input__addon--before"
			>
				<slot name="addonBefore">{{ addonBefore }}</slot>
			</div>
			<div class="ep-input__wrapper">
				<span
					v-if="hasPrefix"
					class="ep-input__affix ep-input__affix--prefix"
				>
					<slot name="prefix">{{ prefix }}</slot>
				</span>
				<input
					:id="inputId"
					ref="inputRef"
					v-model="internalValue"
					class="ep-input__field"
					:type="fieldType"
					:placeholder="placeholder"
					:disabled="disabled"
					:readonly="readonly"
					:maxlength="maxLength ?? undefined"
					:autocomplete="autocomplete"
					:aria-invalid="state === 'error' ? 'true' : undefined"
					:aria-describedby="describedById"
					@input="onInput"
					@change="onChange"
					@keydown.enter="onEnter"
					@focus="emit('focus', $event)"
					@blur="emit('blur', $event)"
				/>
				<span
					v-if="hasSuffix"
					class="ep-input__affix ep-input__affix--suffix"
				>
					<button
						v-if="allowClear && hasValue && !disabled && !readonly"
						type="button"
						class="ep-input__icon-btn"
						:aria-label="clearLabel"
						@click="clearValue"
					>
						<SVGIcon name="ri-close-circle-line" aria-hidden />
					</button>
					<button
						v-if="type === 'password'"
						type="button"
						class="ep-input__icon-btn"
						:aria-label="
							showPassword ? 'Hide password' : 'Show password'
						"
						:aria-pressed="showPassword ? 'true' : 'false'"
						@click="showPassword = !showPassword"
					>
						<SVGIcon
							:name="
								showPassword ? 'ri-eye-off-line' : 'ri-eye-line'
							"
							aria-hidden
						/>
					</button>
					<button
						v-if="type === 'search'"
						type="button"
						class="ep-input__icon-btn"
						:aria-label="searchLabel"
						@click="onSearch"
					>
						<SVGIcon name="ri-search-2-line" aria-hidden />
					</button>
					<slot name="suffix">{{ suffix }}</slot>
				</span>
			</div>
			<div
				v-if="hasAddonAfter"
				class="ep-input__addon ep-input__addon--after"
			>
				<slot name="addonAfter">{{ addonAfter }}</slot>
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
import { computed, ref, useSlots } from "vue";
import SVGIcon from "../general/SVGIcon.vue";
import { useEpId } from "../composables/useEpId";
import { useEpSize } from "../composables/useEpSize";
import type { EpSize } from "../general/config";

export type InputType =
	| "text"
	| "email"
	| "password"
	| "search"
	| "tel"
	| "url";
export type DataEntryState = "default" | "error" | "warning" | "success";
export type InputValue = string | number | null;

export interface InputProps {
	value?: InputValue;
	label?: string;
	placeholder?: string;
	type?: InputType;
	disabled?: boolean;
	readonly?: boolean;
	bordered?: boolean;
	allowClear?: boolean;
	maxLength?: number | null;
	showCount?: boolean;
	prefix?: string;
	suffix?: string;
	addonBefore?: string;
	addonAfter?: string;
	assistiveText?: string;
	alertMessage?: string;
	state?: DataEntryState;
	size?: EpSize;
	autocomplete?: string;
	clearLabel?: string;
	searchLabel?: string;
}

const props = withDefaults(defineProps<InputProps>(), {
	value: "",
	label: "",
	placeholder: "",
	type: "text",
	disabled: false,
	readonly: false,
	bordered: true,
	allowClear: false,
	maxLength: null,
	showCount: false,
	prefix: "",
	suffix: "",
	addonBefore: "",
	addonAfter: "",
	assistiveText: "",
	alertMessage: "",
	state: "default",
	size: undefined,
	autocomplete: undefined,
	clearLabel: "Clear",
	searchLabel: "Search",
});

const emit = defineEmits<{
	(e: "update:value", value: InputValue): void;
	(e: "change", value: InputValue, event: Event): void;
	(e: "clear"): void;
	(e: "enter", value: InputValue, event: KeyboardEvent): void;
	(e: "search", value: InputValue): void;
	(e: "focus", event: FocusEvent): void;
	(e: "blur", event: FocusEvent): void;
}>();

const slots = useSlots();
const size = useEpSize(() => props.size);
const inputId = useEpId("ep-input");
const describedById = useEpId("ep-input-desc");
const inputRef = ref<HTMLInputElement | null>(null);
const showPassword = ref(false);

const internalValue = computed<InputValue>({
	get: () => props.value ?? "",
	set: (v) => emit("update:value", v),
});

const fieldType = computed<InputType>(() =>
	props.type === "password" && showPassword.value ? "text" : props.type
);

const hasValue = computed(
	() =>
		internalValue.value !== null &&
		internalValue.value !== "" &&
		internalValue.value !== undefined
);

const currentLength = computed(() =>
	internalValue.value == null ? 0 : String(internalValue.value).length
);

const hasPrefix = computed(() => !!props.prefix || !!slots.prefix);
const hasSuffix = computed(
	() =>
		!!props.suffix ||
		!!slots.suffix ||
		props.allowClear ||
		props.type === "password" ||
		props.type === "search"
);
const hasAddonBefore = computed(
	() => !!props.addonBefore || !!slots.addonBefore
);
const hasAddonAfter = computed(() => !!props.addonAfter || !!slots.addonAfter);
const hasFooter = computed(
	() =>
		(props.alertMessage && props.state !== "default") ||
		!!props.assistiveText ||
		props.showCount
);

function onInput(e: Event) {
	emit("change", (e.target as HTMLInputElement).value, e);
}
function onChange(e: Event) {
	emit("change", (e.target as HTMLInputElement).value, e);
}
function onEnter(e: KeyboardEvent) {
	emit("enter", internalValue.value, e);
}
function onSearch() {
	emit("search", internalValue.value);
}
function clearValue() {
	emit("update:value", "");
	emit("clear");
	inputRef.value?.focus();
}

defineExpose({
	focus: () => inputRef.value?.focus(),
	blur: () => inputRef.value?.blur(),
});
</script>

<style scoped>
.ep-input {
	display: flex;
	flex-direction: column;
	row-gap: 0.25rem;
	font-family: var(--ep-font-family-base);
	width: 100%;

	&--disabled {
		opacity: 0.6;
		pointer-events: none;
	}

	&__label {
		font-size: 0.875rem;
		color: var(--ep-color-text, currentColor);

		&--error {
			color: var(--ep-color-error);
		}
		&--warning {
			color: var(--ep-color-warning);
		}
		&--success {
			color: var(--ep-color-success);
		}
	}

	&__row {
		display: flex;
		align-items: stretch;
		width: 100%;
	}

	&__addon {
		display: inline-flex;
		align-items: center;
		padding: 0 0.75rem;
		background: var(--ep-color-surface, transparent);
		border: 1px solid var(--ep-color-border, currentColor);
		font-size: 0.875rem;

		&--before {
			border-right: 0;
			border-top-left-radius: var(--ep-radius-md, 6px);
			border-bottom-left-radius: var(--ep-radius-md, 6px);
		}
		&--after {
			border-left: 0;
			border-top-right-radius: var(--ep-radius-md, 6px);
			border-bottom-right-radius: var(--ep-radius-md, 6px);
		}
	}

	&__wrapper {
		display: inline-flex;
		align-items: center;
		flex: 1;
		min-width: 0;
		background: var(--ep-color-background, #fff);
		border: 1px solid transparent;
		border-radius: var(--ep-radius-md, 6px);
		transition: var(--ep-transition-base, all 0.2s ease);
	}

	&--bordered &__wrapper {
		border-color: var(--ep-color-border, currentColor);
	}

	&--has-addon-before &__wrapper {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}
	&--has-addon-after &__wrapper {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}

	&--error &__wrapper {
		border-color: var(--ep-color-error);
	}
	&--warning &__wrapper {
		border-color: var(--ep-color-warning);
	}
	&--success &__wrapper {
		border-color: var(--ep-color-success);
	}

	&__wrapper:focus-within {
		outline: var(--ep-outline-focus, 2px solid var(--ep-color-primary));
		outline-offset: 1px;
	}

	&__field {
		flex: 1;
		min-width: 0;
		background: transparent;
		border: 0;
		outline: 0;
		color: var(--ep-color-text, currentColor);
		font: inherit;

		&::placeholder {
			color: var(--ep-color-disabled, currentColor);
		}
	}

	&--xs &__field {
		padding: 0.25rem 0.5rem;
		font-size: 0.75rem;
	}
	&--sm &__field {
		padding: 0.375rem 0.625rem;
		font-size: 0.8125rem;
	}
	&--md &__field {
		padding: 0.5rem 0.75rem;
		font-size: 0.9375rem;
	}
	&--lg &__field {
		padding: 0.625rem 0.875rem;
		font-size: 1rem;
	}
	&--xl &__field {
		padding: 0.75rem 1rem;
		font-size: 1.125rem;
	}

	&__affix {
		display: inline-flex;
		align-items: center;
		column-gap: 0.25rem;
		color: var(--ep-color-disabled, currentColor);
		padding-inline: 0.5rem;
		flex-shrink: 0;

		&--prefix {
			padding-right: 0;
		}
		&--suffix {
			padding-left: 0;
		}
	}

	&__icon-btn {
		all: unset;
		display: inline-flex;
		align-items: center;
		cursor: pointer;
		color: var(--ep-color-disabled, currentColor);
		padding: 0.125rem;
		border-radius: 4px;
		font-size: 1em;

		&:hover {
			color: var(--ep-color-text, currentColor);
		}
		&:focus-visible {
			outline: var(--ep-outline-focus, 2px solid currentColor);
			outline-offset: 1px;
		}
	}

	&__footer {
		display: flex;
		flex-direction: row;
		column-gap: 1rem;
		align-items: center;
		font-size: 0.75rem;
	}

	&__assistive,
	&__count {
		color: var(--ep-color-disabled, currentColor);
	}

	&__count {
		margin-left: auto;
	}

	&__alert {
		&--error {
			color: var(--ep-color-error);
		}
		&--warning {
			color: var(--ep-color-warning);
		}
		&--success {
			color: var(--ep-color-success);
		}
	}
}
</style>

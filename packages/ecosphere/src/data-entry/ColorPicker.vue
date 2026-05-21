<template>
	<div
		class="ep-color-picker"
		:class="[
			`ep-color-picker--${size}`,
			state !== 'default' && `ep-color-picker--${state}`,
			{
				'ep-color-picker--disabled': disabled,
				'ep-color-picker--open': isOpen,
			},
		]"
	>
		<label
			v-if="label"
			:id="labelId"
			class="ep-color-picker__label"
			:class="state !== 'default' && `ep-color-picker__label--${state}`"
		>{{ label }}</label>
		<div ref="rootRef" class="ep-color-picker__wrapper">
			<button
				:id="triggerId"
				ref="triggerRef"
				type="button"
				class="ep-color-picker__trigger"
				:disabled="disabled"
				:aria-haspopup="'dialog'"
				:aria-expanded="isOpen ? 'true' : 'false'"
				:aria-labelledby="label ? labelId : undefined"
				:aria-describedby="describedById"
				@click="toggle"
				@keydown="onTriggerKeydown"
			>
				<slot name="trigger" :value="displayValue" :open="isOpen">
					<span
						class="ep-color-picker__swatch"
						:style="{ backgroundColor: displayValue || 'transparent' }"
						aria-hidden
					>
						<span
							v-if="!displayValue"
							class="ep-color-picker__swatch-empty"
						></span>
					</span>
					<span class="ep-color-picker__text">{{ formattedDisplay }}</span>
				</slot>
			</button>

			<Transition name="ep-color-picker-pop">
				<div
					v-if="isOpen"
					ref="popoverRef"
					class="ep-color-picker__popover"
					role="dialog"
					aria-modal="false"
					:aria-label="label || 'Color picker'"
					@mousedown.stop
				>
					<div
						ref="paletteRef"
						class="ep-color-picker__palette"
						:style="{
							backgroundColor: `hsl(${hue}, 100%, 50%)`,
						}"
						@pointerdown="onPaletteDown"
					>
						<div class="ep-color-picker__palette-saturation"></div>
						<div class="ep-color-picker__palette-value"></div>
						<div
							class="ep-color-picker__palette-cursor"
							:style="{
								left: `${saturation * 100}%`,
								top: `${(1 - value) * 100}%`,
							}"
						></div>
					</div>

					<div class="ep-color-picker__sliders">
						<div class="ep-color-picker__preview-wrap">
							<div
								class="ep-color-picker__preview"
								:style="{
									backgroundColor: previewSolid,
								}"
							></div>
						</div>
						<div class="ep-color-picker__slider-stack">
							<input
								type="range"
								min="0"
								max="360"
								step="1"
								class="ep-color-picker__hue"
								:value="hue"
								aria-label="Hue"
								@input="onHueInput(($event.target as HTMLInputElement).valueAsNumber)"
							/>
							<input
								v-if="alpha"
								type="range"
								min="0"
								max="100"
								step="1"
								class="ep-color-picker__alpha"
								:value="Math.round(alphaValue * 100)"
								:style="{
									'--ep-color-picker-alpha-bg':
										`linear-gradient(to right, transparent, ${previewSolid})`,
								}"
								aria-label="Alpha"
								@input="onAlphaInput(($event.target as HTMLInputElement).valueAsNumber / 100)"
							/>
						</div>
					</div>

					<div v-if="formatOptions.length > 1" class="ep-color-picker__formats">
						<button
							v-for="f in formatOptions"
							:key="f"
							type="button"
							class="ep-color-picker__format-btn"
							:class="{ 'ep-color-picker__format-btn--active': format === f }"
							:aria-pressed="format === f ? 'true' : 'false'"
							@click="format = f"
						>{{ f.toUpperCase() }}</button>
					</div>

					<div class="ep-color-picker__input-row">
						<input
							v-model="textInput"
							type="text"
							class="ep-color-picker__input"
							:aria-label="`Color ${format}`"
							@change="onTextCommit"
							@keydown.enter="onTextCommit"
						/>
					</div>

					<div v-if="presets && presets.length" class="ep-color-picker__presets">
						<button
							v-for="p in presets"
							:key="p"
							type="button"
							class="ep-color-picker__preset"
							:style="{ backgroundColor: p }"
							:aria-label="`Use ${p}`"
							@click="selectPreset(p)"
						></button>
					</div>

					<div class="ep-color-picker__actions">
						<button
							v-if="allowClear"
							type="button"
							class="ep-color-picker__action ep-color-picker__action--ghost"
							@click="clear"
						>{{ clearLabel }}</button>
						<button
							type="button"
							class="ep-color-picker__action"
							@click="close"
						>{{ doneLabel }}</button>
					</div>
				</div>
			</Transition>
		</div>
		<div
			v-if="alertMessage && state !== 'default'"
			:id="describedById"
			class="ep-color-picker__alert"
			:class="`ep-color-picker__alert--${state}`"
			role="alert"
		>{{ alertMessage }}</div>
		<div
			v-else-if="assistiveText"
			:id="describedById"
			class="ep-color-picker__assistive"
		>{{ assistiveText }}</div>
	</div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useEpId } from "../composables/useEpId";
import { useEpSize } from "../composables/useEpSize";
import type { EpSize } from "../general/config";

export type ColorFormat = "hex" | "rgb" | "hsl";
export type DataEntryState = "default" | "error" | "warning" | "success";

export interface ColorPickerProps {
	value?: string | null;
	label?: string;
	disabled?: boolean;
	alpha?: boolean;
	presets?: string[];
	format?: ColorFormat;
	formatOptions?: ColorFormat[];
	allowClear?: boolean;
	state?: DataEntryState;
	size?: EpSize;
	assistiveText?: string;
	alertMessage?: string;
	clearLabel?: string;
	doneLabel?: string;
}

const props = withDefaults(defineProps<ColorPickerProps>(), {
	value: "#000000",
	label: "",
	disabled: false,
	alpha: false,
	presets: () => [],
	format: "hex",
	formatOptions: () => ["hex", "rgb", "hsl"],
	allowClear: false,
	state: "default",
	size: undefined,
	assistiveText: "",
	alertMessage: "",
	clearLabel: "Clear",
	doneLabel: "Done",
});

const emit = defineEmits<{
	(e: "update:value", value: string | null): void;
	(e: "change", value: string | null): void;
	(e: "open"): void;
	(e: "close"): void;
	(e: "clear"): void;
}>();

const size = useEpSize(() => props.size);
const triggerId = useEpId("ep-color-trigger");
const labelId = useEpId("ep-color-label");
const describedById = useEpId("ep-color-desc");

const rootRef = ref<HTMLElement | null>(null);
const triggerRef = ref<HTMLButtonElement | null>(null);
const popoverRef = ref<HTMLElement | null>(null);
const paletteRef = ref<HTMLElement | null>(null);

const isOpen = ref(false);
const hue = ref(0); // 0-360
const saturation = ref(0); // 0-1
const value = ref(0); // 0-1
const alphaValue = ref(1); // 0-1
const format = ref<ColorFormat>(props.format);
const textInput = ref("");

const displayValue = computed(() => props.value || "");

const previewSolid = computed(() => hsvToHex(hue.value, saturation.value, value.value));
const currentColorString = computed(() =>
	formatColor(hue.value, saturation.value, value.value, alphaValue.value, format.value, props.alpha),
);

const formattedDisplay = computed(() => {
	if (!props.value) return "—";
	return props.value.toUpperCase();
});

// HSV ↔ HEX / RGB
function clamp01(x: number) { return Math.min(1, Math.max(0, x)); }

function hsvToRgb(h: number, s: number, v: number) {
	const c = v * s;
	const hp = (h % 360) / 60;
	const x = c * (1 - Math.abs((hp % 2) - 1));
	let r = 0, g = 0, b = 0;
	if (hp >= 0 && hp < 1) [r, g, b] = [c, x, 0];
	else if (hp < 2) [r, g, b] = [x, c, 0];
	else if (hp < 3) [r, g, b] = [0, c, x];
	else if (hp < 4) [r, g, b] = [0, x, c];
	else if (hp < 5) [r, g, b] = [x, 0, c];
	else [r, g, b] = [c, 0, x];
	const m = v - c;
	return {
		r: Math.round((r + m) * 255),
		g: Math.round((g + m) * 255),
		b: Math.round((b + m) * 255),
	};
}

function rgbToHsv(r: number, g: number, b: number) {
	r /= 255; g /= 255; b /= 255;
	const max = Math.max(r, g, b), min = Math.min(r, g, b);
	const d = max - min;
	let h = 0;
	if (d === 0) h = 0;
	else if (max === r) h = ((g - b) / d) % 6;
	else if (max === g) h = (b - r) / d + 2;
	else h = (r - g) / d + 4;
	h = Math.round(h * 60);
	if (h < 0) h += 360;
	const s = max === 0 ? 0 : d / max;
	return { h, s, v: max };
}

function hsvToHex(h: number, s: number, v: number) {
	const { r, g, b } = hsvToRgb(h, s, v);
	const toHex = (n: number) => n.toString(16).padStart(2, "0");
	return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function parseColor(input: string): { h: number; s: number; v: number; a: number } | null {
	if (!input) return null;
	const s = input.trim();
	// hex
	let m = /^#?([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.exec(s);
	if (m) {
		let hex = m[1];
		if (hex.length === 3 || hex.length === 4) {
			hex = hex.split("").map((c) => c + c).join("");
		}
		const r = parseInt(hex.slice(0, 2), 16);
		const g = parseInt(hex.slice(2, 4), 16);
		const b = parseInt(hex.slice(4, 6), 16);
		const a = hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1;
		const hsv = rgbToHsv(r, g, b);
		return { ...hsv, a };
	}
	// rgb / rgba
	m = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)$/i.exec(s);
	if (m) {
		const hsv = rgbToHsv(+m[1], +m[2], +m[3]);
		const a = m[4] === undefined ? 1 : Math.min(1, Math.max(0, +m[4]));
		return { ...hsv, a };
	}
	// hsl / hsla
	m = /^hsla?\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*([\d.]+)\s*)?\)$/i.exec(s);
	if (m) {
		const h = +m[1];
		const sl = +m[2] / 100;
		const l = +m[3] / 100;
		// hsl→hsv
		const v = l + sl * Math.min(l, 1 - l);
		const sv = v === 0 ? 0 : 2 * (1 - l / v);
		const a = m[4] === undefined ? 1 : Math.min(1, Math.max(0, +m[4]));
		return { h, s: sv, v, a };
	}
	return null;
}

function formatColor(h: number, s: number, v: number, a: number, fmt: ColorFormat, includeAlpha: boolean) {
	if (fmt === "hex") {
		const hex = hsvToHex(h, s, v);
		if (includeAlpha) {
			const ah = Math.round(a * 255).toString(16).padStart(2, "0");
			return `${hex}${ah}`;
		}
		return hex;
	}
	const { r, g, b } = hsvToRgb(h, s, v);
	if (fmt === "rgb") {
		return includeAlpha ? `rgba(${r}, ${g}, ${b}, ${+a.toFixed(2)})` : `rgb(${r}, ${g}, ${b})`;
	}
	// hsl
	const max = v, min = v * (1 - s);
	const l = (max + min) / 2;
	const sl = l === 0 || l === 1 ? 0 : (max - l) / Math.min(l, 1 - l);
	const H = Math.round(h);
	const S = Math.round(sl * 100);
	const L = Math.round(l * 100);
	return includeAlpha ? `hsla(${H}, ${S}%, ${L}%, ${+a.toFixed(2)})` : `hsl(${H}, ${S}%, ${L}%)`;
}

// Sync external value → internal HSV
function syncFromValue(v: string | null) {
	if (!v) {
		hue.value = 0;
		saturation.value = 0;
		value.value = 0;
		alphaValue.value = 1;
		textInput.value = "";
		return;
	}
	const parsed = parseColor(v);
	if (parsed) {
		// preserve hue when saturation is 0 (color picker UX)
		if (parsed.s > 0) hue.value = parsed.h;
		saturation.value = parsed.s;
		value.value = parsed.v;
		alphaValue.value = parsed.a;
	}
	textInput.value = v;
}

watch(() => props.value, syncFromValue, { immediate: true });
watch(format, () => {
	textInput.value = currentColorString.value;
});

function commit() {
	const next = currentColorString.value;
	textInput.value = next;
	emit("update:value", next);
	emit("change", next);
}

function onHueInput(h: number) {
	hue.value = h;
	commit();
}
function onAlphaInput(a: number) {
	alphaValue.value = clamp01(a);
	commit();
}

// Palette drag
let dragging = false;
function updateFromPointer(ev: PointerEvent) {
	const el = paletteRef.value;
	if (!el) return;
	const rect = el.getBoundingClientRect();
	const x = clamp01((ev.clientX - rect.left) / rect.width);
	const y = clamp01((ev.clientY - rect.top) / rect.height);
	saturation.value = x;
	value.value = 1 - y;
	commit();
}
function onPaletteDown(ev: PointerEvent) {
	dragging = true;
	(ev.target as HTMLElement).setPointerCapture?.(ev.pointerId);
	updateFromPointer(ev);
	window.addEventListener("pointermove", onPaletteMove);
	window.addEventListener("pointerup", onPaletteUp);
}
function onPaletteMove(ev: PointerEvent) {
	if (dragging) updateFromPointer(ev);
}
function onPaletteUp() {
	dragging = false;
	window.removeEventListener("pointermove", onPaletteMove);
	window.removeEventListener("pointerup", onPaletteUp);
}

function onTextCommit() {
	const parsed = parseColor(textInput.value);
	if (!parsed) {
		textInput.value = currentColorString.value;
		return;
	}
	if (parsed.s > 0) hue.value = parsed.h;
	saturation.value = parsed.s;
	value.value = parsed.v;
	alphaValue.value = parsed.a;
	commit();
}

function selectPreset(color: string) {
	const parsed = parseColor(color);
	if (!parsed) return;
	if (parsed.s > 0) hue.value = parsed.h;
	saturation.value = parsed.s;
	value.value = parsed.v;
	alphaValue.value = parsed.a;
	commit();
}

function clear() {
	emit("update:value", null);
	emit("change", null);
	emit("clear");
}

function open() {
	if (props.disabled || isOpen.value) return;
	isOpen.value = true;
	emit("open");
}
function close() {
	if (!isOpen.value) return;
	isOpen.value = false;
	emit("close");
}
function toggle() {
	if (isOpen.value) close();
	else open();
}

function onTriggerKeydown(e: KeyboardEvent) {
	if (e.key === "Enter" || e.key === " ") {
		e.preventDefault();
		toggle();
	} else if (e.key === "Escape" && isOpen.value) {
		close();
	}
}

function onDocClick(e: MouseEvent) {
	if (!isOpen.value) return;
	const target = e.target as Node;
	if (rootRef.value && !rootRef.value.contains(target)) close();
}

onMounted(() => document.addEventListener("mousedown", onDocClick));
onBeforeUnmount(() => {
	document.removeEventListener("mousedown", onDocClick);
	window.removeEventListener("pointermove", onPaletteMove);
	window.removeEventListener("pointerup", onPaletteUp);
});

function focus() { triggerRef.value?.focus(); }
function blur() { triggerRef.value?.blur(); }
defineExpose({ focus, blur, open, close });
</script>

<style>
.ep-color-picker {
	display: flex;
	flex-direction: column;
	row-gap: 0.25rem;
	font-family: var(--ep-font-family-base, inherit);
	color: var(--ep-color-text, currentColor);

	&__label {
		font-size: 0.875rem;
		font-weight: 500;

		&--error { color: var(--ep-color-error); }
		&--warning { color: var(--ep-color-warning); }
		&--success { color: var(--ep-color-success); }
	}

	&__wrapper {
		position: relative;
	}

	&__trigger {
		all: unset;
		display: inline-flex;
		align-items: center;
		column-gap: 0.5rem;
		padding: 0.25rem 0.5rem;
		border: 1px solid var(--ep-color-border, currentColor);
		border-radius: var(--ep-radius-md, 6px);
		cursor: pointer;
		background: var(--ep-color-surface, transparent);

		&:focus-visible {
			outline: var(--ep-outline-focus, 2px solid var(--ep-color-primary));
			outline-offset: 1px;
		}

		&:disabled {
			cursor: not-allowed;
			opacity: 0.6;
		}
	}

	&--xs &__trigger { font-size: 0.75rem; padding: 0.125rem 0.375rem; }
	&--sm &__trigger { font-size: 0.8125rem; padding: 0.1875rem 0.4375rem; }
	&--md &__trigger { font-size: 0.9375rem; padding: 0.25rem 0.5rem; }
	&--lg &__trigger { font-size: 1rem; padding: 0.375rem 0.625rem; }
	&--xl &__trigger { font-size: 1.125rem; padding: 0.5rem 0.75rem; }

	&__swatch {
		display: inline-block;
		width: 1.25em;
		height: 1.25em;
		border-radius: 4px;
		border: 1px solid var(--ep-color-border, rgba(0, 0, 0, 0.15));
		position: relative;
		overflow: hidden;
		background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
			linear-gradient(-45deg, #ccc 25%, transparent 25%),
			linear-gradient(45deg, transparent 75%, #ccc 75%),
			linear-gradient(-45deg, transparent 75%, #ccc 75%);
		background-size: 8px 8px;
		background-position: 0 0, 0 4px, 4px -4px, -4px 0;
	}

	&__swatch-empty {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to top right,
			transparent calc(50% - 1px),
			var(--ep-color-error, red) calc(50% - 1px),
			var(--ep-color-error, red) calc(50% + 1px),
			transparent calc(50% + 1px)
		);
	}

	&__text {
		font-variant-numeric: tabular-nums;
	}

	&__popover {
		position: absolute;
		top: calc(100% + 4px);
		left: 0;
		z-index: 50;
		width: 220px;
		padding: 0.625rem;
		background: var(--ep-color-surface, #fff);
		border: 1px solid var(--ep-color-border, #ddd);
		border-radius: var(--ep-radius-md, 6px);
		box-shadow: var(--ep-shadow-md, 0 8px 24px rgba(0, 0, 0, 0.12));
		display: flex;
		flex-direction: column;
		row-gap: 0.5rem;
	}

	&__palette {
		position: relative;
		width: 100%;
		height: 140px;
		border-radius: 4px;
		overflow: hidden;
		cursor: crosshair;
		touch-action: none;
	}

	&__palette-saturation {
		position: absolute;
		inset: 0;
		background: linear-gradient(to right, #fff, transparent);
	}
	&__palette-value {
		position: absolute;
		inset: 0;
		background: linear-gradient(to top, #000, transparent);
	}
	&__palette-cursor {
		position: absolute;
		width: 12px;
		height: 12px;
		margin: -6px 0 0 -6px;
		border-radius: 50%;
		border: 2px solid #fff;
		box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.4);
		pointer-events: none;
	}

	&__sliders {
		display: flex;
		align-items: center;
		column-gap: 0.5rem;
	}
	&__preview-wrap {
		width: 28px;
		height: 28px;
		flex-shrink: 0;
		border-radius: 50%;
		overflow: hidden;
		border: 1px solid var(--ep-color-border, rgba(0,0,0,0.1));
	}
	&__preview {
		width: 100%;
		height: 100%;
	}

	&__slider-stack {
		flex: 1;
		display: flex;
		flex-direction: column;
		row-gap: 0.375rem;
	}

	&__hue,
	&__alpha {
		appearance: none;
		width: 100%;
		height: 10px;
		border-radius: 999px;
		margin: 0;
		background: linear-gradient(
			to right,
			#f00 0%,
			#ff0 17%,
			#0f0 33%,
			#0ff 50%,
			#00f 67%,
			#f0f 83%,
			#f00 100%
		);
	}

	&__alpha {
		background: var(--ep-color-picker-alpha-bg, linear-gradient(to right, transparent, #000));
	}

	&__hue::-webkit-slider-thumb,
	&__alpha::-webkit-slider-thumb {
		appearance: none;
		width: 14px;
		height: 14px;
		border-radius: 50%;
		background: #fff;
		border: 2px solid #fff;
		box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.4);
		cursor: pointer;
	}

	&__formats {
		display: flex;
		column-gap: 0.25rem;
	}

	&__format-btn {
		all: unset;
		flex: 1;
		padding: 0.25rem 0;
		text-align: center;
		font-size: 0.6875rem;
		border-radius: 4px;
		cursor: pointer;
		color: var(--ep-color-disabled, currentColor);

		&--active {
			color: var(--ep-color-text);
			background: var(--ep-color-surface-alt, rgba(0, 0, 0, 0.06));
		}
	}

	&__input-row {
		display: flex;
	}

	&__input {
		flex: 1;
		min-width: 0;
		padding: 0.25rem 0.5rem;
		border: 1px solid var(--ep-color-border, #ddd);
		border-radius: 4px;
		font: inherit;
		font-size: 0.8125rem;
	}

	&__presets {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
	}

	&__preset {
		all: unset;
		width: 18px;
		height: 18px;
		border-radius: 4px;
		border: 1px solid rgba(0, 0, 0, 0.15);
		cursor: pointer;

		&:focus-visible {
			outline: 2px solid var(--ep-color-primary);
			outline-offset: 1px;
		}
	}

	&__actions {
		display: flex;
		justify-content: flex-end;
		column-gap: 0.375rem;
	}

	&__action {
		all: unset;
		padding: 0.25rem 0.625rem;
		background: var(--ep-color-primary);
		color: var(--ep-color-on-primary, #fff);
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.8125rem;

		&--ghost {
			background: transparent;
			color: var(--ep-color-text);
			border: 1px solid var(--ep-color-border, #ddd);
		}

		&:focus-visible {
			outline: var(--ep-outline-focus, 2px solid var(--ep-color-primary));
			outline-offset: 1px;
		}
	}

	&__assistive {
		font-size: 0.75rem;
		color: var(--ep-color-disabled, currentColor);
	}

	&__alert {
		font-size: 0.75rem;
		&--error { color: var(--ep-color-error); }
		&--warning { color: var(--ep-color-warning); }
		&--success { color: var(--ep-color-success); }
	}
}

.ep-color-picker-pop-enter-active,
.ep-color-picker-pop-leave-active {
	transition: opacity 0.12s ease, transform 0.12s ease;
}
.ep-color-picker-pop-enter-from,
.ep-color-picker-pop-leave-to {
	opacity: 0;
	transform: translateY(-4px);
}
</style>

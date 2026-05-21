<template>
	<component :is="tag">
		<slot />
	</component>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, provide, ref, toRef, watch } from "vue";
import type { theme as Theme } from "../utilities/types.interface";
import { EpConfigKey, type EpLocale, type EpSize } from "./config";

export interface EpConfigProviderProps {
	/**
	 * Active color theme. `"auto"` follows `prefers-color-scheme` and reacts
	 * to OS-level changes at runtime.
	 */
	theme?: Theme;
	/** Default component size for descendants that support sizing. */
	size?: EpSize;
	/** BCP-47 locale tag. Defaults to `navigator.language` or `"en"`. */
	locale?: EpLocale;
	/** Root element tag. Defaults to a fragment-like `<div>`. */
	tag?: string;
}

const props = withDefaults(defineProps<EpConfigProviderProps>(), {
	theme: "auto",
	size: "md",
	locale: undefined,
	tag: "div",
});

const themeRef = toRef(props, "theme");
const sizeRef = toRef(props, "size");
const localeRef = ref<EpLocale>(
	props.locale ??
		(typeof navigator !== "undefined" ? navigator.language : "en")
);

watch(
	() => props.locale,
	(next) => {
		if (next) localeRef.value = next;
	}
);

provide(EpConfigKey, {
	theme: themeRef,
	size: sizeRef,
	locale: localeRef,
});

const tag = computed(() => props.tag);

// ---- Theme application + prefers-color-scheme listener ----
let mediaQuery: MediaQueryList | null = null;
let mediaListener: ((event: MediaQueryListEvent) => void) | null = null;

function teardown(): void {
	if (mediaQuery && mediaListener) {
		mediaQuery.removeEventListener("change", mediaListener);
	}
	mediaQuery = null;
	mediaListener = null;
}

function apply(next: Theme): void {
	if (typeof document === "undefined") return;
	teardown();
	const root = document.documentElement;
	root.setAttribute("data-theme", next);

	if (next === "auto" && typeof window !== "undefined" && window.matchMedia) {
		mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		document.body.classList.toggle("ecosphere-dark", mediaQuery.matches);
		mediaListener = (event) =>
			document.body.classList.toggle("ecosphere-dark", event.matches);
		mediaQuery.addEventListener("change", mediaListener);
	} else {
		document.body.classList.toggle("ecosphere-dark", next === "dark");
	}
}

watch(themeRef, (next) => apply(next), { immediate: true });
onBeforeUnmount(teardown);
</script>

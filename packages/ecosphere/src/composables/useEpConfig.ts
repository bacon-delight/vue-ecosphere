import { inject, ref, type Ref } from "vue";
import { EpConfigKey, type EpConfig, type EpSize } from "../general/config";
import type { theme } from "../utilities/types.interface";

/**
 * Read the nearest `<EpConfigProvider>` context, or fall back to defaults.
 * Always returns a stable EpConfig so callers can dereference `.value` safely.
 */
export function useEpConfig(): EpConfig {
	const ctx = inject(EpConfigKey, null);
	if (ctx) return ctx;
	return {
		theme: ref<theme>("auto") as Ref<theme>,
		size: ref<EpSize>("md"),
		locale: ref(
			typeof navigator !== "undefined" ? navigator.language : "en"
		),
	};
}

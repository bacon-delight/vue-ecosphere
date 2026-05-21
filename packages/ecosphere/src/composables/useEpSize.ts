import { computed, type ComputedRef, type MaybeRefOrGetter, toValue } from "vue";
import type { EpSize } from "../general/config";
import { useEpConfig } from "./useEpConfig";

/**
 * Resolve effective size: component prop wins, then the EpConfigProvider
 * context, then `"md"`.
 */
export function useEpSize(
	propSize?: MaybeRefOrGetter<EpSize | undefined>,
): ComputedRef<EpSize> {
	const config = useEpConfig();
	return computed<EpSize>(() => {
		const prop = toValue(propSize);
		if (prop) return prop;
		return config.size.value ?? "md";
	});
}

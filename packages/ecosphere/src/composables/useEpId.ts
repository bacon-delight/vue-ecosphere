import { useId as vueUseId } from "vue";

let counter = 0;

/**
 * Generate a stable, SSR-safe ID for ARIA wiring (`aria-labelledby`,
 * `aria-describedby`, `<label for>`, …). Prefers Vue 3.5+ built-in `useId()`,
 * falling back to a simple counter when invoked outside an active instance.
 */
export function useEpId(prefix = "ep"): string {
	try {
		const id = vueUseId();
		if (id) return `${prefix}-${id}`;
	} catch {
		/* no-op */
	}
	counter += 1;
	return `${prefix}-${counter}`;
}

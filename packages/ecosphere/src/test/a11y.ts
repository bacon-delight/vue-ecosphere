import axe, {
	type AxeResults,
	type RunOptions,
	type ElementContext,
} from "axe-core";
import { expect } from "vitest";

/**
 * Run axe-core against a DOM node and assert no violations.
 *
 * Usage:
 *   const wrapper = mount(Button, { props: { label: "Go" } });
 *   await expectNoA11yViolations(wrapper.element);
 */
export async function expectNoA11yViolations(
	context: ElementContext,
	options: RunOptions = {}
): Promise<AxeResults> {
	const results = await axe.run(context, {
		// Common defaults: run WCAG 2.1 AA + best-practice rules.
		runOnly: {
			type: "tag",
			values: [
				"wcag2a",
				"wcag2aa",
				"wcag21a",
				"wcag21aa",
				"best-practice",
			],
		},
		...options,
	});

	if (results.violations.length) {
		const formatted = results.violations
			.map(
				(v) =>
					`- [${v.id}] ${v.help} (${v.impact})\n  ${v.helpUrl}\n  nodes: ${v.nodes
						.map((n) => n.target.join(" "))
						.join(", ")}`
			)
			.join("\n");
		throw new Error(`axe-core a11y violations:\n${formatted}`);
	}

	expect(results.violations).toHaveLength(0);
	return results;
}

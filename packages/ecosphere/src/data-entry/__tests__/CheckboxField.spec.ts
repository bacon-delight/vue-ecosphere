import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import CheckboxField from "../CheckboxField.vue";
import { expectNoA11yViolations } from "../../test/a11y";

describe("EpCheckbox", () => {
	it("renders an accessible native checkbox", () => {
		const w = mount(CheckboxField, {
			props: { label: "Agree", value: false },
		});
		const input = w.find("input[type=checkbox]");
		expect(input.exists()).toBe(true);
		expect(input.attributes("aria-checked")).toBe("false");
	});

	it("emits update:value and change on toggle", async () => {
		const w = mount(CheckboxField, { props: { label: "x", value: false } });
		await w.find("input").trigger("change");
		expect(w.emitted("update:value")?.[0]).toEqual([true]);
		expect(w.emitted("change")?.[0]?.[0]).toBe(true);
	});

	it("reflects controlled value", () => {
		const w = mount(CheckboxField, { props: { label: "x", value: true } });
		expect(w.classes()).toContain("ep-checkbox--checked");
		expect(w.find("input").attributes("aria-checked")).toBe("true");
	});

	it("supports indeterminate state", () => {
		const w = mount(CheckboxField, {
			props: { label: "x", value: false, indeterminate: true },
		});
		expect(w.classes()).toContain("ep-checkbox--indeterminate");
		expect(w.find("input").attributes("aria-checked")).toBe("mixed");
		expect(
			(w.find("input").element as HTMLInputElement).indeterminate
		).toBe(true);
	});

	it("does not toggle when disabled", async () => {
		const w = mount(CheckboxField, {
			props: { label: "x", value: false, disabled: true },
		});
		await w.find("input").trigger("change");
		expect(w.emitted("update:value")).toBeUndefined();
	});

	it("works in array (multi-select) mode", async () => {
		const w = mount(CheckboxField, {
			props: { label: "A", value: ["b"], nativeValue: "a" },
		});
		expect(w.classes()).not.toContain("ep-checkbox--checked");
		await w.find("input").trigger("change");
		expect(w.emitted("update:value")?.[0]).toEqual([["b", "a"]]);
	});

	it("removes from array when unchecked", async () => {
		const w = mount(CheckboxField, {
			props: { label: "A", value: ["a", "b"], nativeValue: "a" },
		});
		expect(w.classes()).toContain("ep-checkbox--checked");
		await w.find("input").trigger("change");
		expect(w.emitted("update:value")?.[0]).toEqual([["b"]]);
	});

	it("applies size class", () => {
		const w = mount(CheckboxField, {
			props: { label: "x", value: false, size: "xl" },
		});
		expect(w.classes()).toContain("ep-checkbox--xl");
	});

	it("has no axe violations", async () => {
		const w = mount(CheckboxField, {
			props: { label: "Agree to terms", value: false },
			attachTo: document.body,
		});
		await expectNoA11yViolations(w.element as HTMLElement);
		w.unmount();
	});
});

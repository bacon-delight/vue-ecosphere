import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import RadioField from "../RadioField.vue";
import { expectNoA11yViolations } from "../../test/a11y";

describe("EpRadio", () => {
	it("renders accessible native radio input", () => {
		const w = mount(RadioField, {
			props: { label: "A", nativeValue: "a", value: null },
		});
		const input = w.find("input[type=radio]");
		expect(input.exists()).toBe(true);
		expect(input.attributes("aria-checked")).toBe("false");
	});

	it("is checked when value matches nativeValue", () => {
		const w = mount(RadioField, {
			props: { label: "A", nativeValue: "a", value: "a" },
		});
		expect(w.classes()).toContain("ep-radio--checked");
		expect(w.find("input").attributes("aria-checked")).toBe("true");
	});

	it("emits update:value with nativeValue on change", async () => {
		const w = mount(RadioField, {
			props: { label: "A", nativeValue: "a", value: null },
		});
		await w.find("input").trigger("change");
		expect(w.emitted("update:value")?.[0]).toEqual(["a"]);
		expect(w.emitted("change")?.[0]?.[0]).toBe("a");
	});

	it("does not emit when disabled", async () => {
		const w = mount(RadioField, {
			props: { label: "A", nativeValue: "a", value: null, disabled: true },
		});
		await w.find("input").trigger("change");
		expect(w.emitted("update:value")).toBeUndefined();
	});

	it("renders button option type", () => {
		const w = mount(RadioField, {
			props: { label: "Day", nativeValue: "d", value: "d", optionType: "button" },
		});
		expect(w.classes()).toContain("ep-radio--button");
		expect(w.find(".ep-radio__circle").exists()).toBe(false);
	});

	it("applies size class", () => {
		const w = mount(RadioField, {
			props: { label: "A", nativeValue: "a", value: null, size: "xl" },
		});
		expect(w.classes()).toContain("ep-radio--xl");
	});

	it("has no axe violations", async () => {
		const w = mount(RadioField, {
			props: { label: "Option A", nativeValue: "a", value: "a", name: "g1" },
			attachTo: document.body,
		});
		await expectNoA11yViolations(w.element as HTMLElement);
		w.unmount();
	});
});

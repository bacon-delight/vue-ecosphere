import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import InputNumberField from "../InputNumberField.vue";
import { expectNoA11yViolations } from "../../test/a11y";

describe("EpInputNumber", () => {
	it("renders spinbutton with aria-valuenow", () => {
		const w = mount(InputNumberField, { props: { label: "Qty", value: 5 } });
		const input = w.find("input");
		expect(input.attributes("role")).toBe("spinbutton");
		expect(input.attributes("aria-valuenow")).toBe("5");
	});

	it("increments via Up key", async () => {
		const w = mount(InputNumberField, { props: { label: "x", value: 3, step: 2 } });
		await w.find("input").trigger("keydown.up");
		expect(w.emitted("update:value")?.[0]).toEqual([5]);
	});

	it("decrements via Down key", async () => {
		const w = mount(InputNumberField, { props: { label: "x", value: 3, step: 1 } });
		await w.find("input").trigger("keydown.down");
		expect(w.emitted("update:value")?.[0]).toEqual([2]);
	});

	it("clamps to min", async () => {
		const w = mount(InputNumberField, { props: { label: "x", value: 0, min: 0, step: 5 } });
		await w.find("input").trigger("keydown.down");
		expect(w.emitted("update:value")?.[0]).toEqual([0]);
	});

	it("clamps to max", async () => {
		const w = mount(InputNumberField, { props: { label: "x", value: 10, max: 10, step: 5 } });
		await w.find("input").trigger("keydown.up");
		expect(w.emitted("update:value")?.[0]).toEqual([10]);
	});

	it("respects precision on increment", async () => {
		const w = mount(InputNumberField, {
			props: { label: "x", value: 1.0, step: 0.1, precision: 2 },
		});
		await w.find("input").trigger("keydown.up");
		expect(w.emitted("update:value")?.[0]).toEqual([1.1]);
	});

	it("renders controls when enabled", () => {
		const w = mount(InputNumberField, { props: { label: "x", value: 1 } });
		expect(w.findAll(".ep-input-number__btn").length).toBe(2);
	});

	it("hides controls when controls=false", () => {
		const w = mount(InputNumberField, { props: { label: "x", value: 1, controls: false } });
		expect(w.find(".ep-input-number__controls").exists()).toBe(false);
	});

	it("emits update:value=null on empty input", async () => {
		const w = mount(InputNumberField, { props: { label: "x", value: 5 } });
		const input = w.find("input");
		(input.element as HTMLInputElement).value = "";
		await input.trigger("input");
		expect(w.emitted("update:value")?.[0]).toEqual([null]);
	});

	it("has no axe violations", async () => {
		const w = mount(InputNumberField, {
			props: { label: "Quantity", value: 1, min: 0, max: 10 },
			attachTo: document.body,
		});
		await expectNoA11yViolations(w.element as HTMLElement);
		w.unmount();
	});
});

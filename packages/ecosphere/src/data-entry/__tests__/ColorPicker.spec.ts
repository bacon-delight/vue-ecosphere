import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ColorPicker from "../ColorPicker.vue";
import { expectNoA11yViolations } from "../../test/a11y";

describe("EpColorPicker", () => {
	it("renders trigger with current swatch and aria-haspopup", () => {
		const w = mount(ColorPicker, {
			props: { label: "Brand", value: "#ff0000" },
		});
		const trig = w.find(".ep-color-picker__trigger");
		expect(trig.attributes("aria-haspopup")).toBe("dialog");
		expect(trig.attributes("aria-expanded")).toBe("false");
		expect(
			w.find(".ep-color-picker__swatch").attributes("style")
		).toContain("background-color");
	});

	it("opens popover on trigger click", async () => {
		const w = mount(ColorPicker, {
			props: { label: "x", value: "#000000" },
			attachTo: document.body,
		});
		await w.find(".ep-color-picker__trigger").trigger("click");
		expect(w.find('[role="dialog"]').exists()).toBe(true);
		expect(
			w.find(".ep-color-picker__trigger").attributes("aria-expanded")
		).toBe("true");
		w.unmount();
	});

	it("hue slider updates value", async () => {
		const w = mount(ColorPicker, {
			props: { label: "x", value: "#ff0000" },
			attachTo: document.body,
		});
		await w.find(".ep-color-picker__trigger").trigger("click");
		const hue = w.find(".ep-color-picker__hue");
		(hue.element as HTMLInputElement).value = "180";
		await hue.trigger("input");
		const ev = w.emitted("update:value");
		expect(ev).toBeTruthy();
		expect(typeof ev![0][0]).toBe("string");
		expect((ev![0][0] as string).startsWith("#")).toBe(true);
		w.unmount();
	});

	it("preset click commits color", async () => {
		const w = mount(ColorPicker, {
			props: { label: "x", value: "#000000", presets: ["#ff0000"] },
			attachTo: document.body,
		});
		await w.find(".ep-color-picker__trigger").trigger("click");
		await w.find(".ep-color-picker__preset").trigger("click");
		const ev = w.emitted("update:value");
		expect(ev).toBeTruthy();
		expect((ev![0][0] as string).toLowerCase()).toBe("#ff0000");
		w.unmount();
	});

	it("clear emits null", async () => {
		const w = mount(ColorPicker, {
			props: { label: "x", value: "#ff0000", allowClear: true },
			attachTo: document.body,
		});
		await w.find(".ep-color-picker__trigger").trigger("click");
		await w.find(".ep-color-picker__action--ghost").trigger("click");
		expect(w.emitted("update:value")?.[0]).toEqual([null]);
		expect(w.emitted("clear")).toBeTruthy();
		w.unmount();
	});

	it("format toggle switches output format", async () => {
		const w = mount(ColorPicker, {
			props: { label: "x", value: "#ff0000" },
			attachTo: document.body,
		});
		await w.find(".ep-color-picker__trigger").trigger("click");
		const btns = w.findAll(".ep-color-picker__format-btn");
		// click "rgb"
		await btns[1].trigger("click");
		expect(btns[1].attributes("aria-pressed")).toBe("true");
		w.unmount();
	});

	it("has no axe violations", async () => {
		const w = mount(ColorPicker, {
			props: { label: "Brand color", value: "#3366ff" },
			attachTo: document.body,
		});
		await expectNoA11yViolations(w.element as HTMLElement);
		w.unmount();
	});
});

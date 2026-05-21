import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import SwitchComponent from "../SwitchComponent.vue";
import { expectNoA11yViolations } from "../../test/a11y";

describe("EpSwitch", () => {
	it("renders role=switch with aria-checked", () => {
		const w = mount(SwitchComponent, {
			props: { label: "Notify", value: false },
		});
		const track = w.find('[role="switch"]');
		expect(track.exists()).toBe(true);
		expect(track.attributes("aria-checked")).toBe("false");
	});

	it("emits update:value and change on click", async () => {
		const w = mount(SwitchComponent, {
			props: { label: "x", value: false },
		});
		await w.find('[role="switch"]').trigger("click");
		expect(w.emitted("update:value")).toEqual([[true]]);
		expect(w.emitted("change")).toEqual([[true]]);
	});

	it("toggles via Space key", async () => {
		const w = mount(SwitchComponent, {
			props: { label: "x", value: false },
		});
		await w.find('[role="switch"]').trigger("keydown.space");
		expect(w.emitted("update:value")?.[0]).toEqual([true]);
	});

	it("reflects controlled value (checked class)", () => {
		const w = mount(SwitchComponent, {
			props: { label: "x", value: true },
		});
		expect(w.classes()).toContain("ep-switch--checked");
		expect(w.find('[role="switch"]').attributes("aria-checked")).toBe("true");
	});

	it("does not toggle when disabled", async () => {
		const w = mount(SwitchComponent, {
			props: { label: "x", value: false, disabled: true },
		});
		await w.find('[role="switch"]').trigger("click");
		expect(w.emitted("update:value")).toBeUndefined();
		expect(w.classes()).toContain("ep-switch--disabled");
	});

	it("does not toggle when loading", async () => {
		const w = mount(SwitchComponent, {
			props: { label: "x", value: false, loading: true },
		});
		await w.find('[role="switch"]').trigger("click");
		expect(w.emitted("update:value")).toBeUndefined();
		expect(w.find(".ep-switch__spinner").exists()).toBe(true);
	});

	it("applies size class from prop", () => {
		const w = mount(SwitchComponent, {
			props: { label: "x", value: false, size: "xl" },
		});
		expect(w.classes()).toContain("ep-switch--xl");
	});

	it("renders checked/unchecked slot content", () => {
		const w = mount(SwitchComponent, {
			props: { label: "x", value: true },
			slots: { checked: "ON", unchecked: "OFF" },
		});
		expect(w.text()).toContain("ON");
		expect(w.text()).toContain("OFF");
	});

	it("has no axe violations", async () => {
		const w = mount(SwitchComponent, {
			props: { label: "Notify", value: false },
			attachTo: document.body,
		});
		await expectNoA11yViolations(w.element as HTMLElement);
		w.unmount();
	});
});

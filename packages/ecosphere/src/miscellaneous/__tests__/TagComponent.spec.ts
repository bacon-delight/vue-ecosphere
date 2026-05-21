import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TagComponent from "../TagComponent.vue";
import { expectNoA11yViolations } from "../../test/a11y";

describe("EpTag", () => {
	it("renders label", () => {
		const w = mount(TagComponent, { props: { label: "Hot" } });
		expect(w.text()).toContain("Hot");
	});

	it("default slot overrides label", () => {
		const w = mount(TagComponent, { slots: { default: "Slot" } });
		expect(w.text()).toContain("Slot");
	});

	it("applies hue, size, bordered classes", () => {
		const w = mount(TagComponent, {
			props: { label: "x", hue: "success", size: "lg", bordered: true },
		});
		expect(w.classes()).toContain("ep-tag--success");
		expect(w.classes()).toContain("ep-tag--lg");
		expect(w.classes()).toContain("ep-tag--bordered");
	});

	it("closable shows close button and emits close", async () => {
		const w = mount(TagComponent, {
			props: { label: "x", closable: true },
		});
		const close = w.find(".ep-tag__close");
		expect(close.exists()).toBe(true);
		expect(close.attributes("aria-label")).toBe("Remove");
		await close.trigger("click");
		expect(w.emitted("close")).toHaveLength(1);
	});

	it("close can be triggered by keyboard (Enter/Space)", async () => {
		const w = mount(TagComponent, {
			props: { label: "x", closable: true },
		});
		const close = w.find(".ep-tag__close");
		await close.trigger("keydown.enter");
		await close.trigger("keydown.space");
		expect(w.emitted("close")).toHaveLength(2);
	});

	it("disabled blocks close emit", async () => {
		const w = mount(TagComponent, {
			props: { label: "x", closable: true, disabled: true },
		});
		await w.find(".ep-tag__close").trigger("click");
		expect(w.emitted("close")).toBeUndefined();
		expect(w.attributes("aria-disabled")).toBe("true");
	});

	it("renders icon slot", () => {
		const w = mount(TagComponent, {
			props: { label: "x" },
			slots: { icon: '<i class="ic"></i>' },
		});
		expect(w.find(".ep-tag__icon .ic").exists()).toBe(true);
	});

	it("custom closeLabel propagates to aria-label", () => {
		const w = mount(TagComponent, {
			props: { label: "x", closable: true, closeLabel: "Dismiss tag" },
		});
		expect(w.find(".ep-tag__close").attributes("aria-label")).toBe(
			"Dismiss tag",
		);
	});

	it("has no axe violations", async () => {
		const w = mount(TagComponent, {
			props: { label: "Hot", closable: true },
			attachTo: document.body,
		});
		await expectNoA11yViolations(w.element as HTMLElement);
		w.unmount();
	});
});

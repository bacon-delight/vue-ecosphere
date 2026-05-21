import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import ButtonComponent from "../ButtonComponent.vue";
import { expectNoA11yViolations } from "../../test/a11y";

describe("EpButton", () => {
	it("renders a <button> with the provided label", () => {
		const w = mount(ButtonComponent, { props: { label: "Save" } });
		expect(w.element.tagName).toBe("BUTTON");
		expect(w.text()).toBe("Save");
		expect(w.attributes("type")).toBe("button");
	});

	it("emits click", async () => {
		const w = mount(ButtonComponent, { props: { label: "Go" } });
		await w.trigger("click");
		expect(w.emitted("click")).toHaveLength(1);
	});

	it("default slot overrides label", () => {
		const w = mount(ButtonComponent, {
			props: { label: "ignored" },
			slots: { default: "Slot text" },
		});
		expect(w.text()).toBe("Slot text");
	});

	it("applies hue, size and ghost classes", () => {
		const w = mount(ButtonComponent, {
			props: { label: "x", hue: "secondary", size: "lg", ghost: true },
		});
		expect(w.classes()).toContain("ep-button--secondary");
		expect(w.classes()).toContain("ep-button--lg");
		expect(w.classes()).toContain("ep-button--ghost");
	});

	it("danger forces error hue regardless of hue prop", () => {
		const w = mount(ButtonComponent, {
			props: { label: "Delete", hue: "primary", danger: true },
		});
		expect(w.classes()).toContain("ep-button--error");
		expect(w.classes()).not.toContain("ep-button--primary");
	});

	it("block applies full-width modifier", () => {
		const w = mount(ButtonComponent, {
			props: { label: "x", block: true },
		});
		expect(w.classes()).toContain("ep-button--block");
	});

	it("disabled blocks click and sets attributes", async () => {
		const w = mount(ButtonComponent, {
			props: { label: "x", disabled: true },
		});
		await w.trigger("click");
		expect(w.emitted("click")).toBeUndefined();
		expect(w.attributes("disabled")).toBeDefined();
		expect(w.attributes("aria-disabled")).toBe("true");
	});

	it("loading blocks click and exposes aria-busy", async () => {
		const w = mount(ButtonComponent, {
			props: { label: "x", loading: true },
		});
		await w.trigger("click");
		expect(w.emitted("click")).toBeUndefined();
		expect(w.attributes("aria-busy")).toBe("true");
		expect(w.find(".ep-button__spinner").exists()).toBe(true);
	});

	it("htmlType applies to <button>", () => {
		const w = mount(ButtonComponent, {
			props: { label: "Submit", htmlType: "submit" },
		});
		expect(w.attributes("type")).toBe("submit");
	});

	it("href renders an <a> tag", () => {
		const w = mount(ButtonComponent, {
			props: { label: "Docs", href: "/docs" },
		});
		expect(w.element.tagName).toBe("A");
		expect(w.attributes("href")).toBe("/docs");
		expect(w.attributes("type")).toBeUndefined();
	});

	it("href with target=_blank adds rel noopener", () => {
		const w = mount(ButtonComponent, {
			props: {
				label: "Out",
				href: "https://x.example",
				target: "_blank",
			},
		});
		expect(w.attributes("target")).toBe("_blank");
		expect(w.attributes("rel")).toBe("noopener noreferrer");
	});

	it("renders icon slot", () => {
		const w = mount(ButtonComponent, {
			props: { label: "x" },
			slots: { icon: '<i class="my-icon"></i>' },
		});
		expect(w.find(".ep-button__icon .my-icon").exists()).toBe(true);
	});

	it("icon-only when no label/default slot present", () => {
		const w = mount(ButtonComponent, {
			slots: { icon: '<i class="my-icon"></i>' },
		});
		expect(w.classes()).toContain("ep-button--icon-only");
	});

	it("falls back to size 'md'", () => {
		const w = mount(ButtonComponent, { props: { label: "x" } });
		expect(w.classes()).toContain("ep-button--md");
	});

	it("blocks click via stopImmediatePropagation when disabled", async () => {
		const handler = vi.fn();
		const w = mount(ButtonComponent, {
			props: { label: "x", disabled: true },
			attrs: { onClick: handler },
		});
		await w.trigger("click");
		expect(handler).not.toHaveBeenCalled();
	});

	it("has no axe violations (default)", async () => {
		const w = mount(ButtonComponent, {
			props: { label: "Submit" },
			attachTo: document.body,
		});
		await expectNoA11yViolations(w.element as HTMLElement);
		w.unmount();
	});

	it("has no axe violations (loading)", async () => {
		const w = mount(ButtonComponent, {
			props: { label: "Loading", loading: true },
			attachTo: document.body,
		});
		await expectNoA11yViolations(w.element as HTMLElement);
		w.unmount();
	});
});

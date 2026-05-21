import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import LinkComponent from "../LinkComponent.vue";
import { expectNoA11yViolations } from "../../test/a11y";

describe("EpLink", () => {
	it("renders an <a> with label and href", () => {
		const w = mount(LinkComponent, {
			props: { label: "Docs", href: "/docs" },
		});
		expect(w.element.tagName).toBe("A");
		expect(w.attributes("href")).toBe("/docs");
		expect(w.text()).toBe("Docs");
	});

	it("default slot overrides label", () => {
		const w = mount(LinkComponent, {
			slots: { default: "Inner" },
			props: { href: "#" },
		});
		expect(w.text()).toBe("Inner");
	});

	it("applies hue and size classes", () => {
		const w = mount(LinkComponent, {
			props: { label: "x", hue: "primary", size: "lg" },
		});
		expect(w.classes()).toContain("ep-link--primary");
		expect(w.classes()).toContain("ep-link--lg");
	});

	it("disabled blocks click and removes href", async () => {
		const w = mount(LinkComponent, {
			props: { label: "x", href: "/x", disabled: true },
		});
		expect(w.attributes("href")).toBeUndefined();
		expect(w.attributes("aria-disabled")).toBe("true");
		expect(w.attributes("tabindex")).toBe("-1");
		await w.trigger("click");
		expect(w.emitted("click")).toBeUndefined();
	});

	it("emits click when enabled", async () => {
		const w = mount(LinkComponent, { props: { label: "x", href: "/x" } });
		await w.trigger("click");
		expect(w.emitted("click")).toHaveLength(1);
	});

	it("target=_blank adds rel noopener", () => {
		const w = mount(LinkComponent, {
			props: { label: "x", href: "https://x", target: "_blank" },
		});
		expect(w.attributes("rel")).toBe("noopener noreferrer");
	});

	it("renders icon slot", () => {
		const w = mount(LinkComponent, {
			props: { label: "x", href: "#" },
			slots: { icon: '<i class="ic"></i>' },
		});
		expect(w.find(".ep-link__icon .ic").exists()).toBe(true);
	});

	it("has no axe violations", async () => {
		const w = mount(LinkComponent, {
			props: { label: "Docs", href: "/docs" },
			attachTo: document.body,
		});
		await expectNoA11yViolations(w.element as HTMLElement);
		w.unmount();
	});
});

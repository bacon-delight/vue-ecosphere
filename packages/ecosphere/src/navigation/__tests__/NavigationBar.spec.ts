import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import NavigationBar from "../NavigationBar.vue";
import { expectNoA11yViolations } from "../../test/a11y";

describe("EpNavbar", () => {
	it("renders header with banner role", () => {
		const w = mount(NavigationBar, {
			props: { branding: { label: "Ecosphere" } },
		});
		expect(w.find("[role='banner']").exists()).toBe(true);
		expect(w.find("nav").attributes("aria-label")).toBe("Primary");
	});

	it("renders branding label and logo", () => {
		const w = mount(NavigationBar, {
			props: {
				branding: { label: "Ecosphere", logo: "/logo.png" },
			},
		});
		expect(w.text()).toContain("Ecosphere");
		const img = w.find("img");
		expect(img.exists()).toBe(true);
		expect(img.attributes("alt")).toBe("Ecosphere");
	});

	it("brand is a button when action provided", async () => {
		let clicked = false;
		const w = mount(NavigationBar, {
			props: {
				branding: { label: "X", action: () => (clicked = true) },
			},
		});
		const btn = w.find(".ep-navbar__brand-inner");
		expect(btn.element.tagName).toBe("BUTTON");
		await btn.trigger("click");
		expect(clicked).toBe(true);
	});

	it("renders default and end slot content", () => {
		const w = mount(NavigationBar, {
			props: { branding: { label: "X" } },
			slots: {
				default: "<span class='center'>Center</span>",
				end: "<button class='cta'>Sign in</button>",
			},
		});
		expect(w.find(".center").exists()).toBe(true);
		expect(w.find(".cta").exists()).toBe(true);
	});

	it("affix prop adds sticky modifier class", () => {
		const w = mount(NavigationBar, {
			props: { branding: { label: "X" }, affix: true },
		});
		expect(w.classes()).toContain("ep-navbar--affix");
	});

	it("has no axe violations", async () => {
		const w = mount(NavigationBar, {
			props: { branding: { label: "Ecosphere", logo: "/logo.png" } },
			attachTo: document.body,
		});
		await expectNoA11yViolations(w.element as HTMLElement);
		w.unmount();
	});
});

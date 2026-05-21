import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import SidebarNavigation from "../SidebarNavigation.vue";
import type { MenuItemData } from "../MenuNavigation/MenuItem.vue";
import { expectNoA11yViolations } from "../../test/a11y";

const options: MenuItemData[] = [
	{ label: "Home", icon: "ri-home-line", active: true },
	{ label: "Dashboard", icon: "ri-dashboard-line" },
];

describe("EpSidebar", () => {
	it("renders aside with aria-label", () => {
		const w = mount(SidebarNavigation, { props: { options } });
		const aside = w.find("aside");
		expect(aside.exists()).toBe(true);
		expect(aside.attributes("aria-label")).toBe("Sidebar");
	});

	it("renders menu items", () => {
		const w = mount(SidebarNavigation, { props: { options } });
		expect(w.findAll(".ep-menu-item").length).toBe(options.length);
	});

	it("collapsible toggle button toggles aria-expanded + emits update:collapsed", async () => {
		const w = mount(SidebarNavigation, {
			props: { options, collapsible: true },
		});
		const btn = w.find(".ep-sidebar__toggle");
		expect(btn.exists()).toBe(true);
		expect(btn.attributes("aria-expanded")).toBe("true");
		await btn.trigger("click");
		expect(w.emitted("update:collapsed")?.[0]).toEqual([true]);
	});

	it("renders header and footer slots", () => {
		const w = mount(SidebarNavigation, {
			props: { options },
			slots: {
				header: "<div class='h'>H</div>",
				footer: "<div class='f'>F</div>",
			},
		});
		expect(w.find(".h").exists()).toBe(true);
		expect(w.find(".f").exists()).toBe(true);
	});

	it("collapsed class applied when collapsed prop is true", () => {
		const w = mount(SidebarNavigation, {
			props: { options, collapsed: true, collapsible: true },
		});
		expect(w.find("aside").classes()).toContain("ep-sidebar--collapsed");
	});

	it("has no axe violations", async () => {
		const w = mount(SidebarNavigation, {
			props: { options },
			attachTo: document.body,
		});
		await expectNoA11yViolations(w.element as HTMLElement);
		w.unmount();
	});
});

import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MenuNavigation, { type MenuItemData } from "../MenuNavigation.vue";
import { expectNoA11yViolations } from "../../test/a11y";

const options: MenuItemData[] = [
	{ label: "Home", icon: "ri-home-line", active: true },
	{
		label: "Products",
		icon: "ri-box-3-line",
		children: [{ label: "Plants" }, { label: "Seeds" }],
	},
	{ label: "Disabled", disabled: true },
];

describe("EpMenu", () => {
	it("renders ul with role=menu", () => {
		const w = mount(MenuNavigation, { props: { options } });
		expect(w.find("ul[role='menu']").exists()).toBe(true);
	});

	it("renders one item per option (incl. nested unmounted by default)", () => {
		const w = mount(MenuNavigation, { props: { options } });
		const items = w.findAll(".ep-menu-item");
		expect(items.length).toBeGreaterThanOrEqual(options.length);
	});

	it("active item gets aria-current=page", () => {
		const w = mount(MenuNavigation, { props: { options } });
		expect(w.find('[aria-current="page"]').exists()).toBe(true);
	});

	it("disabled item is aria-disabled", () => {
		const w = mount(MenuNavigation, { props: { options } });
		const disabled = w.find('[aria-disabled="true"]');
		expect(disabled.exists()).toBe(true);
	});

	it("clicking parent toggles children visibility", async () => {
		const w = mount(MenuNavigation, { props: { options } });
		const triggers = w.findAll(".ep-menu-item__trigger");
		const productsTrigger = triggers.find((t) =>
			t.text().includes("Products")
		)!;
		expect(productsTrigger.attributes("aria-expanded")).toBe("false");
		await productsTrigger.trigger("click");
		expect(productsTrigger.attributes("aria-expanded")).toBe("true");
	});

	it("calls action on activation", async () => {
		let called = false;
		const opts: MenuItemData[] = [
			{ label: "X", action: () => (called = true) },
		];
		const w = mount(MenuNavigation, { props: { options: opts } });
		await w.find(".ep-menu-item__trigger").trigger("click");
		expect(called).toBe(true);
	});

	it("has no axe violations", async () => {
		const w = mount(MenuNavigation, {
			props: { options },
			attachTo: document.body,
		});
		await expectNoA11yViolations(w.element as HTMLElement);
		w.unmount();
	});
});

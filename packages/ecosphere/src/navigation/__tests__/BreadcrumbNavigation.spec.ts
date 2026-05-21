import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import BreadcrumbNavigation, {
	type BreadcrumbItem,
} from "../BreadcrumbNavigation.vue";
import { expectNoA11yViolations } from "../../test/a11y";

const items: BreadcrumbItem[] = [
	{ label: "Home", href: "/" },
	{ label: "Library", href: "/library" },
	{ label: "Data", active: true },
];

describe("EpBreadcrumb", () => {
	it("renders nav with aria-label and ordered list", () => {
		const w = mount(BreadcrumbNavigation, { props: { items } });
		expect(w.find("nav").attributes("aria-label")).toBe("Breadcrumb");
		expect(w.find("ol").exists()).toBe(true);
	});

	it("marks active item with aria-current=page", () => {
		const w = mount(BreadcrumbNavigation, { props: { items } });
		const current = w.find('[aria-current="page"]');
		expect(current.exists()).toBe(true);
		expect(current.text()).toContain("Data");
	});

	it("renders separators between items", () => {
		const w = mount(BreadcrumbNavigation, { props: { items } });
		expect(w.findAll(".ep-breadcrumb__separator").length).toBe(
			items.length - 1
		);
	});

	it("filters hidden items", () => {
		const w = mount(BreadcrumbNavigation, {
			props: {
				items: [...items, { label: "Hidden", hidden: true }],
			},
		});
		expect(w.findAll(".ep-breadcrumb__item").length).toBe(items.length);
	});

	it("emits select on click of non-active item", async () => {
		const w = mount(BreadcrumbNavigation, { props: { items } });
		await w.find(".ep-breadcrumb__link").trigger("click");
		expect(w.emitted("select")).toBeTruthy();
	});

	it("disabled item is non-interactive", async () => {
		const w = mount(BreadcrumbNavigation, {
			props: {
				items: [
					{ label: "X", disabled: true },
					{ label: "Y", active: true },
				],
			},
		});
		const link = w.find(".ep-breadcrumb__item--disabled span");
		expect(link.exists()).toBe(true);
	});

	it("has no axe violations", async () => {
		const w = mount(BreadcrumbNavigation, {
			props: { items },
			attachTo: document.body,
		});
		await expectNoA11yViolations(w.element as HTMLElement);
		w.unmount();
	});
});

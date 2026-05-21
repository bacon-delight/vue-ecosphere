import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TabNavigation, { type TabOption } from "../TabNavigation.vue";
import { expectNoA11yViolations } from "../../test/a11y";

const options: TabOption[] = [
	{ label: "Home", value: "home" },
	{ label: "Dashboard", value: "dash" },
	{ label: "Disabled", value: "disabled", disabled: true },
	{ label: "Settings", value: "settings" },
];

describe("EpTabNavigation", () => {
	it("renders tablist + tab + tabpanel roles", () => {
		const w = mount(TabNavigation, { props: { options, value: "home" } });
		expect(w.find("[role='tablist']").exists()).toBe(true);
		expect(w.findAll("[role='tab']").length).toBe(options.length);
		expect(w.findAll("[role='tabpanel']").length).toBe(options.length);
	});

	it("marks selected tab with aria-selected=true", () => {
		const w = mount(TabNavigation, { props: { options, value: "dash" } });
		const tabs = w.findAll("[role='tab']");
		expect(tabs[0].attributes("aria-selected")).toBe("false");
		expect(tabs[1].attributes("aria-selected")).toBe("true");
	});

	it("emits update:value on click", async () => {
		const w = mount(TabNavigation, { props: { options, value: "home" } });
		await w.findAll("[role='tab']")[1].trigger("click");
		expect(w.emitted("update:value")?.[0]).toEqual(["dash"]);
		expect(w.emitted("change")?.[0]?.[0]).toBe("dash");
	});

	it("does not select disabled tab", async () => {
		const w = mount(TabNavigation, { props: { options, value: "home" } });
		await w.findAll("[role='tab']")[2].trigger("click");
		expect(w.emitted("update:value")).toBeFalsy();
	});

	it("arrow keys move selection, skipping disabled", async () => {
		const w = mount(TabNavigation, {
			props: { options, value: "dash" },
			attachTo: document.body,
		});
		const tabs = w.findAll("[role='tab']");
		await tabs[1].trigger("keydown", { key: "ArrowRight" });
		expect(w.emitted("update:value")?.[0]).toEqual(["settings"]);
		w.unmount();
	});

	it("emits close on closable tab close button", async () => {
		const w = mount(TabNavigation, {
			props: { options, value: "home", closable: true },
		});
		await w.find(".ep-tabs__close").trigger("click");
		expect(w.emitted("close")).toBeTruthy();
	});

	it("emits add on add button", async () => {
		const w = mount(TabNavigation, {
			props: { options, value: "home", addable: true },
		});
		await w.find(".ep-tabs__add").trigger("click");
		expect(w.emitted("add")).toBeTruthy();
	});

	it("has no axe violations", async () => {
		const w = mount(TabNavigation, {
			props: { options, value: "home" },
			attachTo: document.body,
		});
		await expectNoA11yViolations(w.element as HTMLElement);
		w.unmount();
	});
});

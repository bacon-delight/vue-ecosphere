import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import SelectField from "../SelectField.vue";
import { expectNoA11yViolations } from "../../test/a11y";

const opts = [
	{ label: "Apple", value: "apple" },
	{ label: "Banana", value: "banana" },
	{ label: "Cherry", value: "cherry", disabled: true },
];

describe("EpSelect", () => {
	it("renders combobox with aria attributes", () => {
		const w = mount(SelectField, { props: { label: "Fruit", options: opts, value: null } });
		const trig = w.find('[role="combobox"]');
		expect(trig.exists()).toBe(true);
		expect(trig.attributes("aria-expanded")).toBe("false");
		expect(trig.attributes("aria-haspopup")).toBe("listbox");
	});

	it("opens on click and renders options with listbox role", async () => {
		const w = mount(SelectField, {
			props: { label: "Fruit", options: opts, value: null },
			attachTo: document.body,
		});
		await w.find('[role="combobox"]').trigger("click");
		expect(w.find('[role="listbox"]').exists()).toBe(true);
		expect(w.findAll('[role="option"]').length).toBe(opts.length);
		w.unmount();
	});

	it("selects single value and closes", async () => {
		const w = mount(SelectField, {
			props: { label: "Fruit", options: opts, value: null },
			attachTo: document.body,
		});
		await w.find('[role="combobox"]').trigger("click");
		await w.findAll('[role="option"]')[1].trigger("click");
		expect(w.emitted("update:value")?.[0]).toEqual(["banana"]);
		expect(w.find('[role="listbox"]').exists()).toBe(false);
		w.unmount();
	});

	it("multiple toggles selection without closing", async () => {
		const w = mount(SelectField, {
			props: { label: "x", options: opts, value: [], multiple: true },
			attachTo: document.body,
		});
		await w.find('[role="combobox"]').trigger("click");
		const optionEls = w.findAll('[role="option"]');
		await optionEls[0].trigger("click");
		expect(w.emitted("update:value")?.[0]).toEqual([["apple"]]);
		await w.setProps({ value: ["apple"] });
		await optionEls[1].trigger("click");
		expect(w.emitted("update:value")?.[1]).toEqual([["apple", "banana"]]);
		expect(w.find('[role="listbox"]').exists()).toBe(true);
		w.unmount();
	});

	it("disabled options cannot be selected", async () => {
		const w = mount(SelectField, {
			props: { label: "x", options: opts, value: null },
			attachTo: document.body,
		});
		await w.find('[role="combobox"]').trigger("click");
		await w.findAll('[role="option"]')[2].trigger("click");
		expect(w.emitted("update:value")).toBeFalsy();
		w.unmount();
	});

	it("normalizes string-shorthand options", async () => {
		const w = mount(SelectField, {
			props: { label: "x", options: ["a", "b"], value: null },
			attachTo: document.body,
		});
		await w.find('[role="combobox"]').trigger("click");
		expect(w.findAll('[role="option"]').length).toBe(2);
		w.unmount();
	});

	it("filters via searchText when showSearch", async () => {
		const w = mount(SelectField, {
			props: { label: "x", options: opts, value: null, showSearch: true },
			attachTo: document.body,
		});
		await w.find('[role="combobox"]').trigger("click");
		const search = w.find(".ep-select__search");
		(search.element as HTMLInputElement).value = "ban";
		await search.trigger("input");
		expect(w.findAll('[role="option"]').length).toBe(1);
		w.unmount();
	});

	it("clears all on clear button", async () => {
		const w = mount(SelectField, {
			props: { label: "x", options: opts, value: "apple", allowClear: true },
		});
		await w.find(".ep-select__icon-btn").trigger("click");
		expect(w.emitted("update:value")?.[0]).toEqual([null]);
		expect(w.emitted("clear")).toBeTruthy();
	});

	it("creates a tag when tags=true and search has no match", async () => {
		const w = mount(SelectField, {
			props: { label: "x", options: opts, value: [], tags: true },
			attachTo: document.body,
		});
		await w.find('[role="combobox"]').trigger("click");
		const search = w.find(".ep-select__search");
		(search.element as HTMLInputElement).value = "newtag";
		await search.trigger("input");
		await w.find(".ep-select__option--create").trigger("click");
		expect(w.emitted("update:value")?.[0]).toEqual([["newtag"]]);
		w.unmount();
	});

	it("sets aria-invalid in error state", () => {
		const w = mount(SelectField, {
			props: { label: "x", options: opts, value: null, state: "error", alertMessage: "bad" },
		});
		expect(w.find('[role="combobox"]').attributes("aria-invalid")).toBe("true");
	});

	it("has no axe violations", async () => {
		const w = mount(SelectField, {
			props: { label: "Fruit", options: opts, value: "apple" },
			attachTo: document.body,
		});
		await expectNoA11yViolations(w.element as HTMLElement);
		w.unmount();
	});
});

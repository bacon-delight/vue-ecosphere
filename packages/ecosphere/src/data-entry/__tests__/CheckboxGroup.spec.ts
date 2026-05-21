import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import CheckboxGroup from "../CheckboxGroup.vue";
import { expectNoA11yViolations } from "../../test/a11y";

describe("EpCheckboxGroup", () => {
	it("renders role=group with aria-labelledby", () => {
		const w = mount(CheckboxGroup, {
			props: { label: "Pick", options: ["a", "b"], value: [] },
		});
		const group = w.find('[role="group"]');
		expect(group.exists()).toBe(true);
		const labelledBy = group.attributes("aria-labelledby");
		expect(labelledBy).toBeTruthy();
		expect(w.find(`#${labelledBy}`).text()).toBe("Pick");
	});

	it("renders option shorthand (string array)", () => {
		const w = mount(CheckboxGroup, {
			props: { options: ["apple", "banana"], value: [] },
		});
		expect(w.findAll("input[type=checkbox]").length).toBe(2);
		expect(w.text()).toContain("apple");
		expect(w.text()).toContain("banana");
	});

	it("renders option objects with labels", () => {
		const w = mount(CheckboxGroup, {
			props: {
				options: [
					{ label: "Apple", value: "a" },
					{ label: "Banana", value: "b" },
				],
				value: [],
			},
		});
		expect(w.text()).toContain("Apple");
		expect(w.text()).toContain("Banana");
	});

	it("emits update:value with new array on toggle", async () => {
		const w = mount(CheckboxGroup, {
			props: { options: ["a", "b"], value: [] },
		});
		await w.findAll("input")[0].trigger("change");
		expect(w.emitted("update:value")?.[0]).toEqual([["a"]]);
	});

	it("hides hidden options", () => {
		const w = mount(CheckboxGroup, {
			props: {
				options: [
					{ label: "A", value: "a" },
					{ label: "B", value: "b", hidden: true },
				],
				value: [],
			},
		});
		expect(w.findAll("input[type=checkbox]").length).toBe(1);
	});

	it("renders assistive text", () => {
		const w = mount(CheckboxGroup, {
			props: { options: ["a"], value: [], assistiveText: "Hint" },
		});
		expect(w.text()).toContain("Hint");
	});

	it("renders alert message in error state", () => {
		const w = mount(CheckboxGroup, {
			props: {
				options: ["a"],
				value: [],
				state: "error",
				alertMessage: "Required",
			},
		});
		expect(w.text()).toContain("Required");
	});

	it("has no axe violations", async () => {
		const w = mount(CheckboxGroup, {
			props: { label: "Pick", options: ["a", "b"], value: ["a"] },
			attachTo: document.body,
		});
		await expectNoA11yViolations(w.element as HTMLElement);
		w.unmount();
	});
});

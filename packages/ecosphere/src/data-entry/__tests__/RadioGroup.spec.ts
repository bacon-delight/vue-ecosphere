import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import RadioGroup from "../RadioGroup.vue";
import { expectNoA11yViolations } from "../../test/a11y";

describe("EpRadioGroup", () => {
	it("renders role=radiogroup with aria-labelledby", () => {
		const w = mount(RadioGroup, {
			props: { label: "Pick", options: ["a", "b"], value: null },
		});
		const group = w.find('[role="radiogroup"]');
		expect(group.exists()).toBe(true);
		const labelledBy = group.attributes("aria-labelledby");
		expect(labelledBy).toBeTruthy();
		expect(w.find(`#${labelledBy}`).text()).toBe("Pick");
	});

	it("shares a common name across radios", () => {
		const w = mount(RadioGroup, {
			props: { options: ["a", "b"], value: null },
		});
		const inputs = w.findAll("input[type=radio]");
		const names = inputs.map((i) => i.attributes("name"));
		expect(names[0]).toBe(names[1]);
		expect(names[0]).toBeTruthy();
	});

	it("uses provided name", () => {
		const w = mount(RadioGroup, {
			props: { options: ["a"], value: null, name: "my-group" },
		});
		expect(w.find("input[type=radio]").attributes("name")).toBe("my-group");
	});

	it("emits update:value on select", async () => {
		const w = mount(RadioGroup, {
			props: { options: ["a", "b"], value: null },
		});
		await w.findAll("input")[1].trigger("change");
		expect(w.emitted("update:value")?.[0]).toEqual(["b"]);
	});

	it("renders button option type with grouping class", () => {
		const w = mount(RadioGroup, {
			props: { options: ["a", "b"], value: "a", optionType: "button" },
		});
		expect(w.classes()).toContain("ep-radio-group--button");
		expect(w.find(".ep-radio-group__options--button").exists()).toBe(true);
	});

	it("renders alert message in error state", () => {
		const w = mount(RadioGroup, {
			props: {
				options: ["a"],
				value: null,
				state: "error",
				alertMessage: "Required",
			},
		});
		expect(w.text()).toContain("Required");
	});

	it("has no axe violations", async () => {
		const w = mount(RadioGroup, {
			props: { label: "Range", options: ["day", "week"], value: "day" },
			attachTo: document.body,
		});
		await expectNoA11yViolations(w.element as HTMLElement);
		w.unmount();
	});
});

import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ChoiceChips from "../ChoiceChips.vue";
import { expectNoA11yViolations } from "../../test/a11y";

const opts = [
	{ label: "Small", value: "sm" },
	{ label: "Medium", value: "md" },
	{ label: "Large", value: "lg", disabled: true },
];

describe("EpChoiceChips", () => {
	it("renders chips as buttons with aria-pressed", () => {
		const w = mount(ChoiceChips, {
			props: { label: "Size", options: opts, value: "md" },
		});
		const chips = w.findAll(".ep-choice-chips__chip");
		expect(chips.length).toBe(3);
		expect(chips[0].attributes("aria-pressed")).toBe("false");
		expect(chips[1].attributes("aria-pressed")).toBe("true");
	});

	it("selects single value on click", async () => {
		const w = mount(ChoiceChips, {
			props: { label: "x", options: opts, value: null },
		});
		await w.findAll(".ep-choice-chips__chip")[0].trigger("click");
		expect(w.emitted("update:value")?.[0]).toEqual(["sm"]);
	});

	it("toggles off single value when clicked again", async () => {
		const w = mount(ChoiceChips, {
			props: { label: "x", options: opts, value: "sm" },
		});
		await w.findAll(".ep-choice-chips__chip")[0].trigger("click");
		expect(w.emitted("update:value")?.[0]).toEqual([null]);
	});

	it("supports multiple selection", async () => {
		const w = mount(ChoiceChips, {
			props: { label: "x", options: opts, value: ["sm"], multiple: true },
		});
		await w.findAll(".ep-choice-chips__chip")[1].trigger("click");
		expect(w.emitted("update:value")?.[0]).toEqual([["sm", "md"]]);
	});

	it("does not toggle disabled chips", async () => {
		const w = mount(ChoiceChips, {
			props: { label: "x", options: opts, value: null },
		});
		await w.findAll(".ep-choice-chips__chip")[2].trigger("click");
		expect(w.emitted("update:value")).toBeFalsy();
	});

	it("normalizes string options", () => {
		const w = mount(ChoiceChips, {
			props: { label: "x", options: ["a", "b"], value: null },
		});
		expect(w.findAll(".ep-choice-chips__chip").length).toBe(2);
	});

	it("has no axe violations", async () => {
		const w = mount(ChoiceChips, {
			props: { label: "Size", options: opts, value: "md" },
			attachTo: document.body,
		});
		await expectNoA11yViolations(w.element as HTMLElement);
		w.unmount();
	});
});

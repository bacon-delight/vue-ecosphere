import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import StepperComponent, { type StepperStep } from "../StepperComponent.vue";
import { expectNoA11yViolations } from "../../test/a11y";

const steps: StepperStep[] = [
	{ label: "Install" },
	{ label: "Configure" },
	{ label: "Use" },
];

describe("EpStepper", () => {
	it("renders ordered list with aria-label", () => {
		const w = mount(StepperComponent, { props: { steps, value: 0 } });
		expect(w.find("ol").exists()).toBe(true);
		expect(w.find("ol").attributes("aria-label")).toBe("Progress");
	});

	it("renders one step per item", () => {
		const w = mount(StepperComponent, { props: { steps, value: 0 } });
		expect(w.findAll(".ep-stepper__step").length).toBe(steps.length);
	});

	it("marks current step with aria-current=step", () => {
		const w = mount(StepperComponent, { props: { steps, value: 1 } });
		const items = w.findAll(".ep-stepper__step");
		expect(items[0].attributes("aria-current")).toBeUndefined();
		expect(items[1].attributes("aria-current")).toBe("step");
		expect(items[2].attributes("aria-current")).toBeUndefined();
	});

	it("clickable mode emits update:value", async () => {
		const w = mount(StepperComponent, {
			props: { steps, value: 0, clickable: true },
		});
		await w.findAll(".ep-stepper__indicator")[1].trigger("click");
		expect(w.emitted("update:value")?.[0]).toEqual([1]);
		expect(w.emitted("change")?.[0]?.[0]).toBe(1);
	});

	it("non-clickable mode does not emit", async () => {
		const w = mount(StepperComponent, { props: { steps, value: 0 } });
		await w.findAll(".ep-stepper__indicator")[1].trigger("click");
		expect(w.emitted("update:value")).toBeFalsy();
	});

	it("error state shows error icon on current step", () => {
		const w = mount(StepperComponent, {
			props: { steps, value: 1, state: "error" },
		});
		const items = w.findAll(".ep-stepper__step");
		expect(items[1].classes()).toContain("ep-stepper__step--error");
	});

	it("progressDots applies dot modifier class", () => {
		const w = mount(StepperComponent, {
			props: { steps, value: 0, progressDots: true },
		});
		expect(w.find("ol").classes()).toContain("ep-stepper--progress-dots");
	});

	it("has no axe violations", async () => {
		const w = mount(StepperComponent, {
			props: { steps, value: 1 },
			attachTo: document.body,
		});
		await expectNoA11yViolations(w.element as HTMLElement);
		w.unmount();
	});
});

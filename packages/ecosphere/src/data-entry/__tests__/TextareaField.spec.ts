import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TextareaField from "../TextareaField.vue";
import { expectNoA11yViolations } from "../../test/a11y";

describe("EpTextarea", () => {
	it("renders textarea with label association", () => {
		const w = mount(TextareaField, {
			props: { label: "Notes", value: "" },
		});
		const ta = w.find("textarea");
		const label = w.find("label");
		expect(ta.exists()).toBe(true);
		expect(label.attributes("for")).toBe(ta.attributes("id"));
	});

	it("emits update:value on input", async () => {
		const w = mount(TextareaField, { props: { label: "x", value: "" } });
		const ta = w.find("textarea");
		(ta.element as HTMLTextAreaElement).value = "hello";
		await ta.trigger("input");
		expect(w.emitted("update:value")?.[0]).toEqual(["hello"]);
	});

	it("respects rows prop", () => {
		const w = mount(TextareaField, {
			props: { label: "x", value: "", rows: 6 },
		});
		expect(w.find("textarea").attributes("rows")).toBe("6");
	});

	it("respects autoSize.minRows", () => {
		const w = mount(TextareaField, {
			props: { label: "x", value: "", autoSize: { minRows: 4 } },
		});
		expect(w.find("textarea").attributes("rows")).toBe("4");
	});

	it("shows char count", () => {
		const w = mount(TextareaField, {
			props: {
				label: "x",
				value: "hello",
				showCount: true,
				maxLength: 20,
			},
		});
		expect(w.find(".ep-input__count").text()).toBe("5 / 20");
	});

	it("clears value", async () => {
		const w = mount(TextareaField, {
			props: { label: "x", value: "hi", allowClear: true },
		});
		await w.find(".ep-input__icon-btn").trigger("click");
		expect(w.emitted("update:value")?.[0]).toEqual([""]);
		expect(w.emitted("clear")).toBeTruthy();
	});

	it("sets aria-invalid in error state", () => {
		const w = mount(TextareaField, {
			props: {
				label: "x",
				value: "",
				state: "error",
				alertMessage: "bad",
			},
		});
		expect(w.find("textarea").attributes("aria-invalid")).toBe("true");
		expect(w.find(".ep-input__alert--error").text()).toBe("bad");
	});

	it("has no axe violations", async () => {
		const w = mount(TextareaField, {
			props: {
				label: "Notes",
				value: "Hello",
				assistiveText: "Describe",
			},
			attachTo: document.body,
		});
		await expectNoA11yViolations(w.element as HTMLElement);
		w.unmount();
	});
});

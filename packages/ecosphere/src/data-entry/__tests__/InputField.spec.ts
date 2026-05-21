import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import InputField from "../InputField.vue";
import { expectNoA11yViolations } from "../../test/a11y";

describe("EpInput", () => {
	it("renders label associated with input", () => {
		const w = mount(InputField, { props: { label: "Name", value: "" } });
		const input = w.find("input");
		const label = w.find("label");
		expect(label.attributes("for")).toBe(input.attributes("id"));
	});

	it("emits update:value on user input", async () => {
		const w = mount(InputField, { props: { label: "x", value: "" } });
		const input = w.find("input");
		(input.element as HTMLInputElement).value = "hello";
		await input.trigger("input");
		expect(w.emitted("update:value")?.[0]).toEqual(["hello"]);
	});

	it("renders prefix and suffix", () => {
		const w = mount(InputField, {
			props: { label: "x", value: "", prefix: "$", suffix: "USD" },
		});
		expect(w.find(".ep-input__affix--prefix").text()).toBe("$");
		expect(w.find(".ep-input__affix--suffix").text()).toBe("USD");
	});

	it("renders addonBefore and addonAfter", () => {
		const w = mount(InputField, {
			props: {
				label: "x",
				value: "",
				addonBefore: "https://",
				addonAfter: ".com",
			},
		});
		expect(w.find(".ep-input__addon--before").text()).toBe("https://");
		expect(w.find(".ep-input__addon--after").text()).toBe(".com");
	});

	it("clears value on clear button click", async () => {
		const w = mount(InputField, {
			props: { label: "x", value: "hi", allowClear: true },
		});
		const btn = w.find(".ep-input__icon-btn");
		expect(btn.exists()).toBe(true);
		await btn.trigger("click");
		expect(w.emitted("update:value")?.[0]).toEqual([""]);
		expect(w.emitted("clear")).toBeTruthy();
	});

	it("toggles password visibility", async () => {
		const w = mount(InputField, {
			props: { label: "x", value: "secret", type: "password" },
		});
		expect(w.find("input").attributes("type")).toBe("password");
		await w.find(".ep-input__icon-btn").trigger("click");
		expect(w.find("input").attributes("type")).toBe("text");
	});

	it("respects maxLength and shows count", () => {
		const w = mount(InputField, {
			props: { label: "x", value: "abc", maxLength: 10, showCount: true },
		});
		expect(w.find("input").attributes("maxlength")).toBe("10");
		expect(w.find(".ep-input__count").text()).toBe("3 / 10");
	});

	it("emits enter on Enter key", async () => {
		const w = mount(InputField, { props: { label: "x", value: "hi" } });
		await w.find("input").trigger("keydown.enter");
		expect(w.emitted("enter")).toBeTruthy();
	});

	it("sets aria-invalid in error state", () => {
		const w = mount(InputField, {
			props: {
				label: "x",
				value: "",
				state: "error",
				alertMessage: "bad",
			},
		});
		expect(w.find("input").attributes("aria-invalid")).toBe("true");
		expect(w.find(".ep-input__alert--error").text()).toBe("bad");
	});

	it("has no axe violations", async () => {
		const w = mount(InputField, {
			props: {
				label: "Name",
				value: "hi",
				assistiveText: "Enter your full name",
			},
			attachTo: document.body,
		});
		await expectNoA11yViolations(w.element as HTMLElement);
		w.unmount();
	});
});

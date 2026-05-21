import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import SVGIcon from "../SVGIcon.vue";

describe("EpIcon", () => {
	it("renders an <i> with the name as a class", () => {
		const w = mount(SVGIcon, { props: { name: "ri-close-line" } });
		expect(w.element.tagName).toBe("I");
		expect(w.classes()).toContain("ri-close-line");
	});

	it("is decorative by default (aria-hidden true)", () => {
		const w = mount(SVGIcon, { props: { name: "ri-close-line" } });
		expect(w.attributes("aria-hidden")).toBe("true");
	});

	it("becomes informative when aria-label set", () => {
		const w = mount(SVGIcon, {
			props: { name: "ri-close-line", ariaLabel: "Close" },
		});
		expect(w.attributes("aria-hidden")).toBeUndefined();
		expect(w.attributes("role")).toBe("img");
		expect(w.attributes("aria-label")).toBe("Close");
	});

	it("applies spin class", () => {
		const w = mount(SVGIcon, {
			props: { name: "ri-loader-line", spin: true },
		});
		expect(w.classes()).toContain("ep-icon--spin");
	});

	it("applies rotate class", () => {
		const w = mount(SVGIcon, {
			props: { name: "ri-arrow-up-line", rotate: 90 },
		});
		expect(w.classes()).toContain("ep-icon--rotate-90");
	});

	it("does not apply rotate-0", () => {
		const w = mount(SVGIcon, { props: { name: "ri-x", rotate: 0 } });
		expect(w.classes().some((c) => c.startsWith("ep-icon--rotate-"))).toBe(
			false
		);
	});
});

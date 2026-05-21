import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import AvatarComponent from "../AvatarComponent.vue";
import AvatarGroup from "../AvatarGroup.vue";
import { expectNoA11yViolations } from "../../test/a11y";

describe("EpAvatar", () => {
	it("derives initials from name (two-word)", () => {
		const w = mount(AvatarComponent, { props: { name: "Ada Lovelace" } });
		expect(w.text()).toBe("AL");
	});

	it("derives initials from a single-word name", () => {
		const w = mount(AvatarComponent, { props: { name: "Cleopatra" } });
		expect(w.text()).toBe("CL");
	});

	it("falls back to '?' when name is empty", () => {
		const w = mount(AvatarComponent, { props: { name: "" } });
		expect(w.text()).toBe("?");
	});

	it("renders image when src provided", () => {
		const w = mount(AvatarComponent, {
			props: { name: "x", image: "https://example.com/a.png" },
		});
		expect(w.find("img").exists()).toBe(true);
	});

	it("falls back to initials on image error", async () => {
		const w = mount(AvatarComponent, {
			props: { name: "Ada Lovelace", image: "broken" },
		});
		await w.find("img").trigger("error");
		expect(w.find("img").exists()).toBe(false);
		expect(w.text()).toBe("AL");
	});

	it("applies shape, size and hue classes", () => {
		const w = mount(AvatarComponent, {
			props: { name: "x", shape: "square", size: "lg", hue: "primary" },
		});
		expect(w.classes()).toContain("ep-avatar--square");
		expect(w.classes()).toContain("ep-avatar--lg");
		expect(w.classes()).toContain("ep-avatar--primary");
	});

	it("uses ariaLabel when provided", () => {
		const w = mount(AvatarComponent, {
			props: { name: "x", ariaLabel: "User Ada" },
		});
		expect(w.attributes("aria-label")).toBe("User Ada");
		expect(w.attributes("role")).toBe("img");
	});

	it("has no axe violations", async () => {
		const w = mount(AvatarComponent, {
			props: { name: "Ada Lovelace" },
			attachTo: document.body,
		});
		await expectNoA11yViolations(w.element as HTMLElement);
		w.unmount();
	});
});

describe("EpAvatarGroup", () => {
	it("renders default slot inside a group", () => {
		const w = mount(AvatarGroup, {
			slots: { default: '<span class="x"></span>' },
		});
		expect(w.attributes("role")).toBe("group");
		expect(w.find(".x").exists()).toBe(true);
	});

	it("renders overflow indicator when > 0", () => {
		const w = mount(AvatarGroup, { props: { overflow: 3 } });
		expect(w.find(".ep-avatar-group__overflow").text()).toBe("+3");
	});

	it("hides overflow when 0", () => {
		const w = mount(AvatarGroup, { props: { overflow: 0 } });
		expect(w.find(".ep-avatar-group__overflow").exists()).toBe(false);
	});
});

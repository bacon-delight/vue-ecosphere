import { describe, it, expect } from "vitest";
import { defineComponent, h } from "vue";
import { mount } from "@vue/test-utils";
import { useEpSize } from "../useEpSize";
import { useEpConfig } from "../useEpConfig";

describe("useEpSize", () => {
	it("falls back to 'md' when no prop or config", () => {
		const Probe = defineComponent({
			setup() {
				const size = useEpSize();
				return () => h("span", size.value);
			},
		});
		const w = mount(Probe);
		expect(w.text()).toBe("md");
	});

	it("honours explicit prop size over config default", () => {
		const Probe = defineComponent({
			setup() {
				const size = useEpSize(() => "lg");
				return () => h("span", size.value);
			},
		});
		const w = mount(Probe);
		expect(w.text()).toBe("lg");
	});

	it("reads default locale from navigator on bare useEpConfig", () => {
		const Probe = defineComponent({
			setup() {
				const cfg = useEpConfig();
				return () => h("span", String(cfg.size.value));
			},
		});
		const w = mount(Probe);
		expect(w.text()).toBe("md");
	});
});

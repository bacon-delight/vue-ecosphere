import introduction from "./pages/root/introduction/_translations";
import installation from "./pages/root/installation/_translations";
import configuration from "./pages/root/configuration/_translations";
import button from "./pages/call_to_actions/button/_translations";
import types from "./pages/root/types/_translations";

export default {
	title: "Ecosphere",
	pages: {
		landing: {
			title: "Ecosphere Design System",
			subtitle: "Simple • Modern • Delightgul",
			description:
				"A modern lightweight design system, built on the principles of minimalism with inspirations from Scandinavian architecture, handcrafted for data intensive applications",
		},
		introduction: introduction("en"),
		installation: installation("en"),
		configuration: configuration("en"),
		types: types("en"),
		call_to_actions: {
			button: button("en"),
		},
	},
	common: {
		example: "Example | Examples",
	},
};

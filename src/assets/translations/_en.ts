import introduction from "./pages/root/introduction/_translations";
import installation from "./pages/root/installation/_translations";
import configuration from "./pages/root/configuration/_translations";
import types from "./pages/root/types/_translations";

// Navigation
import menu from "./pages/navigation/menu/_translations";
import sidebar from "./pages/navigation/sidebar/_translations";
import navbar from "./pages/navigation/navbar/_translations";

// Call to Actions
import button from "./pages/call_to_actions/button/_translations";

// Data Entry
import input from "./pages/data_entry/input/_translations";

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
		navigation: {
			menu: menu("en"),
			sidebar: sidebar("en"),
			navbar: navbar("en"),
		},
		data_entry: {
			input: input("en"),
		},
	},
	common: {
		example: "Example | Examples",
	},
};

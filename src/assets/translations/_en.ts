import introduction from "./pages/root/introduction/_translations";
import installation from "./pages/root/installation/_translations";
import configuration from "./pages/root/configuration/_translations";
import types from "./pages/root/types/_translations";

// Design System
import typography from "./pages/design_system/typography/_translations";
import colors from "./pages/design_system/colors/_translations";

// Navigation
import menu from "./pages/navigation/menu/_translations";
import sidebar from "./pages/navigation/sidebar/_translations";
import navbar from "./pages/navigation/navbar/_translations";
import tabs from "./pages/navigation/tabs/_translations";
import breadcrumb from "./pages/navigation/breadcrumb/_translations";

// Call to Actions
import button from "./pages/call_to_actions/button/_translations";
import link from "./pages/call_to_actions/link/_translations";

// Data Entry
import input from "./pages/data_entry/input/_translations";
import textarea from "./pages/data_entry/textarea/_translations";
import radio from "./pages/data_entry/radio/_translations";
import radio_group from "./pages/data_entry/radio_group/_translations";
import checkbox from "./pages/data_entry/checkbox/_translations";
import checkbox_group from "./pages/data_entry/checkbox_group/_translations";
import dropdown from "./pages/data_entry/dropdown/_translations";
import color_picker from "./pages/data_entry/color_picker/_translations";
import switch_input from "./pages/data_entry/switch/_translations";
import search_dropdown from "./pages/data_entry/search_dropdown/_translations";
import choice_chips from "./pages/data_entry/choice_chips/_translations";

// Miscellaneous
import avatar from "./pages/miscellaneous/avatar/_translations";
import tag from "./pages/miscellaneous/tag/_translations";
import stepper from "./pages/miscellaneous/stepper/_translations";

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
		about: {
			team: {
				title: "Team Ecosphere",
			},
		},
		call_to_actions: {
			button: button("en"),
			link: link("en"),
		},
		navigation: {
			menu: menu("en"),
			sidebar: sidebar("en"),
			navbar: navbar("en"),
			tabs: tabs("en"),
			breadcrumb: breadcrumb("en"),
		},
		data_entry: {
			input: input("en"),
			textarea: textarea("en"),
			radio: radio("en"),
			radio_group: radio_group("en"),
			checkbox: checkbox("en"),
			checkbox_group: checkbox_group("en"),
			dropdown: dropdown("en"),
			color_picker: color_picker("en"),
			switch: switch_input("en"),
			search_dropdown: search_dropdown("en"),
			choice_chips: choice_chips("en"),
		},
		design_system: {
			typography: typography("en"),
			colors: colors("en"),
		},
		miscellaneous: {
			avatar: avatar("en"),
			tag: tag("en"),
			stepper: stepper("en"),
		},
	},
	common: {
		example: "Example | Examples",
	},
};

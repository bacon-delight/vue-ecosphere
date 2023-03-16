import type { menu_item } from "@/plugin/utilities/types.interface";
import router from "@/router/index";

function navigation_options(): menu_item[] {
	return [
		{
			label: "Introduction",
			icon: "ri-bookmark-line",
			active: router.currentRoute.value.path === "/introduction",
			action: () => {
				router.push("/introduction");
			},
		},
		{
			label: "Installation",
			icon: "ri-install-line",
			active: router.currentRoute.value.path === "/installation",
			action: () => {
				router.push("/installation");
			},
		},
		{
			label: "Configuration",
			icon: "ri-settings-line",
			active: router.currentRoute.value.path === "/configuration",
			action: () => {
				router.push("/configuration");
			},
		},
		{
			label: "Types",
			icon: "ri-code-s-slash-line",
			active: router.currentRoute.value.path === "/types",
			action: () => {
				router.push("/types");
			},
		},
		{
			label: "About Ecosphere",
			icon: "ri-building-2-line",
			expanded: false,
			children: [
				{
					label: "Team",
					active: router.currentRoute.value.path === "/team",
					action: () => {
						router.push("/team");
					},
				},
				// {
				// 	label: "Enterprise",
				// 	active: router.currentRoute.value.path === "/enterprise",
				// 	action: () => {
				// 		router.push("/enterprise");
				// 	},
				// },
				// {
				// 	label: "Support",
				// 	active: router.currentRoute.value.path === "/support",
				// 	action: () => {
				// 		router.push("/support");
				// 	},
				// },
				// {
				// 	label: "Sponsor",
				// 	active: router.currentRoute.value.path === "/sponsor",
				// 	action: () => {
				// 		router.push("/sponsor");
				// 	},
				// },
			],
		},
		{
			label: "Design System",
			icon: "ri-pencil-line",
			expanded: false,
			children: [
				// {
				// 	label: "Design",
				// 	active: router.currentRoute.value.path === "/design",
				// 	action: () => {
				// 		router.push("/design");
				// 	},
				// },
				{
					label: "Typography",
					active: router.currentRoute.value.path === "/typography",
					action: () => {
						router.push("/typography");
					},
				},
				{
					label: "Colors",
					active: router.currentRoute.value.path === "/colors",
					action: () => {
						router.push("/colors");
					},
				},
				// {
				// 	label: "Icons",
				// 	active: router.currentRoute.value.path === "/icons",
				// 	action: () => {
				// 		router.push("/icons");
				// 	},
				// },
			],
		},
		{
			label: "Navigation",
			icon: "ri-navigation-line",
			expanded: true,
			children: [
				{
					label: "Menu",
					active: router.currentRoute.value.path === "/menu",
					action: () => {
						router.push("/menu");
					},
				},
				{
					label: "Sidebar",
					active: router.currentRoute.value.path === "/sidebar",
					action: () => {
						router.push("/sidebar");
					},
				},
				{
					label: "Navbar",
					active: router.currentRoute.value.path === "/navbar",
					action: () => {
						router.push("/navbar");
					},
				},
				{
					label: "Tabs",
					active: router.currentRoute.value.path === "/tabs",
					action: () => {
						router.push("/tabs");
					},
				},
				{
					label: "Breadcrumb",
					active: router.currentRoute.value.path === "/breadcrumb",
					action: () => {
						router.push("/breadcrumb");
					},
				},
			],
		},
		{
			label: "Call to Actions",
			icon: "ri-mouse-line",
			expanded: true,
			children: [
				{
					label: "Button",
					active: router.currentRoute.value.path === "/button",
					action: () => {
						router.push("/button");
					},
				},
				{
					label: "Link",
					active: router.currentRoute.value.path === "/link",
					action: () => {
						router.push("/link");
					},
				},
			],
		},
		{
			label: "Data Entry",
			icon: "ri-keyboard-line",
			expanded: true,
			children: [
				{
					label: "Input",
					active: router.currentRoute.value.path === "/input",
					action: () => {
						router.push("/input");
					},
				},
				{
					label: "Textarea",
					active: router.currentRoute.value.path === "/textarea",
					action: () => {
						router.push("/textarea");
					},
				},
				{
					label: "Radio",
					active: router.currentRoute.value.path === "/radio",
					action: () => {
						router.push("/radio");
					},
				},
				{
					label: "Radio Group",
					active: router.currentRoute.value.path === "/radio-group",
					action: () => {
						router.push("/radio-group");
					},
				},
				{
					label: "Checkbox",
					active: router.currentRoute.value.path === "/checkbox",
					action: () => {
						router.push("/checkbox");
					},
				},
				{
					label: "Checkbox Group",
					active:
						router.currentRoute.value.path === "/checkbox-group",
					action: () => {
						router.push("/checkbox-group");
					},
				},
				{
					label: "Dropdown",
					active: router.currentRoute.value.path === "/dropdown",
					action: () => {
						router.push("/dropdown");
					},
				},
				{
					label: "Search Dropdown",
					active:
						router.currentRoute.value.path === "/search-dropdown",
					action: () => {
						router.push("/search-dropdown");
					},
				},
				{
					label: "Color Picker",
					active: router.currentRoute.value.path === "/color-picker",
					action: () => {
						router.push("/color-picker");
					},
				},
				{
					label: "Switch",
					active: router.currentRoute.value.path === "/switch",
					action: () => {
						router.push("/switch");
					},
				},

				// {
				// 	label: "Checkbox",
				// },
				// {
				// 	label: "Switch",
				// },
			],
		},
		{
			label: "Miscellaneous",
			icon: "ri-mouse-line",
			expanded: true,
			children: [
				{
					label: "Avatar",
					active: router.currentRoute.value.path === "/avatar",
					action: () => {
						router.push("/avatar");
					},
				},
				{
					label: "Tag",
					active: router.currentRoute.value.path === "/tag",
					action: () => {
						router.push("/tag");
					},
				},
			],
		},
	];
}

export default navigation_options;

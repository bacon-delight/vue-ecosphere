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
			label: "Design Language",
			icon: "ri-pencil-line",
			expanded: true,
			children: [
				{
					label: "Design",
					active: router.currentRoute.value.path === "/design",
					action: () => {
						router.push("/design");
					},
				},
				{
					label: "Typography",
					active: router.currentRoute.value.path === "/typography",
					action: () => {
						router.push("/typography");
					},
				},
				{
					label: "Icons",
					active: router.currentRoute.value.path === "/icons",
					action: () => {
						router.push("/icons");
					},
				},
			],
		},
		{
			label: "Navigation",
			icon: "ri-navigation-line",
			expanded: true,
			children: [
				{
					label: "Menu",
				},
				{
					label: "Sidebar",
				},
				{
					label: "Navbar",
				},
				{
					label: "Breadcrumb",
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
				},
				{
					label: "Link",
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
				},
				{
					label: "Textarea",
				},
				{
					label: "Dropdown",
				},
				{
					label: "Radio",
				},
				{
					label: "Checkbox",
				},
				{
					label: "Switch",
				},
			],
		},
	];
}

export default navigation_options;

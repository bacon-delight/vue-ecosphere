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
		// {
		// 	label: "Design Language",
		// 	icon: "ri-pencil-line",
		// 	expanded: true,
		// 	children: [
		// 		{
		// 			label: "Design",
		// 			active: router.currentRoute.value.path === "/design",
		// 			action: () => {
		// 				router.push("/design");
		// 			},
		// 		},
		// 		{
		// 			label: "Typography",
		// 			active: router.currentRoute.value.path === "/typography",
		// 			action: () => {
		// 				router.push("/typography");
		// 			},
		// 		},
		// 		{
		// 			label: "Icons",
		// 			active: router.currentRoute.value.path === "/icons",
		// 			action: () => {
		// 				router.push("/icons");
		// 			},
		// 		},
		// 	],
		// },
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
				// {
				// 	label: "Breadcrumb",
				// },
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
				// {
				// 	label: "Link",
				// },
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
				// {
				// 	label: "Dropdown",
				// },
				// {
				// 	label: "Radio",
				// },
				// {
				// 	label: "Checkbox",
				// },
				// {
				// 	label: "Switch",
				// },
			],
		},
	];
}

export default navigation_options;

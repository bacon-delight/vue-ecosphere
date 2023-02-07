import type { menu_item } from "@/plugin/utilities/types.interface";

const navigation_options: menu_item[] = [
	{
		label: "Introduction",
	},
	{
		label: "Installation",
		active: true,
	},
	{
		label: "Configuration",
	},
	{
		label: "Design",
		expanded: true,
		children: [
			{
				label: "Design",
			},
			{
				label: "Typography",
			},
			{
				label: "Icons",
			},
		],
	},
	{
		label: "Navigation",
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
	{
		label: "Configuration",
	},
	{
		label: "Data Entry",
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
	{
		label: "Data Entry",
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

export default navigation_options;

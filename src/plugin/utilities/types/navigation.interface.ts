export interface navbar_branding {
	label?: string;
	logo?: string;
	action?: () => void;
}

export type tab_navigation_option_icon_position = "before" | "after" | "above";
export const tab_navigation_option_icon_position_options: tab_navigation_option_icon_position[] =
	["before", "after", "above"];
export interface tab_navigation_option {
	label?: string;
	icon?: string;
	value: string | number | boolean;
	hidden?: boolean;
	disabled?: boolean;
	action?: () => void;
}

export interface menu_item {
	label: string;
	icon?: string;
	hidden?: boolean;
	active?: boolean;
	action?: () => void;
	children?: menu_item[];
	expanded?: boolean;
}

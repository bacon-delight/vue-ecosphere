export interface menu_item {
	label: string;
	icon?: string;
	hidden?: boolean;
	active?: boolean;
	action?: () => void;
	children?: menu_item[];
	expanded?: boolean;
}

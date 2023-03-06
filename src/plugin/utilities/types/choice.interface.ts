export type choice_option_alignment = "grid" | "flex" | "vertical";

export interface choice_option {
	label: string;
	value: string | number | boolean;
	hidden?: boolean;
	disabled?: boolean;
	action?: () => void;
}

export interface choice_option_nested extends choice_option {
	children?: choice_option[];
}

export type input_type = "text" | "number" | "email" | "password" | "search";
export const input_type_options: input_type[] = [
	"text",
	"number",
	"email",
	"password",
	"search",
];

export type choice_option_alignment = "grid" | "flex" | "vertical";
export const choice_option_alignment_options: choice_option_alignment[] = [
	"grid",
	"flex",
	"vertical",
];

export interface choice_option {
	label: string;
	value: string | number | boolean;
	hidden?: boolean;
	disabled?: boolean;
	action?: () => void;
}
export interface choice_option_filtered extends choice_option {
	index: number;
}

export interface choice_option_nested extends choice_option {
	children?: choice_option[];
}

export type choice_option_expand = "above" | "below";
export const choice_option_expand_options: choice_option_expand[] = [
	"above",
	"below",
];

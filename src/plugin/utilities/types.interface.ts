export * from "./types/navigation.interface";
export * from "./types/call_to_actions.interface";
export * from "./types/data_entry.interface";

// Common Types
export type theme = "auto" | "light" | "dark" | "invert";
export const theme_options: theme[] = ["auto", "light", "dark", "invert"];

export type hue =
	| "primary"
	| "primary-variant"
	| "secondary"
	| "secondary-variant"
	| "error"
	| "success"
	| "warning"
	| "information";
export const hue_options: hue[] = [
	"primary",
	"primary-variant",
	"secondary",
	"secondary-variant",
	"error",
	"success",
	"warning",
	"information",
];

export interface unknown_object {
	// eslint-disable-next-line
	[key: string]: any;
}

// Data Entry Types
export type data_entry_state = "default" | "error" | "warning" | "success";
export const data_entry_state_options: data_entry_state[] = [
	"default",
	"error",
	"warning",
	"success",
];

// Plugin Type Definition
export interface ecosphere {
	theming: {
		setTheme: (theme?: theme) => void;
		setColors: (colors: unknown_object) => void;
	};
}

// Import Component Types
export * from "./types/accessibility.interface";
export * from "./types/avatar.interface";
export * from "./types/breadcrumb.interface";
export * from "./types/button.interface";
export * from "./types/dot.interface";
export * from "./types/dropdown.interface";
export * from "./types/paragraph.interface";
export * from "./types/input.interface";
export * from "./types/menu.interface";
export * from "./types/navbar.interface";
export * from "./types/select.interface";
export * from "./types/table.interface";
export * from "./types/tag.interface";
export * from "./types/text.interface";
export * from "./types/toggle.interface";

// Plugin Configuration & Helper Types
export type themes = "light" | "dark" | "auto";
export interface color_palette {
	[key: string]: string;
}

// Commons
export type directions = "left" | "right" | "center";
export interface choice_option {
	label: string;
	value: string | number;
}
export type breakpoints = "xs" | "sm" | "md" | "lg";

// Unknowns
export interface unknown_nested_type {
	// eslint-disable-next-line
	[key: string]: any;
}
// eslint-disable-next-line
export type unknown_type = any;

export type hues =
	| "hue"
	| "primary"
	| "secondary"
	| "success"
	| "information"
	| "warning"
	| "critical"
	| "grey";

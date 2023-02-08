export * from "./types/menu.interface";

// Common Types
export type theme = "auto" | "light" | "dark" | "invert";
export type hue =
	| "primary"
	| "primary-variant"
	| "secondary"
	| "secondary-variant"
	| "error"
	| "success"
	| "warning"
	| "information";

export interface unknown_object {
	// eslint-disable-next-line
	[key: string]: any;
}

export * from "./types/menu.interface";
export * from "./types/navbar.interface";
export * from "./types/button.interface";
export * from "./types/input.interface";

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

// Plugin Type Definition
export interface ecosphere {
	theming: {
		setTheme: (theme?: theme) => void;
		setColors: (colors: unknown_object) => void;
	};
}

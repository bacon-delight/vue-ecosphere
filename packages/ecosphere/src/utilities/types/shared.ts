// Shared cross-component primitive types used by M2 component hardening.
// Kept separate from `types.interface.ts` (which re-exports legacy v0 types)
// so consumers can import `EpSize` / `EpStatus` / `EpHue` without pulling the
// full legacy type surface.

export type EpStatus =
	| "default"
	| "error"
	| "warning"
	| "success"
	| "information";
export const epStatusOptions: EpStatus[] = [
	"default",
	"error",
	"warning",
	"success",
	"information",
];

export type EpHue =
	| "primary"
	| "primary-variant"
	| "secondary"
	| "secondary-variant"
	| "error"
	| "success"
	| "warning"
	| "information";
export const epHueOptions: EpHue[] = [
	"primary",
	"primary-variant",
	"secondary",
	"secondary-variant",
	"error",
	"success",
	"warning",
	"information",
];

export type EpShape = "default" | "round" | "circle" | "square";

export type EpPosition = "before" | "after";

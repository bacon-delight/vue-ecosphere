export type tag_size = "sm" | "md" | "lg";
export const tag_size_options: tag_size[] = ["sm", "md", "lg"];

export type avatar_size = "sm" | "md" | "lg";
export const avatar_size_options: avatar_size[] = ["sm", "md", "lg"];

export type avatar_status = "default" | "offline" | "online" | "away" | "busy";
export const avatar_status_options: avatar_status[] = [
	"default",
	"offline",
	"online",
	"away",
	"busy",
];

export interface stepper_step {
	label: string;
	description?: string;
	icon?: string;
}

export type stepper_orientation = "horizontal" | "vertical";
export const stepper_orientation_options: stepper_orientation[] = [
	"horizontal",
	"vertical",
];

export type stepper_state =
	| "awaiting"
	| "in-progress"
	| "completed"
	| "error"
	| "warning";
export const stepper_state_options: stepper_state[] = [
	"awaiting",
	"in-progress",
	"completed",
	"error",
	"warning",
];

import type { unknown_object } from "@/plugin/utilities/types.interface";

const literals = { "{": `{'{'}`, "}": `{'}'}`, "|": `{'|'}`, "@": `{'@'}` };

export default function interpolateLiterals(raw: string): string {
	let interpolated = "";
	for (let index = 0; index < raw.length; index++) {
		const character = raw.charAt(index);
		if (character in literals) {
			interpolated = interpolated.concat(
				(literals as unknown_object)[character]
			);
		} else {
			interpolated = interpolated.concat(character);
		}
	}
	return interpolated;
}

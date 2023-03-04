const literals = { "{": `{'{'}`, "}": `{'}'}` };

export default function interpolateLiterals(raw: string): string {
	let interpolated = raw;
	// // interpolated = interpolated.replace(/[{]/g, `{'{'}`);
	// interpolated = interpolated.replace(/{|_/g, "{'{'}");
	// for (const literal in literals) {
	// 	interpolated = interpolated.replace(
	// 		new RegExp(literal, "g"),
	// 		literals[literal]
	// 	);
	// }
	// interpolated[2] = "-";
	console.log(interpolated.slice(2));
	return "interpolated";
}

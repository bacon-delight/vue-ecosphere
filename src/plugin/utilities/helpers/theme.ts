import type { theme, unknown_object } from "@/plugin/utilities/types.interface";

export function setTheme(theme: theme = "auto") {
	document.body.classList.remove("ecosphere-dark");
	if (
		(theme === "auto" &&
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme:dark)").matches) ||
		theme === "dark"
	) {
		document.body.classList.add("ecosphere-dark");
	}
}

export function setColors(colors: unknown_object) {
	const root: any = document.querySelector(":root");
	for (const color in colors) {
		root.style.setProperty(`--color-${color}`, colors[color]);
	}
}

export function getTheme(): theme {
	return document.body.classList.contains("ecosphere-dark")
		? "dark"
		: "light";
}

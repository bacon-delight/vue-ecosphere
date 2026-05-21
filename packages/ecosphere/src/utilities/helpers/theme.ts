import type { theme, unknown_object } from "../../utilities/types.interface";

let darkMediaQuery: MediaQueryList | null = null;
let darkMediaListener: ((event: MediaQueryListEvent) => void) | null = null;

function applyTheme(resolved: "light" | "dark"): void {
	if (typeof document === "undefined") return;
	const root = document.documentElement;
	root.setAttribute("data-theme", resolved);

	// Legacy hook — keep body class in sync for any consumer still styling
	// against `body.ecosphere-dark`. Removed in a future major.
	document.body.classList.toggle("ecosphere-dark", resolved === "dark");
}

function teardownAutoListener(): void {
	if (darkMediaQuery && darkMediaListener) {
		darkMediaQuery.removeEventListener("change", darkMediaListener);
	}
	darkMediaQuery = null;
	darkMediaListener = null;
}

export function setTheme(theme: theme = "auto"): void {
	if (typeof document === "undefined") return;
	teardownAutoListener();

	if (theme === "auto") {
		document.documentElement.setAttribute("data-theme", "auto");
		if (typeof window !== "undefined" && window.matchMedia) {
			darkMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
			applyTheme(darkMediaQuery.matches ? "dark" : "light");
			// Re-apply data-theme="auto" so the CSS @media block governs values;
			// the body class above is the only DOM signal for legacy callers.
			document.documentElement.setAttribute("data-theme", "auto");
			darkMediaListener = (event: MediaQueryListEvent) => {
				document.body.classList.toggle("ecosphere-dark", event.matches);
			};
			darkMediaQuery.addEventListener("change", darkMediaListener);
		} else {
			applyTheme("light");
		}
		return;
	}

	applyTheme(theme === "invert" ? "dark" : theme);
}

// Internal — applies color overrides without the deprecation warning.
// The plugin uses this to set default colors at install time.
export function applyColors(colors: unknown_object): void {
	if (typeof document === "undefined") return;
	const root = document.documentElement;
	for (const color in colors) {
		root.style.setProperty(`--color-${color}`, String(colors[color]));
		root.style.setProperty(`--ep-color-${color}`, String(colors[color]));
	}
}

// Internal — applies font overrides without the deprecation warning.
export function applyFonts(fonts: unknown_object): void {
	if (typeof document === "undefined") return;
	const root = document.documentElement;
	for (const font in fonts) {
		root.style.setProperty(`--font-${font}`, String(fonts[font]));
		const epKey = font === "general" ? "base" : font;
		root.style.setProperty(
			`--ep-font-family-${epKey}`,
			String(fonts[font])
		);
	}
}

/**
 * @deprecated Override `--ep-color-*` CSS custom properties on `:root` (or any
 * scoped ancestor) instead. Will be removed in a future major release.
 */
export function setColors(colors: unknown_object): void {
	if (typeof document === "undefined") return;
	if (typeof console !== "undefined") {
		console.warn(
			'[vue-ecosphere] setColors() is deprecated. Override --ep-color-* CSS variables on :root (or use <EpConfigProvider :colors="...">) instead.'
		);
	}
	applyColors(colors);
}

/**
 * @deprecated Override `--ep-font-family-*` CSS custom properties on `:root`
 * instead. Will be removed in a future major release.
 */
export function setFonts(fonts: unknown_object): void {
	if (typeof document === "undefined") return;
	if (typeof console !== "undefined") {
		console.warn(
			"[vue-ecosphere] setFonts() is deprecated. Override --ep-font-family-* CSS variables on :root instead."
		);
	}
	applyFonts(fonts);
}

export function getTheme(): theme {
	if (typeof document === "undefined") return "light";
	const attr = document.documentElement.getAttribute("data-theme");
	if (attr === "dark" || attr === "light" || attr === "auto") return attr;
	return document.body.classList.contains("ecosphere-dark")
		? "dark"
		: "light";
}

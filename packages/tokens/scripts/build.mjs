import StyleDictionary from "style-dictionary";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { mkdirSync, writeFileSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const distDir = resolve(root, "dist");
mkdirSync(distDir, { recursive: true });

const getValue = (t) => t.$value ?? t.value;

StyleDictionary.registerFormat({
	name: "css/ep-theme-light",
	format: ({ dictionary, options }) => {
		const prefix = options.prefix ?? "ep";
		const lines = dictionary.allTokens.map(
			(t) => `\t--${prefix}-${t.path.join("-")}: ${getValue(t)};`
		);
		return `/* vue-ecosphere tokens — light theme */\n:root,\n:root[data-theme="light"] {\n${lines.join("\n")}\n}\n`;
	},
});

StyleDictionary.registerFormat({
	name: "css/ep-theme-dark",
	format: ({ dictionary, options }) => {
		const prefix = options.prefix ?? "ep";
		const lines = dictionary.allTokens.map(
			(t) => `\t--${prefix}-${t.path.join("-")}: ${getValue(t)};`
		);
		const block = lines.join("\n");
		const blockIndented = lines.map((l) => `\t${l}`).join("\n");
		return `/* vue-ecosphere tokens — dark theme */\n:root[data-theme="dark"] {\n${block}\n}\n\n@media (prefers-color-scheme: dark) {\n\t:root[data-theme="auto"] {\n${blockIndented}\n\t}\n}\n`;
	},
});

StyleDictionary.registerFormat({
	name: "scss/ep-variables",
	format: ({ dictionary, options }) => {
		const prefix = options.prefix ?? "ep";
		const lines = dictionary.allTokens.map(
			(t) =>
				`$${prefix}-${t.path.join("-")}: var(--${prefix}-${t.path.join("-")});`
		);
		return `/* vue-ecosphere tokens — SCSS variables */\n${lines.join("\n")}\n`;
	},
});

StyleDictionary.registerFormat({
	name: "ts/ep-tokens",
	format: ({ dictionary, options }) => {
		const prefix = options.prefix ?? "ep";
		const cssVarMap = dictionary.allTokens
			.map(
				(t) =>
					`\t"${t.path.join(".")}": "var(--${prefix}-${t.path.join("-")})",`
			)
			.join("\n");
		const valueMap = dictionary.allTokens
			.map(
				(t) =>
					`\t"${t.path.join(".")}": ${JSON.stringify(getValue(t))},`
			)
			.join("\n");
		return `/* vue-ecosphere tokens — generated, do not edit */
export declare const tokens: {
${cssVarMap}
};

export declare const tokenValues: {
${valueMap}
};

export type TokenName = keyof typeof tokens;
`;
	},
});

StyleDictionary.registerFormat({
	name: "js/ep-tokens-esm",
	format: ({ dictionary, options }) => {
		const prefix = options.prefix ?? "ep";
		const map = dictionary.allTokens
			.map(
				(t) =>
					`\t"${t.path.join(".")}": "var(--${prefix}-${t.path.join("-")})",`
			)
			.join("\n");
		const values = dictionary.allTokens
			.map(
				(t) =>
					`\t"${t.path.join(".")}": ${JSON.stringify(getValue(t))},`
			)
			.join("\n");
		return `/* vue-ecosphere tokens — generated */\nexport const tokens = {\n${map}\n};\nexport const tokenValues = {\n${values}\n};\n`;
	},
});

StyleDictionary.registerFormat({
	name: "cjs/ep-tokens",
	format: ({ dictionary, options }) => {
		const prefix = options.prefix ?? "ep";
		const map = dictionary.allTokens
			.map(
				(t) =>
					`\t"${t.path.join(".")}": "var(--${prefix}-${t.path.join("-")})",`
			)
			.join("\n");
		const values = dictionary.allTokens
			.map(
				(t) =>
					`\t"${t.path.join(".")}": ${JSON.stringify(getValue(t))},`
			)
			.join("\n");
		return `/* vue-ecosphere tokens — generated */\nmodule.exports.tokens = {\n${map}\n};\nmodule.exports.tokenValues = {\n${values}\n};\n`;
	},
});

const baseConfig = {
	source: [
		resolve(root, "src/primitive.tokens.json"),
		resolve(root, "src/semantic.tokens.json"),
		resolve(root, "src/component.tokens.json"),
	],
	platforms: {
		main: {
			buildPath: "dist/",
			options: { prefix: "ep" },
			files: [
				{ destination: "tokens.css", format: "css/ep-theme-light" },
				{ destination: "tokens.scss", format: "scss/ep-variables" },
				{ destination: "tokens.d.ts", format: "ts/ep-tokens" },
				{ destination: "tokens.js", format: "js/ep-tokens-esm" },
				{ destination: "tokens.cjs", format: "cjs/ep-tokens" },
			],
		},
	},
};

const darkConfig = {
	source: [
		resolve(root, "src/primitive.tokens.json"),
		resolve(root, "src/semantic.dark.tokens.json"),
	],
	platforms: {
		dark: {
			buildPath: "dist/",
			options: { prefix: "ep" },
			files: [
				{
					destination: "tokens.dark.css",
					format: "css/ep-theme-dark",
					filter: (t) =>
						t.filePath.includes("semantic.dark.tokens.json"),
				},
			],
		},
	},
};

const sd = new StyleDictionary(baseConfig);
await sd.buildAllPlatforms();

const sdDark = new StyleDictionary(darkConfig);
await sdDark.buildAllPlatforms();

const tailwindPreset = `/* vue-ecosphere tailwind preset — generated */
module.exports = {
	theme: {
		extend: {
			colors: {
				"ep-background": "var(--ep-color-background)",
				"ep-contrast": "var(--ep-color-contrast)",
				"ep-primary": "var(--ep-color-primary)",
				"ep-secondary": "var(--ep-color-secondary)",
				"ep-error": "var(--ep-color-error)",
				"ep-success": "var(--ep-color-success)",
				"ep-warning": "var(--ep-color-warning)",
				"ep-information": "var(--ep-color-information)",
				"ep-divider": "var(--ep-color-divider)",
				"ep-disabled": "var(--ep-color-disabled)",
				"ep-hyperlink": "var(--ep-color-hyperlink)",
			},
			fontFamily: {
				"ep-base": "var(--ep-font-family-base)",
				"ep-serif": "var(--ep-font-family-serif)",
				"ep-mono": "var(--ep-font-family-mono)",
			},
			borderRadius: {
				"ep-base": "var(--ep-radius-base)",
			},
		},
	},
};
`;
writeFileSync(resolve(distDir, "tailwind.preset.cjs"), tailwindPreset);

console.log("✓ @ecosphere/tokens built → dist/");

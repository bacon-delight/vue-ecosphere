// Generates apps/docs/data/tokens.json from packages/tokens/src/*.tokens.json
// so TokensTable.vue can render reference tables.
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..", "..", "..");
const TOK = resolve(ROOT, "packages", "tokens", "src");
const OUT_DIR = resolve(__dirname, "..", "data");
const OUT_FILE = resolve(OUT_DIR, "tokens.json");

const SOURCES = {
	primitive: "primitive.tokens.json",
	semantic: "semantic.tokens.json",
	"semantic-dark": "semantic.dark.tokens.json",
	component: "component.tokens.json",
};

function flatten(obj, prefix = "") {
	const out = [];
	for (const [key, value] of Object.entries(obj)) {
		const path = prefix ? `${prefix}-${key}` : key;
		if (value && typeof value === "object") {
			const v = value.$value ?? value.value;
			if (v !== undefined && (typeof v === "string" || typeof v === "number")) {
				out.push({
					name: `--ep-${path.replace(/^primitive-/, "").replace(/^semantic-/, "").replace(/^component-/, "")}`,
					value: String(v),
					description: value.$description ?? value.description ?? "",
				});
			} else {
				out.push(...flatten(value, path));
			}
		}
	}
	return out;
}

async function main() {
	if (!existsSync(OUT_DIR)) await mkdir(OUT_DIR, { recursive: true });
	const result = {};
	for (const [group, file] of Object.entries(SOURCES)) {
		const path = resolve(TOK, file);
		if (!existsSync(path)) {
			console.warn(`[gen-tokens-ref] missing: ${path}`);
			result[group] = [];
			continue;
		}
		const raw = JSON.parse(await readFile(path, "utf8"));
		result[group] = flatten(raw);
	}
	await writeFile(OUT_FILE, JSON.stringify(result, null, 2) + "\n", "utf8");
	console.log(
		`[gen-tokens-ref] wrote ${Object.values(result).reduce(
			(a, b) => a + b.length,
			0,
		)} tokens → ${OUT_FILE}`,
	);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});

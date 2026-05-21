// Generates apps/docs/data/component-meta.json from the library SFCs
// using vue-docgen-api. Runs before vitepress dev/build.
import { parse } from "vue-docgen-api";
import { readdir, mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve, dirname, basename, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..", "..", "..");
const SRC = resolve(ROOT, "packages", "ecosphere", "src");
const OUT_DIR = resolve(__dirname, "..", "data");
const OUT_FILE = resolve(OUT_DIR, "component-meta.json");

// Map of doc page slug -> SFC file path (relative to packages/ecosphere/src).
// Keys must match what PropsTable / EventsTable / SlotsTable pass as `component`.
const COMPONENT_MAP = {
	EpButton: "call-to-action/ButtonComponent.vue",
	EpLink: "call-to-action/LinkComponent.vue",
	EpCheckbox: "data-entry/CheckboxField.vue",
	EpCheckboxGroup: "data-entry/CheckboxGroup.vue",
	EpChoiceChips: "data-entry/ChoiceChips.vue",
	EpColorPicker: "data-entry/ColorPicker.vue",
	EpInput: "data-entry/InputField.vue",
	EpInputNumber: "data-entry/InputNumberField.vue",
	EpRadio: "data-entry/RadioField.vue",
	EpRadioGroup: "data-entry/RadioGroup.vue",
	EpSelect: "data-entry/SelectField.vue",
	EpSwitch: "data-entry/SwitchComponent.vue",
	EpTextarea: "data-entry/TextareaField.vue",
	EpIcon: "general/SVGIcon.vue",
	EpConfigProvider: "general/EpConfigProvider.vue",
	EpAvatar: "miscellaneous/AvatarComponent.vue",
	EpAvatarGroup: "miscellaneous/AvatarGroup.vue",
	EpStepper: "miscellaneous/StepperComponent.vue",
	EpTag: "miscellaneous/TagComponent.vue",
	EpBreadcrumb: "navigation/BreadcrumbNavigation.vue",
	EpMenu: "navigation/MenuNavigation.vue",
	EpNavbar: "navigation/NavigationBar.vue",
	EpSidebar: "navigation/SidebarNavigation.vue",
	EpTabNavigation: "navigation/TabNavigation.vue",
};

function normalizeType(t) {
	if (!t) return "unknown";
	if (typeof t === "string") return t;
	if (t.name) return t.name;
	return JSON.stringify(t);
}

async function parseComponent(file) {
	try {
		const info = await parse(file);
		return {
			displayName: info.displayName,
			description: info.description ?? "",
			props: (info.props ?? []).map((p) => ({
				name: p.name,
				type: normalizeType(p.type),
				required: !!p.required,
				defaultValue:
					p.defaultValue && p.defaultValue.value !== undefined
						? String(p.defaultValue.value)
						: null,
				description: p.description ?? "",
			})),
			events: (info.events ?? []).map((e) => ({
				name: e.name,
				type: e.type ? normalizeType(e.type) : null,
				description: e.description ?? "",
			})),
			slots: (info.slots ?? []).map((s) => ({
				name: s.name,
				scope:
					s.bindings && s.bindings.length
						? s.bindings.map((b) => b.name).join(", ")
						: null,
				description: s.description ?? "",
			})),
		};
	} catch (err) {
		console.warn(
			`[gen-component-meta] could not parse ${file}:`,
			err.message,
		);
		return {
			displayName: basename(file, ".vue"),
			description: "",
			props: [],
			events: [],
			slots: [],
		};
	}
}

async function main() {
	if (!existsSync(OUT_DIR)) await mkdir(OUT_DIR, { recursive: true });

	const out = {};
	for (const [name, rel] of Object.entries(COMPONENT_MAP)) {
		const file = join(SRC, rel);
		if (!existsSync(file)) {
			console.warn(`[gen-component-meta] missing: ${file}`);
			continue;
		}
		out[name] = await parseComponent(file);
	}

	await writeFile(OUT_FILE, JSON.stringify(out, null, 2) + "\n", "utf8");
	console.log(
		`[gen-component-meta] wrote ${Object.keys(out).length} entries → ${OUT_FILE}`,
	);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});

#!/usr/bin/env node
/**
 * One-shot migration: convert <template lang="pug">…</template> blocks
 * inside .vue files to plain <template>…</template> using `pug.render`.
 *
 * Post-processing: pug HTML-escapes characters in attribute values,
 * which mangles Vue directive expressions like `v-if="a && b"`. We
 * unescape the common entities globally — they should never appear
 * literally in templates produced from pug source.
 *
 * Usage:  node scripts/pug-to-template.cjs [--check]
 *
 *   --check : only print which files would change, do not write.
 */

const fs = require("node:fs");
const path = require("node:path");
const pug = require("pug");

const ROOT = path.resolve(__dirname, "..");
const TEMPLATE_RE =
	/<template\s+lang=["']pug["']\s*>([\s\S]*?)<\/template>/m;
const ENTITY_MAP = {
	"&amp;": "&",
	"&lt;": "<",
	"&gt;": ">",
	"&quot;": '"',
	"&#39;": "'",
	"&apos;": "'",
};
const ENTITY_RE = /&(?:amp|lt|gt|quot|#39|apos);/g;

function* walk(dir) {
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			if (
				entry.name === "node_modules" ||
				entry.name === "dist" ||
				entry.name === "graphify-out" ||
				entry.name.startsWith(".")
			) {
				continue;
			}
			yield* walk(full);
		} else if (entry.name.endsWith(".vue")) {
			yield full;
		}
	}
}

function unescape(html) {
	return html.replace(ENTITY_RE, (m) => ENTITY_MAP[m] || m);
}

function convert(source, file) {
	const m = source.match(TEMPLATE_RE);
	if (!m) return null;
	const pugSrc = m[1].replace(/^\n/, "").replace(/\s+$/, "");
	if (!pugSrc.trim()) return null;
	let html;
	try {
		html = pug.render(pugSrc, {
			pretty: "\t",
			doctype: "html",
			filename: file,
		});
	} catch (err) {
		throw new Error(`pug error in ${file}: ${err.message}`);
	}
	html = unescape(html);
	// Re-indent: pug.render gives us indented HTML at column 0; nest it
	// inside the <template> by indenting one tab.
	const indented = html
		.split("\n")
		.map((line) => (line.length ? "\t" + line : line))
		.join("\n")
		.replace(/^\t+$/gm, "");
	const replacement = `<template>\n${indented.replace(
		/^\n+|\n+$/g,
		""
	)}\n</template>`;
	return source.replace(TEMPLATE_RE, replacement);
}

function main() {
	const check = process.argv.includes("--check");
	const onlyArg = process.argv.find((a) => a.endsWith(".vue"));
	const files = onlyArg
		? [path.resolve(ROOT, onlyArg)]
		: [...walk(path.join(ROOT, "src"))];
	let changed = 0;
	const errors = [];
	for (const file of files) {
		const src = fs.readFileSync(file, "utf8");
		let next;
		try {
			next = convert(src, file);
		} catch (e) {
			errors.push(e.message);
			continue;
		}
		if (next == null) continue;
		if (next !== src) {
			changed++;
			if (!check) fs.writeFileSync(file, next);
			console.log(
				(check ? "[would change] " : "[converted]    ") +
					path.relative(ROOT, file)
			);
		}
	}
	console.log(
		`\n${changed} file(s) ${check ? "would be" : "were"} converted.`
	);
	if (errors.length) {
		console.error("\nErrors:");
		for (const e of errors) console.error(" - " + e);
		process.exit(1);
	}
}

main();

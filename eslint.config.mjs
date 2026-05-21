import js from "@eslint/js";
import tseslint from "typescript-eslint";
import vue from "eslint-plugin-vue";
import prettier from "@vue/eslint-config-prettier";
import vueParser from "vue-eslint-parser";

export default [
	{
		ignores: [
			"**/dist/**",
			"**/node_modules/**",
			"**/.changeset/**",
			"**/coverage/**",
			"graphify-out/**",
			"fix-agent/**",
			"test-agent/**",
			"scripts/**",
		],
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	...vue.configs["flat/recommended"],
	{
		files: ["**/*.vue"],
		languageOptions: {
			parser: vueParser,
			parserOptions: {
				parser: tseslint.parser,
				ecmaVersion: "latest",
				sourceType: "module",
				extraFileExtensions: [".vue"],
			},
		},
	},
	{
		files: ["**/*.{ts,tsx,vue}"],
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
		},
		rules: {
			"@typescript-eslint/no-explicit-any": "warn",
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{ argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
			],
			"vue/multi-word-component-names": "off",
			"vue/no-v-html": "off",
			// Pre-existing template issues — kept as warnings so the
			// ESLint 9 baseline can land cleanly in M0; addressed in M1.
			"vue/require-v-for-key": "warn",
			"vue/valid-v-for": "warn",
			"vue/no-unused-components": "warn",
			"vue/require-explicit-emits": "warn",
			"vue/attributes-order": "warn",
		},
	},
	prettier,
];

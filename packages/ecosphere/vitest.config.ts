// Vitest config for vue-ecosphere library tests.
// Note: production build still uses vite.config.ts (which keeps the SCSS
// preprocessor pipeline for transitional components). Tests don't compile
// styles, so this config keeps the surface minimal.

import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@import "@/styles/framework.scss";`,
				api: "modern-compiler",
				silenceDeprecations: [
					"legacy-js-api",
					"import",
					"global-builtin",
				],
			},
		},
	},
	test: {
		environment: "jsdom",
		globals: false,
		setupFiles: ["./src/test/setup.ts"],
		include: ["src/**/*.spec.ts"],
		css: false,
	},
});

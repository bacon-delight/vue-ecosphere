import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

export default defineConfig({
	plugins: [
		vue(),
		dts({
			entryRoot: "src",
			outDir: "dist",
			tsconfigPath: "./tsconfig.build.json",
			rollupTypes: true,
			insertTypesEntry: true,
		}),
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	build: {
		cssCodeSplit: false,
		sourcemap: true,
		lib: {
			name: "VueEcosphere",
			entry: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
			formats: ["es", "umd"],
			fileName: (format) =>
				format === "es" ? "vue-ecosphere.js" : "vue-ecosphere.umd.cjs",
		},
		rollupOptions: {
			external: ["vue"],
			output: {
				globals: {
					vue: "Vue",
				},
				assetFileNames: (assetInfo) => {
					if (assetInfo.name === "style.css")
						return "vue-ecosphere.css";
					return assetInfo.name ?? "assets/[name][extname]";
				},
			},
		},
	},
});

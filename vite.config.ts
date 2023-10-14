import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "node:path";

export default defineConfig(({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

	return {
		plugins: [
			vue({
				template: {
					transformAssetUrls: {
						includeAbsolute: false,
					},
				},
			}),
		],
		resolve: {
			alias: {
				"@": fileURLToPath(new URL("./src", import.meta.url)),
			},
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@import "@/assets/framework.scss";`,
				},
			},
		},
		build:
			process.env.VITE_PACKAGE_MODE === "true"
				? {
						lib: {
							name: "vue-ecosphere",
							entry: path.resolve(
								__dirname,
								"./src/plugin/plugin.ts"
							),
							fileName(format) {
								return `vue-ecosphere.${format}.js`;
							},
						},
						rollupOptions: {
							external: ["vue"],
							output: {
								globals: {
									vue: "Vue",
								},
							},
						},
				  }
				: {},
	};
});
// export default defineConfig({
// 	plugins: [vue()],
// 	resolve: {
// 		alias: {
// 			"@": fileURLToPath(new URL("./src", import.meta.url)),
// 		},
// 	},
// });

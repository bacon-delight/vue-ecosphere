import type { App, Plugin } from "vue";
import {
	setTheme,
	applyColors,
	applyFonts,
	setColors,
	getTheme,
} from "./utilities/helpers/theme";
import registerPluginComponents from "./plugin_components";
import colors from "./defaults/colors";
import fonts from "./defaults/fonts";

function initialize(): void {
	setTheme("light");
	applyColors(colors);
	applyFonts(fonts);
}

const plugin: Plugin = {
	install(app: App) {
		initialize();

		app.config.globalProperties.$ecosphere = {
			theming: {
				setTheme,
				setColors,
				getTheme,
			},
		};

		registerPluginComponents(app);
	},
};

export default plugin;

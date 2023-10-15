// Helpers
import {
	setTheme,
	setColors,
	setFonts,
	getTheme,
} from "./utilities/helpers/theme";
import registerPluginComponents from "./plugin_components";

// Initialize
import colors from "@/assets/utilities/colors";
import fonts from "@/assets/utilities/fonts";

function initialize(): void {
	setTheme("light");
	setColors(colors);
	setFonts(fonts);
}

export default {
	install: (app: any) => {
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

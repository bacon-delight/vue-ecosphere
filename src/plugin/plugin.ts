// Helpers
import { setTheme, setColors, getTheme } from "./utilities/helpers/theme";

// Initialize
function initialize(): void {
	setTheme("light");
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
	},
};

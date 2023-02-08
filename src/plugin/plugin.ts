// Helpers
import { setTheme, setColors } from "./utilities/helpers/theme";

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
			},
		};
	},
};

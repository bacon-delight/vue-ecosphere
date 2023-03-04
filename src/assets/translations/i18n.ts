import { createI18n } from "vue-i18n";

// Translations
import en from "./_en";
import zh from "./_zh";

export const i18n = createI18n({
	locale: "en",
	fallbackLocale: "en",
	messages: {
		en,
		zh,
	},
});

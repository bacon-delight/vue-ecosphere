import { createI18n } from "vue-i18n";

// Translations
import en from "./_en";
import zh from "./_zh";

export const i18n = createI18n({
	legacy: false,
	locale: "en",
	fallbackLocale: "en",
	messages: {
		en,
		zh,
	},
	// warnHtmlInMessage: "off",
	warnHtmlMessage: false,
});

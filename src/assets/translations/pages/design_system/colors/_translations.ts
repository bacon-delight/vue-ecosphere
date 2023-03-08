import content_en from "./en.md?raw";
import interpolateLiterals from "@/assets/translations/interpolateLiterals";

const en = {
	title: "Colors",
	content: interpolateLiterals(content_en),
};

export default function translations(locale: string) {
	switch (locale) {
		// case "zh":
		// 	return zh;
		default:
			return en;
	}
}

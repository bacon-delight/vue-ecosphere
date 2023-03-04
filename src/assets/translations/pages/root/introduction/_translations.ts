import content_en from "./en.md?raw";
import interpolateLiterals from "@/assets/translations/interpolateLiterals";

const en = {
	title: "Introduction",
	content: interpolateLiterals(content_en),
};

// const zh = {
// 	title: "Introduction ZH",
// 	content: content_zh,
// };

export default function translations(locale: string) {
	switch (locale) {
		// case "zh":
		// 	return zh;
		default:
			return en;
	}
}

import content_en from "./en.md?raw";
import content_zh from "./zh.md?raw";

const en = {
	title: "Introduction",
	content: content_en,
};

const zh = {
	title: "Introduction ZH",
	content: content_zh,
};

export default function translations(locale: string) {
	switch (locale) {
		case "zh":
			return zh;
		default:
			return en;
	}
}

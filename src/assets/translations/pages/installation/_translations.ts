import content_en from "./en.md?raw";

const en = {
	title: "Installation",
	content: content_en,
};

export default function translations(locale: string) {
	switch (locale) {
		// case "zh":
		// 	return zh;
		default:
			return en;
	}
}

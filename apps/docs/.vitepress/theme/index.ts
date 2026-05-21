import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import EcospherePlugin from "vue-ecosphere";
import "vue-ecosphere/styles";
import "./style.css";

import Demo from "./components/Demo.vue";
import PropsTable from "./components/PropsTable.vue";
import EventsTable from "./components/EventsTable.vue";
import SlotsTable from "./components/SlotsTable.vue";
import TokensTable from "./components/TokensTable.vue";

export default {
	extends: DefaultTheme,
	enhanceApp({ app }) {
		app.use(EcospherePlugin);
		app.component("Demo", Demo);
		app.component("PropsTable", PropsTable);
		app.component("EventsTable", EventsTable);
		app.component("SlotsTable", SlotsTable);
		app.component("TokensTable", TokensTable);
	},
} satisfies Theme;

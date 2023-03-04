import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import ecosphere from "./plugin/plugin";
import { i18n } from "./assets/translations/i18n";

import "./assets/base.scss";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ecosphere);
app.use(i18n);

app.mount("#app");

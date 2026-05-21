import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import ecosphere from "vue-ecosphere";

import "@ecosphere/styles/base.scss";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ecosphere);

// Lightweight i18n shim — vue-i18n was removed in M0; templates still
// reference $t() and $te(). We expose them as globals that simply echo
// the key so the docs SPA does not crash. Real localization will be
// reintroduced as part of the docs rewrite (M3+).
app.config.globalProperties.$t = (key: string) => key;
app.config.globalProperties.$te = () => false;
app.config.globalProperties.$tc = (key: string) => key;

app.mount("#app");

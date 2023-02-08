import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import ecosphere from "./plugin/plugin";

import "./assets/base.scss";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ecosphere);

app.mount("#app");

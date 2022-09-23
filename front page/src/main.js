import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "element-plus/dist/index.css";
import "./assets/main.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);
const pinia = createPinia();

// 注册elementUI ICON 图表
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(router);
app.use(pinia);
// app.use(ElementPlus)
app.mount("#app");

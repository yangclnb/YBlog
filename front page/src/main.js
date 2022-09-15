import { createApp } from 'vue'
import {createPinia} from "pinia"
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import './assets/main.css'

// import ElementPlus from 'element-plus'

const app = createApp(App);
const pinia = createPinia();

app.use(router)
app.use(pinia)
// app.use(ElementPlus)
app.mount('#app')

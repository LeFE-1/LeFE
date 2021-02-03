import { createApp } from 'vue'
import App from './App.vue'
import VuePage from '../index'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import axios from 'axios'
const app = createApp(App)

app.use(ElementPlus)
app.use(VuePage, {
  UILibrary: 'ElementPlus',
  http: axios.create()
})
app.mount('#app')

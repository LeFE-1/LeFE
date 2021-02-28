import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import axios from 'axios'
import router from './router'
import Vue3Render from '@lefe/vue3-render'

const app = createApp(App)
app.use(ElementPlus)
app.use(Vue3Render, {
  UILibrary: 'ElementPlus',
  http: axios.create()
})
app.use(router)
app.mount('#app')

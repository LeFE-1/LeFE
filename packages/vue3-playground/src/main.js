import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import axios from 'axios'
import router from './router'
const app = createApp(App)
// 调试时的引用方式，正常情况下使用
// import Vue3Render from 'lefe-vue3-render'
const Vue3Render = require('@lefe/vue3-render/src/main.js').default

app.use(ElementPlus)
app.use(Vue3Render, {
  UILibrary: 'ElementPlus',
  http: axios.create()
})
app.use(router)
app.mount('#app')

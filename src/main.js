import { createApp } from 'vue'
import 'virtual:uno.css'
import '@unocss/reset/tailwind.css' 
import './style.css'
import App from './App.vue'
import router from './routers/index.js'
import pinia from './stores/index.js'
// 引入 Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 如果需要使用中文
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'


const app = createApp(App)

app.use(pinia)
app.use(router)
// 使用 Element Plus，并配置中文
app.use(ElementPlus, {
  locale: zhCn,
})
app.mount('#app')

import { createApp } from 'vue'
import 'virtual:uno.css'
import '@unocss/reset/tailwind.css' 
import './style.css'
import './assets/theme.css'
import App from './App.vue'
import router from './routers/index.js'
import pinia from './stores/index.js'
import { useThemeStore } from './stores/theme'
// 引入 Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 如果需要使用中文
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import i18n from './i18n'


const app = createApp(App)

app.use(pinia)

// 初始化主题
const themeStore = useThemeStore()
themeStore.initTheme()

app.use(router)
// 使用 Element Plus，并配置中文
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(i18n)
app.mount('#app')

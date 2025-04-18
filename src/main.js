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
// 导入 Element Plus 中文语言包

import i18n from './language'

const app = createApp(App)

app.use(pinia)

// 初始化主题
const themeStore = useThemeStore()
themeStore.initTheme()

app.use(router)
// 使用 Element Plus
app.use(ElementPlus)
app.use(i18n)
app.mount('#app')

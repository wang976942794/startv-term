import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    message: {
      Username: 'Username',
    }
  },
  ru: {
    message: {
      Username: 'Имя пользователя',
    }
  },
  ar: {
    message: {
      Username: 'اسم المستخدم',
    }
  }
}

const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: 'en', // 设置默认语言
  fallbackLocale: 'en', // 设置备用语言
  messages
})

export default i18n 
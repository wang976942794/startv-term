
import { createI18n } from "vue-i18n";
import ar from "./locales/ar";
import en from "./locales/en";
import ru from "./locales/ru";
let languageAll=['en','ar','ru'];
let localStorageLanguage = JSON.parse(localStorage.getItem("language")); //  获取本地存储
let locale = languageAll.indexOf(localStorageLanguage?.languageMode?.name)>-1 ? localStorageLanguage?.languageMode?.name : 'en';
const i18n = createI18n({
  legacy: false, // 使用Composition API，这里必须设置为false
  locale: locale, // 默认显示语言
  globalInjection: true, // 全局注册$t方法
  messages: {
    "en": en,
    "ar": ar,
    "ru": ru
  },
});

export default i18n;
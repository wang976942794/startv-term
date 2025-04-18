import { createI18n } from "vue-i18n";
import ar from "./locales/ar";
import en from "./locales/en";
import ru from "./locales/ru";

const languageAll = ['en', 'ar', 'ru'];

// 获取本地存储的语言设置
function getStoredLanguage() {
  try {
    const storedData = localStorage.getItem("language");
    if (!storedData) return 'en';
    
    const languageData = JSON.parse(storedData);
    const languageName = languageData?.languageMode?.name;
    
    // 确保语言代码在支持的语言列表中
    return languageAll.includes(languageName) ? languageName : 'en';
  } catch (error) {
    console.warn('Error reading language from localStorage:', error);
    return 'en';
  }
}

const i18n = createI18n({
  legacy: false,
  locale: getStoredLanguage(), // 初始语言设置
  globalInjection: true,
  messages: {
    en,
    ar,
    ru
  },
});

// 监听语言变化并更新
export function setI18nLanguage(lang) {
  if (languageAll.includes(lang)) {
    i18n.global.locale.value = lang;
    document.querySelector('html').setAttribute('lang', lang);
    // 保存到 localStorage
    localStorage.setItem('language', JSON.stringify({
      languageMode: { name: lang }
    }));
  }
}

// 初始设置 HTML lang 属性
document.querySelector('html').setAttribute('lang', getStoredLanguage());

export default i18n;
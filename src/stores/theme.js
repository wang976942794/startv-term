import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDarkMode: true // 默认为黑暗模式
  }),
  actions: {
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode
      // 保存主题设置到本地存储
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light')
      // 更新根元素的主题类
      document.documentElement.classList.toggle('light-mode', !this.isDarkMode)
    },
    initTheme() {
      // 从本地存储获取主题设置
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) {
        this.isDarkMode = savedTheme === 'dark'
        document.documentElement.classList.toggle('light-mode', !this.isDarkMode)
      }
    }
  }
}) 
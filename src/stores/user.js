import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 状态 - 初始化时从localStorage读取token
  const token = ref(localStorage.getItem('token') || '')
  const userInfo = ref({})

  // getter
  const isLoggedIn = computed(() => !!token.value)

  // actions
  // 设置token
  function setToken(newToken) {
    token.value = newToken
    // 保存token到localStorage
    localStorage.setItem('token', newToken)
  }
  // 设置用户信息
  function setUserInfo(info) {
    userInfo.value = info
  }
  // 退出登录
  function logout() {
    token.value = ''
    userInfo.value = {}
    // 清除localStorage中的token
    localStorage.removeItem('token')
  }
  // 保存账号密码和勾选状态
  function saveCredentials(username, password, rememberMe) {
    localStorage.setItem('savedUsername', username)
    localStorage.setItem('savedPassword', password)
    localStorage.setItem('rememberMe', rememberMe)
  }
  // 获取账号密码和勾选状态
  function getCredentials() {
    const username = localStorage.getItem('savedUsername')
    const password = localStorage.getItem('savedPassword')
    const rememberMe = localStorage.getItem('rememberMe') === 'true'
    return username && password ? { username, password, rememberMe } : null
  }
  // 清除账号密码和勾选状态
  function clearCredentials() {
    localStorage.removeItem('savedUsername')
    localStorage.removeItem('savedPassword')
    localStorage.removeItem('rememberMe')
  }

  return {
    // 状态
    token,
    userInfo,
    // getter
    isLoggedIn,
    // actions
    setToken,
    setUserInfo,
    logout,
    saveCredentials,
    getCredentials,
    clearCredentials
  }
}) 
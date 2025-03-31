import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 状态
  const token = ref('1111111')
  const userInfo = ref({})

  // getter
  const isLoggedIn = computed(() => !!token.value)

  // actions
  function setToken(newToken) {
    token.value = newToken
  }

  function setUserInfo(info) {
    userInfo.value = info
  }

  function logout() {
    token.value = ''
    userInfo.value = {}
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
    logout
  }
}) 
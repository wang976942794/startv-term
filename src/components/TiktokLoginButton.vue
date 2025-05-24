<template>
  <button class="social-btn" @click="handleTiktokLogin">
    <img src="@/assets/images/facebook.svg" alt="tiktok">
    <span>{{ t('message.facebook_login') }}</span>
  </button>
</template>

<script setup>
import { getTokenByOauth } from '@/api/login'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { useI18n } from 'vue-i18n'
import { ref, onMounted } from 'vue'

const { t } = useI18n()
const userStore = useUserStore()
const emit = defineEmits(['login-success'])
const clientKey = 'sbawwjfsvg5z0lacsi'

function generateRandomString(length) {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

const handleTiktokLogin = () => {
  const state = generateRandomString(16)
  localStorage.setItem('tiktok_auth_state', state)
  const authUrl = `https://www.tiktok.com/v2/auth/authorize?client_key=${clientKey}&response_type=code&scope=user.info.basic&redirect_uri=https://www.startv.ae/&state=${state}&disable_auto_auth=1`
  window.location.href = authUrl
}

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')
  const state = urlParams.get('state')
  console.log("code",code);
  console.log("state",state);
  // if (code && state) {
  //   const savedState = localStorage.getItem('tiktok_auth_state')
  //   if (state === savedState) {
  //     try {
  //       const response = await getTokenByOauth({
  //         code,
  //         type: 'tiktok',
  //         redirectUrl: window.location.origin
  //       })
  //       if (response.code === 100000) {
  //         userStore.setToken(response.data)
  //         emit('login-success')
  //         window.history.replaceState({}, document.title, window.location.pathname)
  //       } else {
  //         ElMessage.error(response.msg || 'OAuth login failed')
  //       }
  //     } catch (error) {
  //       console.error('OAuth login error:', error)
  //       ElMessage.error('登录失败，请稍后重试')
  //     }
  //   }
  // }
})
</script>

<style scoped>
.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  height: 56px;
  background: transparent;
  border: 1px solid #2C2E31;
  border-radius: 100px;
  color: var(--text-primary);
  font-size: 16px;
  transition: all 0.3s;
  cursor: pointer;
}
.social-btn img {
  width: 28px;
  height: 28px;
}
.social-btn:hover {
  border-color: #D0A944;
  color: #D0A944;
}
</style> 
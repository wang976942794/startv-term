<template>
  <button class="social-btn" @click="handleGoogleLogin">
    <img src="@/assets/images/google.svg" alt="Google">
    <span>{{ t('message.google_login') }}</span>
  </button>
</template>

<script setup>
import { getOAuthUrl, getTokenByOauth } from '@/api/login'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { useI18n } from 'vue-i18n'
import { ref, onMounted } from 'vue'

const { t } = useI18n()
const userStore = useUserStore()
const emit = defineEmits(['login-success'])

const handleGoogleLogin = async () => {
  try {
    const redirectUrl = window.location.origin
    const response = await getOAuthUrl({
      type: 'GOOGLE',
      redirectUrl,
    })
    if (response.code === 100000) {
      window.location.href = response.data
    } else {
      ElMessage.error(response.msg || '获取登录链接失败')
    }
  } catch (error) {
    console.error('Social login error:', error)
    ElMessage.error('登录失败，请稍后重试')
  }
}

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')
  const state = urlParams.get('state')
  if (code && !state) {
    try {
      const response = await getTokenByOauth({
        code: code,
        type: 'GOOGLE',
        redirectUrl: window.location.origin
      })
      if (response.code === 100000) {
        userStore.setToken(response.data)
        emit('login-success')
        window.history.replaceState({}, document.title, window.location.pathname)
      } else {
        ElMessage.error(response.msg || 'OAuth login failed')
      }
    } catch (error) {
      console.error('OAuth login error:', error)
      ElMessage.error('登录失败，请稍后重试')
    }
  }
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
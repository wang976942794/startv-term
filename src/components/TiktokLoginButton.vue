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
  const authUrl = `https://www.tiktok.com/v2/auth/authorize?client_key=${clientKey}&response_type=code&scope=user.info.basic&redirect_uri=${encodeURIComponent(window.location.origin)}&state=${state}`
  window.location.href = authUrl
}
// 用授权码交换访问令牌
const exchangeCodeForToken = async (code) => {
  try {
    // 注意：实际项目中应该调用你的后端API，而不是直接在前端使用client_secret
    const response = await axios.post('https://open.tiktokapis.com/v2/oauth/token/', {
      client_key: clientKey,
      client_secret: clientSecret,
      code: code,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri
    });
    
    const accessToken = response.data.access_token;
    await fetchUserInfo(accessToken);
  } catch (error) {
    console.error('获取访问令牌失败:', error);
  }
};
// 检查URL中是否有授权码（回调后处理）
const checkAuthCode = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const state = urlParams.get('state');
  
  if (code && state) {
    const savedState = localStorage.getItem('tiktok_auth_state');
    if (state === savedState) {
      authCode.value = code;
      exchangeCodeForToken(code);
      // 清除URL中的参数
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }
};

onMounted(async () => {
  checkAuthCode()
  // const urlParams = new URLSearchParams(window.location.search)
  // const code = urlParams.get('code')
  // const state = urlParams.get('state')
  // console.log("code",code);
  // console.log("state",state);
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
<template>
    <el-dialog
        :model-value="visible"
        @update:model-value="$emit('update:visible', $event)"
        width="480px"
        :show-close="false"
        class="login-dialog"
        style="background-color: var(--bg-primary);"
    >
        <div class="login-form">
            <!-- 用户名输入框 -->
            <div class="form-item">
                <label>{{ t('message.Username') }}</label>
                <el-input v-model="username" :placeholder="t('message.your_username')" />
            </div>

            <!-- 密码输入框 -->
            <div class="form-item">
                <label>{{ t('message.Password') }}</label>
                <el-input v-model="password" type="password" :placeholder="t('message.your_password')" show-password />
            </div>

            <!-- 记住我和忘记密码 -->
            <div class="form-options">
                <el-checkbox v-model="rememberMe">{{ t('message.Remember_me') }}</el-checkbox>
                <a href="#" class="forgot-password">{{ t('message.Trouble_logging_in') }}</a>
            </div>

            <!-- 登录按钮 -->
            <button class="login-btn" @click="handleLogin">{{ t('message.Login') }}</button>

            <!-- 第三方登录 -->
            <div class="divider">
                <span>Or Log In With</span>
            </div>

            <div class="social-login">
                <button class="social-btn" @click="handleSocialLogin('GOOGLE')">
                    <img src="@/assets/images/google.svg" alt="Google">
                    <span>{{ t('message.google_login') }}</span>
                </button>
                <!-- <button class="social-btn" @click="handleSocialLogin('FACEBOOK')">
                    <img src="@/assets/images/facebook.svg" alt="Facebook">
                    <span>{{ t('message.facebook_login') }}</span>
                </button>
                <button class="social-btn" @click="handleSocialLogin('APPLE')">
                    <img src="@/assets/images/apple.svg" alt="Apple">
                    <span>{{ t('message.apple_login') }}</span>
                </button> -->
            </div>

            <!-- 服务条款 -->
            <div class="terms">
                <el-checkbox v-model="agreeTerms">
                    {{ t('message.By_creating_an_account') }}
                </el-checkbox>
            </div>
        </div>
    </el-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getOAuthUrl, getTokenByLogin } from '@/api/login'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({
    visible: {
        type: Boolean,
        required: true
    }
})

// 正确定义 emit
const emit = defineEmits(['update:visible'])

const userStore = useUserStore()
const username = ref('lhg@123.com')
const password = ref('123456')
const rememberMe = ref(false)
const agreeTerms = ref(false)

// 组件加载时读取保存的账号密码和勾选状态
onMounted(() => {
    const savedCredentials = userStore.getCredentials()
    if (savedCredentials) {
        username.value = savedCredentials.username
        password.value = savedCredentials.password
        rememberMe.value = savedCredentials.rememberMe
    }
})

// 处理第三方登录
const handleSocialLogin = async (type) => {
    try {
        // 使用完整的重定向URL，包含协议
        const redirectUrl = window.location.origin  // 添加回调路径
        const response = await getOAuthUrl({
            type,
            redirectUrl
        })
        console.log(response)
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

const handleLogin = async () => {
    try {
        const response = await getTokenByLogin({
            email: username.value,
            password: password.value
        })
        
        if (response.code === 100000) {
            // 保存账号密码和勾选状态
            if (rememberMe.value) {
                userStore.saveCredentials(username.value, password.value, rememberMe.value)
            } else {
                userStore.clearCredentials()
            }
            userStore.setToken(response.data)
            emit('update:visible', false)
        } else if (response.code === 100106) {
            // 密码错误的处理
            ElMessage.error(t('message.Incorrect_password'))
        } else {
            ElMessage.error(response.msg || '')
        }
    } catch (error) {
        console.error('Login error:', error)
        ElMessage.error('登录失败，请稍后重试')
    }
}
</script>

<style lang="scss" scoped>
.login-dialog {
    :deep(.el-overlay-dialog) {
        .el-dialog {
            background: #0D1117 !important;
            border-radius: 12px;
            
            .el-dialog__header {
                padding: 32px;
                margin: 0;
                border-bottom: 1px solid #2C2E31;
                
                .el-dialog__title {
                    color: var( --text-primary);
                    font-size: 32px;
                    font-weight: 700;
                    line-height: 1.2;
                }
            }

            .el-dialog__body {
                padding: 32px;
                color: var( --text-primary);
            }
        }
    }

    .login-form {
        .form-item {
            margin-bottom: 24px;

            label {
                display: block;
                margin-bottom: 12px;
                color: var( --text-primary);
                font-size: 18px;
                font-weight: 500;
            }
        }

        :deep(.el-input) {
            .el-input__wrapper {
                background: transparent;
                border: 1px solid #D0A944;
                border-radius: 100px;
                box-shadow: none !important;
                height: 56px;
                padding: 0 24px;

                &.is-focus {
                    border-color: #D0A944;
                }

                .el-input__inner {
                    color: var( --text-primary);
                    font-size: 16px;
                    
                    &::placeholder {
                        color: rgba(255, 255, 255, 0.6);
                    }
                }
            }
        }

        .form-options {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 32px;

            :deep(.el-checkbox) {
                .el-checkbox__input {
                    .el-checkbox__inner {
                        background-color: transparent;
                        border-color: #D0A944;
                        border-radius: 4px;
                        width: 20px;
                        height: 20px;
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        &::after {
                            border-color: var( --text-primary);
                            height: 9px;
                            width: 4px;
                            left: 7px;
                            top: 3px;
                        }
                    }

                    &.is-checked {
                        .el-checkbox__inner {
                            background-color: #D0A944;
                            border-color: #D0A944;
                        }
                    }
                }

                .el-checkbox__label {
                    color: #88888C;
                    font-size: 14px;
                }
            }

            .forgot-password {
                color: #D0A944;
                text-decoration: none;
                font-size: 16px;
                font-weight: 600;

                &:hover {
                    text-decoration: underline;
                }
            }
        }

        .login-btn {
            width: 100%;
            height: 56px;
            background: linear-gradient(180deg, #F0D89A 0%, #D0A944 100%);
            border: none;
            border-radius: 100px;
            color: var( --text-primary);
            font-size: 16px;
            font-weight: 600;
             
            margin-bottom: 32px;
            transition: opacity 0.3s;

            &:hover {
                opacity: 0.9;
            }
        }

        .divider {
            text-align: center;
            margin-bottom: 32px;
            position: relative;
            color: rgba(255, 255, 255, 0.6);
            font-size: 14px;

            &::before, &::after {
                content: '';
                position: absolute;
                top: 50%;
                width: calc(50% - 80px);
                height: 1px;
                background: #2C2E31;
            }

            &::before { left: 0; }
            &::after { right: 0; }
        }

        .social-login {
            display: flex;
            flex-direction: column;
            gap: 16px;
            margin-bottom: 32px;

            .social-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 12px;
                height: 56px;
                background: transparent;
                border: 1px solid #2C2E31;
                border-radius: 100px;
                color: var( --text-primary);
                font-size: 16px;
                 
                transition: all 0.3s;
                cursor: pointer;

                img {
                    width: 28px;
                    height: 28px;
                }

                &:hover {
                    border-color: #D0A944;
                    color: #D0A944;
                }

                &:active {
                    transform: scale(0.98);
                }
            }
        }

        .terms {
            :deep(.el-checkbox) {
                align-items: flex-start;
                
                .el-checkbox__input {
                    margin-top: 3px;
                    
                    .el-checkbox__inner {
                        background-color: transparent;
                        border-color: #D0A944;
                        border-radius: 4px;
                        width: 20px;
                        height: 20px;
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        &::after {
                            border-color: var( --text-primary);
                            height: 9px;
                            width: 4px;
                            left: 7px;
                            top: 3px;
                        }
                    }

                    &.is-checked {
                        .el-checkbox__inner {
                            background-color: #D0A944;
                            border-color: #D0A944;
                        }
                    }
                }

                .el-checkbox__label {
                    color: #88888C;
                    font-size: 14px;
                    line-height: 1.5;
                    white-space: normal;
                    word-break: break-word;
                    padding-top: 0;
                }
            }
        }
    }
}
</style> 
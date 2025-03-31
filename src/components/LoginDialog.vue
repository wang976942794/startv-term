<template>
    <el-dialog
        :model-value="visible"
        @update:model-value="$emit('update:visible', $event)"
        width="480px"
        :show-close="false"
        class="login-dialog"
        style="background-color: #081420;"
    >
        <div class="login-form">
            <!-- 用户名输入框 -->
            <div class="form-item">
                <label>Username</label>
                <el-input v-model="username" placeholder="Username" />
            </div>

            <!-- 密码输入框 -->
            <div class="form-item">
                <label>Password</label>
                <el-input v-model="password" type="password" placeholder="Password" show-password />
            </div>

            <!-- 记住我和忘记密码 -->
            <div class="form-options">
                <el-checkbox v-model="rememberMe">Remember Me</el-checkbox>
                <a href="#" class="forgot-password">Trouble Logging in?</a>
            </div>

            <!-- 登录按钮 -->
            <button class="login-btn">Login</button>

            <!-- 第三方登录 -->
            <div class="divider">
                <span>Or Log In With</span>
            </div>

            <div class="social-login">
                <button class="social-btn">
                    <img src="@/assets/images/google.svg" alt="Google">
                    <span>Log in with Google</span>
                </button>
                <button class="social-btn">
                    <img src="@/assets/images/facebook.svg" alt="Facebook">
                    <span>Log in with Facebook</span>
                </button>
                <button class="social-btn">
                    <img src="@/assets/images/apple.svg" alt="Apple">
                    <span>Log in with Apple</span>
                </button>
            </div>

            <!-- 服务条款 -->
            <div class="terms">
                <el-checkbox v-model="agreeTerms">
                    By creating an account, I agree to start tv's Terms of Service and Privacy Policy.
                </el-checkbox>
            </div>
        </div>
    </el-dialog>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
    visible: {
        type: Boolean,
        required: true
    }
})

defineEmits(['update:visible'])

const username = ref('')
const password = ref('')
const rememberMe = ref(false)
const agreeTerms = ref(false)
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
                    color: #fff;
                    font-size: 32px;
                    font-weight: 700;
                    line-height: 1.2;
                }
            }

            .el-dialog__body {
                padding: 32px;
                color: #fff;
            }
        }
    }

    .login-form {
        .form-item {
            margin-bottom: 24px;

            label {
                display: block;
                margin-bottom: 12px;
                color: #fff;
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
                    color: #fff;
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
                            border-color: #fff;
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
            color: #fff;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
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
                color: #fff;
                font-size: 16px;
                cursor: pointer;
                transition: all 0.3s;

                img {
                    width: 28px;
                    height: 28px;
                }

                // &:hover {
                //     border-color: #D0A944;
                //     color: #D0A944;
                // }
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
                            border-color: #fff;
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
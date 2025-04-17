<template>
    <div class="footer">
        <div class="footer-top">
            <div class="footer-content">
                <img src="@/assets/images/logo-1.svg" alt="START TV">
                <span>START TV</span>
            </div>
            <div class="footer-right">
                <div class="footer-right-top">
                    <p class="first"><a href="">{{ $t('message.ABOUT') }}</a></p>
                    <div class="footer-right-top-bottom">
                        <p> <a href="">{{ $t('message.Contact_Us') }}</a></p>
                        <p> <a href="">{{ $t('message.Terms_of_Service') }}</a></p>
                        <p> <a href="">{{ $t('message.Privacy_Policy') }}</a></p>
                    </div>
                </div>
                <div class="footer-right-top">
                    <p class="first"><a href="">{{ $t('message.Company') }}</a></p>
                    <div class="footer-right-top-bottom">
                        <p> <a href="">{{ $t('message.Feedback') }}</a></p>
                        <p> <a href="">{{ $t('message.Media_Public_Relations') }}</a></p>
                        <p> <a href="">{{ $t('message.Contact_Us') }}</a></p>
                    </div>
                </div>
                <div class="footer-right-top">
                    <p class="first"><a href="">Contact</a></p>
                    <div class="qr">

                    </div>
                </div>
            </div>

        </div>
        <div class="footer-bottom">
            <div class="footer-bottom-left">
                <p>{{ $t('message.All_rights_reserved') }}</p>
            </div>
            <div class="footer-bottom-right">
                <img src="@/assets/images/tiktok.svg" alt="">
                <img src="@/assets/images/youtobe.svg" alt="">
                <img src="@/assets/images/facebook.svg" alt="">
                <img src="@/assets/images/ins.svg" alt="">
            </div>

        </div>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
// 无需额外的 script 逻辑
</script>

<style lang="scss" scoped>
@mixin responsive-scale {
    transition: all 0.3s ease-in-out;

    @media screen and (min-width: 500px) and (max-width: 1439px) {
        @content;
    }
}

.footer {
    width: 100%;
    height: 367px;
    padding: 0px 60px;
    background-color: var(--bg-primary);
    @include responsive-scale {
        height: calc(1024 / 1440 * 367px);
        padding: 0px calc(1024 / 1440 * 60px);
    }

    .footer-top {
        width: 100%;
        height: 281px;
        padding: 64px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;

        @include responsive-scale {
            height: calc(1024 / 1440 * 281px);
            padding: calc(1024 / 1440 * 64px) 0;
        }

        .footer-content {
            display: flex;
            align-items: center;
            gap: 12px;
            width: 176px;
            height: 48px;

            @include responsive-scale {
                width: calc(1024 / 1440 * 176px);
                height: calc(1024 / 1440 * 48px);
                gap: calc(1024 / 1440 * 12px);
            }

            img {
                width: 48px;
                height: 48px;

                @include responsive-scale {
                    width: calc(1024 / 1440 * 48px);
                    height: calc(1024 / 1440 * 48px);
                }
            }

            span {
                font-size: 24px;
                font-weight: 600;
                color: var( --text-primary);

                @include responsive-scale {
                    font-size: calc(1024 / 1440 * 24px);
                }
            }
        }

        .footer-right {
            width: 728px;
            height: 153px;
            color: #B4B4B8;
            display: flex;
            align-items: center;
            justify-content: space-between;

            @include responsive-scale {
                width: calc(1024 / 1440 * 728px);
                height: calc(1024 / 1440 * 153px);
            }

            .footer-right-top {
                width: 200px;
                height: 151px;

                @include responsive-scale {
                    width: calc(1024 / 1440 * 200px);
                    height: calc(1024 / 1440 * 151px);
                }

                .first {
                    font-size: 20px;
                    font-weight: 600;
                    margin-bottom: 32px;
                    color: var( --text-primary);

                    @include responsive-scale {
                        font-size: calc(1024 / 1440 * 20px);
                        margin-bottom: calc(1024 / 1440 * 32px);
                    }
                }

                .footer-right-top-bottom {

                    height: 92px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    font-size: 16px;

                    @include responsive-scale {
                        font-size: calc(1024 / 1440 * 16px);
                        height: calc(1024 / 1440 * 92px);
                    }
                }
            }

            .qr {
                width: 94px;
                height: 94px;
                background-color: #B4B4B8;
                border-radius: 12px;

                @include responsive-scale {
                    width: calc(1024 / 1440 * 94px);
                    height: calc(1024 / 1440 * 94px);
                    border-radius: calc(1024 / 1440 * 12px);
                }
            }
        }
    }

    .footer-bottom {
        width: 100%;
        height: 86px;
        border-top: 1px solid var( --text-primary);
        display: flex;
        align-items: center;
        justify-content: space-between;

        @include responsive-scale {
            height: calc(1024 / 1440 * 86px);
        }

        .footer-bottom-left {
            width: 340px;
            height: 22px;
            font-size: 16px;
            font-weight: 400;
            color: #B4B4B8;

            @include responsive-scale {
                width: calc(1024 / 1440 * 340px);
                height: calc(1024 / 1440 * 22px);
                font-size: calc(1024 / 1440 * 16px);
            }
        }

        .footer-bottom-right {
            width: 176px;
            height: 22px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            @include responsive-scale {
                width: calc(1024 / 1440 * 176px);
                height: calc(1024 / 1440 * 22px);
            }

            img {
                width: 20px;
                height: 20px;

                @include responsive-scale {
                    width: calc(1024 / 1440 * 20px);
                    height: calc(1024 / 1440 * 20px);
                }
            }
        }
    }


}
</style>
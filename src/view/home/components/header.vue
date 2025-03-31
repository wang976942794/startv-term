<template>
    <div class="header">
        <div class="header-content">
            <div class="tag">New Release</div>
            <h1 class="title">Heiress Crash Lands on Her Husband</h1>
            <div class="action">
                <button class="play-btn">
                    <img src="@/assets/images/play.svg" alt="Play" class="play-icon">
                    Play
                </button>
            </div>
        </div>
        <div class="header-right">

            <div class="header-right-content-item">
                <img src="@/assets/images/image.png" alt="Play">
            </div>
            <div class="header-right-content-item">
                <img src="@/assets/images/image.png" alt="Play">
            </div>
            <div class="header-right-content-item">
                <img src="@/assets/images/image.png" alt="Play">
            </div>
            <div class="header-right-content-item">
                <img src="@/assets/images/image.png" alt="Play">
            </div>

        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
// 响应式缩放 mixin
@mixin responsive-scale {
    transition: all 0.3s ease-in-out;

    @media screen and (min-width: 500px) and (max-width: 1439px) {
        @content;
    }
}

.header {
    width: 100%;
    height: 450px;
    background-color: #0d1117;
    position: relative;
    background-image: linear-gradient(to top,
            rgba(13, 17, 23, 0.7), // 底部稍微深一些
            rgba(13, 17, 23, 0.2) // 顶部更透明
        ), url('@/assets/images/image.png');
    background-size: cover;
    background-position: top 10% center; // 改为 top center 确保显示顶部
    overflow: hidden; // 添加 overflow: hidden 来隐藏超出部分

    @include responsive-scale {
        height: calc(1024 / 1440 * 450px);
        padding: calc(1024 / 1440 * 32px) calc(1024 / 1440 * 32px);
    }

    .header-content {
        width: 626px;
        height: 210px;
        position: absolute;
        bottom: 0px;
        left: 0px;
        padding: 32px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        @include responsive-scale {
            width: calc(1024 / 1440 * 626px);
            height: calc(1024 / 1440 * 210px);
            padding: calc(1024 / 1440 * 32px) calc(1024 / 1440 * 32px);
        }
    }

    .tag {
        width: 103px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        background-color: #ff4b81;
        color: white;
        border-radius: 16px;
        font-size: 14px;
        font-weight: 600;

        @include responsive-scale {
            width: calc(1024 / 1440 * 103px);
            height: calc(1024 / 1440 * 26px);
            font-size: calc(1024 / 1440 * 14px);
            line-height: calc(1024 / 1440 * 26px);
        }
    }

    .title {
        color: white;
        font-size: 32px;
        font-weight: 700;

        @include responsive-scale {
            font-size: calc(1024 / 1440 * 32px);
        }
    }

    .play-btn {
        width: 83px;
        height: 38px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(180deg, #F0D89A 0%, #D0A944 100%);
        color: #fff;
        border: none;
        border-radius: 40px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        padding: 6px 12px;

        @include responsive-scale {
            width: calc(1024 / 1440 * 83px);
            height: calc(1024 / 1440 * 38px);
            font-size: calc(1024 / 1440 * 16px);
        }



        .play-icon {
            margin-right: 8px;
            font-size: 14px;

            @include responsive-scale {
                width: calc(1024 / 1440 * 14px);
                height: calc(1024 / 1440 * 14px);
            }
        }
    }

    .header-right {
        width: 224px;
        height: 450px;
        padding: 32px;
        position: absolute;
        right: 0;
        top: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        @include responsive-scale {
            width: calc(1024 / 1440 * 224px);
            height: calc(1024 / 1440 * 450px);
            padding: calc(1024 / 1440 * 32px) calc(1024 / 1440 * 32px);
        }

        .header-right-content-item {
            width: 160px;
            height: 84px;
            border: 2px solid #FFFFFF;
            border-radius: 12px;
           

            @include responsive-scale {
                width: calc(1024 / 1440 * 160px);
                height: calc(1024 / 1440 * 84px);
            }

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: top center;
                border-radius: 12px;

            }
        }
    }
}
</style>
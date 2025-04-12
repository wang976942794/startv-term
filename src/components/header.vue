<template>
    <div class="header">
        <!-- Logo区域 -->
        <div class="flex items-center">

            <div class="logo">
                <img src="../assets/images/logo.svg" alt="START TV" />
            </div>
            <el-menu :router="true" mode="horizontal" :ellipsis="false" class="nav-menu" background-color="transparent" :default-active="currentPath">
                <el-menu-item index="/" class="menu-item">Home</el-menu-item>
                <el-menu-item index="/genre" class="menu-item">Genre</el-menu-item>
                <el-menu-item index="/fandom" class="menu-item">Fandom</el-menu-item>
            </el-menu>

        </div>

        <!-- 搜索框 -->
        <div class="search-container">
            <el-input v-model="searchText" placeholder="Search..." clearable @focus="showDropdown = true"
                @blur="handleBlur">
                <template #prefix>
                    <img src="@/assets/images/search-icon.svg" alt="search" class="search-icon">
                </template>
            </el-input>

            <!-- 搜索下拉框 -->
            <div class="search-dropdown" v-show="showDropdown">
                <!-- <div class="dropdown-header">
                    <span>{{ searchText || '热门搜索' }}</span>
                    <button class="close-btn" @click="showDropdown = false">
                        <span class="close-icon">×</span>
                    </button>
                </div> -->

                <!-- 热门电影 -->
                <div class="section">
                    <h3>热门电影</h3>
                    <div class="movie-list">
                        <div class="movie-item" v-for="movie in hotMovies" :key="movie.title">
                            <span class="fire-icon">🔥</span>
                            <span class="movie-title">{{ movie.title }}</span>
                        </div>
                    </div>
                </div>

                <!-- 热门搜索 -->
                <div class="section">
                    <h3>热门搜索</h3>
                    <div class="tag-list">
                        <div class="tag" v-for="tag in searchTags" :key="tag">
                            {{ tag }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 右侧功能区 -->
        <div class="right-section">
            <!-- 下载 -->
            <div class="download-wrapper">
                <el-button class="download-btn" type="warning" @click="showDownloadQR = !showDownloadQR">
                    <img src="@/assets/images/arrow-square-down.svg" alt="Download">
                    Down load
                </el-button>

                <!-- 下载二维码悬浮框 -->
                <div class="download-dropdown" v-show="showDownloadQR">
                    <div class="download-content">
                        <p>Scan QR code to<br> download START TV App</p>
                        <div class="download-buttons">
                            <button class="platform-btn android">
                                <img src="@/assets/images/android.svg" alt="Android">
                                Android
                            </button>
                            <button class="platform-btn ios">
                                <img src="@/assets/images/ios.svg" alt="iOS">
                                iOS
                            </button>
                        </div>
                        <p class="download-tip">Download on iOS or Android</p>
                    </div>
                    <div class="qr-code">
                        <!-- <img src="@/assets/images/qr-code.png" alt="QR Code"> -->
                    </div>

                </div>
            </div>
            <!-- 历史 -->
            <div class="timer-btn" @click="showHistoryMenu = !showHistoryMenu">
                <img src="@/assets/images/timer.svg" alt="History">
                <!-- 历史菜单悬浮窗 -->
                <div class="history-dropdown" v-show="showHistoryMenu">
                    <div class="history-nav">
                        <div class="history-nav-item" >
                            History
                        </div>
                        <div class="history-nav-item"> 
                            myList
                        </div>
                    </div>
                    <div class="history-content">
                        <div class="history-item">
                            <div class="history-left">
                                <img src="@/assets/images/image.png" alt="">
                            </div>
                            <div class="history-right">
                                <div class="history-right-top">Open Your Eyes, MyBillionaire Husband</div>
                                <div class="history-right-bottom">
                                    <span class="history-right-bottom-icon"></span>
                                    <span class="history-right-bottom-text">Played to Episode 1</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 语言 -->
            <div class="timer-btn">
                <img src="@/assets/images/langauge.svg" alt="Download">
            </div>
            <!-- 头像 -->
            <div class="timer-btn-user" @click="handleUserClick">
                <img src="@/assets/images/user.svg" alt="User">
                <!-- 用户菜单悬浮窗 -->
                <div class="user-dropdown" v-show="showUserMenu && isLoggedIn">
                    <router-link to="/user/wallet" class="menu-item">
                        <img src="@/assets/images/wallet.svg" alt="wallet">
                        My wallet
                    </router-link>
                    <router-link to="/user/list" class="menu-item">
                        <img src="@/assets/images/list.svg" alt="list">
                        My list
                    </router-link>
                    <router-link to="/user/history" class="menu-item">
                        <img src="@/assets/images/history.svg" alt="history">
                        History
                    </router-link>
                    <router-link to="/user/points" class="menu-item">
                        <img src="@/assets/images/points.svg" alt="points">
                        Points Center
                    </router-link>
                    <div class="menu-item" @click="handleLogout">
                        <img src="@/assets/images/logout.svg" alt="logout">
                        Log out
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 添加登录弹窗 -->
    <LoginDialog v-model:visible="showLoginDialog" />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import LoginDialog from './LoginDialog.vue'

const route = useRoute()
const currentPath = ref(route.path)

const searchText = ref('')
const showDropdown = ref(false)
const showLoginDialog = ref(false)
const showUserMenu = ref(false)
const showDownloadQR = ref(false)
const showHistoryMenu = ref(false)
const isLoggedIn = ref(false) // 你需要根据实际情况设置这个值
// 模拟数据
const hotMovies = ref([
    { title: 'Saved by the Sexy Cowboy' },
    { title: 'Money, Guns, and a Merry Christmas' },
    { title: 'Claimed by the Alpha I Hate' },
    { title: 'Move Aside! I\'m the Final Boss' },
    { title: 'Mommy Don\'t Cry, Daddy is Sorry' }
])

const searchTags = ref([
    'Enemies to Lovers',
    'Hidden',
    'Enemies to Lovers'
])

const handleBlur = (e) => {
    // 检查点击是否在下拉框内
    const isClickInDropdown = e.relatedTarget && e.relatedTarget.closest('.search-dropdown')
    if (!isClickInDropdown) {
        showDropdown.value = false
    }
}

// 点击外部关闭菜单
onMounted(() => {
    document.addEventListener('click', (e) => {
        const userBtn = e.target.closest('.timer-btn-user')
        if (!userBtn) {
            showUserMenu.value = false
        }
    })
})

// 点击外部关闭下载框
onMounted(() => {
    document.addEventListener('click', (e) => {
        const downloadWrapper = e.target.closest('.download-wrapper')
        if (!downloadWrapper) {
            showDownloadQR.value = false
        }
    })
})

// 修改历史菜单的点击监听器
onMounted(() => {
    // 为历史菜单添加点击事件，阻止冒泡
    const historyDropdown = document.querySelector('.history-dropdown')
    if (historyDropdown) {
        historyDropdown.addEventListener('click', (e) => {
            e.stopPropagation()
        })
    }

    // 为历史按钮添加点击事件，阻止冒泡
    const historyBtn = document.querySelector('.timer-btn')
    if (historyBtn) {
        historyBtn.addEventListener('click', (e) => {
            e.stopPropagation()
        })
    }

    // 文档点击事件
    document.addEventListener('click', () => {
        showHistoryMenu.value = false
    })
})

// 监听路由变化
watch(() => route.path, (newPath) => {
    currentPath.value = newPath
}, { immediate: true })

// 处理用户头像点击
const handleUserClick = () => {
    if (isLoggedIn.value) {
        showUserMenu.value = !showUserMenu.value
    } else {
        showLoginDialog.value = true
    }
}
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
    // position: fixed;
    // top: 0;
    // left: 0;
    // right: 0;
    // z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100px;
    padding: 27px 32px;
    background-color: #0d1117;

    @include responsive-scale {
        height: calc(1024 / 1440 * 100px);
        padding: calc(1024 / 1440 * 27px) calc(1024 / 1440 * 32px);
    }

    .logo {
        display: flex;
        align-items: center;
        width: 192px;
        height: 46px;
        margin-right: 15px;

        @include responsive-scale {
            width: calc(1024 / 1440 * 192px);
            height: calc(1024 / 1440 * 46px);
            margin-right: calc(1024 / 1440 * 15px);
        }

        img {
            height: 46px;

            @include responsive-scale {
                height: calc(1024 / 1440 * 46px);
            }
        }
    }

    .nav-menu {
        background-color: transparent;
        border: none;
        width: 227px;
        height: 46px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;

        :deep(.el-menu-item) {
            height: 46px;
            line-height: 46px;
            font-size: 16px;
            padding: 0 12px;
            color: #fff;
            // border-bottom: 2px solid transparent;

            @include responsive-scale {
                height: calc(1024 / 1440 * 46px);
                line-height: calc(1024 / 1440 * 46px);
                font-size: calc(1024 / 1440 * 16px);
                padding: 0 calc(1024 / 1440 * 12px);
            }

            &:not(.is-active) {
                color: #FFFFFF;
                border: none !important;
            }

            &:hover {
                color: #D0A944;
                background-color: transparent;
            }

            &.is-active {
                color: #D0A944 !important;
                border: none !important;
                background-color: transparent !important;

                font-weight: 700;
            }

            &::before {
                display: none !important;
            }

            &:focus {
                background-color: transparent !important;
            }
        }
    }

    .search-container {
        position: relative;
        width: 360px;

        @include responsive-scale {
            width: calc(1024 / 1440 * 360px);
        }

        .search-dropdown {
            position: absolute;
            top: 100%;
            left: 0;
            width: 360px;
            background: #1A1D1F;
            border-radius: 8px;
            padding: 16px;
            margin-top: 8px;
            z-index: 1000;

            .dropdown-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 24px;
                color: #fff;
                font-size: 14px;

                .close-btn {
                    background: none;
                    border: none;
                     
                    padding: 4px;

                    .close-icon {
                        font-size: 20px;
                        color: rgba(255, 255, 255, 0.6);
                        line-height: 1;
                    }
                }
            }

            .section {
                margin-bottom: 24px;

                &:last-child {
                    margin-bottom: 0;
                }

                h3 {
                    color: #fff;
                    font-size: 14px;
                    font-weight: 600;
                    margin-bottom: 16px;
                }

                .movie-list {
                    .movie-item {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        padding: 8px 0;
                        color: #fff;
                         

                        &:hover {
                            color: #D0A944;
                        }

                        .fire-icon {
                            font-size: 16px;
                        }

                        .movie-title {
                            font-size: 14px;
                        }
                    }
                }

                .tag-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;

                    .tag {
                        padding: 6px 12px;
                        background: #101D2B;
                        border: 1px solid #2C2E31;
                        border-radius: 100px;
                        color: #FFFFFF;
                        font-size: 14px;
                         

                        &:hover {

                            color: #D0A944;
                        }
                    }
                }
            }
        }
    }

    .right-section {
        display: flex;
        align-items: center;
        width: 300px;
        height: 40px;
        gap: 8px;

        @include responsive-scale {
            width: calc(1024 / 1440 * 300px);
            height: calc(1024 / 1440 * 40px);
            gap: calc(1024 / 1440 * 8px);
        }



        .el-button.is-circle {
            width: 32px;
            height: 32px;
            background-color: transparent;
            border-color: #30363d;
            color: #fff;

            &:hover {
                background-color: #21262d;
            }
        }

        .el-avatar {
            @include responsive-scale {
                --el-avatar-size: calc(1024 / 1440 * 32px);
            }
        }

        .timer-btn {
            width: 46px;
            height: 46px;
            color: #fff;
            border-radius: 50%;
            border: 1px solid #2C2E31;
            display: flex;
            align-items: center;
            justify-content: center;

            @include responsive-scale {
                width: calc(1024 / 1440 * 46px);
                height: calc(1024 / 1440 * 46px);
            }

            img {
                width: 24px;
                height: 24px;

                @include responsive-scale {
                    width: calc(1024 / 1440 * 24px);
                    height: calc(1024 / 1440 * 24px);
                }
            }
        }

        .timer-btn-user {
            position: relative;
            width: 46px;
            height: 46px;
            color: #fff;
            border-radius: 50%;
            border: 1px solid #2C2E31;
            display: flex;
            align-items: center;
            justify-content: center;
             
            transition: all 0.3s;

            &:hover {
                border-color: #D0A944;
            }

            @include responsive-scale {
                width: calc(1024 / 1440 * 46px);
                height: calc(1024 / 1440 * 46px);
            }

            img {
                width: 46px;
                height: 46px;

                @include responsive-scale {
                    width: calc(1024 / 1440 * 46px);
                    height: calc(1024 / 1440 * 46px);
                }
            }

            .user-dropdown {
                position: absolute;
                top: calc(100% + 8px);
                right: 0;
                width: 240px;
                background: #1A1D1F;
                border-radius: 20px;
                padding: 16px 20px;
                z-index: 1000;

                @include responsive-scale {
                    width: calc(1024 / 1440 * 200px);
                    padding: calc(1024 / 1440 * 8px) calc(1024 / 1440 * 20px);
                    border-radius: calc(1024 / 1440 * 20px);
                }

                .menu-item {
                    width: 100%;
                    height: 48px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    color: #FFFFFF;
                    font-size: 18px;
                     
                    border-radius: 4px;
                    transition: all 0.3s;

                    @include responsive-scale {
                        height: calc(1024 / 1440 * 48px);
                        font-size: calc(1024 / 1440 * 18px);
                        gap: calc(1024 / 1440 * 12px);
                    }

                    img {
                        width: 24px;
                        height: 24px;
                        filter: brightness(0) invert(1);
                        transition: all 0.3s;

                        @include responsive-scale {
                            width: calc(1024 / 1440 * 24px);
                            height: calc(1024 / 1440 * 24px);
                        }
                    }

                    &:hover {
                        background: #21262d;
                        color: #D0A944;

                        img {
                            filter: brightness(0) saturate(100%) invert(71%) sepia(19%) saturate(1095%) hue-rotate(356deg) brightness(89%) contrast(90%);
                        }
                    }
                }
            }
        }
    }
}

:deep(.el-input__wrapper) {
    background: transparent;
    box-shadow: none !important;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 100px;
    padding: 0 16px;

    &:hover,
    &.is-focus {
        border-color: rgba(255, 255, 255, 0.2);
    }

    .el-input__inner {
        color: #fff;
        height: 40px;
        font-size: 14px;

        &::placeholder {
            color: rgba(255, 255, 255, 0.6);
        }
    }
}

.search-icon {
    width: 20px;
    height: 20px;

}

.timer-btn-user {
    width: 46px;
    height: 46px;
    color: #fff;
    border-radius: 50%;
    border: 1px solid #2C2E31;
    display: flex;
    align-items: center;
    justify-content: center;
     
    transition: all 0.3s;

    &:hover {
        border-color: #D0A944;
    }

    @include responsive-scale {
        width: calc(1024 / 1440 * 46px);
        height: calc(1024 / 1440 * 46px);
    }

    img {
        width: 46px;
        height: 46px;

        @include responsive-scale {
            width: calc(1024 / 1440 * 46px);
            height: calc(1024 / 1440 * 46px);
        }
    }
}

.download-wrapper {
    position: relative;

    .download-btn {
        width: 137px;
        height: 46px;
        padding: 8px 15px;
        font-size: 12px;
        background-color: #D0A9441A;
        border-color: #D0A944;
        color: #D0A944;
        border-radius: 30px;

        @include responsive-scale {
            width: calc(1024 / 1440 * 137px);
            height: calc(1024 / 1440 * 46px);
            padding: calc(1024 / 1440 * 8px) calc(1024 / 1440 * 15px);
            font-size: calc(1024 / 1440 * 12px);
        }

        img {
            width: 16px;
            height: 16px;
            margin-right: 8px;

            @include responsive-scale {
                width: calc(1024 / 1440 * 16px);
                height: calc(1024 / 1440 * 16px);
                margin-right: calc(1024 / 1440 * 8px);
            }
        }
    }

    .download-dropdown {
        position: absolute;
        top: calc(100% + 8px);
        left: 50%;
        transform: translateX(-50%);
        width: 470px;
        height: 200px;
        background: #1A1D1F;
        border-radius: 20px;
        padding: 20px 24px;
        z-index: 1000;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: space-between;

        @include responsive-scale {
            width: calc(1024 / 1440 * 470px);
            height: calc(1024 / 1440 * 200px);
            padding: calc(1024 / 1440 * 24px) calc(1024 / 1440 * 24px);
            border-radius: calc(1024 / 1440 * 20px);
        }

        .download-content {
            width: 246px;
            height: 160px;
            text-align: left;
            @include responsive-scale {
                width: calc(1024 / 1440 * 246px);
                height: calc(1024 / 1440 * 160px);
            }
            p {
                color: #FFFFFF;
                font-size: 20px;
                @include responsive-scale {
                    font-size: calc(1024 / 1440 * 20px);
                  
                }
            }

            .download-buttons {
                display: flex;
                gap: 12px;
                margin-top: 53px;
                @include responsive-scale {
                    gap: calc(1024 / 1440 * 12px);
                    margin-top: calc(1024 / 1440 * 53px);
                }

                .platform-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 4px 8px;
                    background: #D0A944;
                    border: none;
                    border-radius: 100px;
                    color: #FFFFFF;
                     
                    font-size: 14px;
                    transition: all 0.3s;

                    @include responsive-scale {
                        padding: calc(1024 / 1440 * 4px) calc(1024 / 1440 * 8px);
                        gap: calc(1024 / 1440 * 8px);
                        font-size: calc(1024 / 1440 * 14px);
                    }

                    img {
                        width: 18px;
                        height: 18px;
                        @include responsive-scale {
                            width: calc(1024 / 1440 * 18px);
                            height: calc(1024 / 1440 * 18px);
                        }
                    }

                 
                }
            }
            .download-tip {
            color: #88888C;
            font-size: 14px;
            margin-top: 8px;

            @include responsive-scale {
                font-size: calc(1024 / 1440 * 14px);    
                margin-top: calc(1024 / 1440 * 8px);
            }
        }
        }


        .qr-code {
            width: 160px;
            height: 160px;
            background: #FFFFFF;
            border-radius: 8px;

            @include responsive-scale {
                width: calc(1024 / 1440 * 160px);
                height: calc(1024 / 1440 * 160px);
                
            }

            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }



       
    }
}

.history-dropdown {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    width: 360px;
    height: 600px;
    background: #1A1D1F;
    border-radius: 30px;
    padding: 16px 20px;
    z-index: 1000;
    .history-nav{
        width: 100%;
        height: 47px;
        display: flex;
        align-items: center;
        gap: 12px;
        border-bottom: 1px solid #2C2E31;
        .history-nav-item{
            width: 63px;
            height: 47px;
            line-height: 47px;
            text-align: center;
            font-size: 18px;
            color: #fff;
            // opacity: 0.7;
            
        }
    }
    .history-content{
        width: 100%;
        height: calc(100% - 47px);
        .history-item{
            width: 100%;
            height: 154px;
            background: #21262D;
            display: flex;
            justify-content: space-between;
            gap: 16px;
           .history-left{
            width: 120px;
            height: 154px;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 16px;
            }
           }
           .history-right{
            width: 200px;
            height: 80px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .history-right-top{
                font-size: 16px;
                color: #fff;
            }
            .history-right-bottom{
                font-size: 14px;
                color: #88888C;
                display: flex;
                align-items: center;
                gap: 4px;
                .history-right-bottom-icon{
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    background:#FD346E;
                    border-radius: 50%;
                }
            }
           }
        }
    }
  
}

.menu-item {
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
     

    &:hover {
        background: rgba(255, 255, 255, 0.1);
    }
}
</style>
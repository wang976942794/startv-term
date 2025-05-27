<template>
    <div class="header">
        <!-- Logo区域 -->
        <div class="flex items-center">

            <div class="logo" @click="handleLogoClick">
                <img src="../assets/images/logo.svg" alt="START TV" />
            </div>
            <el-menu :router="true" mode="horizontal" :ellipsis="false" class="nav-menu" background-color="transparent"
                :default-active="currentPath">
                <el-menu-item index="/" class="menu-item">{{ $t('message.Home') }}</el-menu-item>
                <el-menu-item index="/genre" class="menu-item">{{ $t('message.Genre') }}</el-menu-item>
                <!-- <el-menu-item index="/fandom" class="menu-item">Fandom</el-menu-item> -->
            </el-menu>

        </div>

        <!-- 搜索框 -->
        <div class="search-container">
            <el-input v-model="searchText" :placeholder="$t('message.Search')" clearable @focus="showDropdown = true"
                @blur="handleBlur" @keyup.enter="handleSearch">
                <template #prefix>
                    <img src="@/assets/images/search-icon.svg" alt="search" class="search-icon">
                </template>
            </el-input>

            <!-- 搜索下拉框 -->
            <div class="search-dropdown" v-show="showDropdown">
                <!-- Search Results -->
                <div class="section search-results" v-if="searchResults.length > 0">
                    <h3>{{ $t('message.Search_Results') }}</h3>
                    <div class="movie-list">
                        <div class="movie-item" v-for="item in searchResults" :key="item.bookId"
                            @click="handleSearchResultClick(item)">
                            <img :src="item.fontUrl" class="search-result-img" alt="">
                            <div class="search-result-info">
                                <span class="movie-title">{{ item.title }}</span>
                                <span class="movie-desc">{{ item.brief }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 当没有搜索结果时显示热门内容 -->
                <template v-else>
                    <!-- 热门电影 -->
                    <div class="section">
                        <h3>{{ $t('message.Hot_Movies') }}</h3>
                        <div class="movie-list">
                            <div class="movie-item" v-for="movie in hotMovies" :key="movie.title">
                                <span class="fire-icon">🔥</span>
                                <span class="movie-title" style="color: var(--text-primary);">{{
                                    movie.bookInfoResp.title }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- 热门搜索 -->
                    <div class="section">
                        <h3>{{ $t('message.Trending_Searches') }}</h3>
                        <div class="tag-list">
                            <div class="tag" v-for="tag in searchTags" :key="tag">
                                {{ tag }}
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>

        <!-- 右侧功能区 -->
        <div class="right-section">
            <!-- 下载 -->
            <div class="download-wrapper">
                <el-button class="download-btn" type="warning" @click="handleDownloadClick">
                    <img src="@/assets/images/arrow-square-down.svg" alt="Download">
                    {{ $t('message.Download') }}
                </el-button>

                <!-- 下载二维码悬浮框 -->
                <div class="download-dropdown" v-show="showDownloadQR">
                    <div class="download-content">
                        <p>{{ $t('message.Scan_QR_code_to_download_START_TV_App') }}</p>
                        <div class="download-buttons">
                            <button class="platform-btn android">
                                <img src="@/assets/images/android.svg" alt="Android">
                                {{ $t('message.Android') }}
                            </button>
                            <button class="platform-btn ios">
                                <img src="@/assets/images/ios.svg" alt="iOS">
                                {{ $t('message.iOS') }}
                            </button>
                        </div>
                        <p class="download-tip">{{ $t('message.Download_on_iOS_or_Android') }}</p>
                    </div>
                    <div class="qr-code">
                        <qrcode  qrcodeSize="140"></qrcode>
                    </div>

                </div>
            </div>
            <!-- 历史 -->
            <div class="timer-btn" @click="handleHistoryClick">
                <img src="@/assets/images/timer.svg" alt="History">
                <!-- 历史菜单悬浮窗 -->
                <div class="history-dropdown" v-show="showHistoryMenu">
                    <div class="history-nav">
                        <div class="history-nav-item" :class="{ active: activeHistoryTab === 0 }"
                            @click="activeHistoryTab = 0">
                            {{ $t('message.History') }}
                        </div>
                        <div class="history-nav-item" :class="{ active: activeHistoryTab === 1 }"
                            @click="activeHistoryTab = 1">
                            {{ $t('message.My_list') }}
                        </div>
                    </div>
                    <div class="history-content">
                        <div class="history-item"
                            v-for="item in activeHistoryTab === 0 ? historyStore.historyData : historyStore.chapterCollections"
                            :key="item.bookId" @click="handleHistoryItemClick(item)">
                            <div class="history-left">
                                <img :src="item.fontUrl" alt="">
                            </div>
                            <div class="history-right">
                                <div class="history-right-top">{{ item.title }}</div>
                                <div class="history-right-bottom">
                                    <span class="history-right-bottom-icon"></span>
                                    <span class="history-right-bottom-text">Played to Episode {{ item.watchChapterId
                                    }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <!-- 语言 -->
            <div class="timer-btn language-btn" @click="handleLanguageClick">
                <img src="@/assets/images/langauge.svg" alt="Language">
                <!-- 语言选择悬浮框 -->
                <div class="language-dropdown" v-show="showLanguageMenu" @click.stop>
                    <div class="language-item" :class="{ active: locale === 'en' }" @click="changeLanguage('en')">
                        <span>English</span>
                    </div>
                    <!-- <div class="language-item" 
                         :class="{ active: locale === 'ru' }" 
                         @click="changeLanguage('ru')">
                        <span>Pусск</span>
                    </div> -->
                    <div class="language-item" :class="{ active: locale === 'ar' }" @click="changeLanguage('ar')"
                        :dir="locale === 'ar' ? 'rtl' : 'ltr'">
                        <span>العربية</span>
                    </div>
                </div>
            </div>
            <!-- 主题 -->
            <div class="timer-btn" @click="toggleTheme">
                <img src="@/assets/images/sun.svg" alt="" v-if="isDarkMode">
                <img src="@/assets/images/moon.svg" alt="" v-else>
            </div>
            <!-- 头像 -->
            <div class="timer-btn-user" @click="handleUserClick">
                <img src="@/assets/images/userlogo.svg" alt="User">
                <!-- 用户菜单悬浮窗 -->
                <div class="user-dropdown" v-show="showUserMenu && isLoggedIn">
                    <router-link to="/user/wallet" class="menu-item">
                        <img src="@/assets/images/wallet.svg" alt="wallet">
                        {{ $t('message.Wallet') }}
                    </router-link>
                    <router-link to="/user/list" class="menu-item">
                        <img src="@/assets/images/list.svg" alt="list">
                        {{ $t('message.My_list') }}
                    </router-link>
                    <router-link to="/user/history" class="menu-item">
                        <img src="@/assets/images/history.svg" alt="history">
                        {{ $t('message.History') }}
                    </router-link>
                    <router-link to="/user/points" class="menu-item">
                        <img src="@/assets/images/points.svg" alt="points">
                        {{ $t('message.Points_Center') }}
                    </router-link>
                    <div class="menu-item" @click="handleLogout">
                        <img src="@/assets/images/logout.svg" alt="logout">
                        {{ $t('message.Log_out') }}
                    </div>
                </div>
            </div>


        </div>
    </div>

    <!-- 添加登录弹窗 -->
    <LoginDialog v-model:visible="showLoginDialog" />
</template>

<script setup>
import { ref, onMounted, watch, computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'  // 导入 userStore
import LoginDialog from './LoginDialog.vue'
import { getHistory, getChapterCollections, findBook, getHotBook } from '@/api/home'
import { useHistoryStore } from '@/stores/history'  // 添加这行
import { useHomeStore } from '@/stores/home'
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { setI18nLanguage } from '@/language';
import qrcode from '@/components/qrcode.vue'

const route = useRoute()
const router = useRouter()  // 获取路由实例
const userStore = useUserStore()  // 使用 userStore
const historyStore = useHistoryStore()  // 添加这行
const homeStore = useHomeStore()
const themeStore = useThemeStore()
const { isDarkMode } = storeToRefs(themeStore)
const currentPath = ref(route.path)

const searchText = ref('')
const showDropdown = ref(false)
const showLoginDialog = ref(false)
const showUserMenu = ref(false)
const showDownloadQR = ref(false)
const showHistoryMenu = ref(false)
const showLanguageMenu = ref(false)

// 使用 userStore 的 isLoggedIn
const isLoggedIn = computed(() => userStore.isLoggedIn)

// 添加activeHistoryTab状态
const activeHistoryTab = ref(0)

// 模拟数据
const hotMovies = ref()

const searchTags = ref([
    'Enemies to Lovers',
    'Hidden',
    'Enemies to Lovers'
])

const searchHistory = ref([])  // Store search history
const searchResults = ref([])  // Store search results

const handleBlur = (e) => {
    // 给一个小延时，让点击事件先触发
    setTimeout(() => {
        // 检查点击是否在下拉框内
        const isClickInDropdown = document.activeElement &&
            (document.activeElement.closest('.search-dropdown') ||
                document.activeElement.closest('.search-container'));

        if (!isClickInDropdown) {
            showDropdown.value = false;
        }
    }, 200);
}

// 在 script setup 中添加一个关闭所有菜单的函数
const closeAllMenus = (exceptMenu = null) => {
    if (exceptMenu !== 'user') showUserMenu.value = false
    if (exceptMenu !== 'history') showHistoryMenu.value = false
    if (exceptMenu !== 'language') showLanguageMenu.value = false
    if (exceptMenu !== 'download') showDownloadQR.value = false
}

// 修改各个点击处理函数
const handleUserClick = (event) => {
    event.stopPropagation()
    if (userStore.isLoggedIn) {
        closeAllMenus('user')
        showUserMenu.value = !showUserMenu.value
    } else {
        showLoginDialog.value = true
    }
}

// 添加其他菜单的点击处理函数
const handleHistoryClick = (event) => {
    event.stopPropagation()
    closeAllMenus('history')
    showHistoryMenu.value = !showHistoryMenu.value
}

const handleLanguageClick = (event) => {
    event.stopPropagation()
    closeAllMenus('language')
    showLanguageMenu.value = !showLanguageMenu.value
}

const handleDownloadClick = (event) => {
    event.stopPropagation()
    closeAllMenus('download')
    showDownloadQR.value = !showDownloadQR.value
}
const getHotBooklist = async () => {
    const response = await getHotBook()
    hotMovies.value = response.data || []

}

onMounted(() => {
    getHotBooklist()
    // 使用单个统一的文档点击事件处理器
    document.addEventListener('click', (e) => {
        const userBtn = e.target.closest('.timer-btn-user')
        const userDropdown = e.target.closest('.user-dropdown')
        const historyBtn = e.target.closest('.timer-btn')
        const historyDropdown = e.target.closest('.history-dropdown')
        const languageBtn = e.target.closest('.language-btn')
        const languageDropdown = e.target.closest('.language-dropdown')
        const downloadWrapper = e.target.closest('.download-wrapper')

        // 如果点击的是空白区域，关闭所有菜单
        if (!userBtn && !userDropdown && !historyBtn && !historyDropdown &&
            !languageBtn && !languageDropdown && !downloadWrapper) {
            closeAllMenus()
        }
    })

    // 为各个下拉菜单添加阻止冒泡
    const dropdowns = [
        '.user-dropdown',
        '.history-dropdown',
        '.language-dropdown',
        '.download-dropdown'
    ]

    dropdowns.forEach(selector => {
        const dropdown = document.querySelector(selector)
        if (dropdown) {
            dropdown.addEventListener('click', (e) => {
                e.stopPropagation()
            })
        }
    })

    // 获取历史记录和章节集合
    historyStore.fetchHistory()
    historyStore.fetchChapterCollections()
    homeStore.fetchUserInfo()

    // Load search history on mount
    const savedHistory = localStorage.getItem('searchHistory')
    if (savedHistory) {
        searchHistory.value = JSON.parse(savedHistory)
    }
})

// 监听路由变化
watch(() => route.path, (newPath) => {
    currentPath.value = newPath
}, { immediate: true })

// 监听登录状态变化
watch(() => userStore.isLoggedIn, (newValue) => {
    if (newValue) {
        // 用户登录后执行这些方法
        historyStore.fetchHistory()
        historyStore.fetchChapterCollections()
        homeStore.fetchUserInfo()
        homeStore.fetchHomePage()
    }
}, { immediate: true }) // immediate: true 会在组件创建时立即执行一次

// 处理历史记录项点击
const handleHistoryItemClick = (item) => {
    // 关闭历史菜单
    showHistoryMenu.value = false
    // 跳转到视频播放页面，并传递必要的参数
    router.push({
        path: '/videoPlay',
        query: {
            bookId: item.bookId,
            chapterId: item.watchChapterId || item.chapterId
        }
    })
}

const toggleTheme = () => {
    themeStore.toggleTheme()
}

const { locale } = useI18n()
const currentLocale = ref(locale.value)

const changeLanguage = (lang) => {
    locale.value = lang
    showLanguageMenu.value = false
    setI18nLanguage(lang)
}

// 在 script setup 中添加 handleLogout 函数
const handleLogout = async () => {
    try {
        // 清除用户状态
        userStore.logout()
        // 关闭用户菜单
        showUserMenu.value = false

    } catch (error) {
        console.error('Logout failed:', error)
    }
}

// Add this function to handle logo clicks
const handleLogoClick = () => {
    router.push('/')
}

// 添加对 searchText 的监听
watch(searchText, (newValue) => {
    // 当搜索框被清空时，清空搜索结果
    if (!newValue || newValue.trim() === '') {
        searchResults.value = []
    }
})

// 修改 handleSearch 函数
const handleSearch = async () => {
    const searchValue = searchText.value.trim()
    if (!searchValue) {
        searchResults.value = []
        return
    }

    try {
        const response = await findBook({ bookName: searchValue })
        console.log("response", response);

        searchResults.value = response.data || []

        // Add to search history if not already present
        if (!searchHistory.value.includes(searchValue)) {
            searchHistory.value.unshift(searchValue)
            // Keep only last 5 searches
            if (searchHistory.value.length > 5) {
                searchHistory.value.pop()
            }
            // Save to localStorage
            localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value))
        }
    } catch (error) {
        console.error('Search failed:', error)
        searchResults.value = []
    }
}

// Handle search result click
const handleSearchResultClick = (item) => {
    console.log("item", item);

    router.push({
        path: '/videoPlay',
        query: {
            bookId: item.bookId,
            chapterId: 1
        }
    })
    showDropdown.value = false
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
    background-color: var(--bg-primary);

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

        &:hover {
            opacity: 0.8;
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
            color: var(--text-primary);
            // border-bottom: 2px solid transparent;

            @include responsive-scale {
                height: calc(1024 / 1440 * 46px);
                line-height: calc(1024 / 1440 * 46px);
                font-size: calc(1024 / 1440 * 16px);
                padding: 0 calc(1024 / 1440 * 12px);
            }

            &:not(.is-active) {
                color: var(--text-primary);
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
            height: 484px;
            background-color: var(--bg-primary);
            border-radius: 8px;
            padding: 16px;
            margin-top: 8px;
            z-index: 1000;

            .dropdown-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 24px;
                color: var(--text-primary);
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
                height: 300px;
                overflow-y: auto;

                &::-webkit-scrollbar {
                    display: none;
                }


                &:last-child {
                    margin-bottom: 0;
                }

                h3 {
                    color: var(--text-primary);
                    font-size: 14px;
                    font-weight: 600;
                    margin-bottom: 16px;
                }

                .movie-list {
                    .movie-item {
                        display: flex;
                        align-items: center;
                        gap: 12px;
                        padding: 12px;
                        border-radius: 8px;
                        transition: all 0.3s;

                        &:hover {
                            background: var(--bg-secondary);
                            color: #D0A944;
                        }

                        .search-result-img {
                            width: 60px;
                            height: 80px;
                            border-radius: 8px;
                            object-fit: cover;
                        }

                        .search-result-info {
                            display: flex;
                            flex-direction: column;
                            gap: 4px;

                            .movie-title {
                                color: var(--text-primary);
                                font-size: 14px;
                                font-weight: 500;
                            }

                            .movie-desc {
                                font-size: 12px;
                                color: var(--text-primary);
                                display: -webkit-box;
                                -webkit-line-clamp: 2;
                                -webkit-box-orient: vertical;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }
                        }
                    }
                }

                .tag-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;

                    .tag {
                        padding: 6px 12px;
                        background-color: var(--bg-primary);
                        border: 1px solid var(--bg-secondary);
                        border-radius: 100px;
                        color: var(--text-primary);
                        font-size: 14px;


                        &:hover {

                            color: #D0A944;
                        }
                    }
                }
            }

            .search-results {
                height: 484px;
                overflow-y: auto;

                &::-webkit-scrollbar {
                    display: none;
                }


            }

            .tag,
            .movie-item {
                cursor: pointer;
                user-select: none; // 防止文本被选中
            }

            .movie-list,
            .tag-list {
                // 确保这些容器可以接收点击事件
                pointer-events: auto;
            }
        }
    }

    .right-section {
        display: flex;
        align-items: center;
        width: 400px;
        height: 40px;
        gap: 8px;

        @include responsive-scale {
            width: calc(1024 / 1440 * 400px);
            height: calc(1024 / 1440 * 40px);
            gap: calc(1024 / 1440 * 8px);
        }



        .el-button.is-circle {
            width: 32px;
            height: 32px;
            background-color: transparent;
            border-color: #30363d;
            color: var(--text-primary);

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
            color: var(--text-primary);
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
                filter: var(--icon-filter);

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
            color: var(--text-primary);
            border-radius: 50%;
            // border: 1px solid var( --text-primary);
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
                right: -50px;
                width: 240px;
                background: var(--bg-primary);
                border-radius: 20px;
                padding: 16px 20px;
                z-index: 1000;
                border: 1px solid var(--bg-secondary);

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
                    color: var(--text-primary);
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
                        filter: var(--icon-filter);
                        transition: all 0.3s;

                        @include responsive-scale {
                            width: calc(1024 / 1440 * 24px);
                            height: calc(1024 / 1440 * 24px);
                        }

                    }

                    &:hover {
                        background: var(--bg-secondary);
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
    background: var(--bg-tertiary);
    box-shadow: none !important;
    border: 1px solid var(--bg-tertiary);
    border-radius: 100px;
    padding: 0 16px;


    &:hover,
    &.is-focus {
        border-color: var(--bg-tertiary);
    }

    .el-input__inner {
        color: var(--text-primary);
        height: 40px;
        font-size: 14px;

        &::placeholder {
            color: #88888C;
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
    color: var(--text-primary);
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
        width: 45px;
        height: 45px;
        border-radius: 50%;

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
        background: var(--bg-primary);
        border: 1px solid var(--bg-secondary);
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
                color: var(--text-primary);
                font-size: 20px;

                @include responsive-scale {
                    font-size: calc(1024 / 1440 * 20px);

                }
            }

            .download-buttons {
                display: flex;
                gap: 12px;
                margin-top: 30px;

                @include responsive-scale {
                    gap: calc(1024 / 1440 * 12px);
                    margin-top: calc(1024 / 1440 * 30px);
                }

                .platform-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 4px 8px;
                    background: #D0A944;
                    border: none;
                    border-radius: 100px;
                    color: var(--text-primary)FFF;

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
            background: #FFF;
            border-radius: 8px;
            padding: 10px;

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
    right: 20px;
    width: 360px;
    height: 600px;
    background: var(--bg-primary);
    border: 1px solid var(--bg-secondary);
    border-radius: 30px;
    padding: 16px 20px;
    z-index: 1000;

    .history-nav {
        width: 100%;
        height: 47px;
        display: flex;
        align-items: center;
        gap: 12px;
        border-bottom: 1px solid var(--bg-secondary);

        .history-nav-item {
            width: 63px;
            height: 47px;
            line-height: 47px;
            text-align: center;
            font-size: 18px;
            color: var(--text-primary);
            opacity: 0.7;
            cursor: pointer;
            transition: all 0.3s;

            &.active {
                opacity: 1;
                position: relative;
                color: #D0A944;

                &::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background: #D0A944;
                }
            }
        }
    }

    .history-content {
        margin-top: 16px;
        width: 100%;
        height: calc(100% - 47px);
        overflow-y: auto;
        scrollbar-width: none;
        /* Firefox */
        -ms-overflow-style: none;

        /* IE and Edge */
        &::-webkit-scrollbar {
            display: none;
            /* Chrome, Safari and Opera */
        }

        .history-item {
            width: 100%;
            height: 154px;
            // background: var(--bg-secondary);
            margin-bottom: 16px;
            display: flex;
            justify-content: space-between;
            gap: 16px;
            overflow-y: auto;


            .history-left {
                width: 120px;
                height: 154px;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 16px;
                    filter: none !important;
                }
            }

            .history-right {
                width: 200px;
                height: 80px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .history-right-top {
                    font-size: 16px;
                    color: var(--text-primary);
                }

                .history-right-bottom {
                    font-size: 14px;
                    color: #88888C;
                    display: flex;
                    align-items: center;
                    gap: 4px;

                    .history-right-bottom-icon {
                        display: inline-block;
                        width: 8px;
                        height: 8px;
                        background: #FD346E;
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

.theme-switch {
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    background: var(--bg-secondary);
    margin-right: 15px;
}

.icon-moon,
.icon-sun {
    font-size: 20px;
    color: var(--text-primary);
}

.language-dropdown {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    width: 200px;
    background: var(--bg-primary);
    border: 1px solid var(--bg-secondary);
    border-radius: 16px;
    padding: 8px;
    z-index: 1000;

    .language-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        color: var(--text-primary);
        font-size: 16px;
        cursor: pointer;
        border-radius: 8px;
        transition: all 0.3s;

        &:hover {
            background: var(--bg-secondary);
        }

        &.active {
            color: #D0A944;
        }

        img {
            width: 16px;
            height: 16px;
        }
    }
}

.language-btn {
    position: relative; // 添加相对定位
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    .clear-history {
        color: #88888C;
        font-size: 14px;
        cursor: pointer;

        &:hover {
            color: #D0A944;
        }
    }
}

.movie-item {
    cursor: pointer;

    &:hover {
        color: #D0A944;
    }
}

.search-container {
    pointer-events: auto; // 确保下拉框可以接收点击事件
}
</style>
<template>
    <div class="header">
        <!-- Logo区域 -->
        <div class="flex items-center">

            <div class="logo">
                <img src="../assets/images/logo.svg" alt="START TV" />
            </div>
            <el-menu :router="true" mode="horizontal" :ellipsis="false" class="nav-menu" background-color="transparent">
                <el-menu-item index="/" class="menu-item">Home</el-menu-item>
                <el-menu-item index="/genre" class="menu-item">Genre</el-menu-item>
                <el-menu-item index="/fandom" class="menu-item">Fandom</el-menu-item>
            </el-menu>

        </div>

        <!-- 搜索框 -->
        <div class="search-container">
            <el-input 
                v-model="searchText" 
                placeholder="Search..." 
                clearable
                @focus="showDropdown = true"
                @blur="handleBlur"
            >
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
            <el-button class="download-btn" type="warning">
                <img src="@/assets/images/arrow-square-down.svg" alt="Download">
                Down load
            </el-button>

            <div class="timer-btn">
                <img src="@/assets/images/timer.svg" alt="Download">
            </div>
            <div class="timer-btn">
                <img src="@/assets/images/langauge.svg" alt="Download">
            </div>
            <div class="timer-btn-user" @click="showLoginDialog = true">
                <img src="@/assets/images/user.svg" alt="User">
            </div>
        </div>
    </div>

    <!-- 添加登录弹窗 -->
    <LoginDialog v-model:visible="showLoginDialog" />
</template>

<script setup>
import { ref } from 'vue'
import LoginDialog from './LoginDialog.vue'

const searchText = ref('')
const showDropdown = ref(false)
const showLoginDialog = ref(false)

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
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100px;
    padding: 27px 32px;
    background-color: #0d1117;

    @include responsive-scale {
        height: calc(1024 / 1440 * 100px );
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
                    cursor: pointer;
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
                        cursor: pointer;

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
                        cursor: pointer;

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
    }
}

:deep(.el-input__wrapper) {
    background: transparent;
    box-shadow: none !important;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 100px;
    padding: 0 16px;

    &:hover, &.is-focus {
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
    cursor: pointer;
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
</style>
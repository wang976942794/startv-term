<template>
    <div class="genre-page">
        <!-- 面包屑导航 -->
        <div class="breadcrumb">
            <span class="link">{{ $t('message.Genre') }}</span>
            <span class="separator">/</span>
            <span class="current">{{ $t(activeGenre) }}</span>
        </div>

        <!-- 分类标签列表 -->
        <div class="genre-tags">
            <button 
                class="tag-btn" 
                :class="{ active: activeGenre === 'All' }"
                @click="handleGenreClick('message.All')"
            >
                {{ $t('message.All') }}
            </button>
            <button 
                v-for="(value, key) in typeBookMap" 
                :key="key" 
                class="tag-btn" 
                :class="{ active: activeGenre === key }"
                @click="handleGenreClick(key)"
            >
                {{ key }}
            </button>
        </div>

        <!-- 电影列表标题 -->
        <div class="movies-header">
            <h1 class="title">{{ $t(activeGenre) }} Movies</h1>
            <span class="count">{{ $t('message.Total') }} {{ datalist.length }}</span>
        </div>

        <!-- 电影列表 -->
        <div class="movies-grid">
            <div class="movie-card" v-for="item in currentPageData" :key="item.id">
                <div class="poster">
                    <img :src="item.fontUrl" alt="movie poster" />
                </div>
                <div class="info">
                    <p class="movie-title">{{item.title}}</p>
                    <div class="stats">
                        <div class="stat">
                            <img src="@/assets/images/heart.svg" alt="heart">
                            <span>{{ formatNumber(item.collectNum) }}</span>
                        </div>
                        <div class="stat">
                            <img src="@/assets/images/starw.svg" alt="star">
                            <span>{{ formatNumber(item.collectNum) }}</span>
                        </div>
                    </div>
                    <p class="description">
                        {{item.brief}}
                    </p>
                    <div class="actions">
                        <button @click="handleItemClick(item)">
                            <img src="@/assets/images/play.svg" alt="Play" class="play-icon">
                            {{ $t('message.Play') }}
                        </button>
                        <button class="btn-list">
                            <img src="@/assets/images/star.svg" alt="Add to My List" class="plus-icon" @click="handleItemClick(item)">
                            {{ $t('message.Add_to_My_List') }}
                        </button>
                    </div>
                </div>
             
            </div>
        </div>

        <div class="pagination-block">
            <el-pagination 
                layout="prev, pager, next" 
                :total="datalist.length"
                :page-size="20"
                :current-page="currentPage"
                @current-change="handlePageChange"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getHomePage } from '@/api/home'
import { formatNumber } from '@/utils/fix'
const router = useRouter()
const popularBookList = ref([])//全部剧集
const typeBookMap = ref({})//分类
const datalist = ref([])//显示的剧集
const activeGenre = ref('message.All') // 用于跟踪当前选中的分类
const currentPage = ref(1)
const pageSize = 20 // 每页显示20条数据

onMounted(() => {
    getPopularBookList()
})

const getPopularBookList = async () => {
    const res = await getHomePage()
    popularBookList.value = res.data.popularBookList
    typeBookMap.value = res.data.typeBookMap
    // 初始化时显示第一个分类的内容
    if (Object.keys(typeBookMap.value).length > 0) {
        datalist.value = res.data.popularBookList
    }
}

// 计算当前页要显示的数据
const currentPageData = computed(() => {
    const startIndex = (currentPage.value - 1) * pageSize
    const endIndex = startIndex + pageSize
    return datalist.value.slice(startIndex, endIndex)
})

const handleGenreClick = (genre) => {
    currentPage.value = 1 // 重置页码
    activeGenre.value = genre
    if (genre === 'message.All') {
        datalist.value = popularBookList.value || []
    } else {
        datalist.value = typeBookMap.value[genre] || []
    }
}

const handleItemClick = (item) => {
    router.push({
        name: 'VideoPlay',
        query: {
            bookId: item.bookId,
            chapterId: item.watchChapterId || item.chapterId || 1
        }
    })
}

const handlePageChange = (page) => {
    currentPage.value = page
    // 页面滚动到顶部，提供更好的用户体验
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}
</script>

<style lang="scss" scoped>
@mixin responsive-scale {
  transition: all 0.3s ease-in-out;
    @media screen and (min-width: 500px) and (max-width: 1439px) {
        @content;
    }
} 

.genre-page {
    padding: 0 60px;
    color: var( --text-primary);
    min-height: 100vh;
    background: var(--bg-quinary);
    @include responsive-scale {
    padding: 0 calc(1024 / 1440 * 60px);
  }
}

.breadcrumb {
    width: 100%;
    height: 74px;
    border-bottom: 1px solid var(--bg-quaternary);
    display: flex;
    align-items: center;
    @include responsive-scale {
        height: calc(1024 / 1440 * 74px);
    }
    .link {
        color: var( --text-primary);
        opacity: 0.7;
        &:hover {
            opacity: 1;
        }
    }

    .separator {
        margin: 0 8px;
        opacity: 0.7;
    }

    .current {
        color: var( --text-primary);
    }
}

.genre-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 30px;
    margin-bottom: 30px;
    @include responsive-scale {
        margin-top: calc(1024 / 1440 * 30px);
        margin-bottom: calc(1024 / 1440 * 30px);
        gap: calc(1024 / 1440 * 10px);
    }

    .tag-btn {
        padding: 8px 16px;
        border-radius: 20px;
        border: 1px solid var(--bg-quaternary);
        font-size: 14px;
        font-weight: 500;
        color: var( --text-primary);
        @include responsive-scale {
            padding: calc(1024 / 1440 * 8px) calc(1024 / 1440 * 16px);
            font-size: calc(1024 / 1440 * 14px);
        }
        &:hover,
        &.active {
            color: #E6B322;
            background-color: #D0A9441A;
            border: 1px solid #E6B322;
        }
    }
}

.movies-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    @include responsive-scale {
        margin-bottom: calc(1024 / 1440 * 20px);
    }

    .title {
        font-size: 24px;
        font-weight: 600;
        @include responsive-scale {
            font-size: calc(1024 / 1440 * 24px);
        }
    }

    .count {
        color: rgba(255, 255, 255, 0.7);
    }
}

.movies-grid {
    display: grid;
    gap: 20px;
    @include responsive-scale {
        gap: calc(1024 / 1440 * 20px);
    }
}

.movie-card {
    display: flex;
    gap: 20px;
    border-radius: 8px;
    overflow: hidden;
    @include responsive-scale {
        gap: calc(1024 / 1440 * 20px);
    }
    .poster {
        width: 200px;
        height: 266px;
        
        background: var(--bg-secondary);
        @include responsive-scale {
            width: calc(1024 / 1440 * 200px);
            height: calc(1024 / 1440 * 266px);
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 8px;
        }
    }

    .info {
        flex: 1;

    }

    .movie-title {
        font-size: 24px;
        font-weight: 700;
        @include responsive-scale {
            font-size: calc(1024 / 1440 * 24px);
        }
    }

    .stats {
        display: flex;
        gap: 20px;
        margin-top: 20px;
        @include responsive-scale {
            margin-top: calc(1024 / 1440 * 20px);
            gap: calc(1024 / 1440 * 20px);
        }
        .stat {

            width: 109px;
            height: 36px;
            border-radius: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            color: #B4B4B8;
            background-color: var(--bg-tertiary);
            font-size: 14px;
            font-weight: 600;
            @include responsive-scale {
                width: calc(1024 / 1440 * 109px);
                height: calc(1024 / 1440 * 36px);
                font-size: calc(1024 / 1440 * 14px);
                gap: calc(1024 / 1440 * 12px);
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

    .description {
        color: rgba(255, 255, 255, 0.7);
        line-height: 1.5;
        font-size: 14px;
        margin-top: 20px;
        @include responsive-scale {
            margin-top: calc(1024 / 1440 * 20px);
            font-size: calc(1024 / 1440 * 14px);
        }
    }

   

    .actions {
        margin-top: 41px;
        display: flex;
        gap: 15px;
        @include responsive-scale {
            margin-top: calc(1024 / 1440 * 41px);
            gap: calc(1024 / 1440 * 15px);
        }
        button {
            width: 168px;
            height: 52px;
            border-radius: 50px;
            border: none;
            background: linear-gradient(180deg, #F0D89A 0%, #D0A944 100%);
            color: var( --text-primary);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            font-size: 16px;
            font-weight: 600;
            @include responsive-scale {
                width: calc(1024 / 1440 * 168px);
                height: calc(1024 / 1440 * 52px);
                gap: calc(1024 / 1440 * 8px);
                font-size: calc(1024 / 1440 * 16px);
            }
            &.btn-play {
                background: #E6B322;
                color: #000;
            }

            &.btn-list {
                border: 1px solid #2C2E31;
                background: transparent;
                color: var( --text-primary);
            }
            img {
                filter: var(--icon-filter);
            }
        }
    }
}

.pagination-block {
    display: flex;
    justify-content: center;
    margin: 40px 0;
    padding-bottom: 40px;
    @include responsive-scale {
        margin: calc(1024 / 1440 * 40px) 0;
        padding-bottom: calc(1024 / 1440 * 40px);
    }

    :deep(.el-pagination) {
        --el-pagination-font-size: 14px;
        --el-pagination-bg-color: transparent;
        --el-pagination-hover-color: #E6B322;
        --el-pagination-button-color: var(--text-primary);
        --el-pagination-button-disabled-color: var(--text-primary);
        --el-pagination-button-disabled-bg-color: transparent;
        
        .el-pager {
            li {
                background: transparent;
                color: var(--text-primary);
                border: 1px solid var(--bg-quaternary);
                border-radius: 4px;
                min-width: 32px;
                height: 32px;
                margin: 0 4px;
                
                &:hover {
                    color: #E6B322;
                    border-color: #E6B322;
                }
                
                &.is-active {
                    background: #D0A9441A;
                    color: #E6B322;
                    border-color: #E6B322;
                }

                @include responsive-scale {
                    min-width: calc(1024 / 1440 * 32px);
                    height: calc(1024 / 1440 * 32px);
                }
            }
        }

        .btn-prev, .btn-next {
            background: transparent;
            border: 1px solid var(--bg-quaternary);
            border-radius: 4px;
            color: var(--text-primary);
            margin: 0 4px;
            
            &:hover:not([disabled]) {
                color: #E6B322;
                border-color: #E6B322;
            }

            &[disabled] {
                border: 1px solid var(--bg-quaternary);
                color: var(--text-primary);
                opacity: 0.5;
            }

            @include responsive-scale {
                min-width: calc(1024 / 1440 * 32px);
                height: calc(1024 / 1440 * 32px);
            }
        }
    }
}
</style>
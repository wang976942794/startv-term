<template>
    <div class="continue-watching">
        <div class="continue-watching-header">
            <h2 class="section-title">{{ $t('message.More_Recommended') }}</h2>
        </div>

        <div class="content-container">
            <div class="content-grid">
                <div class="content-item" v-for="(item, index) in visibleBookList" :key="index" @click="handleItemClick(item)">
                    <div class="cover-image">
                        <img :src="item.fontUrl" :alt="item.title">
                        <div class="text">{{ item.title }}</div>
                        <div class="episode-tag">
                            <span class="dot"></span>
                            EP.{{ item.allNum }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="more-recommended-footer" v-if="hasMoreItems" @click="loadMore">
            <img 
                src="@/assets/images/LoadProgress.svg" 
                alt="Loading" 
                :class="{ loading: isLoading }"
            >
            <span>{{ isLoading ? 'Loading...' : 'Load More' }}</span>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, onBeforeUnmount } from 'vue'
import { useHomeStore } from '@/stores/home.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const homeStore = useHomeStore()
const popularBookList = ref([])
const visibleItems = ref(homeStore.moreRecommendedState)
const itemsPerLoad = 18
const isLoading = ref(false)

// 计算属性
const visibleBookList = computed(() => {
    return popularBookList.value.slice(0, visibleItems.value)
})

const hasMoreItems = computed(() => {
    return visibleItems.value < popularBookList.value.length
})

// 修改后的加载方法
const loadMore = async () => {
    if (isLoading.value) return
    
    isLoading.value = true
    // 模拟加载延迟
    await new Promise(resolve => setTimeout(resolve, 1000))
    visibleItems.value += itemsPerLoad
    isLoading.value = false
}

// 处理点击事件
const handleItemClick = (item) => {
    router.push({
        name: 'VideoPlay',
        query: {
            bookId: item.bookId,
            chapterId: item.watchChapterId || item.chapterId || 1
        }
    })
}

// 监听数据变化
watch(() => homeStore.popularBookList, (newValue) => {
    popularBookList.value = newValue
}, { immediate: true })

// 组件挂载时恢复之前的状态
onMounted(() => {
    visibleItems.value = homeStore.moreRecommendedState
})

// 组件销毁前保存当前状态
onBeforeUnmount(() => {
    homeStore.setMoreRecommendedState(visibleItems.value)
})
</script>

<style lang="scss" scoped>
@mixin responsive-scale {
    transition: all 0.3s ease-in-out;
    @media screen and (min-width: 500px) and (max-width: 1439px) {
        @content;
    }
} 

.continue-watching {
    margin-top: 48px;
    @include responsive-scale {
        margin-top: calc(1024 / 1440 * 48px);
    }

    .continue-watching-header {
        margin-bottom: 35.5px;
        @include responsive-scale {
            margin-bottom: calc(1024 / 1440 * 35.5px);
        }

        .section-title {
            font-size: 24px;
            font-weight: bold;
            color: var( --text-primary);
            @include responsive-scale {
                font-size: calc(1024 / 1440 * 24px);
            }
        }
    }

    .content-container {
        width: 100%;
        padding: 20px 0;
        @include responsive-scale {
            padding: calc(1024 / 1440 * 20px) 0;
        }

        .content-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
            @include responsive-scale {
                gap: calc(1024 / 1440 * 16px);
            }
        }

        .content-item {
            width: 100%;
            max-width: 174px;
            transition: transform 0.3s ease;
            @include responsive-scale {
                max-width: calc(1024 / 1440 * 174px);
            }
            
            &:hover {
                transform: translateY(-5px);
            }

            .cover-image {
                width: 100%;
                height: 328px;
                position: relative;
                margin-top: 10px;
                .text {
                    font-size: 16px;
                    color: var( --text-primary);
                    font-weight: 700;
                    margin-top: 12px;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    @include responsive-scale {
                        font-size: calc(1024 / 1440 * 16px);
                        margin-top: calc(1024 / 1440 * 12px);
                    }
                }

                img {
                    width: 100%;
                    height: 232px;
                    object-fit: cover;
                    border-radius: 8px;
                    @include responsive-scale {
                        height: calc(1024 / 1440 * 232px);
                    }
                }

                .episode-tag {
                    position: absolute;
                    bottom: 8px;
                    // left: 8px;
                    background: rgba(0, 0, 0, 0.7);
                    padding: 4px 8px;
                    border-radius: 4px;
                    color: white;
                    font-size: 12px;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    width: fit-content;
                    @include responsive-scale {
                        font-size: calc(1024 / 1440 * 12px);
                        gap: calc(1024 / 1440 * 4px);
                    }

                    .dot {
                        width: 6px;
                        height: 6px;
                        background: #ff4081;
                        border-radius: 50%;
                        @include responsive-scale {
                            width: calc(1024 / 1440 * 6px);
                            height: calc(1024 / 1440 * 6px);
                        }
                    }
                }
            }
        }
    }
    .more-recommended-footer {
        width: 160px;
        height: 52px;
        background: #D0A9441A;
        border-radius: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        color: #D0A944;
        font-size: 14px;
        font-weight: 600;
        margin-top: 20px;
        border: 1px solid #D0A944;
        margin: 0 auto;
        @include responsive-scale {
            margin-top: calc(1024 / 1440 * 20px);
            width: calc(1024 / 1440 * 160px);
            height: calc(1024 / 1440 * 52px);
            font-size: calc(1024 / 1440 * 14px);
            gap: calc(1024 / 1440 * 10px);
            border-radius: calc(1024 / 1440 * 50px);
        }
        img {
            width: 18px;
            height: 18px;
            transition: transform 0.3s ease;
            @include responsive-scale {
                width: calc(1024 / 1440 * 18px);
                height: calc(1024 / 1440 * 18px);
            }
          
            &.loading {
                animation: spin 1s linear infinite;
            }
        }
    }
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
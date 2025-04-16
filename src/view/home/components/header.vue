<template>
    <div class="header" :style="headerStyle">
        <div class="header-content">
            <div class="tag">New Release</div>
            <h1 class="title">{{ selectedItem.title }}</h1>
            <div class="action">
                <button class="play-btn" @click="handleItemClick">
                    <img src="@/assets/images/play.svg" alt="Play" class="play-icon" >
                    Play
                </button>
            </div>
        </div>
        <div class="header-right" >
            <div 
                class="header-right-content-item" 
                v-for="(item, index) in bannerList" 
                :key="index"
                :class="{ 'active': selectedIndex === index }"
                @click="selectItem(index,item)"
            >
                <img :src="item.bannerUrl" alt="Book Cover">
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, onUnmounted } from 'vue'
import { useHomeStore } from '@/stores/home'
import { useRouter } from 'vue-router'
const router = useRouter()
const homeStore = useHomeStore()
const bannerList = ref([])
const selectedIndex = ref(0)//当前选中的图片索引
const selectedItem = ref({})//当前选中的图片
const autoPlayTimer = ref(null)

const headerStyle = computed(() => ({
    backgroundImage: `linear-gradient(to top,
        rgba(13, 17, 23, 0.7),
        rgba(13, 17, 23, 0.2)
    ), url('${selectedItem.value?.bannerUrl || '@/assets/images/image.png'}')`
}))

const selectItem = (index,item) => {
    selectedIndex.value = index
    selectedItem.value = item
    // 重置自动播放计时器
    resetAutoPlay()
}

const startAutoPlay = () => {
    stopAutoPlay() // 先清除之前的定时器
    autoPlayTimer.value = setInterval(() => {
        // 计算下一个索引
        const nextIndex = (selectedIndex.value + 1) % bannerList.value.length
        // 更新索引和选中项
        selectItem(nextIndex, bannerList.value[nextIndex])
    }, 3000) // 每3秒切换一次
}

const stopAutoPlay = () => {
    if (autoPlayTimer.value) {
        clearInterval(autoPlayTimer.value)
        autoPlayTimer.value = null
    }
}

const resetAutoPlay = () => {
    startAutoPlay()
}
const handleItemClick = () => {
  
    
    router.push({
        name: 'VideoPlay',
        query: {
            bookId: selectedItem.value.bookId,
            chapterId: selectedItem.value.watchChapterId||selectedItem.value.chapterId ||1
        }
    });
};

// 监听图片列表变化
watch(() => homeStore.bannerBookList, (newValue) => {
    bannerList.value = newValue
    // 当图片列表更新时，初始化第一项并重置自动播放
    if (newValue.length > 0) {
        selectItem(0, newValue[0])
        resetAutoPlay()
    }
}, { immediate: true })

// 组件挂载时启动自动播放
onMounted(() => {
    if (bannerList.value.length > 0) {
        startAutoPlay()
    }
})

// 组件卸载时清除定时器
onUnmounted(() => {
    stopAutoPlay()
})
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
    background-size: cover;
    background-position: top 10% center;
    overflow: hidden;

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
        color:#fff;
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
        color: var( --text-primary);
        border: none;
        border-radius: 40px;
        font-size: 16px;
        font-weight: 600;
         
        padding: 6px 12px;

        @include responsive-scale {
            width: calc(1024 / 1440 * 83px);
            height: calc(1024 / 1440 * 38px);
            font-size: calc(1024 / 1440 * 16px);
        }



        .play-icon {
            margin-right: 8px;
            font-size: 14px;
            filter: var(--icon-filter);
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
        gap: 16px;
        @include responsive-scale {
            width: calc(1024 / 1440 * 224px);
            height: calc(1024 / 1440 * 450px);
            padding: calc(1024 / 1440 * 32px) calc(1024 / 1440 * 32px);
        }

        .header-right-content-item {
            width: 160px;
            height: 84px;
            border: 2px solid var( --text-primary)FFF;
            border-radius: 12px;
            position: relative;
            cursor: pointer;
            overflow: hidden;

            &::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: #0000004D;
                pointer-events: none;
                transition: opacity 0.3s ease;
            }

            &.active {
                &::after {
                    opacity: 0;
                }
            }

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
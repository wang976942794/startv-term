<template>
    <div class="continue-watching">
        <div class="continue-watching-header">
            <h2 class="section-title">More Recommended</h2>
        </div>

        <div class="content-container">
            <div class="content-grid">
                <div class="content-item" v-for="(item, index) in popularBookList" :key="index" @click="handleItemClick(item)">
                    <div class="cover-image">
                        <img :src="item.fontUrl" :alt="item.title">
                        <div class="text">{{ item.title }}</div>
                        <div class="episode-tag">
                            <span class="dot"></span>
                            EP.{{ item.completeNum}} / EP.{{ item.allNum }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch} from 'vue'
import { useHomeStore } from '@/stores/home.js'
import { useRouter } from 'vue-router'
const router = useRouter()
const homeStore = useHomeStore()
const popularBookList = ref([])
watch(() => homeStore.popularBookList, (newValue) => {
    popularBookList.value = newValue
},
    { immediate: true } // immediate: true 会使得侦听器立即执行一次
)
const handleItemClick = (item) => {
    console.log(item);
    
    router.push({
        name: 'VideoPlay',
        query: {
            bookId: item.bookId,
            chapterId: item.watchChapterId||item.chapterId ||1
        }
    });
};


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
            @include responsive-scale {
                max-width: calc(1024 / 1440 * 174px);
            }

            .cover-image {
                width: 100%;
                height: 328px;
                position: relative;
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
}
</style>
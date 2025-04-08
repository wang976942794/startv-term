<template>
    <div class="continue-watching">
        <div class="continue-watching-header">
            <h2 class="section-title">Continue Watching</h2>
            <div class="nav-btn-container">
                <button class="nav-btn prev" @click="scrollContent('prev')">
                    <img src="@/assets/images/left.svg" alt="">
                </button>
                <button class="nav-btn next" @click="scrollContent('next')">
                    <img src="@/assets/images/right.svg" alt="">
                </button>
            </div>
        </div>

        <div class="content-scroll">
            <div class="content-list">
                <div class="content-item" v-for="(item, index) in contentList" :key="index" @click="handleItemClick(item)">
                    <div class="cover-image">
                        <img :src="item.cover" :alt="item.title">
                        <div class="text">{{ item.title }}</div>
                        <div class="episode-tag">
                            <span class="dot"></span>
                            EP.{{ item.currentEp }} / EP.{{ item.totalEp }}
                        </div>
                    </div>
                </div>  
            </div>
        </div>
    </div>
</template>

<script setup>
import coverImage from '@/assets/images/image.png'
import {useRouter} from 'vue-router'
const router = useRouter()
const contentList = [
    {
        title: "Open Your Eyes, MyBillionaire Husband",
        cover: coverImage,
        currentEp: 1,
        totalEp: 67
    },
        {
            title: "The Senator's Son",
            cover: coverImage,
            currentEp: 1,
            totalEp: 67
        },
        {
            title: "The Senator's Son",
            cover: coverImage,
            currentEp: 1,
            totalEp: 67
        },
       
       
];
const handleItemClick = (item) => {
    router.push({
        name: 'VideoPlay',
        params: { videoInfo: item }
    });
};

const scrollContent = (direction) => {
    const container = document.querySelector('.content-list');
    const scrollAmount = 1232; // 7个item的总宽度 (174 * 7 + 16 * 6)
    if (direction === 'prev') {
        container.scrollLeft -= scrollAmount;
    } else {
        container.scrollLeft += scrollAmount;
    }
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
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
        @include responsive-scale {
            margin-bottom: calc(1024 / 1440 * 24px);
        }

        .section-title {
            font-size: 24px;
            font-weight: bold;
            color: #fff;
            @include responsive-scale {
                font-size: calc(1024 / 1440 * 24px);
            }
        }

        .nav-btn-container {
            display: flex;
            align-items: center;
            gap: 12px;
            @include responsive-scale {
                gap: calc(1024 / 1440 * 12px);
            }

            .nav-btn {
                width: 38px;
                height: 38px;
                border-radius: 50%;
                border: 1px solid #2C2E31;
                background: transparent;
                 
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
                
                &:hover {
                    border-color: #fff;
                }

                @include responsive-scale {
                    width: calc(1024 / 1440 * 38px);
                    height: calc(1024 / 1440 * 38px);
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

    .content-scroll {
        width: 100%;
        height: 340px;
        @include responsive-scale {
            height: calc(1024 / 1440 * 340px);
        }

        .content-list {
            display: flex;
            gap: 16px;
            overflow-x: auto;
            scroll-behavior: smooth;
            padding-bottom: 20px; // 为滚动条预留空间
            @include responsive-scale {
                gap: calc(1024 / 1440 * 16px);
            }

            &::-webkit-scrollbar {
                display: none;
            }
        }

        .content-item {
            flex: 0 0 auto;
            width: 174px;
            @include responsive-scale {
                width: calc(1024 / 1440 * 174px);
            }

            .cover-image {
                width: 100%;

                img {
                    width: 100%;
                    height: 232px;
                    object-fit: cover;
                    border-radius: 8px;
                    @include responsive-scale {
                        height: calc(1024 / 1440 * 232px);
                    }
                }

                .text {
                    font-size: 16px;
                    color: #fff;
                    font-weight: 700;
                    margin-top: 12px;
                    margin-bottom: 8px;
                    @include responsive-scale {
                        font-size: calc(1024 / 1440 * 16px);
                        margin-top: calc(1024 / 1440 * 12px);
                        margin-bottom: calc(1024 / 1440 * 8px);
                    }
                }

                .episode-tag {
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    padding: 4px 8px;
                    background: rgba(0, 0, 0, 0.7);
                    border-radius: 4px;
                    color: white;
                    font-size: 12px;
                    @include responsive-scale {
                        font-size: calc(1024 / 1440 * 12px);
                        padding: calc(1024 / 1440 * 4px) calc(1024 / 1440 * 8px);
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
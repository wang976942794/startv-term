<template>
    <div class="continue-watching">
        <div class="continue-watching-header">
            <h2 class="section-title">New Release</h2>
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
            <div class="content-list-new">
                <div class="content-item" v-for="(item, index) in contentList" :key="index">
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
    // ... 其他内容项
];

const scrollContent = (direction) => {
    const container = document.querySelector('.content-list-new');
    const scrollAmount = 600; // 每次滚动的距离
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

    .section-title {
        font-size: 24px;
        font-weight: bold;
        color: #fff;
        margin-bottom: 35.5px;
        @include responsive-scale {
            font-size: calc(1024 / 1440 * 24px);
            margin-bottom: calc(1024 / 1440 * 35.5px);
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
            border: none;
            color: white;
            border: 1px solid #2C2E31;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            @include responsive-scale {
                width: calc(1024 / 1440 * 38px);
                height: calc(1024 / 1440 * 38px);
            }
        }}
    }


    .content-scroll {
        width: 100%;
        height: 340px;
        display: flex;
        align-items: center;
        @include responsive-scale {
            height: calc(1024 / 1440 * 340px);
        }
        .content-list-new {
        display: flex;
        gap: 16px;
        overflow-x: auto;
        scroll-behavior: smooth;
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
        height: 340px;
        @include responsive-scale {
            width: calc(1024 / 1440 * 174px);
            height: calc(1024 / 1440 * 340px);
        }
        .cover-image {
            width: 100%;
            height: 340px;
            overflow: hidden;   
            @include responsive-scale {
                height: calc(1024 / 1440 * 340px);
            }
            .text{
                font-size: 16px;
                color: #fff;
                font-weight: 700;
                margin-top: 12px;
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
                margin-top: 8px;
                background: rgba(0, 0, 0, 0.7);
                border-radius: 4px;
                color: white;
                font-size: 12px;
                display: flex;
                align-items: center;
                gap: 4px;
                @include responsive-scale {
                    font-size: calc(1024 / 1440 * 12px);
                    gap: calc(1024 / 1440 * 4px);
                    margin-top: calc(1024 / 1440 * 8px);
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
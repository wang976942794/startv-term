<template>
    <div class="my-list">
        <div class="list-content">
            <div v-for="(item, index) in historyStore.chapterCollections" :key="index" class="list-item">
                <div class="item-cover">
                    <img :src="item.fontUrl" alt="cover">
                </div>
                <div class="item-info">
                    <h3 class="item-title">{{ item.title }}</h3>
                    <div class="coin-info">
                        <span class="coin-amount">{{ item.coins }} Coins</span>
                        <span class="unlock-time">Unlock time: {{ formatTime(item.updateTime) }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useHistoryStore } from '@/stores/history'  
import { formatTime } from '@/utils/fix'
const historyStore = useHistoryStore()  

const listItems = ref();
</script>

<style scoped lang="scss">
@mixin responsive-scale {
    transition: all 0.3s ease-in-out;

    @media screen and (min-width: 500px) and (max-width: 1439px) {
        @content;
    }
}

.my-list {
    .list-content {

        display: flex;
        flex-direction: column;
        gap: 16px;

        @include responsive-scale {
            gap: calc(1024 / 1440 * 16px);
        }

        .list-item {
            display: flex;
            gap: 16px;
            height: 160px;
            border-bottom: 1px solid #2C2E31;
            overflow: hidden;

            @include responsive-scale {
                gap: calc(1024 / 1440 * 16px);
                border-radius: calc(1024 / 1440 * 16px);
                height: calc(1024 / 1440 * 160px);
            }

            .item-cover {
                width: 80px;
                height: 106px;
                margin-top: 26px;
                @include responsive-scale {
                    width: calc(1024 / 1440 * 80px);
                    height: calc(1024 / 1440 * 106px);
                    margin-top: calc(1024 / 1440 * 26px);
                }

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }


            }

            .item-info {
                flex-grow: 1;
                height: 106px;
                margin-top: 26px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                @include responsive-scale {
                    margin-top: calc(1024 / 1440 * 26px);
                    height: calc(1024 / 1440 * 106px);
                }

                .item-title {
                    font-size: 16px;
                    color: #fff;
                    line-height: 1.4;

                    @include responsive-scale {
                        font-size: calc(1024 / 1440 * 16px);
                    }
                }

                .coin-info {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;

                    @include responsive-scale {
                        gap: calc(1024 / 1440 * 4px);
                    }

                    .coin-amount {
                        color: #D0A944;
                        font-size: 14px;

                        @include responsive-scale {
                            font-size: calc(1024 / 1440 * 14px);
                        }
                    }

                    .unlock-time {
                        color: #88888C;
                        font-size: 14px;

                        @include responsive-scale {
                            font-size: calc(1024 / 1440 * 14px);
                        }
                    }
                }
            }
        }
    }
}
</style>
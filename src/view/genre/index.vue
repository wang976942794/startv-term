<template>
    <div class="genre-page">
        <!-- 面包屑导航 -->
        <div class="breadcrumb">
            <span class="link">{{ $t('message.Home') }}</span>
            <span class="separator">/</span>
            <span class="current">Reunion</span>
        </div>

        <!-- 类型标签列表 -->
        <div class="genre-tags">
            <button class="tag-btn active">{{ $t('message.All') }}</button>
            <!-- <button v-for="i in 13" :key="i" class="tag-btn" :class="{ active: i === 1 }">
                Reunion
            </button> -->
        </div>

        <!-- 电影列表标题 -->
        <div class="movies-header">
            <h1 class="title">Reunion Movies</h1>
            <span class="count">{{ $t('message.Total') }} 56</span>
        </div>

        <!-- 电影列表 -->
        <div class="movies-grid">
            <div class="movie-card" v-for="item in popularBookList" :key="item.id">
                <div class="poster">
                    <img :src="item.fontUrl" alt="movie poster" />
                </div>
                <div class="info">
                    <p class="movie-title">{{item.title}}</p>
                    <div class="stats">
                        <div class="stat">
                            <img src="@/assets/images/heart.svg" alt="heart">
                            <span>64.3K</span>
                        </div>
                        <div class="stat">
                            <img src="@/assets/images/starw.svg" alt="star">
                            <span>64.3K</span>
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
                            <img src="@/assets/images/star.svg" alt="Add to My List" class="plus-icon">
                            {{ $t('message.Add_to_My_List') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref,watch,onMounted } from 'vue'

import { useRouter } from 'vue-router'
import { getHomePage } from '@/api/home'
const router = useRouter()
const popularBookList = ref([])
onMounted(() => {
    getPopularBookList()
})
const getPopularBookList = async () => {
    const res = await getHomePage()
    console.log(res);
    popularBookList.value = res.data.popularBookList
    console.log(popularBookList.value);
}
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

// 这里可以添加需要的逻辑
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
</style>
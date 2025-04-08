<template>
    <div class="genre-page">
        <!-- 面包屑导航 -->
        <div class="breadcrumb">
            <span class="link">Home</span>
            <span class="separator">/</span>
            <span class="current">Reunion</span>
        </div>

        <!-- 类型标签列表 -->
        <div class="genre-tags">
            <button class="tag-btn">All</button>
            <button v-for="i in 13" :key="i" class="tag-btn" :class="{ active: i === 1 }">
                Reunion
            </button>
        </div>

        <!-- 电影列表标题 -->
        <div class="movies-header">
            <h1 class="title">Reunion Movies</h1>
            <span class="count">Total 56</span>
        </div>

        <!-- 电影列表 -->
        <div class="movies-grid">
            <div class="movie-card" v-for="i in 2" :key="i">
                <div class="poster">
                    <img src="" alt="movie poster" />
                </div>
                <div class="info">
                    <p class="movie-title">pisode 1 - Pregnant and Spoiled by the Billionaire Full Movie</p>
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
                        After her father's business goes bankrupt, Skylar Stone is forced to work as Lucas Ford's maid
                        as collateral. But just when she thinks things can't get worse, an unexpected pregnancy shatters
                        her world. Lucas, convinced of her betrayal, demands she get an abortion, leaving her
                        devastated. Heartbreak forces her to leave her homeland, but six years later, she returns—with
                        her child and a story far from over.
                    </p>
                    <div class="actions">
                        <button>
                            <img src="@/assets/images/play.svg" alt="Play" class="play-icon">
                            Play
                        </button>
                        <button class="btn-list">
                            <img src="@/assets/images/star.svg" alt="Add to My List" class="plus-icon">
                            Add to My List
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
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
    color: #fff;
    min-height: 100vh;
    background: #0f1014;
    @include responsive-scale {
    padding: 0 calc(1024 / 1440 * 60px);
  }
}

.breadcrumb {
    width: 100%;
    height: 74px;
    border-bottom: 1px solid #2C2E31;
    display: flex;
    align-items: center;
    @include responsive-scale {
        height: calc(1024 / 1440 * 74px);
    }
    .link {
        color: #fff;
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
        color: #fff;
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
        border: 1px solid #2C2E31;
        font-size: 14px;
        font-weight: 500;
        color: #fff;
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
        background: #2a2a2a;
        @include responsive-scale {
            width: calc(1024 / 1440 * 200px);
            height: calc(1024 / 1440 * 266px);
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
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
            background-color: #101D2B;
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
            color: #fff;
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
                color: #fff;
            }
        }
    }
}
</style>
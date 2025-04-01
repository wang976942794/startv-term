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
      <button 
        v-for="i in 13" 
        :key="i" 
        class="tag-btn"
        :class="{ active: i === 1 }"
      >
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
          <h3 class="movie-title">pisode 1 - Pregnant and Spoiled by the Billionaire Full Movie</h3>
          <div class="stats">
            <div class="stat">
              <i class="icon-heart"></i>
              <span>64.3K</span>
            </div>
            <div class="stat">
              <i class="icon-star"></i>
              <span>64.3K</span>
            </div>
          </div>
          <p class="description">
            After her father's business goes bankrupt, Skylar Stone is forced to work as Lucas Ford's maid as collateral. But just when she thinks things can't get worse, an unexpected pregnancy shatters her world. Lucas, convinced of her betrayal, demands she get an abortion, leaving her devastated. Heartbreak forces her to leave her homeland, but six years later, she returns—with her child and a story far from over.
          </p>
          <div class="actions">
            <button >
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
.genre-page {
  padding: 20px;
  color: #fff;
  min-height: 100vh;
  background: #0f1014;
}

.breadcrumb {
  margin-bottom: 20px;
  
  .link {
    color: #fff;
    opacity: 0.7;
    cursor: pointer;
    
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
  margin-bottom: 30px;
  
  .tag-btn {
    padding: 8px 16px;
    border-radius: 20px;
    border: 1px solid #2C2E31;
 
    color: #fff;
    cursor: pointer;
    transition: all 0.3s;
    
    &:hover, &.active {
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
  
  .title {
    font-size: 24px;
    font-weight: 600;
  }
  
  .count {
    color: rgba(255,255,255,0.7);
  }
}

.movies-grid {
  display: grid;
  gap: 20px;
}

.movie-card {
  display: flex;
  gap: 20px;
  background: rgba(255,255,255,0.05);
  border-radius: 8px;
  overflow: hidden;
  
  .poster {
    width: 200px;
    height: 280px;
    background: #2a2a2a;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  .info {
    flex: 1;
    padding: 20px 20px 20px 0;
  }
  
  .movie-title {
    font-size: 20px;
    margin-bottom: 15px;
  }
  
  .stats {
    display: flex;
    gap: 20px;
    margin-bottom: 15px;
    
    .stat {
      display: flex;
      align-items: center;
      gap: 5px;
      color: rgba(255,255,255,0.7);
    }
  }
  
  .description {
    color: rgba(255,255,255,0.7);
    line-height: 1.5;
    margin-bottom: 20px;
  }
  
  .actions {
    display: flex;
    gap: 15px;
    
    button {
      width: 168px;
      height: 52px;
      border-radius: 50px;
      border: none;
      background: linear-gradient(180deg, #F0D89A 0%, #D0A944 100%);
      color: #fff;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      
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
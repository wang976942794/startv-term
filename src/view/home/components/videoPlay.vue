<template>
  <div class="video-container">
    <!-- 左侧播放器预留位置 -->
    <div class="video-player">
      <!-- 播放器将在这里实现 -->
      <Vue3VideoPlay />
    </div>

    <!-- 右侧信息区域 -->
    <div class="video-info">
      <!-- 面包屑导航 -->
      <div class="breadcrumb">
        <span>Home</span>
        <span>/</span>
        <span>{{ videoInfo.seriesTitle }}</span>
        <span>/</span>
        <span>Episode {{ videoInfo.episode }}</span>
      </div>

      <!-- 标签页切换 -->
      <div class="tab-container">
        <div class="tab-item active">Introduction</div>
        <div class="tab-item">Comment ({{ videoInfo.commentCount }})</div>
      </div>

      <!-- 视频标题 -->
      <h1 class="video-title">{{ videoInfo.title }}</h1>

      <!-- 互动按钮 -->
      <div class="interaction-buttons">
        <div class="button">
          <i class="icon-like"></i>
          <span>{{ videoInfo.likes }}</span>
        </div>
        <div class="button">
          <i class="icon-favorite"></i>
          <span>{{ videoInfo.favorites }}</span>
        </div>
        <div class="button">
          <i class="icon-share"></i>
          <span>Share</span>
        </div>
      </div>

      <!-- 剧情简介 -->
      <div class="plot-summary">
        <h3>Plot of Episode {{ videoInfo.episode }}</h3>
        <p>{{ videoInfo.plot }}</p>
        <div class="show-more">More</div>
      </div>

      <!-- 剧集选择 -->
      <div class="episode-selection">
        <div class="episode-tabs">
          <span class="active">1-50</span>
          <span>50-69</span>
          <span>All Episodes</span>
        </div>
        <div class="episode-grid">
          <div v-for="n in 11" :key="n" class="episode-item">
            {{ n }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Vue3VideoPlay from '@/components/Vue3videoPlay.vue'
const videoInfo = ref({
  seriesTitle: 'Pregnant and Spoiled ...',
  episode: 1,
  title: 'Episode 1 - Pregnant and Spoiled by the Billionaire Full Movie',
  likes: '64.3K',
  favorites: '64.3K',
  commentCount: '1,232',
  plot: 'Pregnant and Spoiled by the Billionaire Episode 1 introduced us to Amelia Gates who is pregnant with Leo Preston\'s child. The flashback took us back to eight weeks prior. Amelia, a junior...'
})

onMounted(() => {
  // 页面加载时滚动到顶部
  window.scrollTo(0, 0)
})
</script>

<style lang="scss" scoped>
.video-container {
  display: flex;
  gap: 24px;
  padding: 60px 60px;
  color: #fff;
  
  .video-player {
    flex: 2;
    background: #000;
    width: 952px;
    height: 800px;
  }

  .video-info {
    flex: 1;
    padding: 20px;
  }
}

.breadcrumb {
  color: #999;
  margin-bottom: 20px;
  
  span {
    margin: 0 8px;
    &:first-child { margin-left: 0; }
  }
}

.tab-container {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  
  .tab-item {
     
    padding-bottom: 8px;
    
    &.active {
      color: #f0b90b;
      border-bottom: 2px solid #f0b90b;
    }
  }
}

.video-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.interaction-buttons {
  display: flex;
  gap: 20px;
  margin-bottom: 24px;

  .button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.1);
     
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
}

.plot-summary {
  margin-bottom: 24px;
  
  h3 {
    margin-bottom: 12px;
  }
  
  p {
    color: #999;
    line-height: 1.6;
  }
  
  .show-more {
    color: #f0b90b;
     
    margin-top: 8px;
  }
}

.episode-selection {
  .episode-tabs {
    display: flex;
    gap: 16px;
    margin-bottom: 16px;
    
    span {
       
      padding: 4px 12px;
      border-radius: 16px;
      
      &.active {
        background: #f0b90b;
      }
    }
  }

  .episode-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 12px;
    
    .episode-item {
      aspect-ratio: 1;
      background: rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
       
      
      &:hover {
        background: rgba(255, 255, 255, 0.2);
      }
    }
  }
}
</style>
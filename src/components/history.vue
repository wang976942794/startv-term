<template>
  <div class="history-container">
    <div class="history-grid">
      <div v-for="(item, index) in historyItems" :key="index" class="history-card">
        <div class="card-image">
          <img :src="coverImage" :alt="item.title">
        </div>
        <div class="card-content">
          <h3 class="title">{{ item.title }}</h3>
          <div class="episode-info">
            <span class="episode">EP.{{ item.episode }}</span>
            <span class="separator">/</span>
            <span class="total-episodes">EP.{{ item.totalEpisodes }}</span>
          </div>
        </div>
      </div>
    </div>
    <button class="load-more" @click="loadMore">
      <span class="loading-icon">↻</span>
      Load More
    </button>
  </div>
</template>

<script setup>
import coverImage from '@/assets/images/image.png'
import { ref } from 'vue'

const historyItems = ref([
  {
    title: "Open Your Eyes, MyBillionaire Husband",
    image: "/path/to/image1.jpg",
    episode: "1",
    totalEpisodes: "67",
    isExclusive: true,
    isInteractive: false
  },
  {
    title: "The Billionaire Firefighterand His Sweet Wife",
    image: "/path/to/image2.jpg",
    episode: "1",
    totalEpisodes: "67",
    isExclusive: false,
    isInteractive: true
  },
  {
    title: "After Divorce, MyEx-WifeBecame a Billionaire",
    image: "/path/to/image3.jpg",
    episode: "1",
    totalEpisodes: "67",
    isExclusive: true,
    isInteractive: false
  },

  {
    title: "Open Your Eyes, MyBillionaire Husband",
    image: "/path/to/image1.jpg",
    episode: "1",
    totalEpisodes: "67",
    isExclusive: true,
    isInteractive: false
  },
  {
    title: "The Billionaire Firefighterand His Sweet Wife",
    image: "/path/to/image2.jpg",
    episode: "1",
    totalEpisodes: "67",
    isExclusive: false,
    isInteractive: true
  },
  {
    title: "After Divorce, MyEx-WifeBecame a Billionaire",
    image: "/path/to/image3.jpg",
    episode: "1",
    totalEpisodes: "67",
    isExclusive: true,
    isInteractive: false
  },
  {
    title: "Open Your Eyes, MyBillionaire Husband",
    image: "/path/to/image1.jpg",
    episode: "1",
    totalEpisodes: "67",
    isExclusive: true,
    isInteractive: false
  },
  {
    title: "The Billionaire Firefighterand His Sweet Wife",
    image: "/path/to/image2.jpg",
    episode: "1",
    totalEpisodes: "67",
    isExclusive: false,
    isInteractive: true
  },
  {
    title: "After Divorce, MyEx-WifeBecame a Billionaire",
    image: "/path/to/image3.jpg",
    episode: "1",
    totalEpisodes: "67",
    isExclusive: true,
    isInteractive: false
  },


])

const loadMore = () => {
  // 实现加载更多逻辑
  console.log('Loading more items...')
}
</script>

<style scoped lang="scss">
@mixin responsive-scale {
  transition: all 0.3s ease-in-out;
    @media screen and (min-width: 500px) and (max-width: 1439px) {
        @content;
    }
} 
.history-container {
  min-height: 100vh;
}

.history-grid {
  display: flex;
  flex-wrap: wrap;
//   gap: 20px 16px;
    gap: 16px;
  
  &::after {
    content: '';
    flex: auto;
  }
}

.history-card {
  width: 200px;
//   margin: 0 8px;
  border-radius: 8px;
  overflow: hidden;
  background: transparent;
  transition: transform 0.3s ease;
  
  @include responsive-scale {
    width: calc(1024 / 1440 * 210px);
  }

  &:hover {
    transform: translateY(-5px);
  }
}

.card-image {
  width: 100%;
  height: 232px;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 8px;
  
  @include responsive-scale {
    height: calc(1024 / 1440 * 232px);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.card-content {
  padding: 0 4px;

  .title {
    font-size: 14px;
    margin: 0 0 6px 0;
    color: #ffffff;
    font-weight: 500;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 1.3;
  }

  .episode-info {
    font-size: 12px;
    display: flex;
    align-items: center;

    .episode {
      color: #ff2c55;
      font-weight: 500;
    }

    .separator {
      margin: 0 4px;
      color: rgba(255, 255, 255, 0.5);
    }

    .total-episodes {
      color: rgba(255, 255, 255, 0.5);
    }
  }
}

.load-more {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  margin: 32px auto;
  padding: 12px 24px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
  }

  .loading-icon {
    margin-right: 8px;
    font-size: 16px;
  }
}

:deep(body) {
  background: #1a1a1a;
}

@media screen and (max-width: 1600px) {
  .history-container {
    padding: 24px 32px;
  }
}

@media screen and (max-width: 1200px) {
  .history-container {
    padding: 24px 24px;
  }
}

@media screen and (max-width: 768px) {
  .history-container {
    padding: 16px;
  }
  
  .history-grid {
    gap: 16px 12px;
    margin-left: -6px;
    margin-right: -6px;
  }
  
  .history-card {
    margin: 0 6px;
  }
}
</style>
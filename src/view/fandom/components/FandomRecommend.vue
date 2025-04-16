<template>
  <div class="fandom-content-left-bottom">
    <div class="recommend-header">
      <h2>You might like</h2>
      <span class="more">More</span>
    </div>
    
    <div class="recommend-list">
      <div class="recommend-item" v-for="item in recommendList" :key="item.id">
        <div class="recommend-cover">
          <img :src="coverImage" alt="cover">
          <div class="recommend-tags">
            <span class="hot-tag">Hot</span>
            <span class="views">{{ item.views }}</span>
          </div>
        </div>
        <h3 class="recommend-title">{{ item.title }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import coverImage from '@/assets/images/image.png'

const recommendList = [
  {
    id: 1,
    title: 'Open Your Eyes, MyBillionaire Husband',
    views: '12K',
    cover: ''
  },
  {
    id: 2,
    title: 'The Billionaire Firefighterand His Sweet Wife',
    views: '12K',
    cover: ''
  },
  {
    id: 3,
    title: 'Money, Guns, and aMerry Christmas',
    views: '12K',
    cover: ''
  },
  {
    id: 4,
    title: 'Move Aside!Im the Fina BoSS',
    views: '12K',
    cover: ''
  }
]
</script>

<style lang="scss" scoped>
@mixin responsive-scale {
    transition: all 0.3s ease-in-out;
    @media screen and (min-width: 500px) and (max-width: 1439px) {
        @content;
    }
}

.fandom-content-left-bottom {
  .recommend-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    @include responsive-scale {
      margin-bottom: calc(1024 / 1440 * 24px);
    }

    h2 {
      font-size: 20px;
      font-weight: 600;
      color: var( --text-primary);
      @include responsive-scale {
        font-size: calc(1024 / 1440 * 20px);
      }
    }

    .more {
      color: #D0A944;
      font-size: 14px;
       
      @include responsive-scale {
        font-size: calc(1024 / 1440 * 14px);
      }
    }
  }

  .recommend-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    @include responsive-scale {
      grid-template-columns: repeat(4, calc(1024 / 1440 * 1fr));
      gap: calc(1024 / 1440 * 16px);
    }
    
    .recommend-item {
      .recommend-cover {
        position: relative;
        width: 100%;
        height: 232px;
        border-radius: 8px;
        overflow: hidden;
        margin-bottom: 12px;
        @include responsive-scale {
          height: calc(1024 / 1440 * 232px + 70px);
          margin-bottom: calc(1024 / 1440 * 12px);
        }
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .recommend-tags {
          position: absolute;
          top: 8px;
          left: 8px;
          right: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          @include responsive-scale {
            top: calc(1024 / 1440 * 8px);
            left: calc(1024 / 1440 * 8px);
            right: calc(1024 / 1440 * 8px);
          }
          
          .hot-tag {
            padding: 2px 8px;
            background: #FF3B3B;
            color: #fff;
            border-radius: 4px;
            font-size: 12px;
            @include responsive-scale {
              font-size: calc(1024 / 1440 * 12px);
              padding: calc(1024 / 1440 * 2px) calc(1024 / 1440 * 8px);
            }
          }

          .views {
            color: var( --text-primary);
            font-size: 12px;
            display: flex;
            align-items: center;
            gap: 4px;
            @include responsive-scale {
              font-size: calc(1024 / 1440 * 12px);
              gap: calc(1024 / 1440 * 4px);
            }
          }
        }
      }

      .recommend-title {
        font-size: 14px;
        color: var( --text-primary);
        line-height: 1.4;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        @include responsive-scale {
          font-size: calc(1024 / 1440 * 14px);
        }
      }
    }
  }
}
</style> 
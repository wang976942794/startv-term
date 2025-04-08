<template>
  <div class="fandom-content-right">
    <div class="download-section">
      <h2>Down Load</h2>
      <div class="qr-box">
        <div class="qr-code">
          <!-- 这里放二维码图片 -->
        </div>
        <p>Scan QR code to download START TV App</p>
      </div>
    </div>

    <div class="latest-reviews">
      <h2>Latest Movie Reviews</h2>
      <div class="review-list">
        <div class="review-item" v-for="review in reviewList" :key="review.id">
          <div class="review-cover">
            <img :src="coverImage" alt="review cover">
          </div>
          <div class="review-info">
            <h3>{{ review.title }}</h3>
            <span class="review-date">{{ review.date }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import coverImage from '@/assets/images/image.png'

const reviewList = [
  {
    id: 1,
    title: 'Open Your Eyes, MyBillionaire Husband',
    date: '2025-03-28',
  },
  {
    id: 2,
    title: 'Open Your Eyes, MyBillionaire Husband',
    date: '2025-03-28',
  },
  {
    id: 3,
    title: 'Open Your Eyes, MyBillionaire Husband',
    date: '2025-03-28',
  },
  {
    id: 4,
    title: 'Open Your Eyes, MyBillionaire Husband',
    date: '2025-03-28',
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

.fandom-content-right {
  width: calc(40% - 16px);
  height: 1022px;
  border-left: 1px solid #2C2E31;
  padding-left: 32px;
  @include responsive-scale {
    width: calc(40% - calc(1024 / 1440 * 16px));
    height: calc(1024 / 1440 * 1022px);
    padding-left: calc(1024 / 1440 * 32px);
  }

  .download-section {
    margin-bottom: 48px;
    @include responsive-scale {
      margin-bottom: calc(1024 / 1440 * 48px);
    }

    h2 {
      font-size: 24px;
      font-weight: 600;
      color: #fff;
      margin-bottom: 24px;
      @include responsive-scale {
        font-size: calc(1024 / 1440 * 24px);
        margin-bottom: calc(1024 / 1440 * 24px);
      }
    }

    .qr-box {
      background-color: #D0A944;
      border-radius: 12px;
      padding: 24px;
      display: flex;
      align-items: center;
      gap: 16px;
      @include responsive-scale {
        padding: calc(1024 / 1440 * 24px);
        gap: calc(1024 / 1440 * 16px);
      }
      
      .qr-code {
        width: 120px;
        height: 120px;
        background-color: #fff;
        border-radius: 8px;
        @include responsive-scale {
          width: calc(1024 / 1440 * 120px);
          height: calc(1024 / 1440 * 120px);
        }
      }

      p {
        color: #000;
        font-size: 16px;
        font-weight: 500;
        flex: 1;
        @include responsive-scale {
          font-size: calc(1024 / 1440 * 16px);
        }
      }
    }
  }

  .latest-reviews {
    h2 {
      font-size: 24px;
      font-weight: 600;
      color: #fff;
      margin-bottom: 24px;
      @include responsive-scale {
        margin-bottom: calc(1024 / 1440 * 24px);
        font-size: calc(1024 / 1440 * 24px);
      }   
    }

    .review-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
      @include responsive-scale {
        gap: calc(1024 / 1440 * 16px);
      }
      
      .review-item {
        display: flex;
        gap: 16px;
        @include responsive-scale {
          gap: calc(1024 / 1440 * 16px);
        }
        
        .review-cover {
          width: 120px;
          height: 154px;
          border-radius: 16px;
          overflow: hidden;
          @include responsive-scale {
            width: calc(1024 / 1440 * 120px);
            height: calc(1024 / 1440 * 154px);
          }
          
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .review-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;

          h3 {
            font-size: 16px;
            color: #fff;
            margin-bottom: 8px;
            line-height: 1.4;
            @include responsive-scale {
              font-size: calc(1024 / 1440 * 16px);
            }
          }

          .review-date {
            font-size: 14px;
            color: #8B949E;
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
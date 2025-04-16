<template>
  <div class="points-container">
    <!-- 积分显示区域 -->
    <div class="bonus-section">
      <div class="bonus-label">
        Bonus <span class="info-icon">i</span>
      </div>
      <!-- <div class="bonus-amount">{{ userInfo.bonus||0 }}</div> -->
    </div>

    <!-- 签到区域 -->
    <div class="signin-section">
      <div class="signin-header">
        <span>Sign in to receive points</span>
        <span class="total-bonus">A Total of 1270 Bonus</span>
      </div>
      
      <div class="days-container">
        <div v-for="day in [0,1,2,3,4,5,6]" :key="day" 
             :class="['day-item', day < dailySignInfo.signDays ? 'active' : '']">
          <div class="day-label">Day {{day+1}}</div>
          <div class="coin-icon">
            <img src="@/assets/images/Vector.svg" alt="coin" v-if="day<dailySignInfo.signDays" />
            <img src="@/assets/images/Vectorno.svg" alt="coin" v-else />
          </div>
          <div class="points-value">+20</div>
          <div v-if="day < dailySignInfo.signDays" class="check-mark">
            <img src="@/assets/images/Game.svg" alt="coin" />
          </div>
        </div>
      </div>

      <div class="check-in-btn">Check in</div>
    </div>

    <!-- 分享区域 -->
    <div class="share-section">
      <div class="section-header">
        Share <span class="bonus-tag">+20 Bonus</span>
      </div>
      <div class="share-buttons">
        <div class="share-btn active" v-for="item in platforms" 
             :key="item.name">
            <div class="share-btn-icon">
                <img :src="item.icon" :alt="item.name" />
            </div>
          <div class="check-mark">
            <img src="@/assets/images/Game.svg" alt="coin" />
          </div>
        </div>
       
      </div>
    </div>

    <!-- 下载APP区域 -->
    <div class="download-section">
      <div class="download-content">
        <span>Download APP</span>
        <span class="bonus-tag">+20 Bonus</span>
      </div>
      <div class="arrow-icon">›</div>
    </div>
  </div>
</template>

<script setup>
import { ref,watch,onMounted } from 'vue'
import facebook2Icon from '@/assets/images/facebook2.svg'
import instagramIcon from '@/assets/images/instagram.svg'
import txIcon from '@/assets/images/tx.svg'
import whatsappIcon from '@/assets/images/social-whatsapp.svg'
import {getBonus} from '@/api/home'

const dailySignInfo=ref({})
const platforms = [
  { name: 'facebook2', icon: facebook2Icon },
  { name: 'instagram', icon: instagramIcon },
  { name: 'tx', icon: txIcon },
  { name: 'tx', icon: txIcon },
  { name: 'social-whatsapp', icon: whatsappIcon }
]
onMounted( () => {
  getBonus().then(res => {
    console.log(res)
    dailySignInfo.value = res.data.dailySignInfo
  })
})
</script>

<style scoped lang="scss">
@mixin responsive-scale {
  transition: all 0.3s ease-in-out;
  @media screen and (min-width: 500px) and (max-width: 1439px) {
    @content;
  }
}

.points-container {

  color: white;
  
  .bonus-section {
    background: linear-gradient(94.32deg, rgba(253, 52, 110, 0) 4.29%, rgba(253, 52, 110, 0.15) 100%);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid #2C2E31;

    .bonus-label {
      font-size: 14px;
      opacity: 0.8;
      display: flex;
      align-items: center;
      gap: 8px;

      .info-icon {
        width: 16px;
        height: 16px;
        border: 1px solid rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
      }
    }

    .bonus-amount {
      font-size: 32px;
      font-weight: bold;
      margin-top: 8px;
    }
  }

  .signin-section {
    height: 349px;
    background: #101D2B;
    border-radius: 12px;
    padding: 20px;
    font-size: 24px;
    margin-bottom: 32px;
    border: 1px solid #2C2E31;

    .signin-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;

      .total-bonus {
        color: #D0A944;
        font-size: 16px;
      }
    }

    .days-container {
        
      display: flex;
      justify-content: space-between;
      gap: 10px;
      margin-bottom: 32px;

      .day-item {
        width: 135px;
        height: 128px;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding: 12px;
        border: 1px solid #2C2E31;
        border-radius: 16px;
        position: relative;

        &.active {
          background: #D0A94480;
        }

        .day-label {
          font-size: 16px;
        }

        .coin-icon {
          width: 33px;
          height: 33px;
        //   background: #FFD700;
          border-radius: 50%;
        }

        .points-value {
          font-size: 16px;
        }

        .check-mark {
          position: absolute;
          bottom: 0px;
          right: 0px;
          width: 32px;
          height: 28px;
          border-radius: 16px;
        }
      }
    }

    .check-in-btn {
      width: 300px;
      height: 62px;
      margin: 0 auto;
      text-align: center;
      line-height: 62px;
      background: linear-gradient(180deg, #F0D89A 0%, #D0A944 100%);
      border-radius: 50px;
      color: var( --text-primary);
      font-size: 16px;
    }
  }

  .share-section {
    background: #101D2B;
    height: 211px;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid #2C2E31;

    .section-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 32px;
      font-size: 24px;

      .bonus-tag {
        font-size: 16px;
        color: #D0A944;
      }
    }

    .share-buttons {
      display: flex;
      justify-content: space-between;
      gap: 10px;

      .share-btn {
        width: 135px;
        height: 80px;
        flex: 1;
        background: transparent;
        border: 1px solid #2C2E31;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        .share-btn-icon {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background:#D0A944;

            img {
                width: 20px;
                height: 20px;
                margin: 0 auto;
                margin-top: 8px;
            }
        }
        &.active {
          background: #D0A94480;

          .check-mark {
            position: absolute;
            bottom: 0px;
            right: 0px;
            width: 32px;
            height: 28px;
            border-radius: 16px;
            
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }

  .download-section {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    .download-content {
      display: flex;
      align-items: center;
      gap: 10px;

      .bonus-tag {
        font-size: 12px;
        color: #FFD700;
      }
    }

    .arrow-icon {
      font-size: 24px;
    }
  }
}
</style>
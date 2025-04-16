<template>
  <div class="personal-center">
    <!-- 头部个人信息 -->
    <div class="user-header">
      <div class="header-bg"></div>
      <div class="header-content">
        <h1>Personal center</h1>
        <div class="user-info">
          <img :src="userInfo.avatarUrl" alt="user avatar" class="avatar">
          <div class="user-details">
            <h2>{{ userInfo.name }}</h2>
            <p class="user-id">UID {{ userInfo.userId }}</p>
          </div>
          <button class="top-up-btn">Top Up</button>
        </div>
        <div class="user-stats">
          <div class="stat-item">
            <span class="label">My Likes</span>
            <span class="value">{{ userInfo.likes }}</span>
          </div>
          <div class="stat-item">
            <span class="label">My Collection</span>
            <span class="value">{{ userInfo.collectList||0 }}</span>
          </div>
        </div>
      </div>

    
    </div>
    <div class="user-content-bg">
      <div></div>
    </div>
    <!-- 导航菜单 -->
    <div class="nav-menu">
      <div class="nav-item" :class="{ active: currentTab === 'wallet' }" @click="handleNavClick('wallet')">
        My wallet
      </div>
      <div class="nav-item" :class="{ active: currentTab === 'list' }" @click="handleNavClick('list')">
        {{ $t('message.My_list') }}
      </div>
      <div class="nav-item" :class="{ active: currentTab === 'history' }" @click="handleNavClick('history')">
        {{ $t('message.History') }}
      </div>
      <div class="nav-item" :class="{ active: currentTab === 'points' }" @click="handleNavClick('points')">
        {{ $t('message.Points_Center') }}
      </div>
    </div>

    <div class="user-content">
       <router-view></router-view>
          </div>

  </div>
</template>

<script setup>
import { ref, computed ,watch} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useHomeStore } from '@/stores/home'

import{useI18n} from 'vue-i18n'
const {t} = useI18n()
const homeStore = useHomeStore()
const route = useRoute();
const router = useRouter();
const userInfo = ref({})


// 计算当前激活的导航项
const currentTab = computed(() => {
  const path = route.path;
  if (path.includes('/wallet')) return 'wallet';
  if (path.includes('/list')) return 'list';
  if (path.includes('/history')) return 'history';
  if (path.includes('/points')) return 'points';
  return 'wallet'; // 默认显示wallet
});
watch(()=>homeStore.userInfo,(newValue)=>{
  userInfo.value = newValue
})

// 处理导航点击
const handleNavClick = (tab) => {
  router.push(`/user/${tab}`);
};
</script>

<style scoped lang="scss">
@mixin responsive-scale {
  transition: all 0.3s ease-in-out;

  @media screen and (min-width: 500px) and (max-width: 1439px) {
    @content;
  }
}

.personal-center {
  padding: 0 140px;
  color: var( --text-primary);
  min-height: 100vh;
  @include responsive-scale{
    padding: 0 calc(1024 / 1440 * 140px);
  }

  .user-header {
    position: relative;
    margin-bottom: 30px;
    overflow: hidden;
    @include responsive-scale{
      margin-bottom: calc(1024 / 1440 * 30px);
    }
    .header-bg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 220px; // 调整背景图高度
      background-image: url(../assets/images/image.png);
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      opacity: 0.6;
      @include responsive-scale{
        height: calc(1024 / 1440 * 220px);
      }

    }

    .header-content {
      padding: 0 32px;
      margin-top: 130px;
      position: relative;
      z-index: 1;
      @include responsive-scale{
        margin-top: calc(1024 / 1440 * 130px);
        padding: 0 calc(1024 / 1440 * 32px);
      }

      h1 {
        font-size: 24px;
        color: var( --text-primary);
        @include responsive-scale{
          font-size: calc(1024 / 1440 * 24px);
        }
      }

      .user-info {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-top: 32px;
        @include responsive-scale{
          margin-top: calc(1024 / 1440 * 32px);
          gap: calc(1024 / 1440 * 16px);
        }
        .avatar {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid rgba(255, 255, 255, 0.2);
          @include responsive-scale{
            width: calc(1024 / 1440 * 110px);
            height: calc(1024 / 1440 * 110px);
          }
        }

        .user-details {
          flex-grow: 1;

          h2 {
            font-size: 20px;
            margin-bottom: 4px;
            color: var( --text-primary);
            @include responsive-scale{
              font-size: calc(1024 / 1440 * 20px);
              margin-bottom: calc(1024 / 1440 * 4px);
            }
          }

          .user-id {
            color: rgba(255, 255, 255, 0.6);
            font-size: 14px;
            @include responsive-scale{
              font-size: calc(1024 / 1440 * 14px);
            }
          }
        }

        .top-up-btn {
          background: #D4AF37;
          color: #000;
          padding: 8px 24px;
          border-radius: 20px;
          border: none;
           
          font-weight: 500;
          transition: all 0.3s;
          @include responsive-scale{
            padding: calc(1024 / 1440 * 8px) calc(1024 / 1440 * 24px);
          }
         
        }
      }

      .user-stats {
        margin-top: 36px;
        display: flex;
        gap: 16px;
        @include responsive-scale{
          margin-top: calc(1024 / 1440 * 36px);
          gap: calc(1024 / 1440 * 16px);
        }
        .stat-item {
          .label {
            color: rgba(255, 255, 255, 0.6);
            font-size: 14px;
            margin-right: 10px;
            @include responsive-scale{
              font-size: calc(1024 / 1440 * 14px);
              margin-right: calc(1024 / 1440 * 10px);
            }
          }

          .value {
            color: var( --text-primary);
            font-weight: 500;
          }
        }
      }
    }

   
  }
  .user-content-bg {
      margin: 36px 0;
      height: 1px;
      padding: 0 32px;
      @include responsive-scale{
        margin: calc(1024 / 1440 * 36px) 0;
        padding: 0 calc(1024 / 1440 * 32px);
      }
      div{
        width: 100%;
        height: 1px;
        background: #1f2937;
      }
    }
  .nav-menu {
    padding: 0 32px;
    display: flex;
    gap: 30px;
    margin-bottom: 30px;
    @include responsive-scale{
      margin-bottom: calc(1024 / 1440 * 30px);
      gap: calc(1024 / 1440 * 30px);
      padding: 0 calc(1024 / 1440 * 32px);
    }

    .nav-item {
      color: #666;
       
      padding-bottom: 10px;
      position: relative;
      @include responsive-scale{
        padding-bottom: calc(1024 / 1440 * 10px);
      }

      &.active {
        color: #D4AF37;

        &:after {
          content: '';
          position: absolute;
          bottom: -11px;
          left: 0;
          width: 100%;
          height: 2px;
          background: #D4AF37;
          @include responsive-scale{
            bottom: calc(1024 / 1440 * -11px);
          }
        }
      }
    }
  }

  .user-content {
    padding: 0 32px;
    @include responsive-scale{
      padding: 0 calc(1024 / 1440 * 32px);
    }
  }
}
</style>
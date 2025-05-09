<template>
  <div class="home-content">
    <div class="nav-menu">
      <div 
        v-for="(item, index) in menuItems" 
        :key="index"
        class="menu-item"
        :class="{ active: index === activeIndex }"
        @click="activeIndex = index"
      >
        <img v-if="item.type === 'img'" src="@/assets/images/category.svg" :alt="item.text">
        <span v-else class="icon">{{ item.icon }}</span>
        <span class="text">{{ $t(item.text) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const activeIndex = ref(0)

const menuItems = ref([
  { type: 'img', icon: '@/assets/images/category.svg', text:  'message.All' },
  // { type: 'emoji', icon: '🕒', text: '观看历史' },
  // { type: 'emoji', icon: '🆕', text: 'message.New_Release' },
 
])
</script>

<style scoped lang="scss">
@mixin responsive-scale {
  transition: all 0.3s ease-in-out;
    @media screen and (min-width: 500px) and (max-width: 1439px) {
        @content;
    }
} 

.home-content {
  margin-top: 48px;
  @include responsive-scale {
    margin-top: calc(1024 / 1440 * 48px);
  } 
  .nav-menu {
    display: flex;
    gap: 8px;
    border-radius: 8px;
    overflow-x: auto;
    position: relative;

    .menu-item {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 10px 16px;
      border-radius: 20px;
       
      white-space: nowrap;
      transition: all 0.3s ease;
      border: 1px solid #2C2E31;
      flex-shrink: 0;
      @include responsive-scale {
        padding: calc(1024 / 1440 * 10px) calc(1024 / 1440 * 16px);
        gap: calc(1024 / 1440 * 8px);
      }
      img {
        width: 24px;
        height: 24px;
        @include responsive-scale {
          width: calc(1024 / 1440 * 24px);
          height: calc(1024 / 1440 * 24px);
        }
      }
      &.active {
        border: 1px solid #D0A944;
        .text {
          font-size: 14px;
          color: #D0A944;
          @include responsive-scale {
            font-size: calc(1024 / 1440 * 14px);
          }
        }
      }
      .text {
        font-size: 14px;
        color: #88888C;
        @include responsive-scale {
          font-size: calc(1024 / 1440 * 14px);
        }
      }
    }
  }
}
</style>
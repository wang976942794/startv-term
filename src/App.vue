<script setup>
import { useUserStore } from './stores/user'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'

const userStore = useUserStore()
const route = useRoute()

// 计算属性来判断是否显示 Footer
const showFooter = computed(() => {
  // 在 videoPlay 路由下不显示 Footer
  return !route.path.includes('/videoPlay')
})
</script>

<template>
    <div class="app-container">
        <header class="fixed-header">
            <Header></Header>
        </header>
        <main class="main-content">
            <router-view></router-view>
        </main>
        <Footer v-show="showFooter"></Footer>
    </div>
</template>

<style scoped>
@mixin responsive-scale {
    transition: all 0.3s ease-in-out;
    @media screen and (min-width: 500px) and (max-width: 1439px) {
        @content;
    }
}
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.app-container {
    min-height: 100vh;
    position: relative;
}

.fixed-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.main-content {
    padding-top: 100px; 
    /* 调整此值以匹配您的 header 实际高度 */
    min-height: calc(100vh - 100px);
    @include responsive-scale {
        padding-top: calc(1024 / 1440 * 100px);
        min-height: calc(1024 / 1440 * (100vh - 100px));
    }
}

.el-header {
    padding: 0;
    border-bottom: solid 1px #e6e6e6;
}

/* .el-footer {
    text-align: center;
    color: #666;
} */
</style>

<style>


/* 如果需要保持页面背景色一致 */
body {
  background-color: #000; /* 或者你项目中使用的背景色 */
}
</style>

<script setup>
import { useUserStore } from './stores/user'
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
const userStore = useUserStore()
</script>

<template>
    <div class="app-container">
        <header class="fixed-header">
            <Header></Header>
        </header>
        <main class="main-content">
            <router-view></router-view>
        </main>
        <Footer></Footer>
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
    padding-top: 100px; /* 调整此值以匹配您的 header 实际高度 */
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

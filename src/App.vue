<script setup>
import { useUserStore } from './stores/user'
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
const userStore = useUserStore()
</script>

<template>

 
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>

</template>

<style scoped>

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.el-container {
  min-height: 100vh;
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

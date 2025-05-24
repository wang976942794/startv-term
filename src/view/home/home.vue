<template>
  <div class="home">
    <Header></Header>
    <History></History>
    <Continue v-if="userStore.isLoggedIn&&homeStore.watchBookList.length>0"></Continue>
    <NewRelease></NewRelease>
    <MoreRecommended></MoreRecommended>
    <LoginDialog :visible="showLoginDialog" @update:visible="showLoginDialog = $event" />
  </div>
</template>

<script setup>
import Header from './components/header.vue'
import History from './components/history.vue'
import Continue from './components/Continue.vue'
import NewRelease from './components/newrelease.vue'
import MoreRecommended from './components/morerecommended.vue'
import { ref, onMounted } from 'vue'
import { useHomeStore } from '@/stores/home'
import { useUserStore } from '@/stores/user'
import LoginDialog from '@/components/LoginDialog.vue'

const homeStore = useHomeStore()
const userStore = useUserStore()
const showLoginDialog = ref(false)

onMounted(async () => {
  await homeStore.fetchHomePage()
  // 检查token，没有就弹窗
  if (!userStore.token) {
    showLoginDialog.value = true
  }
})
</script>

<style scoped lang="scss">
@mixin responsive-scale {
  transition: all 0.3s ease-in-out;
    @media screen and (min-width: 500px) and (max-width: 1439px) {
        @content;
    }
} 
.home {
  width: 100%;
  height: 100%;
  background-color: var(--bg-primary);
  padding: 0 60px;
  @include responsive-scale {
    padding: 0 calc(1024 / 1440 * 60px);
  }
}


</style>
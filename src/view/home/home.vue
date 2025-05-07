<template>
  <div class="home">
    <Header></Header>
    <History></History>

    <NewRelease></NewRelease>
    <MoreRecommended></MoreRecommended>
    <Continue></Continue>
  </div>
</template>

<script setup>
import Header from './components/header.vue'
import History from './components/history.vue'
import Continue from './components/Continue.vue'
import NewRelease from './components/newrelease.vue'
import MoreRecommended from './components/morerecommended.vue'
import { onMounted } from 'vue'
import { useHomeStore } from '@/stores/home'
const homeStore = useHomeStore()
onMounted(async () => {
    await homeStore.fetchHomePage()
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
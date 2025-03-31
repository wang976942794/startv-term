<template>
  <div class="home">
    <Header></Header>
    <History></History>
    <Content></Content>
    <NewRelease></NewRelease>
    <MoreRecommended></MoreRecommended>
  </div>
</template>

<script setup>
import Header from './components/header.vue'
import History from './components/history.vue'
import Content from './components/content.vue'
import NewRelease from './components/newrelease.vue'
import MoreRecommended from './components/morerecommended.vue'
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
  background-color: #0d1117;
  padding: 0 60px;
  @include responsive-scale {
    padding: 0 calc(1024 / 1440 * 60px);
  }
}


</style>
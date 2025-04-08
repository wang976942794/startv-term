<template>
  <div class="fandom-content">
    <FandomContentLeft />
    <FandomContentRight />
  </div>
</template>

<script setup>
import FandomContentLeft from './FandomContentLeft.vue'
import FandomContentRight from './FandomContentRight.vue'
</script>

<style lang="scss" scoped>
@mixin responsive-scale {
    transition: all 0.3s ease-in-out;

    @media screen and (min-width: 500px) and (max-width: 1439px) {
        @content;
    }
}

.fandom-content {
  padding: 0 172px;
  margin: 0 auto;
  min-width: 1096px;
  min-height: 1665px;
  display: flex;
  justify-content: space-between;
  @include responsive-scale {
    padding: 0 calc(1024 / 1440 * 172px);
  }
}
</style>
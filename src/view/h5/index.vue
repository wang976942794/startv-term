<template>
  <div class="h5-page">
    <!-- <div class="h5-header">
        <img src="@/assets/images/logo.svg" alt="logo"> 
    </div> -->
        <p class="h5-top">Download</p>
        <p class="h5-bottom">StarTv App</p>
        <p class="h5-title">Short on time, big on drama!</p>
    <div class="h5-content">
       <img src="@/assets/images/WechatIMG52.jpg" alt="download">
    </div>
    <div class="h5-footer">
       <div class="h5-footer-item">
         <img src="@/assets/images/appStore.svg" alt="download">
         <span>iOS Download</span>
       </div>
       <div class="h5-footer-item">
        <img src="@/assets/images/apk.svg" alt="download">
        <span>Android Download</span>
       </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
const router = useRouter();
const i18n = useI18n();
const t = i18n.t;

onMounted(() => {
  console.log('H5 Page mounted');
}); 
</script>
<style scoped>
.h5-page {
    width: 100vw;
    height: 100%;
    background-color: #fff;
    padding-top: 0.1px;
}
.h5-header {
    width: 100%;
    background-color: #fff;
    img {
        width: 150px;
        height: 50px;
    }
}
.h5-top {
    width: 100%;
    height: 42px;
    background-color: #fff;
    font-size: 32px;
    text-align: center;
    line-height: 42px;
    margin-top: 24px;
    font-weight: 400;
}
.h5-bottom {
    width: 100%;
    height: 42px;
    background-color: #fff;
    font-size: 32px;
    text-align: center;
    line-height: 42px;
    font-weight: 600;
    color: #D0A944;
}
.h5-title {
    width: 100%;
    height: 42px;
    background-color: #fff;
    font-size: 16px;
    text-align: center;
    margin-top: 24px;
}
.h5-content {
    width: 100%;
    height: 418px;
    background-color: #fff;
    margin-top: 24px;
    margin: 0 auto;
    img {
        width: 100%;
        height: 100%;
    }
}
.h5-footer {
    width: 343px;
    height: 120px;
    margin: 0 auto;
}
.h5-footer-item {
    width: 343px;
    height: 44px;
    background-color: #1C2028;
    border-radius: 100px;
    margin: 0 auto;
    margin-top: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    img {
        width: 24px;
        height: 24px;
    }
    span {
        font-size: 16px;
        color: #fff;
    }
}
</style>
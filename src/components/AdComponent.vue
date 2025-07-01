<template>
  <div class="ad-container" ref="adContainer" :style="containerStyle">
    <!-- 广告容器 -->
    <ins class="adsbygoogle"
         :style="adStyle"
         data-ad-client="ca-pub-9158090273799578"
         :data-ad-slot="adSlot"
         :data-ad-format="adFormat"
         :data-full-width-responsive="fullWidthResponsive"></ins>
  </div>
</template>

<script>
export default {
  name: 'AdComponent',
  props: {
    // 广告位ID
    adSlot: {
      type: String,
      default: '3624122999' // 默认使用图文广告位
    },
    // 广告格式
    adFormat: {
      type: String,
      default: 'auto'
    },
    // 是否全宽响应式
    fullWidthResponsive: {
      type: String,
      default: 'true'
    },
    // 自定义容器样式
    containerStyle: {
      type: Object,
      default: () => ({})
    },
    // 广告样式
    adStyle: {
      type: String,
      default: 'display:block'
    }
  },
  mounted() {
    // 确保 adsbygoogle 已经加载
    this.$nextTick(() => {
      try {
        // 初始化广告
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('AdSense 广告加载失败:', error);
      }
    });
  }
}
</script>

<style scoped>
.ad-container {
  width: 100%;
  margin: 20px 0;
  overflow: hidden;
  text-align: center;
}
</style> 
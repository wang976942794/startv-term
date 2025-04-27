<template>
  <div class="video-container">
    <video
      ref="videoPlayer"
      :src="videoOptions.src"
      :poster="videoOptions.poster"
      crossorigin="use-credentials"
      :playsinline="videoOptions.playsinline"
      class="video-player"
    >
    </video>
  </div>
</template>
  
<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, watch } from 'vue'
import Plyr from 'plyr'
import 'plyr/dist/plyr.css'
import Hls from 'hls.js'
import subtitleEn from '@/assets/subtitle/1.vtt'

const videoPlayer = ref(null)
let player = null

const props = defineProps({
  fontUrl: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  arUrl: {
    type: String,
    required: true
  },
  enUrl: {
    type: String,
    required: true
  }
})
// 处理视频URL，将原始地址转换为使用代理的地址
const getProxyUrl = (url) => {
  if (!url) return ''
  // 只替换域名部分，保持原始路径不变
  return url.replace('https://zhongdong-stream.startvs.net/', '/hls/')
}

const videoOptions = reactive({
  src: getProxyUrl(props.url),
  poster: props.fontUrl,
  crossorigin: 'use-credentials',
  playsinline: true
})

// 添加 SVG sprite URL
const spriteUrl = 'https://cdn.plyr.io/3.7.8/plyr.svg'

const plyrOptions = {
  controls: [
    'play-large',
    'play',
    'progress',
    'mute',
    'volume',
    'captions',
    'settings',
    'fullscreen'
  ],
  settings: ['captions', 'quality'],
  quality: {
    default: 1080,
    options: [2160, 1440, 1080, 720, 576, 480, 360, 240]
  },
  speed: {
    selected: 1,
    options: [0.5, 0.75, 1, 1.25, 1.5, 2]
  },
  captions: {
    active: true,
    language: 'en',
    update: true
  },
  volume: 0.8,
  muted: false,
  clickToPlay: true,
  hideControls: true,
  resetOnEnd: false,
  keyboard: { focused: true, global: false },
  tooltips: { controls: true, seek: true },
  i18n: {
    restart: '重新播放',
    play: '播放',
    pause: '暂停',
    mute: '静音',
    unmute: '取消静音',
    enableCaptions: '字幕',
    disableCaptions: '禁用',
    enterFullscreen: '全屏',
    exitFullscreen: '退出全屏',
    captions: '字幕',
    settings: '设置',
    normal: '正常',
    quality: '画质',
    loop: '循环',
    enabled: '启用',
    disabled: '禁用',
    auto: '自动',
    subtitleOptions: '字幕选项',
    'en': 'English',
    // 'ru': 'Русский',
    'ar': 'العربية',
    'captions-select': '选择字幕',
  },
  loadSprite: true,
  iconUrl: spriteUrl,  // 设置图标 URL
  iconPrefix: 'plyr',
  blankVideo: null,
  preload: 'auto',
  // 自定义主题色
  color: "#409eff"
}

// 监听 url 的变化
watch(() => props.url, (newUrl) => {
  if (newUrl) {
    const proxyUrl = getProxyUrl(newUrl)
    videoOptions.src = proxyUrl
    
    if (videoPlayer.value) {
      const video = videoPlayer.value
      
      if (newUrl.includes('.m3u8')) {
        if (Hls.isSupported()) {
          const hls = new Hls({
            xhrSetup: function(xhr) {
              xhr.withCredentials = true;
            }
          })
          hls.loadSource(proxyUrl)
          hls.attachMedia(video)
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            if (player) {
              player.destroy()
            }
            player = new Plyr(video, plyrOptions)
          })
        }
      } else {
        if (player) {
          player.destroy()
        }
        player = new Plyr(video, plyrOptions)
      }
    }
  }
})

// 监听 fontUrl 的变化
watch(() => props.fontUrl, (newUrl) => {
  if (newUrl) {
    videoOptions.poster = newUrl
  }
})

// 修改字幕 URL 的处理
const processSubtitleUrl = (url) => {
  if (!url) return url
  // 将原始 S3 URL 转换为使用本地代理的 URL
  return url.replace('https://subtitle-zhongdong.s3.me-central-1.amazonaws.com', '/subtitle')
}

onMounted(() => {
  if (videoPlayer.value) {
    const video = videoPlayer.value

    // 添加英语字幕轨道
    const trackEn = document.createElement('track')
    trackEn.kind = 'captions'
    trackEn.label = 'English'
    trackEn.srclang = 'en'
    trackEn.src = processSubtitleUrl(props.enUrl)
    trackEn.default = true  // 设置为默认字幕
    video.appendChild(trackEn)

    // 添加阿拉伯语字幕轨道
    const trackAr = document.createElement('track')
    trackAr.kind = 'captions'
    trackAr.label = 'العربية'
    trackAr.srclang = 'ar' 
    trackAr.src = processSubtitleUrl(props.arUrl)
    video.appendChild(trackAr)
    

    if (videoOptions.src.includes('.m3u8')) {
      if (Hls.isSupported()) {
        const hls = new Hls({
          xhrSetup: function(xhr) {
            xhr.withCredentials = true;
          }
        })
        hls.loadSource(videoOptions.src)
        hls.attachMedia(video)
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          player = new Plyr(video, plyrOptions)
        })
      }
    } else {
      player = new Plyr(video, plyrOptions)
    }
  }
})

onBeforeUnmount(() => {
  if (player) {
    player.destroy()
  }
})
</script>

<style lang="scss">
@mixin responsive-scale {
  transition: all 0.3s ease-in-out;
    @media screen and (min-width: 500px) and (max-width: 1439px) {
        @content;
    }
} 
/* 全局样式 */
:root {
  --plyr-color-main: #D0A944;
  --plyr-control-icon-size: 16px;
  --plyr-control-background-hover: transparent;
}

/* 控制栏样式 */
.plyr--video .plyr__controls {
  opacity: 0 !important; /* 默认隐藏 */
  transform: translateY(100%) !important; /* 默认位于下方 */
  transition: all 0.3s ease !important;
  padding: 0 !important;
  background: #2C2E31 !important;
  height: 50px;
  bottom: 0 !important; /* 确保控制栏在底部 */
    @include responsive-scale {
      height: calc(1024 / 1440 * 50px);
    }
}

/* 当鼠标悬停在播放器上时显示控制栏 */
.plyr--video:hover .plyr__controls {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

/* 进度条样式 */
.plyr--full-ui input[type='range'] {
  width: 100% !important;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.3);
  margin: 0 !important;
  padding: 0 !important;
  @include responsive-scale {
    height: calc(1024 / 1440 * 4px);
  }
}

/* 进度条容器样式 */
.plyr__progress__container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  padding: 0 !important;
  margin: 0 !important;
}

/* 进度条实际可点击区域 */
.plyr__progress {
  margin: 0 !important;
  left: 0 !important;
  right: 0 !important;
  width: 100% !important;
}












</style>

<style lang="scss" scoped>
@mixin responsive-scale {
  transition: all 0.3s ease-in-out;
  @media screen and (min-width: 500px) and (max-width: 1439px) {
    @content;
  }
}

.video-container {
  // aspect-ratio: 488 / 868;
  width: 488px;
  height: auto;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease-in-out !important;
  @include responsive-scale {
    width: calc(1024 / 1440 * 488px);
    height: auto;
  }

}

.video-player {
    // width: 100%;
    // height: 100%;
  object-fit: contain;
  transition: all 0.3s ease-in-out !important;
}
</style>

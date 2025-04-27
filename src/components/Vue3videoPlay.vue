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
  settings: ['captions'],

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

// 修改 convertSrtToVtt 函数，添加更多错误处理和日志
const convertSrtToVtt = async (srtUrl) => {
  try {
    console.log('Converting subtitle:', srtUrl)
    const response = await fetch(processSubtitleUrl(srtUrl))
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const srtContent = await response.text()
    console.log('Subtitle content received, length:', srtContent.length)
    
    // 转换 SRT 为 VTT 格式
    let vttContent = 'WEBVTT\n\n'
    
    // 移除 BOM 和空行
    const lines = srtContent.trim().replace(/^\uFEFF/, '').split(/\r?\n/)
    
    let currentBlock = []
    let index = 0
    for (const line of lines) {
      if (line.trim() === '') {
        if (currentBlock.length > 0) {
          // 处理时间戳
          const timeLine = currentBlock[1]
          if (timeLine) {
            // 将 SRT 时间格式转换为 VTT 格式（将逗号改为点）
            const vttTime = timeLine.replace(/,/g, '.')
            currentBlock[1] = vttTime
          }
          
          // 添加到 VTT 内容
          vttContent += currentBlock.slice(1).join('\n') + '\n\n'
          currentBlock = []
        }
      } else {
        currentBlock.push(line)
      }
      index++
    }
    
    // 处理最后一个块
    if (currentBlock.length > 0) {
      const timeLine = currentBlock[1]
      if (timeLine) {
        const vttTime = timeLine.replace(/,/g, '.')
        currentBlock[1] = vttTime
      }
      vttContent += currentBlock.slice(1).join('\n') + '\n\n'
    }
    
    console.log('VTT content generated, length:', vttContent.length)
    
    // 创建 Blob 和 URL
    const blob = new Blob([vttContent], { type: 'text/vtt' })
    const url = URL.createObjectURL(blob)
    console.log('Blob URL created:', url)
    return url
  } catch (error) {
    console.error('Error converting SRT to VTT:', error)
    return null
  }
}

// 修改字幕处理函数
const processSubtitleUrl = (url) => {
  if (!url) return url
  return url.replace('https://subtitle-zhongdong.s3.me-central-1.amazonaws.com', '/subtitle')
}

// 修改 onMounted 函数
onMounted(async () => {
  if (videoPlayer.value) {
    const video = videoPlayer.value

    try {
      // 等待所有字幕转换完成
      const [enVttUrl, arVttUrl] = await Promise.all([
        props.enUrl ? convertSrtToVtt(props.enUrl) : null,
        props.arUrl ? convertSrtToVtt(props.arUrl) : null
      ])

      // 添加英语字幕轨道
      if (enVttUrl) {
        const trackEn = document.createElement('track')
        trackEn.kind = 'captions'
        trackEn.label = 'English'
        trackEn.srclang = 'en'
        trackEn.src = enVttUrl
        trackEn.default = true
        video.appendChild(trackEn)
        console.log('English track added:', trackEn.src)
      }

      // 添加阿拉伯语字幕轨道
      if (arVttUrl) {
        const trackAr = document.createElement('track')
        trackAr.kind = 'captions'
        trackAr.label = 'العربية'
        trackAr.srclang = 'ar'
        trackAr.src = arVttUrl
        video.appendChild(trackAr)
        console.log('Arabic track added:', trackAr.src)
      }

      // 确保在添加字幕轨道后再初始化 Plyr
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
            // 强制启用字幕
            player.captions.toggle(true)
          })
        }
      } else {
        player = new Plyr(video, plyrOptions)
        // 强制启用字幕
        player.captions.toggle(true)
      }
    } catch (error) {
      console.error('Error setting up video player:', error)
    }
  }
})

// 添加字幕变化监听
watch([() => props.enUrl, () => props.arUrl], async ([newEnUrl, newArUrl]) => {
  if (videoPlayer.value && player) {
    // 移除现有字幕轨道
    while (videoPlayer.value.getElementsByTagName('track').length > 0) {
      videoPlayer.value.getElementsByTagName('track')[0].remove()
    }

    // 添加新的字幕轨道
    if (newEnUrl) {
      const enVttUrl = await convertSrtToVtt(newEnUrl)
      if (enVttUrl) {
        const trackEn = document.createElement('track')
        trackEn.kind = 'captions'
        trackEn.label = 'English'
        trackEn.srclang = 'en'
        trackEn.src = enVttUrl
        trackEn.default = true
        videoPlayer.value.appendChild(trackEn)
      }
    }

    if (newArUrl) {
      const arVttUrl = await convertSrtToVtt(newArUrl)
      if (arVttUrl) {
        const trackAr = document.createElement('track')
        trackAr.kind = 'captions'
        trackAr.label = 'العربية'
        trackAr.srclang = 'ar'
        trackAr.src = arVttUrl
        videoPlayer.value.appendChild(trackAr)
      }
    }

    // 刷新 Plyr 字幕
    player.captions.toggle(false)
    player.captions.toggle(true)
  }
}, { immediate: false })

onBeforeUnmount(() => {
  if (player) {
    player.destroy()
  }
  // 清理所有创建的 Blob URLs
  const tracks = videoPlayer.value?.getElementsByTagName('track')
  if (tracks) {
    Array.from(tracks).forEach(track => {
      if (track.src.startsWith('blob:')) {
        URL.revokeObjectURL(track.src)
      }
    })
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

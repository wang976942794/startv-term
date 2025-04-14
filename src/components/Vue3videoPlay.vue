<template>
    <vue3-video-play
    v-bind="options" 
    @play="onPlay"
    @pause="onPause" 
    @timeupdate="onTimeupdate" 
    @canplay="onCanplay"
    />
</template>
  
<script setup>
import { reactive, watch } from 'vue'
import Vue3VideoPlay from 'vue3-video-play'
import 'vue3-video-play/dist/style.css'
import Hls from 'hls.js'  // 需要先安装 hls.js

// 定义 props
const props = defineProps({
  fontUrl: {
    type: String,
    default: ''
  },
  url: {
    type: String,
    default: ''
  }
})

console.log('Props received:', props.url)

// 处理视频URL，将原始地址转换为使用代理的地址
const getProxyUrl = (url) => {
  if (!url) return ''
  return url.replace('https://zhongdong-stream.startvs.net', '/hls')
}

const options = reactive({
  width: '100%', //播放器高度
  height: '100%', //播放器高度
  color: "#409EFF", //主题色
  muted: false, //静音
  webFullScreen: false,
  speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
  autoPlay: false, //自动播放
  loop: false, //循环播放
  mirror: false, //镜像画面
  ligthOff: false,  //关灯模式
  volume: 0.3, //默认音量大小
  control: true, //是否显示控制器
  controlBtns: [
    "audioTrack",
    "quality",
    "speedRate",
    "volume",
    "setting",
    "pip",
    "pageFullScreen",
    "fullScreen",
  ],
  title: '', //视频名称
  src: getProxyUrl(props.url), // 使用代理URL
  poster: props.fontUrl, //封面
  type: 'application/x-mpegURL',  // 添加这行，指定视频类型为 HLS
  tracks: [ // 字幕配置
    {
      default: true, // 默认显示的字幕
      kind: 'subtitles',
      label: '中文',
      src: '/path/to/chinese.vtt', // 中文字幕文件路径
      srclang: 'zh'
    },
    {
      kind: 'subtitles',
      label: 'English',
      src: '/path/to/english.vtt', // 英文字幕文件路径
      srclang: 'en'
    }
  ]
})

// 监听 fontUrl 的变化
watch(() => props.fontUrl, (newUrl) => {
  console.log('fontUrl changed:', newUrl)
  if (newUrl) {
    options.src = newUrl
    console.log('Video source updated:', options.src)
  }
})

// 监听 url 的变化
watch(() => props.url, (newUrl) => {
  console.log('url changed:', newUrl)
  if (newUrl) {
    const proxyUrl = getProxyUrl(newUrl)
    options.src = proxyUrl
    console.log('Video source updated:', options.src)
    
    // 检查浏览器是否原生支持 HLS
    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(newUrl)
      // 获取 video 元素
      const video = document.querySelector('video')
      if (video) {
        hls.attachMedia(video)
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play()
        })
      }
    }
    // 对于原生支持 HLS 的浏览器（如 Safari）
    else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = newUrl
    }
  }
})


const onPlay = (ev) => {
  console.log('播放')
}
const onPause = (ev) => {
  console.log(ev, '暂停')
}

const onTimeupdate = (ev) => {
//   console.log(ev, '时间更新')
}
const onCanplay = (ev) => {
  console.log(ev, '可以播放')
}
</script>
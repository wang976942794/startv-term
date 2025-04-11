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
import { reactive } from 'vue'
import Vue3VideoPlay from 'vue3-video-play/dist/index.umd.js'
import '@/assets/styles/video-play.css'

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
  src: "http://vjs.zencdn.net/v/oceans.mp4", //视频源
  poster: '', //封面
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
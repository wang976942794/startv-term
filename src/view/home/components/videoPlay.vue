<template>
  <div class="video-container">
    <!-- 左侧播放器预留位置 -->
    <div class="video-player">
      <!-- 等待数据加载完成后再渲染播放器 -->
      <Vue3VideoPlay 
        v-if="videoInfo.fontUrl && !isLoading" 
        ref="videoPlayer"
        :fontUrl="videoInfo.fontUrl" 
        :url="chapterInfo.url" 
      />
      <!-- 添加加载中的状态显示 -->
      <div v-if="isLoading" class="loading-state">
        Loading...
      </div>
    </div>

    <!-- 右侧信息区域 -->
    <div class="video-info">
      <!-- 面包屑导航 -->
      <div class="breadcrumb">
        <span>Home</span>
        <span>/</span>
        <span>{{ videoInfo.title }}</span>
        <span>/</span>
        <span>Episode {{ videoInfo.watchChapterId }}</span>
      </div>

      <!-- 标签页切换 -->
      <div class="tab-container">
        <div class="tab-item active">Introduction</div>
        <div class="tab-item">Comment ({{ videoInfo.commentCount }})</div>
      </div>

      <!-- 视频标题 -->
      <h1 class="video-title">{{ videoInfo.title }}</h1>

      <!-- 互动按钮 -->
      <div class="interaction-buttons">
        <div :class="chapterInfo.matchLike ? 'action' : 'button'" >
          <img src="@/assets/images/hearttrue.svg" alt="" v-if="chapterInfo.matchLike">
          <img src="@/assets/images/heart2.svg" alt="" v-else>
          <span>{{ videoInfo.collectNum }}</span>
        </div>
        <div :class="matchCollect ? 'action' : 'button'" @click="handleCollect(matchCollect)">
          <img src="@/assets/images/startrue.svg" alt="" v-if="matchCollect">
          <img src="@/assets/images/star2.svg" alt="" v-else>
          <span>{{ videoInfo.collectNum }}</span>
        </div>
        <div class="button">
          <img src="@/assets/images/link-2.svg" alt="">
          <span>Share</span>
        </div>
      </div>

      <!-- 剧情简介 -->
      <div class="plot-summary">
        <h3>Plot of Episode {{ videoInfo.episode }}</h3>
        <p>{{ videoInfo.plot }}</p>
        <div>{{ videoInfo.brief }} <span class="show-more">More</span></div>
      </div>

      <!-- 剧集选择 -->
      <div class="episode-selection">
        <div class="episode-tabs">
          <span v-for="(range, index) in episodeRanges" 
                :key="index"
                :class="{ active: activeRange === index }"
                @click="activeRange = index">
            {{ range.start }}-{{ range.end }}
          </span>
          <span :class="{ active: activeRange === -1 }"
                @click="activeRange = -1">
            All Episodes
          </span>
        </div>
        <div class="episode-grid">
          <div v-for="n in getVisibleEpisodes()" 
               :key="n" 
               :class="['episode-item', { active: n === Number(chapterId) }]"
               @click="handleEpisodeClick(n)">
            <span v-if="n !== Number(chapterId)">{{ n }}</span>
            <img src="@/assets/gif/viderPlay.gif" alt="" v-else>
            
            <!-- 添加空值检查 -->
            <img v-if="isEpisodeLocked(n)" 
                 src="@/assets/images/lock.svg" 
                 alt="" 
                 class="lock-icon">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import Vue3VideoPlay from '@/components/Vue3videoPlay.vue'
import { getVideoInfo, getChapterInfo,getChapterCollect,getChapterCollectCancel } from '@/api/home'
import { ElMessage } from 'element-plus'

const route = useRoute()
const videoInfo = ref({})
const chapterInfo = ref({})  // 添加章节信息的响应式引用

// 获取路由参数
const bookId = ref(route.query.bookId)
const chapterId = ref(route.query.chapterId==0?1:route.query.chapterId)
const matchCollect = ref(false)
const activeRange = ref(0)

// 计算集数区间
const episodeRanges = computed(() => {
  const ranges = []
  const totalEpisodes = videoInfo.value?.allNum || 0
  
  for (let i = 0; i < totalEpisodes; i += 50) {
    ranges.push({
      start: i + 1,
      end: Math.min(i + 50, totalEpisodes)
    })
  }
  
  return ranges
})

// 获取当前应该显示的集数
const getVisibleEpisodes = () => {
  if (activeRange.value === -1) {
    // 显示所有集数
    return videoInfo.value?.allNum || 0
  }
  
  const currentRange = episodeRanges.value[activeRange.value]
  if (!currentRange) return 0
  
  // 返回当前区间的集数
  return Array.from(
    { length: currentRange.end - currentRange.start + 1 },
    (_, i) => currentRange.start + i
  )
}

const videoPlayer = ref(null)
const isLoading = ref(false)

// 添加判断集数是否锁定的方法
const isEpisodeLocked = (episodeNum) => {
  // 如果 unlockChapterId 为 null 或 undefined，默认只解锁第一集
  const unlockedEpisode = videoInfo.value?.unlockChapterId ?? 1
  return episodeNum > unlockedEpisode
}
//点击收藏
const handleCollect = async (type) => {
console.log("是否手粗昂",type);
if(type){
  const res = await getChapterCollectCancel({
    bookId: bookId.value,
    chapterId: chapterId.value
  })
  matchCollect.value = false
}else{
  const res = await getChapterCollect({
    bookId: bookId.value,
    chapterId: chapterId.value
  })
  matchCollect.value = true
}
}

// 封装获取视频和章节信息的函数
const fetchVideoAndChapterInfo = async (bookId, chapterId) => {
  try {
    const [videoRes, chapterRes] = await Promise.all([
      getVideoInfo({
        bookId,
        chapterId
      }),
      getChapterInfo({
        bookId,
        chapterId
      }),
    ])
    console.log("collectRes",chapterRes);
      
    if (videoRes.code === 100000) {
      videoInfo.value = videoRes.data.bookInfoResp
    }

    if (chapterRes.code === 100000) {
      chapterInfo.value = chapterRes.data
      matchCollect.value = chapterRes.data.matchCollect
    }

    return { videoRes, chapterRes }
  } catch (error) {
    console.error('Failed to fetch data:', error)
    throw error
  }
}

// 修改点击处理函数
const handleEpisodeClick = async (episodeNum) => {
  try {
    isLoading.value = true
    chapterId.value = episodeNum
    
    await fetchVideoAndChapterInfo(bookId.value, episodeNum)
  } catch (error) {
    console.error('Failed to fetch episode data:', error)
  } finally {
    isLoading.value = false
  }
}

// 修改 onMounted
onMounted(async () => {
  window.scrollTo(0, 0)
  
  try {
    console.log(bookId.value, chapterId.value)
    await fetchVideoAndChapterInfo(bookId.value, chapterId.value)
  } catch (error) {
    console.error('Failed to fetch initial data:', error)
  }
})
</script>

<style lang="scss" scoped>
@mixin responsive-scale {
  transition: all 0.3s ease-in-out;
  @media screen and (min-width: 500px) and (max-width: 1439px) {
      @content;
  }
}
.video-container {
  display: flex;
  justify-content: space-around;
  gap: 24px;
  color: #fff;
  height: calc(100vh - 137px);
  @include responsive-scale {
    padding:calc(1024 / 1440 * 60px);
    height: calc(1024 / 1440 * 868px);

  }
  .video-player {
    background: #000;
    width: 952px;
    height: 868px;
    @include responsive-scale {
      width: calc(1024 / 1440 * 952px);
      height: calc(1024 / 1440 * 868px);
    }

    .loading-state {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 20px;
    }
  }

  .video-info {
    width: 488px;
    height: 868px;
    padding: 20px;
    @include responsive-scale {
      width: calc(1024 / 1440 * 488px);
      height: calc(1024 / 1440 * 868px);
    }

    .breadcrumb {
      color: #999;
      margin-bottom: 20px;
      @include responsive-scale {
        margin-bottom: calc(1024 / 1440 * 20px);
      }

      span {
        margin: 0 8px;
        &:first-child {
          margin-left: 0;
        }
      }
    }

    .tab-container {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
      @include responsive-scale {
        margin-bottom: calc(1024 / 1440 * 20px);
      }

      .tab-item {

        padding-bottom: 8px;
        @include responsive-scale {
          padding-bottom: calc(1024 / 1440 * 8px);
        }

        &.active {
          color: #f0b90b;
          border-bottom: 2px solid #f0b90b;
        }
      }
    }

    .video-title {
      font-size: 24px;
      margin-bottom: 20px;
      @include responsive-scale {
        margin-bottom: calc(1024 / 1440 * 20px);
        font-size: calc(1024 / 1440 * 24px);
      }
    }

    .interaction-buttons {
      display: flex;
      gap: 20px;
      margin-bottom: 24px;
      @include responsive-scale {
        margin-bottom: calc(1024 / 1440 * 24px);
        gap: calc(1024 / 1440 * 20px);
      }

      .button {
        width: 119px;
        height: 46px;
        border: 1px solid #2C2E31;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        border-radius: 50px;
        @include responsive-scale {
          width: calc(1024 / 1440 * 119px);
          height: calc(1024 / 1440 * 46px);
          gap: calc(1024 / 1440 * 8px);
          padding: calc(1024 / 1440 * 8px) calc(1024 / 1440 * 16px);
          border-radius: calc(1024 / 1440 * 50px);
        }

        img {
          filter: brightness(0) invert(1); // 默认白色
        }

        &:hover {
          border-color: #D0A944;
          color: #D0A944;

          img {
            // 将图标改为金色 (#D0A944)
            filter: brightness(0) saturate(100%) invert(71%) sepia(19%) saturate(1095%) hue-rotate(356deg) brightness(89%) contrast(90%);
          }
        }
      }

      .action {
        width: 119px;
        height: 46px;
        border: 1px solid #2C2E31;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        border-radius: 50px;
        border-color: #2C2E31;
        color: #FFFFFF;
        @include responsive-scale {
          width: calc(1024 / 1440 * 119px);
          height: calc(1024 / 1440 * 46px);
          gap: calc(1024 / 1440 * 8px);
          padding: calc(1024 / 1440 * 8px) calc(1024 / 1440 * 16px);
          border-radius: calc(1024 / 1440 * 50px);
        }
      }
    }

    .plot-summary {
      margin-bottom: 24px;
      @include responsive-scale {
        margin-bottom: calc(1024 / 1440 * 24px);
      }

      h3 {
        margin-bottom: 12px;
        @include responsive-scale {
          margin-bottom: calc(1024 / 1440 * 12px);
        }
      }

      p {
        color: #999;
        line-height: 1.6;
      }

      .show-more {
        color: #f0b90b;

        margin-top: 8px;
        @include responsive-scale {
          margin-top: calc(1024 / 1440 * 8px);
        }
      }
    }

    .episode-selection {
      .episode-tabs {
        display: flex;
        gap: 16px;
        margin-bottom: 16px;
        @include responsive-scale {
          margin-bottom: calc(1024 / 1440 * 16px);
          gap: calc(1024 / 1440 * 16px);
        }

        span {
          padding: 4px 12px;
          border-radius: 32px;
          border: 1px solid #2C2E31;
          @include responsive-scale {
            padding: calc(1024 / 1440 * 4px) calc(1024 / 1440 * 12px);
            border-radius: calc(1024 / 1440 * 16px);
          }

          &.active {
            border: 1px solid #D0A944;
            color: #D0A944;
          }
        }
      }

      .episode-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        overflow-y: auto;
        height: 400px;
        scrollbar-width: none;  /* Firefox */
        -ms-overflow-style: none;  /* IE and Edge */
        &::-webkit-scrollbar {
          display: none;  /* Chrome, Safari and Opera */
        }
        @include responsive-scale {
          height: calc(1024 / 1440 * 400px);
          gap: calc(1024 / 1440 * 12px);
        }

        .episode-item {
          width: 62px;
          height: 59px;
          background: rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          cursor: pointer;  // 添加鼠标指针样式
          position: relative;
          &.active {
            border: 1px solid #D0A944; // 选中状态的背景色
          }

          &:hover {
            background: rgba(255, 255, 255, 0.2);
          
          }
          .lock-icon{
            position: absolute;
            top: 0;
            right: 0;
            width: 24px;
            height: 20px;
            object-fit: cover;
          }
          @include responsive-scale {
            width: calc(1024 / 1440 * 62px);
            height: calc(1024 / 1440 * 59px);
            border-radius: calc(1024 / 1440 * 12px);
          }

          // 为未解锁的集数添加特殊样式
          &[data-locked="true"] {
            opacity: 0.7;
            cursor: not-allowed;
            
            &:hover {
              background: rgba(255, 255, 255, 0.1);  // 禁用hover效果
            }
          }
        }
      }
    }
  }
}
</style>
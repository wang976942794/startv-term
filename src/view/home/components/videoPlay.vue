<template>
  <div class="video-container">
    <div class="video-player-bg" @click="handleBack">
        <img src="@/assets/images/arrow-left.svg" alt="">
       </div>
    <!-- 左侧播放器预留位置 -->
    <div class="video-player">
      <!-- 等待数据加载完成后再渲染播放器 -->
       
      <Vue3VideoPlay 
        v-if="videoInfo.fontUrl && !isLoading" 
        ref="videoPlayer"
        :fontUrl="videoInfo.fontUrl" 
        :url="chapterInfo.url" 
        :arUrl="subtitle.arUrl"
        :enUrl="subtitle.enUrl"
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
        <span>{{ $t('message.Home') }}</span>
        <span>/</span>
        <span>{{ videoInfo.title }}</span>
        <span>/</span>
        <span class="color-[var( --text-primary)]">Episode {{ chapterId  }}</span>
      </div>

      <!-- 标签页切换 -->
      <div class="tab-container">
        <div 
          class="tab-item" 
          :class="{ active: activeTab === 'introduction' }"
          @click="activeTab = 'introduction'"
        >
          Introduction
        </div>
        <div 
          class="tab-item" 
          :class="{ active: activeTab === 'comments' }"
          @click="activeTab = 'comments'"
        >
          {{ $t('message.Comments') }} ({{ comments.length }})
        </div>
      </div>

      <!-- 内容区域 -->
      <div v-if="activeTab === 'introduction'">
        <!-- 原有的介绍内容 -->
        <h1 class="video-title">{{ videoInfo.title }}</h1>
        <!-- 互动按钮 -->
        <div class="interaction-buttons">
          <div :class="chapterInfo.matchLike ? 'action' : 'button'" >
            <img src="@/assets/images/hearttrue.svg" alt="" v-if="chapterInfo.matchLike">
            <img src="@/assets/images/heart2.svg" alt="" v-else style="filter: var(--icon-filter);">
            <span>{{ chapterInfo.likeNum }}</span>
          </div>
          <div :class="matchCollect ? 'action' : 'button'" @click="handleCollect(matchCollect)">
            <img src="@/assets/images/startrue.svg" alt="" v-if="matchCollect">
            <img src="@/assets/images/star2.svg" alt="" v-else style="filter: var(--icon-filter);">
            <span>{{ chapterInfo.likeNum }}</span>
          </div>
          <div class="button">
            <img src="@/assets/images/link-2.svg" alt="" style="filter: var(--icon-filter);">
            <span>{{ $t('message.Share') }}</span>
          </div>
        </div>

        <!-- 剧情简介 -->
        <div class="plot-summary">
          <h3> {{ $t('message.Plot_of_Episode') }} {{ videoInfo.episode }}</h3>
          <p>{{ videoInfo.plot }}</p>
          <div>{{ videoInfo.brief }} <span class="show-more">{{ $t('message.More') }}</span></div>
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
              {{ $t('message.All_Episodes') }}
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

      <div v-else-if="activeTab === 'comments'" class="comments-section">
        <div class="comment-list">
          <div v-for="comment in comments" :key="comment.id" class="comment-item">
            <div class="user-avatar">
              <img :src="comment.avatarUrl" alt="avatar">
            </div>
            <div class="comment-content">
              <div class="user-name">{{ comment.name }}</div>
              <div class="comment-text">{{ comment.userCommentPO.content }}</div>
            </div>
          </div>
        </div>
        <div class="comment-input">
          <input type="text" :placeholder="$t('message.SendMessage')" v-model="commentContent" />
          <button class="send-button" @click="postComment">
            <img src="@/assets/images/send.svg" alt="send">
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute,useRouter } from 'vue-router'
import Vue3VideoPlay from '@/components/Vue3videoPlay.vue'
import { getVideoInfo, getChapterInfo,getChapterCollect,getChapterCollectCancel,getComment,sendComment,getSubtitle } from '@/api/home'
import { ElMessage } from 'element-plus'
import{useI18n} from 'vue-i18n'
const {t} = useI18n()
const route = useRoute()
const router = useRouter()
const videoInfo = ref({})
const chapterInfo = ref({})  // 添加章节信息的响应式引用
const subtitle = ref({})

// 获取路由参数
const bookId = ref(route.query.bookId)
const chapterId = ref(route.query.chapterId==0?1:route.query.chapterId)
const matchCollect = ref(false)
const activeRange = ref(0)
const activeTab = ref('introduction')
const commentContent = ref('')
const comments = ref([])  

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
// 发表评论
const postComment = async () => {
  const res = await sendComment({
    bookId: bookId.value,
    chapterId: chapterId.value,
    content: commentContent.value,
    parentId: 0
  })
  if(res.code === 100000){
    ElMessage.success(t('message.Comment_Success'))
    commentContent.value = ''
    handleComment()

  }
}
// 封装获取视频和章节信息的函数
const fetchVideoAndChapterInfo = async (bookId, chapterId) => {
  try {
    const [videoRes, chapterRes,subtitleRes] = await Promise.all([
      getVideoInfo({
        bookId,
        chapterId
      }),
      getChapterInfo({
        bookId,
        chapterId
      }),
      getSubtitle({
        bookId,
        chapterId
      }),
    ]) 
    if (videoRes.code === 100000) {
      videoInfo.value = videoRes.data.bookInfoResp
    }

    if (chapterRes.code === 100000) {
      chapterInfo.value = chapterRes.data
      matchCollect.value = chapterRes.data.matchCollect
    }
    if (subtitleRes.code === 100000) {
      console.log("subtitleRes",subtitleRes);
      subtitle.value = subtitleRes.data
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
const handleBack = () => {
  router.push({
    path: '/',
   
  })
}
//获取评论
const handleComment = async () => {
  const res = await getComment({
    bookId: bookId.value,
    chapterId: chapterId.value
  })
  console.log("res",res);
  
  if(res.code === 100000){
    comments.value = res.data
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
  handleComment()
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
  justify-content: space-between;
  gap: 24px;
  color: var( --text-primary);
  margin: 0;
  padding: 0;
  width: 100%;
  height: calc(100vh - 100px);
  overflow: hidden;
  position: relative;
  @include responsive-scale {
    height: calc(1024 / 1440 * 100vh);
  }
  .video-player-bg{
      width: 60px ;
      height: 60px;
      background:#2C2E31;
      border-radius: 50%;
      padding-top: 0.1px;
      position: absolute;
      top: 0;
      left: 120px;
      z-index: 100;
     img{
      width: 24px;
      height: 24px;
      object-fit: cover;
      margin-top: 18px;
      margin-left: 18px;
     }
    }
  .video-player {
    // background: var(--bg-secondary);
    // width: 952px;
    // height: 868px;
    margin: 0 auto;
    @include responsive-scale {
      // width: calc(1024 / 1440 * 952px);
      height: calc(1024 / 1440 * 868px);
    }


    .loading-state {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var( --text-primary);
      font-size: 20px;
    }
  }

  .video-info {
    width: 488px;
    // height: 868px;
    padding: 0 32px;
    border-left: 1px solid #2C2E31;
    @include responsive-scale {
      width: calc(1024 / 1440 * 488px);
      // height: calc(1024 / 1440 * 868px);
    }

    .breadcrumb {
      color: #999;
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #2C2E31;
      @include responsive-scale {
        margin-bottom: calc(1024 / 1440 * 20px);
      }

      span {
        margin: 0 6px;
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
        cursor: pointer;
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
        color: var( --text-primary)FFF;
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
      border-top: 1px solid #2C2E31;
      padding-top: 24px;
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

.comments-section {
  height: calc(100vh - 240px);
  display: flex;
  flex-direction: column;
  @include responsive-scale {
    height: calc(1024 / 1440 * 100vh -  calc(1024 / 1440 * 240px));
  }
  .comment-list {
    flex: 1;
    height: 400px;
    overflow-y: auto;
    padding: 16px 0;
    @include responsive-scale {
      padding: calc(1024 / 1440 * 16px) 0;
    }
    
    .comment-item {
      display: flex;
      gap: 12px;
      margin-bottom: 16px;
      @include responsive-scale {
        margin-bottom: calc(1024 / 1440 * 16px);
        gap: calc(1024 / 1440 * 12px);
      }
      
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        @include responsive-scale {
          width: calc(1024 / 1440 * 40px);
          height: calc(1024 / 1440 * 40px);
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      
      .comment-content {
        flex: 1;
        
        .user-name {
          font-weight: 500;
          margin-bottom: 4px;
        }
        
        .comment-text {
          color: var(--text-secondary);
        }
      }
    }
  }
  
  .comment-input {
    display: flex;
    gap: 12px;
    padding: 16px 0;
    border-top: 1px solid #2C2E31;
    @include responsive-scale {
      padding: calc(1024 / 1440 * 16px) 0;
      gap: calc(1024 / 1440 * 12px);
    }
    
    input {
      flex: 1;
      background: transparent;
      border: none;
      color: var(--text-primary);
      background: #2C2E31;
      width: 424px;
      height: 48px;
      border-radius: 30px;
      padding-left: 16px;
      outline: none;
      
      &::placeholder {
        color: var(--text-secondary);
      }
      @include responsive-scale {
        width: calc(1024 / 1440 * 424px);
        height: calc(1024 / 1440 * 48px);
        border-radius: calc(1024 / 1440 * 30px);
        padding-left: calc(1024 / 1440 * 16px);
      }
    }
    
    .send-button {
      background: transparent;
      border: none;
      padding: 8px;
      img {
        width: 24px;
        height: 24px;
        filter: var(--icon-filter);
        @include responsive-scale {
          width: calc(1024 / 1440 * 24px);
          height: calc(1024 / 1440 * 24px);
        }
      }
      
      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>
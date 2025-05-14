<template>
  <div class="points-container">
    <!-- 积分显示区域 -->
    <div class="bonus-section">
      <div class="bonus-label">
        Bonus <span class="info-icon">i</span>
      </div>
      <!-- <div class="bonus-amount">{{ userInfo.bonus||0 }}</div> -->
    </div>

    <!-- 签到区域 -->
    <div class="signin-section">
      <div class="signin-header">
        <span>{{ $t('message.Log_in_to_earn_points') }}</span>
        <span class="total-bonus">{{ $t('message.Total_of_1270_Coins') }}</span>
      </div>
      
      <div class="days-container">
        <div v-for="day in [0,1,2,3,4,5,6]" :key="day" 
             :class="['day-item', isDaySigned(day) ? 'active' : '']">
          <div class="day-label">Day {{day+1}}</div>
          <div class="coin-icon">
            <img src="@/assets/images/Vector.svg" alt="coin" v-if="isDaySigned(day)" />
            <img src="@/assets/images/Vectorno.svg" alt="coin" v-else />
          </div>
          <div class="points-value">+20</div>
          <div v-if="isDaySigned(day)" class="check-mark">
            <img src="@/assets/images/Game.svg" alt="coin" />
          </div>
        </div>
      </div>

      <div class="check-in-btn" 
           :class="{ 'disabled': !dailySignInfo.signAvailable }"
           @click="handleSignIn">
       {{ $t('message.Check_in') }}
      </div>
    </div>

    <!-- 分享区域 -->
    <div class="share-section">
      <div class="drama-progress">
        <div class="drama-header">
          <h2>Watch new dramas</h2>
          <div class="points-info">
            <span class="points-earned">+172</span>
            <span class="points-label">at most</span>
          </div>
          <button class="watch-btn" @click="handleWatchReward">Watch</button>
        </div>
        
        <div class="progress-bar">
          <div class="checkpoint" v-for="(point, index) in checkpoints" :key="index">
            <div class="treasure-chest" 
                 :class="{
                   'locked': !point.completed,
                   'unlocked': point.completed && !point.claimed,
                   'opened': point.claimed
                 }"
                 @click="handleChestClick(point, index)">
            </div>
            <div class="reward">+{{ point.bonus }}</div>
            <div class="time">{{point.timeLabel}}</div>
          </div>
        </div>
      </div>


      <div class="share-bottom">
        <div class="share-bottom-title">
          <span>Watch ads (0/7)</span>
        </div>
        <div class="share-bottom-progress">
          <div class="share-bottom-progress-bar" v-for="(item,index) in activityListInfo" :key="index">
            <div class="share-bottom-progress-bar-left">
              <div class="share-bottom-progress-bar-title">
                {{item.name}}
              </div>
              <div class="share-bottom-progress-bar-info">
                <div class="coins">
                  <span class="coin-amount">+{{item.bonus}}</span>
                  <span class="coin-label"></span>
                </div>
              </div>
            </div>
            <button class="watch-btn" v-if="!item.isReceived" @click="watchBtnClick(item)">{{ item.Completed ? 'Watch' : 'Go' }} </button>
            <button class="completed-btn" v-else>Completed</button>
          </div>
        </div>

      </div>
    </div>

    <!-- 下载APP区域 -->
    <div class="download-section">
      <div class="download-content">
        <span>{{ $t('message.Download_APP') }}</span>
        <span class="bonus-tag">+20 {{ $t('message.Bonus') }}</span>
      </div>
      <div class="arrow-icon">›</div>
    </div>
  </div>  
</template>

<script setup>
import { ref,watch,onMounted, computed } from 'vue'
import facebook2Icon from '@/assets/images/facebook2.svg'
import instagramIcon from '@/assets/images/instagram.svg'
import txIcon from '@/assets/images/tx.svg'
import whatsappIcon from '@/assets/images/social-whatsapp.svg'
import {getBonus, signIn, getWatchTime, getWatchReward, getActivityList} from '@/api/home'

const dailySignInfo = ref({
  signDays: 0,
  signAvailable: false
})

// 计算是否签到
const isDaySigned = (dayIndex) => {
  const currentCycleDay = dailySignInfo.value.signDays % 7
  return dayIndex < currentCycleDay
}

const platforms = [
  { name: 'facebook2', icon: facebook2Icon },
  { name: 'instagram', icon: instagramIcon },
  { name: 'tx', icon: txIcon },
  { name: 'tx', icon: txIcon },
  { name: 'social-whatsapp', icon: whatsappIcon }
]
const watchTimeInfo = ref(0)
const handleSignIn = async () => {
  if (!dailySignInfo.value.signAvailable) return
  
  try {
    const res = await signIn()
    if (res.code === 100000) {
      dailySignInfo.value.signDays++
      dailySignInfo.value.signAvailable = false
      getBonusInfo()
    }
  } catch (error) {
    console.error('Sign in failed:', error)
  }
}

const getBonusInfo = async () => {
  const res = await getBonus()
  console.log("res",res);
  
  if (res.code === 100000) {
    dailySignInfo.value = res.data.dailySignInfo
  }
}
const getWatchTimeInfo = async () => {
  const res = await getWatchTime()
  console.log("res",res);
  if (res.code === 100000) {
    watchTimeInfo.value = res.data
  }
}

// 计算观看时长奖励
const checkpoints = computed(() => {
  // 定义宝箱之间的时间间隔（单位：秒）
  const intervals = [2 * 60, 3 * 60, 5 * 60, 10 * 60, 10 * 60]
  
  // 计算每个宝箱的解锁时间
  let unlockTime = 0
  return activityList.value.map((item, index) => {
    unlockTime += intervals[index]
    return {
      unlockTime,
      timeLabel: `${item.number}min`,
      claimed: item.isReceived,
      completed: item.Completed,
      bonus: item.bouns
    }
  })
})

// 领取观看时长奖励
const handleChestClick = async (point, index) => {
  const activityItem = activityList.value[index]
  
  // 检查是否满足领取条件
  if (!activityItem.Completed || activityItem.isReceived) {
    return
  }

  // 检查前面的宝箱是否都已领取
  const previousChestsUnclaimed = activityList.value
    .slice(0, index)
    .some(item => item.Completed && !item.isReceived)
  
  if (previousChestsUnclaimed) {
    console.log('请先领取前面的奖励')
    return
  }

  try {
    const res = await getWatchReward({ num: activityItem.number })
    if (res.code === 100000) {
      activityItem.isReceived = true
    }
  } catch (error) {
    console.error('领取奖励失败:', error)
  }
}

// 领取观看时长奖励
const handleWatchReward = async () => {
  const nextChestToClaim = activityList.value.find(
    (item, index) => 
      item.Completed && 
      !item.isReceived &&
      !activityList.value.slice(0, index).some(p => p.Completed && !p.isReceived)
  )

  if (nextChestToClaim) {
    try {
      const res = await getWatchReward({ num: nextChestToClaim.number })
      if (res.code === 100000) {
        nextChestToClaim.isReceived = true
      }
    } catch (error) {
      console.error('领取奖励失败:', error)
    }
  }
}

// 计算观看时长进度
const getWatchProgress = () => {
  // 获取所有宝箱的解锁时间
  const unlockTimes = checkpoints.value.map(point => point.unlockTime)
  console.log("unlockTimes",unlockTimes);
  
  // 找到当前观看时间所处的区间
  for (let i = 0; i < unlockTimes.length; i++) {
    if (watchTimeInfo.value < unlockTimes[i]) {
      // 计算当前区间的进度
      const previousUnlockTime = i === 0 ? 0 : unlockTimes[i - 1]
      const intervalProgress = (watchTimeInfo.value - previousUnlockTime) / (unlockTimes[i] - previousUnlockTime)
      
      // 计算总进度
      const totalProgress = i / unlockTimes.length + intervalProgress / unlockTimes.length
      return Math.min(Math.max(totalProgress * 100, 0), 100)
    }
  }
  
  // 如果观看时间超过最后一个宝箱的解锁时间，返回100%
  return 100
}

const activityList = ref([])//观看时长奖励列表
const activityListInfo = ref({})//活动列表
const getActivityListInfo = async () => {
  const res = await getActivityList()
  if (res.code === 100000) {
    let list = []
    list = res.data
    activityList.value = list.splice(5,list.length)
    activityListInfo.value = list.splice(0,5)
  }
  console.log("res",res);
}

const watchBtnClick = (item) => {
  if(!item.Completed) {
    
  }
  console.log("item",item);
}

onMounted( async () => {
  getBonusInfo()
  getWatchTimeInfo()
  getActivityListInfo()
 
})
</script>

<style scoped lang="scss">
@mixin responsive-scale {
  transition: all 0.3s ease-in-out;
  @media screen and (min-width: 500px) and (max-width: 1439px) {
    @content;
  }
}

.points-container {

  color: var(--text-primary);
  
  .bonus-section {
    background: linear-gradient(94.32deg, rgba(253, 52, 110, 0) 4.29%, rgba(253, 52, 110, 0.15) 100%);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid var(--bg-quaternary);

    .bonus-label {
      font-size: 14px;
      opacity: 0.8;
      display: flex;
      align-items: center;
      gap: 8px;

      .info-icon {
        width: 16px;
        height: 16px;
        border: 1px solid var(--bg-quaternary);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
      }
    }

    .bonus-amount {
      font-size: 32px;
      font-weight: bold;
      margin-top: 8px;
    }
  }

  .signin-section {
    height: 349px;
    background: var(--bg-tertiary);
    border-radius: 12px;
    padding: 20px;
    font-size: 24px;
    margin-bottom: 32px;
    border: 1px solid var(--bg-quaternary);

    .signin-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;

      .total-bonus {
        color: #D0A944;
        font-size: 16px;
      }
    }

    .days-container {
        
      display: flex;
      justify-content: space-between;
      gap: 10px;
      margin-bottom: 32px;

      .day-item {
        width: 135px;
        height: 128px;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding: 12px;
        border: 1px solid var(--bg-quaternary);
        border-radius: 16px;
        position: relative;

        &.active {
          background: #D0A94480;
        }

        .day-label {
          font-size: 16px;
        }

        .coin-icon {
          width: 33px;
          height: 33px;
        //   background: #FFD700;
          border-radius: 50%;
        }

        .points-value {
          font-size: 16px;
        }

        .check-mark {
          position: absolute;
          bottom: 0px;
          right: 0px;
          width: 32px;
          height: 28px;
          border-radius: 16px;
        }
      }
    }

    .check-in-btn {
      width: 300px;
      height: 62px;
      margin: 0 auto;
      text-align: center;
      line-height: 62px;
      background: linear-gradient(180deg, #F0D89A 0%, #D0A944 100%);
      border-radius: 50px;
      color: var( --text-primary);
      font-size: 16px;

      &.disabled {
        background: #666;
        cursor: not-allowed;
        opacity: 0.7;
      }
    }
  }

  .share-section {
    background: var(--bg-tertiary);
    height: 877px;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid var(--bg-quaternary);

    .section-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 32px;
      font-size: 24px;

      .bonus-tag {
        font-size: 16px;
        color: #D0A944;
      }
    }

    .share-buttons {
      display: flex;
      justify-content: space-between;
      gap: 10px;

      .share-btn {
        width: 135px;
        height: 80px;
        flex: 1;
        background: transparent;
        border: 1px solid var(--bg-quaternary);
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        .share-btn-icon {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background:#D0A944;

            img {
                width: 20px;
                height: 20px;
                margin: 0 auto;
                margin-top: 8px;
            }
        }
        &.active {
          background: #D0A94480;

          .check-mark {
            position: absolute;
            bottom: 0px;
            right: 0px;
            width: 32px;
            height: 28px;
            border-radius: 16px;
            
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }

  .download-section {
    background: var(--bg-tertiary);
    border-radius: 12px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    .download-content {
      display: flex;
      align-items: center;
      gap: 10px;

      .bonus-tag {
        font-size: 12px;
        color: #FFD700;
      }
    }

    .arrow-icon {
      font-size: 24px;
    }
  }
}

.drama-progress {
  // background: #1a2634;
  border-radius: 16px;
  padding: 24px;
  color: white;
  height: 271px;
  // box-sizing: border-box;
  border: 1px solid var(--bg-quaternary);
}

.drama-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;

  h2 {
    font-size: 24px;
    margin: 0;
    font-weight: normal;
  }
}

.points-info {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
  margin-right: 20px;
}

.points-earned {
  color: #D0A944;
  font-size: 20px;
  font-weight: bold;
}

.points-label {
  color: #8899AA;
  font-size: 14px;
}

.watch-btn {
  width: 120px;
  height: 52px;
  background: #D0A944;
  color: #0D0D0D;
  border: none;
  padding: 8px 24px;
  border-radius: 32px;
  font-weight: 500;
  font-size: 16px;
}
.completed-btn {
  background: linear-gradient(180deg, rgba(240, 216, 154, 0.15) 0%, rgba(208, 169, 68, 0.15) 100%);
  color: #0D0D0D;
  border: none;
  padding: 8px 24px;
  border-radius: 32px;
}
.progress-bar {
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 10px 0;
  margin: 0 20px;
  margin-top: 20px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 12px;
    background: #2A3744;
    top: 50%;
    transform: translateY(-50%);
    z-index: 0;
    border-radius: 6px;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    width: v-bind('getWatchProgress() + "%"'); // 使用动态进度
    height: 12px;
    background: linear-gradient(90deg, #D5C292 0%, #BC9737 100%);
    top: 50%;
    transform: translateY(-50%);
    z-index: 0;
    border-radius: 6px;
    transition: width 0.3s ease; // 添加过渡动画
  }
}

.checkpoint {
  width: 190px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;

  .treasure-chest {
    width: 56px;
    height: 56px;
    background: url('@/assets/images/box-no.svg') center/contain no-repeat;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease;

    // 锁住的状态（未达到时间）
    &.locked {
      background-image: url('@/assets/images/box-no.svg');
      cursor: not-allowed;
    }

    // 可领取状态（达到时间但未领取）
    &.unlocked {
      background-image: url('@/assets/images/box-no.svg');
      animation: shake 1s ease-in-out infinite;
      cursor: pointer;
      
      &:hover {
        transform: translate(-50%, -50%) scale(1.1);
      }
    }

    // 已领取状态
    &.opened {
      background-image: url('@/assets/images/box.svg');
      cursor: default;
      animation: none;
    }
  }

  .reward {
    color: #D0A944;
    font-weight: 500;
    font-size: 20px;
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    
  }

  .time {
    color: #8899AA;
    font-size: 16px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
}

// 添加抖动动画
@keyframes shake {
  0%, 100% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  25% {
    transform: translate(-50%, -50%) rotate(-5deg);
  }
  75% {
    transform: translate(-50%, -50%) rotate(5deg);
  }
}

// 添加光效动画
.unlocked::after {
  content: '';
  position: absolute;
  top: -10%;
  left: -10%;
  right: -10%;
  bottom: -10%;
  background: radial-gradient(circle, rgba(208, 169, 68, 0.3) 0%, rgba(208, 169, 68, 0) 70%);
  border-radius: 50%;
  animation: glow 2s ease-in-out infinite;
  z-index: -1;
}

@keyframes glow {
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

.share-bottom {
  width: 100%;
  height: 548px;
  border: 1px solid var(--bg-quaternary);
  border-radius: 16px;
  background: var(--bg-tertiary);
  margin-top: 23px;
  padding: 20px;
  .share-bottom-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 24px;
    
  }
  .share-bottom-progress {
    width: 100%;
    height: 437px;
    border-radius: 5px;
    margin-top: 16px;
   
  }
}

.share-bottom-progress-bar {
  width: 100%;
  height: 91px;
  border-bottom: 1px solid var(--bg-quaternary);
  // padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .share-bottom-progress-bar-left {
    .share-bottom-progress-bar-title {
      font-size: 24px;
      color: var(--text-primary);
      // margin-bottom: 12px;
    }

    .share-bottom-progress-bar-info {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .coins {
        display: flex;
        align-items: center;
        gap: 8px;

        .coin-amount {
          color: #D0A944;
          font-size: 20px;
          font-weight: bold;
        }

        .coin-label {
          color: #8899AA;
          font-size: 14px;
        }
      }

      // .watch-btn {
      //   background: #D0A944;
      //   color: #000;
      //   border: none;
      //   padding: 8px 24px;
      //   border-radius: 32px;
      //   font-weight: 500;
      //   cursor: pointer;
      //   font-size: 16px;
      // }
    }
  }
}
</style>
<template>
  <div class="payment-dialog">
    <p class="payment-title">{{ $t('message.Payment_Method') }}</p>

    <!-- 支付方式选择 -->
    <div class="payment-methods">
      <button class="method-btn paypal-btn" :class="{ active: selectedMethod === 'paypal' }"
        @click="selectedMethod = 'paypal'">
        <img src="@/assets/images/PayPal.svg" alt="PayPal" />
        <img src="@/assets/images/paypalsize.svg" alt="PayPal" />
      </button>
      <button class="method-btn credit-btn" :class="{ active: selectedMethod === 'credit' }"
        @click="selectedMethod = 'credit'">
        {{ $t('message.Credit_Card') }}
      </button>
    </div>

    <!-- 慈善活动说明 -->
    <div class="charity-info">
      <h3>{{ $t('message.Top_Up') }}</h3>
        <p>{{ $t('message.We_promise') }}</p>
    </div>
    <!-- 年卡月卡 -->
    <div class="year-card-month-card">
      <div class="year-card-month-card-item" @click="selectOption(rechargeOptions[0] ,-1)">
        <img src="@/assets/images/vip.svg" alt="year-card">
        <div class="year-card-month-card-item-content">
          <p class="p1">Weekly VIP</p>
          <p class="p2">Unlock All Series for 7Days</p>
        </div>
        <div class="button">
          <p>${{ rechargeOptions[0]?.priceUsdCent/100 }}</p>
        </div>
      </div>
      <div class="year-card-month-card-item" @click="selectOption(rechargeOptions[1] ,-1)">
        <img src="@/assets/images/vip.svg" alt="year-card">
        <div class="year-card-month-card-item-content">
          <p class="p1">Yearly VIP</p>
          <p class="p2">Unlock All Series for 1Year</p>
        </div>
        <div class="button">
          <p>${{ rechargeOptions[1]?.priceUsdCent/100 }}</p>
        </div>
      </div>
     
    </div>

    <!-- 充值选项 -->
    <div class="recharge-options">
      <div v-for="(item, index) in rechargeOptions.filter(item => item.vipTime === 0)" :key="index" class="recharge-item"
        :class="{ active: selectedOption === index }" @click="selectOption(item,index)">
        <div class="bonus-tag">+10%</div>
        <div class="recharge-content">
          <div class="coins">{{ item.coinNum }} <span>{{ $t('message.Coins') }}</span></div>
          <div class="bouns">+{{ item.bonusNum }} <span>{{ $t('message.Bonus') }}</span></div>
        </div>

        <div class="price">${{ item.priceUsdCent/100 }}</div>
      </div>
    </div>

    <!-- 提示信息 -->
    <div class="tips">
      <p>{{ $t('message.Tips') }}:</p>
      <ol>
        <li>{{ $t('message.SHART_TV_has') }}</li>
        <li>{{ $t('message.Coins_will') }}</li>
        <li>{{ $t('message.Refill') }}</li>
        <li>{{ $t('message.If_you_have_other_problems') }}</li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import { getProduct,getOrder } from '@/api/home'
const selectedMethod = ref('paypal')
const selectedOption = ref(null)
const rechargeOptions = ref([])
const getProductInfo = async () => {
  const res = await getProduct()
  console.log("res",res);
  rechargeOptions.value = res.data
}
const selectOption = async (item,index) => {
  console.log(item);
  const res = await getOrder({
    goodId:item.goodId,
    redirectUrl:'https://www.startv.ae/user/wallet'
  })
  if(res.code === 100000){
    if(selectedMethod.value === 'paypal'){
      window.location.href = res.data.paypal
    }else{
      window.location.href = res.data.card
    }
  }
  console.log("res",res);
  selectedOption.value = index
}


onMounted(() => {
  getProductInfo()
})
</script>

<style lang="scss" scoped>
.payment-dialog {
  width: 691px;
  height: 814px;
  background: var(--bg-primary);
  color: var(--text-primary);
  padding: 24px;
  border-radius: 12px;
  max-width: 800px;
  margin: 0 auto;
}

.payment-title {
  color: var(--text-primary);
  font-size: 24px;
  margin-bottom: 16px;
  font-weight: 700;
}

.payment-methods {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.method-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px 24px;
  border-radius: 8px;
  background: var(--bg-tertiary);
  border: 1px solid transparent;
  box-sizing: border-box;
  color: var(--text-primary);
}

.method-btn.active {
  border-color: #ffd700;
}

.charity-info {
  width: 100%;
  height: 92px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: var(--bg-tertiary);
  border-radius: 16px;
  margin-bottom: 16px;

  p {
    font-size: 12px;

  }
}
.year-card-month-card {
  width: 100%;
  height: 94px;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .year-card-month-card-item {
    padding:  12px 4px;
    width: 49%;
    height: 100%;
    background: linear-gradient(180deg, #F0D89A 0%, #D0A944 100%);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 70px;
      height: 70px;
      // margin-top: 10px;
    }
    .year-card-month-card-item-content {
      .p1 {
        font-size: 22px;
        font-weight: 600;
        color: #3A1F00;
        font-family: 'Barlow Condensed';
        margin: 0px;
        padding: 0px;
      }
      .p2 {
        font-size: 15px;
        font-weight: 500;
        color: #3A1F00;
        font-family: 'Barlow Condensed';
        margin: 0px;
        padding: 0px;
      }
    }
  }
  .button {
    width: 80px;
    height: 32px;
    background: #3A1F00;
    border-radius: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 12px;
    p {
      font-size: 16px;
      font-weight: 500;
      background: linear-gradient(180deg, #F0D89A 0%, #D0A944 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}
.recharge-options {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

}

.recharge-item {
  width: 198px;
  height: 120px;
  background: var(--bg-senary);
  border-radius: 18px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  border: 1px solid var(--border-color);

  .bonus-tag {
    position: absolute;
    top: 0px;
    right: 0px;
    background: #ff4081;
    padding: 4px 8px;
    border-radius: 0px 5px 0px 16px;
    font-size: 12px;
  }

  .recharge-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .coins {
      font-size: 28px;
      font-weight: 700;

      span {
        font-size: 16px;
        font-weight: 500;
      }
    }

    .bouns {
      color: #D0A944;
      font-size: 19.2px;
    }
  }

  .price {
    width: 100%;
    height: 43px;
    background-color: #FFFFFF1A;
    font-size: 20px;
    font-weight: bold;
    line-height: 43px;
    
    border-radius: 0 0 16px 16px;
  }
}

.recharge-item.active {
  border: 1px solid #D0A944;

  .price {
    width: 100%;
    height: 43px;
    line-height: 43px;
    font-size: 20px;
    font-weight: bold;
    border-radius: 0 0 16px 16px;
    border-top: 1px solid #D0A944;
    background-color: #D0A944;
  }
}

.tips {
  width: 100%;
  height: 117px;
  border-radius: 8px;
  margin-top: 20px;
  p {
    font-size: 16px;
    font-weight: bold;
    font-weight: 700;
  }
  ol {
  font-size: 12px;
  padding-left: 20px;
  color: #8c8c8c;
}
}
</style>
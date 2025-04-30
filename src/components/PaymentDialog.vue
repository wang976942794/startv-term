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

    <!-- 充值选项 -->
    <div class="recharge-options">
      <div v-for="(item, index) in rechargeOptions" :key="index" class="recharge-item"
        :class="{ active: selectedOption === index }" @click="selectOption(item,index)">
        <div class="bonus-tag">+10%</div>
        <div class="recharge-content">
          <div class="coins">{{ item.priceUsdCent }} <span>{{ $t('message.Coins') }}</span></div>
          <div class="bouns">+{{ item.coinNum }} <span>{{ $t('message.Bonus') }}</span></div>
        </div>

        <div class="price">${{ item.priceCent }}</div>
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
  console.log(item,index);
  const res = await getOrder({
    goodId:item.id,
    redirectUrl:'http://api.startvs.net/api/paypal/Dreamo9/success'
  })
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
  height: 696px;
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
  margin-bottom: 20px;
  font-weight: 700;
}

.payment-methods {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
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
  margin-bottom: 20px;

  p {
    font-size: 12px;

  }
}

.recharge-options {
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
    top: -8px;
    right: -8px;
    background: #ff4081;
    padding: 4px 8px;
    border-radius: 12px;
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
<template>
  <div class="wallet-content">
    <!-- 钱包信息 -->
    <div class="wallet-section">
      <div class="wallet-card coins">
        <div class="card-content">
          <img src="@/assets/images/coin-icon.svg" alt="coin" class="coin-icon">
          <div class="info">
            <h3>Coins <span class="info-icon">i</span></h3>
            <div class="amount">9,019.87</div>
          </div>
        </div>
      </div>
      <div class="wallet-card bonus">
        <div class="card-content">
          <div class="info">
            <h3>Bonus <span class="info-icon">i</span></h3>
            <div class="amount">9,019.87</div>
          </div>
          <span class="arrow">›</span>
        </div>
      </div>
    </div>

    <!-- 交易记录 -->
    <div class="transaction-section">
      <div class="section-header">
        <h2>Details</h2>
        <div class="filter-buttons">
          <button class="active">All records</button>
          <button>Recharge record</button>
          <button>Payment record</button>
        </div>
      </div>
      
      <div class="transaction-list">
        <div v-for="(transaction, index) in transactions" :key="index" class="transaction-item">
          <div class="transaction-info">
            <div class="amount-info">
              <p >
                {{ transaction.type === 'recharge' ? '+' : '-' }}{{ transaction.coins }} Coin
              </p>
              <p class="price">${{ transaction.price }}</p>
            </div>
          </div>
          <div class="action-btn-container">
            <button :class="['action-btn', transaction.type]">
            {{ transaction.type === 'recharge' ? 'Recharge' : 'Buy' }}
          </button>
          <div class="date">{{ transaction.date }}</div>
          </div>
         
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const transactions = ref([
  {
    coins: 1500,
    price: '14.99',
    date: '2025.03.28 12:09:45',
    type: 'recharge'
  },
  {
    coins: 200,
    price: '14.99',
    date: '2025.03.28 12:09:45',
    type: 'buy'
  },
  {
    coins: 1500,
    price: '14.99',
    date: '2025.03.28 12:09:45',
    type: 'recharge'
  },
  {
    coins: 200,
    price: '14.99',
    date: '2025.03.28 12:09:45',
    type: 'buy'
  }
]);
</script>

<style scoped lang="scss">
@mixin responsive-scale {
  transition: all 0.3s ease-in-out;
  @media screen and (min-width: 500px) and (max-width: 1439px) {
    @content;
  }
}

.wallet-content {
  padding: 0 20px;
  @include responsive-scale{
    padding: 0 calc(1024 / 1440 * 20px);
  }
}

.wallet-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 30px;
  @include responsive-scale{
    margin-bottom: calc(1024 / 1440 * 30px);
    gap: calc(1024 / 1440 * 20px);
  }

  .wallet-card {
    padding: 20px;
    border-radius: 12px;
    @include responsive-scale{
      padding: calc(1024 / 1440 * 20px);
      border-radius: calc(1024 / 1440 * 12px);
    }
    &.coins {
      border: 1px solid #2C2E31;
      background: linear-gradient(94.32deg, rgba(208, 169, 68, 0) 4.29%, rgba(208, 169, 68, 0.15) 100%);

    }
    
    &.bonus {
      border: 1px solid #2C2E31;
      background: linear-gradient(94.32deg, rgba(253, 52, 110, 0) 4.29%, rgba(253, 52, 110, 0.15) 100%);

    }

    .card-content {
      display: flex;
      align-items: center;
      gap: 15px;
      @include responsive-scale{
        gap: calc(1024 / 1440 * 15px);
      }

      .coin-icon {
        width:80px;
        height: 80px;
        @include responsive-scale{
          width: calc(1024 / 1440 * 80px);
          height: calc(1024 / 1440 * 80px);
        }
      }

      .info {
        flex-grow: 1;

        h3 {
          font-size: 16px;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 5px;
          @include responsive-scale{
            font-size: calc(1024 / 1440 * 16px);
            margin-bottom: calc(1024 / 1440 * 8px);
            gap: calc(1024 / 1440 * 5px);
          }

          .info-icon {
            width: 16px;
            height: 16px;
            border: 1px solid #fff;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            opacity: 0.6;
            @include responsive-scale{
              width: calc(1024 / 1440 * 16px);
              height: calc(1024 / 1440 * 16px);
              font-size: calc(1024 / 1440 * 12px);
            }
          }
        }

        .amount {
          font-size: 24px;
          font-weight: 600;
          @include responsive-scale{
            font-size: calc(1024 / 1440 * 24px);
          }
        }
      }

      .arrow {
        font-size: 24px;
        opacity: 0.6;
        @include responsive-scale{
          font-size: calc(1024 / 1440 * 24px);
        } 
      }
    }
  }
}

.transaction-section {
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    @include responsive-scale{
      margin-bottom: calc(1024 / 1440 * 20px);
    }

    h2 {
      font-size: 20px;
      @include responsive-scale{
        font-size: calc(1024 / 1440 * 20px);
      }
    }

    .filter-buttons {
      display: flex;
      gap: 10px;
      @include responsive-scale{
        gap: calc(1024 / 1440 * 10px);
      }

      button {
        background: transparent;
        border: 1px solid #1f2937;
        color: #666;
        padding: 6px 12px;
        border-radius: 20px;
         
        @include responsive-scale{
          padding: calc(1024 / 1440 * 6px) calc(1024 / 1440 * 12px);
          border-radius: calc(1024 / 1440 * 20px);
        }

        &.active {
          border-color: #D4AF37;
          color: #D4AF37;
        }
      }
    }
  }

  .transaction-list {
    .transaction-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 0;
      border-bottom: 1px solid #1f2937;
      @include responsive-scale{
        padding: calc(1024 / 1440 * 15px) 0;
      }

      .transaction-info {
        display: flex;
        flex-direction: column;
        gap: 8px;
        @include responsive-scale{
          gap: calc(1024 / 1440 * 8px);
        }
          .price {
            color: #666;
          }
      }
      .action-btn-container{
       display: flex;
       flex-direction: column;
       align-items: flex-end;
       gap: 8px;
       @include responsive-scale{
        gap: calc(1024 / 1440 * 8px);
       }
        .action-btn {
        padding: 6px 16px;
        border-radius: 20px;
        border: none;
        font-size: 14px;
        @include responsive-scale{
          padding: calc(1024 / 1440 * 6px) calc(1024 / 1440 * 16px);
          border-radius: calc(1024 / 1440 * 20px);
          font-size: calc(1024 / 1440 * 14px);
        }
        &.recharge {
          background: #67C04880;
          color: #fff;
        }

        &.buy {
          background: #FD346E80;
          color: #fff;

        }
      }
        .date {
          color: #666;
          font-size: 14px;
        }
      }
     
    }
  }
}
</style> 
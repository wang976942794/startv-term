<template>
  <div class="fandom-container">
    <div class="fandom-header">Fandom</div>
    <!-- 文章卡片网格 -->
    <div class="card-grid">
      <div v-for="(item, index) in articles" :key="index" class="card" @click="goToDetail(item)">
        <div class="card-image">
          <img :src="coverImage" alt="article cover">
          <span class="topic-tag">{{ $t('message.General_Topic') }}</span>
        </div>
        <div class="card-content">
          <div class="date">{{ item.date }}</div>
          <h2 class="title">{{ item.title }}</h2>
          <p class="description">{{ item.description }}</p>
        </div>
      </div>
    </div>

   
  </div>
</template>

<script setup>
import { ref,reactive } from 'vue';
import { useRouter } from 'vue-router';
import coverImage from '@/assets/images/image.png'

const router = useRouter();

// 跳转到详情页
const goToDetail = (item) => {
  router.push({
    name: 'FandomContent',
    params: { 
      id: item.id || 1 // 假设每篇文章都有一个id
    },
    // 如果需要传递更多数据，可以使用 query
    query: {
      title: item.title,
      date: item.date,
      description: item.description
    }
  });
};

const articles = reactive([
        {
          id: 1, // 添加 id
          image: '../assets/images/image.png',
          date: '2025-03-26',
          title: 'The Fascinating Couple: All About Ethan Armstrong And Maya Moore In Hello Let s Get Married',
          description: 'Ethan Armstrong And Maya Moore of Hello Lets Get Married movie dont reunite all of a sudden. Instead, Maya used [...]',
        },
        {
          id: 2, // 添加 id
          image: '../assets/images/image.png',
          date: '2025-03-26',
          title: 'The Fascinating Couple: All About Ethan Armstrong And Maya Moore In Hello Let s Get Married',
          description: 'Ethan Armstrong And Maya Moore of Hello Lets Get Married movie dont reunite all of a sudden. Instead, Maya used [...]',
        },
        {
          id: 3, // 添加 id
          image: '../assets/images/image.png',
          date: '2025-03-26',
          title: 'The Fascinating Couple: All About Ethan Armstrong And Maya Moore In Hello Let s Get Married',
          description: 'Ethan Armstrong And Maya Moore of Hello Lets Get Married movie dont reunite all of a sudden. Instead, Maya used [...]',
        },
        {
          id: 4, // 添加 id
          image: '../assets/images/image.png',
          date: '2025-03-26',
          title: 'The Fascinating Couple: All About Ethan Armstrong And Maya Moore In Hello Let s Get Married',
          description: 'Ethan Armstrong And Maya Moore of Hello Lets Get Married movie dont reunite all of a sudden. Instead, Maya used [...]',
        },
        {
          id: 5, // 添加 id
          image: '../assets/images/image.png',
          date: '2025-03-26',
          title: 'The Fascinating Couple: All About Ethan Armstrong And Maya Moore In Hello Let s Get Married',
          description: 'Ethan Armstrong And Maya Moore of Hello Lets Get Married movie dont reunite all of a sudden. Instead, Maya used [...]',
        },
        {
          id: 6, // 添加 id
          image: '../assets/images/image.png',
          date: '2025-03-26',
          title: 'The Fascinating Couple: All About Ethan Armstrong And Maya Moore In Hello Let s Get Married',
          description: 'Ethan Armstrong And Maya Moore of Hello Lets Get Married movie dont reunite all of a sudden. Instead, Maya used [...]',
        },
        {
          id: 7, // 添加 id
          image: '../assets/images/image.png',
          date: '2025-03-26',
          title: 'The Fascinating Couple: All About Ethan Armstrong And Maya Moore In Hello Let s Get Married',
          description: 'Ethan Armstrong And Maya Moore of Hello Lets Get Married movie dont reunite all of a sudden. Instead, Maya used [...]',
        },
        {
          id: 8, // 添加 id
          image: '../assets/images/image.png',
          date: '2025-03-26',
          title: 'The Fascinating Couple: All About Ethan Armstrong And Maya Moore In Hello Let s Get Married',
          description: 'Ethan Armstrong And Maya Moore of Hello Lets Get Married movie dont reunite all of a sudden. Instead, Maya used [...]',
        },
        {
          id: 9, // 添加 id
          image: '../assets/images/image.png',
          date: '2025-03-26',
          title: 'The Fascinating Couple: All About Ethan Armstrong And Maya Moore In Hello Let s Get Married',
          description: 'Ethan Armstrong And Maya Moore of Hello Lets Get Married movie dont reunite all of a sudden. Instead, Maya used [...]',
        },
        {
          id: 10, // 添加 id
          image: '../assets/images/image.png',
          date: '2025-03-26',
          title: 'The Fascinating Couple: All About Ethan Armstrong And Maya Moore In Hello Let s Get Married',
          description: 'Ethan Armstrong And Maya Moore of Hello Lets Get Married movie dont reunite all of a sudden. Instead, Maya used [...]',
        },
        {
          id: 11, // 添加 id
          image: '../assets/images/image.png',
          date: '2025-03-26',
          title: 'The Fascinating Couple: All About Ethan Armstrong And Maya Moore In Hello Let s Get Married',
          description: 'Ethan Armstrong And Maya Moore of Hello Lets Get Married movie dont reunite all of a sudden. Instead, Maya used [...]',
        },
        {
          id: 12, // 添加 id
          image: '../assets/images/image.png',
          date: '2025-03-26',
          title: 'The Fascinating Couple: All About Ethan Armstrong And Maya Moore In Hello Let s Get Married',
          description: 'Ethan Armstrong And Maya Moore of Hello Lets Get Married movie dont reunite all of a sudden. Instead, Maya used [...]',
        },
       
        // 添加更多文章数据...
      ]);
</script>

<style lang="scss" scoped>
@mixin responsive-scale {
    transition: all 0.3s ease-in-out;

    @media screen and (min-width: 500px) and (max-width: 1439px) {
        @content;
    }
}

.fandom-container {
  padding: 0 172px;
  margin: 0 auto;
  @include responsive-scale {
      padding: 0 calc(1024 / 1440 * 172px);
  }
  .fandom-header{
    color: var( --text-primary);
    font-size: 24px;
    font-weight: 700;
    margin-top: 32px;
    margin-bottom: 20px;
    @include responsive-scale {
      margin-top: calc(1024 / 1440 * 32px);
      margin-bottom: calc(1024 / 1440 * 20px);
      font-size: calc(1024 / 1440 * 24px);
    }
  }
}

.card-grid {

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  @include responsive-scale {
    gap: calc(1024 / 1440 * 20px);
  }
}

.card {
    width: 352px;
height: 405px;
  background: var(--bg-secondary);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
  @include responsive-scale {
    width: calc(1024 / 1440 * 352px);
    height: calc(1024 / 1440 * 405px);
  }
   
}

.card:hover {
  transform: translateY(-5px);
}

.card-image {
  position: relative;
  width: 100%;
  height: 176px;
  @include responsive-scale {
    height: calc(1024 / 1440 * 176px);
  }
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.topic-tag {
  position: absolute;
  top: 10px;
  left: 10px;
  background: #FD346E;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  @include responsive-scale {
    font-size: calc(1024 / 1440 * 12px);
    padding: calc(1024 / 1440 * 4px) calc(1024 / 1440 * 12px);
    top: calc(1024 / 1440 * 10px);
    left: calc(1024 / 1440 * 10px);
  }
}

.card-content {
  padding: 15px;
  @include responsive-scale {
    padding: calc(1024 / 1440 * 15px);
  }
}

.date {
  color: #666;
  font-size: 14px;
  margin-bottom: 8px;
  @include responsive-scale {
    font-size: calc(1024 / 1440 * 14px);
    margin-bottom: calc(1024 / 1440 * 8px);
  }
}

.title {
  color: var( --text-primary);
  font-size: 18px;
  margin-bottom: 10px;
  line-height: 1.4;
  @include responsive-scale {
    font-size: calc(1024 / 1440 * 18px);
    margin-bottom: calc(1024 / 1440 * 10px);
  }
}

.description {
  color: #999;
  font-size: 14px;
  line-height: 1.5;
  @include responsive-scale {
    font-size: calc(1024 / 1440 * 14px);
    line-height: calc(1024 / 1440 * 1.5);
  }
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  @include responsive-scale {
    gap: calc(1024 / 1440 * 10px);
  }
}

.page-btn {
  background: none;
  border: none;
  color: white;
   
  padding: 5px;
  @include responsive-scale {
    padding: calc(1024 / 1440 * 5px);
  }
}

.page-numbers {
  display: flex;
  gap: 5px;
  @include responsive-scale {
    gap: calc(1024 / 1440 * 5px);
  }
}

.page-number {
  width: 30px;
  height: 30px;
  border: none;
  background: #2a2a2a;
  color: white;
  border-radius: 4px;
   
  @include responsive-scale {
    width: calc(1024 / 1440 * 30px);
    height: calc(1024 / 1440 * 30px);
  }
}

.page-number.active {
  background: #FD346E;
}

.arrow {
  border: solid white;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  @include responsive-scale {
    padding: calc(1024 / 1440 * 3px);
  }
}

.left {
  transform: rotate(135deg);
}

.right {
  transform: rotate(-45deg);
}
</style>

<template>
  <div class="fandom-content-left">
    <div class="fandom-content-left-top">
      <p class="tag">Movie Cast List</p>
      <h1 class="main-title">Ray Astor and Jocelyn West in Twilight Romance Flash Marriage to Mature Tycoon</h1>
      <div class="meta-info">
        <span class="date">2025-03-28</span>
        <span class="author">Gaya Freedman</span>
      </div>
      
      <div class="content-wrapper">
        <div class="main-image">
          <img :src="coverImage" alt="main cover">
        </div>
        
        <div class="description">
          <p>The Cursed Alpha's Mute Bride vertical drama will have Shay Santos as the main female character. She never digs deeper into another world, mostly because she is introverted.</p>
          <p>Shay initially relies upon her happy-go-lucky and sociable friend, Nikki. She is also supposed to date Dean. However, Shay never expects that her fun-loving best friend will turn her back against her by cheating with Dean.</p>
          <p>After all the traumatic episodes of betrayal, Shay thought she would never find her love. What happens when her love is not only an Alpha but also a cursed being?</p>
          <p>That's what Shay finds in Alpha Mal Haywood! That's also the first time Shay enters the wild werewolf world. Can she survive there?</p>
        </div>

        <div class="secondary-image">
          <img :src="coverImage" alt="secondary cover">
        </div>

        <p class="repeated-desc">The Cursed Alpha's Mute Bride vertical drama will have Shay Santos as the main female character. She never digs deeper into another world, mostly because she is introverted.</p>
      </div>
      <div class="fandom-x"></div>

      <FandomRecommend />
    </div>
  </div>
</template>

<script setup>
import coverImage from '@/assets/images/image.png'
import FandomRecommend from './FandomRecommend.vue'
</script>

<style lang="scss" scoped>
@mixin responsive-scale {
    transition: all 0.3s ease-in-out;
    @media screen and (min-width: 500px) and (max-width: 1439px) {
        @content;
    }
}

.fandom-content-left {
  width: calc(60% - 16px);
  height: 1601px;
  @include responsive-scale {
    width: calc(100% - calc(1024 / 1440 * 16px));
    height: calc(1024 / 1440 * 1601px);
  }
  
  .fandom-content-left-top {
    width: 100%;
    .tag {
      font-size: 16px;
      font-weight: 500;
      color: #D0A944;
      margin-bottom: 16px;
      @include responsive-scale {
        font-size: calc(1024 / 1440 * 16px);
        margin-bottom: calc(1024 / 1440 * 16px);
      }
    }

    .main-title {
      font-size: 32px;
      font-weight: 600;
      color: var( --text-primary);
      line-height: 1.3;
      margin-bottom: 16px;
      @include responsive-scale {
        font-size: calc(1024 / 1440 * 32px);
        margin-bottom: calc(1024 / 1440 * 16px);
      }
    }

    .meta-info {
      display: flex;
      gap: 24px;
      margin-bottom: 32px;
      @include responsive-scale {
        margin-bottom: calc(1024 / 1440 * 32px);
        gap: calc(1024 / 1440 * 24px);
      }
      .date, .author {
        color: #8B949E;
        font-size: 14px;
        @include responsive-scale {
          font-size: calc(1024 / 1440 * 14px);
        }
      }
    }

    .content-wrapper {
      .main-image {
        width: calc(100% - 89px);
        height: 248px;
        margin-bottom: 24px;
        border-radius: 8px;
        overflow: hidden;
        @include responsive-scale {
          height: calc(1024 / 1440 * 248px);
          margin-bottom: calc(1024 / 1440 * 24px);
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .description {
        p {
          color: var( --text-primary)FFF;
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 16px;
          @include responsive-scale {
            font-size: calc(1024 / 1440 * 14px);
            margin-bottom: calc(1024 / 1440 * 16px);
          }
          &:last-child {
            margin-bottom: 32px;
            @include responsive-scale {
              margin-bottom: calc(1024 / 1440 * 32px);
            }
          }
        }
      }

      .secondary-image {
        width: 100%;
        height: 248px;
        margin: 32px 0;
        border-radius: 8px;
        overflow: hidden;
        @include responsive-scale {
          height: calc(1024 / 1440 * 248px);
          margin: calc(1024 / 1440 * 32px) 0;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .repeated-desc {
        color: var( --text-primary)FFF;
        font-size: 15px;
        line-height: 1.6;
        @include responsive-scale {
          font-size: calc(1024 / 1440 * 15px);
        }
      }
    }
  }

  .fandom-x {
    width: 95%;
    height: 1px;
    background-color: #2C2E31;
    margin: 64px auto;
    @include responsive-scale {
      margin: calc(1024 / 1440 * 64px) auto;
    }
  }
}
</style> 
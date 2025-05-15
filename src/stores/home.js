import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getHomePage, getUserInfo } from '@/api/home'

export const useHomeStore = defineStore('home', {
    state: () => ({
        popularBookList: [],
        bannerBookList: [],
        watchBookList: [],
        collectBookList: [],
        typeBookMap: [],
        userInfo: {},
        moreRecommendedState: 18 // 默认显示8个项目
    }),
    actions: {
        async fetchHomePage() {
            const res = await getHomePage()
            this.popularBookList = res.data.popularBookList
            this.bannerBookList = res.data.bannerBookList
            this.watchBookList = res.data.watchBookList
            this.collectBookList = res.data.collectBookList
            this.typeBookMap = res.data.typeBookMap
        },
        async fetchUserInfo() {
            const res = await getUserInfo()
            this.userInfo = res.data
        },
        setMoreRecommendedState(count) {
            this.moreRecommendedState = count
        }
    }
})

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getHomePage, getUserInfo } from '@/api/home'

export const useHomeStore = defineStore('home', () => {
    const popularBookList = ref([])
    const bannerBookList = ref([])
    const watchBookList = ref([])
    const collectBookList = ref([])
    const typeBookMap = ref([])
    const userInfo = ref({})
    const fetchHomePage = async () => {
        const res = await getHomePage()
        popularBookList.value = res.data.popularBookList
        bannerBookList.value = res.data.bannerBookList
        watchBookList.value = res.data.watchBookList
        collectBookList.value = res.data.collectBookList
        typeBookMap.value = res.data.typeBookMap


    }
    const fetchUserInfo = async () => {
        const res = await getUserInfo()
        userInfo.value = res.data        
    }
    return { 
        popularBookList, 
        bannerBookList, 
        watchBookList, 
        collectBookList, 
        typeBookMap, 
        userInfo, 
        fetchHomePage, 
        fetchUserInfo 
    }
})

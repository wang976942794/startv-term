import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getHistory, getChapterCollections } from '@/api/home'

export const useHistoryStore = defineStore('history', () => {
    const historyData = ref([])
    const chapterCollections = ref([])

    // 获取历史记录
    const fetchHistory = async () => {
        try {
            const res = await getHistory()
            if (res.code === 100000) {
                historyData.value = res.data
            }
        } catch (error) {
            console.error('Failed to fetch history:', error)
        }
    }

    // 获取章节集合
    const fetchChapterCollections = async () => {
        try {
            const res = await getChapterCollections()
            if (res.code === 100000) {
                chapterCollections.value = res.data
            }
        } catch (error) {
            console.error('Failed to fetch chapter collections:', error)
        }
    }

    return { 
        historyData, 
        chapterCollections, 
        fetchHistory, 
        fetchChapterCollections 
    }
})
import request from '@/utils/request'

export function getHomeData() {
    return request({
        url: '/api/home/getHomeData',
        method: 'get'
    })
}

export function getHistory() {
    return request({
        url: '/api/book/watchHistory',
        method: 'get'
    })
}

//获取收藏列表
export function getChapterCollections() {
    return request({
        url: '/api/book/chapterCollections',
        method: 'get'
    })
}

export function getVideoInfo(data) {
    return request({
        url: '/api/book/chapterList',
        method: 'POST',
        data:data
    })
}

export function getChapterInfo(data) {
    return request({
        url: '/api/book/chapterInfo',   
        method: 'POST',
        data:data
    })
}

//收藏章节
export function getChapterCollect(data) {
    return request({
        url: '/api/book/chapterCollect',
        method: 'POST',
        data:data
    })
}

//取消收藏
export function getChapterCollectCancel(data) {
    return request({
        url: '/api/book/chapterCollectCancel',
        method: 'POST',
        data:data
    })
}




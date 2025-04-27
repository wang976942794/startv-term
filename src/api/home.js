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
// 首页列表信息
export function getHomePage() {
    return request({
        url: '/api/home/homePage',
        method: 'get',
    })
}
//获取用户信息
export function getUserInfo() {
    return request({
        url: '/api/home/userInfo2',
        method: 'get',
    })
}
// 获取奖励信息
export function getBonus() {
    return request({
        url: '/api/reward/bonus',
        method: 'get',
    })
}
//获取评论
export function getComment(params) {
    return request({
        url: '/api/comment/getRootComment',
        method: 'get',
        params
    })
}
// 发表评论
export function sendComment(data) {
    return request({
        url: '/api/comment/send',
        method: 'post',
        data
    })
}
//获取字幕
    export function getSubtitle(data) {
    return request({
        url: '/api/book/subtitle',
        method: 'get',
        params:data
    })
}
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
//签到
export function signIn() {
    return request({
        url: '/api/reward/signIn',
        method: 'put',
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
//搜索
export function findBook(data) {
    return request({
        url: '/api/book/searchBook',
        method: 'get',
        params:data
    })
}

//查看解锁章节
export function getUnlockChapter(data) {
    return request({
        url: '/api/book/unlockList',
        method: 'get',
        params:data
    })
}
//获取热门书籍
export function getHotBook(data) {
    return request({
        url: '/api/home/slide',
        method: 'get',
        params:data
    })
}

//下单
export function getOrder(data) {
    return request({
        url: '/api/paypal/createOrder',
        method: 'post',
        data
    })
}
// 获取商品
export function getProduct() {
    return request({
        url: '/api/store/goods',
        method: 'get',
        
    })
}
// 记录观看时长
export function recordWatchTime(data) {
    return request({
        url: '/api/book/watchTime',
        method: 'post',
        data
    })
}
// 获取观看时长
export function getWatchTime() {
    return request({
        url: '/api/book/watchTime',
        method: 'get',
    })
}   

// 获取观看奖励
export function getWatchReward(data) {
    return request({
        url: '/api/book/watchTime/bonus',
        method: 'post',
        data
    })      
}
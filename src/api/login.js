import request from '@/utils/request'
export function getOAuthUrl(data) {
    return request({
      url: '/api/login/getOauthUrl',
      method: 'post',
      data: data
    })
  }

export function getTokenByLogin(data) {
    return request({
      url: '/api/login/getTokenByLogin',
      method: 'post',
      data: data
    })
  }
  export function getTokenByOauth(data) {
    return request({
      url: '/api/login/getTokenByOauth',
      method: 'post',
      data: data
    })
  }

  // 游客登录
  export function getTokenByGuest(data) {
    return request({
      url: '/api/login/registerGuest',
      method: 'post',
      data: data
    })
  }
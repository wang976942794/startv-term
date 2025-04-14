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
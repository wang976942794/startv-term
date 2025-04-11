import axios from 'axios'

const request = axios.create({
  baseURL: '/api',
  timeout: 5000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // 例如：获取并设置 token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    // 对请求错误做些什么
    console.error('请求错误：', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    const res = response.data
    
    // 这里可以根据后端的数据结构进行调整
    if (res.code === 200) {
      return res.data
    } else {
      // 处理业务错误
      console.error('业务错误：', res.message)
      return Promise.reject(new Error(res.message || '未知错误'))
    }
  },
  error => {
    // 对响应错误做点什么
    let message = ''
    if (error.response) {
      switch (error.response.status) {
        case 401:
          message = '未授权，请重新登录'
          // 可以在这里处理登出逻辑
          break
        case 403:
          message = '拒绝访问'
          break
        case 404:
          message = '请求错误，未找到该资源'
          break
        case 500:
          message = '服务器错误'
          break
        default:
          message = `连接错误 ${error.response.status}`
      }
    } else {
      message = error.message
    }
    
    console.error('响应错误：', message)
    return Promise.reject(error)
  }
)

export default request
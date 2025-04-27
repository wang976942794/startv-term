import axios from 'axios'

const request = axios.create({
  baseURL: '/api',
  timeout: 50000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
    'language': (() => {
      const languageStr = localStorage.getItem('language')
      if (languageStr) {
        try {
          const languageObj = JSON.parse(languageStr)
          return languageObj.languageMode.name
        } catch (e) {
          return 'en'
        }
      }
      return 'en'
    })()
  }
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // 例如：获取并设置 token
    const token = localStorage.getItem('token')||'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3NDc1NjAwMzEsInVzZXJJZCI6ImxoZ0AxNjMuY29tIn0.Q6Fzi_0kINHXLjcZxwZCIY-UiYTfczqGcJ0QcrCeyBU'
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
 
    const res = response.data
    
    // 不要过滤响应数据，直接返回
    return res
    
    // 如果确实需要过滤，建议先检查数据结构
    /*
    if (res.code === 100000) {
      return res
    } else {
      console.log('返回的数据结构:', res)
      return res
    }
    */
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
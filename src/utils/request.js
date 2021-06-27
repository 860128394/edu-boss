import axios from 'axios'
import store from '@/store'

// 创建一个axios实例
const request = axios.create({
  timeout: 2000
})

// 判断BaseURL
function getBaseURL (url) {
  if (url.startsWith('/boss')) {
    return 'http://eduboss.lagou.com'
  } else {
    return 'http://edufront.lagou.com'
  }
}

// 请求拦截器
request.interceptors.request.use(function (config) {
  config.baseURL = getBaseURL(config.url)

  // 统一设置token信息
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  return config
})

export default request

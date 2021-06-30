import axios from 'axios'
import store from '@/store'
import router from '@/router'
import qs from 'qs'

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

// 存贮是否正在更新 token 的状态
let isRefreshing = false

// 响应拦截器
request.interceptors.response.use(function (response) {
  return response
}, function (error) {
  // 请求发送成功，响应接收完毕，但状态码为失败
  if (error.response) {
    const { status } = error.response
    let errorMessage = ''
    if (status === 400) {
      errorMessage = '请求错误参数'
    } else if (status === 401) {
      // 无token
      if (!store.state.user) {
        router.push({
          name: 'login',
          query: {
            // currentRoute
            redirect: router.currentRoute.fullPath
          }
        })
        return Promise.reject(error)
      }
      // 判断是否已经存在刷新操作
      if (isRefreshing) {
        return
      }
      isRefreshing = true
      // token过期
      return request({
        method: 'POST',
        url: '/front/user/refresh_token',
        data: qs.stringify({
          refreshtoken: store.state.user.refresh_token
        })
      }).then(res => {
        // 刷新失败
        if (res.data.state !== 1) {
          store.commit('setUser', null)
          router.push({
            name: 'login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          return Promise.reject(error)
        }
        // 刷新成功
        store.commit('setUser', res.data.content)
        // 本次失败的请求的配置对象
        return request(error.config)
      }).catch(res => {
        console.log(res)
      }).finally(() => {
        isRefreshing = false
      })
    } else if (status === 403) {
      errorMessage = '没有权限，请联系管理员'
    } else if (status === 404) {
      errorMessage = '请求资源不存在'
    } else if (status >= 500) {
      errorMessage = '服务端错误，请联系管理员'
    }
    console.log(errorMessage)
  } else if (error.request) {
    // 请求发送成功，但是未接收到响应
    console.log(error.request)
  } else {
    // 意料之外的错误
    console.log('Error', error.message)
  }
  // 将本次请求的错误继续向后抛出，让接收响应的处理函数进行处理
  return Promise.reject(error)
})

export default request

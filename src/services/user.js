import request from '@/utils/request'
import qs from 'qs'
// 引入vuex的数据
// import store from '@/store'

// 用户登录
export const login = data => {
  return request({
    method: 'POST',
    heaher: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    url: '/front/user/login',
    // urlencoded 格式：名=值&名=值。使用qs进行转换
    data: qs.stringify(data)
  })
}

// 用户信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/front/user/getInfo'
    // headers: {
    //   Authorization: store.state.user.access_token
    // }
  })
}

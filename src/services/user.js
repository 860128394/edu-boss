import request from '@/utils/request'
import qs from 'qs'

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

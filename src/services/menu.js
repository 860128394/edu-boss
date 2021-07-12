import request from '@/utils/request'

// 获取编辑菜单信息
export const getEditMenuInfo = (id = -1) => {
  return request({
    method: 'GET',
    // url: `/boss/menu/getEditMenuInfo?${id}`
    url: '/boss/menu/getEditMenuInfo',
    params: {
      id
    }
  })
}

// 添加菜单接口
export const createOrUpdateMenu = data => {
  return request({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',
    data
  })
}

// 获取所有菜单
export const getAllMenus = data => {
  return request({
    method: 'GET',
    url: '/boss/menu/getAll',
    data
  })
}

// 删除菜单
export const deleteMenu = id => {
  return request({
    method: 'DELETE',
    url: `/boss/menu/${id}`
  })
}

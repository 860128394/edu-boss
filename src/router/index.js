import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入store
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/',
    component: () => import('@/views/layout/index'),
    meta: { requiresAuth: true }, // 路由验证，根目录下的所有路由都需要登录
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/index')
      },
      {
        path: '/role',
        name: 'role',
        component: () => import('@/views/role/index')
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import('@/views/menu/index')
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import('@/views/resource/index')
      },
      {
        path: '/course',
        name: 'course',
        component: () => import('@/views/course/index')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/user/index')
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import('@/views/advert/index')
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () => import('@/views/advert-space/index')
      }
    ]
  },
  {
    path: '*',
    name: 'error-page',
    component: () => import('@/views/error-page/index')
  }
]

const router = new VueRouter({
  routes
})

// 路由守卫。to 访问到，from 从哪开始
router.beforeEach((to, from, next) => {
  // 验证路由是否需要进行 身份验证
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 验证登录信息是否储存
    if (!store.state.user) {
      // 未登录
      next({
        name: 'login'
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router

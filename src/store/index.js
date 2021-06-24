import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 登录成功后保存用户信息,初始值读取本地存储
    user: JSON.parse(window.localStorage.getItem('user') || null)
    // user: null
  },
  mutations: {
    setUser (state, payload) {
      // 转化为对象后再进行保存
      state.user = JSON.parse(payload)
      // 将本地信息进行本地存储,不用转化为对象
      window.localStorage.setItem('user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})

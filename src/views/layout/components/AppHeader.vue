<template>
  <div class="app-header">
    <!-- 左侧面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 右侧下拉菜单 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        <!-- 头像框 -->
        <el-avatar
          :size="30"
          :src="
            userInfo.portrait ||
              'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
          "
        >
        </el-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
        <el-dropdown-item divided @click.native="handleLogout"
          >退出</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
// 引入用户信息接口
import { getUserInfo } from '@/services/user'
export default {
  name: 'AppHeader',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    // 加载用户信息
    this.loadUserInfo()
  },
  methods: {
    // 加载用户信息的方法
    async loadUserInfo () {
      const { data } = await getUserInfo()
      this.userInfo = data.content
      console.log(data)
    },
    // 退出方法
    handleLogout () {
      this.$confirm('是否退出', '退出提示', {
        confirmButtonText: '退出',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 清除用户信息
          this.$store.commit('setUser', null)
          // 跳转登录页
          this.$router.push('/login')
          this.$message({
            type: 'success',
            message: '退出成功'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消退出'
          })
        })
    }
  }
}
</script>

<style scoped>
.app-header {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
}
.el-dropdown-link {
  display: flex;
  align-items: center;
}
</style>

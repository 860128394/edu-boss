<template>
  <el-container>
    <el-aside width="200px">
      <AppAside></AppAside>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <!-- 子路由出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from './components/AppAside.vue'
export default {
  components: {
    AppAside
  }
}
</script>

<style lang="scss" scoped>
.el-container {
  height: 100vh;
  min-width: 980px;
}
.el-aside {
  background-color: #d3dce6;
}
.el-header {
  background-color: #b3c0de;
}
.el-main {
  background-color: #e9eef3;
}
</style>

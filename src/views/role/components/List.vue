<template>
  <div class="role-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form ref="form" :model="form">
          <el-form-item label="角色名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" v-loading="isLoading"
              >查询</el-button
            >
            <el-button @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-button @click="dialogVisible=true">添加角色</el-button>
      <el-table v-loading="isLoading" :data="roles" style="width: 100%">
        <el-table-column prop="id" label="编号"> </el-table-column>
        <el-table-column prop="name" label="角色名称"> </el-table-column>
        <el-table-column prop="description" label="描述"> </el-table-column>
        <el-table-column prop="createdTime" label="添加时间"> </el-table-column>
        <el-table-column label="操作" align="center" width="150px">
          <template slot-scope="scope">
            <div>
              <el-button type="text">分配菜单</el-button>
              <el-button type="text">分配资源</el-button>
            </div>
            <div>
              <el-button type="text" @click="handleEdit(scope.row)"
                >编辑</el-button
              >
              <el-button type="text" @click="handleDelete(scope.row)"
                >删除</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加角色弹出框 -->
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
      >
      <create-or-edit></create-or-edit>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getRoles, deleteRole } from '@/services/role'
import CreateOrEdit from './CreateOrEdit.vue'
export default {
  components: { CreateOrEdit },
  name: 'RoleList',
  data () {
    return {
      form: {
        name: ''
      },
      isLoading: false,
      roles: [],
      // 控制对话框
      dialogVisible: false
    }
  },
  created () {
    this.loadRoles()
  },
  methods: {
    onSubmit () {},
    onReset () {},
    // 请求角色列表
    async loadRoles () {
      this.isLoading = true
      const { data } = await getRoles(this.form)
      this.roles = data.data.records
      this.isLoading = false
    },
    // 删除角色
    handleDelete (role) {
      this.$confirm(`确认删除角色：${role.name}？`, '删除提示')
        .then(async () => {
          await deleteRole(role.id)
          this.$message.success('删除成功')
          this.loadRoles()
        })
        .catch(err => {
          if (err && err.response) {
            this.$message.error('删除失败，请重试')
          } else {
            this.$message.info('取消删除')
          }
        })
    }
  }
}
</script>

<style></style>

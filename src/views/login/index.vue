<template>
  <div class="login">
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      label-position="top"
      :rules="rules"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="isLoding">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from '@/services/user'
export default {
  name: 'Login',
  data () {
    return {
      // 表单数据
      form: {
        phone: '18201288771', // 18201288771
        password: '111111' // 111111
      },
      // 表单验证规则
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '密码长度为 6 到 18 位', trigger: 'blur' }
        ]
      },
      isLoding: false
    }
  },
  methods: {
    // 登录功能
    async onSubmit () {
      try {
        // 1.校验成功
        await this.$refs.form.validate()
        // 2.发送请求
        this.isLoding = true
        const { data } = await login(this.form)
        this.isLoding = false
        // 3.成功处理
        if (data.state === 1) {
          this.$message.success('登录成功')
          // 将用户信息进行保存
          this.$store.commit('setUser', data.content)
          this.$router.push({
            name: 'home'
          })
        } else {
          this.$message.error('登录失败')
        }
        console.log('通过了校验')
      } catch (err) {
        console.log('没有通过校验')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-form {
    padding: 20px;
    width: 300px;
    background-color: #fff;
    .el-button {
      width: 100%;
    }
  }
}
</style>

<template>
  <div class="login-form-part">
    <el-form  :model="loginForm"  :rules="rules" ref="loginForm" label-width="0px" class="demo-dynamic">
      <h1 style="text-align: center"> 管理员登录</h1>
      <el-form-item prop="adminname" >
        <el-input v-model="loginForm.adminname" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input class="password"  placeholder="请输入密码" v-model="loginForm.password" show-password></el-input>
      </el-form-item>
    </el-form>
    <div class="login-footer">
      <div class="login-footer-right">
        <el-button type="primary" @click="submit" style="width: 300px">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from 'js-md5' // 引入md5 远程js 进行md5 加密
import axios from 'axios'
// import Login from '@/components/loginPage/Login'
export default {
  name: 'adminlogin',
  components: {},
  computed: {
  },
  data () {
    return {
      loginForm: {
        adminname: '',
        password: ''
      },
      rules: {
      }
    }
  },
  mounted () {
  },
  methods: {
    // 登录提交账户密码验证
    submit: function () {
      const that = this
      console.log(this.loginForm)
      if (this.loginForm.password == null || this.loginForm.adminname == null) {
        // alert('请输入正确的账号或密码' + (this.loginForm.password & this.loginForm.adminname))
        this.$message.error('账号或密码为空')
      } else {
        var loginForm = {
          adminname: this.loginForm.adminname,
          password: md5(this.loginForm.password)
        }
        // console.log(md5(this.loginForm.password))
        axios.post('http://148.70.128.231:3000/admin', loginForm)
          .then(function (response) {
            console.log(response.data)
            if (!response.data) { that.$message.error('账号或密码错误') } else {
              that.$message({
                message: '欢迎！管理员',
                type: 'success'
              })
              that.$router.push('/Admin')
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
}
</script>

<style scoped>
  .login-form-part{
    height: 300px;
    width: 400px;
    position: absolute;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    top: 150px;
    background: #fff;
    border-radius: 6px;
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    justify-content: center;
    box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
  }
  .demo-dynamic{
    width: 80%;
  }
  .login-footer{
    display: flex;
    width: 400px;
    height: 68px;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    padding: 0px 40px 0 40px;
    background-color: #f7f7f7;
  }
</style>

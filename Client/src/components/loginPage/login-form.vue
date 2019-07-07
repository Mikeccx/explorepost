<template>
   <div class="login-form-part">
     <el-form  :model="loginForm"  :rules="rules" ref="loginForm" label-width="0px" class="demo-dynamic">
       <el-form-item prop="email" >
         <el-input v-model="loginForm.email" placeholder="请输入邮箱"></el-input>
       </el-form-item>
       <el-form-item prop="password">
       <el-input class="password"  placeholder="请输入密码" v-model="loginForm.password" show-password></el-input>
       </el-form-item>
     </el-form>
     <div class="login-slide"><slide  @isslideconfirmed="isslideconfirminfo"></slide></div>
     <div class="login-footer">
       <div class="login-footer-left" @click="goforgetpw"><a>忘记密码?</a></div>
       <div class="login-footer-right">
         <el-button type="info" @click="goregistration">注册</el-button>
         <el-button type="primary" @click="submit">登录</el-button>
       </div>
     </div>
   </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import md5 from 'js-md5' // 引入md5 远程js 进行md5 加密
import slide from '@/components/loginPage/slide'
import axios from 'axios'
// import Login from '@/components/loginPage/Login'
export default {
  name: 'login-form',
  components: {slide},
  computed: {
    ...mapState
  },
  data () {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      isconfirmed: '',
      rules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  mounted () {
  },
  methods: {
    // vuex 提交变化的登录状态
    ...mapMutations(['Login', 'Userinfo', 'Userid', 'Headphoto']),
    // 是否完成滑动验证
    goregistration: function () {
      this.$emit('goregistration', true)
    },
    goforgetpw: function () {
      this.$emit('goforgetpw', true)
    },
    isslideconfirminfo: function (data) {
      this.isconfirmed = data
    },
    // 登录提交账户密码验证
    submit: function () {
      const that = this
      if (!this.isconfirmed) {
        alert('请先滑动验证')
      } else if (this.loginForm.password == null || this.loginForm.email == null) {
        alert('请输入正确的账号或密码' + (this.loginForm.password & this.loginForm.email))
      } else {
        var loginForm = {
          email: this.loginForm.email,
          password: md5(this.loginForm.password)
        }
        // console.log(md5(this.loginForm.password))
        axios.post('http://148.70.128.231:3000/usersubmit', loginForm)
          .then(function (response) {
            console.log(response.data)
            if (!response.data) { alert('账号或密码错误') } else {
              that.Login() /* 改变登录状态 */
              that.Userinfo(response.data.username)
              that.Userid(response.data.userid) /* vuex 改变变量 */
              that.Headphoto(response.data.headphoto)
              sessionStorage.setItem('store', JSON.stringify(that.$store.state))
              that.$message({
                type: 'success',
                message: '欢迎！' + response.data.username
              })
              that.$router.push('/')
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
    background-color: white;
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    justify-content: center;
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
    justify-content: space-between;
    padding: 0px 40px 0 40px;
    background-color: #f7f7f7;
}
.login-footer-left{
  font-size: 14px;
  color: #ccc;
  cursor:pointer;
}
.login-slide{
  height: 35px;
  width:  80%;
}
  .login-footer-left a{
     color: #ccc;
  }
  .login-footer-left a:hover{
    color: #409EFF;
  }
</style>

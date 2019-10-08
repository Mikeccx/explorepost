<template>
  <div class="login-form-part">
    <h2>Registration</h2>
    <el-form  :model="signupForm"  :rules="rules" ref="signupForm" label-width="54px" class="demo-dynamic">
      <el-form-item prop="email" label="邮箱">
        <el-input  title="请输入邮箱" v-model="signupForm.email" placeholder="void@gmail.com"></el-input>
      </el-form-item>
      <el-form-item class="test" prop="username" label="用户名">
        <el-input title="请输入用户名" class="username"  placeholder="Tracy Mcgrady" v-model="signupForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input class="password" title="请输入密码" placeholder="*********" v-model="signupForm.password" show-password></el-input>
      </el-form-item>
    </el-form>
    <div class="login-footer">
      <div class="login-footer-left"></div>
      <div class="login-footer-right">
        <el-button type="info" @click="gosubmit">登录</el-button>
        <el-button type="primary" @click="registration">注册</el-button>
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
  name: 'signup-form',
  components: {slide},
  computed: {
    ...mapState
  },
  data () {
    return {
      signupForm: {
        email: '',
        username: '',
        password: ''
      },
      isconfirmed: '',
      rules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        password: [
          // { min: 8, message: '请输入不少于8个字符', trigger: 'blur' },
          // { type: 'password', message: '请输入强度适合的密码', trigger: ['blur', 'change'] },
          { pattern: /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/, message: '密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符' }
        ],
        username: [
          { pattern: /^[a-zA-Z0-9_-]{4,16}$/, message: '用户名正则，4到16位（字母，数字，下划线，减号）' }
        ]
      }
    }
  },
  mounted () {
  },
  methods: {
    ...mapMutations(['Login', 'Userinfo', 'Userid', 'Headphoto']),
    gosubmit: function () {
      this.$emit('gosubmit', true)
    },
    // 登录提交账户密码验证
    registration: function () {
      const that = this
      var mydate = new Date()
      var signupForm = {
        email: this.signupForm.email,
        username: this.signupForm.username,
        password: md5(this.signupForm.password),
        registertime: this.formatDateTime(mydate)
      }
      // 查询是否有重复的
      axios.get('http://148.70.128.231:3000/registrastion/isrepeat', {
        params: {
          useremail: signupForm.email,
          username: signupForm.username
        }
      }).then((res) => {
        console.log(res.data)
        if (res.data.length === 0) {
          axios.post('http://148.70.128.231:3000/registrastion', signupForm)
            .then(function (response) {
              console.log(response.data.insertId)
              that.backinfo(response.data.insertId)
              // 注册成功 返回信息
              that.$router.push('/')
            })
            .catch(function (error) {
              console.log(error)
            })
        } else {
          that.$message({
            type: 'warning',
            message: '用户名或邮箱已经被注册'
          })
        }
      })
    },
    // 注册成功后的返回信息
    backinfo: function (userid) {
      var that = this
      axios.get('http://148.70.128.231:3000/registrastion', {
        params: {
          // userid: this.$route.query.id
          userid: userid
        }
      }).then((res) => {
        console.log(res.data)
        console.log('sssssssss')
        that.Login() /* 改变登录状态 */
        that.Userinfo(res.data[0].username)
        that.Userid(res.data[0].userid) /* vuex 改变变量 */
        that.Headphoto(res.data[0].headphoto)
        console.log('bbbbs')
        console.log(that.$store.state)
        sessionStorage.setItem('store', JSON.stringify(that.$store.state))
      })
    }
  }
}
</script>

<style scoped>
  h2 {
    width: 100%;
    text-align: center;
  }
  .demo-dynamic{
    width: 80%;
  }
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
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: center;
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
  }
.login-form-part >>> .el-form-item {
  margin-bottom: 30px;
}
</style>
<style>
</style>

<template>
  <div class="login-form-part">
    <i class="&#xe62b;"></i>
    <el-form  :model="forgetForm"  :rules="rules" ref="signupForm" label-width="0" class="demo-dynamic">
      <el-form-item prop="email">
        <el-input  title="请输入邮箱" v-model="forgetForm.email" prefix-icon="el-icon-message" placeholder="void@gmail.com"></el-input>
      </el-form-item>

      <el-form-item class="verification" prop="vcode">
        <el-input class="verification-input" v-model="forgetForm.vcode" prefix-icon="iconfont icon-yanzhengmatianchong-copy">
        </el-input>
        <el-button type="primary" v-if="show" @click="getvcode" ref="getcode">获取验证码</el-button>
        <el-button type="primary" v-if="!show" style="width: 112px;">{{count}}s</el-button>

      </el-form-item>
    </el-form>

    <div class="login-footer">
      <div class="login-footer-right">
        <el-button type="primary" class="login-footer-right-bt" @click="tochange">Reset Password</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
// import md5 from 'js-md5' // 引入md5 远程js 进行md5 加密
import axios from 'axios'
// import Login from '@/components/loginPage/Login'
export default {
  name: 'forgetpassword',
  components: {},
  computed: {
    ...mapState
  },
  data () {
    return {
      show: true,
      count: '',
      time: null,
      forgetForm: {
        email: '',
        vcode: ''
      },
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
    ...mapMutations(['Login']),
    // 登录提交账户密码验证
    getvcode: function () {
      // const that = this
      this.postcode()
      const TIME_COUNT = 60
      if (!this.timer) {
        this.count = TIME_COUNT
        this.show = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.show = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },
    postcode: function () {
      var forgetForm = {
        email: this.forgetForm.email
      }
      if (!this.forgetForm.email) { alert('请输入邮箱') } else {
        axios.post('http://148.70.128.231:3000/forpassword', forgetForm)
          .then(function (response) {
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    tochange: function () {
      const that = this
      var vCode = {
        vcode: this.forgetForm.vcode
      }
      if (!this.forgetForm.vcode) { alert('请先输入验证码') } else {
        axios.post('http://148.70.128.231:3000/forpassword/tochange', vCode)
          .then(function (response) {
            if (response.data === 1) {
              that.$emit('goresetpd', true)
            } else {
              alert('请输入正确的验证码')
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
  .verification{
    display: flex;
    justify-content: space-between;
    width: 100%;
    flex-wrap: nowrap;
  }
  .verification-input{
    display: inline-block;
    width: 203px;
  }
  .demo-dynamic{
    width: 80%;
    margin-top: 22px;
  }
  .login-form-part{
    height: 200px;
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
    height: 65px;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    padding: 0px 40px 0 40px;
    background-color: #f7f7f7;
  }
  .login-footer-right-bt{
    width: 320px;
  }

</style>

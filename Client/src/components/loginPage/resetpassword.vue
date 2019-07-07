<template>
  <div class="login-form-part" v-show="isreset">
    <el-form  :model="resetForm"  :rules="rules" ref="resetForm" label-width="0" class="demo-dynamic">
      <el-form-item prop="password">
        <el-input  title="请输入新密码" v-model="resetForm.password" prefix-icon="iconfont icon-icon_password" placeholder="请输入新密码" show-password></el-input>
      </el-form-item>
    </el-form>

    <div class="login-footer">
      <div class="login-footer-right">
        <el-button type="primary" class="login-footer-right-bt" @click="tochangepw">Reset</el-button>
      </div>
    </div>
<!--    <div class="login-form-part" v-show="!isreset">恭喜你修改成功</div>-->
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import md5 from 'js-md5' // 引入md5 远程js 进行md5 加密
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
      isreset: true,
      resetForm: {
        password: ''
      },
      rules: {
        password: [
          // { min: 8, message: '请输入不少于8个字符', trigger: 'blur' },
          // { type: 'password', message: '请输入强度适合的密码', trigger: ['blur', 'change'] },
          { pattern: /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/, message: '密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符' }
        ]
      }
    }
  },
  mounted () {
  },
  methods: {
    ...mapMutations(['Login']),
    // 改密码
    tochangepw: function () {
      const that = this
      var resetForm = {
        password: md5(this.resetForm.password)
      }
      // console.log(md5(this.loginForm.password))
      if (!this.resetForm.password) { alert('请先输入密码') } else {
        axios.post('http://148.70.128.231:3000/forpassword/toreset', resetForm)
          .then(function (response) {
            console.log('ssssssqqqqqq')
            console.log(response.data)
            that.isreset = !that.isreset
            if (response.data) {
              that.$message({
                type: 'success',
                message: '修改成功'
              })
              that.$router.go(0)
            } else {
              that.$message({
                type: 'success',
                message: '修改失败'
              })
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

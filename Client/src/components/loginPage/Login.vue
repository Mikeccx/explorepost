<template>
  <div class="bg">
  <div class="login-bg">
    <div class="login-header">
       <div class="login-header-logo">Explore</div>
       <div class="login-header-select">
          <div class="login-header-select-login" @click="clicklogin">登 录<div v-if="login"></div></div>
         <div class="login-header-select-signup" @click="clicksignup">注 册<div v-if="signup"></div></div>
       </div>
    </div>
    <div>
      <LoginForm  ref='loginform' class="login-header-loginform-input" @goregistration="toregistration" @goforgetpw="goforgetpw"></LoginForm>
      <SignupForm ref="signupform" class="login-header-signform-input" @gosubmit="gosubmit"></SignupForm>
      <Forgetpassword ref="forgetpw" class="login-header-forgetpd-input" @goresetpd="goresetpd"></Forgetpassword>
      <Resetpassword ref="resetpw" class="login-header-resetpw-input"></Resetpassword>
    </div>
  </div>
  </div>
</template>

<script>
import LoginForm from '@/components/loginPage/login-form'
import SignupForm from '@/components/loginPage/signup-form'
import Forgetpassword from '@/components/loginPage/forgetpassword'
import Resetpassword from '@/components/loginPage/resetpassword'
export default {
  name: 'Login',
  components: {LoginForm, SignupForm, Forgetpassword, Resetpassword},
  data () {
    return {
      login: true,
      signup: false
    }
  },
  mounted () {
  },
  methods: {
    toregistration: function () {
      this.clicksignup()
    },
    gosubmit: function () {
      this.clicklogin()
    },
    goforgetpw: function () {
      this.clickforgetpw()
    },
    goresetpd: function () {
      this.clickresetpw()
    },
    clicklogin: function () {
      this.login = true
      this.signup = false
      this.$refs.loginform.$el.classList.replace('loginmove', 'login-header-loginform-input')
      this.$refs.signupform.$el.classList.replace('signmove', 'login-header-signform-input')
      this.$refs.forgetpw.$el.classList.replace('forgetpsmove', 'login-header-forgetpd-input')
      this.$refs.resetpw.$el.classList.replace('resetpwmove', 'login-header-resetpw-input')
    },
    clicksignup: function () {
      this.signup = true
      this.login = false
      this.$refs.loginform.$el.classList.replace('login-header-loginform-input', 'loginmove')
      this.$refs.signupform.$el.classList.replace('login-header-signform-input', 'signmove')
      this.$refs.forgetpw.$el.classList.replace('forgetpsmove', 'login-header-forgetpd-input')
      this.$refs.resetpw.$el.classList.replace('resetpwmove', 'login-header-resetpw-input')
    },
    clickforgetpw: function () {
      this.$refs.loginform.$el.classList.replace('login-header-loginform-input', 'loginmove')
      this.$refs.signupform.$el.classList.replace('signmove', 'login-header-signform-input')
      this.$refs.forgetpw.$el.classList.replace('login-header-forgetpd-input', 'forgetpsmove')
      this.$refs.resetpw.$el.classList.replace('resetpwmove', 'login-header-resetpw-input')
    },
    clickresetpw: function () {
      this.$refs.loginform.$el.classList.replace('login-header-loginform-input', 'loginmove')
      this.$refs.signupform.$el.classList.replace('signmove', 'login-header-signform-input')
      this.$refs.forgetpw.$el.classList.replace('forgetpsmove', 'login-header-forgetpd-input')
      this.$refs.resetpw.$el.classList.replace('login-header-resetpw-input', 'resetpwmove')
    }
  }
}
</script>

<style scoped>
   .bg{
     height: 722px;
     background-color: #e4e4e4;
   }
  .login-bg{
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    height: 262px;
    justify-content: center;
    background-color: #018ef5;
  }
.login-header{
  display: flex;
  width: 1080px;
  height: 52px;
  align-items: center;
  justify-content: space-between;
}
.login-header-logo{
  width: 89px;
  height: 38px;
  display: flex;
  font-size: 18px;
  font-weight: bold;
  align-items: center;
  color: #f9f9f9;
}
  .login-header-select{
    display: flex;
    width: 888px;
    height: 52px;
    justify-content: flex-end;
    align-items: center;
    color: white;
    font-size: 12px;
  }
  .login-header-select-login,.login-header-select-signup{
    /*width: 50px;*/
    margin-right: 12px;
    flex-direction: column;
    cursor:pointer;
  }
  .login-header-select-login >div,.login-header-select-signup>div {
    display: flex;
    height: 2px;
    margin-top: 2px;
    width: 30px;
    background-color: #fff;
    cursor:pointer;
  }
  .login-header-select-signup>div{
    width: 30px;
  }
  .login-header-loginform-input{
    align-items: center;
    transition: all 0.2s ease-in 0s;
  }
   .login-header-signform-input {
     align-items: center;
     transition: all 0.2s ease-in 0s;
     transform:translate(-1200px,0px);
   }
   .login-header-forgetpd-input{
     align-items: center;
     transition: all 0.2s ease-in 0s;
     transform:translate(-1000px,0px);
   }
   .login-header-resetpw-input{
     align-items: center;
     transition: all 0.2s ease-in 0s;
     transform:translate(-1000px,0px);
   }
   .loginmove{
     align-items: center;
     transform:translate(-1000px,0px);
     transition: all 0.2s ease-in 0s;
     /*dom替换属性 前面时间代表滑行时间，后面时间代表响应时间*/
   }
   .signmove{
     align-items: center;
     transform:translate(0px,0px);
     transition: all 0.2s ease-in 0s;
     /*dom替换属性 前面时间代表滑行时间，后面时间代表响应时间*/
   }
   .forgetpsmove{
     align-items: center;
     transform:translate(0px,0px);
     transition: all 0.2s ease-in 0s;
     /*dom替换属性 前面时间代表滑行时间，后面时间代表响应时间*/
   }
   .resetpwmove{
     align-items: center;
     transform:translate(0px,0px);
     transition: all 0.2s ease-in 0s;
     /*dom替换属性 前面时间代表滑行时间，后面时间代表响应时间*/
   }
</style>

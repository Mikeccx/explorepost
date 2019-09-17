// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import Vuex from 'vuex'
// 引入axios
import axios from 'axios'
import VueAxios from 'vue-axios'
import './assets/icon/iconfont.css'
// import qs from 'qs'

// import Loginpage from '@/Loginpage'
import common from '../src/js/common'
// 懒加载
import VueLazyload from 'vue-lazyload'

// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
Vue.use(VueLazyload, {
  error: 'dist/error.png', // 这个是请求失败后显示的图片
  loading: 'dist/loading.gif', // 这个是加载的loading过渡效果
  try: 2 // 这个是加载图片数量
})
Vue.prototype.common = common
// 公共方法
Vue.use(VueAxios, axios)

Vue.use(ElementUI)
Vue.use(Vuex)
Vue.config.productionTip = false

// vuex
const store = new Vuex.Store({
  state: {
    isLogin: false,
    subject: '户外大厅',
    username: '',
    userid: '',
    headphoto: '',
    post: [],
    isread: true /* 是否有未读站内信 */
    // message: '我是message'
  },
  getters: {

  },
  mutations: { // 提交方法
    Login (state) { // 改变登录状态
      state.isLogin = true
    },
    Quit (state) { // 退出
      state.isLogin = false
    },
    Userinfo (state, username) {
      state.username = username
    },
    Userid (state, userid) { // 存入用户数据
      state.userid = userid
    },
    Headphoto (state, headphoto) {
      state.headphoto = headphoto
    },
    Changesubject (state, subject) { // 改变模块
      state.subject = subject
    },
    Getpost (state, post) { // 更改暂存帖子目录
      state.post = post
    },
    Changeisread (state, isread) {
      // 更改已读状态
      state.isread = isread
    }
  },
  actions: {

  }
})
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // 引入vuex
  components: { App },
  template: '<App/>'
})

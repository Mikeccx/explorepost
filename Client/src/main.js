// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/index'
import router from './router/index'
import VueLazyload from 'vue-lazyload'// 懒加载
import './assets/icon/iconfont.css'
import giaoui from 'giao-ui'
import { formatDateTime } from '../src/js/common'
Vue.use(VueLazyload, {
  error: 'error.png', // 这个是请求失败后显示的图片
  loading: 'loading.png', // 这个是加载的loading过渡效果
  try: 2 // 这个是加载图片数量
})
Vue.use(giaoui)
Vue.prototype.formatDateTime = formatDateTime // 公共方法
Vue.config.productionTip = false

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store, // 引入vuex
  components: { App },
  template: '<App/>'
})

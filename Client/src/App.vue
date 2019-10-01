<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
// import Login from '@/components/loginPage/Login'
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload // 提供重载方法
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  computed: {
    ...mapState(['isLogin'])
  },
  methods: {
    ...mapMutations(['Login']),
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  },
  created () { // 页面刷新前将vuex状态保存在sessionStorage中
    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('store')) {
      console.log(this.$store.state)
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
  }
}
</script>

<style>
  html{
    height: 100%;
  }
  body{
    margin: 0;
    height: 100%;
    width: 100%;
    background: #fff;
  }
  ul,li{
    list-style: none;
    margin: 0;
    padding: 0;
  }
  a{
    text-decoration:none;
    margin: 0;
  }
  .el-badge__content el-badge__content--undefined is-fixed is-dot{
    right: 5px;
    top: 3px;
  }
</style>

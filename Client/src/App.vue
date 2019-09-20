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

    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    // window.addEventListener('load', () => { // 页面加载完存入
    //   console.log(this.$store.state)
    //   sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    //   console.log(this.$store.state)
    // })
    // window.addEventListener('beforeunload', () => {
    //   sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    // })
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
    /*min-width: 1500px; !*页面被压缩的正常表现*!*/
    background: #fff;
    /*background: url("http://attachments.gfan.net.cn/forum/201503/21/064408bwtzgqzjtnggggw8.jpg");*/
    /*background: url("http://i0.hdslb.com/bfs/archive/5e797a8d4d717f7db64afe28be0b56c2bbc07e00.jpg");*/
    /*background: #efefef;*/
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

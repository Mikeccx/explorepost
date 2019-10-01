<template>
  <div>
    <el-container>
      <el-header style="background-color: #1a2b38">Expolre论坛管理系统</el-header>
      <el-container>
        <el-aside width="200px" style="min-height: 661px;overflow: hidden;">
          <el-row class="tac">
          <el-col :span="12">
<!--            <h5 style="line-height: 0px;">自定义颜色</h5>-->
            <el-menu
              default-active="1"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#1a2b38"
              text-color="#fff"
              active-text-color="#ffd04b"
              style="width: 200px"
            >
              <router-link to="/admin/useradmin">
              <el-menu-item index="1">
                  <i style="color: white" class="iconfont icon-yonghuguanli"></i>
                    <span slot="title">用户管理</span>
              </el-menu-item>
              </router-link >

              <router-link to="/admin/postadmin">
              <el-menu-item index="2">
                <i style="color: white;font-size: 17px" class="iconfont icon-tieziguanli"></i>
                <span slot="title">帖子管理</span>
              </el-menu-item>
              </router-link >
              <router-link to="/admin/announce">
                <el-menu-item index="3">
                  <i style="color: white;font-size: 17px" class="iconfont icon-gonggao"></i>
                  <span slot="title">站内公告</span>
                </el-menu-item>
              </router-link >
            </el-menu>
          </el-col>
          </el-row>
        </el-aside>
        <el-container>
<!--          中间内容            -->
          <el-main>
            <transition  name="component-fade" mode="out-in">
            <router-view></router-view>
            </transition>
          </el-main>
<!--          中间内容            -->
          <el-footer>{{date}}</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      date: new Date()
    }
  },
  methods: {
    // 左侧导航啦栏
    handleOpen (key, keyPath) {
    },
    handleClose (key, keyPath) {
    }
    // 左侧导航啦栏
  },
  mounted () {
    let _this = this // 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(() => {
      _this.date = new Date() // 修改数据date
    }, 1000)
  },
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer) // 在Vue实例销毁前，清除我们的定时器
    }
  }
}
</script>

<style scoped>
  .el-header{
    background-color: #B3C0D1;
    color: #fff;
    text-align: center;
    line-height: 60px;
  }
  .el-footer {
    background-color: #B3C0D1;
    color: #fff;
    text-align: center;
    line-height: 60px;
  }
  .el-aside {
    color: #1a2b38;
    /*text-align: center;*/
    background-color: #1a2b38;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
  /*子路由切换效果*/
  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .3s ease;
  }
  .component-fade-enter, .component-fade-leave-to
    /* .component-fade-leave-active for below version 2.1.8 */ {
    opacity: 0;
  }
</style>

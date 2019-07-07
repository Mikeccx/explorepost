<template>
  <div class="top-nav">
  <div class="top-nav-center">
      <div class="top-nav-left">
        <div class="logo">Explore</div>
        <ul>
            <li><a class="hover" href="http://148.70.128.231:8080/">主页</a></li>
<!--          <li><a class="hover" target="_blank"  href="http://localhost:8080/">驴友网</a></li>-->
            <li><a class="hover" target="_blank"  href="https://www.ctrip.com/?sid=155952&allianceid=4897&ouid=index">出行</a></li>
            <li><a class="hover" target="_blank"  href="https://s.taobao.com/search?q=%E9%A9%B4%E5%8F%8B&imgfile=&commend=all&ssid=s5-e&search_type=item&sourceId=tb.index&spm=a21bo.2017.201856-taobao-item.1&ie=utf8&initiative_id=tbindexz_20170306">装备</a></li>
            <li><a class="hover" target="_blank"  href="http://baoxian.pingan.com/index.shtml?WT.mc_id=T00-Brand3-hydt-jp-004314&WT.srch=1">保险</a></li>
        </ul>
      </div>
    <div class="top-nav-right">
      <div class="top-nav-right-search">
          <el-col :span="20" class="top-nav-right-right-tab">
<!--            <el-autocomplete size="small"-->
<!--              class="inline-input"-->
<!--              v-model="state1"-->
<!--              :fetch-suggestions="querySearch"-->
<!--              placeholder="请输入内容"-->
<!--              @select="handleSelect"-->
<!--            ></el-autocomplete>-->
            <el-autocomplete size="small"
              class="inline-input"
              v-model="state"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入内容"
              @select="handleSelect"
            ></el-autocomplete>
          </el-col>
        <el-button class="searchbutton" size="small" type="primary" icon="el-icon-search" @click="tosearch">搜索</el-button>
      </div>
      <div class="top-nav-right-button">
      <el-button size="small" @click="goadmin" v-if="!isLogin">管理员登陆</el-button>
      <el-button type="primary" size="small" @click="gologinpage" v-show="!isLogin">驴友登陆</el-button>
        <div class="logined-info" v-show="isLogin">
<!--          <el-badge is-dot class="item" v-show="!isread">-->
            <el-badge is-dot class="item" v-show="!this.$store.state.isread">
<!--          <i style="color: white;cursor: pointer;margin-top: 6px;" class="el-icon-message" @click="toinnermessage"></i>-->
            <el-button  icon="el-icon-message" type="primary" size="small" style="color: white;align-items: center" @click="toinnermessage"></el-button>
          </el-badge>
          <el-button  icon="el-icon-message" type="primary" size="small" style="color: white;align-items: center" @click="toinnermessage" v-show="this.$store.state.isread"></el-button>
<!--          站内信-->
<!--          下拉菜单-->
          <el-dropdown class="dropdown">
  <span class="el-dropdown-link">
    <img :src="this.$store.state.headphoto" :onerror="imgnull" style="vertical-align: middle;"/>
    {{this.$store.state.username}}
<!--    <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
  </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="touserinfo">个人信息</el-dropdown-item>
<!--              <el-dropdown-item>我的帖子</el-dropdown-item>-->
<!--              <el-dropdown-item>我的收藏</el-dropdown-item>-->
              <el-dropdown-item @click.native="toeditorpersoninfo">修改信息</el-dropdown-item>
              <el-dropdown-item divided @click.native="quit">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import axios from 'axios'
export default {
  name: 'Header',
  inject: ['reload'],
  data () {
    return {
      // restaurants: [],
      // state1: ''
      restaurants: [],
      state: '',
      timeout: null,
      imgnull: 'this.src="' + require('../../assets/userinfo/0.jpg') + '"', // 没有头像的默认头像
      isread: true
    }
  },
  computed: {
    ...mapState(['isLogin']), /* 标注了可以直接引用变量 */
    update () {
      this.getmessagelist()
      return this.$store.state.isLogin
    }
  },
  methods: {
    // vuex 提交变化的登录状态
    ...mapMutations(['Quit', 'Changeisread']),
    /* 退出账号 */
    quit: function () {
      this.$message({
        message: '再见!' + this.$store.state.username,
        type: 'success'
      })
      this.Quit()
      sessionStorage.setItem('store', 'false')
      /* 清空session中保存的状态 */
      this.$router.push('/')
    },
    /* 管理员登录 */
    goadmin: function () {
      this.$router.push('/Adminloginpage')
    },
    // 获取站内信列表
    getmessagelist: function () {
      var that = this
      axios.get('http://148.70.128.231:3000/innermessage', {
        params: {
          // userid: this.$route.query.id
          userid: this.$store.state.userid
        }
      }).then((res) => {
        console.log(res.data)
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].isread === 0) { that.Changeisread(false) }
        }
      })
    },
    /* 前往站内信 */
    toinnermessage: function () {
      let routeData = this.$router.resolve({
        name: 'Innermessage',
        query: {id: this.$store.state.userid}
      })
      window.open(routeData.href, '_blank')
    },
    /* 跳转到用户信息 */
    touserinfo: function () {
      // this.$router.push('/Userinfo')
      console.log(this.$store.state.userid)
      let routeData = this.$router.resolve({
        name: 'Userinfo',
        query: {id: this.$store.state.userid}
      })
      window.open(routeData.href, '_blank')
    },
    /* 跳转到修改用户信息 */
    toeditorpersoninfo: function () {
      console.log(this.$store.state.userid)
      let routeData = this.$router.resolve({
        name: 'editorpersoninfo',
        query: {id: this.$store.state.userid}
      })
      window.open(routeData.href, '_blank')
    },
    /* 跳转到登录页面 */
    gologinpage: function () {
      this.$router.push('/Loginpage')
    },
    /* 搜索框 */
    querySearch (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    loadAll () {
      axios.get('http://148.70.128.231:3000/post/allpost').then((res) => {
        this.restaurants = res.data
      })
    },
    querySearchAsync (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    createStateFilter (queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect (item) {
      // console.log(item.value)
      // console.log(this.state)
    },
    /* 跳转搜索 */
    tosearch () {
      let routeData = this.$router.resolve({
        name: 'Searchpage',
        query: {wd: this.state}
      })
      window.open(routeData.href, '_blank')
      // console.log(this.state)
    }
  },
  mounted () {
    this.loadAll()
    console.log(this.$store.state.message)
    this.$store.state.message = '我是修改后的message'
    console.log(this.$store.state.message)
    // this.getmessagelist()
    // this.restaurants = this.loadAll()
    // console.log(this.restaurants)
  },
  watch: {
    update: function () {
      this.getmessagelist()
    }
  }
}
</script>

<style scoped>
  .dropdown img{
    width: 30px;
    height: 30px;
    border-radius: 20px;
  }
  .top-nav{
    background-color: #1a2b38;
    border-bottom: 1px solid #1a2b38;
  }
  .top-nav-center {
    display: flex;
    justify-content: space-between;
    height: 38px;
    width: 980px;
    margin: auto;
    /*box-shadow: 0 0 5px rgba(0,0,0,0.24);*/
  }
  .top-nav-left{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 38px;
    width: 50%;
    margin-right: 8px;
  }
  .top-nav-left ul{
    display: flex;
    flex-direction: row;
  }
   .logo{
    width: 89px;
    height: 38px;
    text-align:center;
    vertical-align: middle;
   line-height: 38px;
     color: #f9f9f9;
    background-color: #409EFF;
  }
  .top-nav-left li{
    padding-right: 5px;
    font-size: 12px;
  }
  .top-nav-right{
    display: flex;
    /*justify-content:space-between;*/
    justify-content:flex-end;
    height: 38px;
    width: 50%;

  }
  .top-nav-right-right-tab{
  }
  .top-nav-right-search{
    display: flex;
    height: 38px;
    margin-right: 15px;
    justify-content: flex-start;
    align-items: center;
  }
  .searchbutton{
     width: 80px;
    height: 32px;
    display: flex;
  }
  .top-nav-right-button{
    display: flex;
    /*line-height: 38px;*/
    /*vertical-align: center;*/
    justify-content: space-between;
    align-items: center;
  }
  .logined-info button{
  }
  .logined-info{
    display: flex;
    margin-left: 8px;
  }
  .hover:hover{
    background: #409EFF;
  }
  a{
    display: block;
    float: left;
    height: 38px;
    line-height: 38px;
    padding: 0 8px;
    color: white;
  }
  /*下拉菜单*/
  .dropdown{
    margin-left: 10px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>

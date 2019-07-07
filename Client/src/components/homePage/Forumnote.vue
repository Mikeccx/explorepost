<template>
  <div>
    <div class="forumnote-nav">
      <div>
        <div class="block">
          <el-pagination
            small
            layout="prev, pager, next"
            :total="post.length"
            :page-size="pagesize"
          @current-change="current_change"
          :current-page.sync="currentPage"
          >
          </el-pagination>
      </div></div>
      <div class="forumnote-nav-post"> <el-button type="primary" @click="newpost">发表新帖</el-button></div>
    </div>
    <div class="forumnote-nav-sort">
      <el-button type="text" @click="lastreplysort">最后回复</el-button>
      <el-button type="text" @click="pulishtimesort">发帖时间</el-button>
    </div>
    <form id="ajaxtable">
    <div class="forumnote" >
<!--      帖子版块标题-->
         <div class="forumnote-title">
           <div>主题</div>
           <div class="forumnote-title-info-1">作者/发布时间</div>
           <div class="forumnote-title-info-2">回复/查看</div>
           <div class="forumnote-title-info-3">最后回复</div>
         </div>
      <!--      帖子版块标题-->
        <div class="forumnote-content" v-for="(item) in post.slice((currentPage-1)*this.pagesize,currentPage*this.pagesize)" :key="item.value">
          <div><a style="cursor: pointer" @click="topostspc(item.postid)">{{item.posttitle}}</a></div>
        <div class="forumnote-content-author">
          <div class="forumnote-content-author-name">{{item.postauthor}}</div>
          <div class="forumnote-content-author-time">{{item.posttime.slice(0,10)}}</div>
        </div>
        <div class="forumnote-content-reply">{{item.replynum}}/{{item.clicknum}}</div>
          <div class="forumnote-content-author">
            <div class="forumnote-content-author-name">{{item.lastreplyname}}</div>
            <div class="forumnote-content-author-time">{{item.lastreplytime.slice(0,10)}}</div>
          </div>
        </div>
    </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Forumnote',
  created () {
  },
  mounted () {
    this.displaypost() // 读取默认版块的帖子列表
    // this.post = this.$store.state.post
    console.log(this.post)
  },
  data () {
    return {
      currentPage: 1, // 默认当前页为第一页
      pagesize: 15, // 一页15篇
      post: [],
      waytoreply: true, // 最后回复的方式 默认0 降序
      waytopulish: true // 同上不过是发帖时间
    }
  },
  methods: {
    // 最后回复时间排序
    lastreplysort: function () {
      axios.get('http://148.70.128.231:3000/post/lastreplysort', {
        params: {
          postsubject: this.$store.state.subject,
          waytoreply: this.waytoreply
        }
      }).then((res) => {
        console.log(res.data)
        this.$store.state.post = res.data
        this.waytoreply = !this.waytoreply
      })
    },
    /* 发帖时间排序 */
    pulishtimesort: function () {
      axios.get('http://148.70.128.231:3000/post/pulishtimesort', {
        params: {
          postsubject: this.$store.state.subject,
          waytopulish: this.waytopulish
        }
      }).then((res) => {
        console.log(res.data)
        this.$store.state.post = res.data
        this.waytopulish = !this.waytopulish
      })
    },
    /* 到帖子详情 */
    topostspc: function (postid) {
      axios.get('http://148.70.128.231:3000/post/clicknum', {
        params: {
          postid: postid
        }
      }).then((res) => {
        let routeData = this.$router.resolve({
          name: 'Postspc',
          query: {id: postid}
        })
        window.open(routeData.href, '_blank')
      })
    },
    /* 跳转到发表新帖的页面 如果未登录跳转到登录页面 */
    newpost () {
      if (this.$store.state.isLogin) {
        this.$router.push('/Newpost')
      } else {
        this.$router.push('/Loginpage')
      }
    }, /* 跳转到发表新帖的页面 */
    current_change (currentPage) { // 改变当前页
      this.currentPage = currentPage
    },
    displaypost: function () { // ajax 获取post信息 但是每次点击请求一次，通过版块的名字查询数据库
      // console.log('1')
      axios.get('http://148.70.128.231:3000/post', {
        params: {
          postsubject: this.$store.state.subject
        }
      }).then((res) => {
        console.log(res.data)
        this.$store.state.post = res.data
      })
    }
    // tolook: function (id) { // 点击帖子查看详情
    //   let router = this.$router.resolve({
    //     path: '/Postspc',
    //     query: {id: id}
    //   })
    //   window.open(router, 'blank')
    // }
  },
  computed: {
    /* 监听鼠标点击版块 */
    listensubject () {
      return this.$store.state.subject
    },
    /* 监听帖子的变化 */
    listenpost () {
      return this.$store.state.post
    }
  },
  watch: {
    listensubject: function () {
      this.displaypost()
    },
    listenpost: function () {
      this.post = this.$store.state.post
    }
  }
}
</script>

<style scoped>
  #ajaxtable{
    height: 607px;
    margin-bottom: 50px;
  }
  .forumnote-nav{
    display: flex;
    width: 980px;
    height: 69px;
    margin: auto;
    justify-content: space-between;
    align-items: center;
    border-bottom: #CCCCCC solid 1px;
  }
.forumnote-nav-post{
  background-color: #409EFF;
  text-align: center;
  color: #f9f9f9;
}
  .forumnote-nav-sort{
    display: flex;
    width: 980px;
    margin: auto;
    height: 36px;
    margin-top: 12px;
    justify-content: flex-end;
  }
  form{
    height: 980px;
    width: 980px;
    background-color:#fff;
    margin: auto;
  }
  .forumnote-title {
    display: flex;
    flex-wrap: nowrap;
    height: 37px;
    background-color: #f6f6f6;
    border-bottom: 1px solid #ccc;
  }
  .forumnote-title div{
    display: flex;
    font-size: 12px;
    height: 37px;
    align-items: center;
    /*height: 37px;*/
  }
  .forumnote-title > div:first-child{
    height: 37px;
    padding-left: 12px;
    align-items: center;
    width: 675px;
  }
  .forumnote-title-info-1,.forumnote-title-info-3{
    height: 37px;
    align-items: center;
    width: 104px;
  }
  .forumnote-title-info-2{
    height: 37px;
    width: 104px;
    align-items: center;
  }
  .forumnote-content{
    height: 37px;
    border-bottom: 1px solid #ccc;
    display: flex;
    flex-wrap: nowrap;
  }
  .forumnote-content >div:first-child{
    display: flex;
    width: 675px;
    padding-left: 12px;
    font-size: 14px;
    align-items: center;
  }
  .forumnote-content-author{
    display: flex;
    flex-wrap: wrap;
    width: 104px;
    font-size: 12px;
    align-items: center;
  }
  .forumnote-content-author-name,.forumnote-content-author-time{
    display: flex;
    width: 100%;
    height: 50%;
  }
  .forumnote-content-reply{
    display: flex;
    width: 104px;
    font-size: 12px;
    align-items: center;
  }
</style>

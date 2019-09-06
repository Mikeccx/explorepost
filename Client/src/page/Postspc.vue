<template>
   <div>
     <Header></Header>
<!--     楼主模块-->
     <div class="content-bg">
<!--       题目-->
       <div class="content-title">
         <a>{{postspc.posttitle}}</a>
         <a class="content-title-right">
           <el-button plain size="small">只看楼主</el-button>
           <el-button plain size="small" @click="collect" v-if="iscollected">收藏</el-button>
           <el-button plain size="small" @click="cancelcollect" v-if="!iscollected">已收藏</el-button>
           <el-button plain size="small" @click="returnReply">回复</el-button>
         </a>
       </div>
<!--       题目-->
<!--       内容-->
       <div class="content">
         <div class="content-left">
           <div class="content-left-userhead">
             <img :src="postspc.headphoto" :onerror="imgnull" style="width: 100%;height: 100%"/>
           </div>
           <p style="cursor: pointer" @click="touserinfo(postspc.postauthorid)">{{postspc.postauthor}}</p>
         </div>
         <div class="content-right">
           <div class="content-right-info">
             <span style="float: left">{{this.common.formatDateTime(new Date(postspc.posttime))}}</span>
             <span style="float: right">1楼</span>
<!--             <span style="float: right;margin-right: 10px;">只看该作者 | 倒序浏览 | 只看本帖大图</span>-->
           </div>
           <div class="content-right-spc">
             <div style="min-height: 50px;" v-html="postspc.postcontent"></div>
           </div>
           <div class="content-right-footer">
             <span style="float: right;height:42px;line-height: 42px;margin-right: 10px;"></span>
           </div>
         </div>
       </div>
<!--       内容-->
     </div>
<!--     楼主模块-->
<!--     回复模块-->
     <div class="reply" v-for="(item, index) in reply" :key="item.value">
       <div class="content-bg">
         <div class="content">
           <div class="content-left">
             <div class="content-left-userhead">
               <img :src="item.headphoto" :onerror="imgnull" style="width: 100%;height: 100%"/>
             </div>
             <p style="cursor: pointer" @click="touserinfo(item.floorerid)">{{item.replyername}}</p>
           </div>
           <div class="content-right">
             <div class="content-right-info">
<!--               new Date转换成中国标准时间，formatDateTime切换格式-->
               <span style="float: left">{{this.common.formatDateTime(new Date(item.replytime))}}</span>
               <span style="float: right">{{item.replyfloor+1}}楼</span>
             </div>
             <div class="content-right-spc">
               <div style="height: 50px;" v-html="item.content"></div>
             </div>
             <div class="content-right-footer">
               <transition name="fade" mode="out-in">
               <span class="content-right-footer-reply" @click="replycz(index)" ref="replycz" v-if="!isopen[index]">回复</span>
               <span class="content-right-footer-upreply"  @click="standupreply(index)" ref="standupreply" v-if="isopen[index]">收起回复</span>
               </transition>
<!--               <div style="clear: both"></div>-->
<!--               弹出框-->
               <transition name="bounce">
               <div class="replycollapse " ref="replycollapse"  v-if="isopen[index]">
                 <ul>
                 <li v-for="(item1, index1) in floorreply[index]"  :key="item1.value">
                   <span @click="touserinfo(item1.guesterid)" style="cursor: pointer;color: #409EFF">{{item1.guestername}}:</span>
<!--                   <span v-show="item1.reciverid!==item1.floorerid">回复&nbsp;<span>{{item1.recivername}}</span>&nbsp;:</span>-->
                   <span v-show="item1.reciverid!==item1.floorerid">回复</span>
                   <span v-show="item1.reciverid!==item1.floorerid" @click="touserinfo(item1.reciverid)" style="cursor: pointer;color: #409EFF">{{item1.recivername}}</span>
                   <span v-show="item1.reciverid!==item1.floorerid">:</span>
                   <span>{{item1.content}}</span>
                   <span style="float: right;padding: 0 10px 0 5px ;font-size: 12px;cursor: pointer;color: #666" @click="replyperson(index,index1)">回复</span>
                   <span style="float: right;padding-left: 5px;font-size: 12px">{{this.common.formatDateTime(new Date(item1.replytime))}}</span>
                 </li>
                   <el-input
                     type="textarea"
                     style="width: 95%;padding: 10px 0 0 18px;margin-bottom: 10px;"
                     :rows="2"
                     :index = index
                     placeholder="请输入内容"
                     v-model="textarea[index]">
                   </el-input>
                   <el-button size="small" style="float: right;margin: 0px 21px 10px 0"  type="primary" @click="replyczsubmit(index)">发表</el-button>
                 </ul>
               </div>
               </transition>
<!--               弹出框-->
             </div>
           </div>
         </div>
       </div>
     </div>
<!--     回复模块-->
<!--     回复框-->
     <div id="div1" class="options" ref="div1"></div>
     <div id="div2" class="text">
       <div v-if="!this.$store.state.isLogin" class="tip">你需要登录后才可以回帖<router-link :to="{path:'/Loginpage'}"> 登录</router-link></div>
     </div>
     <div class="page-footer">
     <el-button type="primary" @click="replylz">回复</el-button>
     </div>
     <!--     回复框-->
   </div>
</template>

<script>
import axios from 'axios'
import Header from '@/components/homePage/Header'
import Mycontent from '@/components/homePage/Mycontent'
import E from 'wangeditor'
// import { mapState } from 'vuex'
export default {
  name: 'Postspc',
  components: {Mycontent, Header},
  data () {
    return {
      postspc: [], /* 楼主主题表信息 */
      reply: [], /* 楼层信息数组 */
      textarea: [], /* 回复层主的输入 */
      floorreply: [], /* 楼层数组 */
      isopen: [], /* 是否打开折叠 */
      tlength: [], /* 输入框字符长度 */
      replyczperson: [], /* 记录回复的具体某个人 */
      imgnull: 'this.src="' + require('../assets/userinfo/0.jpg') + '"', // 没有头像的默认头像
      iscollected: true
    }
  },
  created () {
  },
  mounted () {
    this.displaypost() /* 展示帖子 */
    /* 回复楼主编辑器 */
    this.editor = new E('#div1', '#div2')
    this.editor.create()
    /* 回复楼主编辑器 */
    this.ifeditor() /* 判断是否登录 */
    this.getreply() /* 获取回复的帖子信息 */
    this.iscollect() /* 是否收藏 */
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  methods: {
    /* 是否收藏了此贴 */
    iscollect: function () {
      var that = this
      console.log('我的userid')
      console.log(this.$store.state.userid)
      if (!this.$store.state.isLogin) {} else {
        axios.get('http://148.70.128.231:3000/userinfo/iscollect', {
          params: {
            postid: this.$route.query.id,
            userid: this.$store.state.userid
          }
        }).then((res) => {
          if (res.data.length) {
            that.iscollected = false
          } else {
            that.iscollected = true
          }
          console.log('回调函数呢')
          console.log(res.data.length)
        })
      }
    },
    /* 收藏 */
    collect: function () {
      var mydate = new Date()
      var that = this
      if (!this.$store.state.isLogin) {
        this.$router.push('/Loginpage')
      } else {
        axios.get('http://148.70.128.231:3000/userinfo/collect', {
          params: {
            postid: this.$route.query.id,
            userid: this.$store.state.userid,
            collecttime: this.common.formatDateTime(mydate)
          }
        }).then((res) => {
          that.iscollected = !that.iscollected
        })
      }
    },
    /* 取消收藏 */
    cancelcollect: function () {
      var that = this
      axios.get('http://148.70.128.231:3000/userinfo/cancelcollect', {
        params: {
          postid: this.$route.query.id,
          userid: this.$store.state.userid
        }
      }).then((res) => {
        that.iscollected = !that.iscollected
      })
    },
    /* 跳转到用户信息 */
    touserinfo: function (userid) {
      // this.$router.push('/Userinfo')
      console.log(userid)
      let routeData = this.$router.resolve({
        name: 'Userinfo',
        query: {id: userid}
      })
      window.open(routeData.href, '_blank')
    },
    // 回复框锚点不会改变url
    returnReply: function () {
      console.log(this.$refs.div1)
      this.$refs.div1.scrollIntoView()
    },
    displaypost: function () { // ajax 获取帖子主题信息 作者内容
      console.log(this.$route.query.id)
      axios.get('http://148.70.128.231:3000/post/postid', {
        params: {
          id: this.$route.query.id
        }
      }).then((res) => {
        console.log(res.data)
        this.postspc = res.data[0] /* 主题信息只有一条且存在数组0中 */
      })
    },
    /* 获取回复数据 */
    getreply: function () {
      axios.get('http://148.70.128.231:3000/post/getreply', {
        params: {
          postid: this.$route.query.id
        }
      }).then((res) => {
        this.reply = res.data
        console.log(res.data)
      })
    },
    /* 获取楼层回复数据 */
    getfloorreply: function (index) {
      var that = this
      console.log(index)
      axios.get('http://148.70.128.231:3000/post/getfloorreply', {
        params: {
          replyfloor: index + 1,
          postid: this.$route.query.id
        }
      }).then((res) => {
        if (that.floorreply.length <= index) that.floorreply[index] = 1
        that.floorreply.splice(index, 1, res.data)
        // this.$set(this.floorreply, index, res.data) /* 实时动态检测数据 */
        console.log(that.floorreply)
      })
    },
    /* 是否登录是否可以回帖 */
    ifeditor: function () {
      if (this.$store.state.isLogin) { this.editor.$textElem.attr('contenteditable', true) } else { this.editor.$textElem.attr('contenteditable', false) }
    },
    /* 回复楼主 */
    replylz: function () {
      console.log(this.reply.length + 1)
      var that = this
      var mydate = new Date()
      var replyform = {
        content: this.editor.txt.html(),
        postid: this.$route.query.id,
        replytime: this.common.formatDateTime(mydate),
        floorerid: this.$store.state.userid,
        replyfloor: this.reply.length + 1
      }
      axios.post('http://148.70.128.231:3000/post/reply', replyform
      ).then((res) => {
        that.getreply()
        that.replynum()
        console.log(res.data)
        this.lastreply()
        this.editor.txt.clear()
      })
    },
    /* 最后回复 */
    lastreply: function () {
      var mydate = new Date()
      axios.get('http://148.70.128.231:3000/post/lastreply', {
        params: {
          postid: this.$route.query.id,
          lastreplytime: this.common.formatDateTime(mydate),
          lastreplyid: this.$store.state.userid
        }
      }).then((res) => {
      })
    },
    /* 回复数+1 */
    replynum: function () {
      axios.get('http://148.70.128.231:3000/post/replynum', {
        params: {
          postid: this.$route.query.id
        }
      }).then((res) => {
      })
    },
    /* 显示回复层主 */
    replycz: function (index) {
      this.getfloorreply(index)
      this.$set(this.isopen, index, true)
    },
    /* 收起折叠 */
    standupreply: function (index) {
      this.$set(this.isopen, index, false)
    },
    /* 回复个人 */
    replyperson: function (index, index1) {
      // console.log(this.floorreply[index][index1].guestername + 'index1' + index1)
      // this.textarea[index] = '回复 ' + this.floorreply[index][index1].guestername + ':'
      this.$set(this.textarea, index, '回复 ' + this.floorreply[index][index1].guestername + ':') /* 实时动态检测数据 */
      this.tlength[index] = this.textarea[index].length // 记录回复+回复对象id当前长度
      this.replyczperson[index] = this.floorreply[index][index1].guesterid // 记录回复对象的id
      console.log(this.tlength[index])
    },
    /* 提交层主post */
    replyczsubmit: function (index) {
      console.log(this.reply[index])
      var that = this
      var mydate = new Date()
      var replyczform = {
        postid: this.$route.query.id,
        replyfloor: this.reply[index].replyfloor,
        content: this.textarea[index],
        guesterid: this.$store.state.userid,
        floorerid: this.reply[index].floorerid,
        reciverid: this.reply[index].floorerid,
        replytime: this.common.formatDateTime(mydate)
      }
      console.log(replyczform)
      console.log(this.tlength[index] <= this.textarea[index].length)
      if (this.tlength[index] <= this.textarea[index].length) { // 如果文本框长度大于回复对象的id，证明没有删除或回退。
        replyczform.reciverid = this.replyczperson[index] // 回复对象变成点击的人
        replyczform.content = replyczform.content.slice(this.tlength[index]) // 剔除前面的回复+回复对象名字
        this.replyczperson[index] = 0 // 清空回复对象
      }
      console.log(replyczform)
      if (!this.$store.state.isLogin) { alert('请先登录') } else
      if (replyczform.content != null) {
        axios.post('http://148.70.128.231:3000/post/replycz', replyczform
        ).then((res) => {
          that.getfloorreply(index) // 更新楼层
          that.replynum() // 更新回复数
          that.textarea[index] = '' // 清空输入框
          console.log(res.data)
          this.lastreply()
        })
      } else {
        alert('内容不能为空')
      }
    }
    /* 格式化时间日期 */
    // formatDateTime: function (date) {
    //   var y = date.getFullYear()
    //   var m = date.getMonth() + 1
    //   m = m < 10 ? ('0' + m) : m
    //   var d = date.getDate()
    //   d = d < 10 ? ('0' + d) : d
    //   var h = date.getHours()
    //   var minute = date.getMinutes()
    //   minute = minute < 10 ? ('0' + minute) : minute
    //   return y + '-' + m + '-' + d + ' ' + h + ':' + minute
    // }
  },
  watch: {
    isLogin () {
      this.ifeditor()
    },
    getfloorreply () {
      this.getfloorreply()
    }
  }
}
</script>

<style scoped>
  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
  .content-right-footer-reply{
    float: right;height:42px;line-height: 42px;margin-right: 10px;cursor: pointer;color: #1e54be;
  }
  .content-right-footer-upreply{
    float: right;height:42px;padding: 0px 8px;line-height: 42px;margin-right: 10px;cursor: pointer;background-color: #F7F8FA;color: #1e54be;
    /*display:none;*/
  }
  .replycollapse{
    /*display: none;*/
    background-color: #F7F8FA;
    min-height: 0px;
    width: 814px;
    margin: auto;
    overflow: auto;
    margin-bottom: 10px;
  }
  .replycollapse li{
    height: 49px;
    line-height: 49px;
    font-size: 14px;
    padding: 0 0 0 10px;
  }
  .page-footer{
    width: 980px;
    margin: auto;
    margin-top: 10px;
  }
  .tip{
    margin: auto;
    width: 260px;
    margin-top: 33px;
    font-size: 14px;
  }
  .options{
    width: 980px;
    margin: auto;
    margin-top: 10px;
    background-color: #f1f1f1;
  }
  .text{
    height: 100px;
    width: 980px;
    margin: auto;
    border: #f1f1f1 1px solid;
  }
  .content-bg {
    width: 980px;
    margin: auto;
    background-color: white;
    border:1px solid #C7C7C7;
    border-bottom: 1px solid #E1E4E6;
  }
  .content-title{
    width:100%;
    height: 46px;
    border-bottom: #e2e2e2 solid 1px;
  }
  .content-title a:first-child{
     line-height: 46px;
     padding: 0px 13px;
    font-size: 16px;
    color: #1e6d9b;
    font-weight: bold;
  }
  .content-title-right{
    float: right;
    font-size: 12px;
    padding-right: 13px;
    color: #858585;
    line-height: 46px;
  }
  .content {
    vertical-align: top;
    position: relative;
    font-size: 0;
  }
  .content-left{
    width: 15%;
    position: absolute;
    height: 100%;
    display: inline-block;
    font-size: 12px;
    vertical-align: top;
    text-align: center;
    background-color: #f2f4f7;
  }
  .content-left-userhead{
    width: 95px;
    height: 95px;
    margin: 10px auto;
    background-color: #cccccc;
  }
  .content-right{
    width: 85%;
    padding-left: 15%;
    display: inline-block;
    font-size: 12px;
    background-color: white;
  }
  .content-right-info{
    height: 35px;
    line-height: 35px;
    padding: 0 13px;
    border-bottom: #e2e2e2 solid 1px;
    text-align: justify;
  }
  .content-right-spc{
    /*background-color: #409EFF;*/
    width: 808px;
    margin-top: 13px;
    margin-left: 25px;
  }
  .content-right-footer{
    width: 100%;
    height: 42px;
    margin: 10px 10px 0px 0;
  }
  .content-right-footer:after{
    clear: both;
  }
  p:hover,span:hover{
    color: #409EFF;
  }
</style>

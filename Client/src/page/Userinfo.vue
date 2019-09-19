<template>
  <div>
    <Header></Header>
    <div class="header-next">
      <div class="userinfo-bg"></div>
      <div class="content">
        <div class="headphoto">
          <div class="headphoto-top">
            <img :src="userinfo.headphoto" :onerror="imgnull" style="width: 100%;height: 100%;padding-top: 4px;"/>
            <!--                <img src="../assets/userinfo/1.jpg" style="width: 100%;height: 100%;padding-top: 4px;">-->
          </div>
          <div class="headphoto-bottom">
            <div>
              <div style="font-size: 16px;font-weight: 700;color: black">{{userinfo.focusnum}}</div>
              <div>关注</div>
            </div>
            <p style="transform: scaleY(2.5);margin: 0;padding: 0;color:  #F4F4F4" >|</p>
            <div>
              <div style="font-size: 16px;font-weight: 700;color: black">{{userinfo.fansnum}}</div>
              <div >粉丝</div>
            </div>
          </div>
        </div>
        <div class="userinfo-option">
          <ul>
            <li><a @click="opening='home'">首页</a></li>
            <li><a @click="opening='post'">帖子</a></li>
            <li><a @click="opening='collect'">收藏</a></li>
            <li><a @click="opening='follow'">关注</a></li>
            <li><a @click="opening='fans'">粉丝</a></li>
          </ul>
        </div>
        <div class="username">
          <a>{{userinfo.username}}</a>
          <!--            <div style="width: 50%;display: inline-block" v-show="this.userinfo.userid!=this.$store.state.userid || this.$store.state.isLogin">-->
          <div style="width: 50%;display: inline-block" v-show="this.userinfo.userid!=this.$store.state.userid && this.$store.state.isLogin">
            <el-button size="small" type="primary" v-if="isfocus" @click="befans">关注</el-button>
            <el-button size="small" type="danger" v-if="!isfocus" @click="bepasser($route.query.id)">已关注</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="infocontent">
      <!--        个人信息-->
      <div class="infocontent-spc" v-show="this.opening === 'home'">
        <div class="infocontent-spc-boder">
          <div class="infocontent-spc-title">
            <p style="font-size: 16px;margin: 0;padding: 0;line-height: 50px;padding-left: 13px;color: #585858">基本信息</p>
          </div>
          <div class="infocontent-spc-content">
            <div class="infocontent-spc-content-left">
              <p>性别 &nbsp;&nbsp;{{userinfo.gender}}</p>
              <p>邮箱 &nbsp;&nbsp;{{userinfo.useremail}}</p>
            </div>
            <div class="infocontent-spc-content-right">
              <span style="vertical-align: top;padding-right: 10px;">统计信息</span>
              <div style="display: inline-block;height:90px">
                <a>关注数&nbsp;&nbsp;{{userinfo.focusnum}}</a>
                <a>粉丝数&nbsp;&nbsp;{{userinfo.fansnum}}</a>
                <a>帖子数&nbsp;&nbsp;{{userinfo.postnum}}</a>
                <a>回帖数&nbsp;&nbsp;{{userinfo.replynum}}</a></div>
            </div>
          </div>
        </div>
      </div>
      <!--        个人信息-->
      <!--        帖子-->
      <div class="post-spc" v-show="this.opening === 'post'">
        <div class="post-spc-boder">
          <div class="post-spc-title" style="background-color: white">
            <p style="font-size: 16px;margin: 0;padding: 0;line-height: 50px;padding-left: 13px;color: #585858">发表帖子</p>
          </div>
          <!--              无内容填充-->
          <div class="nocontent" v-show="postlist.length===0">暂无帖子</div>
          <div class="post-spc-content">
            <ul>
              <li v-for="item in postlist" :key="item.value">
                <div class="post-spc-content-center">
                      <span style="line-height: 33px;background-color: #768693;color: white;padding: 4px 8px;font-size: 12px;
    border-radius: 3px;margin-right: 8px;">帖子</span>
                  <span  style="cursor: pointer" @click="topostspc(item.postid)">{{item.posttitle}}</span>
                  <span style="line-height: 33px;background-color: #e1eaef;color: #1e6d9b;padding: 4px 8px;font-size: 12px;
    border-radius: 3px;margin-right: 8px;">{{item.postsubject}}</span>
                </div>
                <div class="post-spc-content-footer">
                  <div class="post-spc-content-footer-info">
                    <i class="iconfont icon-chakan" style="vertical-align: middle;padding-right: 3px;font-size: 14px;"></i>
                    <span style="vertical-align: middle;padding-right: 3px;font-size: 12px;">{{item.clicknum}}</span>
                    <i style="vertical-align: middle;" class="iconfont icon-huifu"></i>
                    <span style="vertical-align: middle;padding-right: 3px;font-size: 12px;">{{item.replynum}}</span>
                    <span style="line-height: 25px;;padding-right: 3px;font-size: 12px;float: right">{{formatDateTime(new Date(item.posttime))}}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!--        帖子-->
      <!--        收藏-->
      <div class="post-spc" v-show="this.opening === 'collect'">
        <div class="post-spc-boder">
          <div class="post-spc-title" style="background-color: white">
            <p style="font-size: 16px;margin: 0;padding: 0;line-height: 50px;padding-left: 13px;color: #585858">收藏帖子</p>
          </div>
          <!--              无内容的填充-->
          <div class="nocontent" v-show="collectlist.length===0">暂无收藏</div>
          <div class="post-spc-content">
            <ul>
              <li v-for="item in collectlist" :key="item.value">
                <div class="post-spc-content-center">
                      <span style="line-height: 33px;background-color: #768693;color: white;padding: 4px 8px;font-size: 12px;
    border-radius: 3px;margin-right: 8px;">帖子</span>
                  <span  style="cursor: pointer" @click="topostspc(item.postid)">{{item.posttitle}}</span>
                  <span style="line-height: 33px;background-color: #e1eaef;color: #1e6d9b;padding: 4px 8px;font-size: 12px;
    border-radius: 3px;margin-right: 8px;">{{item.postsubject}}</span>
                </div>
                <div class="post-spc-content-footer">
                  <div class="post-spc-content-footer-info">
                    <i class="iconfont icon-chakan" style="vertical-align: middle;padding-right: 3px;font-size: 14px;"></i>
                    <span style="vertical-align: middle;padding-right: 3px;font-size: 12px;">{{item.clicknum}}</span>
                    <i style="vertical-align: middle;" class="iconfont icon-huifu"></i>
                    <span style="vertical-align: middle;padding-right: 3px;font-size: 12px;">{{item.replynum}}</span>
                    <span style="line-height: 25px;;padding-right: 3px;font-size: 12px;float: right">{{formatDateTime(new Date(item.posttime))}}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!--        收藏-->
      <!--        关注-->
      <div class="post-spc" v-show="this.opening === 'follow'">
        <div class="post-spc-boder">
          <div class="post-spc-title" style="background-color: white">
            <p style="font-size: 16px;margin: 0;padding: 0;line-height: 50px;padding-left: 13px;color: #585858">关注</p>
          </div>
          <!--              无内容的填充-->
          <div class="nocontent" v-show="followlist.length===0">暂无关注</div>
          <div class="follow-spc">
            <ul>
              <li v-for="(item,index) in followlist" :key="item.value">
                <div class="follow-spc-content">
                  <img class="follow-spc-headphoto" :src="item.headphoto" :onerror="imgnull"/>
                  <div class="follow-spc-info">
                    <span style="margin-right: 10px;font-size: 14px;color: #2d64b3;display: inline-block;width: 100px;cursor: pointer" @click="touserinfo(item.userid)">{{item.username}}</span>
                    <!--                         <span style="font-size: 12px;display:inline-block; width: 88px">粉丝：&nbsp;{{item.fansnum}}</span>-->
                    <!--                         <span style="font-size: 12px;display:inline-block;width: 88px">关注: &nbsp;{{item.focusnum}}</span>-->
                  </div>
                  <el-button type="primary" size="small" style="float: right;vertical-align: top" @click="bepasser1(item.userid,index)">取消关注</el-button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!--        关注-->
      <!--        粉丝-->
      <div class="post-spc" v-show="this.opening === 'fans'">
        <div class="post-spc-boder">
          <div class="post-spc-title" style="background-color: white">
            <p style="font-size: 16px;margin: 0;padding: 0;line-height: 50px;padding-left: 13px;color: #585858">粉丝</p>
          </div>
          <!--              无内容的填充-->
          <div class="nocontent" v-show="fanslist.length===0">暂无粉丝</div>
          <div class="follow-spc">
            <ul>
              <li v-for="item in fanslist" :key="item.value">
                <div class="follow-spc-content">
                  <img class="follow-spc-headphoto" :src="item.headphoto" :onerror="imgnull" />
                  <div class="follow-spc-info">
                    <span style="margin-right: 10px;font-size: 14px;color: #2d64b3;display: inline-block;width: 100px;cursor: pointer" @click="touserinfo(item.userid)">{{item.username}}</span>
                    <!--                        <span style="font-size: 12px;display:inline-block; width: 88px">粉丝：&nbsp;{{item.focusnum}}</span>-->
                    <!--                        <span style="font-size: 12px;display:inline-block;width: 88px">关注: &nbsp;{{item.fansnum}}</span>-->
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!--        粉丝-->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Header from '@/components/homePage/Header'
export default {
  name: 'Userinfo',
  components: {Header},
  data () {
    return {
      imageUrl: '',
      userinfo: '',
      opening: 'home',
      postlist: [], /* 发表的帖子列表 */
      collectlist: [],
      followlist: [],
      fanslist: [],
      imgnull: 'this.src="' + require('../assets/userinfo/0.jpg') + '"', // 但图片没有的时候显示的默认图片
      isfocus: ''
    }
  },
  methods: {
    /* 关注 */
    befans: function () {
      var mydate = new Date()
      var that = this
      axios.get('http://148.70.128.231:3000/userinfo/befans', {
        params: {
          followedid: this.$route.query.id,
          userid: this.$store.state.userid,
          followtime: this.formatDateTime(mydate)
        }
      }).then((res) => {
        that.isfocus = !that.isfocus
      })
    },
    /* 通过个人主页取消关注 */
    bepasser: function (focusid) {
      var that = this
      axios.get('http://148.70.128.231:3000/userinfo/bepasser', {
        params: {
          // followedid: this.$route.query.id,
          followedid: focusid,
          userid: this.$store.state.userid
        }
      }).then((res) => {
        that.isfocus = !that.isfocus
      })
    },
    /* 提升取消关注 */
    bepasser1: function (focusid, index) {
      this.$confirm('此操作将取消关注, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.get('http://148.70.128.231:3000/userinfo/bepasser', {
          params: {
            // followedid: this.$route.query.id,
            followedid: focusid,
            userid: this.$store.state.userid
          }
        }).then((res) => {
          this.$message({
            type: 'success',
            message: '取消关注成功!'
          })
          this.followlist.splice(index, 1)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    /* 获取用户的个人信息 */
    getuserinfo: function () {
      var that = this
      axios.get('http://148.70.128.231:3000/userinfo', {
        params: {
          id: this.$route.query.id
        }
      }).then((res) => {
        that.userinfo = res.data[0]
        console.log(that.userinfo)
      })
    },
    /* 获取用户发表过的帖子 */
    getpostlist: function () {
      var that = this
      axios.get('http://148.70.128.231:3000/userinfo/postlist', {
        params: {
          id: this.$route.query.id
        }
      }).then((res) => {
        that.postlist = res.data
        console.log(that.postlist)
      })
    },
    /* 获取收藏 */
    getcollect: function () {
      var that = this
      axios.get('http://148.70.128.231:3000/userinfo/getcollect', {
        params: {
          id: this.$route.query.id
        }
      }).then((res) => {
        that.collectlist = res.data
        console.log('collectlist')
        console.log(that.collectlist)
      })
    },
    /* 获取关注 */
    getfollow: function () {
      var that = this
      axios.get('http://148.70.128.231:3000/userinfo/follow', {
        params: {
          id: this.$route.query.id
        }
      }).then((res) => {
        that.followlist = res.data
        console.log(that.followlist)
      })
    },
    /* 获取粉丝 */
    getfans: function () {
      var that = this
      axios.get('http://148.70.128.231:3000/userinfo/fans', {
        params: {
          id: this.$route.query.id
        }
      }).then((res) => {
        that.fanslist = res.data
        console.log('ssssssssssssssqq')
        console.log(that.fanslist)
      })
    },
    /* 是关注还是已经关注 */
    isfollowed: function () {
      var that = this
      if (!this.$store.state.isLogin) {} else {
        axios.get('http://148.70.128.231:3000/userinfo/isfollow', {
          params: {
            followedid: this.$route.query.id,
            userid: this.$store.state.userid
          }
        }).then((res) => {
          if (res.data.length) {
            that.isfocus = false
          } else {
            that.isfocus = true
          }
          console.log(res.data.length)
        })
      }
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
    /* 跳转到用户信息 */
    touserinfo: function (userid) {
      // this.$router.push('/Userinfo')
      console.log(userid)
      let routeData = this.$router.resolve({
        name: 'Userinfo',
        query: {id: userid}
      })
      window.open(routeData.href, '_blank')
    }
  },
  mounted () {
    this.getuserinfo()
    this.getpostlist() /* 获取发帖 信息 */
    this.getcollect() /* 获取收藏人 */
    this.getfollow() /* 获取关注人 */
    this.getfans() /* 获取粉丝列表 */
    this.isfollowed()
  }
}
</script>

<style scoped>
  .nocontent{
    height: 350px;
    padding-bottom: 30px;
    background-color: white;
    -webkit-box-shadow: 0 1px 2px rgba(0,0,0,.2);
    box-shadow: 0 1px 2px rgba(0,0,0,.2);
    overflow: hidden;
    text-align: center;
    vertical-align: middle;
    line-height: 350px;
  }
  /*动画间隔*/
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
  /*间隔*/
  .infocontent-spc-content-left{
    width: 50%;
    display: inline-block;
    font-size: 16px;
  }
  .infocontent-spc-content-right{
    width: 50%;
    display: inline-block;
    vertical-align: top;
    font-size: 16px;
    margin: 12px 0;
  }
  .infocontent-spc-content-right a{
    display: inline-block;
    width: 49%;
    margin: 0 0 12px 0;
  }
  .username{
    position: relative;
    padding-left: 180px;
    bottom: 20px;
    font-size: 20px;
    color: #fff;
  }
  .username a{
    vertical-align: middle;
    display: inline-block;
  }
  .userinfo-option{
    width: 980px;
    height: 40px;
    margin: 0 auto;
    background-color: rgba(0,0,0,0.56);;
    position: absolute;
    bottom: 0;
    z-index: 1;
  }
  .userinfo-option ul{
    height: 100%;
    padding-left: 160px;
  }
  .userinfo-option ul li{
    position: relative;
    float: left;
  }
  .userinfo-option ul li a{
    display: block;
    cursor: pointer;
    line-height: 40px;
    padding: 0 24px;
    color: #fff;
    font-size: 14px;
  }
  .userinfo-option ul li a:hover{
    color: #409EFF;
  }
  .header-next{
    height: 245px;
    overflow: hidden;
  }
  .userinfo-bg{
    position: relative;
    width: 110%;
    height: 270px;
    margin: -15px;
    filter: blur(10px);
    overflow: hidden;
    background: url("../assets/userinfo/top-bg.jpg") no-repeat center center #f4f4f4;
    background-size:cover;
  }
  .content{
    position: absolute;
    left: 50%;
    top: 169px;
    transform: translate(-50%, -50%);    /* 50%为自身尺寸的一半 */
    width: 980px;
    background: url("../assets/userinfo/top-bg.jpg") no-repeat center center #f4f4f4;
    z-index: 0;
    height: 230px;
  }
  .headphoto{
    z-index: 999;
    position: relative;
    top: 36%;
    left: 3%;
    width: 128px;
    height: 174px;
    background-color:white ;
  }
  .headphoto-top{
    width: 120px;
    height: 120px;
    background-color: #F4F4F4;
    margin: auto;
  }
  .headphoto-bottom{
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    font-size: 12px;
    color: #949494;
    align-items: center;
    width: 100%;
    height: 31%;
  }
  .headphoto-bottom div{
    width: 50%;
    height: 66%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .infocontent{
    width: 100%;
    background-color: #F4F4F4;
    overflow: hidden;
    min-height: 435px;
  }
  .infocontent-spc{
    width: 980px;
    margin: 0 auto;
    height: 100%;
  }
  .post-spc{
    width: 980px;
    margin: 0 auto;
    height: 100%;
    padding-bottom: 100px;
  }
  .infocontent-spc-boder{
    width: 100%;
    height: 100%;
    background-color: white;
    margin-top: 53px;
    box-shadow: 0 1px 2px rgba(0,0,0,.2);
    overflow: hidden;
  }
  .post-spc-boder{
    width: 100%;
    margin-top: 53px;
    overflow: hidden;
  }
  .infocontent-spc-title{
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #eee;
    -webkit-box-shadow: 0 1px 2px rgba(0,0,0,.2);
    box-shadow: 0 1px 2px rgba(0,0,0,.2);
  }
  .post-spc-title{
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #eee;
    box-shadow: 0 1px 2px rgba(0,0,0,.2);
    border-radius: 3px;
    -webkit-border-radius: 3px;
  }
  .infocontent-spc-content{
    height: 200px;
    width: 780px;
    margin: 50px 100px;
    font-size: 0;
  }
  .post-spc-content{
  }
  .post-spc-content li{
    margin-top: 15px;
    height: 33px;
    background-color: white;
    box-shadow: 0 1px 2px rgba(0,0,0,.2);
    border-radius: 3px;
    -webkit-border-radius: 3px;
    padding: 25px 30px 50px;
    position: relative;
  }
  .post-spc-content-center{
    height: 100%;
  }
  .post-spc-content-footer{
    height: 35px;
    width: 100%;
    left: 0;
    position: absolute;
    bottom: 0;
    background-color: #f9f9f9;
  }
  .post-spc-content-footer-info{
    height: 25px;
    margin: 5px 30px;
  }
  .follow-spc li{
    margin-top: 15px;
    background-color: white;
    box-shadow: 0 1px 2px rgba(0,0,0,.2);
    border-radius: 3px;
    -webkit-border-radius: 3px;
    /*padding: 50px 30px;*/
    position: relative;
  }
  .follow-spc-content{
    height: 81px;
    padding: 20px 20px 0 20px;
  }
  .follow-spc-content:hover{
    background-color: #E9F2FC;
  }
  .follow-spc-headphoto{
    width: 50px;
    height: 50px;
    background-color: red;
    float: left;
  }
  .follow-spc-info{
    float: left;
    margin-left: 10px;
  }
</style>

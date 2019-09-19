<template>
  <div>
    <div class="header">
      <div class="logo"></div>
      <div class="search">
        <el-input
          style="width: 538px"
          placeholder="请输入内容"
          v-model="input"
          clearable>
        </el-input>
        <el-button type="primary" @click="search(input)">搜本站</el-button>
        <el-button type="info" @click="baidusearch(input)">搜全网</el-button>
      </div>
    </div>
  <div class="type-select">
    <ul>
      <li>文章</li>
<!--      <li>用户</li>-->
    </ul>
  </div>
    <div class="content-bg">
      <div class="content-result">
        <span style="display: block;font-size: 12px;color: #999;margin-bottom: 18px;">为您找到相关结果{{result.length}}个</span>
        <ul>
          <li v-for="(item) in result" :key="item.value">
            <h3 @click="topostspc(item.postid)" style="font-weight: normal;cursor:pointer;font-size: 16px;margin-bottom: 3px;font-family: Arial,SimSun,sans-serif;font-size: 16px;color: #0000cc;text-decoration: underline;">
            {{item.posttitle}}
            </h3>
            <div class="content-spc" v-html="item.postcontent">
            </div>
            <span style="font-family: Arial,SimSun,sans-serif;font-size: 13px;color: #2a8055;">发帖时间:{{formatDateTime(new Date(item.posttime))}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Searchpage',
  data () {
    return {
      input: '',
      result: '' /* 搜索结果 */
    }
  },
  methods: {
    /* 关键词搜索 */
    search (wd) {
      var that = this
      axios.get('http://148.70.128.231:3000/post/search', {
        params: {
          wd: wd
        }
      }).then((res) => {
        that.result = res.data
      })
    },
    /* 全网搜索 */
    baidusearch (wd) {
      let url = 'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=2&ch=&tn=baiduhome_pg&bar=&wd=' + wd
      window.open(url, '_blank')
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
  mounted () {
    console.log(this.$route.query.wd)
    this.search(this.$route.query.wd)
  }
}
</script>

<style scoped>
.header{
  margin-bottom: 13px;
  padding-left: 20px;
  width: 1005px;
  overflow: hidden;
}
.logo {
  height: 50px;
  width: 160px;
  float: left;
  margin: 28px 18px 0 12px;
  overflow: hidden;
  display: inline;
  float: left;
}
.search{
  float: left;
  margin-top: 38px;
}
.type-select{
  width: 100%;
  background-color: #f7f7f7;
  height: 40px;
  padding-left: 209px;
}
.type-select li{
border-bottom: 2px solid #46a3ff;
line-height: 40px;
font-weight: bold;
height: 38px;
float: left;
margin-right: 15px;
margin-left: 5px;
padding-left: 10px;
padding-right: 10px;
}
.content-bg{
  margin-top: 10px;
  width: 100%;
  min-height: 500px;
  padding-left: 209px;
}
.content-result{
  width: 540px;
  min-height: 500px;
}
.content-result li{
  width: 100%;
  height: 101.4px;
  padding-bottom: 15px;
}
.content-spc{
  width: 100%;
  height: 80px;
  overflow: hidden;
  font-family: Arial,SimSun,sans-serif;
  font-size: 13px;
  color: #000000;
  margin: 0px 0;
}
</style>

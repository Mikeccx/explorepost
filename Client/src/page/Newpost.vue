<template>
    <div>
      <Header></Header>
      <div class="navtab-bg">
        <div class="navtab-center">
          <div class="navtab-center-left">
            <div class="navtab-center-left-title">{{this.$store.state.subject}}</div>
          </div>
          <div class="navtab-center-right">
            <div class="navtab-center-right-in">
              <p>主题</p>
              <p>{{this.$store.state.post.length}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="post-display">
        <h3><span>发表帖子</span></h3>
        <div class="post-display-info">
          <template>
            <el-select v-model="value" placeholder="请选择">
              <el-option-group
                v-for="group in options"
                :key="group.label"
                :label="group.label">
                <el-option
                  v-for="item in group.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-option-group>
            </el-select>
          </template>
            <el-input v-model="input" placeholder="标题严禁使用【】等异形符号，违者删帖" style="width: 430px;"></el-input>
        </div>
        <div style="position: relative;z-index: 1;">
        <div id="div1" class="options"></div>
        <div id="div2" class="text"></div>
        </div>
        <el-button type="primary" style="margin: 10px 0 10px 0" @click="postnew">发送</el-button>
      </div>
    </div>
</template>

<script>
import Header from '@/components/homePage/Header'
import E from 'wangeditor' /* 引入编辑器组件 */
import axios from 'axios'
export default {
  name: 'Newpost',
  components: {Header},
  data () {
    return {
      options: [{
        label: '旅行天下',
        options: [{value: '户外大厅', label: '户外大厅'}, {value: '商业活动|线路', label: '商业活动|线路'}, {value: 'AA相约', label: 'AA相约'}, {value: '游记攻略', label: '游记攻略'
        }, {value: '我秀我户外', label: '我秀我户外'}, {value: '走出国门', label: '走出国门'}, {value: '户外资料', label: '户外资料'}, {
          value: '装备天下', label: '装备天下'}, {value: '户外摄影', label: '户外摄影'}]},
      {
        label: '户外运动',
        options: [{value: '山伍成群', label: '山伍成群'}, {value: '攀岩|探洞|绳降', label: '攀岩|探洞|绳降'}, {value: '骑行天下', label: '骑行天下'
        }, {value: '钓鱼|水上', label: '钓鱼|水上'}, {value: '滑雪', label: '滑雪'}, {value: '自驾|摩托车', label: '自驾|摩托车'
        }, {value: '跑步|越野跑', label: '跑步|越野跑'
        }, {value: '公益爱心', label: '公益爱心'
        }, {value: '冬泳', label: '冬泳'}]},
      {
        label: '地方板块',
        options: [{value: '安徽', label: '安徽'}, {value: '北京', label: '北京'}, {value: '重庆', label: '重庆'
        }, {value: '福建', label: '福建'}, {value: '甘肃', label: '甘肃'}, {value: '广东', label: '广东'}, {value: '广西',
          label: '广西'}, {value: '贵州', label: '贵州'}, {value: '海南', label: '海南'}, {value: '河北', label: '河北'
        }, {value: '湖北', label: '湖北'}, {value: '湖南', label: '湖南'}, {value: '黑龙江', label: '黑龙江'
        }, {value: '吉林', label: '吉林'}, {value: '江苏', label: '江苏'
        }, {value: '江西', label: '江西'}, {value: '辽宁', label: '辽宁'}, {value: '内蒙古', label: '内蒙古'
        }, {value: '宁夏', label: '宁夏'
        }, {value: '青海', label: '青海'
        }, {value: '山东', label: '山东'
        }, {value: '山西', label: '山西'
        }, {value: '陕西', label: '陕西'
        }, {value: '上海', label: '上海'
        }, {value: '四川', label: '四川'
        }, {value: '天津', label: '天津'
        }, {value: '新疆', label: '新疆'
        }, {value: '云南', label: '云南'
        }, {value: '浙江', label: '浙江'
        }]
      }],
      value: '',
      input: ''
    }
  },
  mounted () {
    this.editor = new E('#div1', '#div2')
    this.editor.customConfig.uploadImgShowBase64 = true // 使用 base64 保存图片
    // this.editor.customConfig.uploadImgServer = '/upload' // 上传图片到服务器
    this.editor.create()
  },
  methods: {
    /* 提交发表新帖 */
    postnew: function () {
      var mydate = new Date()
      var postform = {
        postsubject: this.value,
        posttitle: this.input,
        postcontent: this.editor.txt.html(),
        posttime: this.formatDateTime(mydate),
        postauthorid: this.$store.state.userid
      }
      axios.post('http://148.70.128.231:3000/post/postnew', postform
      ).then((res) => {
        console.log('发帖之后')
        console.log(res.data)
        this.$message({
          message: '发表成功',
          type: 'success'
        })
        this.$router.push('/')
      })
    },
    /* 格式化时间日期 */
    formatDateTime: function (date) {
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? ('0' + m) : m
      var d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      var h = date.getHours()
      var minute = date.getMinutes()
      minute = minute < 10 ? ('0' + minute) : minute
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute
    }
  }
}
</script>

<style scoped>
  .options{
    width: 980px;
    margin: auto;
    margin-top: 10px;
    background-color: #f1f1f1;
  }
  .text{
    height: 400px;
    width: 980px;
    margin: auto;
    border: #f1f1f1 1px solid;
  }
  .navtab-bg{
    width: 100%;
    height: 88px;
    background-color: #fbfbfb;
    display: flex;
    margin: auto;
    border-bottom: 1px solid #ebebeb
  }
  .navtab-center{
    width: 980px;
    margin: auto;
    display: flex;
    justify-content:space-between;
  }
  .navtab-center-left{
    display: flex;
    height: 62px;
    margin: 0;
    padding:0;
    align-items: center;
  }
  .navtab-center-left-title{
    width: 180px;
    color: #585858;
    font-size: 18px;
  }
  .navtab-center-right{
    display: flex;
    flex-direction: column;
    height: 62px;
    border-right: 1px solid #d8d8d8;
  }
  .navtab-center-right-in{
    margin-right: 8px;
  }
  .navtab-center-right p{
    height: 31px;
    padding: 0;
    margin:0 auto;
    text-align:center;
    display: flex;
    align-items: center;
    font-size: 12px;
    justify-content: flex-end;
  }
  .post-display{
    width: 980px;
    margin: auto;
    margin-top:10px;
  }
  .post-display-info{
    height: 58px;
    position: relative;
    z-index: 999;
  }
</style>

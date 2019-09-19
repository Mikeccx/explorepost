<template>
   <div class="announce-bg">
     <div class="announce-now">
       <h3>当前公告</h3>
       <div style="margin-top: 10px;height: 158px;text-align: left;font-size: 16px;overflow: auto">
<!--         {{content}}-->
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{content}}

       </div>
       <span style="float: right;font-size: 12px">发送时间：&nbsp;{{formatDateTime(new Date(announcetime))}}</span>
     </div>
       <h3 style="padding-top: 20px">发送公告</h3>
     <el-input
       style="width: 80%"
       type="textarea"
       :autosize="{ minRows: 4, maxRows: 4}"
       placeholder="请输入站内通告"
       v-model="textarea">
     </el-input>
     <el-button type="primary" style="width: 50%;margin-top: 30px" @click="sendannounce">发送</el-button>
   </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'announce',
  data () {
    return {
      textarea: '',
      content: '',
      announcetime: ''
    }
  },
  mounted () {
    this.getannounce()
  },
  computed: {
  },
  methods: {
    // 发送公告
    sendannounce: function () {
      var mydate = new Date()
      let announceform = {
        content: this.textarea,
        announcetime: this.formatDateTime(mydate)
      }
      console.log(announceform)
      axios.post('http://148.70.128.231:3000/innermessage/announce', announceform
      ).then((res) => {
        this.content = announceform.content
        this.announcetime = announceform.announcetime
        this.textarea = ''
        this.$message({
          message: '发送成功',
          type: 'success'
        })
      })
    },
    // 获取公告信息
    getannounce: function () {
      axios.get('http://148.70.128.231:3000/innermessage/announce', {
      }).then((res) => {
        this.content = res.data[0].content
        this.announcetime = res.data[0].announcetime
        console.log(this.content)
      })
    }
  }
}
</script>

<style scoped>
.announce-bg{
  height: 100%;
  background-color: #fff;
  margin-top: -20px;
}
.announce-now {
  margin-top: 20px;
  min-height: 200px;
  padding: 30px 122px;
  background-color: #fff;
  border: 1px solid #CCCCCC;
}
</style>

<template>
 <div class="send-border">
   <i class="el-icon-back" style="float: left;margin:10px 0 0 15px;cursor: pointer;font-size: 20px" @click="back"></i>
    <div class="send-content">
      <span>发件人：</span>
      <el-input
        placeholder="系统管理员"
        :disabled="true"
        style="width: 75%"
      >
      </el-input>
      <div style="margin-top: 20px">
      <span>收件人：</span>
      <el-input
        placeholder="cx"
        :disabled="true"
        style="width: 75%"
      >
      </el-input>
      </div>
      <div style="margin-top: 20px">
        <span style="margin-left: 13px;">标题：</span>
        <el-input
          v-model="input"
          style="width: 75%"
        >
        </el-input>
      </div>
<!--      输入框-->
      <div id="div1" class="options"></div>
      <div id="div2" class="text">
      </div>
<!--      输入框-->
      <el-button type="primary" style="margin-top: 20px;width: 50%" @click="sendms">发送</el-button>
    </div>
 </div>
</template>

<script>
import E from 'wangeditor'
import axios from 'axios'
export default {
  name: 'sendmessage',
  data () {
    return {
      input: ''
    }
  },
  mounted () {
    this.editor = new E('#div1', '#div2')
    this.editor.create()
  },
  methods: {
    /* 发送 */
    sendms: function () {
      var mydate = new Date()
      var that = this
      let innermessage = {
        userid: this.$route.params.id,
        mailtitle: this.input,
        content: this.editor.txt.html(),
        sendtime: this.formatDateTime(mydate)
      }
      axios.post('http://148.70.128.231:3000/innermessage', innermessage
      ).then((res) => {
        console.log(res.data)
        this.$message({
          message: '发送成功',
          type: 'success'
        })
        that.$router.go(-1)
      })
    },
    /* 返回 上一层 */
    back: function () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.send-border{
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.send-content{
  padding: 30px 30px;
  height: 88%;
}
.options{
  width: 980px;
  margin: auto;
  margin-top: 10px;
  background-color: #f1f1f1;
}
.text{
  height: 250px;
  width: 980px;
  margin: auto;
  border: #f1f1f1 1px solid;
  text-align: left;
}
</style>

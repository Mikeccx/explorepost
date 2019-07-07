<template>
  <div>
    <Header></Header>
    <div class="innermessage-border">
      <div class="innermessage-top">
        <span style="margin-left: 27px;font-size: 16px;color: #000000;line-height: 54px;height: 54px;float: left;">通知</span>
      </div>
      <div class="innermessage-content">
        <div><el-table
          :data="innermessagelist"
          style="width: 100%">
          <el-table-column
            label="发送时间"
            prop="sendtime"
            :formatter="formattime"
          >
          </el-table-column>
          <el-table-column
            label="发件人"
          >系统管理员
          </el-table-column>
          <el-table-column
            label="题目"
            prop="mailtitle"
          >
          </el-table-column>
          <el-table-column
            align="right">
<!--            <template slot="header" slot-scope="scope">-->
<!--              <el-input-->
<!--                v-model="search"-->
<!--                size="mini"-->
<!--                placeholder="输入关键字搜索"/>-->
<!--            </template>-->
            <template slot-scope="scope">
<!--             红点-->
              <el-badge is-dot class="item" v-show="innermessagelist[scope.$index].isread === 0">
              <el-button
                size="mini"
                @click="scanspc(scope.$index, scope.row)">查看</el-button>
              </el-badge>
<!--              红点-->
              <el-button
                v-show="innermessagelist[scope.$index].isread === 1"
                         size="mini"
                         prop="isread"
                         @click="scanspc(scope.$index, scope.row)">查看</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="deletetip(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table></div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/homePage/Header'
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Innermessage',
  components: {Header},
  data () {
    return {
      innermessagelist: []
    }
  },
  computed: {
    ...mapState
  },
  methods: {
    ...mapMutations(['Changeisread']),
    /* 查看内容 */
    scanspc: function (index, index1) {
      var that = this
      /* 弹出框查看消息 */
      this.$alert(this.innermessagelist[index].content, '内容', {
        dangerouslyUseHTMLString: true
      })
      axios.get('http://148.70.128.231:3000/innermessage/read', {
        params: {
          innermailid: this.innermessagelist[index].innermailid
        }
      }).then((res) => {
        that.innermessagelist[index].isread = 1
        that.Changeisread(true)
        for (let i = 0; i < that.innermessagelist.length; i++) {
          if (that.innermessagelist[i] === 0) {
            that.Changeisread(false)
          }
        }
      })
    },
    /* 删除一行 */
    handleDelete (index, row) {
      this.innermessagelist.splice(index, 1)// 删掉该行
    },
    /* 彻底删除站内信 */
    deletetmessage: function (index) {
      let innermailid = this.innermessagelist[index].innermailid
      console.log(innermailid)
      axios.get('http://148.70.128.231:3000/innermessage/delete', {
        params: {
          innermailid: innermailid
        }
      }).then((res) => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    },
    /* 删除提示语 */
    deletetip (index, row) {
      // var that = this
      this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deletetmessage(index)
        this.handleDelete(index, row)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 获取站内信列表
    getmessagelist: function () {
      var that = this
      axios.get('http://148.70.128.231:3000/innermessage', {
        params: {
          userid: this.$route.query.id
        }
      }).then((res) => {
        that.innermessagelist = res.data
        console.log(that.innermessagelist)
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
    },
    formattime: function (row, column) {
      return this.formatDateTime(new Date(row.sendtime))
    }
  },
  mounted () {
    this.getmessagelist()
    console.log(this.innermessagelist)
  }
}
</script>

<style scoped>
.innermessage-border{
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.075);
  width: 980px;
  min-height: 500px;
  margin: auto;
  margin-top: 30px;
  padding-bottom: 30px;
}
.innermessage-top{
  border-bottom: 1px solid #eee;
  height: 54px;
}
.innermessage-content{
   min-height: 500px;
}
.innermessage-content-spc{
  height: 24px;
  border-bottom: 1px solid #e3e6eb;
  font-weight: normal;
}
</style>

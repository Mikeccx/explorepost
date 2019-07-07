<template>
   <div><el-table
     :data="postinfo.filter(data => !search || data.posttitle.toLowerCase().includes(search.toLowerCase()))"
     style="width: 100%">
     <el-table-column
       label="发帖时间"
       prop="posttime"
       :formatter="formattime"
     >
     </el-table-column>
     <el-table-column
       label="帖子主题"
       prop="postsubject">
     </el-table-column>
     <el-table-column
       label="帖子题目"
       prop="posttitle">
     </el-table-column>
     <el-table-column
       label="作者"
       prop="postauthor">
     </el-table-column>
     <el-table-column
       label="回复数"
       prop="replynum">
     </el-table-column>
     <el-table-column
       label="点击数"
       prop="clicknum">
     </el-table-column>
     <el-table-column
       align="right">
       <template slot="header" slot-scope="scope">
         <el-input
           v-model="search"
           size="mini"
           placeholder="输入关键字搜索"/>
       </template>
       <template slot-scope="scope">
<!--         <el-button-->
<!--           size="mini"-->
<!--           @click="handleEdit(scope.$index, scope.row)">编辑帖子</el-button>-->
         <el-button
           size="mini"
           type="danger"
           @click="deletetip(scope.$index, scope.row)">删  除</el-button>
       </template>
     </el-table-column>
   </el-table></div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'postadmin',
  data () {
    return {
      postinfo: [],
      search: ''
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      this.postinfo.splice(index, 1)// 删掉该行
      console.log(index)
    },
    /* 获取帖子信息 */
    getpostinfo: function () {
      var that = this
      axios.get('http://148.70.128.231:3000/admin/postinfo', {
        params: {
        }
      }).then((res) => {
        that.postinfo = res.data
        console.log(that.postinfo)
      })
    },
    formattime: function (row, column) {
      return this.formatDateTime(new Date(row.posttime))
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
    /* 删除帖子通过改变poststate临时删除记录仍然保存在记录中未彻底删除 */
    deletetpost: function (index) {
      let postid = this.postinfo[index].postid
      console.log(postid)
      axios.get('http://148.70.128.231:3000/admin/deletepost', {
        params: {
          postid: postid
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
      this.$confirm('此操作将删除该帖子, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deletetpost(index)
        this.handleDelete(index, row)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  mounted () {
    this.getpostinfo()
  }
}
</script>

<style scoped>

</style>

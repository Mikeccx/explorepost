<template>
  <div>
    <el-table
      :data="userinfo.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase())) || data.id"
    style="width: 100%;">
    <el-table-column
      label="注册时间"
      prop="registertime"
      :formatter="formattime"
    >
    </el-table-column>
      <el-table-column
        label="id"
        prop="userid">
      </el-table-column>
      <el-table-column
        label="用户名"
        prop="username">
      </el-table-column>
      <el-table-column
        label="性别"
        prop="gender">
      </el-table-column>
      <el-table-column
        label="邮箱"
        prop="useremail">
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
<!--         跳转到发送站内信-->
        <router-link :to="{name:'sendmessage', params:{id: userinfo[scope.$index].userid}}">
        <el-button
          size="mini"
          icon="el-icon-message"
          @click="handleEdit(scope.$index, scope.row)"></el-button>
        </router-link>
<!--        重置密码-->
        <el-tooltip  effect="dark" content="重置用户密码" placement="top-start">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">重 置</el-button>
        </el-tooltip>
<!--        重置密码-->
        <el-button
          size="mini"
          type="danger"
          @click="deletetip(scope.$index, scope.row)">删 除</el-button>
      </template>
    </el-table-column>
  </el-table>
    <el-dialog title="重置密码" :visible.sync="dialogFormVisible" width="500px">
      <el-form :model="form">
        <el-form-item label="新密码" :label-width="formLabelWidth">
          <el-input v-model="form.newpassword" autocomplete="off" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="resetpassword">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import md5 from 'js-md5' // 引入md5 远程js 进行md5 加密
export default {
  name: 'useradmin',
  data () {
    return {
      search: '',
      userinfo: [],
      dialogTableVisible: false, /* 是否显示弹出框 */
      dialogFormVisible: false, /* 表单是否显示 */
      formLabelWidth: '80px', /* 重置密码框长度 */
      form: {
        newpassword: '',
        userid: ''
      }
    }
  },
  methods: {
    handleEdit (index, row) {
      this.dialogFormVisible = true
      this.form.userid = this.userinfo[index].userid
      console.log(this.userinfo[index].userid)
    },
    resetpassword () {
      var that = this
      let form = {
        password: md5(this.form.newpassword),
        userid: this.form.userid
      }
      console.log(form)
      if (!form.password) {
        this.$message({
          type: 'info',
          message: '密码不能为空'
        })
      } else {
        axios.post('http://148.70.128.231:3000/userinfo/alterpw', form)
          .then(function (response) {
            that.dialogFormVisible = false
            that.$message({
              type: 'success',
              message: '修改成功!'
            })
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    handleDelete (index, row) {
      this.userinfo.splice(index, 1)// 删掉该行
    },
    /* 获取用户的个人信息 */
    getuserinfo: function () {
      var that = this
      axios.get('http://148.70.128.231:3000/admin', {
        params: {
        }
      }).then((res) => {
        that.userinfo = res.data
      })
    },
    formattime: function (row, column) {
      return this.formatDateTime(new Date(row.registertime))
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
    /* 删除用户通过改变userstate临时删除记录仍然保存在记录中未彻底删除 */
    deletetuser: function (index) {
      let userid = this.userinfo[index].userid
      console.log(userid)
      axios.get('http://148.70.128.231:3000/admin/deleteuser', {
        params: {
          userid: userid
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
        this.deletetuser(index)
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
    this.getuserinfo()
  }
}
</script>

<style scoped>

</style>

<template>
  <div>
    <Header></Header>
  <div class="editor-border">
      <div class="editor-border-userinfo">
        <div class="editor-border-userinfo-title">个人信息</div>
        <div class="editor-border-userinfo-content">
          <div class="editor-border-userinfo-content-left">
            <div style="vertical-align: top"><span>用户名：</span> <span>cx</span></div>
            <div style="margin:10px 0 0 16px">
              <span >性别：</span>
              <el-radio v-model="gender" label="男">男</el-radio>
              <el-radio v-model="gender" label="女">女</el-radio></div>
          </div>
          <div class="editor-border-userinfo-content-right">
            <el-upload
              class="avatar-uploader"
              :data="uploadData"
              action="http://148.70.128.231:3000/userinfo/headphoto"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </div>
      </div>
      <div class="editor-border-safe">
        <div class="editor-border-userinfo-title">账户安全</div>
        <span style="line-height: 88px;margin-left: 30px">登录密码：*******</span>
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="原密码" :label-width="formLabelWidth">
              <el-input v-model="form.oldpassword" autocomplete="off" show-password></el-input>
            </el-form-item>
            <el-form-item label="新密码" :label-width="formLabelWidth">
              <el-input v-model="form.newpassword" autocomplete="off" show-password></el-input>
            </el-form-item>
            <el-form-item label="再次输入" :label-width="formLabelWidth">
              <el-input v-model="form.repeatpassword" autocomplete="off" show-password></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="modify">确 定</el-button>
          </div>
        </el-dialog>
        <span style="margin-left: 20px;color: #409EFF;cursor: pointer" @click="dialogFormVisible = true">修改</span>
      </div>
      <div class="editor-border-footer"><el-button type="primary" size="small" style="margin-left: 30px;" @click="saveinfo">保存</el-button></div>
  </div>
  </div>
</template>

<script>
import Header from '@/components/homePage/Header'
import axios from 'axios'
import md5 from 'js-md5' // 引入md5 远程js 进行md5 加密
export default {
  name: 'editorpersoninfo',
  components: {Header},
  data () {
    return {
      uploadData: {
        id: this.$store.state.userid
      },
      imageUrl: '', // 头像
      gender: '男', // 性别
      dialogTableVisible: false, /* 是否显示弹出框 */
      dialogFormVisible: false, /* 表单是否显示 */
      formLabelWidth: '120px',
      form: {
        oldpassword: '',
        newpassword: '',
        repeatpassword: ''
      },
      userpw: ''
    }
  },
  methods: {
    // 头像上传
    handleAvatarSuccess (res, file) {
      console.log(res)
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 头像上传
    // 修改密码
    modify: function () {
      var that = this
      let form = {
        userid: this.$route.query.id,
        password: md5(this.form.newpassword)
      }
      console.log('原密码')
      console.log(this.userpw)
      console.log(this.form.oldpassword)
      if (this.userpw[0].password !== md5(this.form.oldpassword)) {
        this.$message({
          type: 'wrong',
          message: '原密码错误!'
        })
      } else if (this.form.newpassword !== this.form.repeatpassword) {
        this.$message({
          type: 'wrong',
          message: '两次输入不对'
        })
      } else {
        axios.post('http://148.70.128.231:3000/userinfo/alterpw', form)
          .then(function (response) {
            console.log(response.data)
            that.dialogFormVisible = false
            that.$message({
              type: 'success',
              message: '保存成功'
            })
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    /* 获取用户信息 */
    getuserpw: function () {
      var that = this
      axios.get('http://148.70.128.231:3000/userinfo/getuserpw', {
        params: {
          userid: this.$route.query.id
        }
      }).then((res) => {
        console.log('ssss11111213')
        console.log(res.data[0])
        that.userpw = res.data
        console.log(that.userpw[0].headphoto)
        that.imageUrl = that.userpw[0].headphoto
      })
    },
    /* 保存用户信息 */
    saveinfo: function () {
      var that = this
      axios.get('http://148.70.128.231:3000/userinfo/changegender', {
        params: {
          userid: this.$route.query.id,
          gender: this.gender
        }
      }).then((res) => {
        that.$message({
          type: 'success',
          message: '修改成功!'
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '删除失败'
          })
        })
      })
    }
  },
  mounted () {
    this.getuserpw()
  }
}
</script>

<style scoped>
  .avatar-uploader{
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin: 30px 0 0 216px;
    display: block;
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar {
    width: 80px;
    height: 80px;
    margin-bottom: -5px;
    display: block;
  }
  /*头像隔离*/
  /*.avatar-uploader{*/
  /*  border: 1px dashed #d9d9d9;*/
  /*  border-radius: 6px;*/
  /*  cursor: pointer;*/
  /*  position: relative;*/
  /*  width: 80px;*/
  /*  height: 80px;*/
  /*  overflow: hidden;*/
  /*  margin: 30px 0 0 200px;*/
  /*}*/
  /*.el-upload{*/
  /*  border: 1px dashed #d9d9d9;*/
  /*  border-radius: 6px;*/
  /*  cursor: pointer;*/
  /*  position: relative;*/
  /*  width: 80px;*/
  /*  height: 80px;*/
  /*  overflow: hidden;*/
  /*}*/
  /*.avatar-uploader:hover{*/
  /*  border-color: #409EFF;*/
  /*}*/
  /*.avatar-uploader-icon {*/
  /*  font-size: 28px;*/
  /*  color: #8c939d;*/
  /*  width: 80px;*/
  /*  height: 80px;*/
  /*  line-height: 80px;*/
  /*  text-align: center;*/
  /*}*/
  /*隔离*/
.editor-border{
   width: 980px;
   min-height: 580px;
  margin: auto;
  margin-top: 20px;
  background-color: #ddd;
  border-radius: 6px;
  padding-top: 20px;
  padding-bottom: 5px;
}
.editor-border-userinfo{
  width: 80%;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 1px 0 rgba(0,0,0,0.075);
  margin: auto;
}
.editor-border-userinfo-title{
  border-bottom: 1px solid #eee;
  padding: 16px 0;
  padding-left: 15px;
}
.editor-border-safe{
  width: 80%;
  height: 150px;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 1px 0 rgba(0,0,0,0.075);
  margin: auto;
  margin-top: 10px;
}
.editor-border-footer{
  width: 80%;
  height: 60px;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 1px 0 rgba(0,0,0,0.075);
  margin: auto;
  margin-top: 10px;
  line-height: 60px
}
.editor-border-userinfo-content{
   height: 246px;
  padding: 10px 20px 0px;
}
.editor-border-userinfo-content-left{
  display: inline-block;
  width: 50%;
  height: 70%;
  vertical-align: top;
  margin: 50px 0 0 30px;
}
.editor-border-userinfo-content-right{
  display: inline-block;
  width: 40%;
  height: 70%;
}
.editor-border-safe{
}
</style>

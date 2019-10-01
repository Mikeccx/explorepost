export default { // 提交方法
  Login (state) { // 改变登录状态
    state.isLogin = true
  },
  Quit (state) { // 退出
    state.isLogin = false
  },
  Userinfo (state, username) {
    state.username = username
  },
  Userid (state, userid) { // 存入用户数据
    state.userid = userid
  },
  Headphoto (state, headphoto) {
    state.headphoto = headphoto
  },
  Changesubject (state, subject) { // 改变模块
    state.subject = subject
  },
  Getpost (state, post) { // 更改暂存帖子目录
    state.post = post
  },
  Changeisread (state, isread) {
    // 更改已读状态
    state.isread = isread
  }
}

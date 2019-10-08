# explorepost
this is a form bulid  based on vue and express 
by this project, i got too much.
# 前言<br>
此项目是我的毕业设计，设计选型最初有很多考虑，最初在三大前端框架中抉择，最终选择了易上手渐进式的vue框架，被其组件化开发吸引，对于传统开发效率确实提升很大，vue全家桶基本都应用了除了vue-source，因为官方推荐使用封装好的axios。对于后端，因为想要了解nodejs后端如何使用于是选择了文档较全，教程较多使用简单的express框架，采用前后端分离，跨域问题，通过配置后端cors解决。
# 目录<br>
```
Client 客户端
├── build/               # Webpack 配置目录
├── config/              # config 生产环境的配置
├── dist/                # webpack打包后的文件
├── src/                 # 源码目录（开发都在这里进行）
│   ├── api              # 封装的api文件
│   ├── assets/          # 放置需要经由 Webpack 处理的静态文件(icon、jpg)
│   ├── components/      # 一些页面组件
│   ├── js/              # 公共js方法通过vue.prototype注入
│   ├── page/            # 各个页面
│   ├── router/          # 路由信息
│   ├── store/           # vuex
│   ├── App.vue          # 启动文件
│   ├── main.js          # 根文件配置
├── static/              # 放置无需经由 Webpack 处理的静态文件
├── .babelrc             # Babel 转码配置
├── .eslintignore        # （配置）ESLint 检查中需忽略的文件（夹）
├── .eslintrc            # ESLint 配置
├── .gitignore           # （配置）需被 Git 忽略的文件（夹）
├── .postcssrc           # css预处理器
├── .README              # 介绍信息
├── .index.html          # 根页面 可以进行cdn引入配置网页title、图标
├── package.json         # 版本信息

Server 服务端
├── idea/               # 编辑器信息
├── bin/                # 服务端配置
│   ├── www/            # 编辑服务端基本信息(监听端口，协议)
├── node_modules/       # 依赖
├── public/             # 静态资源(图片)
├── routes/             # 接口api
│   ├── admin/          # 管理员相关接口
│   ├── db/             # 链接数据库测试
│   ├── forpassword/    # 忘记密码
│   ├── index/          # 测试
│   ├── innermessage/   # 站内信
│   ├── post/           # 帖子相关(发表、删除)
│   ├── registrastion/  # 注册
│   ├── userinfo/       # 修改获取用户信息
│   ├── usersubmit/     # 用户登录
├── view/               # 前端页面测试
├── app.js              # 服务端主配置入口文件
├── package.json        # 版本信息
```

# 效果展示<br>
[链接](http://148.70.128.231:8080/dist/#)<br>
# 使用方法<br>
git clone "地址"
```
在client中命令行 
npm install 安装相关依赖 
npm run dev 加载项目

在Server中命令行 
npm install 安装相关依赖 
npm run dev 加载项目 

```

# 结语
此项目当前存在一些功能未完善和一些未知的bug，欢迎有人提出宝贵的意见。如果能帮到一些初次搭建前后端分离的朋友带来一些帮助，我是也是很开心的。
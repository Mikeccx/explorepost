import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/page/Homepage'
import Loginpage from '@/page/Loginpage'
import Userinfo from '@/page/Userinfo'
import Postspc from '@/page/Postspc'
import Newpost from '@/page/Newpost'
import Admin from '@/page/Admin'
import Adminloginpage from '@/page/Adminloginpage'
import Innermessage from '@/page/Innermessage'
import editorpersoninfo from '@/page/editorpersoninfo'
import Searchpage from '@/page/Searchpage'
// 管理系统子路由
import useradmin from '@/page/admin/useradmin'
import postadmin from '@/page/admin/postadmin'
import sendmessage from '@/page/admin/sendmessage'
import announce from '@/page/admin/announce'
// 管理系统子路由
Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/Loginpage',
      name: 'Loginpage',
      component: Loginpage
    },
    {
      path: '/Userinfo',
      name: 'Userinfo',
      component: Userinfo
    },
    {
      path: '/Postspc',
      name: 'Postspc',
      component: Postspc
    },
    {
      path: '/Newpost',
      name: 'Newpost',
      component: Newpost
    },
    {
      path: '/Searchpage',
      name: 'Searchpage',
      component: Searchpage
    },
    {
      path: '/Admin',
      name: 'Admin',
      component: Admin,
      redirect: '/admin/useradmin',
      meta: {
        title: 'explore管理系统'
      },
      children: [
        {
          path: '/admin/useradmin',
          name: 'useradmin',
          component: useradmin
        },
        {
          path: '/admin/postadmin',
          name: 'postadmin',
          component: postadmin
        },
        {
          path: '/admin/sendmessage',
          name: 'sendmessage',
          component: sendmessage
        },
        {
          path: '/admin/announce',
          name: 'announce',
          component: announce
        }
      ]
    },
    {
      path: '/Adminloginpage',
      name: 'Adminloginpage',
      component: Adminloginpage
    },
    {
      path: '/Innermessage',
      name: 'Innermessage',
      component: Innermessage
    },
    {
      path: '/editorpersoninfo',
      name: 'editorpersoninfo',
      component: editorpersoninfo
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
// 管理系统子路由
Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Homepage',
      // component: () => import('@/page/Homepage')
      component: resolve => require.ensure([], () => resolve(require('@/page/Homepage')), 'demo')
    },
    {
      path: '/Loginpage',
      name: 'Loginpage',
      // component: () => import('@/page/Loginpage')
      component: resolve => require.ensure([], () => resolve(require('@/page/Loginpage')), 'demo')

    },
    {
      path: '/Userinfo',
      name: 'Userinfo',
      // component: () => import('@/page/Userinfo')
      component: resolve => require.ensure([], () => resolve(require('@/page/Userinfo')), 'demo')

    },
    {
      path: '/Postspc',
      name: 'Postspc',
      // component: () => import('@/page/Postspc')
      component: resolve => require.ensure([], () => resolve(require('@/page/Postspc')), 'demo')
    },
    {
      path: '/Newpost',
      name: 'Newpost',
      // component: () => import('@/page/Newpost')
      component: resolve => require.ensure([], () => resolve(require('@/page/Newpost')), 'demo')
    },
    {
      path: '/Searchpage',
      name: 'Searchpage',
      // component: () => import('@/page/Searchpage')
      component: resolve => require.ensure([], () => resolve(require('@/page/Searchpage')), 'demo')
    },
    {
      path: '/Admin',
      name: 'Admin',
      // component: () => import('@/page/Admin'),
      component: resolve => require.ensure([], () => resolve(require('@/page/Admin')), 'demo'),
      redirect: '/admin/useradmin',
      meta: {
        title: 'explore管理系统'
      },
      children: [
        {
          path: '/admin/useradmin',
          name: 'useradmin',
          // component: () => import('@/page/admin/useradmin')
          component: resolve => require.ensure([], () => resolve(require('@/page/admin/useradmin')), 'demo')
        },
        {
          path: '/admin/postadmin',
          name: 'postadmin',
          // component: () => import('@/page/admin/postadmin')
          component: resolve => require.ensure([], () => resolve(require('@/page/admin/postadmin')), 'demo')
        },
        {
          path: '/admin/sendmessage',
          name: 'sendmessage',
          // component: () => import('@/page/admin/sendmessage')
          component: resolve => require.ensure([], () => resolve(require('@/page/admin/sendmessage')), 'demo')
        },
        {
          path: '/admin/announce',
          name: 'announce',
          // component: () => import('@/page/admin/announce')
          component: resolve => require.ensure([], () => resolve(require('@/page/admin/announce')), 'demo')

        }
      ]
    },
    {
      path: '/Adminloginpage',
      name: 'Adminloginpage',
      // component: () => import('@/page/Adminloginpage')
      component: resolve => require.ensure([], () => resolve(require('@/page/Adminloginpage')), 'demo')
    },
    {
      path: '/Innermessage',
      name: 'Innermessage',
      // component: () => import('@/page/Innermessage')
      component: resolve => require.ensure([], () => resolve(require('@/page/Innermessage')), 'demo')
    },
    {
      path: '/editorpersoninfo',
      name: 'editorpersoninfo',
      // component: () => import('@/page/editorpersoninfo')
      component: resolve => require.ensure([], () => resolve(require('@/page/editorpersoninfo')), 'demo')
    }
  ]
})

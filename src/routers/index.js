import { createRouter, createWebHistory } from 'vue-router'

// 引入组件
import Home from '@/view/home/home.vue'


// 异步加载的路由组件
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页',
      requiresAuth: false
    }
  },
  {
    path: '/genre',
    name: 'Genre',
    component: () => import('@/view/genre/index.vue'),
    meta: {
      title: '分类',
      requiresAuth: false
    }
  },
  {
    path: '/videoPlay',
    name: 'VideoPlay',
    component: () => import('@/view/home/components/videoPlay.vue'),
    meta: {
      title: '视频播放',
      requiresAuth: false
    }
  },
  {
    path: '/fandom',
    name: 'Fandom',
    component: () => import('@/view/fandom/index.vue')
  },
  {
    path: '/fandom/:id',
    name: 'FandomContent',
    component: () => import('@/view/fandom/components/fandomContent.vue')
  },
  {
    path: '/user',
    component: () => import('@/components/userpage.vue'),
    children: [
      {
        path: 'wallet',
        component: () => import('@/components/userpage.vue'),
      },
      {
        path: 'list',
        component: () => import('@/components/userpage.vue'),
      },
      {
        path: 'history',
        component: () => import('@/components/userpage.vue'),
      },
      {
        path: 'points',
        component: () => import('@/components/userpage.vue'),
      },
      {
        path: '',
        redirect: '/user/wallet'
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 } // 每次路由切换都滚动到顶部
  }
})

// // 路由守卫
// router.beforeEach((to, from, next) => {
//   // 设置页面标题
//   document.title = to.meta.title || '默认标题'
  
//   // 判断该路由是否需要登录权限
//   if (to.meta.requiresAuth) {
//     const token = localStorage.getItem('token')
//     if (token) {
//       next()
//     } else {
//       next({
//         path: '/login',
//         query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
//       })
//     }
//   } else {
//     next()
//   }
// })

export default router

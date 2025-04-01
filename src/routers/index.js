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
 
]

const router = createRouter({
  history: createWebHistory(),
  routes
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

import { createRouter, createWebHistory } from 'vue-router'
// 引入组件

import TermsOfService from '@/view/TermsOfService.vue'

// 异步加载的路由组件
const routes = [
  {
    path: '/',
    name: 'TermsOfService',
    component: TermsOfService,
    meta: {
      requiresAuth: false
    }
    
  },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})



export default router

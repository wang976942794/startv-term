const routes = [
  // ... other routes ...
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
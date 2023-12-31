// src/router/index.ts
// vue-router相关配置

import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('../views/home/index.vue'),
    name: 'home'
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

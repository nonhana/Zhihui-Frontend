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
  },
  {
    path: '/drawer',
    component: () => import('../views/drawer/index.vue'),
    name: 'drawer'
  },
  {
    path: '/material',
    component: () => import('../views/material/index.vue'),
    name: 'material'
  },
  {
    path: '/material/:id',
    component: () => import('../views/materialDetail/index.vue'),
    name: 'materialDetail'
  },
  {
    path: '/community',
    component: () => import('../views/community/index.vue'),
    name: 'community'
  },
  {
    path: '/shop',
    component: () => import('../views/shop/index.vue'),
    name: 'shop'
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

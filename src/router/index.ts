import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import DemoPage from '@/views/DemoPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/demopage',
    component: DemoPage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
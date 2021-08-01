import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Panel from '@/views/Panel.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/panel',
    component: Panel
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
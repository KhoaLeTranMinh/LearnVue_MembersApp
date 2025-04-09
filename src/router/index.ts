import { createRouter, createWebHistory } from 'vue-router'

import MembersControllerPage from '@/views/MembersControllerPage.vue'
import AdminsControllerPage from '@/views/AdminsControllerPage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/members',
      name: 'MembersPage',
      component: MembersControllerPage  ,
    },
    {
      path: '/admins',
      name: 'AdminsPage',
      component: AdminsControllerPage  ,
    },



  ],
})

export default router

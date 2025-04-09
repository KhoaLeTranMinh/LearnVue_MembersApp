import { createRouter, createWebHistory } from 'vue-router'

import MembersControllerPage from '@/views/MembersAdminControllerPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/members',
      name: 'MembersPage',
      component: MembersControllerPage,
      props: {
        isAdmin: false,
      },
    },
    {
      path: '/admins',
      name: 'AdminsPage',
      component: MembersControllerPage,
      props: {
        isAdmin: true,
      },
    },
  ],
})

export default router

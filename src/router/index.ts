import { createRouter, createWebHistory } from 'vue-router'

import MembersControllerPage from '@/views/MembersAdminControllerPage.vue'
import AddMemberForm from '@/components/AddMemberForm.vue'
import Home from '@/views/Home.vue'

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
    {
      path:'/testing',
      name: 'TestingPage',
      component: AddMemberForm
    },
        {
      path: '/',
      name: 'home',
      component: Home
    },
  ],
})

export default router

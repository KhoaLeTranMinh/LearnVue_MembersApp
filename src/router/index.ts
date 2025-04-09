import { createRouter, createWebHistory } from "vue-router"

import MembersAdminControllerPage from "@/views/MembersAdminControllerPage.vue"

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/members",
			name: "MembersPage",
			component: MembersAdminControllerPage,
			props: {
				isAdmin: false,
			},
		},
		{
			path: "/admins",
			name: "AdminsPage",
			component: MembersAdminControllerPage,
			props: {
				isAdmin: true,
			},
		},
	]
})



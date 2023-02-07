import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/LandingPage.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "Landing",
			component: LandingPage,
		},
		{
			path: "/introduction",
			name: "IntroductionLayout",
			component: () => import("../views/CommonLayout.vue"),
			children: [
				{
					path: "",
					name: "Introduction",
					component: () => import("../views/IntroductionPage.vue"),
				},
			],
		},
	],
});

export default router;

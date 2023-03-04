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
			path: "/",
			name: "CommonLayout",
			component: () => import("../views/CommonLayout.vue"),
			children: [
				{
					path: "/introduction",
					name: "Introduction",
					component: () =>
						import("../views/root/IntroductionPage.vue"),
				},
				{
					path: "/installation",
					name: "Installation",
					component: () =>
						import("../views/root/InstallationPage.vue"),
				},
			],
		},
	],
});

export default router;

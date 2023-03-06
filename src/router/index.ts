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
				{
					path: "/configuration",
					name: "Configuration",
					component: () =>
						import("../views/root/ConfigurationPage.vue"),
				},
				{
					path: "/types",
					name: "Types",
					component: () => import("../views/root/TypesPage.vue"),
				},

				// Navigation
				{
					path: "/menu",
					name: "Menu",
					component: () => import("../views/navigation/MenuPage.vue"),
				},
				{
					path: "/sidebar",
					name: "Sidebar",
					component: () =>
						import("../views/navigation/SidebarPage.vue"),
				},
				{
					path: "/navbar",
					name: "Navbar",
					component: () =>
						import("../views/navigation/NavbarPage.vue"),
				},

				// Call to Actions
				{
					path: "/button",
					name: "Button",
					component: () =>
						import("../views/call_to_actions/ButtonPage.vue"),
				},

				// Data Entry
				{
					path: "/input",
					name: "Input",
					component: () =>
						import("../views/data_entry/InputPage.vue"),
				},
				{
					path: "/textarea",
					name: "TextareaPage",
					component: () =>
						import("../views/data_entry/TextareaPage.vue"),
				},
				{
					path: "/radio",
					name: "RadioPage",
					component: () =>
						import("../views/data_entry/RadioPage.vue"),
				},
				{
					path: "/radio-group",
					name: "RadioGroupPage",
					component: () =>
						import("../views/data_entry/RadioGroupPage.vue"),
				},
				{
					path: "/checkbox",
					name: "CheckboxPage",
					component: () =>
						import("../views/data_entry/CheckboxPage.vue"),
				},
				{
					path: "/checkbox-group",
					name: "CheckboxGroupPage",
					component: () =>
						import("../views/data_entry/CheckboxGroupPage.vue"),
				},
			],
		},
	],
});

export default router;

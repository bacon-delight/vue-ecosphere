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

				// About
				{
					path: "/team",
					name: "Team",
					component: () => import("../views/about/TeamPage.vue"),
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
				{
					path: "/tabs",
					name: "TabNavigation",
					component: () =>
						import("../views/navigation/TabNavigationPage.vue"),
				},
				{
					path: "/breadcrumb",
					name: "BreadcrumbNavigation",
					component: () =>
						import("../views/navigation/BreadcrumbPage.vue"),
				},

				// Design System
				{
					path: "/typography",
					name: "Typography",
					component: () =>
						import("../views/design_system/TypographyPage.vue"),
				},
				{
					path: "/colors",
					name: "Colors",
					component: () =>
						import("../views/design_system/ColorsPage.vue"),
				},

				// Call to Actions
				{
					path: "/button",
					name: "Button",
					component: () =>
						import("../views/call_to_actions/ButtonPage.vue"),
				},
				{
					path: "/link",
					name: "Link",
					component: () =>
						import("../views/call_to_actions/LinkPage.vue"),
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
					name: "Textarea",
					component: () =>
						import("../views/data_entry/TextareaPage.vue"),
				},
				{
					path: "/radio",
					name: "Radio",
					component: () =>
						import("../views/data_entry/RadioPage.vue"),
				},
				{
					path: "/radio-group",
					name: "RadioGroup",
					component: () =>
						import("../views/data_entry/RadioGroupPage.vue"),
				},
				{
					path: "/checkbox",
					name: "Checkbox",
					component: () =>
						import("../views/data_entry/CheckboxPage.vue"),
				},
				{
					path: "/checkbox-group",
					name: "CheckboxGroup",
					component: () =>
						import("../views/data_entry/CheckboxGroupPage.vue"),
				},
				{
					path: "/dropdown",
					name: "Dropdown",
					component: () =>
						import("../views/data_entry/DropdownPage.vue"),
				},
				{
					path: "/color-picker",
					name: "ColorPicker",
					component: () =>
						import("../views/data_entry/ColorPickerPage.vue"),
				},
				{
					path: "/switch",
					name: "Switch",
					component: () =>
						import("../views/data_entry/SwitchPage.vue"),
				},
				{
					path: "/search-dropdown",
					name: "SearchDropdown",
					component: () =>
						import("../views/data_entry/SearchDropdownPage.vue"),
				},
				{
					path: "/choice-chips",
					name: "ChoiceChips",
					component: () =>
						import("../views/data_entry/ChoiceChipsPage.vue"),
				},

				// Miscellaneous
				{
					path: "/avatar",
					name: "Avatar",
					component: () =>
						import("../views/miscellaneous/AvatarPage.vue"),
				},
				{
					path: "/tag",
					name: "Tag",
					component: () =>
						import("../views/miscellaneous/TagPage.vue"),
				},
				{
					path: "/stepper",
					name: "Stepper",
					component: () =>
						import("../views/miscellaneous/StepperPage.vue"),
				},
			],
		},
	],
});

// router.beforeEach((to, from) => {
// 	console.log("Before");
// });

// router.afterEach((to, from) => {
// 	console.log("After");
// });

export default router;

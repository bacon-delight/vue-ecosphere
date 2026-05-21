import { defineConfig } from "vitepress";

export default defineConfig({
	title: "Vue Ecosphere",
	description:
		"A modern, accessible, token-driven Vue 3 component library.",
	lang: "en-US",
	cleanUrls: true,
	lastUpdated: true,
	head: [
		["link", { rel: "icon", href: "/favicon.ico" }],
		["meta", { name: "theme-color", content: "#0f5fa3" }],
	],
	themeConfig: {
		logo: "/logo.png",
		siteTitle: "Vue Ecosphere",
		nav: [
			{ text: "Guide", link: "/guide/introduction" },
			{ text: "Components", link: "/components/" },
			{ text: "Tokens", link: "/tokens/" },
			{
				text: "v0.1.x",
				items: [
					{
						text: "Changelog",
						link: "https://github.com/bacon-delight/vue-ecosphere/blob/main/CHANGELOG.md",
					},
					{
						text: "Migration v0 → v1",
						link: "/guide/migration-v0-to-v1",
					},
				],
			},
		],
		sidebar: {
			"/guide/": [
				{
					text: "Getting Started",
					items: [
						{ text: "Introduction", link: "/guide/introduction" },
						{ text: "Installation", link: "/guide/installation" },
						{ text: "Configuration", link: "/guide/configuration" },
					],
				},
				{
					text: "Concepts",
					items: [
						{ text: "Theming", link: "/guide/theming" },
						{ text: "Accessibility", link: "/guide/accessibility" },
						{ text: "SSR & Nuxt", link: "/guide/ssr-and-nuxt" },
					],
				},
				{
					text: "Upgrading",
					items: [
						{
							text: "Migration v0 → v1",
							link: "/guide/migration-v0-to-v1",
						},
					],
				},
			],
			"/components/": [
				{
					text: "Overview",
					items: [{ text: "All components", link: "/components/" }],
				},
				{
					text: "Call to Action",
					items: [
						{ text: "Button", link: "/components/button" },
						{ text: "Link", link: "/components/link" },
					],
				},
				{
					text: "Data Entry",
					items: [
						{ text: "Checkbox", link: "/components/checkbox" },
						{
							text: "CheckboxGroup",
							link: "/components/checkbox-group",
						},
						{ text: "ChoiceChips", link: "/components/choice-chips" },
						{ text: "ColorPicker", link: "/components/color-picker" },
						{ text: "Input", link: "/components/input" },
						{
							text: "InputNumber",
							link: "/components/input-number",
						},
						{ text: "Radio", link: "/components/radio" },
						{ text: "RadioGroup", link: "/components/radio-group" },
						{ text: "Select", link: "/components/select" },
						{ text: "Switch", link: "/components/switch" },
						{ text: "Textarea", link: "/components/textarea" },
					],
				},
				{
					text: "Miscellaneous",
					items: [
						{ text: "Avatar", link: "/components/avatar" },
						{ text: "AvatarGroup", link: "/components/avatar-group" },
						{ text: "Stepper", link: "/components/stepper" },
						{ text: "Tag", link: "/components/tag" },
					],
				},
				{
					text: "Navigation",
					items: [
						{ text: "Breadcrumb", link: "/components/breadcrumb" },
						{ text: "Menu", link: "/components/menu" },
						{ text: "Navbar", link: "/components/navbar" },
						{ text: "Sidebar", link: "/components/sidebar" },
						{ text: "Tabs", link: "/components/tabs" },
					],
				},
				{
					text: "General",
					items: [
						{ text: "Icon", link: "/components/icon" },
						{
							text: "ConfigProvider",
							link: "/components/config-provider",
						},
					],
				},
			],
			"/tokens/": [
				{
					text: "Design Tokens",
					items: [
						{ text: "Overview", link: "/tokens/" },
						{ text: "Primitive", link: "/tokens/primitive" },
						{ text: "Semantic", link: "/tokens/semantic" },
						{ text: "Component", link: "/tokens/component" },
					],
				},
			],
		},
		socialLinks: [
			{
				icon: "github",
				link: "https://github.com/bacon-delight/vue-ecosphere",
			},
		],
		footer: {
			message:
				"Released under the MIT License. Built with VitePress.",
			copyright: "Copyright © 2024-present bacon-delight",
		},
		search: {
			provider: "local",
		},
		editLink: {
			pattern:
				"https://github.com/bacon-delight/vue-ecosphere/edit/main/apps/docs/:path",
			text: "Edit this page on GitHub",
		},
	},
	vite: {
		resolve: {
			dedupe: ["vue"],
		},
		ssr: {
			noExternal: ["vue-ecosphere"],
		},
	},
});

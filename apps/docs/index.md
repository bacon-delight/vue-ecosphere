---
layout: home

hero:
  name: Vue Ecosphere
  text: Accessible Vue 3 components, token-driven.
  tagline: A modern component library with --ep-* CSS custom properties, ARIA-first patterns, and a clean v1 API.
  image:
    src: /logo.png
    alt: Vue Ecosphere
  actions:
    - theme: brand
      text: Get Started
      link: /guide/introduction
    - theme: alt
      text: Browse Components
      link: /components/
    - theme: alt
      text: View on GitHub
      link: https://github.com/bacon-delight/vue-ecosphere

features:
  - icon: 🎨
    title: Token-driven theming
    details: Every visual is wired to a --ep-* CSS variable. Override at :root, swap themes at runtime, or generate brand variants from the token pipeline.
    link: /guide/theming
    linkText: Theming guide
  - icon: ♿
    title: Accessibility built in
    details: ARIA roles, keyboard navigation, focus management, and reduced-motion support across every component. Tested with axe-core.
    link: /guide/accessibility
    linkText: A11y guide
  - icon: 🧩
    title: Composable & explicit
    details: Plain Vue 3 SFCs, <script setup>, v-model:value pattern. No global state, no surprises.
    link: /components/
    linkText: Components
  - icon: 🌗
    title: Dark mode ready
    details: Toggle a single class on the root and every semantic token switches. SSR-safe and flash-free.
  - icon: ⚡
    title: Small & tree-shakeable
    details: ~20 kB gzipped for the full bundle. Import only what you use; CSS ships with the package.
  - icon: 🔧
    title: Nuxt-friendly
    details: SSR-safe imports, no window/document at module scope. Ship to Nuxt 3 with a tiny plugin.
    link: /guide/ssr-and-nuxt
    linkText: SSR guide
---

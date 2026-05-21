# Graph Report - .  (2026-05-21)

## Corpus Check
- Corpus is ~27,242 words - fits in a single context window. You may not need a graph.

## Summary
- 567 nodes · 636 edges · 95 communities (59 shown, 36 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 21 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 60|Community 60]]
- [[_COMMUNITY_Community 63|Community 63]]
- [[_COMMUNITY_Community 72|Community 72]]
- [[_COMMUNITY_Community 73|Community 73]]
- [[_COMMUNITY_Community 74|Community 74]]
- [[_COMMUNITY_Community 75|Community 75]]
- [[_COMMUNITY_Community 92|Community 92]]
- [[_COMMUNITY_Community 93|Community 93]]
- [[_COMMUNITY_Community 94|Community 94]]

## God Nodes (most connected - your core abstractions)
1. `scripts` - 9 edges
2. `compilerOptions` - 4 edges
3. `compilerOptions` - 4 edges
4. `initialize()` - 4 edges
5. `repository` - 3 edges
6. `compilerOptions` - 3 edges
7. `setTheme()` - 3 edges
8. `setColors()` - 3 edges
9. `setFonts()` - 3 edges
10. `paths` - 2 edges

## Surprising Connections (you probably didn't know these)
- `initialize()` --calls--> `setTheme()`  [EXTRACTED]
  src/plugin/plugin.ts → src/plugin/utilities/helpers/theme.ts
- `initialize()` --calls--> `setColors()`  [EXTRACTED]
  src/plugin/plugin.ts → src/plugin/utilities/helpers/theme.ts
- `initialize()` --calls--> `setFonts()`  [EXTRACTED]
  src/plugin/plugin.ts → src/plugin/utilities/helpers/theme.ts

## Hyperedges (group relationships)
- **Data Entry Components** — input_component, checkbox_component, color_picker_component, search_dropdown_component, checkbox_group_component, radio_group_component, textarea_component, switch_component, choice_chips_component [INFERRED]
- **Navigation Components** — menu_component, sidebar_component, navbar_component, tabs_component, breadcrumb_component [INFERRED]
- **Root Pages** — introduction_page, installation_page, configuration_page, types_page [INFERRED]
- **Data Entry Components v-model Binding** — dropdown_component, radio_component, input_component, checkbox_component, search_dropdown_component, checkbox_group_component, radio_group_component, textarea_component, switch_component, choice_chips_component [INFERRED]
- **Data Entry Components Update Events** — dropdown_component, radio_component, input_component, checkbox_component, search_dropdown_component, checkbox_group_component, radio_group_component, textarea_component, switch_component, choice_chips_component, color_picker_component [INFERRED]
- **Data Entry Components Disabled State** — dropdown_component, radio_component, input_component, checkbox_component, color_picker_component, search_dropdown_component, checkbox_group_component, radio_group_component, textarea_component, switch_component, choice_chips_component [INFERRED]
- **Choice-based Selection Components** — dropdown_component, radio_component, checkbox_component, search_dropdown_component, checkbox_group_component, radio_group_component, choice_chips_component [INFERRED]
- **Ecosphere Component Library** — data_entry_category, miscellaneous_category, call_to_actions_category [INFERRED]

## Communities (95 total, 36 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.00
Nodes (51): AvatarComponent, BreadcrumbNavigation, ButtonComponent, CheckboxField, CheckboxGroup, ChoiceChips, ColorPicker, DropdownField (+43 more)

### Community 2 - "Community 2"
Cohesion: 0.00
Nodes (42): Avatar Component, Avatar Size Type, Avatar Status Type, Checkbox Component, Checkbox Group Component, Checkbox Group Translations, Checkbox Translations, Choice Chips Component (+34 more)

### Community 3 - "Community 3"
Cohesion: 0.00
Nodes (29): en.md raw content, colors.ts, ConfigurationPage.vue, _en.ts, fonts.ts, i18n.ts, InstallationPage.vue, interpolateLiterals.ts (+21 more)

### Community 4 - "Community 4"
Cohesion: 0.00
Nodes (29): devDependencies, eslint, eslint-plugin-vue, jsdom, npm-run-all, pinia, prettier, @prettier/plugin-pug (+21 more)

### Community 5 - "Community 5"
Cohesion: 0.00
Nodes (23): AvatarComponent.vue, BreadcrumbNavigation.vue, ButtonComponent.vue, call_to_actions.interface.ts, CheckboxField.vue, data_entry.interface.ts, DynamicBackground.vue, FooterComponent.vue (+15 more)

### Community 6 - "Community 6"
Cohesion: 0.00
Nodes (21): description, files, homepage, license, main, name, private, repository (+13 more)

### Community 7 - "Community 7"
Cohesion: 0.00
Nodes (19): Breadcrumb Component, Breadcrumb Guide, Button Component, Button Guide, Call To Actions Components, Colors Design Guide, Design System, Link Component (+11 more)

### Community 8 - "Community 8"
Cohesion: 0.00
Nodes (19): src/App.vue, env.d.ts, src/main.ts, package.json, src/plugin/plugin.ts, plugins.d.ts, tsconfig.app.json, tsconfig.config.json (+11 more)

### Community 9 - "Community 9"
Cohesion: 0.00
Nodes (15): Common Layout, Configuration Page, Configuration Translations, Ecosphere Design System, vue-router, Ecosphere Design System, Installation Page, Installation Translations (+7 more)

### Community 10 - "Community 10"
Cohesion: 0.00
Nodes (7): getTheme(), setColors(), setFonts(), setTheme(), initialize(), app, i18n

### Community 11 - "Community 11"
Cohesion: 0.00
Nodes (12): data_entry_state, data_entry_state_options, ecosphere, hue, hue_extended, hue_extended_options, hue_limited, hue_limited_options (+4 more)

### Community 12 - "Community 12"
Cohesion: 0.00
Nodes (11): avatar_size, avatar_size_options, avatar_status, avatar_status_options, stepper_orientation, stepper_orientation_options, stepper_state, stepper_state_options (+3 more)

### Community 13 - "Community 13"
Cohesion: 0.00
Nodes (10): src/plugin/data-entry/CheckboxGroup.vue, src/plugin/data-entry/ChoiceChips.vue, src/plugin/data-entry/ColorPicker.vue, src/plugin/data-entry/DropdownField.vue, src/plugin/data-entry/InputField.vue, src/plugin/plugin_components.ts, src/plugin/data-entry/RadioField.vue, src/plugin/data-entry/RadioGroup.vue (+2 more)

### Community 14 - "Community 14"
Cohesion: 0.00
Nodes (9): choice_option, choice_option_alignment, choice_option_alignment_options, choice_option_expand, choice_option_expand_options, choice_option_filtered, choice_option_nested, input_type (+1 more)

### Community 15 - "Community 15"
Cohesion: 0.00
Nodes (8): compilerOptions, baseUrl, composite, paths, exclude, extends, include, @/*

### Community 16 - "Community 16"
Cohesion: 0.00
Nodes (7): breadcrumb_item, breadcrumb_item_compiled, menu_item, navbar_branding, tab_navigation_option, tab_navigation_option_icon_position, tab_navigation_option_icon_position_options

### Community 17 - "Community 17"
Cohesion: 0.00
Nodes (6): compilerOptions, composite, lib, types, exclude, extends

### Community 19 - "Community 19"
Cohesion: 0.00
Nodes (6): exclude, files, include, references, vueCompilerOptions, plugins

### Community 20 - "Community 20"
Cohesion: 0.00
Nodes (5): compilerOptions, composite, types, extends, include

### Community 21 - "Community 21"
Cohesion: 0.00
Nodes (4): button_size, button_size_options, cta_icon_position, cta_icon_position_options

### Community 27 - "Community 27"
Cohesion: 0.00
Nodes (3): .vscode/extensions.json, Vue.volar extension, Vue.vscode-typescript-vue-plugin extension

## Ambiguous Edges - Review These
- `SearchDropdownPage.vue` → `DropdownField`  [AMBIGUOUS]
   · relation: registers component

## Knowledge Gaps
- **146 isolated node(s):** `rewrites`, `extends`, `include`, `exclude`, `composite` (+141 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **36 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.
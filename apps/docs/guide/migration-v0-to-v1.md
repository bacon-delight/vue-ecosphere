# Migration: v0 → v1

Vue Ecosphere v1 (the `0.1.x` line) is a ground-up redesign of v0. This page lists every breaking change so you can mechanically migrate an existing codebase.

::: tip
The migration is best done with a global find/replace per section below, then a `pnpm typecheck` pass to catch the rest.
:::

## 1. `v-model` is now `v-model:value`

**Why:** consistency. Every data-entry component now uses `value` as its model name, which makes scoped slots and multiple v-models predictable.

```diff
- <EpInput v-model="email" />
+ <EpInput v-model:value="email" />

- <EpCheckbox v-model="agree" />
+ <EpCheckbox v-model:value="agree" />
```

Affected components: `EpInput`, `EpInputNumber`, `EpTextarea`, `EpCheckbox`, `EpCheckboxGroup`, `EpRadio`, `EpRadioGroup`, `EpSelect`, `EpSwitch`, `EpChoiceChips`, `EpColorPicker`.

## 2. Prop renames

| Component | Old prop | New prop | Notes |
| --- | --- | --- | --- |
| `EpTag`, `EpBreadcrumb`, `EpChoiceChips` | `outline` | `bordered` | Boolean unchanged |
| `EpStepper` | `current` | `value` | Now also `v-model:value` compatible |
| `EpBreadcrumb` | `options` | `items` | Array shape unchanged |
| `EpTabNavigation` | `active` | `value` | Now also `v-model:value` compatible |

## 3. Removed components

- **`EpDropdown`** — merged into `EpSelect`. Pass `searchable` for the old search-dropdown behavior.
- **`EpSearchDropdown`** — same; use `EpSelect` with `:searchable="true"`.

```diff
- <EpDropdown :options="opts" v-model="choice" />
+ <EpSelect :items="opts" v-model:value="choice" />

- <EpSearchDropdown :options="opts" v-model="choice" />
+ <EpSelect :items="opts" :searchable="true" v-model:value="choice" />
```

## 4. Unified `EpHue` palette

The old `color`/`variant` props are gone. Every component now takes a single `hue` prop with one of:

```
"primary" | "accent" | "neutral" | "info" | "success" | "warning" | "danger" | "system"
```

```diff
- <EpButton color="blue" variant="solid" />
+ <EpButton hue="primary" />

- <EpTag color="red" />
+ <EpTag hue="danger" />
```

## 5. Unified `EpSize` scale

Sizes are now `"xs" | "sm" | "md" | "lg" | "xl"` everywhere. Component-specific size enums (e.g., `"small"`, `"large"`, `"compact"`) were removed.

```diff
- <EpInput size="small" />
+ <EpInput size="sm" />

- <EpAvatar size="compact" />
+ <EpAvatar size="sm" />
```

## 6. SCSS retired

The library no longer ships SCSS. `@ecosphere/styles/framework.scss`, breakpoints, mixins, and color partials are gone. All styling is **plain CSS with `--ep-*` custom properties**.

If you were extending the library via SCSS, switch to CSS variables — see [Theming](/guide/theming).

```diff
- @import "vue-ecosphere/styles/framework";
- .my-control { background: $color-primary-500; }

+ @import "vue-ecosphere/styles";
+ .my-control { background: var(--ep-color-primary-500); }
```

## 7. Plugin signature

The plugin now accepts a flat options object:

```diff
- app.use(Ecosphere, { theming: { default: "light" }, locale: { default: "en" } });
+ app.use(Ecosphere, { size: "md", hue: "primary", locale: "en-US" });
```

## 8. `$ecosphere` instance properties removed

`this.$ecosphere.theming.setTheme(...)` no longer exists. Toggle dark mode by adding the `dark` class to `<html>`:

```ts
document.documentElement.classList.toggle("dark");
```

## 9. i18n is BYO

The library no longer bundles `vue-i18n`. Plug in any i18n library you prefer; the library itself only uses raw strings for ARIA labels (which can still be overridden per component).

## Mechanical migration script

For a fast first pass, run this in a checked-in tree:

```bash
# v-model → v-model:value (review each match)
grep -rln 'v-model="' src | xargs sed -i '' 's/v-model="/v-model:value="/g'

# Prop renames
grep -rln 'outline' src | xargs sed -i '' \
	-e 's/:outline=/:bordered=/g' \
	-e 's/ outline=/ bordered=/g'

# Removed components
grep -rln 'EpDropdown\|EpSearchDropdown' src
```

…then walk the remaining hits by hand. Type-check before committing.

## Getting help

If you hit a case not covered here, open an issue with a minimal repro on [GitHub](https://github.com/bacon-delight/vue-ecosphere/issues). We'll either document it here or fix the API.

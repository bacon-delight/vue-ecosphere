Once the plugin is imported, you'll have access to a global property `$ecosphere` (or `this.$ecosphere`) which will expose some helper functions.

#### Theme Helpers

```bash
$ecosphere.theming
```

| Property      | Description                                             | Type                         | Default |
| ------------- | ------------------------------------------------------- | ---------------------------- | ------- |
| `setTheme()`  | Set a theme which will be applied to all the components | [`theme`](/types#theme)      | `auto`  |
| `setColors()` | Override the existing color scheme with a custom set    | [`color_map`](/types#colors) | `auto`  |

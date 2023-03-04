Once the plugin is imported, you'll have access to a global property `$ecosphere` (or `this.$ecosphere`) which will expose some helper functions.

#### Theme Helpers

```bash
$ecosphere.theming
```

| Name       | Type                    | Default | Returns | Description                                             |
| ---------- | ----------------------- | ------- | ------- | ------------------------------------------------------- |
| `setTheme` | [`theme`](/types#theme) | `auto`  | `void`  | Set a theme which will be applied to all the components |

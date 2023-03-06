Here's a list of common types that various components use across the design system.

-   Global Types
    -   [Theme](#theme)
    -   [Hue](#hue)
    -   [Colors](#colors)
-   Data Entry Types
    -   [Data Entry State](#data-entry-state)
    -   [Choice Option](#choice-option)
    -   [Choice Option Nested](#choice-option-nested)
    -   [Choice Option Alignment](#choice-option-alignment)

#### Global Types

##### Theme

```ts
type theme = "auto" | "light" | "dark" | "invert";

// $ecosphere.theming.setTheme()
type setTheme = (theme?: theme) => void;
```

For example, to set a new theme:

```ts
const customTheme = "dark" as theme;
$ecosphere.theming.setTheme(customTheme);
```

##### Hue

```ts
type hue =
	| "primary"
	| "primary-variant"
	| "secondary"
	| "secondary-variant"
	| "error"
	| "success"
	| "warning"
	| "information";
```

##### Colors

```ts
interface color_map {
	[key: string]: string;
}

// $ecosphere.theming.setColors()
type setColors = (colors: color_map) => void;
```

For example, to override the existing colors of Ecosphere with your own set of colors, you can use:

```ts
const customColors = {
	light: "#ffffff",
	"light-faded": "#eeeeee",
	dark: "#0d0f11",
	"dark-faded": "#202b35",
} as color_map;

$ecosphere.theming.setColors(customColors);
```

#### Data Entry Types

##### Data Entry State

```ts
type data_entry_state = "default" | "error" | "warning" | "success";
```

##### Choice Option

```ts
interface choice_option {
	label: string;
	value: string | number | boolean;
	hidden?: boolean;
	disabled?: boolean;
	action?: () => void;
}
```

| Property   | Description                                           | Type                        | Default |
| ---------- | ----------------------------------------------------- | --------------------------- | ------- |
| `label`    | Label to render with the choice option                | `string`                    |         |
| `value`    | Value of the choice option                            | `string` `number` `boolean` |         |
| `hidden`   | Hides the choice option                               | `boolean`                   | `false` |
| `disabled` | Disables the choice option                            | `boolean`                   | `false` |
| `action`   | Triggers an action when the choice option is selected | `() => void`                |         |

##### Choice Option Nested

```ts
interface choice_option_nested extends choice_option {
	children?: choice_option[];
}
```

| Property   | Description                                           | Type                                | Default |
| ---------- | ----------------------------------------------------- | ----------------------------------- | ------- |
| `label`    | Label to render with the choice option                | `string`                            |         |
| `value`    | Value of the choice option                            | `string` `number` `boolean`         |         |
| `hidden`   | Hides the choice option                               | `boolean`                           | `false` |
| `disabled` | Disables the choice option                            | `boolean`                           | `false` |
| `action`   | Triggers an action when the choice option is selected | `() => void`                        |         |
| `children` | Renders a nested list of choice options               | [`choice_option[]`](#choice-option) |         |

##### Choice Option Alignment

```ts
type choice_option_alignment = "grid" | "flex" | "vertical";
```

Here's a list of common types that various components use across the design system.

-   [Theme](#theme)
-   [Hue](#hue)
-   [Colors](#colors)

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

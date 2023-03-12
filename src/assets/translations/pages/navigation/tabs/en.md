#### Use Case

Tab navigation is used to generally render different components in a single page, based on user selection.

#### API

| Property       | Description                                                                          | Type                                                                   | Default       |
| -------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- | ------------- |
| `v-model`      | Binds the selected value to a variable                                               | `string` `number` `boolean`                                            |               |
| `options`      | Sets the label of the tag                                                            | [`tab_navigation_option[]`](#tab-navigation-option)                    | Required      |
| `disabled`     | Disables the entire tab navigation                                                   | `boolean`                                                              | `false`       |
| `iconPosition` | Sets the position for icons                                                          | [`tab_navigation_option_icon_position`](#tab-navigation-icon-position) | Required      |
| `default`      | Default value of the tab navigation, highlights the option where the `value` matches | `string` `number` `boolean`                                            |               |
| `hue`          | Applies a hue to the selected item in the tab navigation                             | [`hue`](/types#hue)                                                    | `information` |

#### Types

###### Tab Navigation Option

The structure of an option in the tab navigation

```ts
interface tab_navigation_option {
	label?: string;
	icon?: string;
	value: string | number | boolean;
	hidden?: boolean;
	disabled?: boolean;
	action?: () => void;
}
```

###### Tab Navigation Option Icon Position

Supported positions for icons

```ts
type tab_navigation_option_icon_position = "before" | "after" | "above";
```

#### Example

```js
<template>
	<v-eco-tab-navigation :options="options" />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
	data() {
		return {
			options: [
				{
					label: "Home",
					icon: "ri-home-line",
					value: "one",
				},
				{
					label: "Dashboard",
					icon: "ri-dashboard-line",
					value: "two",
				},
				{
					label: "Analytics",
					icon: "ri-pie-chart-line",
					value: "three",
					disabled: true,
				},
			],
		}
	}
});
</script>
```

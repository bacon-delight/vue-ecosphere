#### Use Case

Breadcrumbs are used to provide a visual hierarchy of the current page, and allow the user to navigate to parent routes

#### API

| Property      | Description                                      | Type                                   | Default                 |
| ------------- | ------------------------------------------------ | -------------------------------------- | ----------------------- |
| `options`     | List of options to be rendered in the breadcrumb | [`breadcrumb_item`](#breadcrumb-item)  | Required                |
| `disabled`    | Disables the entire breadcrumb                   | `boolean`                              | `false`                 |
| `outline`     | Adds an outline around the entire breadcrumb     | `boolean`                              | `false`                 |
| `dividerIcon` | The icon for divider among the breadcrumb items  | [`Remix Icon`](https://remixicon.com/) | `ri-arrow-right-s-line` |

#### Types

###### Breadcrumb Item

Defines the type of individual breadcrumb item

| Property   | Description                                    | Type         | Default |
| ---------- | ---------------------------------------------- | ------------ | ------- |
| `label`    | Label for the breadcrumb item                  | `string`     |         |
| `icon`     | Icon to be associated with the breadcrumb item | `string`     |         |
| `hidden`   | Hides the option                               | `boolean`    | `false` |
| `active`   | Shows the option as active                     | `boolean`    | `false` |
| `disabled` | Disables the breadcrumb item                   | `boolean`    | `false` |
| `action`   | Action to trigger on click of the item         | `() => void` |         |

```ts
interface breadcrumb_item {
	label?: string;
	icon?: string;
	hidden?: boolean;
	disabled?: boolean;
	active?: boolean;
	action?: () => void;
}
```

#### Example

```js
<template>
	<v-eco-breadcrumb :options="options" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	data() {
		return {
			options: [
				{
					label: "Home",
					icon: "ri-home-line",
					action: () => {
						alert("You clicked home!");
					},
				},
				{
					label: "Navigation",
					icon: "ri-navigation-line",
					disabled: true,
				},
				{
					label: "Breadcrumb",
					active: true,
				},
			],
		};
	},
});
</script>
```

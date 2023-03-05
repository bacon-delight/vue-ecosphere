#### Use Case

A menu let users navigate through a complex set of available options.

#### API

| Property   | Description                                                    | Type                        | Default       |
| ---------- | -------------------------------------------------------------- | --------------------------- | ------------- |
| `options`  | Lists the available options to be rendered in the menu         | [`menu_item[]`](#menu-item) | Required      |
| `skeleton` | Show or hide the skeleton structure in case the menu is nested | `boolean`                   | `true`        |
| `hue`      | Specify of the menu                                            | [`hue`](/types#hue)         | `information` |

#### Types

###### Menu Item

Composes the item definition for individual option in the menu

| Property   | Description                                                 | Type                                   | Default  |
| ---------- | ----------------------------------------------------------- | -------------------------------------- | -------- |
| `label`    | Label that will be rendered with the menu item              | `string`                               | Required |
| `icon`     | Icon to render along with the label                         | [`Remix Icon`](https://remixicon.com/) |          |
| `hidden`   | Hides the item from the menu                                | `boolean`                              | `false`  |
| `active`   | Highlights the item as an active element in the menu        | `boolean`                              | `false`  |
| `action`   | Trigger an action on click of the menu item                 | `() => void`                           |          |
| `children` | Nest another level of menu items within the current element | `menu_item[]`                          |          |
| `expanded` | Keep the children (if exists) expanded by default           | `boolean`                              | `false`  |

```ts
interface menu_item {
	label: string;
	icon?: string;
	hidden?: boolean;
	active?: boolean;
	action?: () => void;
	children?: menu_item[];
	expanded?: boolean;
}
```

#### Example

```js
<template>
  <v-eco-menu :options="options" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  	data() {
		return {
			options: [
				{
					label: "Introduction",
					icon: "ri-bookmark-line",
					active: router.currentRoute.value.path === "/introduction",
					action: () => {
						router.push("/introduction");
					},
				},
				{
					label: "Design Language",
					icon: "ri-pencil-line",
					expanded: true,
					children: [
						{
							label: "Design",
							active: router.currentRoute.value.path === "/design",
							action: () => {
								router.push("/design");
							},
						},
						{
							label: "Typography",
							active: router.currentRoute.value.path === "/typography",
							action: () => {
								router.push("/typography");
							},
						},
						{
							label: "Icons",
							active: router.currentRoute.value.path === "/icons",
							action: () => {
								router.push("/icons");
							},
						},
					],
				},
			]
		}
	}
});
</script>
```

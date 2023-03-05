#### Use Case

A sidebar lets users navigate through different pages in an application.

#### API

| Property   | Description                                                    | Type                             | Default       |
| ---------- | -------------------------------------------------------------- | -------------------------------- | ------------- |
| `options`  | Lists the available options to be rendered in the menu         | [`menu_item[]`](/menu#menu-item) | Required      |
| `skeleton` | Show or hide the skeleton structure in case the menu is nested | `boolean`                        | `true`        |
| `hue`      | Specify of the menu                                            | [`hue`](/types#hue)              | `information` |

#### Example

```js
<template>
  <v-eco-sidebar :options="options" />
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

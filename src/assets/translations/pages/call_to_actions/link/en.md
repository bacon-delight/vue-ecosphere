#### Use Case

Clicking a link navigates the user to another page within or outside the application.

#### API

| Property       | Description                  | Type                                        | Default   |
| -------------- | ---------------------------- | ------------------------------------------- | --------- |
| `label`        | Sets the label of the button | `string`                                    | Required  |
| `hue`          | Hue of the link              | [`hue`](/types#hue)                         | `primary` |
| `icon`         | Name of the icon             | [`Remix Icon`](https://remixicon.com/)      |           |
| `iconPosition` | Position of the icon         | [`link_icon_position`](#link-icon-position) | `after`   |

#### Types

###### Link Icon Position

Defines the positions where the icon can be placed inside the button

```ts
type link_icon_position = "before" | "after";
```

#### Events

All events that works with a anchor tag [`a`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) element are supported through [Attribute Inheritence](https://vuejs.org/guide/components/attrs.html#attribute-inheritance). Directly use them on the component.

#### Example

```js
<template>
	<v-eco-link
		label="Visit Google"
		href="https://google.com"
		target="_blank"
	/>
</template>
```

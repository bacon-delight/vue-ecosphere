#### Use Case

Clicking a button triggers an action. A button can be used to highlight a supported action in an application. Different types of button allow signifying the intensity and use case of a particular action.

### API

| Property       | Description                            | Type                                            | Default   |
| -------------- | -------------------------------------- | ----------------------------------------------- | --------- |
| `label`        | Sets the label of the button           | `string`                                        | Required  |
| `size`         | Sets the size of the button            | [`button_size`](#button-size)                   | `md`      |
| `hue`          | Hue of the button                      | [`hue`](/types#hue)                             | `primary` |
| `ghost`        | Hollow buttons                         | `boolean`                                       | `false`   |
| `icon`         | Name of the icon                       | [`Remix Icon`](https://remixicon.com/)          |           |
| `iconPosition` | Position of the icon inside the button | [`button_icon_position`](#button-icon-position) | `after`   |

#### Types

###### Button Size

Defines the supported sizes for the button

```ts
type button_size = "xs" | "sm" | "md" | "lg" | "xl";
```

###### Button Icon Position

Defines the positions where the icon can be placed inside the button

```ts
type button_icon_position = "before" | "after";
```

#### Events

All events that works with a regular [`button`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) element are supported through [Attribute Inheritence](https://vuejs.org/guide/components/attrs.html#attribute-inheritance). Directly use them on the component.

For example, to listen to the `click` event, you can use the following code:

```js
<template>
  <v-eco-button label="Click me" @click="handleClick" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  methods: {
    handleClick() {
      console.log("Clicked!");
    },
  },
});
</script>
```

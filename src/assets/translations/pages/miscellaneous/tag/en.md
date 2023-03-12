#### Use Case

Clicking a button triggers an action. A button can be used to highlight a supported action in an application. Different types of button allow signifying the intensity and use case of a particular action.

#### API

| Property     | Description                  | Type                                   | Default   |
| ------------ | ---------------------------- | -------------------------------------- | --------- |
| `label`      | Sets the label of the button | `string`                               | Required  |
| `size`       | Sets the size of the button  | [`tag_size`](#tag-size)                | `md`      |
| `hue`        | Hue of the button            | [`hue`](/types#hue)                    | `primary` |
| `icon`       | Name of the icon             | [`Remix Icon`](https://remixicon.com/) |           |
| `allowClear` | Allows the tag to be cleared | `boolean`                              | `false`   |

#### Types

###### Tag Size

Defines the supported sizes for the button

```ts
type tag_size = "sm" | "md" | "lg";
```

#### Events

| Event    | Description                                                       | Returns |
| -------- | ----------------------------------------------------------------- | ------- |
| `@clear` | Fired when the tag is cleared, requires `allowClear` to be `true` | `void`  |

#### Example

```js
<template>
	<v-eco-tag label="Tag" />
</template>
```

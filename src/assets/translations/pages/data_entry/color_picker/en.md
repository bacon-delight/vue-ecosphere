#### Use Case

This field allows user to select a color of their choice.

#### API

| Property       | Description                                                                 | Type      | Default   |
| -------------- | --------------------------------------------------------------------------- | --------- | --------- |
| `v-model`      | Binds the input value to a variable                                         | `string`  | `#000000` |
| `default`      | Sets the default value of the color picker                                  | `string`  | `#000000` |
| `label`        | Sets the label of the button                                                | `string`  |           |
| `disabled`     | Disables the color picker                                                   | `boolean` | `false`   |
| `outline`      | Outlines the color picker with a contrasting color                          | `boolean` | `false`   |
| `overlay`      | Displays the label and hex of the selected color on top of the color swatch | `boolean` | `false`   |
| `overlayColor` | Sets a contrasting color for the overlay text, if `overlay` is `true`       | `string`  | `#FFFFFF` |

#### Events

| Event     | Description                                       | Returns           |
| --------- | ------------------------------------------------- | ----------------- |
| `@update` | Fired when the text in the input field is updated | `string` `number` |

#### Example

```js
<template>
	<v-eco-color-picker label="Pick a Color" />
</template>
```

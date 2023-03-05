#### Use Case

A input field records user input

#### API

| Property         | Description                                                                                                                  | Type                          | Default   |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | --------- |
| `v-model`        | Binds a the input value                                                                                                      | `string` `number` `null`      | `null`    |
| `label`          | Label to display of top of the input field                                                                                   | `string`                      |           |
| `placeholder`    | Placeholder for the input, displayed if no value is present                                                                  | `string`                      |           |
| `type`           | Specify the type of the input                                                                                                | [`input_type`](#input-type)   | `text`    |
| `disabled`       | Disables the input field                                                                                                     | `boolean`                     | `false`   |
| `outline`        | Outlines the input field with a contrasting color                                                                            | `boolean`                     | `false`   |
| `assistive-text` | Displays an assistive text below the input field                                                                             | `string`                      |           |
| `state`          | State of the input field, highlights if not `default`                                                                        | [`input_state`](#input-state) | `default` |
| `alert-message`  | Displays an alert message at the bottom of the field if `state` is not `default` (will replace `assistive-text`, if present) | `string`                      |           |
| `allow-clear`    | Renders an icon to allow the user to clear the field                                                                         | `boolean`                     | `false`   |
| `max-length`     | Restricts the input field to a specified length                                                                              | `number`                      |           |
| `show-length`    | Display the length of the input in the field (shows `max-length` as well, if defined)                                        | `boolean`                     | `false`   |

#### Types

###### Input Type

Specifies the supported input types for the field

```ts
type input_type = "text" | "number" | "email";
```

###### Input State

Highlights the input field if not in `default` state

```ts
type input_state = "default" | "error" | "warning" | "success";
```

#### Example

```html
<template>
	<v-eco-input label="Name" v-model="name" />
</template>

<script lang="ts">
	import { defineComponent } from "vue";

	export default defineComponent({
		data() {
			return {
				name: "",
			};
		},
	});
</script>
```

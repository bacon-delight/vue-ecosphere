#### Use Case

A input field records user input

#### API

| Property         | Description                                                                                                                  | Type                                         | Default   |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | --------- |
| `v-model`        | Binds the input value to a variable                                                                                          | `string` `number`                            |           |
| `label`          | Label to display of top of the input field                                                                                   | `string`                                     |           |
| `placeholder`    | Placeholder for the input, displayed if no value is present                                                                  | `string`                                     |           |
| `type`           | Specify the type of the input                                                                                                | [`input_type`](#input-type)                  | `text`    |
| `disabled`       | Disables the input field                                                                                                     | `boolean`                                    | `false`   |
| `outline`        | Outlines the input field with a contrasting color                                                                            | `boolean`                                    | `false`   |
| `assistive-text` | Displays an assistive text below the input field                                                                             | `string`                                     |           |
| `state`          | State of the input field, highlights if not `default`                                                                        | [`data_entry_state`](types#data-entry-state) | `default` |
| `alert-message`  | Displays an alert message at the bottom of the field if `state` is not `default` (will replace `assistive-text`, if present) | `string`                                     |           |
| `allow-clear`    | Renders an icon to allow the user to clear the field                                                                         | `boolean`                                    | `false`   |
| `max-length`     | Restricts the input field to a specified length                                                                              | `number`                                     |           |
| `show-length`    | Display the length of the input in the field (shows `max-length` as well, if defined)                                        | `boolean`                                    | `false`   |
| `default`        | Default value of the input field                                                                                             | `string` `number`                            |           |

#### Types

###### Input Type

Specifies the supported input types for the field

```ts
type input_type = "text" | "number" | "email";
```

#### Events

| Event         | Description                                           | Returns                  |
| ------------- | ----------------------------------------------------- | ------------------------ |
| `@update`     | Fired when the text in the input field is updated     | `string` `number` `null` |
| `@enterPress` | Fired when the user presses the keyboard enter button | `string` `number` `null` |
| `@clear`      | Fired when the input field is cleared or emptied      | `void`                   |

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

#### Use Case

A input field records user input

#### API

| Property         | Description                                                                                                                  | Type                                         | Default   |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | --------- |
| `v-model`        | Binds the input value to a variable                                                                                          | `string` `number` `null`                     | `null`    |
| `label`          | Label to display of top of the input field                                                                                   | `string`                                     |           |
| `placeholder`    | Placeholder for the input, displayed if no value is present                                                                  | `string`                                     |           |
| `rows`           | Number of lines in the textarea                                                                                              | `number`                                     | `3`       |
| `disabled`       | Disables the input field                                                                                                     | `boolean`                                    | `false`   |
| `outline`        | Outlines the input field with a contrasting color                                                                            | `boolean`                                    | `false`   |
| `assistive-text` | Displays an assistive text below the input field                                                                             | `string`                                     |           |
| `state`          | State of the input field, highlights if not `default`                                                                        | [`data_entry_state`](types#data-entry-state) | `default` |
| `alert-message`  | Displays an alert message at the bottom of the field if `state` is not `default` (will replace `assistive-text`, if present) | `string`                                     |           |
| `allow-clear`    | Renders an icon to allow the user to clear the field                                                                         | `boolean`                                    | `false`   |
| `max-length`     | Restricts the input field to a specified length                                                                              | `number`                                     |           |
| `show-length`    | Display the length of the input in the field (shows `max-length` as well, if defined)                                        | `boolean`                                    | `false`   |

#### Example

```html
<template>
	<v-eco-textarea label="Name" v-model="name" />
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

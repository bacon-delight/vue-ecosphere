#### Use Case

This component renders a dropdown that consolidates the user selection into a singular value.

#### API

| Property         | Description                                                                                                                     | Type                                          | Default       |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | ------------- |
| `v-model`        | Binds the dropdown's selected value to a variable                                                                               | `string` `number` `boolean`                   |               |
| `label`          | Label to render along with the dropdown                                                                                         | `string`                                      |               |
| `placeholder`    | Placeholder for the dropdown, if no value is selected                                                                           | `string`                                      |               |
| `assistive-text` | Displays an assistive text below the dropdown                                                                                   | `string`                                      |               |
| `allow-clear`    | Renders an icon to allow the user to clear the dropdown                                                                         | `boolean`                                     | `false`       |
| `state`          | State of the dropdown, highlights if not `default`                                                                              | [`data_entry_state`](/types#data-entry-state) | `default`     |
| `alert-message`  | Displays an alert message at the bottom of the dropdown if `state` is not `default` (will replace `assistive-text`, if present) | `string`                                      |               |
| `options`        | Options to be rendered in the dropdown                                                                                          | [`choice_option[]`](/types#choice-option)     | Required      |
| `default`        | Default value of the dropdown, selects the option where the `value` matches                                                     | `string` `number` `boolean`                   |               |
| `disabled`       | Disables the dropdown and prevents users from selecting any value                                                               | `boolean`                                     | `false`       |
| `outline`        | Outlines the dropdown with a contrasting color                                                                                  | `boolean`                                     | `false`       |
| `hue`            | Applies a hue to the dropdown                                                                                                   | [`hue`](/types#hue)                           | `information` |

#### Events

| Event     | Description                                   | Returns                     |
| --------- | --------------------------------------------- | --------------------------- |
| `@update` | Fired when the dropdown is updated            | `string` `number` `boolean` |
| `@clear`  | Fired when the dropdown is cleared or emptied | `void`                      |

#### Example

```html
<template>
	<v-eco-search-dropdown
		label="Select your favourite fruit"
		:options="options"
		v-model="value"
	/>
</template>

<script lang="ts">
	import { defineComponent } from "vue";

	export default defineComponent({
		data() {
			return {
				value: null,
				options: [
					{
						label: "Apple",
						value: 1,
					},
					{
						label: "Banana",
						value: 2,
					},
					{
						label: "Firethorn",
						value: 3,
						disabled: true,
					},
					{
						label: "Grapefruit",
						value: 4,
					},
					{
						label: "Dragonfruit",
						value: 5,
					},
					{
						label: "Kiwi",
						value: 6,
					},
				],
			};
		},
	});
</script>
```

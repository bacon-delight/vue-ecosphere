#### Use Case

This component renders a list of choice-chips that consolidates the user selection into a singular array of values.

#### API

| Property         | Description                                                                                                                  | Type                                                        | Default       |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ------------- |
| `v-model`        | Binds the input value to a variable                                                                                          | `(string, number, boolean)[]`                               |               |
| `label`          | Label to render along with the choice-chips group                                                                            | `string`                                                    |               |
| `assistive-text` | Displays an assistive text below the choice-chips group                                                                      | `string`                                                    |               |
| `state`          | State of the choice-chips group, highlights if not `default`                                                                 | [`data_entry_state`](/types#data-entry-state)               | `default`     |
| `alert-message`  | Displays an alert message at the bottom of the field if `state` is not `default` (will replace `assistive-text`, if present) | `string`                                                    |               |
| `options`        | Options                                                                                                                      | [`choice_option[]`](/types#choice-option)                   | Required      |
| `alignment`      | Aligns the flow of choice-chips buttons in a specific order                                                                  | [`choice_option_alignment`](/types#choice-option-alignment) | `flex`        |
| `default`        | Default value of the choice-chips group, highlights the option where the `value` matches                                     | `(string, number, boolean)[]`                               |               |
| `disabled`       | Disables the entire choice-chips group and prevents users from selecting any value                                           | `boolean`                                                   | `false`       |
| `hue`            | Applies a hue to the choice-chips group                                                                                      | [`hue`](/types#hue)                                         | `information` |
| `outline`        | Outlines the choice-chips                                                                                                    | `boolean`                                                   | `false`       |
| `multiple`       | Allows selection of multiple choices                                                                                         | `boolean`                                                   | `true`        |

#### Events

| Event     | Description                                   | Returns                       |
| --------- | --------------------------------------------- | ----------------------------- |
| `@update` | Fired when one of the choice-chips is updated | `(string, number, boolean)[]` |

#### Example

```html
<template>
	<v-eco-choice-chips
		label="Select your favourite fruits"
		:options="options"
		v-model="values"
	/>
</template>

<script lang="ts">
	import { defineComponent } from "vue";

	export default defineComponent({
		data() {
			return {
				values: [],
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

#### Use Case

This component renders a list of radio buttons that consolidates the user selection into a singular value.

#### API

| Property         | Description                                                                                                                  | Type                                                        | Default   |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | --------- |
| `v-model`        | Binds the input value to a variable                                                                                          | `string` `number` `boolean`                                 |           |
| `label`          | Label to render along with the radio button                                                                                  | `string`                                                    |           |
| `assistive-text` | Displays an assistive text below the radio group                                                                             | `string`                                                    |           |
| `state`          | State of the radio group, highlights if not `default`                                                                        | [`data_entry_state`](/types#data-entry-state)               | `default` |
| `alert-message`  | Displays an alert message at the bottom of the field if `state` is not `default` (will replace `assistive-text`, if present) | `string`                                                    |           |
| `options`        | Options                                                                                                                      | [`choice_option[]`](/types#choice-option)                   | Required  |
| `alignment`      | Aligns the flow of radio buttons in a specific order                                                                         | [`choice_option_alignment`](/types#choice-option-alignment) | `flex`    |
| `default`        | Default value of the radio group, highlights the option where the `value` matches                                            | `string` `number` `boolean`                                 |           |
| `disabled`       | Disables the entire radio group and prevents users from selecting any value                                                  | `boolean`                                                   | `false`   |

#### Events

| Event     | Description                            | Returns                     |
| --------- | -------------------------------------- | --------------------------- |
| `@update` | Fired when the radio option is updated | `string` `number` `boolean` |

#### Example

```html
<template>
	<v-eco-radio-group
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

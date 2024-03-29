#### Use Case

This input can be used to select a single field form a list of options. All the options are visible to the user. To render a group of radio options, use [Radio Group](/radio-group) instead.

#### API

| Property   | Description                                 | Type                | Default       |
| ---------- | ------------------------------------------- | ------------------- | ------------- |
| `v-model`  | Binds the input value to a variable         | `boolean`           |               |
| `label`    | Label to render along with the radio button | `string`            | Required      |
| `disabled` | Disables the radio field                    | `boolean`           | `false`       |
| `default`  | Default state of the radio button           | `boolean`           |               |
| `hue`      | Applies a hue to the radio button           | [`hue`](/types#hue) | `information` |

#### Events

| Event     | Description                                    | Returns   |
| --------- | ---------------------------------------------- | --------- |
| `@update` | Fired when one of the radio options is updated | `boolean` |

#### Example

```html
<template>
	<v-eco-radio label="Radio Label" v-model="value" />
</template>

<script lang="ts">
	import { defineComponent } from "vue";

	export default defineComponent({
		data() {
			return {
				value: false,
			};
		},
	});
</script>
```

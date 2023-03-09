#### Use Case

This input can be used to select a boolean option.

#### API

| Property   | Description                           | Type                | Default       |
| ---------- | ------------------------------------- | ------------------- | ------------- |
| `v-model`  | Binds the input value to a variable   | `boolean`           |               |
| `label`    | Label to render along with the switch | `string`            | Required      |
| `disabled` | Disables the switch field             | `boolean`           | `false`       |
| `default`  | Default state of the switch           | `boolean`           |               |
| `hue`      | Applies a hue to the switch           | [`hue`](/types#hue) | `information` |

#### Events

| Event     | Description                      | Returns   |
| --------- | -------------------------------- | --------- |
| `@update` | Fired when the switch is updated | `boolean` |

#### Example

```html
<template>
	<v-eco-switch label="Switch Label" v-model="value" />
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

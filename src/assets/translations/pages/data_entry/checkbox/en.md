#### Use Case

This input can be used to select multiple fields form a list of options. All the options are visible to the user. To render a group of checkbox options, use [Checkbox Group](/checkbox-group) instead.

#### API

| Property   | Description                             | Type      | Default  |
| ---------- | --------------------------------------- | --------- | -------- |
| `v-model`  | Binds the input value to a variable     | `boolean` |          |
| `label`    | Label to render along with the checkbox | `string`  | Required |
| `disabled` | Disables the checkbox field             | `boolean` | `false`  |
| `default`  | Default state of the checkbox           | `boolean` |          |

#### Events

| Event     | Description                        | Returns   |
| --------- | ---------------------------------- | --------- |
| `@update` | Fired when the checkbox is updated | `boolean` |

#### Example

```html
<template>
	<v-eco-checkbox label="Checkbox Label" v-model="value" />
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
